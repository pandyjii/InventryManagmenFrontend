
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar/Navbar';
import Home from './Component/Home';
import Upadte from './Component/Update';
import Login from './Component/Login';
import SinUp from './Component/Sinup';
import Register from './Component/Register';
import CreateScanner from './Component/CreateScanner';
import EditContent from './Component/EditScanner';
import Qr from './Component/Qr';
import { useState } from 'react';
function App() {
  const [fileResult, setFileResult] = useState([]);
  const[UserId,setUserId]=useState(true);
  const fileError = (error) => {
    if (error) {
        console.log(error);
    }
}

const fileScan = async (result) => {
    if (result) {

      let responce=await fetch(`http://localhost:8081/count/${result}`);
          
      responce= await responce.json();

          
        setFileResult(responce);
       
      
    }

    else{
   alert("please enter a valid Qr")
     
    }

}

  console.log(UserId);
  




  return (
    <div className="App">
        
        



   
    <BrowserRouter>
    <Navbar/>

    <Routes>
    
      <Route path='/' element={<Home fileResult={fileResult}  UserId={UserId}  />}    />
      <Route path='/qr' element={<Qr  fileError={fileError} fileScan={fileScan} fileResult={fileResult}  setUserId={setUserId} />}/>
      <Route path='/create' element={<CreateScanner/>}/>
      <Route  path='/update' element={<Upadte/>} />
      <Route  path='/login' element={<Login/>} />
      <Route  path='/sinup' element={<SinUp/>} />
      <Route path='/scan' element={<Register/>}/>
      <Route path='/edit/:id' element={<EditContent/>}/>
    </Routes>
    </BrowserRouter>
     
    </div>
  );
}

export default App;
