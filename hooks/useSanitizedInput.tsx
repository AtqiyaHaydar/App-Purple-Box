// src/hooks/useSanitizedInput.ts
import { useState, ChangeEvent } from "react";
import { sanitizeInput } from "@/lib/security";

export function useSanitizedInput(initialValue: string = "") {
  const [value, setValue] = useState(sanitizeInput(initialValue));

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(sanitizeInput(e.target.value));
  };

  return [value, handleChange, setValue] as const;
}
