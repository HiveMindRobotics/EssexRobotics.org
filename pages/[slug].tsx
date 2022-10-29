import PocketBase from 'pocketbase'
import {
    GetStaticPropsContext,
    InferGetStaticPropsType
} from "next";
import {marked} from "marked";

const Post = ({content}: InferGetStaticPropsType<typeof getStaticProps>) => {

    return <div>
        <div dangerouslySetInnerHTML={{__html: content}}></div>
    </div>
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const client = new PocketBase('https://essexrobotics.org:8091')

    // @ts-ignore
    const {slug} = context.params

    const list = await client.records.getList("site", 1, 2, {
        filter: `slug="${slug}"`
    })
    const data = list.items[0]

    return {
        props: {
            content: marked.parse(data.content),
        },
        revalidate: 60
    }
}

export async function getStaticPaths() {
    return {
        paths: [{ params: { slug: "parents" } }],
        fallback: false
    }
}

export default Post
