import React from "react";

// css
import "./ProfileImage.css";

const ProfileImage = ({ image, lastname, firstname, updateImagePreview }) => {
  return (
    <div className="profile_Image_Container">
      <>
        {image === "N/A" ? (
          <>{`${lastname[0].toUpperCase()}${firstname[0].toUpperCase()}`}</>
        ) : (
          <img src={updateImagePreview ? updateImagePreview : image} alt="" />
        )}
      </>
    </div>
  );
};

export default ProfileImage;
