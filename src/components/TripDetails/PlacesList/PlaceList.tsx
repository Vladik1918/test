import type { IPlace } from "../../../pages/TripDetailsPage";

export const PlacesList = ({ places }: { places: IPlace[] }) => (
  <ul>
    {places.map((p) => (
      <li key={p.id} className="border p-2 mb-1 rounded">
        <p>
          {p.dayNumber}. {p.locationName} {p.notes && `(${p.notes})`}
        </p>
      </li>
    ))}
  </ul>
);
