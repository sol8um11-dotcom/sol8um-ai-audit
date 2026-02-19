"use client";

// Sol8um Logo Component — uses actual logo files from E:\AI Opportunity Audit Form\SOL8UM logo\
// "light" variant = image (4).png → white text SOL8UM logo for DARK backgrounds
// "dark" variant = SOL8UM_Logo_Final_Upscaled.webp → dark navy text SOL8UM logo for LIGHT backgrounds

export default function Logo({
  size = "md",
  variant = "dark",
}: {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "dark" | "light";
}) {
  const sizes = {
    sm: { w: 140, h: 38 },
    md: { w: 180, h: 48 },
    lg: { w: 220, h: 58 },
    xl: { w: 300, h: 80 },
  };
  const s = sizes[size];

  // light = for dark backgrounds (white text + colorful 8)
  // dark  = for light backgrounds (navy text + colorful 8)
  const logoSrc = variant === "light"
    ? "/sol8um-logo-dark-bg.png"
    : "/sol8um-logo-light-bg.webp";

  return (
    <img
      src={logoSrc}
      alt="Sol8um"
      width={s.w}
      height={s.h}
      style={{ objectFit: "contain" }}
    />
  );
}

export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <img
      src="/sol8um-8-mark.jpg"
      alt="Sol8um"
      width={size}
      height={size}
      style={{ objectFit: "contain", borderRadius: "20%" }}
    />
  );
}
