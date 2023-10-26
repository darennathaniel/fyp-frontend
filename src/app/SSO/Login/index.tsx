import ErrorPopup from "@/components/ErrorPopup";
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
import { useError } from "@/hooks/useError";
import { useLogin } from "@/hooks/useLogin";
import { AxiosError } from "axios";
import { FormEvent } from "react";
import { useNavigate } from "react-router";

interface FormData {
  username: { value: string };
  password: { value: string };
}

export default function Login() {
  const navigate = useNavigate();
  const { showError } = useError();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { username, password } = e.target as typeof e.target & FormData;
      const login = useLogin();
      console.log(username.value, password.value);
      await login(username.value, password.value);
      navigate(-1);
    } catch (err) {
      if (err instanceof AxiosError) {
        showError({
          statusCode: err.status ?? 400,
          message: err.response?.data.message,
        });
      }
    }
  };
  return (
    <>
      <ErrorPopup />
      <form
        className="w-screen h-screen flex items-center justify-center"
        onSubmit={handleSubmit}
      >
        <Card className="md:w-1/2 w-3/4">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Login to your account</CardTitle>
            <CardDescription>
              Enter your username and password to login into your account
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
          <CardFooter>
            <Button
              variant="outline"
              className="w-full hover:bg-gray-100 active:bg-gray-300 hover:text-zinc-950"
            >
              Login
            </Button>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
