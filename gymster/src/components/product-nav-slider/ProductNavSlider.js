import Slider from "react-slick";
import { useState } from "react";

export default function ProductNavSlider(props) {
    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();
    return (
        <>
            <div className="product-nav-slider">
                <div className="thumbnail-slider">
                    <Slider asNavFor={nav2} ref={(slider1) => setNav1(slider1)}>
                        <div>
                            <img src={props.image1} alt="" />
                        </div>
                        {
                            props.image2 ?
                                <div>
                                    <img src={props.image2} alt="" />
                                </div> : null
                        }
                        {
                            props.image3 ?
                                <div>
                                    <img src={props.image3} alt="" />
                                </div> : null
                        }
                    </Slider>
                </div>

                <div className="nav-slider">
                    <Slider
                        asNavFor={nav1}
                        ref={(slider2) => setNav2(slider2)}
                        slidesToShow={4}
                        swipeToSlide={true}
                        focusOnSelect={true}
                    >
                        <div>
                            <img src={props.image1} alt="" />
                        </div>
                        {
                            props.image2 ?
                                <div>
                                    <img src={props.image2} alt="" />
                                </div> : null
                        }
                        {
                            props.image3 ?
                                <div>
                                    <img src={props.image3} alt="" />
                                </div> : null
                        }
                    </Slider>
                </div>
            </div>
        </>
    )
}