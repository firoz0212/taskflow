import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) return;

    // demo login (no backend yet)
    
    localStorage.setItem("isLoggedIn", "true");

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-center mb-6 text-cyan-400">
          TaskFlow Login
        </h1>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500"
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-cyan-500"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 py-3 rounded-xl font-semibold hover:scale-105 transition"
        >
          Login
        </button>

        <p className="text-center text-slate-400 mt-4 text-sm">
          Demo: any email & password works
        </p>

      </div>

    </div>
  );
};

export default Login;