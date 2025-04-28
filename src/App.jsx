import './App.css';
import { useState, useEffect} from "react";
import Slots from "./Slots";
import Counter from './Counter';
import Toggler from './Toggler';
import ColorBox from './ColorBox';
import ColorBoxGrid from './ColorBoxGrid';
import ScoreKeepers from './ScoreKeepers';
import EmojiClicker from './EmojiClicker';
import Lucky7 from './Lucky7';
import Die from './Die';
import Dice from './Dice';
import LuckyN from './LuckyN';
import Box from './Box';
import BoxGrid from './BoxGrid';
import QuoteFetcherLoader from './QuoteFetcherLoader';
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import AlarmIcon from "@mui/icons-material/Alarm"
import RatingDemo from './RatingDemo';
import FormDemo from './FormDemo';
import TodoList from './TodoList';
import Navbar from './Navbar';
import ResponsiveNavbar from './ResponsiveNavbar';
import HomePage from './pages/Home/HomePage';


import axios from 'axios';
import ProductIndex from './views/products/ProductIndex';
import { RouterProvider } from 'react-router-dom';

import router from "../../big-bear-vite-server/src/Routes/Routes.jsx";


import { sum } from './utils';
import QuoteFetcher from './QuoteFetcherLoader';
// import Clicker from './Clicker';
// import PropertyList from "./PropertyList";
// import ShoppingList from './ShoppingList';
// import Greeter from "./Greeter"
// import ListPicker from './ListPicker'

// const data = [
//   {id: 1, item: 'egg', quantity: 12, completed: false},
//   {id: 2, item: 'milk', quantity: 1, completed: true},
//   {id: 3, item: 'chicken breasts', quantity: 4, completed: false},
//   {id: 4, item: 'carrots', quantity: 12, completed: true}
// ]

// const properties = [
//   { id: 129031, name: "Desert Yurt", rating: 4.9, price: 150 },
//   { id: 129331, name: "Lone Mountain Cabin", rating: 4.8, price: 250 },
//   { id: 129032, name: "Cactus Retreat", rating: 4.75, price: 300 },
//   { id: 129033, name: "Redwood Treehouse Escape", rating: 4.9, price: 120 },
//   { id: 129034, name: "Oceanview Condo", rating: 4.7, price: 140 },
//   { id: 129035, name: "Gold Miner Campground", rating: 4.69, price: 96 },
// ];

// const colors = [
//   "#DFFF00",
//    "#FFBF00",
//    "#FF7F50",
//    "#DE3163",
//    "#9FE2BF",
//    "#40E0D0",
// ]

// function lessThan4(dice) {
//   return sum(dice) < 4;
// }

// function allSameValue(dice) {
//  return dice.every((v) => v === dice[0])
// }

function App() {
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get('http://localhost:8080/api');
    console.log(response.data.fruits);
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  
 return ( 
  <div className="App">
      {/* <RouterProvider router={router}/> */}
      {/* <HomePage/> */}
      <HomePage/>
      {
        array.map((fruit, index) => {
          <div key={index}>
            <p>{fruit}</p>
            <br />
          </div>
        })
      }
  </div>
)}

export default App

