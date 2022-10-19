import PocketBase from 'pocketbase'
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {marked} from "marked";

const Post = ({content, title}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    return <div>
        <h1 style={{fontSize: "3em", color: "var(--primary)"}}>{title}</h1>
        <div dangerouslySetInnerHTML={{__html: content}}></div>
    </div>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const client = new PocketBase('http://127.0.0.1:8090')

    // @ts-ignore
    const {slug} = context.params

    let data: any
    try {
        data = await client.records.getOne('blog', slug)
    } catch (e: any) {
        if (e.status !== 404) throw e
        return {
            notFound: true
        }
    }

    return {
        props: {
            content: marked.parse(data.content),
            title: data.title,
            date: data.date,
            category: data.category
        }
    }
}

export default Post
