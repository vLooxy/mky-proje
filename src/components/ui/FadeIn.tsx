"use client";

import { useEffect, useRef, useState } from "react";

// Simple hook for scroll-triggered animations
export function useInView(options = { threshold: 0.1, rootMargin: "0px" }) {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                // Once visible, we can unobserve if we only want one-time animation
                if (ref.current) observer.unobserve(ref.current);
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [options]);

    return { ref, isInView };
}

// Reusable Animated Section
export function FadeIn({
    children,
    className = "",
    delay = 0,
    direction = "up"
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "left" | "right" | "none"
}) {
    const { ref, isInView } = useInView();

    const getDirectionClass = () => {
        switch (direction) {
            case "up": return "translate-y-8";
            case "left": return "-translate-x-8";
            case "right": return "translate-x-8";
            case "none": return "";
            default: return "translate-y-8";
        }
    };

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out ${className} ${isInView ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${getDirectionClass()}`
                }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}
