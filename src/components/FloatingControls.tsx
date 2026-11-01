"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FloatingControls: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-[calc(5.25rem+env(safe-area-inset-bottom))] sm:bottom-8 right-3 sm:right-6 z-30 flex flex-col gap-2.5"
        >
          {/* Round Orange Back To Top Button */}
          <button
            type="button"
            onClick={handleScrollTop}
            aria-label="Back to top"
            title="Back to top"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-brand-black border-2 border-brand-black shadow-hard flex items-center justify-center cursor-pointer transition-transform active:scale-95"
          >
            <ArrowUp className="w-5 h-5 stroke-[2.5]" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

