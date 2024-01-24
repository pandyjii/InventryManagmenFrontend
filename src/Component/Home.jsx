import { useEffect, useState } from "react"
import QRCode from 'qrcode';
import './Component.css'
import QRcode from "react-qr-code";
import { Link, json } from "react-router-dom";



export default function Home({ fileResult }) {
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState();
  const [disable, setDisabled] = useState(false)
  let auth = JSON.parse(localStorage.getItem('auth'));
  let date = new Date();
  let pending;



  // get data
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


  useEffect(() => {
    fetchScanner()

  }, [])



  if (loading) {
    return <h1>please wait content is loading</h1>
  }





  // delete Content
  async function handlScannerDelete(id) {
    let responce = await fetch(`http://localhost:8081/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('auth'))}`
      }
    })
    responce = await responce.json();
    fetchScanner();
  }


  const generateQrCode = async (data) => {
    try {
      const response = await QRCode.toDataURL(data);
      setImageUrl(response);
      console.log(imageUrl)
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className="home-container">

      {

      auth?
    
        <div className="contact-nav">
            <p>Name</p>
            <p>Date Received/Quantity</p>
            <p>Date Dispatched/Quantity</p>
            <p>Pending Items</p>
            <p>Status</p>
            <p>QR Code (Click to download)</p>
            <p>Admin Panel</p>
          </div>
         
          :
          <div  className="loginfirst">
          <h1>Please Do login & sinup first</h1>

          </div>
      }    
       
        
       

       
       { 

        auth?
            value && value.length > 0 ?
              value.map((item, index) =>
                <>

                  <div className="content" key={index}>
                    <p>{item.name}</p>
                    <p>{item.date}/{item.Quantity}</p>
                    <p >{disable ? Date(item.updatedAt) : ''}</p>
                   {item.updaQuantity.length===1? <p>{date.getFullYear() + '-' + date.getDate() + '-' + date.getMonth() + 1}/{item.updaQuantity && item.updaQuantity.length}</p>:'-------'}
                    <p>{pending = item.Quantity - item.updaQuantity.length}</p>
                    <p>{pending === 0 ? 'Dispached' : 'pending'}</p>
                    <div>
                      <QRcode id='id-qr-code' value={item._id} onClick={() => generateQrCode(item._id)}
                      />

                      {imageUrl ? (
                        <a href={imageUrl} download>
                          <img className="scanner-img " src={imageUrl} alt="img" />
                        </a>) : null}
                    </div>
                    <div className="scanner-icons">
                      <Link to={'/edit/' + item._id}><p><i class="fa-solid fa-pen-to-square" ></i></p>
                      </Link>
                      <p><i class="fa-regular fa-trash-can" onClick={() => handlScannerDelete(item._id)}></i></p>
                    </div>
                  </div>
                </>
              )
             
              :
              <div>
                <h1 style={{ marginTop: "40px" }}> No Data   found please Add data </h1>
                
              </div>
              :
              ''
              
       }
   
      

             
           
    
    </div>

  )

}


