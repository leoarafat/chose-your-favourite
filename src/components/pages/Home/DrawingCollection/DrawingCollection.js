import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function DrawingCollection() {
  const [drawings, setDrawings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [drawingsPerPage, setDrawingsPerPage] = useState(8);
  const [pageNumbers, setPageNumbers] = useState([]);
console.log(drawings);

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

  // Get current drawings based on current page
  const indexOfLastDrawing = currentPage * drawingsPerPage;
  const indexOfFirstDrawing = indexOfLastDrawing - drawingsPerPage;
  const currentDrawings = drawings.slice(indexOfFirstDrawing, indexOfLastDrawing);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentDrawings.map((drawing) => (
          <div
            key={drawing.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <Link to={`/drawing/${drawing?.id}`}>
              <img
                src={drawing.image.url}
                alt={drawing.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 text-gray-800">
                <h2 className="font-bold text-2xl mb-2 ">{drawing.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: drawing.body }}></div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`${
              pageNumber === currentPage
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500"
            } py-2 px-4 border border-gray-400 rounded`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DrawingCollection;

