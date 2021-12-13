import React from "react";

// css
import "./ProfileImage.css";

const ProfileImage = ({ image, lastname, firstname, updateImagePreview }) => {
  return (
    <div className="profile_Image_Container">
      <>
        {image === "N/A" ? (
          <span>
            {!lastname ? `${firstname[0]}` : `${lastname[0]}${firstname[0]}`}
          </span>
        ) : (
          <img src={updateImagePreview ? updateImagePreview : image} alt="" />
        )}
      </>
    </div>
  );
};

export default ProfileImage;
