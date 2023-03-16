import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../../Loader/Loader";
import { AuthContext } from "../../../../context/AuthProvider/AuthProvider";

function DrawingCollection() {
  const [drawings, setDrawings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [drawingsPerPage, setDrawingsPerPage] = useState(8);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [selectedPageSize, setSelectedPageSize] = useState(drawingsPerPage);

  const { loading } = useContext(AuthContext);

  // Fetch drawings from API
  useEffect(() => {
    axios
      .get("https://www.planndesign.com/gapi/drawings")
      .then((response) => {
        setDrawings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Calculate page numbers based on number of drawings and drawings per page
  useEffect(() => {
    const totalPages = Math.ceil(drawings.length / drawingsPerPage);
    const numbers = [];
    for (let i = 1; i <= totalPages; i++) {
      numbers.push(i);
    }
    setPageNumbers(numbers);
  }, [drawings, drawingsPerPage]);

  // Get current drawings based on current page and drawings per page
  const indexOfLastDrawing = currentPage * drawingsPerPage;
  const indexOfFirstDrawing = indexOfLastDrawing - drawingsPerPage;
  const currentDrawings = drawings.slice(
    indexOfFirstDrawing,
    indexOfLastDrawing
  );

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Change number of drawings per page
  const handlePageSizeChange = (event) => {
    setSelectedPageSize(parseInt(event.target.value));
    setCurrentPage(1);
    setDrawingsPerPage(parseInt(event.target.value));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto mt-5">
      <p className="text-lg my-2">Plan N design Collection</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentDrawings.map((drawing) => (
          <div
            key={drawing.id}
            className="bg-gradient-to-r from-[#141e30] to-[#243b55] rounded-lg overflow-hidden shadow-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            <Link to={`/drawing/${drawing.slug}`}>
              <img
                src={drawing.image.url}
                alt={drawing.title}
                className="w-full h-44 object-cover"
              />
            </Link>
            <div className="p-4">
              <h2 className="text-xl mb-2 font-bold">{drawing.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: drawing.body }}></div>
            </div>
          </div>
        ))}
      </div>
      <div className=" my-4 flex flex-col justify-center items-center">
        <div>
          <label htmlFor="pageSize">Items per page:</label>
          <select
            id="pageSize"
            className="mx-2 border rounded"
            value={selectedPageSize}
            onChange={handlePageSizeChange}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="16">16</option>
          </select>
        </div>
        <div className="flex">
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`${
                pageNumber === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gradient-to-r from-[#141e30] to-[#243b55] text-blue-500"
              } py-2 px-4 border border-gray-400 rounded mx-1`}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
export default DrawingCollection;
