import { useState } from "react";

export default function UsernameForm() {
    const [user, setUser] = useState("");
    const updateUsername = (evt) => {
        setUser(evt.target.value);
    };

    return (
        <div>
            <label htmlFor="username"></label>
            <input type="text" id="username" onChange={updateUsername} />
            <button>Submit</button>
        </div>
    )
}