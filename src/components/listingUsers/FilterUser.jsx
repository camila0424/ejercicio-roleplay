function FilterUser({ handleInputFilterUser, filterUser, favorites }) {
  return (
    <form className="filtered-search">
      <input
        className="search_user"
        type="text"
        placeholder="Busca un nombre"
        onInput={handleInputFilterUser}
        value={filterUser}
      />

      <div className="favorites-counter">⭐ Favoritos: {favorites.length}</div>
    </form>
  );
}

export default FilterUser;
