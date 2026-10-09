import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

// statusColor i databasen -> Pill-farve
export const pillColors = {
  okay: "blue",
  attention: "yellow",
  warning: "red",
};

// Henter alle fly (inkl. seneste status og brugerens favorit-markering).
// Bruger samme cache-nøgle overalt, så siderne deler data.
export function useFly() {
  return useQuery({
    queryKey: ["fly"],
    queryFn: () => api("/fly"),
  });
}
