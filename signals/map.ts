import { signal } from "@preact/signals";
import { MapPoint } from "@/lib/types.ts";

export const mapPoints = signal<MapPoint[]>([]);
