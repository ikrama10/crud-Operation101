import React from "react";

const CrudChild = ({props}) => {
  return (
    <>
      <div>
        <h2>{props.title}</h2>
        <p>{props.body}</p>
      </div>
    </>
  );
};

export default CrudChild;
