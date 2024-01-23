import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useError } from "@/hooks/useError";
import { useLoading } from "@/hooks/useLoading";
import { useUser } from "@/hooks/useUser";
import { ILandingUser } from "@/types/user/IUser";
import { AxiosError } from "axios";
import { ArrowRightCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function LoggedIn() {
  const user = useAppSelector((state) => state.app.user);
  const { getLandingUser } = useUser();
  const [data, setData] = useState<ILandingUser>({
    incomingContract: 0,
    incomingRequests: 0,
  });
  const { showLoading, closeLoading } = useLoading();
  const { showError } = useError();
  useEffect(() => {
    showLoading();
    getLandingUser()
      .then((response) => {
        setData(response);
      })
      .catch((err) => {
        if (err instanceof AxiosError) showError(err);
      })
      .finally(() => closeLoading());
  }, []);
  return (
    <div className="flex justify-center h-full w-full p-20 flex-col space-y-4">
      <h1 className="text-4xl font-semibold">Hi, {user.company_name}!</h1>
      <div>
        <h1 className="text-xl font-semibold text-gray-300">
          Here are a list of incoming requests:
        </h1>
        <div className="flex flex-row items-center space-x-1">
          <h1 className="text-md font-semibold text-gray-300">
            Supply Requests: {data.incomingRequests}
          </h1>
          <div className="group flex items-center">
            <Link to="/profile/request/supply">
              <Button className="p-2 hover:text-gray-400 space-x-2">
                <ArrowRightCircleIcon />
              </Button>
            </Link>
            <h1 className="text-xs font-semibold text-gray-300 opacity-0 hover:opacity-0 group-hover:opacity-100 transition duration-200">
              click to redirect!
            </h1>
          </div>
        </div>
        <div className="flex flex-row items-center space-x-1">
          <h1 className="text-md font-semibold text-gray-300">
            Contracts: {data.incomingContract}{" "}
          </h1>
          <div className="group flex items-center">
            <Link to="/profile/contract">
              <Button className="p-2 hover:text-gray-400 space-x-2">
                <ArrowRightCircleIcon />
              </Button>
            </Link>
            <h1 className="text-xs font-semibold text-gray-300 opacity-0 hover:opacity-0 group-hover:opacity-100 transition duration-200">
              click to redirect!
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
