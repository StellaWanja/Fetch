import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Card from "../../components/Card/Card";

const APIURL = "https://jsonplaceholder.typicode.com/";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);
  const { user, loading } = useAuthContext();

  useEffect(() => {
    try {
      //fetch users
      const fetchUsers = async () => {
        const response = await fetch(`${APIURL}users`);

        // if response was not 200
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      };

      // fetch albums
      const fetchAlbums = async () => {
        const response = await fetch(`${APIURL}albums`);

        // if response was not 200
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setAlbums(data);
      };

      fetchUsers();
      fetchAlbums();
    } catch (error) {
      console.error(error);
    }
  }, [users]);

  return (
    <section className="c-space py-8 bg-white w-full min-h-screen">
      <h1 className="text-green text-4xl font-medium">
        Welcome {user?.displayName}
      </h1>

      <div>
        <p className="py-4 text-green text-xl font-medium">Users</p>
        {loading && <p>Loading...</p>}
        {/* {!loading && <Table users={users} />} */}
        {!loading &&
          users.map((user) => (
            <Card key={user.id} user={user} albums={albums} />
          ))}
      </div>
    </section>
  );
};

export default Dashboard;
