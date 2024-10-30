import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// display photos under album
const AlbumCard = ({ album, photos }) => {
  const navigate = useNavigate();
  const {title} = album

  return (
    <div className="py-8" >
      <h2 className="text-green font-medium text-2xl pb-2 border-b-2 border-green">
        Album Title: <span className="font-semibold">{title}</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 py-8 ">
        {photos.map(({ id, title, url, thumbnailUrl }) => (
          <div
            key={id}
            className="text-green cursor-pointer flex flex-col items-center hover:text-neutral-600 hover:underline  transition ease-in delay-150"
            onClick={() => navigate(`/photos?photoId=${id}`)}
          >
            <img
              src={url}
              alt={thumbnailUrl}
              className="w-[250px] h-[250px] object-cover"
            />
            <p className="font-medium text-center pb-8 tex-lg">{title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

AlbumCard.propTypes = {
  album: PropTypes.object.isRequired,
  photos: PropTypes.array.isRequired,
};

export default AlbumCard;
