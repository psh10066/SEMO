import React, { useState, useRef } from 'react';
import "./black.css"

function Black() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTextHovered, setTextHovered] = useState(false);
  const textRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = textRef.current.getBoundingClientRect();
    const distanceX = position.x - (rect.left + rect.width / 2);
    const distanceY = position.y - (rect.top + rect.height / 2);
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    const radius = 150; // 원의 반지름 (width의 반)

    if (distance + rect.width / 2 <= radius) {
      setTextHovered(true);
    } else {
      setTextHovered(false);
    }
    
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
    className="mask-container" 
    onMouseMove={handleMouseMove} 
    style={{ 
      '--maskX': `${position.x}px`, 
      '--maskY': `${position.y}px` 
    }}
  >
      <div 
        className="masked-text"
        ref={textRef}
      >
        <span className={`overlay ${isTextHovered ? '' : 'hovered'}`}>세상의 모든 모임</span>
        세상의 모든 모임
      </div>
  </div>
);
}

export default Black;