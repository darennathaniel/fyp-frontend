import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSuccess } from "@/hooks/useSuccess";
import { useError } from "@/hooks/useError";
import { useLoading } from "@/hooks/useLoading";
import { useLogin } from "@/hooks/useLogin";
import { ILoginFormData } from "@/types/user/ILoginFormData";
import { AxiosError } from "axios";
import { FormEvent } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { showError } = useError();
  const { showSuccess } = useSuccess();
  const { showLoading, closeLoading } = useLoading();
  const login = useLogin();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showLoading();
    try {
      const { username_or_email, password } = e.target as typeof e.target &
        ILoginFormData;
      const response = await login(username_or_email.value, password.value);
      showSuccess(response);
      navigate("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        showError(err);
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
          <CardTitle className="text-2xl">Login to your account</CardTitle>
          <CardDescription>
            Enter your username or email and password to login into your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username_or_email">Username or Email</Label>
            <Input
              className="text-zinc-950"
              id="username_or_email"
              type="text"
              required
              placeholder="a / a@a.com"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              className="text-zinc-950"
              required
              id="password"
              type="password"
            />
          </div>
        </CardContent>
        <CardFooter className="grid gap-2">
          <Button
            variant="outline"
            className="w-full hover:bg-gray-100 active:bg-gray-300 hover:text-zinc-950"
          >
            Login
          </Button>
          <div className="flex items-center">
            <p className="text-sm md:text-base">Haven't registered yet?</p>
            <Button className="h-8 px-2 text-gray-300 hover:text-white">
              <Link to="/sso/register">Register here!</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
