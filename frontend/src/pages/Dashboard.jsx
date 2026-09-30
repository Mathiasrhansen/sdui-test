import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLogout, useMe } from "@/auth";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Dashboard() {
  const { data: user } = useMe();
  const logout = useLogout();
  const qc = useQueryClient();
  const [body, setBody] = useState("");

  const notes = useQuery({ queryKey: ["notes"], queryFn: () => api("/notes") });
  const addNote = useMutation({
    mutationFn: (text) => api("/notes", { method: "POST", body: { body: text } }),
    onSuccess: () => {
      setBody("");
      qc.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <div className="mx-auto grid max-w-2xl gap-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Hej, {user.name}</h1>
        <Button variant="outline" onClick={() => logout.mutate()}>Log ud</Button>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Mine noter</CardTitle>
          <CardDescription>Data hentes fra PHP/MariaDB og er kun dine.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); addNote.mutate(body); }}>
            <Input value={body} onChange={(e) => setBody(e.target.value)} placeholder="Skriv en note…" maxLength={500} required />
            <Button type="submit" disabled={addNote.isPending}>Tilføj</Button>
          </form>
          {addNote.error && <p role="alert" className="text-sm text-destructive">{addNote.error.message}</p>}
          {notes.isPending ? (
            <p className="text-sm text-muted-foreground">Henter…</p>
          ) : (
            <ul className="grid gap-2">
              {notes.data.map((n) => (
                <li key={n.id} className="rounded-md border px-3 py-2 text-sm">{n.body}</li>
              ))}
              {notes.data.length === 0 && <li className="text-sm text-muted-foreground">Ingen noter endnu.</li>}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
