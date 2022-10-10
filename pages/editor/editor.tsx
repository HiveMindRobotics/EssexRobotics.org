import "easymde/dist/easymde.min.css"
import dynamic from "next/dynamic";

const EditorComponent = dynamic(
    () => import("../../components/Editor"),
    {ssr: false})

export default function Editor() {
    return <EditorComponent/>
}
