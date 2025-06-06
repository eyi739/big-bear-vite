import useFetch from '../hooks/useFetch';

export default function About(){
    const data = useFetch('/about');
    return (
        <>
            <h1>About</h1>
            <h2>API data: {data}</h2>
        </>
    )
}