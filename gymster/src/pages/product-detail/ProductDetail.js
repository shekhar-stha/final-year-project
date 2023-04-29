import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header1 from "../../components/header/Header1";
import ProductNavSlider from "../../components/product-nav-slider/ProductNavSlider";
import ProductRow from "../../components/product/ProductRow";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function ProductDetail() {
    const [count, setCount] = useState(1);
    const [product, setProduct] = useState()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let { id } = useParams();

    useEffect(() => {
        setCheckoutData({
            quantity: count,
            productId: (parseInt(id))
        })
    }, [count])

    useEffect(() => {
        fetchProduct()
    }, [])


    const fetchProduct = async () => {
        try {
            const response = await axios.get(`/product/getProduct/${id}`)
            setProduct(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const [checkoutData, setCheckoutData] = useState({
        quantity: count,
        productId: (parseInt(id))
    });

    console.log("checkoutdata", checkoutData)
    
    const handleBuyNow = async () => {
        try {
            const data = await axios.post("/checkout/addCheckout", checkoutData)
            console.log(data.data)
            if (data?.data === "success") {
                navigate("/checkout-product")
            }
        } catch (error) {
            console.log(error)
            toast.error(error)
        }
    };

    return (
        <>
            <Header1 />
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 mb-lg-0 mb-4">
                        <ProductNavSlider
                            image1={`http://localhost:5000/images/${product?.img1}`}
                            image2={`http://localhost:5000/images/${product?.img2}`}
                            image3={`http://localhost:5000/images/${product?.img3}`}
                        />


                    </div>

                    <div className="col-lg-6">
                        <div className="product-detail-info">
                            <h2 className="name">{product?.name}</h2>
                            <h4 className="price">Nrs {product?.price - product?.discount} <span className="crossed-price">Nrs {product?.price}</span></h4>
                            <p className="discount-percent">({((product?.discount / product?.price) * 100).toFixed(0)}% Off)</p>
                            <p className="discount-context">You saved <span>Nrs {product?.discount}</span> on this product </p>

                            <h5 className="fw-500 fs-18 mb-2">Quantity:</h5>
                            <div className="counter">
                                <button className="rounded-start-2" onClick={() => count > 1 && setCount(count - 1)}>-</button>
                                <input value={count} className="d-flex align-items-center justify-content-center fw-500 text-white" />
                                <button className="rounded-end-2" onClick={() => setCount(count + 1)}>+</button>
                            </div>

                            <p className="information">
                                {product?.description}
                                {/* <span className="text-primary ms-2"> View More ...</span> */}
                            </p>

                            <button onClick={handleBuyNow} className="btn btn-primary buy-button">Buy Now</button>
                        </div>
                    </div>
                </div>
                <ProductRow containerName="Recommended for you" />

                <ProductRow containerName="Flash Sale" />
            </div>
        </>
    )
}