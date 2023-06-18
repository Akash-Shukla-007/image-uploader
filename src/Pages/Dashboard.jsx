import React, { useEffect, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { FetchImage, logout } from "../Services/httpRequests";
import { useDispatch, useSelector } from "react-redux";
import { setItem } from "../action";

const Dashboard = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    setLoading(true);
    await logout()
      .then((res) => {
        setLoading(false);
        sessionStorage.removeItem("session");
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const UploadImageHandler = () => {
    navigate("/upload-image");
  };
  useEffect(() => {
    let email = sessionStorage.getItem("session");
    setLoading(true);
    FetchImage({ email })
      .then((res) => {
        setLoading(false);
        // console.log(res.data);
        let results = res.data.images;
        dispatch(setItem(results));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="dashboard_container">
      <div className="dashboard_nav">
        <h1>Dashboard</h1>
        <div className="nav_button">
          <button className="btn" onClick={UploadImageHandler}>
            Upload Image
          </button>
          <button className="btn" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </div>
      <div className="images_container">
        {items[0] &&
          items[0].map((item, index) => {
            return (
              <div className="uploaded_images" key={index}>
                <img src={item.url} alt={item.title} className="image_item" />
                <p className="images_title">{item.title}</p>
                <p className="images_description">{item.description}</p>

                <p className="images_views">{`${Math.floor(
                  item.views
                )} views`}</p>
              </div>
            );
          })}
      </div>
      {loading && (
        <div className="loader">
          <BiLoaderCircle size={100} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
