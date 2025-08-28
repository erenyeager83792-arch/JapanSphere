import { useState } from "react";
import { Search, Globe, Zap, Map, Languages, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearch } from "@/hooks/use-search";
import { useToast } from "@/hooks/use-toast";
import type { SearchRequest } from "@shared/schema";

const categories = [
  { id: "general", label: "General", icon: Globe },
  { id: "anime", label: "Anime", icon: Zap },
  { id: "travel", label: "TV/Tour", icon: Map },
  { id: "language", label: "Language", icon: Languages },
] as const;

export function SearchInterface() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<SearchRequest["category"]>("general");
  const [searchResult, setSearchResult] = useState<any>(null);
  
  const searchMutation = useSearch();
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Search query required",
        description: "Please enter a question about Japan",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await searchMutation.mutateAsync({
        query: query.trim(),
        category: activeCategory,
      });
      setSearchResult(result);
    } catch (error) {
      toast({
        title: "Search failed",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="glass-effect rounded-2xl p-8 mb-8 search-glow">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categories.map((category) => {
          const IconComponent = category.icon;
          const isActive = activeCategory === category.id;
          
          return (
            <Button
              key={category.id}
              variant={isActive ? "default" : "secondary"}
              onClick={() => setActiveCategory(category.id)}
              className="flex items-center gap-2"
              data-testid={`button-category-${category.id}`}
            >
              <IconComponent className="h-4 w-4" />
              {category.label}
            </Button>
          );
        })}
      </div>
      
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="text"
          placeholder="Ask anything about Japan..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pl-12 pr-20 py-4 text-lg border-0 bg-input focus:ring-2 focus:ring-ring"
          data-testid="input-search"
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
          <Button 
            onClick={handleSearch}
            disabled={searchMutation.isPending}
            className="px-6 py-2"
            data-testid="button-search"
          >
            {searchMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Ask
          </Button>
        </div>
      </div>
      
      {/* Search Results */}
      {(searchResult || searchMutation.isPending) && (
        <div className="mt-6">
          <div className="bg-card rounded-xl p-6 border border-border">
            {searchMutation.isPending && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary mr-3" />
                <span className="text-muted-foreground" data-testid="text-searching">
                  Searching Japan knowledge...
                </span>
              </div>
            )}
            
            {searchResult && !searchMutation.isPending && (
              <div data-testid="container-search-results">
                <h3 className="text-lg font-semibold mb-4">Search Results</h3>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-foreground whitespace-pre-wrap" data-testid="text-search-result">
                    {searchResult.content}
                  </p>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 mb-2">
                      <span data-testid="text-search-source">
                        Powered by Perplexity AI - Sonar Model
                      </span>
                      <span>•</span>
                      <span className="capitalize" data-testid="text-search-category">
                        {searchResult.category}
                      </span>
                    </div>
                    {searchResult.citations && searchResult.citations.length > 0 && (
                      <div className="mt-2">
                        <p className="font-medium mb-1">Sources:</p>
                        <div className="space-y-1">
                          {searchResult.citations.map((citation: string, index: number) => (
                            <a
                              key={index}
                              href={citation}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-primary hover:underline text-xs break-all"
                              data-testid={`link-citation-${index}`}
                            >
                              {citation}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
