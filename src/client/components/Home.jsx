import useFetch from '../hooks/useFetch';
import { useState, useEffect} from "react";
import axios from 'axios';



export default function Home(){
    const data = useFetch('/home');
    return (
        <>
            <h1>Home</h1>
            <h2>API data: {data} {import.meta.env.VITE_SERVER_HOST} {import.meta.env.VITE_SERVER_PORT}</h2>
            {/* {
        array.map((fruit, index) => (
          <div key={index}>
            <p>{fruit}</p>
            <br />
          </div>
        ))
      }  */}
      {data}
        </>
    )
}