"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { profile } from "@/lib/content";

export async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email);
    return true;
  } catch {
    return false;
  }
}

export default function CopyEmail({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className={className}
      onClick={async (e) => {
        e.stopPropagation();
        if (await copyEmail()) {
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } else {
          window.location.href = `mailto:${profile.email}`;
        }
      }}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? "Email copied" : "Copy email"}
    </button>
  );
}
