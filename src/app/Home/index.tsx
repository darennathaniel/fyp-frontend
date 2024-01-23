import { useAppSelector } from "@/hooks/useAppSelector";
import home from "./assets/home.png";
import LandingPage from "./components/LandingPage";
import LoggedIn from "./components/LoggedIn";

export default function Home() {
  const user = useAppSelector((state) => state.app.user);
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] md:grid md:grid-cols-2 flex">
      {user.isAuthenticated ? <LoggedIn /> : <LandingPage />}
      <div className="w-full flex items-center justify-center rounded-bl-full bg-gradient-to-tr from-zinc-950 from-40% to-purple-950">
        <img src={home} className="w-full" />
      </div>
    </div>
  );
}
