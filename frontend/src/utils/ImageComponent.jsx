import React from 'react';

const ImageComponent = ({ base64String }) => {
  return <img src={`data:image/jpg;base64,${base64String}`} alt="My Image" />;
};

export default ImageComponent;