import { motion, AnimatePresence } from "framer-motion";

// High-fidelity illustrated SVGs for the Register Portal (Strict brand theme: Green & Orange)
const AvatarBoySVG = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full text-[#2E7D32]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="40" cy="40" r="38" fill="currentColor" fillOpacity="0.08" strokeDasharray="4 2" />
    {/* Head/Hair */}
    <circle cx="40" cy="32" r="12" />
    <path d="M28 28 C 30 18, 50 18, 52 28 Z" fill="currentColor" />
    {/* Glasses or eyes */}
    <circle cx="36" cy="32" r="2.5" fill="currentColor" stroke="none" />
    <circle cx="44" cy="32" r="2.5" fill="currentColor" stroke="none" />
    <path d="M38 32 H 42" />
    {/* Smile */}
    <path d="M37 38 Q 40 41 43 38" strokeWidth="2" />
    {/* Shoulders */}
    <path d="M22 60 C 22 50, 30 46, 40 46 C 50 46, 58 50, 58 60 L 55 68 H 25 Z" fill="currentColor" fillOpacity="0.15" />
  </svg>
);

const AvatarGirlSVG = () => (
  <svg viewBox="0 0 80 80" className="w-full h-full text-[#F4A261]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="40" cy="40" r="38" fill="currentColor" fillOpacity="0.08" strokeDasharray="4 2" />
    {/* Head/Hair */}
    <circle cx="40" cy="33" r="11" />
    <path d="M25 33 C 25 15, 55 15, 55 33 C 55 40, 50 40, 48 35" fill="currentColor" />
    {/* Eyes */}
    <circle cx="36" cy="33" r="2" fill="currentColor" stroke="none" />
    <circle cx="44" cy="33" r="2" fill="currentColor" stroke="none" />
    {/* Smile */}
    <path d="M36 39 Q 40 42 44 39" strokeWidth="2" />
    {/* Shoulders */}
    <path d="M23 60 C 23 51, 31 47, 40 47 C 49 47, 57 51, 57 60 L 53 68 H 27 Z" fill="currentColor" fillOpacity="0.15" />
  </svg>
);

const InventoryBoxSVG = () => (
  <svg viewBox="0 0 100 90" className="w-full h-full text-[#2E7D32]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    {/* Outer Box */}
    <path d="M20 30 L 50 15 L 80 30 L 50 45 Z" fill="currentColor" fillOpacity="0.1" />
    <path d="M20 30 V 65 L 50 80 V 45 Z" fill="currentColor" fillOpacity="0.1" />
    <path d="M80 30 V 65 L 50 80 V 45 Z" fill="currentColor" fillOpacity="0.05" />
    {/* Inner details (Gears or sparkles) */}
    <circle cx="50" cy="45" r="5" />
    <path d="M47 32 L 53 38" />
    <path d="M53 32 L 47 38" />
  </svg>
);

