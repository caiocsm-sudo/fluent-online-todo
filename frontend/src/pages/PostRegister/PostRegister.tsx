import { FC } from "react";

const PostRegister: FC = () => {
  return (
    <section>
      <div className="introduction">
        <h2>Welcome to DirectX Todos</h2>
        <p>
          Please, fill out the forms to create your user into our application
        </p>
      </div>
      <form method="post">
        <div>
          <input type="image" src="" alt="profile-image" />
          <label htmlFor="image">Upload image</label>
        </div>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Type your username"
          />
        </div>
      </form>
    </section>
  );
};

export default PostRegister;
