import styles from "../styles/Home.module.sass";
import {useRouter} from "next/router";

export default function Navigator({page, totalItems}: { page: number, totalItems: number }) {
    const router = useRouter()
    return <div style={{display: "flex", alignItems: "center"}}>
        {(() => page == 1 ? "" : <button onClick={() => router.push(`${router.asPath.split('?')[0]}?page=${page - 1}`)} className={styles.mobileButtonSpecific}>{'🡄'}</button>)()}
        {(() => totalItems <= 30 ? "" : <span>&nbsp;<b style={{fontSize: "1.5em"}}>{page}</b>&nbsp;</span>)()}
        {(() => Math.ceil(totalItems / 30) <= page ? "" : <button onClick={() => router.push(`${router.asPath.split('?')[0]}?page=${page + 1}`)} className={styles.mobileButtonSpecific}>{'🡆'}</button>)()}
    </div>
}