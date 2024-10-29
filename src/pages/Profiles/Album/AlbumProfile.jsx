import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useAuthContext } from "../../../hooks/authHooks/useAuthContext";
import { useAlbums } from "../../../hooks/profileHooks/useAlbums";
import { useProfileContext } from "../../../hooks/profileHooks/useProfileContext";
import { usePhotos } from "../../../hooks/profileHooks/usePhotos";
import { AlbumCard } from "../../../components";

const AlbumProfile = () => {
  // data from context
  const { loading: authLoading } = useAuthContext();
  const { albums, photos } = useProfileContext();
  const { loading: photosLoading, error, getPhotos } = usePhotos();
  const { getAlbums, loading: albumLoading } = useAlbums();

  const navigate = useNavigate();

  // get album id from params
  const [searchParams] = useSearchParams();
  const albumId = searchParams.get("albumId");

  useEffect(() => {
    try {
      const fetchAlbums = async () => !authLoading && (await getAlbums());
      const fetchPhotos = async () => !authLoading && (await getPhotos());
      fetchAlbums();
      fetchPhotos();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const album = albums.find((user) => user.id === parseInt(albumId));
  const albumPhotos = photos.filter(
    (photo) => photo.albumId === parseInt(albumId)
  );

  return (
    <section className="c-space py-8 bg-white w-full min-h-screen">
      <h1 className="text-green text-4xl font-medium">Album Details</h1>

      <p
        onClick={() => navigate(-1)}
        className="cursor-pointer py-4 flex gap-2 text-green font-medium hover:text-neutral-600 transition-colors ease-in delay-150"
      >
        <FaArrowLeftLong className=" text-2xl" />
        Back to user page
      </p>

      <div>
        {/* display loading indicator */}
        {authLoading ||
          (albumLoading && photosLoading && (
            <p className="text-green text-xl font-medium">Loading...</p>
          ))}

        {/* if no album found, display text */}
        {!albumLoading && !album && (
          <p className="text-green text-xl font-medium">No album found</p>
        )}

        {/* display error if any */}
        {error && <p className="text-red-500 text-xl font-medium">{error}</p>}

        {/* display album and photos*/}
        {!albumLoading && album && (
          <AlbumCard album={album} photos={albumPhotos} />
        )}
      </div>
    </section>
  );
};

export default AlbumProfile;
