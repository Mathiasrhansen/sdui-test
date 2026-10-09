import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { ItemCard } from "@/components/Card";
import { api } from "@/lib/api";
import { useFly, pillColors } from "@/lib/fly";

export default function Klub() {
  const qc = useQueryClient();

  const { data: fly, isPending, error } = useFly();

  // Opdaterer stjernen med det samme og ruller tilbage, hvis serveren afviser
  const toggleFavorite = useMutation({
    mutationFn: ({ id, favorite }) =>
      api("/fly/favorite", { method: "POST", body: { fly_id: id, favorite } }),
    onMutate: async ({ id, favorite }) => {
      await qc.cancelQueries({ queryKey: ["fly"] });
      const previous = qc.getQueryData(["fly"]);
      qc.setQueryData(["fly"], (old) =>
        old?.map((f) => (f.id === id ? { ...f, favorite } : f)),
      );
      return { previous };
    },
    onError: (_err, _vars, ctx) => qc.setQueryData(["fly"], ctx?.previous),
    onSettled: () => qc.invalidateQueries({ queryKey: ["fly"] }),
  });

  const favorites = fly?.filter((f) => f.favorite) ?? [];
  const others = fly?.filter((f) => !f.favorite) ?? [];

  const renderFly = (f) => (
    <ItemCard
      key={f.id}
      title={`${f.callsign} · ${f.flymodel}`}
      pill={
        f.status
          ? { label: f.status, color: pillColors[f.statusColor] ?? "gray" }
          : undefined
      }
      favorite={f.favorite}
      onToggleFavorite={() =>
        toggleFavorite.mutate({ id: f.id, favorite: !f.favorite })
      }
    />
  );

  return (
    <div className="">
      <Header></Header>
      <div className="pl-4 pr-4 mt-4">
        {isPending && (
          <p className="text-sm text-muted-foreground">Indlæser…</p>
        )}
        {error && <p className="text-sm text-error-800">{error.message}</p>}
        {fly?.length === 0 && (
          <p className="text-sm text-muted-foreground">Ingen fly endnu</p>
        )}

        {favorites.length > 0 && (
          <section className="mb-4">
            <h2 className="font-heading text-lg mb-2.5">Favoritter</h2>
            <div className="flex flex-col gap-2">
              {favorites.map(renderFly)}
            </div>
          </section>
        )}

        {others.length > 0 && (
          <section>
            <h2 className="font-heading text-lg mb-2.5">Klub fly / materiel</h2>
            <div className="flex flex-col gap-2">{others.map(renderFly)}</div>
          </section>
        )}
      </div>
      <Navbar></Navbar>
    </div>
  );
}
