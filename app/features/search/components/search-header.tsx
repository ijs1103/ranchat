import { ArrowLeft, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";

interface SearchHeaderProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function SearchHeader({
  onSearch,
  placeholder = "검색",
}: SearchHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    // onSearch(value);
  };

  return (
    <header className="flex h-16 w-full items-center border-b px-4 bg-background">
      <div className="flex w-full items-center gap-3">
        {/* 뒤로가기 버튼 */}
        <Button variant="ghost" size="icon" asChild>
          <Link to="/home">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>

        {/* 검색 폼 */}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={placeholder}
              value={searchQuery}
              onChange={handleInputChange}
              className="pl-10 pr-4"
              autoFocus
            />
          </div>
        </form>
      </div>
    </header>
  );
}
