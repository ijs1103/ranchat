import { Search } from "lucide-react";

interface SearchEmptyStateProps {
  query?: string;
  showIcon?: boolean;
}

export function SearchEmptyState({
  query,
  showIcon = true,
}: SearchEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {showIcon && (
        <div className="mb-4 rounded-full bg-muted p-4">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
      )}

      <div className="text-center">
        {query ? (
          <>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-muted-foreground">
              '{query}'에 대한 검색 결과를 찾을 수 없습니다.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              결과없음
            </h3>
            <p className="text-muted-foreground">검색어를 입력해 주세요</p>
          </>
        )}
      </div>
    </div>
  );
}
