import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function DrawingDetails() {
  const { id } = useParams();
  const [drawing, setDrawing] = useState(null);
  

  useEffect(() => {
    axios
      .get(`https://www.planndesign.com/gapi/drawings/${id}`)
      .then((response) => {
        setDrawing(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!drawing) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <h2>{drawing.title}</h2>
      <img src={drawing.image.url} alt={drawing.title} />
      
      <div dangerouslySetInnerHTML={{ __html: drawing.body }}></div> */}
          <div className="container mx-auto">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <img
            src={drawing.image.url}
            alt={drawing.title}
            className="w-full h-auto"
          />
        </div>
        <div className="col-span-6">
          <h1 className="text-3xl font-bold mb-2">{drawing.title}</h1>
          <p className="text-lg mb-4">{drawing.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-200 h-40 p-4">{/* Grid */}</div>
            <div className="bg-gray-200 h-40 p-4">{/* List of drawings */}</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default DrawingDetails;
