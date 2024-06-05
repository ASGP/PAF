import  { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import Card from "./Card";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Avatar = ({ size }) => {
  let width = "40";
  let height = "40";
  if (size === "lg") {
    width = "65";
    height = "65";
  }
  return (
    <div
      className={`w-${width} h-${height} rounded-full overflow-hidden mg-auto`}
    >
      <img
        src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          borderRadius: "50%",
        }}
        alt="Avatar"
      />
    </div>
  );
};

const StatusUpdate = ({}) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/status/all")
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  return (
    <div className="p-3">
      <div className="container-fluid" id="Slidebar-">
        <div className="testimonial-slider container-fluid">
          <div id="carouselExampleControls" className="carousel carousel-dark">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12" data-aos="fade-up">
                  <Carousel
                    responsive={responsive}
                    autoPlay
                    autoPlaySpeed={2000}
                    infinite
                  >
                    {reviews.map((review) => (
                      <div key={review._id}>
                        <Card>
                          <div className="m-3">
                            <a
                              href={"/profile/status"}
                              style={{
                                textDecoration: "none",
                                color: "#171617",
                              }}
                            >
                              <div className="Card" id="card">
                                <div
                                  className="card-body"
                                  id="tit-card"
                                  style={{
                                   
                                    overflow: "hidden",
                                  }}
                                >
                                 
                                  <p
                                    style={{
                                      marginTop: "5px",
                                      fontWeight: "bold",
                                      fontSize: "15px",
                                    }}
                                  >
                                   
                                    Running Distance:
                                    <span className="text-green-600 ml-2">
                                      {review.runningDistance}
                                    </span>
                                  </p>
                                  <div className="row">
                                    <div className="col">
                                      <p
                                        style={{
                                          marginTop: "5px",
                                          fontWeight: "bold",
                                          fontSize: "15px",
                                        }}
                                      >
                                        
                                        runningTime :
                                        <span className="text-green-600 ml-2">
                                          {review.runningTime}
                                        </span>
                                      </p>
                                      <p
                                        style={{
                                          marginTop: "5px",
                                          fontWeight: "bold",
                                          fontSize: "15px",
                                        }}
                                      >
                                        
                                        runningPace :
                                        <span className="text-green-600 ml-2">
                                          
                                          {review.runningPace}
                                        </span>
                                      </p>
                                      <p
                                        style={{
                                          marginTop: "5px",
                                          fontWeight: "bold",
                                          fontSize: "15px",
                                        }}
                                      >
                                        
                                        pushupsCount :
                                        <span className="text-green-600 ml-2">
                                          {review.pushupsCount}
                                        </span>
                                      </p>
                                      <p
                                        style={{
                                          marginTop: "5px",
                                          fontWeight: "bold",
                                          fontSize: "15px",
                                        }}
                                      >
                                      
                                        weightliftWeight :
                                        <span className="text-green-600 ml-2">
                                          {review.weightliftWeight}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </div>
                        </Card>
                      </div>
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusUpdate;
