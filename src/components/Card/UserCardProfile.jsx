import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const UserCardProfile = ({ user, albums }) => {
  const navigate = useNavigate();

  return (
    <div className="py-8">
      <div className="c-space flex flex-col md:flex-row gap-4 justify-around">
        <div>
          <h2 className="text-green font-medium text-2xl pb-2 border-b-2 border-green">
            {user?.name}
          </h2>
          <p className="text-green pt-4">
            <span className="font-medium">Username:</span> {user?.username}
          </p>
          <p className="text-green">
            <span className="font-medium">Email:</span> {user?.email}
          </p>
          <p className="text-green">
            <span className="font-medium">Phone:</span> {user?.phone}
          </p>
          <p className="text-green">
            <span className="font-medium">Website:</span> {user?.website}
          </p>

          <div>
            <h3 className="text-green font-medium text-lg py-2">Address</h3>
            <p className="text-green">
              <span className="font-medium">Street: </span>
              {user?.address.street}
            </p>
            <p className="text-green">
              <span className="font-medium">Suite: </span> {user?.address.suite}
            </p>
            <p className="text-green">
              <span className="font-medium">City: </span> {user?.address.city}
            </p>
            <p className="text-green">
              <span className="font-medium">Zipcode: </span>
              {user?.address.zipcode}
            </p>
            <p className="text-green">
              <span className="font-medium">Lat: </span> {user?.address.geo.lat}
            </p>
            <p className="text-green">
              <span className="font-medium">Long: </span>{" "}
              {user?.address.geo.lng}
            </p>
          </div>

          <div>
            <h3 className="text-green font-medium text-lg py-2">Company</h3>
            <p className="text-green">
              <span className="font-medium">Name: </span> {user?.company.name}
            </p>
            <p className="text-green">
              <span className="font-medium">Catch Phrase: </span>
              {user?.company.catchPhrase}
            </p>
            <p className="text-green">
              <span className="font-medium">BS: </span> {user?.company.bs}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-green font-medium text-2xl py-4">Albums</h2>
          <ul>
            {albums.map((album) => (
              <li
                className="text-green border-t-2 border-green py-4 cursor-pointer hover:text-neutral-600 transition-colors ease-in delay-150"
                key={album.id}
                onClick={() => navigate(`/albums?albumId=${album.id}`)}
              >
                {album.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

UserCardProfile.propTypes = {
  user: PropTypes.object.isRequired,
  albums: PropTypes.array.isRequired,
};

export default UserCardProfile;
