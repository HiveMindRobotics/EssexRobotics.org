import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css"
import {useEffect, useMemo, useState} from "react";
import PocketBase from "pocketbase";
import {useRouter} from "next/router";

export default function Editor() {

    const router = useRouter()

    const [client] = useState(new PocketBase('https://essexrobotics.org:8091'))

    const {db, post} = router.query

    const [value, setValue] = useState({
        "id": "",
        "created": "",
        "updated": "",
        "title": "",
        "date": "",
        "content": "",
        "category": "",
        "draft":true,
    });


    useEffect(() => {
        if (!router.isReady) return

        if (process.env.NODE_ENV === 'development') {
            client.beforeSend = (url, reqConfig) => {
                delete reqConfig.signal
                return reqConfig
            }
        }

        if (typeof db === "undefined" || typeof post === "undefined") {
            router.push("/editor/portal")
            return
        }

        if (typeof db === "string" && typeof post === "string") {
                client.records.getOne(db, post).then((value) => {
                  // @ts-ignore
                    setValue(value)
                }, (err) => {
                    alert(err.message)
                    if (err.message === "The requested resource wasn't found.") {
                        router.push("/editor/portal")
                    }
                })
        } else {
            alert("error: this should literally never happen. you have permission to go yell at cheru.")
        }
        
        if (!client.authStore.isValid) {
            router.push("/editor")
        }
    }, [client, db, post, router])
    
    return <div style={{"background":"white","width":"calc(100vw - 304.883px - 150px)","margin":"30px","padding":"20px"}}>
        <SimpleMDE value={value.content} onChange={(input: string) => {
            setValue({...value, content: input})
        }} options={useMemo(() => {
            return {
                spellChecker: false
            }
        }, [])}/>
        {(() => !(db == "blog") ? "" : <>
        <input type="text" value={value.title} onChange={(e) => setValue({...value, title: e.target.value})} placeholder={"Title"}/>
        <input type="date" value={value.date.substring(0, 10)} onChange={(e) => setValue({...value, date: new Date(Date.parse(e.target.value)).toISOString()})}/>
            <select value={value.category} onChange={(e) => setValue({...value, category: e.target.value})}>
                <option value="programming">Programming</option>
                <option value="outreach">Outreach</option>
                <option value="events">Events</option>
                <option value="building">Building</option>
                <option value="notes">Notes</option>
            </select>
        <br/>
        </>)()}
        <button onClick={() => {
            if (typeof db === "string" && typeof post === "string") {
                client.records.update(db, post, value).then(() => {
                    alert("saved!")
                }, (err) => {
                    alert(err.message)
                })
            } else {
                alert("error: this should literally never happen. you have permission to go yell at cheru.")
            }
        }}>Save</button>
        {(() => !(db == "blog") ? "" : <>
            {/* @ts-ignore */}
        {(() => (client.authStore.model?.profile.canDeletePosts) ? "" : (
        <button onClick={() => {
            if (typeof db === "string" && typeof post === "string") {
                client.records.delete(db, post).then(() => {
                    alert("yeeted!")
                }, (err) => {
                    alert(err.message)
                })
            } else {
                alert("error: this should literally never happen. you have permission to go yell at cheru.")
            }
        }}>Delete</button>
            ))()}
            <label style={{color: "black"}}>&nbsp;Draft:&nbsp;
                <input type="checkbox" checked={value.draft} onChange={(e) => setValue({...value, draft: e.target.checked})}/>
            </label>
        <br/>
        </>)()}
    </div>
}
