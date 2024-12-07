import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddDosen = () => {
  const [dosenData, setDosenData] = useState([{ nip: "", name: "" }]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (index, e) => {
    const values = [...dosenData];
    values[index][e.target.name] = e.target.value;
    setDosenData(values);
  };

  const handleAddRow = () => {
    setDosenData([...dosenData, { nip: "", name: "" }]);
  };

  const handleRemoveRow = (index) => {
    const values = [...dosenData];
    values.splice(index, 1);
    setDosenData(values);
  };

  const saveDosen = async (e) => {
    e.preventDefault();
    setMsg("");

    for (let i = 0; i < dosenData.length; i++) {
      if (!dosenData[i].nip || !dosenData[i].name) {
        setMsg("All fields are required!");
        return;
      }
    }

    try {
      await axios.post("http://localhost:5000/dosens/bulk", { dosenData });
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
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="h-full w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Add New User
            </h1>

            <form onSubmit={saveDosen} className="space-y-6">
              {dosenData.map((data, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 p-6 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        NIP
                      </label>
                      <input
                        type="text"
                        name="nip"
                        placeholder="Enter NIP"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
                        value={data.nip}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
                        value={data.name}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>

                    {dosenData.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveRow(index)}
                        className="w-full mt-2 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition duration-200 flex items-center justify-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Remove Entry
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {msg && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                  {msg}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handleAddRow}
                  className="flex-1 py-3 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg transition duration-200 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add Another Lecturer
                </button>

                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition duration-200 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Save All
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddDosen;
