
import { useState } from "react"
        import'./Component.css'
import { useNavigate } from "react-router-dom";


export default function Login(){
    
            const[email,setEmail]=useState();
            const[password,setPassword]=useState();
          const Navigate=useNavigate();
          async  function handleSubmit(e){
               e.preventDefault();
                let responce=await fetch('http://localhost:8081/login',{
                    method:'POST',
                    body:JSON.stringify({email,password}),
                    headers:{
                        'Content-type':'application/json'
                    }
        
                })
        
        
                responce=await responce.json();
                if(responce){
                  localStorage.setItem('user',JSON.stringify(responce));
                  console.log(responce)
                  Navigate('/')
                }
                
                else{
                    alert("please enter a valid input ")
                }

            }
            return(
                <div className="sinup-container">
                
                
                <form className="sinup" onSubmit={handleSubmit}>
                     <p className="heading">Login</p>
                   
                    <input type="text" placeholder="email" onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="text" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
                    <button className="button">submit</button>
        
                </form>
        
                </div>
            )
        }
    
