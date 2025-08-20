import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks/hooks";
import { registerUser } from "../features/auth/authThunks";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {   
    if (user) navigate("/");
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ email, password, name }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-6 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className={`p-3 rounded bg-blue-600 text-white font-semibold transition-colors 
            hover:bg-blue-700 disabled:bg-blue-400`}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};
