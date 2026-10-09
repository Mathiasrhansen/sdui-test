import { CardList, ItemRow, ItemCard } from "@/components/Card";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogMedia,
} from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";

export default function Kalender() {
  return (
    <div>
      <Header></Header>
      <div className="pl-4 pr-4 mt-4">
        <h2 className="text-xl font-heading mt-4 mb-2">Vagtkalender</h2>
        <div className="flex flex-col gap-2">
          <ItemCard title="11/10-2026" right="Spil formiddag" />
          <ItemCard title="12/10-2026" right="Spil eftermiddag" />
        </div>
        <h2 className="text-xl font-heading mt-4 mb-2">
          Kommende arrangementer
        </h2>
        <div className="flex flex-col gap-2">
          <ItemCard
            title="Fællesspisning"
            subtitle="05/09-2026"
            pill={{
              label: "Tilmeld",
              color: "blue",
              className: "bg-blue-200 uppercase",
            }}
          />
          <ItemCard
            title="Fællesspisning"
            subtitle="07/10-2026"
            pill={{
              label: "Tilmeld",
              color: "blue",
              className: "bg-blue-200 uppercase",
            }}
          />
        </div>
        <h2 className="text-xl font-heading mt-4 mb-2">Ferie</h2>
        <div className="flex flex-col gap-2">
          <ItemCard
            title="10.-14. okt 2026"
            titleClassName="font-heading"
            subtitle="Rejse til Italien"
            pill={{ label: "5 dage", color: "blue" }}
            actions={
              <div className="flex gap-2">
                <button type="button" aria-label="Redigér">
                  <Pencil className="h-5 w-5" />
                </button>
                <button type="button" aria-label="Slet">
                  <Trash2 className="h-5 w-5 text-error-800" />
                </button>
              </div>
            }
          />
          <ItemCard
            title="26. dec - 2. jan"
            titleClassName="font-heading"
            subtitle="Juleferie"
            pill={{ label: "8 dage", color: "blue" }}
            actions={
              <div className="flex gap-2">
                <button type="button" aria-label="Redigér">
                  <Pencil className="h-5 w-5" />
                </button>

                <AlertDialog>
                  <AlertDialogTrigger render={<Button variant="outline" />}>
                    <Trash2 className="h-5 w-5 text-error-800" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-heading">
                        Slet ferie?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        26. dec - 2. jan fjernes fra kalenderen. Dette kan ikke
                        fortrydes.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuller</AlertDialogCancel>
                      <AlertDialogAction variant="destructive">
                        Slet
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            }
          />

          <Button
            asChild
            variant="default"
            color="blue"
            className="w-full justify-center"
          >
            <Link to="/kalender/ferie">
              <Plus className="h-5 w-5" />
              Tilføj ferie
            </Link>
          </Button>
        </div>
      </div>
      <Navbar></Navbar>
    </div>
  );
}
