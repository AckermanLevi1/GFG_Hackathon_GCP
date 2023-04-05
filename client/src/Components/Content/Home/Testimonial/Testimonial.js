import React from "react";
import img from "../image/farmer.png";
import img1 from "../image/farmer1.png";
import "./Testimonial.css";

const slide = [
  {
    id: 1,
    img,
    desc: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is availabl",
  },
  {
    id: 2,
    img: img1,
    desc: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is availabl",
  },
  {
    id: 3,
    img: "https://picsum.photos/200/300",
    desc: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is availabl",
  },
];
const delay = 2500;

export default function Testimonial() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === slide.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div
      className="testimonials"
      style={{ flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ fontSize: "2.5rem" }}>Testimonial</h1>
      <div className="slideshow">
        <div
          className="slideshowSlider"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
          {slide.map((slide, index) => (
            <div className="slide" key={index}>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "space-around",
                }}>
                <div className="image_circle" />
                <img src={slide.img} className="testimonial_image" />
                <p className="testimonial_desc">{slide.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="slideshowDots">
          {slide.map((_, idx) => (
            <div
              key={idx}
              className={`slideshowDot${index === idx ? " active" : ""}`}
              onClick={() => {
                setIndex(idx);
              }}></div>
          ))}
        </div>
      </div>
    </div>
  );
}
