import React, { useState, useRef } from 'react';
import './Component.css'

import QrReader from 'react-qr-reader'
import { useNavigate } from 'react-router-dom';


export default function Qr({ fileError, fileScan }) {
    const [scanResultWebCam, setScanResultWebCam] = useState('');
    const [enable, setEnable] = useState(false);
    const qrRef = useRef(null);
    const Navigate = useNavigate();



    
    const openDialog = () => {
        qrRef.current.openImageDialog();
    }




    function handleWebcamera() {
        setEnable(!enable);

        console.log(enable);
    }

    const handleErrorWebCam = (error) => {
        console.log(error);
    }
    const handleScanWebCam = (result) => {
        if (result) {
            setScanResultWebCam(result);
        }
    }

    function handleClick() {
        Navigate('/')
    }


    return (
        
            <div className='conatiners'>
                <div className='scanQr-container'>
                    <div className='scanQr-button'>
                        <button onClick={openDialog} className='qr-button'>ScanQr</button>
                    </div>

                    {/* For file scan */}
                    <div className='scanQr-content'>
                        <QrReader
                            ref={qrRef}
                            delay={300}
                            onError={fileError}
                            onScan={fileScan}
                            legacyMode={true}

                        />
                        <button onClick={handleClick}>Submit</button>
                    </div>
                </div>

               {/* for webcam scanner */}
                <div className='webcan-container'>
                    <div className='webcam'>
                        {
                            enable ? <QrReader
                                delay={300}
                                style={{ width: '100%' }}
                                onError={handleErrorWebCam}
                                onScan={handleScanWebCam}
                            /> : <QrReader
                                delay={300}
                                legacyMode={true}
                            />
                        }
                    </div>
                    <button className='webcam-button' onClick={handleWebcamera}>{enable ? 'disableCamera' : 'EnableCamera'}</button>

                </div>


            </div>

        
    )
}





