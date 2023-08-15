import React, { useEffect, useState } from "react";
import Cards from "../../Components/Cards/Cards";
import { useDispatch, useSelector } from "react-redux";
import { allSongs, allPlayLists, allCategories } from "../../Redux/actions";
import Pagination from "../../Components/Pagination/Pagination";
import Filters from "./Filters/Filters";
import SearchBar from "./SearchBar/SearchBar";
// import style from "./Home.module.css";
import Card_playlists from "../../Components/Card_playlists/Card_playlists";

function Home() {
   const dispatch = useDispatch();
   const songs = useSelector((state) => state.songsCopy);
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 4;

   useEffect(() => {
      dispatch(allSongs());
   }, [dispatch]);

   const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
   };

   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = songs.slice(indexOfFirstItem, indexOfLastItem);

   return (
      <div className=" flex flex-col items-center w-screen max-w-full h-screen bg-slate-200 font-custom overflow-x-hidden absolute">

         <p className="w-screen min-w-screen overflow-clip bg-fixed m-0 break-words text-[5.8rem] select-none leading-[.8] text-white blur-[3px] fixed inset-0 z-0">
            ClásicaRockPopHipHopJazzBluesReggaeTrapmetalElectrónicaRapR&BCountryEDMFunkMetalAmbientElectropopHardstyleChillwaveDancehallDubstepTechnoFlamencoSoulReguetónTrapCumbiaAlternativaDiscoSkaFolkIndieGospelPostpunkSalsaSambaSynthwaveVallenatoPunkFunkMetalcoreBluegrassGrimeMerengueIndustrialNeosoulRancheraNoisepopChiptuneSwingProgressivehouseNewageCelticSkapunkExperimentalPsytranceGrungeFadoJungleKpopR&BalternativoElectroswingReggaetónespañolTriphopDrumandbassRockalternativoBachataGaragerockChansonTranceDreampopAmericanaJpopPowermetalCountrypopSertanejoMerengueurbanoTraplatinoElectrohousePopunkHip
            hopalternativoDeathmetalPoprockRagtimeDowntempoJazzfusionRockprogresivoHardrockReguetónclásicoPostrockTangoElectropopalternativoAmbientalblackmetalDancepopPostpunkrevivalJazzcontemporáneoReggaerootsElectroclashPopalternativoIndiefolkPsychedelicrockSoulalternativoBigbandTrapcoreElectrónicaexperimentalAmbientpopNeofolkFolkrockEDMalternativoRapcoreCumbiavilleraPopexperimentalNujazzMetalalternativoCountryalternativoSynthpopIndiepopPunkpopDarkambientMelodicdeathmetalR&BcontemporáneoNoiserock
         </p>

         <div className="max-md:flex max-md:justify-center max-md:items-center justify-center justify-items-center items-center place-items-center overflow-hidden font-custom absolute mt-5 z-10">
            
            <div className="flex flex-row justify-center items-center gap-5 mt-3">

               <SearchBar />
               <Filters />

            </div >
            <Cards songs={currentItems} />

            <div>
               <Pagination
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  totalItems={songs.length}
                  onPageChange={handlePageChange}
               />
            </div>
            <Card_playlists />
         </div>
      </div>
   );
}

export default Home;
