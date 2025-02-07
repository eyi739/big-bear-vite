import { useState } from "react";
import TextField from "@mui/material/TextField"

export default function FormDemo() {
    const [name, setName] = useState("")
    const updateName = (e) => {
        setName(e.target.value)
    }
    return (
        <div>
            <h1>Name is testing: boopinn {name}</h1>
            <TextField id="outlined-basic" label="Puppy Name" placeholder="Fido" variant="outlined" value={name} onChange={updateName} />
        </div>
    )
}

