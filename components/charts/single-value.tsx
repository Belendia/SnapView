import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { TrendingUpIcon } from "lucide-react";

export function SnapViewSingleValueChart() {
  return (
    <Card className="@container/card flex flex-col flex-1">
      <CardContent className="relative flex-1 flex flex-col items-center justify-center gap-2">
        <CardDescription>Total Revenue</CardDescription>
        <CardTitle className="text-5xl @[400px]/card:text-6xl font-semibold tabular-nums text-center">
          $1,250.00
        </CardTitle>
        <div className="absolute right-4 top-4">
          <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
            <TrendingUpIcon className="size-3" />
            +12.5%
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-center gap-1 text-sm pb-4">
        <div className="flex gap-2 font-medium items-center">
          Trending up this month <TrendingUpIcon className="size-4" />
        </div>
        <div className="text-muted-foreground">
          Visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
