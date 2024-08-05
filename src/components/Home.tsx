import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function Home() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState(new Set());

  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    axios.get('/data.json')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleCheckboxChange = (index: number) => {
    setSelectedItems(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(index)) {
        newSelected.delete(index);
      } else {
        newSelected.add(index);
      }
      return newSelected;
    });
  };

  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="h-16 border-b border-solid text-center shadow-lg bg-white p-5 ml-16">
        NavBar
      </div>

      <div className="flex flex-col md:flex-row flex-grow">
        {/* Sidebar */}
        <div className="w-full md:w-16 border-r border-solid text-center bg-white flex flex-col items-center justify-start py-4 mt-1.25">
          <svg className="h-7 w-7 text-black mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>

          <svg className="h-7 w-7 text-black mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
        </div>

        {/* Main content and boxes */}
        <div className="flex-grow md:ml-24 p-6 flex flex-col">
          <div className="flex flex-col items-start mb-6">
            <h1 className="text-2xl font-bold mb-4">Audit Score</h1>
            <p className="text-lg">Hi Welcome!</p>
          </div>

          <div className="flex flex-wrap gap-4 md:gap-8 h-auto">
            <div className="w-full sm:w-1/2 md:w-60 bg-white shadow-md rounded-md p-4 mb-4">
              <h1>80 | 89</h1>
            </div>
            <div className="w-full sm:w-1/2 md:w-60 bg-white shadow-md rounded-md p-4 mb-4">
              fjgfh
            </div>
            <div className="w-full sm:w-1/2 md:w-60 bg-white shadow-md rounded-md p-4 mb-4">
              fjgfh
            </div>
            <div className="w-full sm:w-1/2 md:w-60 bg-white shadow-md rounded-md p-4 mb-4">
              fjgfh
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-6 w-10/12">
            <table className="min-w-full bg-white border border-gray-300 shadow-rose-700">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="p-3">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setSelectedItems(new Set(
                          checked
                            ? currentItems.map((_, idx) => (currentPage - 1) * itemsPerPage + idx)
                            : []
                        ));
                      }}
                    />
                  </th>
                  <th>Bug ID</th>
                  <th>Severity</th>
                  <th>Description</th>
                  <th>Date Reported</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedItems.has((currentPage - 1) * itemsPerPage + index)}
                        onChange={() => handleCheckboxChange((currentPage - 1) * itemsPerPage + index)}
                      />
                    </td>
                    <td className="p-3">{item["Bug ID"]}</td>
                    <td className="p-3">{item["Severity"]}</td>
                    <td className="p-3">{item["Description"]}</td>
                    <td className="p-3">{item["Date Reported"]}</td>
                  </tr>
                ))}

                {/* Pagination */}
                <tr>
                  <td colSpan={5} className="py-6">
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 h-7 bg-gray-100 text-gray-700 rounded-md shadow-md flex items-center justify-center"
                      >
                        Prev
                      </button>

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 h-7 bg-gray-100 text-gray-700 rounded-md shadow-md flex items-center justify-center ms-3"
                      >
                        Next
                      </button>
                      <span className="flex items-center">
                        Page: &nbsp;<span className='px-3 py-1 h-7 w-14 bg-gray-100 text-gray-700 rounded-md flex items-center justify-center'>{currentPage}</span>  &nbsp; of {totalPages} &nbsp;&nbsp;
                      </span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
