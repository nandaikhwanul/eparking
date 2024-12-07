import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import vector from "../assets/vector5.png";
import AOS from "aos";
import "aos/dist/aos.css";

const Register = () => {
  const [nip, setNip] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const saveUser = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!nip || !password || !confPassword) {
      setMsg("Semua kolom wajib diisi kecuali email!");
      return;
    }

    if (password !== confPassword) {
      setMsg("Kata sandi tidak cocok!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/users", {
        nip,
        email,
        password,
        confirmPassword: confPassword,
        role: "staff",
      });
      navigate("/");
    } catch (error) {
      setMsg(error.response?.data?.msg || "Terjadi kesalahan yang tidak diharapkan.");
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden p-4">
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Kiri: Gambar & Teks */}
          <div className="lg:w-1/2 relative bg-gradient-to-br from-blue-500 to-indigo-600 p-12" data-aos="fade-right">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute inset-0 bg-pattern"></div>
            </div>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-8 relative z-10 text-center lg:text-left" data-aos="fade-up">
              Selamat Datang di <br />
              <span className="text-yellow-300">E-Parking Teknik Elektro</span>
            </h1>
            
            
            <img
              src={vector}
              alt="Selamat Datang"
              className="max-w-md w-full mx-auto mt-8 drop-shadow-2xl animate-float"
              data-aos="zoom-in"
              data-aos-delay="200"
            />
          </div>

          {/* Kanan: Form Pendaftaran */}
          <div className="lg:w-1/2 p-8 lg:p-12" data-aos="fade-left">
            <div className="max-w-md mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Buat Akun</h2>
              
              {msg && (
                <div className="mb-6 p-4 rounded-lg bg-red-50 border-l-4 border-red-500 text-red-700">
                  {msg}
                </div>
              )}

              <form onSubmit={saveUser} className="space-y-6">
                <div>
                  <label htmlFor="nip" className="block text-sm font-medium text-gray-700 mb-2">
                    NIP
                  </label>
                  <input
                    type="text"
                    id="nip"
                    value={nip}
                    onChange={(e) => setNip(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="Masukkan NIP Anda"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email (Opsional)
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="Masukkan email Anda"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Kata Sandi
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="Buat kata sandi"
                  />
                </div>

                <div>
                  <label htmlFor="confPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Konfirmasi Kata Sandi
                  </label>
                  <input
                    type="password"
                    id="confPassword"
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    placeholder="Konfirmasi kata sandi Anda"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-200 transform hover:scale-[1.02] font-semibold text-lg shadow-lg"
                >
                  Daftar
                </button>
              </form>

              <p className="mt-8 text-center text-gray-600">
                Sudah punya akun?{" "}
                <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
                  Masuk di sini
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
