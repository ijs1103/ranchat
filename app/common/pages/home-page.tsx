import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import type { Route } from "./+types/home-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function HomePage() {
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-400">
      <h1>메인</h1>
      <Button variant="outline" className="bg-red-300">
        <Link to="/auth/login">시작하기</Link>
      </Button>
    </div>
  );
}
