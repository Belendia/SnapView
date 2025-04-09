import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const INTERNAL_SECRET = process.env.INTERNAL_API_SECRET;

export function isInternalRequest(request: Request) {
  return request.headers.get("x-internal-secret") === INTERNAL_SECRET;
}
