import Header1 from "../../components/header/Header1";
import ProductRow from "../../components/product/ProductRow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import productSlice, { getProducts } from "../../store/Slices/productSlice";

export default function Store() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProducts())
    }, [])

    const products = useSelector(state => state?.product?.products)
    const supplememts = products.filter((data) => data?.genre === "supplements")
    const accessories = products.filter((data) => data?.genre === "accessories")
    const clothes = products.filter((data) => data?.genre === "clothes")
    const gadgets = products.filter((data) => data?.genre === "gadgets")
    const others = products.filter((data) => data?.genre === "others")
    return (
        <>
            <Header1 />

            <section className="contact-section pb-5">
                <div className="container pt-3">
                    <div className="contact-section__img">
                        <img src="https://cdn.asparksys.com/medias/1673111822849.jpg" alt="About-section-img" className="img-fluid" />
                        <div className="contact-section__overlay2" />
                        <h3 className="contact-section__title">Our Store</h3>
                    </div>
                </div>
            </section>
            {
                supplememts?.length > 0 && <ProductRow containerName="Supplements" products={supplememts} />
            }
            {
                accessories?.length > 0 && <ProductRow containerName="Accessories" products={accessories} />
            }
            {
                clothes?.length > 0 && <ProductRow containerName="Clothes" products={clothes} />}
            {
                gadgets?.length > 0 && <ProductRow containerName="Gadgets" products={gadgets} />}
            {
                others?.length > 0 && <ProductRow containerName="Others" products={others} />
            }
        </>
    )
}