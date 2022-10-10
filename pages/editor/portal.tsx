import {useEffect, useState} from "react";
import PocketBase from "pocketbase";
import Link from "next/link";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {useRouter} from "next/router";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
import styles from "../../styles/Home.module.sass";

export default function Portal({page, totalItems, items}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter()
    const [client] = useState(new PocketBase('https://essexrobotics.org:8091'))
    useEffect(() => {
        if (!client.authStore.isValid) {
            router.push("/editor")
        }
    }, [client, router])
    return <div>
        <button onClick={() => {
            //@ts-ignore
            if (client.authStore.model?.profile.canEditSite) {
                router.push("/editor/editor?db=site&post=aquxsygskx8i0p0")
            } else {
                alert("You don't have permission to edit the site")
            }
        }}>Edit For Parents Page</button>
        <button onClick={() => {
            //@ts-ignore
            if (client.authStore.model?.profile.canEditSite) {
                router.push("/editor/editor?db=site&post=axt5tj5zq0s4m2m")
            } else {
                alert("You don't have permission to edit the site")
            }
        }}>Edit Home Page</button>
        {items.map((item: {
            content: string
            title: string
            date: string
            category: string
            id: string
        }) => {
            return <div key={item.id}>
                <p>{item.title} - {new Date(item.date).toDateString()} <button onClick={() => router.push(`/editor/editor?db=blog&post=${item.id}`)}>edit</button></p>
            </div>
        })}
        <div style={{display: "flex", alignItems: "center"}}>
            {(() => page == 1 ? "" : <button onClick={() => router.push(`?page=${page - 1}`)} className={styles.mobileButtonSpecific}>{'🡄'}</button>)()}
            {(() => totalItems <= 30 ? "" : <span>&nbsp;<b style={{fontSize: "1.5em"}}>{page}</b>&nbsp;</span>)()}
            {(() => Math.ceil(totalItems / 30) <= page ? "" : <button onClick={() => router.push(`?page=${page + 1}`)} className={styles.mobileButtonSpecific}>{'🡆'}</button>)()}
        </div>
        <br/>
        <button onClick={() => {
                client.records.create('blog', {
                    title: "Title",
                    date: new Date(new Date().setHours(0, 0, 0, 0)).toISOString(),
                }).then((record) => {
                    router.push(`/editor/editor?db=blog&post=${record.id}`)
                }, (err) => {
                    alert(err.message)
                })
        }}>new post</button>
        <br/>
        <button onClick={() => {
        client.authStore.clear()
        router.push("/editor")
        }}>logout</button>
    </div>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const client = new PocketBase('http://127.0.0.1:8090')

    const resultList = await client.records.getList('blog', parseInt(context.query["page"] as string) || 1, 30, {sort: "-date"})

    return {
        props: {
            page: resultList.page,
            totalItems: resultList.totalItems,
            items: resultList.items.map((item: Record<any, any>) => {
                return {
                    content: item.content,
                    title: item.title,
                    date: item.date,
                    category: item.category,
                    id: item.id
                }
            })
        }
    }
}
