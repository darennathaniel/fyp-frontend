import StyledButton from "@/components/ui/StyledButton";
import { Link } from "react-router-dom";
import ethereum from "../../assets/ethereum.svg";

export default function LandingPage() {
  return (
    <div className="flex justify-center h-full w-full p-20 flex-col space-y-4">
      <h1 className="text-4xl font-semibold">TraceSupply</h1>
      <div>
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-300">
            powered by Blockchain Ethereum
          </h1>
          <img src={ethereum} className="ml-2 w-6" />
        </div>
        <h1 className="text-md font-semibold text-gray-400">
          A Supply Chain Management application that gives full traceability to
          you!
        </h1>
      </div>
      <div className="space-x-4 flex items-center">
        <Link to="/sso/register">
          <StyledButton className="w-28">Get Started</StyledButton>
        </Link>
        <h1>or</h1>
        <StyledButton className="w-28">Contact Us</StyledButton>
      </div>
    </div>
  );
}
