import { writable } from "svelte/store";

export const asteroidAmount = writable(0);
export const asteroids = writable([]);
export const currentDate = writable(new Date().toISOString().split('T')[0]);