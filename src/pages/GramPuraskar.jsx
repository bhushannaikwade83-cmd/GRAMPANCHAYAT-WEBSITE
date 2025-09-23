import React, { useState, useEffect, useRef } from "react";

const GramPuraskar = () => {
  // Array of award photos and descriptions
  const awards = [
    { src: "/award1.jpg", title: "सर्वोत्कृष्ट ग्रामपंचायत 2023" },
    { src: "/award2.jpg", title: "स्वच्छता पुरस्कार 2022" },
    { src: "/award3.jpg", title: "सामाजिक विकास पुरस्कार 2021" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  // Auto-slide every 4 seconds
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % awards.length);
    }, 4000);

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, awards.length]);

  return (
    <div style={{ width: "100%", maxWidth: 900, margin: "auto", textAlign: "center", padding: "40px 0" }}>
      <h2 style={{ marginBottom: 20 }}>ग्राम पुरस्कार</h2>
      <div style={{ position: "relative", width: "100%", height: 400 }}>
        {awards.map((award, i) => (
          <img
            key={i}
            src={award.src}
            alt={award.title}
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
      <p style={{ marginTop: 15, fontSize: 18, fontWeight: "bold" }}>
        {awards[currentIndex].title}
      </p>
    </div>
  );
};

export default GramPuraskar;
