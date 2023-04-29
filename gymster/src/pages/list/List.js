import Header1 from "../../components/header/Header1";
import { useEffect, useState } from "react";
import Product from "../../components/product/Product";
import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

export default function List() {
    const searchedProduct = useSelector((state) => state?.searchedProducts?.searchedProduct)
    console.log("searched", searchedProduct)

    const [products, setProducts] = useState([]);

    const [productView, setProductView] = useState("products-container-row")

    const [isActiveCategory, setIsActiveCategory] = useState(false);

    const [display, setDisplay] = useState(false);
    const [maxPrice, setMaxPrice] = useState("")
    const [priceRange, setPriceRange] = useState("");

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`/product/searchProduct?keyword=${searchedProduct}&maxPrice=${priceRange}&genres=${selectedCheckboxes}`)
            console.log(response?.data)
            setProducts(response?.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchHighestPrice = async () => {
        try {
            const response = await axios.get('/product/getHighestPrice')
            setMaxPrice(response?.data?.highestPrice)
            setPriceRange(response?.data?.highestPrice)
        } catch (error) {
            console.log(error)
        }
    }

    // checkbox
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

    const handleCheckboxChange = (event) => {
        const { name, value, checked } = event.target;
        if (checked) {
            setSelectedCheckboxes([...selectedCheckboxes, name || value]);
        } else {
            setSelectedCheckboxes(selectedCheckboxes.filter((checkbox) => checkbox !== name && checkbox !== value));
        }
    };
    console.log("selected checkboxes", selectedCheckboxes)
    console.log("products", products)

    useEffect(() => {
        fetchHighestPrice()
    }, [])

    useEffect(() => {
        fetchProducts();
    }, [searchedProduct, priceRange, selectedCheckboxes])

    console.log("max price", maxPrice)


    // price high low
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);

        if (event.target.value === "lth") {
            const sortedProducts = products.sort((a, b) => {
                const aPrice = a?.price - a?.discount;
                const bPrice = b?.price - b?.discount;
                return aPrice - bPrice;
            });
            setProducts(sortedProducts);
        } else if (event.target.value === "htl") {
            const sortedProducts = products.sort((a, b) => {
                const aPrice = a?.price - a?.discount;
                const bPrice = b?.price - b?.discount;
                return bPrice - aPrice;
            });
            setProducts(sortedProducts);
        }
    }

    console.log(selectedOption)

    return (
        <>
            <Header1 />

            <div className="position-relative">
                <h2 className="text-center">All Products</h2>
                <img className="small-shape position-absolute top-0 end-0" 
                src="https://cdn.asparksys.com/medias/1668573318339.png" alt="" />
            </div>
            <hr />
            <section className="position-relative">
                {/* sidebar on btn */}
                <span onClick={() => setDisplay(!display)} id="sidebar-on-btn" 
                className="d-lg-none px-2 py-3 rounded-end bg-secondary text-white">
                    <i className="fa-solid fa-chevron-right" /></span>
                <div className="container list-page">
                    <div className="row">
                        {/* Filter side */}
                        <div className={("col-lg-3 opacity-bg")}>
                            <div id="sidebar-filter" 
                            style={display ? { display: "block" } : { display: "none" }} 
                            className="sidebar-filter bg-white d-lg-block rounded-1 border p-3">
                                <p onClick={() => setDisplay(!display)} id="sidebar-off-btn" 
                                className="text-end fs-4 mb-3 d-lg-none">
                                    <i className="fa-solid fa-xmark" />
                                </p>
                                {/* 1st row */}
                                <div className="d-flex justify-content-between mb-4">
                                    <p className="text-secondary fw-500">
                                        <i className="fa-solid fa-sliders me-2" /> <span>Filters By</span>
                                    </p>
                                    <p className="fw-500 fs-14">Clear</p>
                                </div>
                                {/* price range slider */}
                                <div className="wrapper mb-4">
                                    <h5 className="mb-4">Set price range</h5>

                                    <div>
                                        <Slider
                                            min={0}
                                            max={maxPrice}
                                            value={priceRange}
                                            onChange={(value) => setPriceRange(value)}
                                            trackStyle={[{ backgroundColor: "#243763" }]}
                                        // tipFormatter={(value) => `$${value}`}
                                        // tipProps={{ visible: true }}
                                        />

                                    </div>

                                    <div className="price-input">
                                        <div className="field">
                                            <input type="number" className="input-min" value={0} />
                                        </div>
                                        <div className="separator"><span className="fw-500 fs-6">to</span></div>
                                        <div className="field">
                                            <input type="number" className="input-max" value={priceRange} />
                                        </div>
                                    </div>

                                    <hr />
                                </div>
                                {/* 3rd, Category */}
                                <div className="category-checkbox mb-4">
                                    <h5 className="mb-3">Categories</h5>
                                    <form className="ms-1">
                                        <div className="mb-1">
                                            <label className="fs-14 fw-500" htmlFor="supplements">
                                                Supplements
                                                <input
                                                    type="checkbox"
                                                    id="supplements"
                                                    name="supplements"
                                                    value="supplements"
                                                    onChange={handleCheckboxChange}
                                                />
                                                <span className="checkmark rounded-1" />
                                            </label>
                                        </div>
                                        <div className="mb-1">
                                            <label className="fs-14 fw-500" htmlFor="clothes">
                                                Clothes
                                                <input type="checkbox" id="clothes" name="clothes" value="clothes" onChange={handleCheckboxChange} />
                                                <span className="checkmark rounded-1" />
                                            </label>
                                        </div>
                                        <div className="mb-1">
                                            <label className="fs-14 fw-500" htmlFor="accessories">
                                                Accessories
                                                <input
                                                    type="checkbox"
                                                    id="accessories"
                                                    name="accessories"
                                                    value="accessories"
                                                    onChange={handleCheckboxChange}
                                                />
                                                <span className="checkmark rounded-1" />
                                            </label>
                                        </div>
                                        <div className="mb-1">
                                            <label className="fs-14 fw-500" htmlFor="gadgets">
                                                Gadgets
                                                <input type="checkbox" id="gadgets" name="gadgets" value="gadgets" onChange={handleCheckboxChange} />
                                                <span className="checkmark rounded-1" />
                                            </label>
                                        </div>
                                        <div className="mb-1">
                                            <label className="fs-14 fw-500" htmlFor="others">
                                                Others
                                                <input type="checkbox" id="others" name="others" value="others" onChange={handleCheckboxChange} />
                                                <span className="checkmark rounded-1" />
                                            </label>
                                        </div>
                                       
                                    </form>

                                    <hr />
                                </div>


                            </div>
                        </div>
                        {/* Products Side */}
                        <div className="col-lg-9 product-side">
                            {/*View and sort row  */}
                            <div className="view-sort d-flex justify-content-between align-items-center">
                                {/* View */}
                                <div className="d-flex align-items-center view">
                                    <p className="fw-500 text-info mb-0">View :</p>
                                    <div className="fs-5 ms-2">
                                        <button id="grid-btn" 
                                        onClick={() => setProductView("products-container-row")} 
                                        className={productView === "products-container-row" ? "text-primary" : "text-info"}>
                                            <i className="fa-solid fa-grip me-2" />
                                        </button>
                                        <button id="list-btn" 
                                        onClick={() => setProductView("products-container-col")} 
                                        className={productView === "products-container-col" ? "text-primary" : "text-info"}>
                                            <i className="fa-solid fa-list" />
                                        </button>
                                    </div>
                                </div>
                                {/* Sort by */}
                                <div className="d-flex align-items-center">
                                    <p className="fw-500 text-info mb-0">SortBy :</p>
                                    <div className="ms-2">
                                        <select value={selectedOption} onChange={handleSelectChange} className="form-select text-dark fw-500">
                                        <option>Select One</option>
                                            <option value="lth">Price: low to high</option>
                                            <option value="htl">Price: high to low</option>

                                        </select>
                                    </div>
                                </div>
                            </div>
                            {/* Products List */}
                            <div id="products-container" className={productView}>
                                {
                                    products.map((product) => {
                                        return (
                                            <Link key={product?.id} to={`/product-detail/${product?.id}`}>
                                                <Product 
                                                name={product.name} 
                                                category={product.genre} 
                                                img={`http://localhost:5000/images/${product?.img1}`} 
                                                price={product?.price - product?.discount} 
                                                discountPercent=
                                                {((product?.discount / product?.price) * 100).toFixed(0)}
                                                 crossedPrice={((product?.price)).toFixed(2)} />
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        
                        </div>
                    </div>
                </div>
            </section>
            {/*------------------------------- Content Wrapper Ends ---------------------------------*/}
        </>
    )
}
