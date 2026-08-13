import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Inline SVG components for high performance and styling flexibility (Strict brand theme: Green & Orange)
const SneakerSVG = () => (
  <svg viewBox="0 0 100 60" className="w-full h-full text-[#2E7D32]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Sneaker Sole */}
    <path d="M10 48 C 20 48, 30 52, 50 52 C 70 52, 85 45, 92 38 C 95 35, 92 32, 85 32 C 75 32, 65 35, 55 35 C 40 35, 25 25, 15 25 C 10 25, 5 35, 10 48 Z" fill="currentColor" fillOpacity="0.1" />
    <path d="M10 48 L 92 38" />
    {/* Upper Body */}
    <path d="M20 25 C 30 12, 45 8, 55 15 C 60 18, 65 28, 75 30 L 85 32" />
    <path d="M55 15 L 68 31" />
    {/* Laces */}
    <path d="M42 16 L 48 22" strokeWidth="2" />
    <path d="M46 13 L 52 19" strokeWidth="2" />
    <path d="M50 10 L 56 16" strokeWidth="2" />
    {/* Details */}
    <circle cx="25" cy="38" r="3" fill="currentColor" stroke="none" />
    <path d="M78 35 L 82 35" />
  </svg>
);

const CameraSVG = () => (
  <svg viewBox="0 0 100 80" className="w-full h-full text-[#F4A261]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Camera Body */}
    <rect x="10" y="25" width="80" height="48" rx="8" fill="currentColor" fillOpacity="0.1" />
    {/* Top Dial/Flash */}
    <path d="M30 25 L 30 18 C 30 16, 34 14, 40 14 L 60 14 C 66 14, 70 16, 70 18 L 70 25" />
    <rect x="75" y="17" width="10" height="8" rx="1" />
    {/* Lens */}
    <circle cx="50" cy="49" r="16" fill="currentColor" fillOpacity="0.05" />
    <circle cx="50" cy="49" r="10" />
    <circle cx="53" cy="46" r="3" fill="currentColor" stroke="none" />
    {/* Details */}
    <circle cx="22" cy="35" r="2" fill="currentColor" stroke="none" />
  </svg>
);

const GamepadSVG = () => (
  // Gamepad styled in slate-gray/green to blend with green-orange-white theme
  <svg viewBox="0 0 100 70" className="w-full h-full text-[#2E7D32]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {/* Controller Body */}
    <path d="M15 20 C 35 15, 65 15, 85 20 C 95 23, 95 45, 88 55 C 83 62, 70 58, 62 50 C 50 48, 50 48, 38 50 C 30 58, 17 62, 12 55 C 5 45, 5 23, 15 20 Z" fill="currentColor" fillOpacity="0.1" />
    {/* D-Pad */}
    <path d="M22 35 H 32 M27 30 V 40" strokeWidth="3" />
    {/* Action Buttons */}
    <circle cx="68" cy="33" r="3.5" fill="#F4A261" stroke="none" />
    <circle cx="76" cy="38" r="3.5" fill="#2E7D32" stroke="none" />
    <circle cx="68" cy="43" r="3.5" fill="#F4A261" stroke="none" />
    <circle cx="60" cy="38" r="3.5" fill="#2E7D32" stroke="none" />
    {/* Joystick / Center */}
    <circle cx="41" cy="41" r="5" />
    <circle cx="59" cy="41" r="5" />
    <path d="M44 26 H 56" strokeWidth="2" />
  </svg>
);

