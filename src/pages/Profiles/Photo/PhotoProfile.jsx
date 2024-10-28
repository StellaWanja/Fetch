import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useAuthContext } from "../../../hooks/authHooks/useAuthContext";
import { usePhotos } from "../../../hooks/profileHooks/usePhotos";
import { useAlbums } from "../../../hooks/profileHooks/useAlbums";
import { useProfileContext } from "../../../hooks/profileHooks/useProfileContext";
import { PhotoCard } from "../../../components";

const PhotoProfile = () => {
  // data from context
  const { loading: authLoading } = useAuthContext();
  const { loading: photoLoading, error, getPhotos } = usePhotos();
  const { photos } = useProfileContext();
  const { loading: albumLoading } = useAlbums();

  const navigate = useNavigate();

  // get photo id from params
  const [searchParams] = useSearchParams();
  const photoId = searchParams.get("photoId");

  useEffect(() => {
    try {
      const fetchPhotos = async () => !authLoading && (await getPhotos());
      fetchPhotos();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const photo = photos.find((photo) => photo.id === parseInt(photoId));

  return (
    <section className="c-space py-8 bg-white w-full min-h-screen">
      <h1 className="text-green text-4xl font-medium">Photo Details</h1>

      <p
        onClick={() => navigate(-1)}
        className="cursor-pointer py-4 flex gap-2 text-green font-medium hover:text-neutral-600 transition-colors ease-in delay-150"
      >
        <FaArrowLeftLong className=" text-2xl" />
        Back to album page
      </p>

      <div>
        {/* display loading indicator */}
        {authLoading ||
          (albumLoading && photoLoading && (
            <p className="text-green text-xl font-medium">Loading...</p>
          ))}

        {/* if no photo found, display text */}
        {!photoLoading && !photo && (
          <p className="text-green text-xl font-medium">No album found</p>
        )}

        {/* display error if any */}
        {error && <p className="text-red-500 text-xl font-medium">{error}</p>}

        {/* display album and photos*/}
        <PhotoCard photo={photo} />
      </div>
    </section>
  );
};

export default PhotoProfile;
