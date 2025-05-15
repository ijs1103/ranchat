import { MorphingText } from "./ui/morphing-text";

export default function LoadingView() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <MorphingText texts={["로딩중...", "조금만 기다려주세요."]} />
    </div>
  );
}
