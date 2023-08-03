import React, { useEffect } from 'react';
import Cards from '../../Components/Cards/Cards';
import { useDispatch } from 'react-redux';
import {allSongs} from "../../Redux/actions";

function Home() {

  return (
    <div>
      <Cards/>
    </div>
  );
}

export default Home;