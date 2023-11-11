import { useToast } from "@/components/ui/use-toast";
import { IStatus } from "@/types/user/IStatus";

export function useSuccess() {
  const { toast } = useToast();
  const showSuccess = (success: Partial<IStatus>) => {
    return toast({
      title: "Success!",
      description: `${success.statusCode}: ${success.message}`,
    });
  };
  return { showSuccess };
}
