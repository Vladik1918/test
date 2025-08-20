// src/components/TripForm.tsx
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks/hooks";
import { createTrip } from "../features/trips/tripsThunks";

export const TripForm = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to create a trip");
      return;
    }

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      setError("Start date cannot be later than end date");
      return;
    }
    setError("");

    dispatch(
      createTrip({
        title,
        description,
        startDate,
        endDate,
        ownerId: user.uid,
      })
    );

    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
  };

  if (!user) return <p>Please login to create trips</p>;

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <h2>Create Trip</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border p-1 mr-2 mb-2"
      />
      <input
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        className="border p-1 mr-2 mb-2"
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border p-1 mr-2 mb-2"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border p-1 mr-2 mb-2"
      />
      <button type="submit" className="bg-green-600 text-white p-2 rounded">
        Create
      </button>
    </form>
  );
};
