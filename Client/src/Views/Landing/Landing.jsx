import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { allSongs } from "../../Redux/actions";
import landingImage from "../../assets/musicimg.png";

function Landing() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allSongs());
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-slate-200 font-custom overflow-hidden">
      <p className="w-full min-w-full m-0 break-words text-[5.8rem] select-none leading-[.9] text-white blur-[3px]">
      ClásicaRockPopHipHopJazzBluesReggaeTrapmetalElectrónicaRapR&BCountryEDMFunkMetalAmbientElectropopHardstyleChillwaveDancehallDubstepTechnoFlamencoSoulReguetónTrapCumbiaAlternativaDiscoSkaFolkIndieGospelPostpunkSalsaSambaSynthwaveVallenatoPunkFunkMetalcoreBluegrassGrimeMerengueIndustrialNeosoulRancheraNoisepopChiptuneSwingProgressivehouseNewageCelticSkapunkExperimentalPsytranceGrungeFadoJungleKpopR&BalternativoElectroswingReggaetónespañolTriphopDrumandbassRockalternativoBachataGaragerockChansonTranceDreampopAmericanaJpopPowermetalCountrypopSertanejoMerengueurbanoTraplatinoElectrohousePopunkHip hopalternativoDeathmetalPoprockRagtimeDowntempoJazzfusionRockprogresivoHardrockReguetónclásicoPostrockTangoElectropopalternativoAmbientalblackmetalDancepopPostpunkrevivalJazzcontemporáneoReggaerootsElectroclashPopalternativoIndiefolkPsychedelicrockSoulalternativoBigbandTrapcoreElectrónicaexperimentalAmbientpopNeofolkFolkrockEDMalternativoRapcoreCumbiavilleraPopexperimentalNujazzMetalalternativoCountryalternativoSynthpopIndiepopPunkpopDarkambientMelodicdeathmetalR&BcontemporáneoNoiserock
      </p>

      <div className="grid grid-cols-2 absolute max-sm:grid-cols-1">
        <div className="flex flex-col items-center justify-center z-10">
          <h1 className="text-[2.5rem] leading-3 select-none">Welcome</h1>
          <h1 className="text-[2.5rem] select-none">fans of new music!</h1>

          <div className="grid grid-cols-3">
            <NavLink
              to="/login"
              className="flex justify-center px-3 py-1  border rounded-[5rem] border-zinc-800 hover:scale-[1.1] hover:bg-black hover:text-white duration-300"
            >
              <button>Login</button>
            </NavLink>

            <p className=" flex items-center justify-center"> -or- </p>

            <NavLink
              to="/signup"
              className="flex justify-center px-3 py-1  border rounded-[5rem] border-zinc-800 hover:scale-[1.1] hover:bg-black hover:text-white duration-300"
            >
              <button>Signup</button>
            </NavLink>
          </div>
        </div>
        <img className="w-70 max-ms:hidden" src={landingImage} alt="" />
      </div>
    </div>
  );
}

export default Landing;
