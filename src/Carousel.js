// src/Carousel.js
import React, { useState, useEffect } from 'react';
import './Carousel.css';

const Carousel = ({ items, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        }, interval);

        return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 해제
    }, [items.length, interval]);

    return (
        <div className="carousel">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
                >
                    {item}
                </div>
            ))}
        </div>
    );
};

export default Carousel;
