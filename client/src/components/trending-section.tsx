import { useState } from "react";
import { Flame, RefreshCw, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTrending } from "@/hooks/use-trending";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";

export function TrendingSection() {
  const { data: articles, isLoading, error } = useTrending();
  const [activeFilter, setActiveFilter] = useState("all");
  const { toast } = useToast();

  // Filter articles based on selected category
  const filteredArticles = articles?.filter(article => {
    if (activeFilter === "all") return true;
    return article.category.toLowerCase() === activeFilter.toLowerCase();
  });

  const filters = [
    { id: "all", label: "All" },
    { id: "culture", label: "Culture" },
    { id: "anime", label: "Anime" },
    { id: "tech", label: "Tech" }
  ];

  const handleRefresh = async () => {
    try {
      await queryClient.invalidateQueries({ queryKey: ["/api/trending"] });
      toast({
        title: "Refreshed!",
        description: "Trending articles have been updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh trending articles.",
        variant: "destructive",
      });
    }
  };

  const handleArticleClick = (article: any) => {
    if (article.url && article.url !== "#") {
      window.open(article.url, '_blank');
    } else {
      toast({
        title: article.title,
        description: article.excerpt,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-6 w-16" />
          ))}
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card rounded-lg p-4">
              <div className="flex space-x-3">
                <Skeleton className="w-16 h-12 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-effect rounded-xl p-6">
        <div className="text-center py-8">
          <p className="text-destructive text-sm" data-testid="text-trending-error">
            Unable to load trending articles
          </p>
          <Button variant="outline" size="sm" className="mt-2" data-testid="button-retry-trending">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-xl p-6" data-testid="trending-section">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center">
          <Flame className="text-red-500 h-5 w-5 mr-2" />
          <span className="text-red-500">Trending Now</span>
          <Badge variant="destructive" className="ml-2 text-xs" data-testid="badge-live">
            LIVE
          </Badge>
        </h3>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleRefresh}
          className="text-muted-foreground hover:text-foreground p-2"
          data-testid="button-refresh-trending"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-4 text-sm">
        {filters.map((filter) => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "secondary"}
            size="sm"
            onClick={() => setActiveFilter(filter.id)}
            className="px-3 py-1 h-auto text-xs"
            data-testid={`button-filter-${filter.id}`}
          >
            {filter.label}
          </Button>
        ))}
      </div>
      
      {/* Trending Articles */}
      <div className="space-y-4">
        {filteredArticles?.map((article, index) => (
          <article 
            key={article.id}
            onClick={() => handleArticleClick(article)}
            className="trending-card bg-card rounded-lg p-4 border border-border cursor-pointer group hover:border-primary/20 transition-all"
            data-testid={`card-article-${article.id}`}
          >
            <div className="flex space-x-3">
              {article.imageUrl && (
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-16 h-12 rounded-lg object-cover flex-shrink-0"
                  data-testid={`img-article-${article.id}`}
                />
              )}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors" data-testid={`text-title-${article.id}`}>
                  {article.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2" data-testid={`text-excerpt-${article.id}`}>
                  {article.excerpt}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Badge variant="secondary" className="mr-2 text-xs">
                    {article.category}
                  </Badge>
                  <Clock className="h-3 w-3 mr-1" />
                  <span data-testid={`text-time-${article.id}`}>{article.timeAgo}</span>
                  {article.url && (
                    <ExternalLink className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
