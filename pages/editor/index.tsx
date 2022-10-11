import PocketBase, {ClientResponseError} from "pocketbase";
import {useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";

export default function Index() {
    const [password, setPassword] = useState('');
    /* const [username, setUsername] = useState(''); */
    const username = "HiveMindRobotics@gmail.com"
    const router = useRouter();

    const [client] = useState(new PocketBase('https://essexrobotics.org:8091'))

    useEffect(() => {
        if (client.authStore.isValid) {
            router.push("/editor/portal")
        }
    }, [client, router])

    return <div>
        {/*
        <label>
            Email:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </label>
        <br/>
            */}
        <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <br/>
        <button onClick={() => {
            client.users.authViaEmail(username, password).then((value) => {
                router.push("/editor/portal", undefined, {})
            }, err => alert(err.message))
        }}>login</button>
    </div>
}
