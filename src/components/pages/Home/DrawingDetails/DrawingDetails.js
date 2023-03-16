import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import { useContext } from "react";
import Loader from "../../../Loader/Loader";
import { AuthContext } from "../../../../context/AuthProvider/AuthProvider";
function DrawingDetails() {
  const { user } = useContext(AuthContext);

  const { id } = useParams();
  const [drawings, setDrawings] = useState(null);
  console.log(drawings);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://www.planndesign.com/gapi/drawings?slug=${id}`)
      .then((response) => {
        setDrawings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  const handleDownload = () => {
    if (user) {
      const doc = new jsPDF();

      doc.setFontSize(20);
      doc.text(drawings[0].title, 15, 15);

      const imgData = drawings[0].image.url;
      doc.addImage(imgData, "JPEG", 15, 30, 180, 120);

      doc.setFontSize(14);
      doc.text("Categories:", 15, 160);
      const categories = drawings[0].drawing_categories
        .map((category) => category.name)
        .join(", ");
      doc.text(categories, 30, 170);

      doc.setFontSize(14);
      doc.text("Author:", 15, 190);
      doc.text(`Name: ${drawings[0].author.username}`, 30, 200);
      doc.text(`Email: ${drawings[0].author.email}`, 30, 210);

      doc.setFontSize(14);
      doc.text("File:", 15, 230);
      doc.text(`Size: ${drawings[0].drawing_file.size}`, 30, 240);
      doc.text(`Type: ${drawings[0].drawing_softwares[0].name}`, 30, 250);
      doc.text(`Software: ${drawings[0].software}`, 30, 260);

      doc.save(`${drawings[0].title}.pdf`);
    } else {
      navigate("/login");
    }
  };

  if (!drawings) {
    return <Loader />;
  }
  if (!drawings) {
    return <Loader />;
  }
  return (
    <div>
      {drawings?.map((drawing) => (
        <>
          <div className="container mx-auto mt-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="col-span-1 md:col-span-8">
                <div className="bg-gradient-to-r from-[#141e30] to-[#243b55] rounded-lg shadow-md p-8">
                  <div
                    className=" text-center text-3xl"
                    dangerouslySetInnerHTML={{ __html: drawing.body }}
                  ></div>
                  <img
                    src={drawing.image.url}
                    alt={drawing.title}
                    className="w-full h-auto rounded-md mt-6 mb-8"
                  />
                  {drawing.drawing_categories.map((description) => (
                    <p className=" text-lg mb-4" key={description.id}>
                      {description.description}
                    </p>
                  ))}
                </div>
              </div>

              <div className="col-span-1 md:col-span-4 text-center">
                <div className="bg-gradient-to-r from-[#141e30] to-[#243b55] shadow-md rounded-lg overflow-hidden p-6">
                  <h1 className="text-3xl font-bold mb-4 ">{drawing.title}</h1>
                  <div className="flex items-center mb-4">
                    <img
                      className="w-10 h-10 rounded-full mr-3"
                      src={drawing.author.profileImage}
                      alt="AuthorImage"
                    />
                    <div>
                      <h2 className="text-lg font-semibold  mb-1">
                        {drawing.author.username}
                      </h2>
                      <p className=" text-sm">
                        {drawing.drawing_categories.map((description) => (
                          <span className="text-lg mb-4">
                            {description.description}{" "}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="">Size: {drawing.drawing_file.size}</p>
                    <p className="">
                      Type:{" "}
                      {drawing.drawing_categories.map((description) => (
                        <span className="text-lg mb-4">
                          {description.name}{" "}
                        </span>
                      ))}
                    </p>
                    <p className="">
                      Category:{" "}
                      {drawing.drawing_softwares.map((description) => (
                        <span className="text-lg mb-4">
                          {description.name}{" "}
                        </span>
                      ))}
                    </p>
                    <p className="">Software: {drawing.software}</p>

                    <p className="">
                      Published On:{" "}
                      {drawing.drawing_softwares.map((description) => (
                        <span className="text-lg mb-4">
                          {new Date(
                            description.created_at
                          ).toLocaleDateString()}
                        </span>
                      ))}
                    </p>
                  </div>

                  <button
                    onClick={handleDownload}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Download Drawing
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-5">
                  {drawing?.tags?.map((tag) => (
                    <div
                      key={tag.id}
                      className="bg-gradient-to-r from-[#141e30] to-[#243b55] text-white font-semibold py-1 px-3 rounded-lg text-center"
                    >
                      {tag.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default DrawingDetails;
