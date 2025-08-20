import type { IPlace } from './../features/places/types';

export const addAndSortPlace = (places: IPlace[], newPlace: IPlace) =>
  [...places, newPlace].sort((a, b) => a.dayNumber - b.dayNumber);