import PocketBase from 'pocketbase'
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import Link from "next/link";
import styles from "../../../styles/Home.module.sass";
import {useRouter} from "next/router";
import Navigator from "../../../components/Navigator";

const Category = ({page, totalItems, items, category}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter()
    return <div>
        <h1 style={{fontSize: "3em", color: "var(--primary)"}}>{category.substring(0, 1).toUpperCase() + category.substring(1)}</h1>
        {
            // @ts-ignore
            items.map((item: {
            title: string
            date: string
            id: string
        }) => {
            return <div key={item.id}>
                <br/>
                <Link href={`/notebook/${item.id}`}><a style={{color: "white", fontSize: "2em"}}><b>{item.title}</b></a></Link>
                <h3>{new Date(item.date).toDateString()}</h3>
            </div>
        })}
        <Navigator page={page} totalItems={totalItems} />
    </div>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const client = new PocketBase('http://127.0.0.1:8090')

    // @ts-ignore
    const {slug} = context.params

    const resultList = await client.records.getList('blog', parseInt(context.query["page"] as string) || 1, 30, {sort: "-date", filter: `category='${slug}'`})

    return {
        props: {
            page: resultList.page,
            totalItems: resultList.totalItems,
            items: resultList.items.map((item: Record<any, any>) => {
                if (!item.draft) return {
                    title: item.title,
                    date: item.date,
                    id: item.id
                }
            }).filter(Boolean),
            category: slug
        }
    }
}

export default Category