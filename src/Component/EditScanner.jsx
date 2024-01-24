
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Component.css'
export default function EditContent() {

    const [date, setDate] = useState({});
    const [name, setName] = useState({});
    const [Quantity, setQuantity] = useState({});
    const param = useParams();
    const Navigate = useNavigate();


    useEffect(() => {
        getProductlist();
    },[])

    // get data from database
    async function getProductlist() {
        let responce = await fetch(`http://localhost:8081/product/${param.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('auth'))}`
              }
        }
        )
        responce = await responce.json();

        if (responce) {
            setDate(responce.date);
            setName(responce.name);
            setQuantity(responce.Quantity);
        }
        else {
            console.log("responce was not found");
        }
    }



// put method
    async function handleSubmit(e) {
        e.preventDefault();


        let responce = await fetch(`http://localhost:8081/product/${param.id}`, {

            method: 'PUT',
            body: JSON.stringify({ date, name, Quantity }),
            headers: {
                'Content-type': 'application/json',
             authorization:`bearer ${JSON.parse(localStorage.getItem('auth'))}`
                 
            }
        })

        responce = await responce.json();
           
        if(responce){
            Navigate('/');
        }

        else{
            console.log("put responce was not found")
        }
            
       
    }


    // disable date
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
                <p>EditScanner</p>

                <select id="name" className="select" value={name} onChange={(e) => setName(e.target.value)}>
                    <option value="name" >name</option>
                    <option value="C1" >C1</option>
                    <option value="C2">C2</option>
                    <option value="C3" >C3</option>
                </select>

                <input type="date" max={disableDates} value={date} placeholder="date" onChange={(e) => setDate(e.target.value)} />
                <input type="text" value={Quantity} className="name" placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} />
                <button className="button">Update</button>

            </form>

        </div>
    )
}