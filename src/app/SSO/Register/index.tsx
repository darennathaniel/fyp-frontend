import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useError } from "@/hooks/useError";
import { useLoading } from "@/hooks/useLoading";
import { useRegister } from "@/hooks/useRegister";
import { IRegisterFormData } from "@/types/user/IRegisterFormData";
import { validateConfirmPassword } from "@/utils/validateConfirmPassword";
import { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const { showLoading, closeLoading } = useLoading();
  const register = useRegister();
  const { showError } = useError();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showLoading();
    try {
      const { username, password, wallet_address } =
        e.target as typeof e.target & IRegisterFormData;
      await register(username.value, password.value, wallet_address.value);
      navigate("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        showError({
          statusCode: err.status ?? 400,
          message: err.response?.data.message,
        });
      }
    } finally {
      closeLoading();
    }
  };
  return (
    <form
      className="w-screen h-screen flex items-center justify-center"
      onSubmit={handleSubmit}
    >
      <Card className="md:w-1/2 w-3/4">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Register your account</CardTitle>
          <CardDescription>
            Enter your assigned username, assigned wallet address, and your
            choice of password to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              className="text-zinc-950"
              id="username"
              type="text"
              required
              placeholder="johndoe"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              className="text-zinc-950"
              id="email"
              type="email"
              required
              placeholder="johndoe@mail.com"
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
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              className="text-zinc-950"
              required
              id="password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <Input
              className={`text-zinc-950 ${
                validateConfirmPassword(password, confirmPassword)
                  ? "border-white"
                  : "border-red-500"
              }`}
              required
              id="confirm_password"
              type="password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <Label
              className={`text-red-500 ${
                validateConfirmPassword(password, confirmPassword)
                  ? "hidden"
                  : "block"
              }`}
            >
              Password is not the same!
            </Label>
          </div>
        </CardContent>
        <CardFooter className="grid gap-2">
          <Button
            variant="outline"
            className="w-full hover:bg-gray-100 active:bg-gray-300 hover:text-zinc-950"
            disabled={!validateConfirmPassword(password, confirmPassword)}
          >
            Create Account
          </Button>
          <div className="flex items-center">
            <p className="text-sm md:text-base">Already have an account?</p>
            <Button className="h-8 px-2 text-gray-300 hover:text-white">
              <Link to="/sso/login">Login here!</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
