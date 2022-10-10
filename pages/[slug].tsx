import PocketBase from 'pocketbase'
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {marked} from "marked";

const Post = ({content}: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    return <div>
        <div dangerouslySetInnerHTML={{__html: marked.parse(content)}}></div>
    </div>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const client = new PocketBase('http://127.0.0.1:8090')

    // @ts-ignore
    const {slug} = context.params

    let data:  any
    try {
        let list = await client.records.getList("site", 1, 2, {
            filter: `slug="${slug}"`
        })
        if (list.items.length > 1) {
            alert("error: this should literally never happen. you have permission to go yell at cheru.")
        } else {
            data = list.items[0]
        }
    } catch (e) {
        // @ts-ignore
        if (e.status !== 404) throw e
        return {notFound: true}
    }

    return {
        props: {
            content: data.content,
        }
    }
}

export default Post
