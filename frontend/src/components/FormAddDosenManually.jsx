import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddDosenManually = () => {
  const [nip, setNip] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const [errorField, setErrorField] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    setMsg("");
    setErrorField("");

    if (!nip) {
      setMsg("NIP is required!");
      setErrorField("nip");
      return;
    }

    if (!password) {
      setMsg("Password is required!");
      setErrorField("password");
      return;
    }

    if (!confPassword) {
      setMsg("Confirm password is required!");
      setErrorField("confPassword");
      return;
    }

    if (!role) {
      setMsg("Role is required!");
      setErrorField("role");
      return;
    }

    if (password !== confPassword) {
      setMsg("Passwords do not match!");
      setErrorField("confPassword");
      return;
    }

    try {
      await axios.post("http://localhost:5000/users", {
        nip,
        email,
        password,
        confirmPassword: confPassword,
        role,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      } else {
        setMsg("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="relative top-20 min-h-screen w-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Add New User & Role</h1>

          <form onSubmit={saveUser} className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NIP</label>
                  {errorField === "nip" && msg && (
                    <div className="text-red-500 text-sm mb-1">{msg}</div>
                  )}
                  <input
                    type="text"
                    name="nip"
                    id="nip"
                    placeholder="Enter NIP"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
                    value={nip}
                    onChange={(e) => setNip(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email (Optional)"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  {errorField === "password" && msg && (
                    <div className="text-red-500 text-sm mb-1">{msg}</div>
                  )}
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  {errorField === "confPassword" && msg && (
                    <div className="text-red-500 text-sm mb-1">{msg}</div>
                  )}
                  <input
                    type="password"
                    name="confPassword"
                    id="confPassword"
                    placeholder="Confirm Password"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  {errorField === "role" && msg && (
                    <div className="text-red-500 text-sm mb-1">{msg}</div>
                  )}
                  <select
                    name="role"
                    id="role"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="" disabled>Select Role</option>
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            </div>

            {msg && !errorField && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                {msg}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition duration-200 flex items-center justify-center gap-2 font-semibold text-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAddDosenManually;
