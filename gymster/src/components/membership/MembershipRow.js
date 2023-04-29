import Slider from "react-slick";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { getMembership } from "../../store/Slices/membershipSlice";
import { Link } from "react-router-dom";

export default function MembershipRow() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMembership());
  }, []);

  const membership = useSelector((state) => state.membership?.membership)
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrpw: true
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
      <div className="membership-row my-5 py-5">
        <div className="container">
          <h2 className="container-header">Our Membership Plans</h2>
          <Slider {...settings}>
            {
              membership?.map((data) => {
                return (
                  <>
                    <div key={data?.id} className="membership">
                      <div className="top-section">
                        <h3>{data?.name}</h3>
                        <p>{`${(data?.duration)} Month`}</p>
                        <h4>{`Nrs ${data?.total_price}`}</h4>
                        
                      </div>
                      <div className="points">
                        {data?.description?.map(points => <p>{points}</p>)}
                      </div>
                      <Link to={`/join-form/${data?.id}`} className="btn btn-lg btn-lg-outline-primary btn-primary border-2 fs-17 fw-600 rounded-pill">Book Membership</Link>
                    </div>
                  </>
                )
              })
            }
          </Slider>
        </div>
      </div>
    </>
  )
}