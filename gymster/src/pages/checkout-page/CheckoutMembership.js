import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header1 from '../../components/header/Header1'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import KhaltiCheckout from 'khalti-checkout-web';
import myKey from '../../components/Khalti/khaltiKey';
export default function CheckoutMembership() {
    const [memberData, setMemberData] = useState()
    const navigate = useNavigate()
    let { id } = useParams()

    useEffect(() => {
        const storedLoginDetails = localStorage.getItem('loginDetails');
        const loginDetails = storedLoginDetails ? JSON.parse(storedLoginDetails) : null;
        if (loginDetails === null) {
            navigate("/login")
            console.log("hello")
            toast.error("You need to login first")
            return;
        }
        fetchMemberData()
    }, [])

    const currentDate = new Date().toISOString().slice(0, 10);

    const fetchMemberData = async () => {
        try {
            const response = await axios.get(`/member/getMember/${id}`)
            console.log(response?.data)
            setMemberData(response?.data)
        } catch (error) {
            console.log(error)
        }
    }
    const choosenMembership = memberData?.gym_member?.membership

    const activateAccount = async (data) => {
        try {
            await axios.patch(`/member/activateAccount/${memberData?.id}`, data)
            toast.success("Successfully created member " + memberData?.full_name, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        } catch (error) {
            console.log(error)
            toast.error(error.response.data, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        }
    }

    const sendingData = {
        joined_date: currentDate,
        status: "active",
        amount: choosenMembership?.total_price
    }

    // Khalti Content
    let config = {
        // replace this key with yours
        "publicKey": myKey?.publicTestKey,
        "productIdentity": choosenMembership?.id,
        "productName": choosenMembership?.name,
        "productUrl": `http://localhost:3000/checkout-membership/${id}`,
        "eventHandler": {
            onSuccess(payload) {
                console.log(payload);
                activateAccount({ ...sendingData, token: payload.token })
                navigate("/")
            },
            onError(error) {
                console.log(error);
            },
            onClose() {
                console.log('widget is closing');
            }
        },
        "paymentPreference": ["KHALTI"],
    };

    let khaltiPanel = new KhaltiCheckout(config);

    const payNow = () => {
        khaltiPanel.show({ amount: (choosenMembership?.total_price * 100) })
    }
    return (
        <>

            <Header1 />
            <div className='container'>
                <div className='checkout gap-3'>
                    <div className='data-insertion bg-white rounded-3 px-4 py-4'>
                        {/* 1st Segment */}
                        <div className='membership-detail'>
                            <h3 className='fs-24 my-4 text-secondary'>Membership</h3>
                            <p className='fs-17 mb-2'>Member Name: {memberData?.full_name}</p>
                            <p className='fs-17 mb-2'>Username: {memberData?.username}</p>
                            <p className='fs-17 mb-2'>Membership: {memberData?.gym_member?.membership?.name}</p>
                            <p className='fs-17 mb-2'>Membership Duration: {memberData?.gym_member?.membership?.duration} Months</p>
                            <p className='fs-17 mb-2'>Joined date: {currentDate}</p>
                        </div>
                        <hr></hr>
                        <div className='payment'>
                            <h3 className='fs-24 my-4 text-secondary'>Payment Option</h3>
                            <div>
                                <div class="form-check mb-3 d-flex align-items-center">
                                    <label class="form-check-label ms-0" htmlFor="khalti">
                                        <img className='img-fluid khalti' src='https://cdn.asparksys.com/medias/1679317194683.png' alt='khalti' />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='billing-info'>
                        <div className='billing-box'>
                            <div className='first-col'>
                                <h4 className='text-secondary'>Price Details</h4>
                            </div>
                            <hr></hr>
                            <div className='mid-col'>
                                <div className='flex'>
                                    <h5>Total Amount</h5>
                                    <h5>Npr {choosenMembership?.total_price}</h5>
                                </div>
                            </div>
                            <hr></hr>
                            <div className='last-col'>
                                <span className='text-warning fs-14 fw-500'>You will need to renew your membership within {choosenMembership?.duration} Month</span>
                            </div>
                            <button type='button' onClick={payNow} className='btn btn-primary w-100 mt-3 py-2 rounded-top-0'>Proceed to pay</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
