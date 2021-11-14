import React from "react";

// css
import "./ProfileImage.css";

const ProfileImage = ({ image, lastname, firstname, updateImagePreview }) => {
  return (
    <div className="profile_Image_Container">
      <>
        {image === "N/A" ? (
          <>{!lastname ? `${firstname[0]}` : `${lastname[0]}${firstname[0]}`}</>
        ) : (
          <img src={updateImagePreview ? updateImagePreview : image} alt="" />
        )}
      </>
    </div>
  );
};

export default ProfileImage;
