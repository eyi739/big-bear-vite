import { useEffect, useState } from 'react';
import axios from 'axios';

const apiHost = process.env.VITE_SERVER_HOST;
const apiPort = process.env.VITE_SERVER_PORT;

const apiHost2 = import.meta.env.VITE_SERVER_HOST;
const apiPort2= import.meta.env.VITE_SERVER_PORT;

export default function useFetch(path) {
    const [ data, setData ] = useState([]);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(true)

    const fetchAPI = async () => {
      const response = await axios.get(`http://localhost:8080${path}`);
      setData(response.data);
    }

    useEffect(() => {
        fetchAPI();

        // cancel the fetch request 
        const controller = new AbortController();
        const { signal } = controller;
        const apiUrl = `http://${process.env.VITE_SERVER_HOST}:${process.env.VITE_SERVER_PORT}${path}`
        const apiUrl2 = `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}${path}`
        const apiUrl3 = `http://localhost:8080${path}`

        fetch(`http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}${path}`, {signal})
            .then(resp => resp.json())
            .then(data => {setData(data)})
            .catch((error) => {
                if (error.name === 'AbortError') {
                    console.log("Fetch aborted:", error.message);
                } else {
                    console.error(error);
                }
                });
        return () => {
            const abort = controller.abort("Component unmounted");
            console.log(abort);
        };
        
    }, []);
    
    return data;
}

