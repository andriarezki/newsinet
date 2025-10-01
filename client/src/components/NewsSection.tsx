import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  date: string;
}

interface NewsSectionProps {
  newsItems: NewsItem[];
}

export default function NewsSection({ newsItems }: NewsSectionProps) {
  return (
    <section id="news" className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">News Update</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((news) => (
            <Card key={news.id} className="overflow-hidden hover-elevate transition-all" data-testid={`card-news-${news.id}`}>
              {news.imageUrl && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={news.imageUrl}
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader className="space-y-2">
                <Badge variant="secondary" className="w-fit flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {news.date}
                </Badge>
                <h3 className="text-xl font-semibold text-foreground">{news.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3 mb-4">{news.content}</p>
                <Button variant="ghost" className="p-0 h-auto hover:underline" data-testid={`button-read-${news.id}`}>
                  Read More →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
