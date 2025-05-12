"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useWindowSize } from "@/lib/client-utils";
import { Quote } from "lucide-react";
import { rtlLocales } from "@/middleware";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  count: number;
  countLabel: string;
}

interface HeroSectionProps {
  lang: string;
  title: string;
  description: string;
}

export default function HeroSection({
  lang,
  title,
  description,
}: HeroSectionProps) {
  const windowSize = useWindowSize();

  // Define languages with their article counts - aligned with website locales
  const languages: Language[] = [
    {
      code: "en",
      name: "English",
      nativeName: "English",
      count: 5700,
      countLabel: "quotes",
    },
    {
      code: "es",
      name: "Spanish",
      nativeName: "Español",
      count: 2800,
      countLabel: "citas",
    },
    {
      code: "ar",
      name: "Arabic",
      nativeName: "العربية",
      count: 1200,
      countLabel: "مقالات",
    },
    {
      code: "fr",
      name: "French",
      nativeName: "Français",
      count: 3500,
      countLabel: "citations",
    },
    {
      code: "pt",
      name: "Portuguese",
      nativeName: "Português",
      count: 1900,
      countLabel: "citações",
    },
  ];

  // Calculate positions in a circle
  const calculatePosition = (index: number, total: number, radius: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2; // Start from top
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
  };

  // Safely check if lang is defined before using it
  const isRtl = lang && rtlLocales.includes(lang);

  return (
    <div className="relative w-full bg-gradient-to-b from-blue-50 to-slate-100 dark:from-blue-950 dark:to-slate-900 text-slate-900 dark:text-white overflow-hidden py-10">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/10"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">
          {/* Text content */}
          <div className="text-center md:text-left md:w-1/2 mb-8 md:mb-0">
            <motion.h1
              className={`${isRtl ? "leading-relaxed " : ""}text-3xl md:text-4xl lg:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-900 dark:from-blue-300 dark:to-white`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h1>
            <motion.p
              className="text-lg text-slate-700 dark:text-slate-300 mb-6 max-w-md mx-auto md:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {description}
            </motion.p>
          </div>

          {/* Languages Circle */}
          <div className="relative h-[300px] w-[300px] md:h-[320px] md:w-[320px]">
            {/* Center Icon */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Quote className="w-8 h-8 text-white" />
                </div>
                {/* Waves */}
                {[1, 2, 3].map((wave) => (
                  <motion.div
                    key={wave}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-blue-400/30 dark:border-blue-400/30 rounded-full"
                    style={{
                      width: `${wave * 40}px`,
                      height: `${wave * 40}px`,
                    }}
                    animate={{
                      opacity: [0.7, 0.2, 0.7],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      ease: "easeInOut",
                      repeat: Number.POSITIVE_INFINITY,
                      delay: wave * 0.5,
                    }}
                  ></motion.div>
                ))}
              </div>
            </motion.div>

            {/* Language Items */}
            {languages.map((language, index) => {
              // Use a fixed radius based on viewport size
              const radius = windowSize.width < 768 ? 120 : 140;

              const position = calculatePosition(
                index,
                languages.length,
                radius,
              );
              const positionStyle = {
                left: `calc(50% + ${position.x}px)`,
                top: `calc(50% + ${position.y}px)`,
              };

              const isActive = language.code === lang;

              return (
                <motion.div
                  key={language.code}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={positionStyle}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Link
                    href={`/${language.code}`}
                    className={`block text-center transition-all duration-300 ${
                      isActive
                        ? "scale-110 bg-blue-500/20 dark:bg-blue-500/20 ring-2 ring-blue-400/50"
                        : "hover:scale-105 hover:bg-blue-500/10 dark:hover:bg-blue-500/10"
                    } rounded-lg p-2`}
                  >
                    <div className="w-24">
                      <div
                        className={`text-base font-medium ${
                          isActive
                            ? "text-blue-800 dark:text-white"
                            : "text-slate-700 dark:text-blue-100"
                        }`}
                      >
                        {language.nativeName}
                      </div>
                      <div className="text-xs text-blue-600/80 dark:text-blue-300/80">
                        {language.count.toLocaleString()}+ {language.countLabel}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-16 text-slate-100 dark:text-slate-900/50"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-current"
          ></path>
        </svg>
      </div>
    </div>
  );
}
