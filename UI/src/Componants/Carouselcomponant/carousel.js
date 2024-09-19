  import React from "react";
  import "./carousel.css";
  import Slider from "react-slick";

  import img1 from "./images/588.webp";
  import img2 from "./images/589.webp";
  import img3 from "./images/590.webp";
  import img4 from "./images/591.webp";

  import "slick-carousel/slick/slick.css";
  import "slick-carousel/slick/slick-theme.css";

  function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }

  const Carousel = () => {
    const images = [img1 , img2, img3 , img4];

    var settings = {
      dots: true,
      infinite: images.length > 1,
      autoplay: true,
      speed: 500,
      slidesToShow: Math.min(1, images.length),
      slidesToScroll: 1,
      initialSlide: 0,
      nextArrow: <Arrow   className="slick-next" />,
      prevArrow: <Arrow className="slick-prev" />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 760,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 2,
          },
        },
      ],
    };

    const imgstyle = {
      width: "100%",
      height: "100%",
      objectFit: "content",
    };

    return (
      <>
        <div className="slider-container">
          <Slider {...settings}>
            {images.map((img, index) => (
              <div className="carousel-img-container" key={index}>
                <img src={img} alt={`slide-${index}`} style={imgstyle} />
              </div>
            ))}
          </Slider>
        </div>
      </>
    );
  };

  export default Carousel;
