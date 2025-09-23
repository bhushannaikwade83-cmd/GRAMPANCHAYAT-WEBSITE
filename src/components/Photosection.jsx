import React, { useState, useEffect, useRef } from "react";

const Photosection = () => {
  const images = ["/farmer1.jpg", "/farmer2.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, images.length]); // added images.length

  return (
    <div style={{ width: "100%", height: 400, position: "relative" }}>
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Slide ${i + 1}`}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: i === currentIndex ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        />
      ))}
    </div>
  );
};

export default Photosection;
