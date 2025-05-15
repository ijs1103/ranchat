import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import googleLogo from "../../../assets/logo/google_logo.png";
import kakaoLogo from "../../../assets/logo/kakao_logo.png";
import appleLogo from "../../../assets/logo/apple_logo.png";
import { AuroraText } from "~/common/components/ui/aurora-text";

export default function LoginPage() {
  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold">
          <AuroraText>RanChat</AuroraText>
        </h1>
        <div className="w-full max-w-[320px] md:max-w-[360px] flex flex-col gap-2">
          <Button className="flex items-center relative w-full" asChild>
            <Link to="/auth/social/google/start">
              <img
                className="w-6 h-6 absolute left-4"
                src={googleLogo}
                alt="google logo"
              />
              <span className="flex-1 text-center font-semibold">
                구글로 시작하기
              </span>
            </Link>
          </Button>
          <Button
            className="flex items-center relative w-full bg-[#ffe900] hover:bg-yellow-300"
            asChild
          >
            <Link to="/auth/social/kakao/start">
              <img
                className="w-6 h-6 absolute left-4"
                src={kakaoLogo}
                alt="kakao logo"
              />
              <span className="flex-1 text-center text-black font-semibold">
                카카오로 시작하기
              </span>
            </Link>
          </Button>
          <Button
            variant="outline"
            className="flex items-center relative w-full"
            asChild
          >
            <Link to="/auth/social/apple/start">
              <img
                className="w-6 h-6 absolute left-4"
                src={appleLogo}
                alt="apple logo"
              />
              <span className="flex-1 text-center font-semibold">
                애플로 시작하기
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
