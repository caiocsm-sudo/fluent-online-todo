import { FC } from "react";

import { useSelector } from "react-redux";

const Profile: FC = () => {
  const user = useSelector(state => state.user);

  return(
    <section style={{ display: 'flex', flexDirection: "column", gap: '1rem' }}>
      <h1 style={{ fontSize: "2rem"}}>This is your profile</h1>
      <div style={{ fontSize: "1rem" }}>
        <h3>{user.username}</h3>
        <p>{user.user_email}</p>
        <p>{user.id}</p>
      </div>
    </section>
  );
}

export default Profile;
