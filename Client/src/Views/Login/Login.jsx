import { useState } from "react";
// import logo from "../../assets/logoSpotiFans.svg";
import loginImg from "../../assets/loginImage.png";
import { NavLink } from "react-router-dom";
import validation from "../../Components/Validation/Validation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SocialLoginOptions from "../../Components/SocialLoginOptions/SocialLoginOptions";

const Form = () => {
   const navigate = useNavigate();
   const [userData, setUserData] = useState({
      username: "",
      password: "",
   });
   const [errors, setErrors] = useState({});

   const handleChange = (event) => {
      setErrors(
         validation({ ...userData, [event.target.name]: event.target.value })
      );
      setUserData({ ...userData, [event.target.name]: event.target.value });
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      try {
         const response = await axios.post(
            "http://localhost:3001/user/login",
            userData
         );

         if (response.status === 200) {
            const { token } = response.data;
            localStorage.setItem("token", token);
            navigate("/home");
         }
      } catch (error) {
         console.error("Error during login:", error.message);
      }
   };

   return (
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-slate-200 font-custom overflow-hidden">
         <p className="w-full min-w-full m-0 break-words text-[5.8rem] select-none leading-[.8] text-white blur-[2px]">
            ClásicaRockPopHipHopJazzBluesReggaeTrapmetalElectrónicaRapR&BCountryEDMFunkMetalAmbientElectropopHardstyleChillwaveDancehallDubstepTechnoFlamencoSoulReguetónTrapCumbiaAlternativaDiscoSkaFolkIndieGospelPostpunkSalsaSambaSynthwaveVallenatoPunkFunkMetalcoreBluegrassGrimeMerengueIndustrialNeosoulRancheraNoisepopChiptuneSwingProgressivehouseNewageCelticSkapunkExperimentalPsytranceGrungeFadoJungleKpopR&BalternativoElectroswingReggaetónespañolTriphopDrumandbassRockalternativoBachataGaragerockChansonTranceDreampopAmericanaJpopPowermetalCountrypopSertanejoMerengueurbanoTraplatinoElectrohousePopunkHip
            hopalternativoDeathmetalPoprockRagtimeDowntempoJazzfusionRockprogresivoHardrockReguetónclásicoPostrockTangoElectropopalternativoAmbientalblackmetalDancepopPostpunkrevivalJazzcontemporáneoReggaerootsElectroclashPopalternativoIndiefolkPsychedelicrockSoulalternativoBigbandTrapcoreElectrónicaexperimentalAmbientpopNeofolkFolkrockEDMalternativoRapcoreCumbiavilleraPopexperimentalNujazzMetalalternativoCountryalternativoSynthpopIndiepopPunkpopDarkambientMelodicdeathmetalR&BcontemporáneoNoiserock
         </p>
         <main className="grid grid-cols-2 max-md:flex max-md:justify-center max-md:items-center justify-center justify-items-center items-center place-items-center w-screen h-screen overflow-hidden font-custom absolute z-50">
            <div className="flex flex-col justify-center items-center min-w-[22rem] w-[25rem] h-[30rem] backdrop-blur-[6px] shadow-xl rounded-[2rem] z-50">
               <h1 className="text-[3.5rem] mb-2 tracking-[2px]">Log in</h1>
               <form
                  className="flex flex-col justify-center items-center"
                  onSubmit={handleSubmit}>
                  <label className="flex flex-col justify-center items-center pb-[1.4rem]">
                     <input
                        className="border w-[20rem] max-md:w-[18rem] h-[1rem] rounded-[5rem] p-5"
                        onChange={handleChange}
                        value={userData.username}
                        type="text"
                        name="username"
                        placeholder="Username..."
                     />
                     <p className="text-[.9rem] text-red-600 mt-[.3rem]">
                        {errors.username}
                     </p>
                  </label>

                  <label className="flex flex-col justify-center items-center pb-[1rem]">
                     <input
                        className="border w-[20rem] max-md:w-[18rem] h-[1rem] rounded-[5rem] p-5"
                        onChange={handleChange}
                        value={userData.password}
                        type="password"
                        name="password"
                        placeholder="Password..."
                     />
                     <p className="text-[.9rem] text-red-600 text-center mt-[.3rem]">
                        {errors.p}
                     </p>
                  </label>
                  {/* <div>
            <input type="checkbox" name="rememberMe" id="rememberMe"></input>
            <label htmlFor="rememberMe"> Remember me</label>
          </div> */}

                  {Object.keys(errors).length === 0 ? (
                     <button
                        className="flex flex-col justify-center items-center bg-white border w-[7rem] h-[2.3rem] rounded-[5rem] mt-2 mb-5 hover:scale-[1.1] hover:bg-black hover:text-white  duration-[.3s]"
                        type="submit">
                        Log in
                     </button>
                  ) : (
                     <button
                        className="flex flex-col justify-center items-center bg-white border w-[7rem] h-[2.3rem] rounded-[5rem] mt-2 mb-5 hover:blur-sm cursor-not-allowed duration-[.3s]"
                        type="submit">
                        Log in
                     </button>
                  )}
               </form>
               <p className="text-[.9rem]">or Sign In with</p>
               <SocialLoginOptions />
               <p className="m-[1rem] ">
                  Don't have an account?
                  <NavLink
                     className="ml-5 text-[1.1rem] hover:text-[#ff50aa] duration-[.3s]"
                     to="/signup">
                     Sign Up
                  </NavLink>
               </p>
            </div>

            <div className="h-screen flex justify-center items-center max-md:absolute max-md:w-[60rem] z-0">
               <img className="w-[50rem]" src={loginImg} alt="" />
            </div>
         </main>
      </div>
   );
};

export default Form;
