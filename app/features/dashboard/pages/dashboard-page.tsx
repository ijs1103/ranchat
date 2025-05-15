import { useTranslation } from "react-i18next";
import type { Route } from "./+types/dashboard-page";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "대시보드" },
    { name: "description", content: "로그인 후 사용자 대시보드" },
  ];
}

export default function DashboardPage() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col p-6 space-y-6">
      <h1 className="text-2xl font-bold">대시보드</h1>
      <p>로그인 상태에서만 볼 수 있는 페이지입니다.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="font-semibold mb-2">프로필</h2>
          <p>사용자 프로필 정보</p>
        </div>

        <div className="p-4 border rounded-lg shadow-sm">
          <h2 className="font-semibold mb-2">활동</h2>
          <p>최근 활동 내역</p>
        </div>
      </div>
    </div>
  );
}
