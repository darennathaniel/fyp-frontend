import ProfileHeader from "../components/ProfileHeader";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import { useError } from "@/hooks/useError";
import { useLoading } from "@/hooks/useLoading";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { useAppSelector } from "@/hooks/useAppSelector";

export default function ProfileHome() {
  const navigate = useNavigate();
  const { getUser } = useUser();
  const { showError } = useError();
  const { showLoading, closeLoading } = useLoading();
  const user = useAppSelector((state) => state.app.user);
  useEffect(() => {
    if (!user.isAuthenticated) {
      showLoading();
      getUser()
        .catch((err) => {
          if (err instanceof AxiosError) {
            showError(err);
            navigate("/");
          }
        })
        .finally(() => closeLoading());
    }
  }, []);
  return (
    <div className="space-y-6">
      <ProfileHeader
        title="Profile"
        subtitle="This is how others will see you on the site."
      />
      <div className="flex">
        <div className="font-semibold w-1/2">Company Name</div>
        <div className="text-zinc-400 w-1/2">{user.company_name}</div>
      </div>
      <div className="flex">
        <div className="font-semibold w-1/2">Username</div>
        <div className="text-zinc-400 w-1/2">{user.username}</div>
      </div>
      <div className="flex">
        <div className="font-semibold w-1/2">Email</div>
        <div className="text-zinc-400 w-1/2">{user.email}</div>
      </div>
      <div className="flex">
        <div className="font-semibold w-1/2">Wallet Address</div>
        <div className="text-zinc-400 w-1/2">{user.wallet_address}</div>
      </div>
      <Separator className="bg-white" />
      <div className="flex">
        <div className="font-semibold w-1/2">Number of Upstream Company</div>
        <div className="text-zinc-400 w-1/2">{user.upstream}</div>
      </div>
      <div className="flex">
        <div className="font-semibold w-1/2">Number of Downstream Company</div>
        <div className="text-zinc-400 w-1/2">{user.downstream}</div>
      </div>
      <div className="flex">
        <div className="font-semibold w-1/2">Number of Product Supply</div>
        <div className="text-zinc-400 w-1/2">{user.supply}</div>
      </div>
      <div className="flex">
        <div className="font-semibold w-1/2">
          Number of Prerequisite Product Supply
        </div>
        <div className="text-zinc-400 w-1/2">{user.prerequisite}</div>
      </div>
    </div>
  );
}
