import React, { useState } from 'react';

export default function Banner() {
  const [images, setImages] = useState([]);
  const [title1, setTitle1] = useState("");
  const [title2, setTitle2] = useState("");
  const [title3, setTitle3] = useState("");
  const [title4, setTitle4] = useState("");

  const inputImage = (event) => {
    setImages([...images, ...Array.from(event.target.files)]);
    console.log("Selected images:", [...images, ...Array.from(event.target.files)]);
  }
  const inputTitle = (event) => {
// console.log("title",event.target.value)

const { name, value } = event.target;

    switch (name) {

      case title1:

        setTitle1(value);
        console.log("Title 1:",value);

        break;

      case title2:

        setTitle2(value);
        console.log("Title 2:", value);
        break;

      case title3:
        setTitle3(value);
        console.log("Title 3:",value);
        break;
      case title4:
        setTitle4(value);
        console.log("Title 4 :", value)

    }




  }



  return (
    <>
      <section style={{ margin: "96px 0px 0px 261px", width: "82%" }}>
        <div className="banner-input">
          <div className="container">
            <form>
              <div className="row">
                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="fileInput1" className="form-label">Upload Images</label>
                    <input className="form-control" name="image" type="file" id="fileInput1" onChange={inputImage} multiple />
                  </div>
                </div>
                <div className="col-md-4">
                  <label htmlFor="title1" className="form-label">Title 1</label>
                  <input type="text" className="form-control" name="title1" id="title1" onChange={inputTitle} placeholder="Enter Title 1" />
                </div>
                <div className="col-md-4">
                  <label htmlFor="title2" className="form-label">Title 2</label>
                  <input type="text" className="form-control" id="title2" name="title2" placeholder="Enter Title 2" onChange={inputTitle} />
                </div>
              </div>

              <div className="row mt-4">

                <div className="col-md-4">
                  <label htmlFor="title3" className="form-label">Title 4</label>
                  <input type="text" className="form-control" name="title3" id="title3" placeholder="Enter Title 3" onChange={inputTitle} />
                </div>

                <div className="col-md-4">
                  <div className="mb-3">
                    <label htmlFor="fileInput2" className="form-label">Upload More Images</label>
                    <input className="form-control" type="file" id="fileInput2" name="title4" multiple onChange={inputTitle} />
                  </div>
                </div>
                <div className="col-md-4">
                  <label htmlFor="title4" className="form-label">Title 4</label>
                  <input type="text" className="form-control" id="title4" name="title5" placeholder="Enter Title 4" onChange={inputTitle} />
                </div>
              </div>
            </form>

          </div>
        </div>
      </section>
    </>
  );
}
