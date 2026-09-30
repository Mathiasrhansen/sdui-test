import { cn } from "@/lib/utils";

const Card = ({ className, ...p }) => (
  <div data-slot="card" className={cn("flex flex-col gap-4 rounded-xl border bg-card py-6 text-card-foreground shadow-sm", className)} {...p} />
);
const CardHeader = ({ className, ...p }) => <div className={cn("flex flex-col gap-1.5 px-6", className)} {...p} />;
const CardTitle = ({ className, ...p }) => <h2 className={cn("font-semibold leading-none", className)} {...p} />;
const CardDescription = ({ className, ...p }) => <p className={cn("text-sm text-muted-foreground", className)} {...p} />;
const CardContent = ({ className, ...p }) => <div className={cn("px-6", className)} {...p} />;

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
