import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const Gallery = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const images = [
    {
      id: 1,
      src: "/1.jpeg",
      text: "Amsterdam",
      alt: "my photo from amsterdam",
    },
    { id: 2, src: "/2.jpeg", text: "Brussels", alt: "my photo from brussels" },
    { id: 4, src: "/4.jpeg", text: "Cologne", alt: "my photo from cologne" },
    { id: 3, src: "/3.jpeg", text: "Paris", alt: "my photo from paris" },
  ];

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className=""
    >
      <div className="sticky flex justify-center items-center h-screen overflow-hidden">
        {images.map((image, index) => {
          const centerIndex = (images.length - 1) / 2;
          const offset = useTransform(
            scrollYProgress,
            [0, 0.8],
            [0, (index - centerIndex) * 250]
          );
          const scale = useTransform(scrollYProgress, [0, 0.1], [0.1, 1]);
          const rotate = useTransform(
            scrollYProgress,
            [0, 0.8],
            [20, (index - centerIndex) * 5]
          );

          return (
            <motion.div
              key={image.id}
              style={{
                x: offset,
                scale,
                rotate,
                zIndex: images.length - Math.abs(index - centerIndex),
              }}
              className="absolute p-3 rounded bg-gray-50 shadow border"
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={220}
                height={220}
                className="rounded"
              />
              <p
                style={{
                  fontFamily: "Indie Flower",
                }}
                className="text-gray-900 text-center py-3"
              >
                {image.text}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Gallery;
