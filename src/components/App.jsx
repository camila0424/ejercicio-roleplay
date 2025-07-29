import "../styles/App.scss";
import { useState, useEffect } from "react";
import Header from "./layout/Header";
import FilterUser from "./listingUsers/FilterUser";
import UserList from "./listingUsers/UserList";
import FavoriteList from "./listingUsers/favoriteList/FavoriteList";
import UserForm from "./form/UserForm";
import Footer from "./layout/Footer";

function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [filterUser, setFilterUser] = useState("");
  const [favorites, setFavorites] = useState([]);

  // Cargar favoritos desde localStorage al iniciar
  useEffect(() => {
    const savedFavorites = localStorage.getItem("userFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Guardar favoritos en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("userFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleInputFilterUser = (ev) => {
    setFilterUser(ev.target.value);
  };

  const handleToggleFavorite = (user) => {
    const isAlreadyFavorite = favorites.some((fav) => fav.id === user.id);
    if (isAlreadyFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== user.id));
    } else {
      setFavorites([...favorites, user]);
    }
  };

  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(filterUser.toLowerCase())
  );

  // Función para agregar nuevo usuario
  const addNewUser = (newUser) => {
    const userWithId = {
      ...newUser,
      id: Date.now(), // ID único basado en timestamp
    };
    setAllUsers([...allUsers, userWithId]);
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
    <div className="app-container">
      <Header />
      <FilterUser
        handleInputFilterUser={handleInputFilterUser}
        filterUser={filterUser}
        favorites={favorites}
      />
      <div
        className={`main-content ${favorites.length > 0 ? "with-favs" : ""}`}
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
        {favorites.length > 0 && (
          <section className="favorites-section">
            <h2 className="title_of_section_favorite">
              ⭐ Favoritos ({favorites.length})
            </h2>
            <div className="favorites-container">
              <FavoriteList
                favorites={favorites}
                handleToggleFavorite={handleToggleFavorite}
              />
            </div>
          </section>
        )}
      </div>
      <UserForm onAddUser={addNewUser} />
      <Footer />
    </div>
  );
}

export default App;
