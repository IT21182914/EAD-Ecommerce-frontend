import React from "react";
import Slider from "react-slick";

const TestimonialData = [
  {
    id: 1,
    name: "Victor",
    text: "This platform has completely transformed the way I do business. The user-friendly interface and excellent customer support make it a must-have tool for any entrepreneur.",
    img: "https://picsum.photos/101/101",
  },
  {
    id: 2,
    name: "Satya Nadella",
    text: "As someone who relies on efficiency, I’m amazed by the seamless experience this service offers. It’s a game-changer for managing day-to-day operations.",
    img: "https://picsum.photos/102/102",
  },
  {
    id: 3,
    name: "Virat Kohli",
    text: "The performance and reliability have been outstanding. I highly recommend this to anyone looking for a professional solution to streamline their workflow.",
    img: "https://picsum.photos/104/104",
  },
  {
    id: 5,
    name: "Sachin Tendulkar",
    text: "I’ve been using this platform for a year now, and I’ve seen incredible growth in my business. The features are top-notch, and the customer support is always responsive.",
    img: "https://picsum.photos/103/103",
  },
];

const Testimonials = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-10 mb-10">
      <div className="container">
        {/* header section */}
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <p data-aos="fade-up" className="text-sm text-primary font-semibold">
            What our customers are saying
          </p>
          <h1 data-aos="fade-up" className="text-3xl font-bold dark:text-white">
            Testimonials
          </h1>
          <p
            data-aos="fade-up"
            className="text-xs text-gray-400 dark:text-gray-300"
          >
            Our platform has empowered businesses across the globe. Here’s what
            some of our customers have to say.
          </p>
        </div>

        {/* Testimonial cards */}
        <div data-aos="zoom-in">
          <Slider {...settings}>
            {TestimonialData.map((data) => (
              <div className="my-6" key={data.id}>
                <div className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl dark:bg-gray-800 bg-primary/10 relative">
                  <div className="mb-4">
                    <img
                      src={data.img}
                      alt={data.name}
                      className="rounded-full w-20 h-20"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-3">
                      <p className="text-sm text-gray-500 text-center leading-relaxed dark:text-gray-300">
                        {data.text}
                      </p>
                      <h1 className="text-xl font-bold text-black/80 dark:text-white">
                        {data.name}
                      </h1>
                    </div>
                  </div>
                  <p className="text-black/20 dark:text-white/20 text-9xl font-serif absolute top-0 right-0">
                    &rdquo;
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
