'use client'


export default function DashboadComponent() {
    // const recipe = await getAllRecipes()           //todo: Need to create new from user input
    const newRecipe = null

    const addToFirebase = async () => {
        const res = await fetch('/api/addRecipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                newRecipe
            })
        })
        const data = await res.json()
    }

    return (
        <div>
            <button type='button' onClick={() => addToFirebase()}>
                BUTTON!!!
            </button>
        </div>
    );
}