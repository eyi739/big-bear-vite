import { useState, useEffect } from "react";

const RANDOM_QUOTE_URL = "https://inspo-quotes-api.herokuapp.com/quotes/random"

export default function QuoteFetcher() {
    const [quote, setQuote] = useState({text: "", author: ""});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchQuote() {
            const response = await fetch(RANDOM_QUOTE_URL);
            const jsonResponse = await response.json();
            const randomQuote = jsonResponse.quote;
            setQuote(randomQuote);
            setIsLoading(false);
        }
        fetchQuote();
    }, []);

    

    return (
        <div>
            <p className="Loader" style={{opacity: isLoading ? 2 : 0}}>
                Loading.......
            </p>
            <h1>{quote.text}</h1>
            <h3>{quote.author}</h3>
        </div>
    )
}



