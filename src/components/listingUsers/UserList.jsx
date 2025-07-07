import { useEffect } from "react";
import EachUser from "./EachUser";
function UserList({ allUsers, favorites, handleToggleFavorite }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!Array.isArray(allUsers)) {
    return <p>Cargando usuarios...</p>;
  }

  return (
    <>
      <ul className="listing_users_container">
        {allUsers.map((user) => (
          <li
            className="user_card"
            key={user.id}
            onClick={() => handleToggleFavorite(user)}
          >
            <EachUser
              user={user}
              isFavorite={favorites.some((fav) => fav.id === user.id)}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default UserList;
