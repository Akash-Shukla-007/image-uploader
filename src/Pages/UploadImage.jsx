import React, { useState } from "react";
import DynamicInput from "../Components/DynamicInput";
import { BiLoaderCircle } from "react-icons/bi";
import { uploadImage } from "../Services/httpRequests";
import { useNavigate } from "react-router-dom";
import { config } from "../config";

function UploadImage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleSubmit = () => {
    //api integation to upload image at database
    let email = sessionStorage.getItem("session");
    if (!(title || description || pic)) {
      setErrorText("All Fields Required");
      return;
    }
    uploadImage({ url: pic, email, title, description })
      .then((res) => {
        console.log(res.data);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // uploading image on cloud
  const postDetails = (pic) => {
    setLoading(true);
    if (pic == undefined) return;
    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "Image-Uploader");
      data.append("cloud_name", "dtnbdozcb");
      fetch(config.condinaryUrl, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          // console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  return (
    <div className="dashboard_container">
      <div className="dashboard_nav">
        <h1>Dashboard</h1>
      </div>
      <div className="dashboard_content">
        <h2>Upload image</h2>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
        <DynamicInput
          placeholder="Enter Image title"
          type="text"
          value={title}
          setValue={setTitle}
        />
        <DynamicInput
          placeholder="Enter Image description"
          type="text"
          value={description}
          setValue={setDescription}
          errorText={errorText}
        />

        <button className="root_auth_button" onClick={handleSubmit}>
          Upload
        </button>
      </div>
      {loading && (
        <div className="loader">
          <BiLoaderCircle size={100} />
        </div>
      )}
    </div>
  );
}

export default UploadImage;
