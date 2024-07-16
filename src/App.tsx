import React, { useState } from "react";
import { account, ID, Account } from "./appwrite";

interface User {
  $id: string;
  name: string;
  email: string;
  password: string;
}

const App: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const login = async (email: string, password: string): Promise<void> => {
    await account.createEmailPasswordSession(email, password);
    const user = await account.get();
    setLoggedInUser(user);
  };

  const register = async (): Promise<void> => {
    await account.create(ID.unique(), email, password, name);
    await login(email, password);
  };

  const logout = async (): Promise<void> => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  return (
    <div>
      <p>
        {loggedInUser ? `Logged in as ${loggedInUser.name}` : "Not logged in"}
      </p>

      <form>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="button" onClick={() => login(email, password)}>
          Login
        </button>

        <button type="button" onClick={register}>
          Register
        </button>

        <button type="button" onClick={logout}>
          Logout
        </button>
      </form>
    </div>
  );
};

export default App;
