import { useState } from "react";

function BetterSignupForm(){
//    const [firstName, setFirstName] = useState("")
//    const [lastName, setLastName] = useState("")
   const [formData, setFormData] = useState({firstName: "", lastName: "", password: ""})

    // const handleChange = (EventTarget) => {
    //     const changedField = EventTarget.target.name;
    //     const newValue = EventTarget.target.value;
    //     setFormData((currData) => {
    //         currData[changedField] = newValue;
    //         return {...currData};
    //     })
    // };
    
    const handleChange = (EventTarget) => {
        const changedField = EventTarget.target.name;
        const newValue = EventTarget.target.value;
        setFormData((currData) => {
           return {
            ...currData, 
            [changedField]: newValue,
           }
        })
    };

    const handleSubmit = () => {
    console.log(formData);
}

   return (
    <div>
        <label htmlFor="firstName">First Name:</label>
        <input type="text"
            placeholder="first name"
            value={formData.firstName}
            onChange={handleChange}
            id="firstname"
            name="firstName"
        />
        <label htmlFor="lastName">Last Name:</label>
        <input type="text"
            placeholder="last name"
            value={formData.lastName}
            onChange={handleChange}
            id="lastname"
            name="lastName"
        />
        <label htmlFor="password">Password:</label>
        <input type="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            id="password"
            name="password"
        />
        <button onClick={handleSubmit}>Submit</button>
    </div>
   )
}

export default BetterSignupForm;