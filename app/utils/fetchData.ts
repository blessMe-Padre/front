export default async function fetchData<T = unknown>(url: string): Promise<T> {
    const domain = process.env.API_SERVER ?? process.env.NEXT_PUBLIC_API_SERVER;
    if (!domain) {
        throw new Error("API_SERVER не задан");
    }

    const fullUrl = new URL(url, domain).toString();
    try {
        const response = await fetch(fullUrl, {
            next: { revalidate: 30 },
        });

        if (!response.ok) {
            throw new Error(`Ошибка http: ${response.status}`);
        }
        const result = (await response.json()) as T; // Type assertion
        return result;
    } catch (error) {
        console.error("Произошла ошибка", error);
        throw error;
    }
}