import "../styles/App.scss";
import { useState, useEffect } from "react";
import Header from "./layout/Header";
import FilterUser from "./listingUsers/FilterUser";
import UserList from "./listingUsers/UserList";
import FavoriteList from "./listingUsers/favoriteList/FavoriteList";

function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [filterUser, setFilterUser] = useState("");
  const [favorites, setFavorites] = useState([]);

  const handleInputFilterUser = (ev) => {
    setFilterUser(ev.target.value);
  };

  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(filterUser.toLowerCase())
  );

  const handleToggleFavorite = (user) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === user.id);
    if (isAlreadyFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== user.id));
    } else {
      setFavorites([...favorites, user]);
    }
  };

  useEffect(() => {
    fetch("./data/data.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos cargados:", data);
        setAllUsers(data);
      })
      .catch((error) => {
        console.error("Error al cargar los datos:", error);
      });
  }, []);

  return (
    <>
      <Header />
      <FilterUser
        handleInputFilterUser={handleInputFilterUser}
        filterUser={filterUser}
        favorites={favorites}
      />
      <div
        className={`layout-container ${
          favorites.length > 0 ? "with-favs" : ""
        }`}
      >
        {/* Columna 1: Usuarios */}
        <section className="users-list">
          <h2 className="title_of_section_user">👥 Todos los usuarios</h2>
          <UserList
            allUsers={filteredUsers}
            favorites={favorites}
            handleToggleFavorite={handleToggleFavorite}
          />
        </section>

        {/* Columna 2: Solo si hay favoritos */}
        <section
          className={`favorites-list ${favorites.length > 0 ? "visible" : ""}`}
        >
          <h2 className="title_of_section_favorite">⭐ Favoritos</h2>
          <FavoriteList
            favorites={favorites}
            handleToggleFavorite={handleToggleFavorite}
          />
        </section>
      </div>
    </>
  );
}

export default App;
