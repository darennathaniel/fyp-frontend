import { useAppSelector } from "@/hooks/useAppSelector";
import { useError } from "@/hooks/useError";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";

export default function ErrorPopup() {
  const { closeError } = useError();
  const { app_state } = useAppSelector((state) => state.app);
  return (
    <Dialog open={app_state.show} onOpenChange={closeError}>
      <DialogContent className="bg-zinc-950 text-white">
        <DialogHeader>
          <DialogTitle>Error</DialogTitle>
          <DialogDescription>
            Something went wrong, please try again!
          </DialogDescription>
          <div className="grid gap-4 py-2">
            {app_state.statusCode}: {app_state.message}
          </div>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
