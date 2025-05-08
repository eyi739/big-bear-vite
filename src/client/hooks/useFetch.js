import { useEffect, useState } from 'react';

const apiHost = process.env.VITE_SERVER_HOST;
const apiPort = process.env.VITE_SERVER_PORT;

const apiHost2 = import.meta.env.VITE_SERVER_HOST;
const apiPort2= import.meta.env.VITE_SERVER_PORT;

export default function useFetch(path) {
    const [ data, setData ] = useState({message: 'Loading...'});
    useEffect(() => {
        // cancel the fetch request 
        const controller = new AbortController();
        const { signal } = controller;
        const apiUrl = `http://${process.env.VITE_SERVER_HOST}/${process.env.VITE_SERVER_PORT}${path}`
        const apiUrl2 = `http://${import.meta.env.VITE_SERVER_HOST}:${import.meta.env.VITE_SERVER_PORT}${path}`
        console.log(apiHost2,apiPort2);
        fetch(apiUrl2, {signal})
            .then(resp => resp.json())
            .then(data => {setData(data)})
            .catch(err => console.error(err));
        return () => {
            controller.abort();
        };
    }, []);
    
    return data.message;
}