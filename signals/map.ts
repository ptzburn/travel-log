import { signal } from "@preact/signals";
import { MapPoint } from "@/lib/types.ts";

export const mapPoints = signal<MapPoint[]>([]);

export const selectedMapPoint = signal<MapPoint | null>(null);
export const shouldFlyTo = signal<boolean>(false);

export function selectPointWithoutFly(point: MapPoint | null) {
  shouldFlyTo.value = false;
  selectedMapPoint.value = point;
}
