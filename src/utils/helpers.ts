import {CACHE_TTL_MS, type User} from "../constants/constants.ts";

export const getCachedUser = (id: string): User | null => {
    const item = localStorage.getItem(`user-${id}`);
    if (!item) return null;

    try {
        const parsed = JSON.parse(item);
        const isFresh = Date.now() - parsed.cachedAt < CACHE_TTL_MS;
        return isFresh ? parsed.user : null;
    } catch {
        return null;
    }
};

export const cacheUser = (id: string, user: User): void => {
    const cachedData = {
        user,
        cachedAt: Date.now(),
    };
    localStorage.setItem(`user-${id}`, JSON.stringify(cachedData));
};