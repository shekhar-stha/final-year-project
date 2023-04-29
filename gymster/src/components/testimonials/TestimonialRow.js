import Slider from "react-slick";
export default function TestimonialRow() {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
        arrow: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrow: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
        ]
    };
    return (
        <>
            <div className="testimonial-row my-5 bg-success py-5">
                <div className="container">
                    <h2 className="container-header">Testimonials</h2>
                    <Slider {...settings}>
                        <div className="testimonial-card bg-white rounded">
                            <img className="quote-1" src="https://cdn.asparksys.com/medias/1666153416946.svg" alt="" />
                            <div className="profile-info d-flex d-grid gap-4">
                                <img className="rounded-circle" src="https://cdn.asparksys.com/medias/1681640306298.jpg" alt="" />
                                <div className="">
                                    <h5 className="text-secondary">Aniket Kafle</h5>
                                    <p className="text-info mb-1 fs-6 fw-normal">Gym Member</p>

                                </div>
                            </div>
                            <p className="text-info mt-3">
                                This gym has completely changed my life. I used to be self-conscious about my body,
                                but after joining this gym and gaining muscle, I feel confident and strong.
                                The atmosphere is great, and the equipment is top-notch. I highly recommend it!
                            </p>
                            <img className="quote-2" src="https://cdn.asparksys.com/medias/1666153416946.svg" alt="" />
                        </div>

                        <div className="testimonial-card bg-white rounded">
                            <img className="quote-1" src="https://cdn.asparksys.com/medias/1666153416946.svg" alt="" />
                            <div className="profile-info d-flex d-grid gap-4">
                                <img className="rounded-circle" src="https://cdn.asparksys.com/medias/1681640357940.jpg" alt="" />
                                <div className="">
                                    <h5 className="text-secondary">Bikal Siwakoti</h5>
                                    <p className="text-info mb-1 fs-6 fw-normal">Gym Member</p>

                                </div>
                            </div>
                            <p className="text-info mt-3">
                            I love coming to this gym every day. The staff is so friendly and welcoming, and the variety of equipment keeps my workouts interesting. I've seen amazing progress in my strength and endurance since joining, and I can't imagine going anywhere.
                            </p>
                            <img className="quote-2" src="https://cdn.asparksys.com/medias/1666153416946.svg" alt="" />
                        </div>

                        <div className="testimonial-card bg-white rounded">
                            <img className="quote-1" src="https://cdn.asparksys.com/medias/1666153416946.svg" alt="" />
                            <div className="profile-info d-flex d-grid gap-4">
                                <img className="rounded-circle" src="https://cdn.asparksys.com/medias/1681640233614.jpg" alt="" />
                                <div className="">
                                    <h5 className="text-secondary">Yogesh Khatiwada</h5>
                                    <p className="text-info mb-1 fs-6 fw-normal">Gym Member</p>

                                </div>
                            </div>
                            <p className="text-info mt-3">
                                I've been going to this gym for six months now, and I've lost 30 pounds! The trainers
                                are amazing and really helped me stay motivated throughout my weight loss journey.
                                I couldn't have done it without them!
                            </p>
                            <img className="quote-2" src="https://cdn.asparksys.com/medias/1666153416946.svg" alt="" />
                        </div>

                        <div className="testimonial-card bg-white rounded">
                            <img className="quote-1" src="https://cdn.asparksys.com/medias/1666153416946.svg" alt="" />
                            <div className="profile-info d-flex d-grid gap-4">
                                <img className="rounded-circle"
                                    src="https://cdn.asparksys.com/medias/1681640428906.jpg"
                                    alt="" />
                                <div className="">
                                    <h5 className="text-secondary">Bijesh Sharma</h5>
                                    <p className="text-info mb-1 fs-6 fw-normal">Gym Member</p>

                                </div>
                            </div>
                            <p className="text-info mt-3">
                            As someone who used to hate working out, I can honestly say that this gym has made me a fitness enthusiast. The trainers are so knowledgeable and passionate. I've never felt better, both physically and mentally!
                            </p>
                            <img className="quote-2" src="https://cdn.asparksys.com/medias/1666153416946.svg" alt="" />
                        </div>

                        <div className="testimonial-card bg-white rounded">
                            <img className="quote-1" src="https://cdn.asparksys.com/medias/1666153416946.svg" alt="" />
                            <div className="profile-info d-flex d-grid gap-4">
                                <img className="rounded-circle"
                                    src="https://cdn.asparksys.com/medias/1681640551818.jpg"
                                    alt="" />
                                <div className="">
                                    <h5 className="text-secondary">Narotam Shrestha</h5>
                                    <p className="text-info mb-1 fs-6 fw-normal">Gym Member</p>

                                </div>
                            </div>
                            <p className="text-info mt-3">
                            I've been a member of this gym for over a year now, and it's become like a second home to me. The community is so supportive and encouraging, and I've made some great friends here. I've also seen amazing results in my fitness journey, and I'm excited to see where else this gym can take me!
                            </p>
                            <img className="quote-2" src="https://cdn.asparksys.com/medias/1666153416946.svg" alt="" />
                        </div>
                    </Slider>
                </div>
            </div>
        </>
    )
}