import { signal } from "@preact/signals";
import { SideBarItem } from "@/utils.ts";

export const sideBarLocations = signal<SideBarItem[]>([]);