const InteractiveRegisterPortal = ({ isNameFocused, isEmailFocused, isPasswordFocused, isSubmitHovered, isLoading }) => {
  // Determine floating/rotation dynamics based on focus states
  let orbitDuration = 10; // default slow rotation
  let orbitEase = "linear";
  
  if (isNameFocused || isEmailFocused) {
    orbitDuration = 4; // faster speed
  } else if (isSubmitHovered) {
    orbitDuration = 1.5; // very fast spin
  } else if (isLoading) {
    orbitDuration = 0.8; // intense spinning
  }

  // Snappy spring config
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
            ? "radial-gradient(circle, rgba(46,125,50,0.15) 0%, rgba(245,158,11,0.2) 50%, rgba(0,0,0,0) 70%)"
            : isNameFocused || isEmailFocused
            ? "radial-gradient(circle, rgba(46,125,50,0.25) 0%, rgba(244,162,97,0.25) 50%, rgba(0,0,0,0) 70%)"
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
          stroke="url(#orbitGradientRegister)"
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
          <linearGradient id="orbitGradientRegister" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2E7D32" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#F4A261" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2E7D32" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Connection Network Lines */}
      <svg viewBox="0 0 200 200" className="absolute w-full h-full pointer-events-none z-0">
        {/* Left Avatar to Box (Green highlight when focused) */}
        <motion.path
          d="M 50 80 Q 75 90 100 110"
          stroke={isNameFocused ? "#2E7D32" : "#cbd5e1"}
          strokeWidth={isNameFocused ? "2.5" : "1.5"}
          fill="none"
          strokeDasharray={isNameFocused ? "6 3" : "4 4"}
          animate={isNameFocused ? { strokeDashoffset: -20 } : { strokeDashoffset: 0 }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
        />
        {/* Right Avatar to Box (Orange highlight when focused) */}
        <motion.path
          d="M 150 80 Q 125 90 100 110"
          stroke={isEmailFocused ? "#F4A261" : "#cbd5e1"}
          strokeWidth={isEmailFocused ? "2.5" : "1.5"}
          fill="none"
          strokeDasharray={isEmailFocused ? "6 3" : "4 4"}
          animate={isEmailFocused ? { strokeDashoffset: -20 } : { strokeDashoffset: 0 }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
        />

        {/* Floating Connection Nodes */}
        {isSubmitHovered && (
          <>
            <motion.circle cx="75" cy="88" r="4" fill="#2E7D32" animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 0.8 }} />
            <motion.circle cx="125" cy="88" r="4" fill="#F4A261" animate={{ scale: [1, 1.8, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} />
          </>
        )}
      </svg>

      {/* Center: Inventory Box / Vault */}
      <motion.div
        className="absolute z-10 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl border border-slate-200 bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg shadow-[#2E7D32]/10"
        animate={{
          y: [0, -6, 0],
          scale: isSubmitHovered ? 1.08 : isPasswordFocused ? 0.95 : 1,
          borderColor: isPasswordFocused ? "rgba(46, 125, 50, 0.3)" : "rgba(226, 232, 240, 1)"
        }}
        transition={
          isLoading 
            ? { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-[#2E7D32]">
          <InventoryBoxSVG />
        </div>

        {/* Password Security Shield overlay */}
        <AnimatePresence>
          {isPasswordFocused && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-emerald-50/95 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center border border-emerald-200 text-[#2E7D32] shadow-lg"
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#2E7D32] animate-bounce" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 2a10 10 0 0 0-10 10c0 5.621 8 10 8 10s8-4.379 8-10A10 10 0 0 0 12 2zm0 14a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
              </svg>
              <span className="text-[9px] font-extrabold text-[#2E7D32] mt-2 tracking-widest uppercase">Safe Lock</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Node 1: Waving User Avatar Left (Top-Left - Green) */}
      <motion.div
        className="absolute w-16 h-16 sm:w-20 sm:h-20"
        animate={
          isNameFocused
            ? { x: -80, y: -70, scale: 1.1, rotate: [0, -10, 0] }
            : isSubmitHovered
            ? { x: -90, y: -50, scale: 1.05 }
            : { x: -85, y: -60, scale: 1, rotate: 0 }
        }
        transition={springTransition}
      >
        <AvatarBoySVG />
      </motion.div>

      {/* Node 2: Happy User Avatar Right (Top-Right - Orange) */}
      <motion.div
        className="absolute w-16 h-16 sm:w-20 sm:h-20"
        animate={
          isEmailFocused
            ? { x: 80, y: -70, scale: 1.1, rotate: [0, 10, 0] }
            : isSubmitHovered
            ? { x: 90, y: -50, scale: 1.05 }
            : { x: 85, y: -60, scale: 1, rotate: 0 }
        }
        transition={springTransition}
      >
        <AvatarGirlSVG />
      </motion.div>

      {/* Decorative community nodes showing expansion (Strictly Orange & Green) */}
      <motion.div
        className="absolute w-3 h-3 rounded-full bg-[#F4A261] shadow-sm shadow-[#F4A261]/20"
        animate={{
          x: [-90, -100, -90],
          y: [60, 70, 60],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute w-3.5 h-3.5 rounded-full bg-[#2E7D32] shadow-sm shadow-[#2E7D32]/25"
        animate={{
          x: [90, 105, 90],
          y: [60, 50, 60],
          scale: [1, 0.7, 1]
        }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />

    </div>
  );
};

export default InteractiveRegisterPortal;
