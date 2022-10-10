import Link from "next/link";

const Category = () => {
    return <div>
        <h1 style={{fontSize: "3em", color: "var(--primary)"}}>Categories</h1>
        <h2><Link href={`/notebook/category/programming`}>Programming</Link></h2>
        <h2><Link href={`/notebook/category/programming`}>Outreach</Link></h2>
        <h2><Link href={`/notebook/category/programming`}>Events</Link></h2>
        <h2><Link href={`/notebook/category/programming`}>Building</Link></h2>
        <h2><Link href={`/notebook/category/programming`}>Notes</Link></h2>
    </div>
}

export default Category