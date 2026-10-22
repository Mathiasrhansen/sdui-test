import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { api } from "@/lib/api";

// Liste med startlister (søgning + pagination)
export function useStartLists({ page, q }) {
  return useQuery({
    queryKey: ["start-lists", page, q],
    queryFn: () =>
      api(`/start-lists?page=${page}&q=${encodeURIComponent(q)}`),
    placeholderData: keepPreviousData,
  });
}

// Én startliste inkl. flyregistrering, linjer og totaler
export function useStartList(id) {
  return useQuery({
    queryKey: ["start-list", id],
    queryFn: () => api(`/start-list?id=${encodeURIComponent(id)}`),
    enabled: !!id,
  });
}

// 38 -> "00:38"
export function formatMinutes(min) {
  const h = String(Math.floor(min / 60)).padStart(2, "0");
  const m = String(min % 60).padStart(2, "0");
  return `${h}:${m}`;
}

// "2026-09-20" -> "20/09-2026"
export function formatDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}-${y}`;
}

// 350 -> "350"
export function formatPrice(n) {
  return new Intl.NumberFormat("da-DK").format(n);
}
