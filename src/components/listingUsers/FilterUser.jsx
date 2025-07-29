import CounterFavorites from "./favoriteList/counter/CounterFavorites";
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

      <CounterFavorites count={favorites.length} />
    </form>
  );
}

export default FilterUser;
