import React from "react";
import Header1 from "../../components/header/Header1";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { toast } from 'react-toastify';

export default function Contact() {
  const phoneRegExp = /^(\+977-?)?(\d{10})$/;
  const contactSchema = Yup.object().shape({
    full_name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, 'Please enter alphabetic characters only')
      .required('Please insert your full name'),

    number: Yup.string()
      .required("fill the details")
      .matches(phoneRegExp, 'Phone number is not valid'),

    message: Yup.string()
      .min(2, 'Too short')
      .max(500, 'Too much')
      .required('Please enter message'),
  })

  const formik = useFormik({
    initialValues: {
      full_name: '',
      number: '',
      message: '',
    },
    validationSchema: contactSchema,
    onSubmit: values => {
      console.log("hello")
      sendMessages()
    }
  })

  const sendMessages = async () => {
    try {
      const response = await axios.post(`/message/sendMessage`, formik.values)
      if (response?.status === 200) {
        toast.success("Successfully sent message")
        formik.resetForm()
      }
    } catch (error) {
      toast.error("Error sending message")
      console.log(error)
    }
  }
  return (
    <>
      <Header1 />
      <section className="contact-section pb-5">
        <div className="container pt-3">
          <div className="contact-section__img">
            <img src="https://cdn.asparksys.com/medias/1672645589738.jpg" alt="About-section-img" className="img-fluid" />
            <div className="contact-section__overlay" />
            <h3 className="contact-section__title">Contact Us</h3>
          </div>
          <h1 className="contact-section__primary-title">Let’s stay connected</h1>
          <div className="contact-section__wrapper">
            {/* Contact Details */}
            <div className="contact-section">
              <div className="row contact-section__row">
                <div className="col-lg-7 col-md-12 col-sm-12">
                  <div className="row">
                    <div className="col-lg-4 col-sm-4 contact-section__contact-details">
                      <div className="details">
                        <span className="details__icons"><img alt="icon" src="https://cdn.asparksys.com/medias/1666259171836.svg" /></span>
                        <span className="details__text">Address</span>
                        <span className="details__address">RCT, 3rd floor, Itahari Chowk</span>
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-4 contact-section__contact-details">
                      <div className="details">
                        <span className="details__icons"><img alt="icon" src="https://cdn.asparksys.com/medias/1666259197935.svg" /></span>
                        <span className="details__text">Phone</span>
                        <span className="details__address"><a href="tel:9811015121">9811015121</a>,
                          <a href="tel:9811015121"> 9811015121</a></span>
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-4 contact-section__contact-details">
                      <div className="details">
                        <span className="details__icons"><img alt="icon" src="https://cdn.asparksys.com/medias/1666259213353.svg" /></span>
                        <span className="details__text">Email</span>
                        <span className="details__address"><a href="mailto:cni@cnind.org">info@planet.com</a></span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="map">
                      <iframe title="location" src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d14130.783060982267!2d85.3168223381158!3d27.69579647403249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sTrade%20Tower%2C%205th%20floor%2C%20Kathmandu!5e0!3m2!1sen!2snp!4v1664341351099!5m2!1sen!2snp" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                    </div>
                  </div>
                </div>
                {/* CONTACT FORM STARTS HERE */}
                <div className="col-lg-5 col-md-12 col-sm-12">
                  <div className="contact-section__form">
                    {/* Form Start */}
                    <form onSubmit={formik.handleSubmit} action="#" className="form-group">
                      <h1 className="contact-form-right__form-title">Contact Us</h1>
                      {/* Lead add 1st row  */}
                      <div className="contact-form-right__row">

                        {/* Full Name  */}
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <label htmlFor="full_name" className="contact-form-right__title">
                            Full Name<span className="red-star">*</span>
                          </label>

                          <input
                            onChange={formik.handleChange}
                            value={formik.values.full_name}
                            onBlur={formik.handleBlur}

                            id="full_name"
                            type="text"
                            name="full_name"
                            placeholder="Enter full name"
                            className="form-control"
                          />

                          {formik.errors.full_name && formik.touched.full_name ? (
                            <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.full_name}</p>
                          ) : null}
                        </div>
                      </div>

                      {/* Lead add 3rd row  */}
                      <div className="contact-form-right__row">
                        {/* Number  */}
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <label htmlFor="number" className="contact-form-right__title">
                            Number<span className="red-star">*</span>
                          </label>

                          <input
                            onChange={formik.handleChange}
                            value={formik.values.number}
                            onBlur={formik.handleBlur}

                            id="number"
                            type="text"
                            name="number"
                            placeholder="Enter your phone number"
                            className="form-control"
                          />
                          {formik.errors.number && formik.touched.number ? (
                            <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.number}</p>
                          ) : null}
                        </div>
                      </div>

                      {/* Lead add 3rd row  */}
                      <div className="contact-form-right__row">
                        {/* message  */}
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                          <label htmlFor="message" className="contact-form-right__title">
                            Message<span className="red-star">*</span>
                          </label>

                          <textarea
                            onChange={formik.handleChange}
                            value={formik.values.message}
                            onBlur={formik.handleBlur}
                            className="form-control"
                            placeholder="Type your message..."
                            id="message"
                            rows={5}
                            defaultValue={""} />

                          {formik.errors.message && formik.touched.message ? (
                            <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.message}</p>
                          ) : null}
                        </div>
                      </div>
                      {/* Lead add 6th row  */}
                      <div className="contact-form-right__btns">
                        <button type="submit" className="btn contact-form-btn w-100 mt-5">
                          Send Message
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}