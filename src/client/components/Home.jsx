import useFetch from '../hooks/useFetch';
import { useState, useEffect} from "react";
import axios from 'axios';

export default function Home(){
    const data = useFetch('/home');
    
     const [array, setArray] = useState([]);
    
      const fetchAPI = async () => {
        // const response = await axios.get('http://localhost:8080/');
        const response = await axios.get('http://localhost:8080/home');

        console.log(response.data.message);
      }
    
      useEffect(() => {
        fetchAPI();
      }, []); 

    return (
        <>
            <h1>Home</h1>
            <h2>API data: {data} {import.meta.env.VITE_SERVER_HOST} {import.meta.env.VITE_SERVER_PORT}</h2>
            {
        array.map((fruit, index) => (
          <div key={index}>
            <p>{fruit}</p>
            <br />
          </div>
        ))
      } 
        </>
    )
}