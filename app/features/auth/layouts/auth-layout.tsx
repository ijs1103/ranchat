import { Outlet } from "react-router";
import { AnimatedGridPattern } from "~/common/components/ui/animated-grid-pattern";

export default function AuthLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <AnimatedGridPattern />
      <div className="hidden md:block"></div>
      <div className="px-5 py-10 md:p-0">
        <Outlet />
      </div>
    </div>
  );
}
