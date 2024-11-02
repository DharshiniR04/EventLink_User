import React, { useEffect, useState } from 'react';
import './Payment.css';
import axios from 'axios';
import { SelectedUser } from '../../../context/UserContext';

function Payment() {
    const [paymentDetail, setPaymentDetail] = useState([]);
    const [paymentResponse, setPaymentResponse] = useState(null);
    const [showModal, setShowModal] = useState(false); 
    const { user } = SelectedUser();

    useEffect(() => {
        const fetchPaymentDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/payment/getpaymentdetail?email=${user.email}`);
                setPaymentDetail(response.data.departmentPayments);
            } catch (err) {
                console.log(err);
            }
        };
        fetchPaymentDetail();
    }, [user.email]);

    const handlePaymentSuccess=async(paymentData,department)=>{
        try{
            const response=await axios.post("http://localhost:5000/api/payment/storepayment",{data:paymentData,email:user.email,department:department,timestamp:Date.now()});
            return response.data.message;
        }
        catch(err){
            console.log(err);
            return "error";
        }
    }

    const handlePay = async (department, totalCost) => {
        const paymentRequest = {
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [{
                type: 'CARD',
                parameters: {
                    allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                    allowedCardNetworks: ['MASTERCARD', 'VISA']
                },
                tokenizationSpecification: {
                    type: 'PAYMENT_GATEWAY',
                    parameters: {
                        gateway: 'example',
                        gatewayMerchantId: 'exampleMerchantId'
                    }
                }
            }],
            merchantInfo: {
                merchantId: '12345678901234567890',
                merchantName: 'Event Payment'
            },
            transactionInfo: {
                totalPriceStatus: 'FINAL',
                totalPriceLabel: 'Total',
                totalPrice: totalCost.toString(),
                currencyCode: 'USD',
                countryCode: 'US'
            }
        };

        const paymentsClient = new window.google.payments.api.PaymentsClient({ environment: 'TEST' });

        try {
            const paymentData = await paymentsClient.loadPaymentData(paymentRequest);
            const isSuccess = paymentData.paymentMethodData &&
                paymentData.paymentMethodData.tokenizationData &&
                paymentData.paymentMethodData.tokenizationData.token;

            if (isSuccess) {
                const response=await handlePaymentSuccess(paymentData,department);
                if(response==="Payment Detail Stored Successfully"){
                    setPaymentResponse('Payment successful!');
                    setShowModal(true);
                }
                else if(response==="error"){
                    setPaymentResponse('Payment was not successful.');
                    setShowModal(true);
                }
                
            } else {
                setPaymentResponse('Payment was not successful.');
                setShowModal(true);
            }
        } catch (err) {
            console.log('Payment failed:', err);
            setPaymentResponse('Payment failed');
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setPaymentResponse(null);
    };

    return (
        <div className='payevents'>
            <div className='payevents-pay'>
                {Object.keys(paymentDetail).length > 0 ? (
                    <div className='payment-cards'>
                        {Object.entries(paymentDetail).map(([department, details]) => {
                            const { technical, nonTechnical, workshop, totalCost } = details;
                            const totalEvents = technical.length + nonTechnical.length + workshop.length;

                            return (
                                <div className='payment-card' key={department}>
                                    <h3>{department}</h3>
                                    <p><strong>Total Events:</strong> {totalEvents}</p>
                                    <p><strong>Technical Events:</strong> {technical.length}</p>
                                    <p><strong>Non-Technical Events:</strong> {nonTechnical.length}</p>
                                    <p><strong>Workshops:</strong> {workshop.length}</p>
                                    <p><strong>Cost (₹):</strong> {totalCost}</p>
                                    <div className="payevent-container-btn">
                                        <button className="payevent-btn-delete" onClick={() => handlePay(department, totalCost)}>Pay</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="no-payment-details-message">No payment details available</p>
                )}
                {showModal && (
                    <div className="payment-modal">
                        <div className="payment-modal-content">
                            <button className="payment-close-btn" onClick={closeModal}>x</button>
                            <p>{paymentResponse}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Payment;
