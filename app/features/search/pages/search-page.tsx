import { useState } from "react";
import { SearchHeader } from "../components/search-header";
import { SearchEmptyState } from "../components/search-empty-state";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    setSearchQuery(query);
    setHasSearched(true);

    try {
      // TODO: 실제 검색 API 호출
      // const results = await searchAPI(query);
      // setSearchResults(results);

      // 임시로 빈 결과 반환
      setSearchResults([]);
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* 검색 헤더 - NavigationBar 대신 사용 */}
      <SearchHeader onSearch={handleSearch} />

      {/* 검색 결과 영역 */}
      <main className="flex-1 overflow-auto">
        {isSearching ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">검색 중...</p>
            </div>
          </div>
        ) : hasSearched && searchResults.length === 0 ? (
          <SearchEmptyState query={searchQuery} />
        ) : !hasSearched ? (
          <SearchEmptyState />
        ) : (
          <div className="p-4">
            {/* TODO: 검색 결과 렌더링 */}
            <div className="space-y-4">
              {searchResults.map((result, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  {/* 검색 결과 아이템 */}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
