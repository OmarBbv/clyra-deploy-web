import { motion } from 'framer-motion'

export const ReactAtomSVG = () => {
  return (
    <svg
      viewBox="0 0 100 100"
      className="w-full h-auto lg:max-w-lg mx-auto"
    >
      <motion.circle
        cx="50"
        cy="50"
        r="8"
        fill="#61dafb"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      {[0, 1, 2].map((index) => (
        <motion.ellipse
          key={`electron-${index}`}
          cx="50"
          cy="50"
          rx="20"
          ry="35"
          fill="none"
          stroke="#61dafb"
          strokeWidth="0.5"
          initial={{ rotate: index * 60, scale: 0 }}
          animate={{ rotate: index * 60 + 360, scale: 1 }}
          transition={{
            rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            scale: { duration: 0.5, delay: index * 0.1 }
          }}
        />
      ))}

      {[0, 1, 2].map((index) => (
        <motion.circle
          key={`isotope-${index}`}
          cx="50"
          cy="50"
          r="3"
          fill="#61dafb"
          initial={{ scale: 0, pathOffset: 0 }}
          animate={{
            scale: 1,
            pathOffset: 1,
          }}
          transition={{
            scale: { duration: 0.5, delay: 0.5 + index * 0.1 },
            pathOffset: { duration: 10, repeat: Infinity, ease: "linear" }
          }}
          style={{
            offsetPath: `path("M50,15 A20,35 0 1,1 50,85 A20,35 0 1,1 50,15")`,
            offsetRotate: "auto",
            transformBox: "fill-box",
            transformOrigin: "center",
            rotate: `${index * 60}deg`,
          }}
        />
      ))}
    </svg>
  );
};