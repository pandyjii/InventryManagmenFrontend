
import { useEffect, useState } from "react"
import './Component.css'
import { useNavigate } from "react-router-dom";


    export default function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(false)
    const Navigate = useNavigate();



    async function fetchScanner() {
        let responce = await fetch('http://localhost:8081/', {
          headers: {
            authorization: `bearer ${JSON.parse(localStorage.getItem('auth'))}`
          }
        });
        setLoading(true);
        responce = await responce.json();
    
        if (responce) {
          setValue(responce);
          setLoading(false);
        }
        else {
          console.log("somthing error data not found")
        }
      }

      useEffect(()=>{
        fetchScanner();
      },[])



    async function handleSubmit(e) {
        e.preventDefault();
        fetchScanner();
        let responce = await fetch('http://localhost:8081/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-type': 'application/json',
            }

        })


        responce = await responce.json();
      
        if (responce.auth) {
           
            localStorage.setItem('auth', JSON.stringify(responce.auth));
            Navigate('/')
           
        }

        else {
            alert("please enter a valid input ")
        }

    }






    return (
        <div className="sinup-container">


            <form className="sinup" onSubmit={handleSubmit}>
                <p className="heading">Login</p>

                <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                <button className="button">submit</button>

            </form>

        </div>
    )
}

