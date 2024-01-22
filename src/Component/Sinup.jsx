import { useState } from "react"
import'./Component.css'
import { useNavigate } from "react-router-dom";

export default function SinUp(){
    const[name,setName]=useState();
    const[email,setEmail]=useState();
    const[password,setPassword]=useState();
    const Navigate=useNavigate();
    async function handleSubmit(e){
        e.preventDefault();
        let responce=await fetch('http://localhost:8081/sinup',{
            method:'POST',
            body:JSON.stringify({name,email,password}),
            headers:{
                'Content-type':'application/json'
            }

        })

        responce= await responce.json();
     console.log(responce);
        if(responce){
            localStorage.setItem('user',JSON.stringify(responce));
            Navigate('/login')
        }
        else{
            alert("please enter a valid input")
        }


        
       
    }

    return(
        <div className="sinup-container">
        
        <form className="sinup" onSubmit={handleSubmit}>
             <p className="heading">Sinup</p>
            <input type="text" placeholder="name" onChange={(e)=>setName(e.target.value)}/>
            <input type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="text" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
            <button className="button">submit</button>

        </form>

        </div>
    )
}