import DemoComponent from "./DemoComponent";
import getAllRecipes from "../../../lib/DB/server/getAllRecipes";
// import SearchbarTEST from "../../../components/UNUSED/SearchbarTEST.tsx.txt";

export default async function Page() {
    const allRecipes = await getAllRecipes()

    return (
        <div className='p-10'>
            {/*<SearchbarTEST allRecipes={allRecipes}/>*/}
        </div>
    );
}