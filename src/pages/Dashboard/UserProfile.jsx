import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUsersProfile } from "../../hooks/useUsersProfile";
import { useProfileContext } from "../../hooks/useProfileContext";
import { useAlbums } from "../../hooks/useAlbums";
import { CardProfile } from "../../components";

const UserProfile = () => {
  // data from context
  const { loading: authLoading } = useAuthContext();
  const { getUsers, loading: usersLoading, error } = useUsersProfile();
  const { users, albums } = useProfileContext();
  const { getAlbums } = useAlbums();

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

      <div>
        {/* display loading indicator */}
        {authLoading ||
          (usersLoading && (
            <p className="text-green text-xl font-medium">Loading...</p>
          ))}

        {/* if no user found, display text */}
        {!usersLoading && !user && (
          <p className="text-green text-xl font-medium">No user found</p>
        )}

        {/* display error if any */}
        {error && <p className="text-red-500 text-xl font-medium">{error}</p>}

        {/* display user albums and details */}
        <CardProfile user={user} albums={userAlbums} />
      </div>
    </section>
  );
};

export default UserProfile;
