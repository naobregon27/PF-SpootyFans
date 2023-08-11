import jwt_decode from "jwt-decode";
import style from "./Profile.module.css";
import { AiFillEdit } from "react-icons/ai";
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
    <main className={style.main_container}>
      <div className={style.profile_container}>
        <div className={style.username_container}>
          {!usernameEditing && (
            <h2 className={style.username}>{usernameValue}</h2>
          )}
          {!usernameEditing && (
            <AiFillEdit
              className={style.edit_username}
              onClick={handleClickEdit}
            />
          )}
          {usernameEditing && (
            <input
              className={style.input_name}
              value={usernameValue}
              onChange={handleChangeUsernameValue}
              autoFocus
            />
          )}
          {usernameEditing && (
            <button className={style.button_save} onClick={handleClickSave}>
              Save
            </button>
          )}
        </div>
        <div className={style.tags_container}>
          {isPremium && <p className={style.premium}>Premium</p>}
          {isAdmin && <p className={style.admin}>Admin</p>}
        </div>
        <img
          className={style.profile_image}
          src={profileImageUrl}
          alt={username}
        />
        <h3 className={style.email}>{email}</h3>
      </div>
    </main>
  );
}
