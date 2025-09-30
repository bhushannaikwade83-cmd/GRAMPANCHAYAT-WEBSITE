import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";

const Welcome = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <section style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: isMobile ? '40px 20px' : '60px 40px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '-50px',
        width: '200px',
        height: '200px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        opacity: 0.5
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-30px',
        left: '-30px',
        width: '150px',
        height: '150px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        opacity: 0.5
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1 style={{
          fontSize: isMobile ? '28px' : '42px',
          margin: '0 0 15px 0',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
        }}>
          {/* Your header text */}
        </h1>

        {/* Marathi Welcome Message */}
        <p style={{
          fontSize: isMobile ? '16px' : '20px',
          margin: '0 0 20px 0',
          fontWeight: '600',
          color: '#fff',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
        }}>
          ग्रामपंचायत वरा आपलं स्वागत आहे
        </p>

        <p style={{
          fontSize: isMobile ? '15px' : '18px',
          margin: '0 0 25px 0',
          opacity: 0.95,
          maxWidth: '700px',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: '1.6'
        }}>
          {/* Your paragraph text */}
        </p>

        {/* Quick Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: isMobile ? '15px' : '30px',
          marginTop: '30px',
          flexWrap: 'wrap'
        }}>
          {[
            { icon: "👥", text: "1200+ नागरिक" },
            { icon: "🏠", text: "250+ कुटुंबे" },
            { icon: "🌾", text: "शेती विकास" },
            { icon: "💡", text: "डिजिटल सेवा" }
          ].map((item, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.2)',
              padding: isMobile ? '8px 15px' : '10px 20px',
              borderRadius: '25px',
              fontSize: isMobile ? '13px' : '14px',
              fontWeight: '600',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ fontSize: isMobile ? '16px' : '18px' }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Welcome;