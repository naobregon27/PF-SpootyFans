import React from "react";
import {
   IconArrowsShuffle,
   IconPlayerSkipBack,
   IconPlayerPlayFilled,
   IconPlayerSkipForward,
   IconPlaylist,
} from "@tabler/icons-react";

function LoadingPage() {
   return (
      <div className="w-screen h-screen flex flex-col justify-center items-center text-white">
         <div className="rounded-[1.5rem] shadow-inner shadow-white bg-[#00000040] backdrop-blur-[10px] p-[2rem]">
            <div className="flex flex-row w-[28rem] justify-center items-center ">
               <p className="font-custom text-[2rem] animate-pulse">
                  Loading...
               </p>
            </div>
            <div className="flex flex-row w-[30rem] items-center bg-[#ffffff20] rounded-[2rem]">
               <span className="h-[1rem] rounded-full bg-white animate-loader_animation origin-left"></span>
            </div>
            <div className="flex flex-row justify-around items-center w-[30rem] p-5">
               <IconArrowsShuffle size={24} />
               <IconPlayerSkipBack size={24} />
               <IconPlayerPlayFilled size={35} />
               <IconPlayerSkipForward size={24} />
               <IconPlaylist size={24} />
            </div>
         </div>
      </div>
   );
}

export default LoadingPage;
