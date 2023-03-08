import RecipeForm from "./RecipeForm";
import {Session} from "next-auth";

type Props = {
    sessionAuth: Session | null
    allCategories: Category[]
    allLabels: string[]
}


export default function RecipeCreate({ sessionAuth, allCategories, allLabels }: Props) {

    return (
        <div className='py-3'>
            <RecipeForm
                sessionAuth={sessionAuth}
                buttonLabel="Create"
                editMode={false}
                allCategories={allCategories}
                allLabels={allLabels}
            />
        </div>
    );
}
