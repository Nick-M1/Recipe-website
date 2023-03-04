export const allSortOptions: SortOptionsRecipeAndAuthor[] = [
    { name: 'Most Popular',        query: 'numberOfLikes',        order: "desc" },
    { name: 'Best Rating',         query: 'numberOfBookmarks',    order: "desc" },         //todo: give rating in comments
    { name: 'Newest',              query: 'created_at',           order: "desc" },
    { name: 'Quickest time',       query: 'cookTime',             order: "asc" },
]