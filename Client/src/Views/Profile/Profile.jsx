import jwt_decode from "jwt-decode";
// import style from "./Profile.module.css";
import { IconEdit, IconVip, IconUserCode } from "@tabler/icons-react";
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
    console.log(jwt_decode(token))
    setUsernameEditing(true);
  };

  return (
    <div className=" flex flex-col justify-center items-center w-screen max-w-full h-screen bg-transparent font-custom overflow-x-hidden absolute text-white">

    <div className="w-screen h-screen absolute overflow-hidden">
      <span className="absolute border-[5px] w-[5rem] h-[5rem] rounded-[100%] z-50 top-0 animate-burbujas delay-[3s]">&nbsp;</span>
      <span className="absolute border-[5px] w-[5rem] h-[5rem] rounded-[100%] z-50 left-[50%] top-0 animate-burbujas delay-[6s]">&nbsp;</span>
      <span className="absolute border-[5px] w-[5rem] h-[5rem] rounded-[100%] z-50 right-5 top-0 animate-burbujas delay-[7s]">&nbsp;</span>
      <span className="absolute border-[5px] w-[5rem] h-[5rem] rounded-[100%] z-50 left-[30rem] top-0 animate-burbujas delay-[1s]">&nbsp;</span>
      <span className="absolute border-[5px] w-[5rem] h-[5rem] rounded-[100%] z-50 right-[30rem] top-0 animate-burbujas delay-[5s]">&nbsp;</span>
    </div>

      <div className=" flex flex-col justify-center items-center shadow-inner shadow-white p-5 rounded-[2rem] bg-[#ffffff10] backdrop-blur-[6px] font-custom overflow-x-hidden absolute text-white">
        <div className="flex flex-row justify-center items-center">
          <div className="flex flex-row gap-5">
            {!usernameEditing && (
              <h2 className="text-[1.5rem]">{usernameValue}</h2>
            )}
            {!usernameEditing && (
              <IconEdit size={40} onClick={handleClickEdit}/>
            )}
          </div>

          <div className="flex flex-row justify-center items-center mb-7 border bg-transparent w-fit rounded-[5rem] focus:scale-[1.1] hover:shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]">
            {usernameEditing && (
              <input
                className="text-[1.5rem] text-white outline-none pl-3 bg-transparent"
                value={usernameValue}
                onChange={handleChangeUsernameValue}
                autoFocus
              />
            )}
            {usernameEditing && <button className= "p-1 pr-3 pl-3 border h-[2.5rem] bg-transparent rounded-[5rem]" onClick={handleClickSave}>Save</button>}
          </div>
        </div>

        <div>
          {isPremium && (
            <p className="animate-multicolor_text text-[1.2rem] uppercase">
              <IconVip size={60} />
            </p>
          )}
          {isAdmin && (
            <p>
              <IconUserCode size={60} />
            </p>
          )}
        </div>
        <img
          className="h-[96px] mb-7 rounded-[2rem]"
          src={profileImageUrl}
          alt={username}
        />
        <h3>{email}</h3>
      </div>
    </div>
  );
}
