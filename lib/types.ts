export interface LatLongItem {
  lat: number;
  long: number;
}

export interface MapPoint extends LatLongItem {
  id: number;
  label: string;
}
