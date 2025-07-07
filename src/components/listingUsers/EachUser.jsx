function EachUser({ user, isFavorite }) {
  return (
    <>
      <h3 className="name_user_card">
        {user.name} {isFavorite ? "⭐" : ""}
      </h3>
      <p>Email: {user.email}</p>
      <p>Ciudad: {user.city}</p>
      <p>Teléfono: {user.phone}</p>
    </>
  );
}

export default EachUser;
