import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  titleHindi?: string;
  icon: LucideIcon;
  children: ReactNode;
  iconColor?: string;
}

export const DashboardCard = ({
  title,
  titleHindi,
  icon: Icon,
  children,
  iconColor = "text-primary",
}: DashboardCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className={`${iconColor} p-3 bg-muted rounded-xl`}>
          <Icon className="h-8 w-8" />
        </div>
        <div>
          <h3 className="text-xl font-bold">{titleHindi ?? title}</h3>
          <p className="text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
      {children}
    </Card>
  );
};
