import RecipeForm from "./RecipeForm";
import getCategories from "../../../lib/DB/both/getCategories";
import {Session} from "next-auth";

type Props = {
    sessionAuth: Session | null
    categories: Category[]
}


export default function RecipeCreate({ sessionAuth, categories }: Props) {

    return (
        <div className='py-3'>
            <RecipeForm
                sessionAuth={sessionAuth}
                buttonLabel="Create"
                editMode={false}
                allCategories={categories}
            />
        </div>
    );
}
