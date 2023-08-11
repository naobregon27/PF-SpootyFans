import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ballet from "../../assets/ballet.png";
import runner from "../../assets/runner.png";
import axios from "axios";
import SocialLoginOptions from "../../Components/SocialLoginOptions/SocialLoginOptions";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const createUser = async (signUp) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/user/register",
        signUp
      );
      alert("User created successfully");
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      await createUser({
        username,
        email,
        password,
        isActive: true,
        isPremium: true,
      });

      navigate("/login");
    } else {
      setErrors(errors);
    }
  };

  const validate = () => {
    const errors = {};
    if (!username) {
      errors.username = "Username is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!isChecked) {
      errors.isChecked = "You must agree to the terms and conditions";
    }
    return errors;
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-slate-200 font-custom overflow-hidden">
      <p className="w-full min-w-full m-0 break-words text-[5.8rem] select-none leading-[.8] text-white blur-[2px]">
        ClásicaRockPopHipHopJazzBluesReggaeTrapmetalElectrónicaRapR&BCountryEDMFunkMetalAmbientElectropopHardstyleChillwaveDancehallDubstepTechnoFlamencoSoulReguetónTrapCumbiaAlternativaDiscoSkaFolkIndieGospelPostpunkSalsaSambaSynthwaveVallenatoPunkFunkMetalcoreBluegrassGrimeMerengueIndustrialNeosoulRancheraNoisepopChiptuneSwingProgressivehouseNewageCelticSkapunkExperimentalPsytranceGrungeFadoJungleKpopR&BalternativoElectroswingReggaetónespañolTriphopDrumandbassRockalternativoBachataGaragerockChansonTranceDreampopAmericanaJpopPowermetalCountrypopSertanejoMerengueurbanoTraplatinoElectrohousePopunkHip
        hopalternativoDeathmetalPoprockRagtimeDowntempoJazzfusionRockprogresivoHardrockReguetónclásicoPostrockTangoElectropopalternativoAmbientalblackmetalDancepopPostpunkrevivalJazzcontemporáneoReggaerootsElectroclashPopalternativoIndiefolkPsychedelicrockSoulalternativoBigbandTrapcoreElectrónicaexperimentalAmbientpopNeofolkFolkrockEDMalternativoRapcoreCumbiavilleraPopexperimentalNujazzMetalalternativoCountryalternativoSynthpopIndiepopPunkpopDarkambientMelodicdeathmetalR&BcontemporáneoNoiserock
      </p>
      <main className="grid grid-cols-2 max-md:flex max-md:justify-center max-md:items-center justify-center justify-items-center items-center place-items-center w-screen h-screen overflow-hidden font-custom absolute z-50">
        <div className="h-screen flex justify-center items-center max-md:absolute max-md:w-[60rem] z-0">
          <img
            className="flex justify-center items-center w-[40rem] animate-transitionimageone  absolute"
            src={ballet}
          />
          <img
            className="flex justify-center items-center w-[40rem] animate-transitionimagetwo absolute"
            src={runner}
          />
        </div>

        <div className="flex flex-col justify-center items-center min-w-[22rem] w-[25rem] h-fit backdrop-blur-[6px] max-md:backdrop-blur-[10px] shadow-xl rounded-[2rem] z-50">
          <div>
            <h1 className="text-[3.5rem] mb-2 mt-3 tracking-[2px]">Sign Up</h1>
          </div>

          <form
            className="flex flex-col justify-center items-center "
            onSubmit={handleSubmit}
          >
            <label className="flex flex-col justify-center items-center pb-[1rem]">
              <input
                className="border w-[20rem] max-md:w-[18rem] h-[1rem] rounded-[5rem] p-5"
                type="text"
                value={username}
                placeholder="Username"
                onChange={(event) => setUsername(event.target.value)}
              />
              {errors.username && (
                <p className="text-[.9rem] text-red-600 text-center mt-[.3rem]">
                  {errors.username}
                </p>
              )}
            </label>

            <label className="flex flex-col justify-center items-center pb-[1rem]">
              <input
                className="border w-[20rem] max-md:w-[18rem] h-[1rem] rounded-[5rem] p-5"
                type="email"
                value={email}
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
              />
              {errors.email && (
                <p className="text-[.9rem] text-red-600 text-center mt-[.3rem]">
                  {errors.email}
                </p>
              )}
            </label>

            <label className="flex flex-col justify-center items-center pb-[1rem]">
              <input
                className="border w-[20rem] max-md:w-[18rem] h-[1rem] rounded-[5rem] p-5"
                type="password"
                value={password}
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
              {errors.password && (
                <p className="text-[.9rem] text-red-600 text-center mt-[.3rem]">
                  {errors.password}
                </p>
              )}
            </label>

            <label className="flex flex-col justify-center items-center pb-[1rem]">
              <input
                className="border w-[20rem] max-md:w-[18rem] h-[1rem] rounded-[5rem] p-5"
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              {errors.confirmPassword && (
                <p className="text-[.9rem] text-red-600 text-center mt-[.3rem]">
                  {errors.confirmPassword}
                </p>
              )}
            </label>

            {/* <label>
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const createUser = async (signUp) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/user/register",
        signUp
      );
      alert("User created successfully");
    } catch (error) {
      console.error(error);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      await createUser({
        username,
        email,
        password,
      });

      navigate("/login");
    } else {
      setErrors(errors);
    }
  };

  const validate = () => {
    const errors = {};
    if (!username) {
      errors.username = "Username is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    // if (!isChecked) {
    //   errors.isChecked = "You must agree to the terms and conditions";
    // }
    return errors;
  };

  return (
    <main className={style.mainContainer}>
      <img className={style.logo} src={logo}></img>
      <div className={style.log}>
        <div className={style.title_container}>
          <h1 className={style.title}>Register</h1>
          <Link to="/login" className={style.to_login}>
            or Login
          </Link>
        </div>
        <form onSubmit={handleSubmit} className={style.form_container}>
          <label>
            <input
              className={style.datos}
              type="text"
              value={username}
              placeholder="Username"
              onChange={(event) => setUsername(event.target.value)}
            />
            {errors.username && <span>{errors.username}</span>}
          </label>
          <label>
            <input
              className={style.datos}
              type="email"
              value={email}
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
            />
            {errors.email && <span>{errors.email}</span>}
          </label>
          <label>
            <input
              className={style.datos}
              type="password"
              value={password}
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
            {errors.password && <span>{errors.password}</span>}
          </label>
          <label>
            <input
              className={style.datos}
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
          </label>
          {/* <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(event) => setIsChecked(event.target.checked)}
            />
            I agree to the terms and conditions
            {errors.isChecked && <span>{errors.isChecked}</span>}
          </label> */}
            <button
              className="flex flex-col justify-center items-center bg-white border w-[7rem] h-[2.3rem] rounded-[5rem] mt-2 mb-5  hover:scale-[1.1] hover:bg-black hover:text-[#fff] duration-[.3s]"
              type="submit"
            >
              Submit
            </button>
          </form>

          <p className="text-[.9rem]">or sign up with</p>
          <SocialLoginOptions />

          <p className="m-[1rem]">
            Not the first time here?
            <NavLink
              className="ml-5 text-[1.2rem] hover:text-[#ff50aa] duration-[.3s]"
              to="/login"
            >
              Login
            </NavLink>
          </p>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
