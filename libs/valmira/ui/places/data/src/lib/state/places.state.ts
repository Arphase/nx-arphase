import { PlaceCategorySummary } from '@valmira/domain';

export interface PlacesState {
  occupiedDates: Date[];
  summary: PlaceCategorySummary;
}
