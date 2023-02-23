'use client'
import RecipeForm from "./RecipeForm";
import getCategories from "../../../lib/DB/server/getCategories";

export default function RecipeCreate() {
    const categories = getCategories()          //todo move to page

  // const handleFormSubmit = (formData) => {
  //   dispatch(createRecipe(formData));
  // };

  return (
    <div className='py-3'>
      <RecipeForm
        buttonLabel="Create"
        editMode={false}
        allCategories={categories}
        // handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}
