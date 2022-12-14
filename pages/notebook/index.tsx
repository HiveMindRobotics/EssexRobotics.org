import PocketBase from 'pocketbase'
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import Link from "next/link";
import {useRouter} from "next/router";
import styles from "../../styles/Home.module.sass";
import Navigator from "../../components/Navigator";
import consts from '../../lib/consts'



const Notebook = ({page, totalItems, items}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter()

    return <div>
        <h1 style={{fontSize: "3em", color: "var(--primary)"}}>Notebook</h1>

        {// @ts-ignore
            items.map((item: {
            title: string
            date: string
            category: string
            id: string
        }) => {
            return <div key={item.id}>
                <br/>
                <Link href={`/notebook/${item.id}`}><a style={{color: "white", fontSize: "2em"}}><b>{item.title}</b></a></Link>
                <h3>{new Date(item.date).toDateString()} {item.category ? "-" : ""}&nbsp;
                    <Link href={`/notebook/category/${item.category}`}>
                        {item.category.substring(0, 1).toUpperCase() + item.category.substring(1)}
                    </Link></h3>
            </div>
        })}
        <br/>
        <Navigator page={page} totalItems={totalItems} />
    </div>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const client = new PocketBase(consts.DB_URL)

    // await client.users.authViaEmail('HiveMindRobotics@gmail.com', process.env.NOTEBOOK_PASSWORD ?? '')

    const resultList = await client.records.getList('blog', parseInt(context.query["page"] as string) || 1, 30, {sort: "-date", filter: `draft=false`})

    return {
        props: {
            page: resultList.page,
            totalItems: resultList.totalItems,
            items: resultList.items.map((item: Record<any, any>) => {
                return {
                    title: item.title,
                    date: item.date,
                    category: item.category,
                    id: item.id
                }
            })
        }
    }
}

export default Notebook