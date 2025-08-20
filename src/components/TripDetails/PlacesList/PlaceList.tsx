import type { IPlace } from "../../../features/places/types";

interface PlacesListProps {
  places: IPlace[];
  canEdit: boolean;
  onUpdatePlace?: (id: string, updatedData: Partial<IPlace>) => void;
  onDeletePlace?: (id: string) => void;
}

export const PlacesList = ({ places, canEdit, onUpdatePlace, onDeletePlace }: PlacesListProps) => (
  <ul>
    {places.map((p) => (
      <li key={p.id} className="border p-2 mb-1 rounded flex justify-between items-center">
        <div>
          <p>
            {p.dayNumber}. {p.locationName} {p.notes && `(${p.notes})`}
          </p>
        </div>

        {canEdit && (
          <div className="flex gap-2">
            <button
              className="text-blue-500"
              onClick={() => {
                const locationName = prompt("New location name:", p.locationName);
                if (!locationName) return;

                const notes = prompt("New notes:", p.notes || "") || undefined;
                const dayNumberStr = prompt("New day number:", p.dayNumber.toString());
                const dayNumber = dayNumberStr ? parseInt(dayNumberStr, 10) : p.dayNumber;

                onUpdatePlace?.(p.id, { locationName, notes, dayNumber });
              }}
            >
              Edit
            </button>

            <button
              className="text-red-500"
              onClick={() => {
                if (confirm("Delete this place?")) {
                  onDeletePlace?.(p.id);
                }
              }}
            >
              Delete
            </button>
          </div>
        )}
      </li>
    ))}
  </ul>
);
