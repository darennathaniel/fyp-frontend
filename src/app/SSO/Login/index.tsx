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
import { FormEvent } from "react";

interface FormData {
  username: { value: string };
  password: { value: string };
}

export default function Login() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = e.target as typeof e.target & FormData;
    console.log(username.value, password.value);
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
            Enter your username and password to login into your account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              className="text-primary"
              id="username"
              type="text"
              placeholder="johndoe"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input className="text-primary" id="password" type="password" />
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
  );
}
