import { PlaceCategorySummary } from '@valmira/domain';

export interface PlacesState {
  startDateOccupiedDates: Date[];
  endDateOccupiedDates: Date[];
  summary: PlaceCategorySummary;
}
