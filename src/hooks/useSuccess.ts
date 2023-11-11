import { useToast } from "@/components/ui/use-toast";
import { AxiosResponse } from "axios";

export function useSuccess() {
  const { toast } = useToast();
  const showSuccess = (success: AxiosResponse) => {
    return toast({
      title: "Success!",
      description: `${success.status}: ${success.data.message}`,
    });
  };
  return { showSuccess };
}
