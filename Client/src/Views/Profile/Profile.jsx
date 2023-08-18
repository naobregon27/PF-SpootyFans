import jwt_decode from "jwt-decode";
// import style from "./Profile.module.css";
import { IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import { spotyFansApi } from "../../../services/apiConfig";

export default function Profile() {
  const token = localStorage.getItem("token");
  const { username, email, profileImageUrl, isPremium, isAdmin } =
    jwt_decode(token);

  const [usernameValue, setUsernameValue] = useState(username);
  const [usernameEditing, setUsernameEditing] = useState(false);

  const handleChangeUsernameValue = (event) => {
    setUsernameValue(event.target.value);
  };

  const handleClickSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await spotyFansApi.put(
        "/user/newUsername",
        { newUsername: usernameValue },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      if (response.status === 200) {
        setUsernameEditing(false);
      }
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleClickEdit = () => {
    setUsernameEditing(true);
  };

  return (
    <main className="flex flex-col w-screen h-screen justify-center items-center">
      <div className="flex flex-col justify-center items-center">

        <div classname="flex flex-row justify-center items-center">

          {!usernameEditing && (
            <h2>{usernameValue}</h2>
          )}
          
          {!usernameEditing && (
            <IconPencil
              onClick={handleClickEdit}
            />
          )}
          {usernameEditing && (
            
            <input
              value={usernameValue}
              onChange={handleChangeUsernameValue}
              autoFocus
            />
          )}
          {usernameEditing && (

            <button onClick={handleClickSave}>
              Save
            </button>
          )}
        </div>

        <div>
          {isPremium && <p >Premium</p>}
          {isAdmin && <p>Admin</p>}
        </div>
        <img
          src={profileImageUrl}
          alt={username}
        />
        <h3>{email}</h3>
      </div>
    </main>
  );
}
