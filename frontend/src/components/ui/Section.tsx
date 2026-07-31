import type { ReactNode } from "react";

import Container from "./Container";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function Section({
  children,
  className = "",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-24 md:py-32 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}