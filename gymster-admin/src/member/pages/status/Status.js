import Tabbar from "../../components/tabbar/Tabbar";
import ContentTopSection from "../../components/content-top/ContentTopSection";
import { useFormik } from "formik";
import * as Yup from "yup"
import { json } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiet } from "../../../store/slices/diet/dietSlice";

export default function Status() {
    const dispatch = useDispatch()
    const [message, setMessage] = useState("")
    const [idealWeight, setIdealWeight] = useState("");
    const [diet, setDiet] = useState([]);

    useEffect(() => {
        dispatch(getDiet())
    }, [])

    const diets = useSelector(state => state?.diet?.diet)

    const maintenance = diets.filter((data) => data?.diet_type === "Maintenance diet")
    const bulking = diets.filter((data) => data?.diet_type === "Bulking")
    const cutting = diets.filter((data) => data?.diet_type === "Cutting")
    console.log(maintenance)

    const schema = Yup.object().shape({
        weight: Yup.number()
        .typeError('Weight must be a number')
        .required('Weight is required')
        .min(25, 'Weight must be a positive number')
        .max(700, 'Weight cannot be more than 700'),

        heightFoot: Yup.number()
            .typeError('Please enter a valid number')
            .integer('Please enter a whole number')
            .test('no-dot', 'Please enter a number without decimal', value => {
                const strValue = value?.toString();
                return !strValue?.includes('.') && strValue !== '.';
            })
            .required('Please enter your height in foot'),

        heightInch: Yup.number()
            .max(12)
            .typeError('Please enter a valid number')
            .integer('Please enter a whole number')
            .test('no-dot', 'Please enter a number without decimal', value => {
                const strValue = value?.toString();
                return !strValue?.includes('.') && strValue !== '.';
            })
            .required('Please enter your height in inch')
            ,

        gender: Yup.string()
            .required("choose one"),
    })


    const formik = useFormik({
        initialValues: {
            weight: '',
            heightFoot: '',
            heightInch: '',
            // age: '',
            gender: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            calculateStatus(values)
        }
    })

    const calculateStatus = (values) => {

        if (values.heightFoot === 0 || values.weight === 0) {
            alert("Invalid Data")
        } else {
            const heightFootInMeters = Number(values.heightFoot) * 0.3048 + (values?.heightInch ? Number(values.heightInch) * 0.0254 : 0);
            console.log(heightFootInMeters)

            let bmi = (values.weight / (heightFootInMeters * heightFootInMeters)).toFixed(1);
            if (bmi < 18.5) {
                setMessage(`Your BMI is ${bmi} and you are Underweight`)
            } if (bmi > 18.5 && bmi <= 25) {
                setMessage(`Congrats Your BMI is ${bmi} and your body weight is Normal`)
            } if (bmi > 25 && bmi < 30) {
                setMessage(`Your BMI is ${bmi} and you are Overweight`)
            } if (bmi >= 30 && bmi < 40) {
                setMessage(`Your BMI is ${bmi} and you are Obese`)
            } if (bmi > 40) {
                setMessage(`Your BMI is ${bmi} and you are extremely Obese`)
            }

            let idealWeight;
            let feet = Number(values.heightFoot)
            let inches = values.heightInch ? Number(values.heightInch) : 0

            let over5feet = (feet - 5) * 12
            console.log("over5feet", over5feet)
            console.log("inches", inches)

            if (values.gender === "male") {
                idealWeight = (56.2 + (1.41 * (over5feet + inches))).toFixed(2)
            } else if (values.gender === "female") {
                idealWeight = (53.1 + (1.36 * (over5feet + inches))).toFixed(2)
            }
            setIdealWeight(idealWeight);

            console.log(idealWeight, values.weight)

            if (values.weight <= idealWeight - 4) {
                setDiet(bulking);
            } else if (values.weight >= idealWeight + 4) {
                setDiet(cutting);
            } else {
                setDiet(maintenance);
            }
        }
    }

    console.log("diet suggestion", diet)
    return (
        <>
            <div className="page-container">
                <div className="row h-100">
                    <div className="col-2 h-100 tab-side">
                        <Tabbar status="active" />
                    </div>

                    <div className="col-10 h-100">
                        <ContentTopSection />
                        <div className="content-side h-100 member-status">

                            {/* 1st Row */}
                            <div className="row h-100">

                                <div className="col-lg-12 pe-2">
                                    <h3 className="mb-3 text-secondary">Status</h3>
                                    <hr />

                                    <div>
                                        <form onSubmit={formik.handleSubmit} className="mx-2 p-4">
                                            <div className="row overflow-hidden">
                                                <div className="form-floating mb-3 col-lg-6 pe-2">
                                                    <input type="number"
                                                        className="form-control"
                                                        id="weight"
                                                        value={formik.values.weight}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="weight"
                                                    />

                                                    <label htmlFor="weight">Weight</label>
                                                    {formik.errors.weight && formik.touched.weight ? (
                                                        <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.weight}</p>
                                                    ) : null}
                                                </div>
                                                <div className="form-floating col-lg-6 ps-1">
                                                    <input type="float"
                                                        className="form-control"
                                                        id="heightFoot"
                                                        value={formik.values.heightFoot}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="heightFoot (feet)"
                                                    />

                                                    <label htmlFor="heightFoot">Height (foot)</label>

                                                    {formik.errors.heightFoot && formik.touched.heightFoot ? (
                                                        <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.heightFoot}</p>
                                                    ) : null}
                                                </div>


                                                <div className="form-floating col-lg-6">
                                                    <input type="float"
                                                        className="form-control"
                                                        id="heightInch"
                                                        value={formik.values.heightInch}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="heightInch (inch)"
                                                    />

                                                    <label htmlFor="heightInch">Height (inch)</label>

                                                    {formik.errors.heightInch && formik.touched.heightInch ? (
                                                        <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.heightInch}</p>
                                                    ) : null}
                                                </div>
                                            </div>

                                            <div className="row gap-4 overflow-hidden mt-2">
                                                <div className="col mt-2 d-flex align-items-center mb-3 position-relative">
                                                    <div className="form-floating my-auto d-flex align-items-center">
                                                        <h5 className="fs-17 me-3 fw-400 mb-1">Gender:</h5>
                                                        <div className="d-flex my-auto">
                                                            <div className="form-check me-3">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="gender"
                                                                    id="male"
                                                                    value="male"
                                                                    checked={formik.values.gender === "male"}
                                                                    // onChange={() => formik.setFieldValue("test", "b")}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur} />
                                                                <label className="form-check-label" htmlFor="male">
                                                                    Male
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="radio"
                                                                    name="gender"
                                                                    id="female"
                                                                    value="female"
                                                                    checked={formik.values.gender === "female"}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="female">
                                                                    Female
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {formik.errors.gender && formik.touched.gender ? (
                                                        <p className="fs-14 fw-500 text-primary pt-1 ps-3">{formik.errors.gender}</p>
                                                    ) : null}
                                                </div> *
                                            </div>

                                            <button type="submit" className="btn btn-primary fs-18 mt-3">Calculate</button>
                                        </form>

                                      {
                                        idealWeight && 
                                        <div className="conclusion-div mx-2">
                                        <h3 className="text-secondary fs-21">Result</h3>
                                        <p>{message}</p>
                                        <p className="mt-1">Your ideal body weight is <span className="fw-600 text-success">{idealWeight} KG</span></p>

                                        <h3 className="text-secondary mt-4 fs-21">Diet Suggestions</h3>
                                        {diet.length > 1 && <p className="text-info fs-14 mb-2">Choose the suitable one from these:</p>}
                                        {
                                            diet.map((data) => {
                                                return (
                                                    <table className="table  border">
                                                        <thead>
                                                            <tr className='table-dark text-white'>
                                                                <th scope="col">Diet Type</th>
                                                                <th scope="col">Meal 1</th>
                                                                <th scope="col">Meal 2</th>
                                                                <th scope="col">Meal 3</th>
                                                                <th scope="col">Meal 4</th>
                                                                <th scope="col">Meal 5</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="overflow">
                                                            <tr>
                                                                <td>{data?.diet_type}</td>
                                                                <td>{data?.meal[0]}</td>
                                                                <td>{data?.meal[1]}</td>
                                                                <td>{data?.meal[2]}</td>
                                                                <td>{data?.meal[3]}</td>
                                                                <td>{data?.meal[4]}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                )
                                            }
                                            )}
                                    </div>
                                      }
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}