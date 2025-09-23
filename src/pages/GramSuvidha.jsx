import React, { useState, useEffect, useRef } from "react";

const GramSuvidha = () => {
  const items = [
    { src: "/suvidha1.jpg", title: "सुविधा 2023 – आरोग्य केंद्र" },
    { src: "/suvidha2.jpg", title: "सुविधा 2023 – जलसंपदा सुविधा" },
    { src: "/suvidha3.jpg", title: "सुविधा 2023 – वीज सुविधा" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, items.length]);

  return (
    <div style={{ width: "100%", padding: "50px 20px", backgroundColor: "#eef7f7" }}>
      <div style={{ maxWidth: 1000, margin: "auto" }}>
        <h2 style={{ textAlign: "center", marginBottom: 30, fontSize: "2rem", fontWeight: "bold" }}>
          सुविधा
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
          {items.map((item, i) => (
            <img
              key={i}
              src={item.src}
              alt={item.title}
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
          {items[currentIndex].title}
        </p>
      </div>
    </div>
  );
};

export default GramSuvidha;
