import React, { useState, useEffect, useRef } from "react";

const Festival = () => {
  const events = [
    { src: "/san1.jpg", title: "सण उत्सव 2023 – उद्घाटन सोहळा" },
    { src: "/san2.jpg", title: "सण उत्सव 2023 – सांस्कृतिक कार्यक्रम" },
    { src: "/san3.jpg", title: "सण उत्सव 2023 – पारंपरिक नृत्य" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  // Auto-slide every 4 seconds
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 4000);

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, events.length]);

  return (
    <div style={{ width: "100%", padding: "50px 20px", backgroundColor: "#f7f7f7" }}>
      <div style={{ maxWidth: 1000, margin: "auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: 30, fontSize: "2rem", fontWeight: "bold" }}>
          सण उत्सव
        </h2>

        <div
          style={{
            position: "relative",
            width: "100%",
            height: 450,
            borderRadius: 10,
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          {events.map((event, i) => (
            <img
              key={i}
              src={event.src}
              alt={event.title}
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

        <p
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 18,
            fontWeight: "bold",
            color: "#333",
          }}
        >
          {events[currentIndex].title}
        </p>
      </div>
    </div>
  );
};

export default Festival;
