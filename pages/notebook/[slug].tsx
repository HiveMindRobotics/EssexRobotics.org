import PocketBase from 'pocketbase'
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {marked} from "marked";

const Post = ({content, title}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    return <div>
        <h1 style={{fontSize: "3em", color: "var(--primary)"}}>{title}</h1>
        <div dangerouslySetInnerHTML={{__html: marked.parse(content)}}></div>
    </div>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const client = new PocketBase('http://127.0.0.1:8090')

    // @ts-ignore
    const {slug} = context.params

    const data = await client.records.getOne('blog', slug)

    return {
        props: {
            content: data.content,
            title: data.title,
            date: data.date,
            category: data.category
        }
    }
}

export default Post