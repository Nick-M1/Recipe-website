export default function searchUrlBuilder(orderBy: string = '', category: string = '') {
    return `search?category=${category}&ordering=${orderBy}`
}