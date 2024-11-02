import React, { useEffect, useState } from "react";
import axios from "axios";
import './QR.css';
import { SelectedUser } from "../../../context/UserContext";
import QRCode from 'qrcode';

function QRPage() {
    const [qrCodes, setQrCodes] = useState([]);
    const { user } = SelectedUser();
    const [generatedQRCodes, setGeneratedQRCodes] = useState({});

    useEffect(() => {
        const fetchQR = async () => {
            try {
                const response = await axios.get(`https://event-link-user-server.vercel.app/api/payment/fetchqr?email=${user.email}`);
                const events = response.data.events;

                const qrCodeUrls = {};

                for (const event of events) {
                    const qrCodeUrl = await QRCode.toDataURL(event.paymentqr);
                    console.log(qrCodeUrl);
                    qrCodeUrls[event.registereddepartment] = qrCodeUrl;
                    console.log(qrCodeUrls[event.registereddepartment]);
                }

                setGeneratedQRCodes(qrCodeUrls); 
                setQrCodes(events); 
            } catch (err) {
                console.log(err);
            }
        };

        fetchQR();
    }, [user.email]);

    function downloadQR(qrUrl, eventName) {
        const link = document.createElement('a');
        link.href = qrUrl;
        link.download = `${eventName}_QR_Code.png`; 
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); 
    }

    return (
        <div className='qrcode'>
            <div className='qrcode-list'>
                <div className="qrcode-container">
                    {qrCodes?.map((data, index) => (
                        <div className="qr-card" key={index}>
                            <img alt={index} src={generatedQRCodes[data.registereddepartment]} />
                            <p>Department: {data.registereddepartment}</p>
                            <button onClick={() => downloadQR(generatedQRCodes[data.registereddepartment], data.registereddepartment)} className="qr-btn-download">
                                Download
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default QRPage;
