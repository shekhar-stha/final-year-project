import Header1 from "../../components/header/Header1";

export default function AboutUs() {
    return (
        <>
            <Header1 />
            <section className="about-section">
                <div className="container pt-3">
                    <div className="about-section__img">
                        <img src="https://cdn.asparksys.com/medias/1673169015708.jpg" alt="About-section-img" className="img-fluid" />
                        <div className="about-section__overlay" />
                        <h3 className="about-section__title">About Us</h3>
                    </div>
                    <p className="about-section__plain-text about-section__main-text">
                        Welcome to our gym, where we believe that fitness should be accessible to everyone. 
                        Our goal is to provide a safe and supportive environment for our community to work towards their 
                        fitness goals. Whether you're a seasoned athlete or a beginner, we have everything you need to 
                        succeed, from top-quality equipment to personalized training programs. Our team of experienced 
                        trainers is here to help you every step of the way, and our supportive community will motivate 
                        you to push beyond your limits. Join us and let's work together to achieve your health and fitness 
                        goals!
                    </p>
                    <div className="about-section__vision">
                        <h3 className="about-section__text-title">Our Vision</h3>
                        <p className="about-section__plain-text">
                            We envision a community where everyone has access to the resources and support they need to lead healthy and active lifestyles.
                        </p>
                    </div>
                    <div className="about-section__mission">
                        <h3 className="about-section__text-title">Our Mission</h3>
                        <p className="about-section__plain-text">
                            Our mission is to empower individuals of all fitness levels to take control of their health and wellness through education, personalized training, and a supportive community.
                        </p>
                    </div>
                    <div className="about-section__mission">
                        <h3 className="about-section__text-title">Our Values</h3>
                        <p className="about-section__plain-text">
                            At our gym, we value inclusivity, respect, and accountability. We strive to create a welcoming environment where individuals of all backgrounds and fitness levels feel comfortable and supported in their fitness journey.
                        </p>
                    </div>
                    <div className="about-section__goals">
                        <h3 className="about-section__text-title">Objectives and Goals</h3>
                        <p className="about-section__plain-text">
                            Our objective is to provide our members with top-quality equipment and personalized training programs to help them achieve their fitness goals. Our goal is to foster a strong and supportive community that encourages and motivates each other to reach their full potential.
                        </p>

                    </div>
                </div>
            </section>
        </>
    )
}