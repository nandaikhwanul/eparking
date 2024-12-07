import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import QRCode from 'qrcode';

const Dashboard = () => {
    const user = useSelector((state) => state.auth.user);
    const [qrCodeURL, setQrCodeURL] = useState('');

    useEffect(() => {
        if (user) {
            const data = JSON.stringify({
                name: user.name,
                nip: user.nip,
                email: user.email,
            });

            QRCode.toDataURL(data, { errorCorrectionLevel: 'H', width: 200 })
                .then(url => {
                    setQrCodeURL(url);
                })
                .catch(err => {
                    console.error('Error generating QR code: ', err);
                });
        }
    }, [user]);

    return (
        <div className="mb-20 relative top-20 min-h-screen w-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 sm:py-12 px-4 sm:px-6 lg:px-8 h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8 justify-center items-stretch">
                    {/* Information Card */}
                    <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 transform hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center mb-6 sm:mb-8">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 ml-3 sm:ml-4">Personal Information</h2>
                        </div>

                        <div className="space-y-4 sm:space-y-6">
                            <div className="border-b pb-3 sm:pb-4">
                                <p className="text-xs sm:text-sm text-gray-500 mb-1">Full Name</p>
                                <p className="text-base sm:text-lg font-semibold text-gray-800">{user?.name || 'N/A'}</p>
                            </div>

                            <div className="border-b pb-3 sm:pb-4">
                                <p className="text-xs sm:text-sm text-gray-500 mb-1">NIP</p>
                                <p className="text-base sm:text-lg font-semibold text-gray-800">{user?.nip || 'N/A'}</p>
                            </div>

                            <div>
                                <p className="text-xs sm:text-sm text-gray-500 mb-1">Email Address</p>
                                <p className="text-base sm:text-lg font-semibold text-gray-800 break-words">{user?.email || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    {/* QR Code Card */}
                    <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 transform hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center mb-6 sm:mb-8">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                </svg>
                            </div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 ml-3 sm:ml-4">Your QR Code</h2>
                        </div>

                        <div className="flex justify-center items-center bg-gray-50 rounded-xl p-4 sm:p-6">
                            {qrCodeURL ? (
                                <img src={qrCodeURL} alt="QR Code" className="w-36 h-36 sm:w-48 sm:h-48 object-contain" />
                            ) : (
                                <div className="text-center text-gray-500">
                                    <p className="text-sm sm:text-base">Loading QR Code...</p>
                                </div>
                            )}
                        </div>
                        <p className="text-center text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
                            Scan this QR code to share your contact information
                        </p>
                        <div className='opacity-0'>
                            <span>test</span>
                            <br />
                            <span>test</span>
                            <br />
                            <span>test</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
