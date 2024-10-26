import React from "react";

const PhotoCard = ({ photo }) => {
  const { title, url, thumbnailUrl } = photo;

  return (
    <div className="py-8">
      <div>
        <h2 className="text-green font-medium text-2xl pb-2 border-b-2 border-green">
          Photo Title: <span className="font-semibold">{title}</span>
        </h2>
        
      </div>
      <div>
        <img
          src={url}
          alt={thumbnailUrl}
          className="w-1/4 h-1/4 object-cover justify-self-center pt-8"
        />
      </div>
    </div>
  );
};

export default PhotoCard;
