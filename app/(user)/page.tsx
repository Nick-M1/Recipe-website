import Landing from "../../components/layouts/Landing";
import getCategories from "../../lib/DB/both/getCategories";

export default function Home() {
    const categories = getCategories()
    return (
        <div>
            <Landing categories={categories}/>
        </div>
    )
}