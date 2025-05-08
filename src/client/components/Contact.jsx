import useFetch from '../hooks/useFetch';

export default function Contact(){
    const data = useFetch('/contact');
    return (
        <>
            <h1>Contact</h1>
            <h2>API data: {data}</h2>
        </>
    )
}