const SwapPortal = ({ isEmailFocused, isPasswordFocused, isSubmitHovered, isLoading }) => {
  // Determine floating/rotation dynamics based on focus states
  let orbitDuration = 10; // default slow rotation
  let orbitEase = "linear";
  
  if (isEmailFocused) {
    orbitDuration = 3; // faster speed
  } else if (isSubmitHovered) {
    orbitDuration = 1.5; // very fast spin
  } else if (isLoading) {
    orbitDuration = 0.8; // intense spinning
  }

  // Animation values for transition snappiness (0.1s target responsive state transitions)
  const springTransition = {
    type: "spring",
    stiffness: 400,
    damping: 22,
    mass: 0.8
  };

  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
      
      {/* Background Radial Glow (Strictly Green & Orange) */}
      <motion.div
        className="absolute inset-0 rounded-full blur-3xl opacity-20"
        animate={{
          background: isPasswordFocused
            ? "radial-gradient(circle, rgba(239,68,68,0.25) 0%, rgba(0,0,0,0) 70%)"
            : isSubmitHovered
            ? "radial-gradient(circle, rgba(46,125,50,0.4) 0%, rgba(244,162,97,0.3) 50%, rgba(0,0,0,0) 70%)"
            : "radial-gradient(circle, rgba(46,125,50,0.3) 0%, rgba(244,162,97,0.15) 50%, rgba(0,0,0,0) 70%)"
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Futuristic Orbit Ring (Green & Orange only) */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: orbitDuration, ease: orbitEase }}
      >
        {/* Dasharray lines animating along the path */}
        <motion.circle
          cx="100"
          cy="100"
          r="75"
          stroke="url(#orbitGradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="15 8 30 10"
          animate={{ strokeDashoffset: [0, -200] }}
          transition={{ repeat: Infinity, duration: orbitDuration, ease: "linear" }}
        />
        
        {/* Glow under the ring */}
        <circle
          cx="100"
          cy="100"
          r="75"
          stroke="#2E7D32"
          strokeWidth="0.5"
          strokeOpacity="0.25"
          fill="none"
        />

        <defs>
          <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2E7D32" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#F4A261" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2E7D32" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Central Rotating Portal Core */}
      <motion.div
        className="absolute z-10 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border border-slate-200 bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg shadow-[#2E7D32]/10"
        animate={{
          scale: isSubmitHovered ? 1.1 : isPasswordFocused ? 0.95 : 1,
          borderColor: isPasswordFocused ? "rgba(239, 68, 68, 0.3)" : "rgba(226, 232, 240, 1)"
        }}
        transition={springTransition}
      >
        {/* Rotating arrows inside the central core */}
        <motion.svg
          viewBox="0 0 100 100"
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#2E7D32]"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            rotate: isPasswordFocused ? 180 : isLoading ? -720 : [0, 360],
            color: isPasswordFocused ? "#DC2626" : isSubmitHovered ? "#1E5621" : "#2E7D32"
          }}
          transition={
            isLoading
              ? { repeat: Infinity, duration: 1.5, ease: "linear" }
              : isPasswordFocused
              ? { duration: 0.3 }
              : { repeat: Infinity, duration: 8, ease: "linear" }
          }
        >
          {/* Top/Right Arrow */}
          <path d="M15 50 C 15 25, 45 15, 75 30 L 85 20 M 75 30 L 78 45" />
          {/* Bottom/Left Arrow */}
          <path d="M85 50 C 85 75, 55 85, 25 70 L 15 80 M 25 70 L 22 55" />
        </motion.svg>

        {/* Security Shield Overlay when Password field is focused */}
        <AnimatePresence>
          {isPasswordFocused && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-red-50/95 backdrop-blur-sm rounded-full flex flex-col items-center justify-center border border-red-200 shadow-lg"
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8 sm:w-10 sm:h-10 text-red-600 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <span className="text-[9px] sm:text-[10px] font-bold text-red-600 mt-1 tracking-widest uppercase">Secure</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Item 1: Sneaker (Top-Left - Green) */}
      <motion.div
        className="absolute w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/90 border border-slate-200/80 rounded-2xl p-2 sm:p-2.5 shadow-md flex items-center justify-center"
        animate={
          isPasswordFocused
            ? { x: -30, y: -30, scale: 0.7, opacity: 0.2 }
            : isEmailFocused
            ? { x: -70, y: -60, scale: 1.05 }
            : isSubmitHovered
            ? { x: -100, y: -30, scale: 1.1 }
            : { x: -80, y: -60, scale: 1 }
        }
        transition={springTransition}
      >
        <SneakerSVG />
      </motion.div>

      {/* Item 2: Camera (Right Center - Orange) */}
      <motion.div
        className="absolute w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/90 border border-slate-200/80 rounded-2xl p-2 sm:p-2.5 shadow-md flex items-center justify-center"
        animate={
          isPasswordFocused
            ? { x: 40, y: 0, scale: 0.7, opacity: 0.2 }
            : isEmailFocused
            ? { x: 90, y: 10, scale: 1.05 }
            : isSubmitHovered
            ? { x: 100, y: 25, scale: 1.1 }
            : { x: 100, y: 0, scale: 1 }
        }
        transition={springTransition}
      >
        <CameraSVG />
      </motion.div>

      {/* Item 3: Gamepad (Bottom-Left - Green/Orange) */}
      <motion.div
        className="absolute w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/90 border border-slate-200/80 rounded-2xl p-2 sm:p-2.5 shadow-md flex items-center justify-center"
        animate={
          isPasswordFocused
            ? { x: -30, y: 40, scale: 0.7, opacity: 0.2 }
            : isEmailFocused
            ? { x: -40, y: 90, scale: 1.05 }
            : isSubmitHovered
            ? { x: -15, y: 100, scale: 1.1 }
            : { x: -25, y: 90, scale: 1 }
        }
        transition={springTransition}
      >
        <GamepadSVG />
      </motion.div>

      {/* Connection Electric Arcs (Green & Orange) */}
      <AnimatePresence>
        {isSubmitHovered && !isPasswordFocused && (
          <svg viewBox="0 0 200 200" className="absolute w-full h-full pointer-events-none z-0">
            {/* Sneaker connection line (Green) */}
            <motion.path
              d="M 50 60 Q 75 75 100 100"
              stroke="#2E7D32"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6 3"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -20 }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
            />
            {/* Camera connection line (Orange) */}
            <motion.path
              d="M 150 100 Q 125 100 100 100"
              stroke="#F4A261"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6 3"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -20 }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
            />
            {/* Gamepad connection line (Green) */}
            <motion.path
              d="M 85 150 Q 92 125 100 100"
              stroke="#2E7D32"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6 3"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -20 }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
            />
          </svg>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default SwapPortal;
