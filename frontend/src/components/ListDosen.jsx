import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListDosen = () => {
  const [dosens, setDosens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDosens = async () => {
      try {
        const response = await axios.get('http://localhost:5000/dosens');
        setDosens(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchDosens();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
      {error}
    </div>
  );

  return (
    <div className="px-20 relative top-20 w-screen min-h-screen bg-gradient-to-br ">
      <div className="w-full h-full bg-white shadow-xl">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 rounded-t-md">
          <h2 className="text-xl font-bold text-white">Daftar Dosen</h2>
        </div>
        
        <div className="overflow-x-auto w-full">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">NIP</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Name</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dosens.length > 0 ? (
                dosens.map((dosen) => (
                  <tr key={dosen.nip} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dosen.nip}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dosen.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="px-6 py-8 text-center text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListDosen;
