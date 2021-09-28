import React from "react";

const PageNotFound = ({ history }) => {
  const returnHome = () => {
    history.push("/");
  };
  return <div>{returnHome()}</div>;
};

export default PageNotFound;
