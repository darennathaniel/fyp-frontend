import { useAppSelector } from "@/hooks/useAppSelector";
import { Loader2 } from "lucide-react";

export default function Loading() {
  const { loading } = useAppSelector((state) => state.app);
  if (loading) {
    return (
      <div className="absolute bg-black bg-opacity-25 flex w-screen h-screen items-center justify-center">
        <Loader2 className="h-32 w-32 animate-spin" />
      </div>
    );
  }
  return <></>;
}
