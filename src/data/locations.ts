import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storage';

export interface WasteLocation {
  id: string;
  lat: number;
  lng: number;
  imageUrl: string;
  timestamp: string;
}

export const locations: WasteLocation[] = loadFromLocalStorage('waste-locations') || [];

export function addLocation(location: WasteLocation) {
  locations.push(location);
  saveToLocalStorage('waste-locations', locations);
}

export function getLocations(): WasteLocation[] {
  return locations;
}

export function generateLocationId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}