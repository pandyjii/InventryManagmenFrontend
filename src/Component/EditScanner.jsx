
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default  function EditContent(){

    const [date, setDate] = useState({});
    const [name, setName] = useState({});
    const[Quantity,setQuantity]=useState({});
      
    const param=useParams();
    const Navigate=useNavigate();

       
    useEffect(()=>{
        getProductlist();
    },[])

         async function getProductlist(){
           console.log(param.id);

           let responce= await fetch(`http://localhost:8081/product/${param.id}`)

            responce=await responce.json();

            console.log(responce.name);
            setDate(responce.date);
            setName(responce.name);
            setQuantity(responce.Quantity);
            
         }




   async  function handleSubmit(e) {
        e.preventDefault();


        let responce=await fetch(`http://localhost:8081/product/${param.id}`,{

        method:'PUT',
        body:JSON.stringify({date,name,Quantity}),
        headers:{
            'Content-type':'application/json'
        }   
   })

   responce= await responce.json();
   console.log(responce);
     Navigate('/');
      

    }


    let  disableDates=()=>{
        let today,dd,mm,yyyy;
        today=new Date();
        dd=today.getDate()+1;
        mm=today.getMonth()+1;
        yyyy=today.getFullYear();
        return yyyy+"-"+mm+"-"+dd;


    }

   

    return(
    <div className="sinup-container">

    <form className="sinup" onSubmit={handleSubmit}>
        <p>CreateScanner</p>

        <select id="name" className="select"  value={name}  onChange={(e)=>setName(e.target.value)}>
            <option value="name" >name</option>
            <option value="C1" >C1</option>
            <option  value="C2">C2</option>
            <option  value="C3" >C3</option>
        </select>  

       <input type="date"  max={disableDates} value={date}  placeholder="date" onChange={(e)=>setDate(e.target.value)} />
       <input type="text" value={Quantity} className="name" placeholder="Quantity" onChange={(e)=>setQuantity(e.target.value)}  />
        <button className="button">submit</button>

    </form>

</div>
)
}