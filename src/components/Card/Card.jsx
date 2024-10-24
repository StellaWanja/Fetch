import React from "react";

// display user card
const Card = ({ user, albums }) => {
  const { id, name, email } = user;

  // get albums per user
  const albumsPerUser = albums.filter(album => album.userId === id);

  return (
    <div className="flex flex-col gap-4 sm:flex-row justify-between shadow-md py-4 px-8 rounded mb-8 cursor-pointer hover:bg-lightgray transition-colors ease-in delay-150">
      <div>
        <h3 className="text-lg text-green font-semibold">{name}</h3>
        <p className="text-neutral-700">{email}</p>
      </div>
      <div>
        <h3 className="text-lg text-green font-semibold">Number of Albums:</h3>
        <p className="text-neutral-700">{albumsPerUser.length}</p>
      </div>
    </div>
  );
};

export default Card;
