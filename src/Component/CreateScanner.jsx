
import { useState } from "react";

import './Component.css'
import { useNavigate } from "react-router-dom";
export default function CreateScanner() {

    const [date, setDate] = useState();
    const [name, setName] = useState();
    const [Quantity, setQuantity] = useState();
    const Navigate = useNavigate();


    // create data
    async function handleSubmit(e) {
        e.preventDefault();
        let responce = await fetch('http://localhost:8081/add', {
            method: 'POST',
            body: JSON.stringify({ date, name, Quantity }),
            headers: {
                'Content-type': 'application/json',
               
                    authorization:`bearer ${JSON.parse(localStorage.getItem('auth'))}`
                  
            }
        })
        responce = await responce.json();
        console.log(responce);
        Navigate('/');
    }


    //    Disable Date
    let disableDates = () => {
        let today, dd, mm, yyyy;
        today = new Date();
        dd = today.getDate() + 1;
        mm = today.getMonth() + 1;
        yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;


    }




    return (
        <div className="sinup-container">

            <form className="sinup" onSubmit={handleSubmit}>

                <p className="heading">CreateScanner</p>
                <select id="name" className="select" onChange={(e) => setName(e.target.value)}>
                    <option value="name">name</option>
                    <option value="C1">C1</option>
                    <option value="C2">C2</option>
                    <option value="C3">C3</option>
                </select>

                <input type="date" max={disableDates()} id="date-input" placeholder="date" onChange={(e) => setDate(e.target.value)} />
                <input type="text" className="name" placeholder="Quantity" onChange={(e) =>setQuantity(e.target.value)} />
                <button className="button">submit</button>

            </form>

        </div>
    )
}