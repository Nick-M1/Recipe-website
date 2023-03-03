export default function smoothScroll(elementId: string, block: ScrollLogicalPosition ) {
    const element = document.getElementById( elementId )

    if (element)
        element.scrollIntoView({behavior: 'smooth', block: block})
}