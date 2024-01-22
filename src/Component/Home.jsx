import { useEffect, useState } from "react"
import QRCode from 'qrcode';
import './Component.css'
import { saveAs } from 'file-saver';
import QRcode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";


export default function Home({fileResult}){
const[value,setValue]=useState([]);
const[loading,setLoading]=useState(false)
const[imageUrl,setImageUrl]=useState();
const[count,setCount]=useState(0);
const[disable,setDisabled]=useState(false)
const Navigate=useNavigate();
let date=new Date();
 let pending;


   async function fetchScanner(){
  
    let responce=await fetch('http://localhost:8081/');
      setLoading(true);
    responce= await responce.json();
    // console.log(responce)
    if(responce){
        setValue(responce);
        setLoading(false);
    }

    else{
        alert("responce was not found")
    }
   }

  

   useEffect(()=>{
      fetchScanner()

   },[])

   if(loading){
    return <h1>please wait content is loading</h1>
   }



//    edit
 function handleScannerEdit(id){
    console.log("we are edit the content")
    console.log(id);
    // Navigate('/edit/'+id)
 }

  async function handlScannerDelete(id){
    //  let _id=id;
    let responce= await fetch(`http://localhost:8081/${id}`,{
        method:'DELETE'
    })

    responce=await responce.json();
    console.log(responce);
    fetchScanner();
  

 }




 

  
   
 const generateQrCode = async (data) => {
  try {
        const response = await QRCode.toDataURL(data);
        setImageUrl(response);
        console.log(imageUrl)
  }catch (error) {
    console.log(error);
  }
}




  
console.log(value);







    return(
   <div className="home-container">
   <div className="contact-nav">
     <p>Name</p>
     <p>Date Received/Quantity</p>
     <p>Date Dispatched/Quantity</p>
     <p>Pending Items</p>
     <p>Status</p>
     <p>QR Code (Click to download)</p>
     <p>Admin Panel</p>


  </div>
    
    {
        value.map((item,index)=>
        <>
        <div className="content"  key={index}>
        <p>{item.name}</p>
        <p>{item.date}/{item.Quantity}</p>
         <p >{disable?Date(item.updatedAt):''}</p>
        <p>{date.getFullYear()+'-'+date.getDate()+'-'+date.getMonth()+1}/{item.updaQuantity&&item.updaQuantity.length}</p>
        <p>{pending=item.Quantity-item.updaQuantity.length}</p>
        <p>{pending===0?'Dispached':'pending'}</p>
       
        <p></p>

        <div>

      
         <QRcode id='id-qr-code'  value={item._id}  onClick={()=>generateQrCode(item._id)} 
      /> 
       {/* <p onClick={()=>generateQrCode(item._id)}>.</p> */}
      {imageUrl ? (
      <a href={imageUrl} download>
        <img  className="scanner-img "src={imageUrl} alt="img"    />
       </a>) : null}
      </div>
       
      
      

        <div className="scanner-icons">
        <Link  to={'/edit/'+item._id}   >        <p><i class="fa-solid fa-pen-to-square" onClick={()=>handleScannerEdit(item._id)}></i></p>
   </Link>
        <p><i class="fa-regular fa-trash-can"  onClick={()=>handlScannerDelete(item._id)}></i></p>
        </div>
        
        {/* <p>{date.getFullY}</p> */}
        </div>
        </>
        )
    }
    </div>
   
    )
}


// <div>
{/* <input type='text' label="Enter Text Here" onChange={(e) => setText(e.target.value)}/>
<button  variant="contained" 
color="primary" onClick={() => generateQrCode()}>Generate</button>
               
   {imageUrl ? (
      <a href={imageUrl} download>
        <img src={imageUrl} alt="img"/>
       </a>) : null}

  </div> */}