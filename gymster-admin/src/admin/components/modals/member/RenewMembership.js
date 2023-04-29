import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap';
import * as Yup from "yup"
import { useFormik } from "formik";
import axios from 'axios';
import { getMembership } from '../../../../store/slices/membership/membershipSlice';
import { getMembers } from '../../../../store/slices/members/memberSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function RenewMembership() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMembership());
    }, []);

    const membership = useSelector((state) => state.membership.membership)
    const navigate = useNavigate()
    const userId = useParams()
    console.log(userId)
    const schema = Yup.object().shape({
        membershipId: Yup.number()
            .required("Select one membership"),
    })

    const formik = useFormik({
        initialValues: {
            membershipId: '',
        },
        validationSchema: schema,
        onSubmit: values => {

            register()
        }
    })


    const register = async () => {
        let initialData = formik.values;
        const membershipId = parseInt(initialData?.membershipId);
        const data = ({
            membershipId: membershipId
        });
        console.log(data)
        try {
            const response = await axios.patch(`/member/renewMembership/${userId?.id}`, data)
            console.log(response)
            if (response?.status === 200) {
                toast.success("Submitted Successfully", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                })
                dispatch(getMembers())
                navigate("/admin-member")
            }
            // formik.resetForm()
        } catch (error) {
            console.log(error)
            toast.error(error.response.data, {
                position: toast.POSITION.BOTTOM_RIGHT,
            })
        }
    }

    const handleCloseEdit = () => {
        navigate("/admin-member")
    };
    return (
        <>

            <Modal show={true} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title className='w-100'>
                        <div className='d-flex justify-content-between align-items-center'>
                            Choose Membership
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={formik.handleSubmit}>
                        <div className="col-12">
                            <div className="input group  mb-3 d-flex flex-column w-100 text-info">
                                <label className="fw-normal mb-2" htmlFor="membershipId">Membersip</label>
                                <select
                                    className="form-select"
                                    name="membershipId"
                                    value={formik.values.membershipId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    id="membershipId"
                                >
                                    <option selected>Select Membersip</option>
                                    {
                                        membership.map((data) => {
                                            return (
                                                < option key={data.id} value={(data.id)} >
                                                    <span>{data.name}</span>
                                                    <span className="mx-2">{data.duration} Months</span>
                                                    <span>(Nrs {data.price})</span>
                                                </option>
                                            )
                                        }
                                        )
                                    }
                                </select>

                            </div>
                        </div>
                        <button type="submit" className="btn btn-secondary px-5 fs-19 mt-4">
                            Submit
                        </button>
                    </form>
                </Modal.Body>
            </Modal >
        </>
    )
}
