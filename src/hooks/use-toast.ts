
import { useToast as useToastOriginal, toast as toastOriginal } from "@/components/ui/use-toast";

// Re-export with the same API
export const useToast = useToastOriginal;
export const toast = toastOriginal;
