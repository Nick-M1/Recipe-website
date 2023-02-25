export async function checkImage(url: string) {
    try {
        const res = await fetch(url);
        const buff = await res.blob();
        return buff.type.startsWith('image/')

    } catch (e: any) {
        return false
    }
}