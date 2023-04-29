import { useState } from "react";

export default function ProductDetailInfo() {
    const [count, setCount] = useState(1);
    return (
        <>
            <div className="product-detail-info">
                <h2 className="name">Muscleblaze Protein Shake 1000GM with all nutrients</h2>
                <h4 className="price">Nrs. 10,000 <span className="crossed-price">Nrs. 12,000</span></h4>
                <p className="discount-percent">(10% Off)</p>
                <p className="discount-context">You saved <span>Nrs 2000</span> on this product </p>

                <h5 className="fw-500 fs-18 mb-2">Counter:</h5>
                <div className="counter">
                    <button className="rounded-start-2" onClick={() => count > 1 && setCount(count - 1)}>-</button>
                    <input value={count} className="d-flex align-items-center justify-content-center fw-500 text-white" />
                    <button className="rounded-end-2" onClick={() => setCount(count + 1)}>+</button>
                </div>

                <p className="information">
                    Weebles wobble but they don't fall down. Weebles are around, don't fall down! Weeble wobble, Weeble wobble,
                    Weeble wobble, Weeble wobble, Weeble wobble, Weeble wobble. Don't fall down! Wanted to get myself a new cell
                    <span className="text-primary ms-2"> View More ...</span>
                </p>

                <button className="btn btn-primary buy-button">Buy Now</button>
            </div>
        </>
    )
}