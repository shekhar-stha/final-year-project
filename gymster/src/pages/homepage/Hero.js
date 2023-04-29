import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <>
            <div className="hero w-100">
                <div className="container d-flex flex-column justify-content-center align-items-center">
                    <div className="hero-content">
                        <h1>
                            Reach your limits and get to the next level
                        </h1>
                        <p className="mx-auto">
                        Welcome to our  gym, where we believe that fitness should be accessible to everyone. 
                        Our goal is to provide a safe and supportive environment for our community to work towards their 
                        fitness goals.
                        </p>

                        <div className="buttons">
                            <Link to='/about-us' className="btn btn-outline-light tex">
                                Learn More
                            </Link>
                            <Link to='/join-form' className="btn btn-primary tex">
                                Join Now
                            </Link>
                        </div>
                    </div>
                </div>
                <img className="hero-img position-absolute" src="https://cdn.asparksys.com/medias/1672403484548.jpg" alt="hero" />
            </div>
        </>
    )
}