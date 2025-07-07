import EachUser from "../EachUser";

function FavoriteList({ favorites, handleToggleFavorite }) {
  if (favorites.length === 0) {
    return <p>Agrega un usuario favorito.</p>;
  }
  return (
    <>
      <ul className="favorites_list">
        {favorites.map((user) => (
          <li
            className="user_card"
            key={user.id}
            onClick={() => handleToggleFavorite(user)}
          >
            <EachUser user={user} isFavorite={true} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default FavoriteList;
