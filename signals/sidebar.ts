import { signal } from "@preact/signals";
import { SelectLocation } from "@/lib/db/schema/location.ts";

export const sideBarLocations = signal<SelectLocation[]>([]);
