import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import StyledButton from "@/components/ui/StyledButton";
import { useCompany } from "@/hooks/useCompany";
import { useError } from "@/hooks/useError";
import { useLoading } from "@/hooks/useLoading";
import { useSuccess } from "@/hooks/useSuccess";
import { IAddCompanyFormData } from "@/types/company/IAddCompanyFormData";
import { IDialog } from "@/types/dialog/IDialog";
import { AxiosError } from "axios";
import { FormEvent, useState } from "react";

export default function AddCompanyDialog({ children }: IDialog) {
  const { showError } = useError();
  const { showSuccess } = useSuccess();
  const { showLoading, closeLoading } = useLoading();
  const { addCompany } = useCompany();
  const [open, setOpen] = useState<boolean>(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showLoading();
    try {
      const { company_name, username, email, wallet_address } =
        e.target as typeof e.target & IAddCompanyFormData;
      const response = await addCompany(
        company_name.value,
        username.value,
        email.value,
        wallet_address.value
      );
      showSuccess(response);
      setOpen(false);
      location.reload();
    } catch (err) {
      if (err instanceof AxiosError) {
        showError(err);
      }
    } finally {
      closeLoading();
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-950 text-white">
        <DialogHeader>
          <DialogTitle>Add a new company</DialogTitle>
          <DialogDescription>
            Create a new company here. Click add when you're done.
          </DialogDescription>
        </DialogHeader>
        <Separator className="bg-white" />
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Company Name</Label>
              <Input
                className="text-zinc-950"
                required
                id="company_name"
                type="text"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                className="text-zinc-950"
                required
                id="username"
                type="text"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className="text-zinc-950"
                required
                id="email"
                type="email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="wallet_address">Wallet Address</Label>
              <Input
                className="text-zinc-950"
                required
                id="wallet_address"
                type="text"
              />
            </div>
          </div>
          <Separator className="bg-white my-4" />
          <DialogFooter>
            <StyledButton text="Add" type="submit" />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
