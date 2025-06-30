export const config = {
    baseApiUrl: import.meta.env.VITE_API_URL ?? "http://localhost:3000",
    accessToken: import.meta.env.VITE_ACCESS_TOKEN ?? "",
}