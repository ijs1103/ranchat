import { useCallback, useState } from "react";
import { Button } from "~/common/components/ui/button";
import { Link, redirect, useNavigation } from "react-router";
import googleLogo from "../../../assets/logo/google_logo.png";
import kakaoLogo from "../../../assets/logo/kakao_logo.png";
import appleLogo from "../../../assets/logo/apple_logo.png";
import { AuroraText } from "~/common/components/ui/aurora-text";
import type { Route } from "./+types/login-page";

export const meta: Route.MetaFunction = () => {
  return [{ title: "Login | wemake" }];
};

export default function LoginPage() {
  const signInGoolge = useCallback(() => {}, []);
  const signInKakao = useCallback(() => {}, []);
  const signInApple = useCallback(() => {}, []);

  return (
    <div className="flex flex-col relative items-center justify-center h-full">
      <div className="flex items-center flex-col justify-center w-full max-w-md gap-10">
        <h1 className="text-xl md:text-2xl font-bold">
          랜챗 <AuroraText>로그인</AuroraText>
        </h1>
        <div className="w-full flex flex-col gap-2">
          <Button
            onClick={signInGoolge}
            className="flex items-center relative w-full"
          >
            <>
              <img
                className="w-6 h-6 absolute left-4"
                src={googleLogo}
                alt="google logo"
              />
              <span className="flex-1 text-center font-semibold">
                구글로 시작하기
              </span>
            </>
          </Button>
          <Button
            onClick={signInKakao}
            className="flex items-center relative w-full bg-[#ffe900]"
          >
            <>
              <img
                className="w-6 h-6 absolute left-4"
                src={kakaoLogo}
                alt="kakao logo"
              />
              <span className="flex-1 text-center text-black font-semibold">
                카카오로 시작하기
              </span>
            </>
          </Button>
          <Button
            onClick={signInApple}
            variant="outline"
            className="flex items-center relative w-full"
          >
            <>
              <img
                className="w-6 h-6 absolute left-4"
                src={appleLogo}
                alt="apple logo"
              />
              <span className="flex-1 text-center font-semibold">
                애플로 시작하기
              </span>
            </>
          </Button>
        </div>
      </div>
    </div>
  );
}
