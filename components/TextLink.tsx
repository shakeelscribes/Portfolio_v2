"use client";

import { ArrowUpRight } from "@phosphor-icons/react";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/** Mono external link with a directional arrow. Client island so the icon context resolves. */
export default function TextLink({ href, children, className }: Props) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className={`group/link inline-flex items-center gap-1.5 font-mono text-sm text-dim transition-colors duration-300 hover:text-accent ${className ?? ""}`}
    >
      {children}
      <ArrowUpRight
        size={14}
        weight="bold"
        className="transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
      />
    </a>
  );
}
