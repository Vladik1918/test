export const AddPlaceForm = ({
  locationName,
  notes,
  dayNumber,
  setLocationName,
  setNotes,
  setDayNumber,
  handleAddPlace,
}: {
  locationName: string;
  notes: string;
  dayNumber: number;
  setLocationName: (v: string) => void;
  setNotes: (v: string) => void;
  setDayNumber: (v: number) => void;
  handleAddPlace: () => void;
}) => (
  <div className="mb-4 border p-2 rounded">
    <input
      placeholder="Location"
      value={locationName}
      onChange={(e) => setLocationName(e.target.value)}
      className="border p-1 mr-2"
    />
    <input
      placeholder="Notes"
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      className="border p-1 mr-2"
    />
    <input
      type="number"
      min={1}
      value={dayNumber}
      onChange={(e) => setDayNumber(Number(e.target.value))}
      className="border p-1 mr-2 w-20"
    />
    <button
      onClick={handleAddPlace}
      className="bg-green-600 text-white p-1 rounded"
    >
      Add Place
    </button>
  </div>
);
