import React, { useRef, useState } from "react";
import styles from "./account.module.css";
import { IoLogOutOutline, IoCameraOutline } from "react-icons/io5";
import InputControl from "../InputControl/InputControl";
import { auth, updateUserDb, uploadImage } from "../../../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Account = ({ userDetails }) => {
  const navigate = useNavigate();
  const imagePicker = useRef();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [userProfileDetails, setUserProfileDetails] = useState({
    name: userDetails.name,
    designation: userDetails.designation || "",
    github: userDetails.github || "",
    linkedin: userDetails.linkedin || "",
  });
  const [saveDetails, setSaveDetails] = useState(true);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log("File selected: ", file.name, file.type, file.size);
    setError(null);
    setUploadProgress(0);
    setImageUrl(null);

    uploadImage(
      file,
      (progress) => {
        console.log("Upload progress: ", progress);
        setUploadProgress(progress);
      },
      (url) => {
        console.log("Upload complete. URL: ", url);
        setImageUrl(url);
        setUploadProgress(0);
      },
      (err) => {
        console.error("Upload error: ", err);
        setError(err);
        setUploadProgress(0);
      }
    );
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    console.log("Saving profile details:", userProfileDetails);
    setSaveDetails(true);
  };

  const saveDetailstoDb = () => {
    updateUserDb();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.heading}>
          Welcome <span style={{ color: "black" }}>{userDetails.name}</span>
        </p>
        <div className={styles.logout} onClick={handleLogout}>
          <IoLogOutOutline /> Logout
        </div>
      </div>
      <input
        type="file"
        ref={imagePicker}
        style={{ display: "none" }}
        onChange={handleImageChange}
        accept="image/*"
      />
      <div className={styles.section}>
        <div className={styles.title}>Your profile</div>
        <div className={styles.profile}>
          <div className={styles.left}>
            <div className={styles.image}>
              <img
                src={
                  imageUrl ||
                  "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQjl3X3QecVwXnMQYLd6ZQfecKfsxGHKK_BJqq0hL6RbvDf64qbPKq7PXVhviV4r3Lbi9VoULPVVIPXRrFRNqWRZMsTeN8ba8NI06oRR9I"
                }
                alt="Profile"
                onError={(e) => console.log("Image load error: ", e)}
              />
              <IoCameraOutline
                className={styles.camera}
                onClick={() => imagePicker.current.click()}
              />
            </div>
            {uploadProgress > 0 && uploadProgress < 100 && (
              <p>Uploading: {uploadProgress}%</p>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {imageUrl && uploadProgress === 0 && (
              <p style={{ color: "rgb(3, 227, 3)" }}>
                Image uploaded successfully!
              </p>
            )}
          </div>
          <div className={styles.right}>
            <form onSubmit={handleSaveChanges} className="form">
              <div className={styles.row}>
                <InputControl
                  label={"Name"}
                  isPassword={false}
                  placeholder={"Enter your name"}
                  name={"name"}
                  value={userProfileDetails.name}
                  onChange={(event) => {
                    setSaveDetails(false);
                    setUserProfileDetails((prevVal) => ({
                      ...prevVal,
                      name: event.target.value,
                    }));
                  }}
                />
                <InputControl
                  label={"Title"}
                  isPassword={false}
                  placeholder={"eg. Full stack developer"}
                  name={"designation"}
                  value={userProfileDetails.designation}
                  onChange={(event) => {
                    setSaveDetails(false);
                    setUserProfileDetails((prevVal) => ({
                      ...prevVal,
                      designation: event.target.value,
                    }));
                  }}
                />
              </div>
              <div className={styles.row}>
                <InputControl
                  label={"GitHub"}
                  isPassword={false}
                  placeholder={"Enter your github link"}
                  name={"github"}
                  value={userProfileDetails.github}
                  onChange={(event) => {
                    setSaveDetails(false);
                    setUserProfileDetails((prevVal) => ({
                      ...prevVal,
                      github: event.target.value,
                    }));
                  }}
                />
                <InputControl
                  label={"LinkedIn"}
                  isPassword={false}
                  placeholder={"Enter your LinkedIn link"}
                  name={"linkedin"}
                  value={userProfileDetails.linkedin}
                  onChange={(event) => {
                    setSaveDetails(false);
                    setUserProfileDetails((prevVal) => ({
                      ...prevVal,
                      linkedin: event.target.value,
                    }));
                  }}
                />
              </div>
              <div className={styles.save}>
                <button type="submit" disabled={saveDetails}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
