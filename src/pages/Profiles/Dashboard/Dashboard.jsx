import { useEffect } from "react";
import { useAuthContext } from "../../../hooks/authHooks/useAuthContext";
import {useUsersProfile}   from "../../../hooks/profileHooks/useUsersProfile";
import { useProfileContext } from "../../../hooks/profileHooks/useProfileContext";
import { useAlbums } from "../../../hooks/profileHooks/useAlbums";
import { DashboardCard } from "../../../components";

const Dashboard = () => {
  // data from context
  const { owner, loading: authLoading } = useAuthContext();
  const { getUsers, loading: usersLoading, error } = useUsersProfile();
  const { users, albums } = useProfileContext();
  const { getAlbums } = useAlbums();

  // display data on mount
  useEffect(() => {
    try {
      // Only fetch users and albums if authentication check is complete
      const fetchUsers = async () => !authLoading && (await getUsers());
      const fetchAlbums = async () => !authLoading && (await getAlbums());

      fetchUsers();
      fetchAlbums();
    } catch (error) {
      console.error(error);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="c-space py-8 bg-white w-full min-h-screen">
      <h1 className="text-green text-4xl font-medium">
        Welcome {owner?.displayName}
      </h1>

      <div>
        <p className="py-4 text-green text-xl font-medium">Users</p>

        {/* display loading indicator */}
        {authLoading ||
          (usersLoading && (
            <p className="text-green text-xl font-medium">Loading...</p>
          ))}

        {/* if no users found, display text */}
        {!usersLoading && users.length === 0 && (
          <p className="text-green text-xl font-medium">No users found</p>
        )}

        {/* display error if any */}
        {error && <p className="text-red-500 text-xl font-medium">{error}</p>}

        {/* display users */}
        {!usersLoading &&
          users.length > 0 &&
          users.map((user) => (
            <DashboardCard key={user.id} user={user} albums={albums} />
          ))}
      </div>
    </section>
  );
};

export default Dashboard;
