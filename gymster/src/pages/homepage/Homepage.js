import Header2 from "../../components/header/Header2";
import Hero from "./Hero";
import ProductRow from "../../components/product/ProductRow";
import MembershipRow from "../../components/membership/MembershipRow";
import TestimonialRow from "../../components/testimonials/TestimonialRow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProducts } from "../../store/Slices/productSlice";
export default function Homepage() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProducts())
    }, [])
    const products = useSelector(state => state?.product?.products)

    const supplememts = products.filter((data) => data?.genre === "supplements")
    const accessories = products.filter((data) => data?.genre === "accessories")
    return (
        <>
            <div className="hero-nav-mix">
                <Header2 />
                <Hero />
            </div>
            <ProductRow containerName="All Products" products={products} />
            <ProductRow containerName="Supplements" products={supplememts} />
            <MembershipRow />
            <ProductRow containerName="Accessories" products={accessories} />
            <TestimonialRow />
        </>
    );
}