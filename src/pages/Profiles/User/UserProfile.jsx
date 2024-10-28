import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useUsersProfile } from "../../../hooks/useUsersProfile";
import { useProfileContext } from "../../../hooks/useProfileContext";
import { useAlbums } from "../../../hooks/useAlbums";
import { UserCardProfile } from "../../../components";

const UserProfile = () => {
  // data from context
  const { loading: authLoading } = useAuthContext();
  const { users, albums } = useProfileContext();
  const { getUsers, loading: usersLoading, error } = useUsersProfile();
  const { getAlbums, loading: albumsLoading } = useAlbums();

  const navigate = useNavigate();

  // get user id from params
  const [searchParams] = useSearchParams();
  const uid = searchParams.get("uid");

  useEffect(() => {
    // Fetch users if authentication check is complete
    try {
      const fetchUsers = async () => !authLoading && (await getUsers());
      const fetchAlbums = async () => !authLoading && (await getAlbums());

      fetchUsers();
      fetchAlbums();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const user = users.find((user) => user.id === parseInt(uid));
  const userAlbums = albums.filter((album) => album.userId === parseInt(uid));

  return (
    <section className="c-space py-8 bg-white w-full min-h-screen">
      <h1 className="text-green text-4xl font-medium">User Details</h1>

      <p
        onClick={() => navigate(-1)}
        className="cursor-pointer py-4 flex gap-2 text-green font-medium hover:text-neutral-600 transition-colors ease-in delay-150"
      >
        <FaArrowLeftLong className=" text-2xl" />
        Back to home page
      </p>

      <div>
        {/* display loading indicator */}
        {authLoading ||
          (usersLoading && albumsLoading && (
            <p className="text-green text-xl font-medium">Loading...</p>
          ))}

        {/* if no user found, display text */}
        {!usersLoading && !user && (
          <p className="text-green text-xl font-medium">No user found</p>
        )}

        {/* display error if any */}
        {error && <p className="text-red-500 text-xl font-medium">{error}</p>}

        {/* display user albums and details */}
        <UserCardProfile user={user} albums={userAlbums} />
      </div>
    </section>
  );
};

export default UserProfile;
