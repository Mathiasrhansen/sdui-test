import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLogout, useMe } from "@/auth";
import { api } from "@/lib/api";
import { Link } from "react-router-dom";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "../components/Header.jsx";
import Navbar from "../components/Navbar.jsx";

export default function Profile() {
  const { data: user } = useMe();
  const logout = useLogout();
  const qc = useQueryClient();
  const [body, setBody] = useState("");

  return (
    <div className="bg-grey-50">
      <Header></Header>
      <Link to="/dashboard" className="text-sm text-muted-foreground underline">
        Gå tilbage
      </Link>
      <h1 className="text-xl font-semibold">Hej, {user.name}. Det virker!</h1>
      <div className="flex flex-col gap-4 w-full max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Dine profiloplysninger</CardTitle>
            <CardDescription>
              Her kan du se og redigere dine profiloplysninger.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Din email:</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Din rolle:</p>
              <p>{user.role}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Dit køn:</p>
              <p>{user.gender}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Navbar></Navbar>
    </div>
  );
}
