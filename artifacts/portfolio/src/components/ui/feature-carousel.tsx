import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Cloud,
  Package,
  Link,
  Users,
  Briefcase,
  Zap,
  Database,
  Settings,
  GraduationCap,
  ShoppingCart,
  Factory,
  CreditCard,
  GitBranch,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type FeatureItem = {
  id: string;
  label: string;
  icon: React.ElementType;
  image: string;
  description: string;
};

interface FeatureCarouselProps {
  features: FeatureItem[];
  accentColor?: string;
  autoPlayInterval?: number;
}

const ITEM_HEIGHT = 60;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function FeatureCarousel({
  features,
  accentColor = "hsl(var(--primary))",
  autoPlayInterval = 3500,
}: FeatureCarouselProps) {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % features.length) + features.length) % features.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + features.length) % features.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, autoPlayInterval);
    return () => clearInterval(interval);
  }, [nextStep, isPaused, autoPlayInterval]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = features.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl flex flex-col lg:flex-row min-h-[550px] lg:min-h-[500px] border border-border/40 bg-background/50 backdrop-blur-sm">
        {/* Left Panel - Feature List */}
        <div
          className="w-full lg:w-[42%] min-h-[320px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-6 md:px-10 lg:pl-10 py-12"
          style={{ background: accentColor }}
        >
          <div
            className="absolute inset-x-0 top-0 h-16 z-40"
            style={{
              background: `linear-gradient(to bottom, ${accentColor}, transparent)`,
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-16 z-40"
            style={{
              background: `linear-gradient(to top, ${accentColor}, transparent)`,
            }}
          />

          <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
            {features.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(features.length / 2),
                features.length / 2,
                distance
              );

              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.id}
                  style={{
                    height: ITEM_HEIGHT,
                    width: "fit-content",
                  }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.25,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    mass: 1,
                  }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-center gap-3 px-5 py-3 rounded-full transition-all duration-500 text-left group border",
                      isActive
                        ? "bg-white text-primary border-white z-10 shadow-lg"
                        : "bg-transparent text-white/70 border-white/20 hover:border-white/50 hover:text-white"
                    )}
                  >
                    <Icon
                      size={16}
                      className={cn(
                        "transition-colors duration-500 shrink-0",
                        isActive ? "text-primary" : "text-white/50"
                      )}
                    />
                    <span className="font-medium text-xs md:text-sm tracking-tight whitespace-nowrap">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Panel - Image Cards */}
        <div className="flex-1 min-h-[400px] lg:h-full relative bg-muted/30 flex items-center justify-center py-12 px-6 md:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l border-border/20">
          <div className="relative w-full max-w-[360px] aspect-[4/5] flex items-center justify-center">
            {features.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -80 : isNext ? 80 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.4 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden border-4 md:border-6 border-background bg-background origin-center shadow-2xl"
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700",
                      isActive
                        ? "grayscale-0 blur-0"
                        : "grayscale blur-[2px] brightness-75"
                    )}
                  />

                  <AnimatePresence mode="popLayout">
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10, position: "absolute" }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute inset-x-0 bottom-0 p-6 md:p-8 pt-24 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end pointer-events-none"
                      >
                        <div className="bg-background text-foreground px-3 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider w-fit shadow-lg mb-2 border border-border/50">
                          {index + 1} • {feature.label}
                        </div>
                        <p className="text-white font-medium text-lg md:text-xl leading-snug drop-shadow-md">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Pre-configured Technical Expertise Data
export const SALESFORCE_EXPERTISE: FeatureItem[] = [
  {
    id: "apex",
    label: "Apex Development",
    icon: Code,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
    description: "Expert in Triggers, Classes, and complex business logic implementation.",
  },
  {
    id: "lwc",
    label: "Lightning Web Components",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800",
    description: "Building modern, reactive UI components with LWC framework.",
  },
  {
    id: "flows",
    label: "Flows & Automation",
    icon: Settings,
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800",
    description: "Declarative automation with Screen Flows and Record-Triggered Flows.",
  },
  {
    id: "service-cloud",
    label: "Service Cloud",
    icon: Cloud,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800",
    description: "End-to-end implementation of Case Management and Support Workflows.",
  },
  {
    id: "cpq",
    label: "CPQ Cloud",
    icon: ShoppingCart,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
    description: "Quote-to-Cash solutions with product configuration and pricing.",
  },
  {
    id: "education-cloud",
    label: "Education Cloud",
    icon: GraduationCap,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
    description: "OmniStudio implementations for educational institutions.",
  },
  {
    id: "manufacturing",
    label: "Manufacturing Cloud",
    icon: Factory,
    image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=800",
    description: "Sales agreements and account-based forecasting solutions.",
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: Link,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    description: "Razorpay, AuthVia payments, and legacy system integrations.",
  },
  {
    id: "packages",
    label: "Managed Packages",
    icon: Package,
    image: "https://images.unsplash.com/photo-1586864387789-628af9feed72?w=800",
    description: "Deep expertise with AvSight, AuthVia, Accounting Seed & Avalara.",
  },
  {
    id: "devops",
    label: "DevOps & Deployment",
    icon: GitBranch,
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800",
    description: "Copado deployments and GitHub version control workflows.",
  },
];

export const LEADERSHIP_EXPERTISE: FeatureItem[] = [
  {
    id: "team-lead",
    label: "Team Leadership",
    icon: Users,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
    description: "Leading development teams, mentoring interns, and managing deliverables.",
  },
  {
    id: "code-review",
    label: "Code Reviews",
    icon: Code,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    description: "Establishing Apex best practices and project-wide coding standards.",
  },
  {
    id: "client-handling",
    label: "Client Management",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?w=800",
    description: "Direct stakeholder communication and requirement gathering.",
  },
  {
    id: "requirements",
    label: "Requirements Analysis",
    icon: Database,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
    description: "Breaking down complex business needs into technical specifications.",
  },
];

export default FeatureCarousel;
