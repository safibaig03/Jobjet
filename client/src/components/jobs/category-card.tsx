import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@shared/schema";
import { Link } from "wouter";
import { 
  Code2, Palette, TrendingUp, Users, BarChart, Headphones, DollarSign, Heart 
} from "lucide-react";

interface CategoryCardProps {
  category: Category;
  jobCount?: number;
}

export function CategoryCard({ category, jobCount = 0 }: CategoryCardProps) {
  // Map category icons to Lucide icons
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      "CodeIcon": <Code2 className="h-6 w-6 text-primary" />,
      "PaletteIcon": <Palette className="h-6 w-6 text-primary" />,
      "TrendingUpIcon": <TrendingUp className="h-6 w-6 text-primary" />,
      "UsersIcon": <Users className="h-6 w-6 text-primary" />,
      "BarChartIcon": <BarChart className="h-6 w-6 text-primary" />,
      "HeadphonesIcon": <Headphones className="h-6 w-6 text-primary" />,
      "DollarSignIcon": <DollarSign className="h-6 w-6 text-primary" />,
      "HeartIcon": <Heart className="h-6 w-6 text-primary" />,
    };
    
    return iconMap[iconName] || <Code2 className="h-6 w-6 text-primary" />;
  };

  return (
    <Link href={`/jobs?category=${encodeURIComponent(category.name)}`}>
      <Card className="bg-background overflow-hidden shadow hover:shadow-md transition-shadow duration-300 text-center cursor-pointer">
        <CardContent className="p-6">
          <div className="h-12 w-12 bg-primary/10 rounded-md flex items-center justify-center mx-auto mb-4">
            {getIconComponent(category.icon)}
          </div>
          <h3 className="text-lg font-medium text-foreground">{category.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{jobCount} jobs</p>
        </CardContent>
      </Card>
    </Link>
  );
}

interface CategoryListProps {
  categories: Category[];
  jobCounts?: Record<number, number>;
}

export function CategoryList({ categories, jobCounts = {} }: CategoryListProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {categories.map((category) => (
        <CategoryCard 
          key={category.id} 
          category={category} 
          jobCount={jobCounts[category.id] || Math.floor(Math.random() * 1000) + 100} 
        />
      ))}
    </div>
  );
}
