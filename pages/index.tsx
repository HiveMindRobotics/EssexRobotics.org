import PocketBase from 'pocketbase'
import {InferGetServerSidePropsType, InferGetStaticPropsType} from "next";
import styles from '../styles/Home.module.sass'
import Image from 'next/image'
import logo from '../public/logo.png'
import teamPicture from '../public/CornMaze2022.jpg'
import Link from "next/link"
import {marked} from "marked";

const Post = ({content}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return <div>
        <h1 style={{color: "white"}}>We{"'"}re a <Link href={"https://www.firstinspires.org/robotics/ftc"}><a><em>FIRST Tech Challenge</em></a></Link> team based in <Link href={"https://goo.gl/maps/n3ED5ijuHhCxj2N57"}><a><em>Essex, Vermont</em></a></Link></h1>

        <div style={{display: "flex"}}>
            <div className={styles.logo}><Image src={logo} alt="HiveMind Robotics Logo" layout={"responsive"}/></div>
            <div style={{width: "75%", margin: "auto"}}><Image src={teamPicture} alt="HiveMind Team Picture" layout={"responsive"}/></div>
        </div>
        <div dangerouslySetInnerHTML={{__html: content}}></div>
    </div>
}

export async function getStaticProps() {
    const client = new PocketBase(consts.DB_URL)

    let data:  any
    let list = await client.records.getList("site", 1, 2, {
        filter: `slug="home"`
    })
    if (list.items.length > 1) {
        alert("error: this should literally never happen. you have permission to go yell at cheru.")
    } else {
        data = list.items[0]
    }

    return {
        props: {
            content: marked.parse(data.content),
        },
        revalidate: 60
    }
}

export default Post
