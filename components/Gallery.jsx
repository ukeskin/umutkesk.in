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

  const centerIndex = (images.length - 1) / 2;

  // Move the hooks outside the .map callback
  const offsets = images.map((_, index) =>
    useTransform(scrollYProgress, [0, 0.8], [0, (index - centerIndex) * 250])
  );

  const scales = images.map(() =>
    useTransform(scrollYProgress, [0, 0.1], [0.1, 1])
  );

  const rotations = images.map((_, index) =>
    useTransform(scrollYProgress, [0, 0.8], [20, (index - centerIndex) * 5])
  );

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="sticky flex justify-center items-center h-screen overflow-hidden">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            style={{
              x: offsets[index],
              scale: scales[index],
              rotate: rotations[index],
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
        ))}
      </div>
    </motion.div>
  );
};

export default Gallery;
