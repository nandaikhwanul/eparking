import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset, getMe } from "../features/authSlice"; 
import logo from "../assets/logo.png";
import vector from "../assets/vector3.png";

// Import AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

const Login = () => {
    const [nip, setNip] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
        });

        if (isSuccess) {
            dispatch(getMe());
        }
        if (user && isSuccess) {
            if (user.role === "admin" || user.role === "dosen" || user.role === "staff") {
                navigate("/dashboard");
            } else {
                dispatch(reset());
                setNip("");
                setPassword("");
                alert("Anda tidak memiliki akses untuk masuk");
            }
        }
        return () => {
            dispatch(reset());
        };
    }, [user, isSuccess, dispatch, navigate]);

    const Auth = (e) => {
        e.preventDefault();
        dispatch(LoginUser({ nip, password }));
    };

    return (
        <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl w-full flex rounded-2xl shadow-2xl overflow-hidden bg-white">
                {/* Sisi Kiri - Gambar */}
                <div className="hidden lg:block w-1/2 bg-gradient-to-br from-red-800 to-red-900 p-12 relative">
                    <img 
                        src={logo} 
                        alt="Logo" 
                        className="absolute top-8 left-8 w-40 h-40 object-contain drop-shadow-lg"
                        data-aos="fade-down"
                    />
                    <img 
                        src={vector} 
                        alt="Vector" 
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[400px] animate-float"
                        data-aos="fade-up"
                    />
                    <div className="absolute bottom-12 left-12 text-white" data-aos="fade-right">
                        <h2 className="text-3xl font-bold mb-4">Selamat Datang Kembali!</h2>
                        <p className="text-lg opacity-90">Silakan masuk untuk mengakses E-Parking Teknik Elektro</p>
                    </div>
                </div>

                {/* Sisi Kanan - Form Login */}
                <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16">
                    <div className="w-full max-w-md mx-auto">
                        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center" data-aos="fade-up">
                            Masuk ke Akun Anda
                        </h1>

                        <form onSubmit={Auth} className="space-y-6">
                            {isError && (
                                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded" data-aos="fade-up">
                                    {message}
                                </div>
                            )}

                            <div data-aos="fade-up">
                                <label htmlFor="nip" className="block text-sm font-medium text-gray-700 mb-2">
                                    NIP
                                </label>
                                <input 
                                    type="text" 
                                    id="nip"
                                    value={nip}
                                    onChange={(e) => setNip(e.target.value)}
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Masukkan NIP Anda"
                                    required
                                />
                            </div>

                            <div data-aos="fade-up">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Kata Sandi
                                </label>
                                <input 
                                    type="password"
                                    id="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Masukkan kata sandi Anda"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
                                data-aos="fade-up"
                            >
                                {isLoading ? (
                                    <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Memuat...
                                    </div>
                                ) : (
                                    "Masuk"
                                )}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-gray-600" data-aos="fade-up">
                            Belum punya akun?{' '}
                            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-200">
                                Daftar sekarang
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
