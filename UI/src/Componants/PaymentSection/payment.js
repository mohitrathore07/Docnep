import React, { useState } from 'react';
import axios from 'axios';
import './payment.css';
import img1 from './madicineimg/498@2x.webp';
import scanners from './madicineimg/499@2x.webp';
import npximg from './madicineimg/500@2x.webp';
import { useLocation } from 'react-router-dom';
import { _addorderapiurl } from '../../Api.url';

const PaymentSection = () => {
    const location = useLocation();
    const { cartitems, totalAmount } = location.state || {};
    const [output, setOutput] = useState('');

    const saveOrder = async (items, amount) => {
        const orderData = {
            items: items.map(item => ({
                ProductName: item.TestName || item.PackageName || item.ProductName || item.itemName,
                quantity: item.quantity,
                userEmail: localStorage.getItem('email'),
                collection_name: item.collection_name,
                _uid: item._id,
            })),
            totalAmount: amount,
        };

        try {
            await axios.post(_addorderapiurl + "save", orderData);
            setOutput('Order Placed');
        } catch (error) {
            console.error(error);
            setOutput('Failed to place order');
        }
    };

    const handleOrderSubmit = () => {
        if (cartitems && totalAmount) {
            saveOrder(cartitems, totalAmount);
        }
    };

    const imgStyle = {
        width: '460px',
        height: '300px',
    };

    const qrImg = {
        width: '500px',
        height: '500px',
    };

    return (
        <div className='madicine-uses-main'>
            <div className='madicine-uses-main-home'>
                <img src={img1} alt='img' style={imgStyle} />
                <div>
                    <h2 className='main-home-heading'>FIND YOU A HOME NURSE</h2>
                    <p className='main-home-content'>
                        At Home, No Problem book a home nurse if you need, they will help you with your medics your rest and all you have to pay is a little amount, resting on home can be a challenging task, Make it easy with us.
                    </p>
                </div>
                <div style={{ marginLeft: '45px' }}>
                    <div className="btn-doctor">
                        <h2 className='main-home-heading' style={{ color: '#EE4C7C' }}>Rs. 2125</h2>
                        <p style={{ lineHeight: '100px', fontSize: '21px' }}>Week</p>
                        <button className="show-doctor-btn">Book Now</button>
                    </div>
                </div>
            </div>

            <div className='payments'>
                {cartitems && totalAmount ? (
                    <>
                        <h2 className='payment_caption' style={{ marginTop: '40px' }}>Pay By Scanning the Code Below</h2>
                        <div className='scanner_codes'>
                            <img src={scanners} alt='qrcodes' style={qrImg} />
                        </div>
                        <div>
                            <h3>Amount to be paid: {totalAmount}</h3>
                            {/* You can render cart items here if needed */}
                        </div>
                        <button onClick={handleOrderSubmit} className="submit-order-btn">
                            Place Order
                        </button>
                        {output && <p>{output}</p>}
                        <h2 className='payment_caption'>Or Continue to Payment Page</h2>
                        <div className='npx'>
                            <img src={npximg} alt='npx payment' style={{ width: '150px', height: '75px' }} />
                        </div>
                        <h2 className='payment_caption'>Fill the Form to find a Nurse.</h2>
                        <div className="appointment-form">
                            <iframe
                                src="https://docs.google.com/forms/d/e/1FAIpQLSdoPna-4C8MSh1QXLQHAmaQOM11fxvYOcpmXvA18LrLb84hVg/viewform?embedded=true"
                                width="700"
                                height="520"
                                frameBorder="0"
                                marginHeight="0"
                                marginWidth="0"
                                title="Nurse Booking Form"
                            >
                                Loading…
                            </iframe>
                        </div>
                        
                    </>
                ) : (
                    <p>Loading payment details...</p>
                )}
                
            </div>
        </div>
    );
};

export default PaymentSection;
