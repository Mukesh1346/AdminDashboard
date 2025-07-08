import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaList } from "react-icons/fa6";

export default function Banner() {
  const [images, setImages] = useState([]);
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");
  const [title3, setTitle3] = useState("");
  const [title4, setTitle4] = useState("");

  const navigate = useNavigate();

  const inputImage = (event) => {
    setImages([...images, ...Array.from(event.target.files)]);
    console.log("Selected images:", [...images, ...Array.from(event.target.files)]);
  };

  const inputTitle = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "title1":
        setTitle1(value);
        console.log("Title 1:", value);
        break;
      case "title2":
        setTitle2(value);
        console.log("Title 2:", value);
        break;
      case "title3":
        setTitle3(value);
        console.log("Title 3:", value);
        break;
      case "title4":
        setTitle4(value);
        console.log("Title 4:", value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Data:", { images, title1, title2, title3, title4 });
    // You can add API calls or logic here
  };

  return (
    <>
      <section style={{ margin: "96px 0px 0px 261px", width: "82%" }}>
        <div className="d-flex justify-content-between mb-3">
          
        <button 
          className="btn btn-secondary mb-3" 
          onClick={() => navigate(-1)}
        >
          Back
        </button>

        <Link to="./details">
          <button 
          className="btn btn-secondary mb-3" 
          // onClick={() => navigate('./banner-detail')}

        >
        <FaList  className="fs-4"/> 
        </button>
        </Link>
        </div>

        <h2 className="text-center">Home Page Banner</h2>

        <div className="banner-input">
          <div className="container">
            <form onSubmit={handleSubmit}>
              <div className="row">
                  <div className="col-md-4">
                  <label htmlFor="title4" className="form-label">Title 4</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="title4" 
                    name="title4" 
                    value={title4} 
                    placeholder="Enter Title 4" 
                    onChange={inputTitle} 
                  />
                </div>
            

                <div className="col-md-4">
                  <label htmlFor="title1" className="form-label">Title 1</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="title1" 
                    id="title1" 
                    value={title1} 
                    onChange={inputTitle} 
                    placeholder="Enter Title 1" 
                  />
                </div>

                <div className="col-md-4">
                  <label htmlFor="title2" className="form-label">Title 2</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="title2" 
                    name="title2" 
                    value={title2} 
                    placeholder="Enter Title 2" 
                    onChange={inputTitle} 
                  />
                </div>
              </div>

              <div className="row mt-4">
                
                <div className="col-md-4">
                  <label htmlFor="title3" className="form-label">Title 3</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="title3" 
                    id="title3" 
                    value={title3} 
                    placeholder="Enter Title 3" 
                    onChange={inputTitle} 
                  />
                </div>


                    <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="fileInput1" className="form-label">Upload Images</label>
                    <input 
                      className="form-control" 
                      name="image" 
                      type="file" 
                      id="fileInput1" 
                      onChange={inputImage} 
                      multiple 
                    />
                  </div>

                  {/* Image Previews */}
                  <div className="mt-3">
                    {images.map((img, index) => (
                      <img 
                        key={index} 
                        src={URL.createObjectURL(img)} 
                        alt="Preview" 
                        style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "10px", marginBottom: "10px" }} 
                      />
                    ))}
                  </div>
                </div>

              
              </div>

              <button type="submit" className="btn btn-primary mt-4">Submit</button>

            </form>
          </div>
        </div>
      </section>
    </>
  );
}
