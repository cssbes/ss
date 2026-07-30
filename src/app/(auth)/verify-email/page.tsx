"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }

    fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((res) => {
        if (res.ok) setStatus("success");
        else setStatus("error");
      })
      .catch(() => setStatus("error"));
  }, [token]);

  return (
    <div className="space-y-6 text-center">
      {status === "loading" && (
        <div className="space-y-4">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-muted-foreground" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Verifying your email...
          </h1>
        </div>
      )}

      {status === "success" && (
        <div className="space-y-4">
          <CheckCircle className="mx-auto h-12 w-12 text-emerald-500" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Email verified!
          </h1>
          <p className="text-sm text-muted-foreground">
            Your email has been successfully verified.
          </p>
          <Button asChild>
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      )}

      {status === "error" && (
        <div className="space-y-4">
          <XCircle className="mx-auto h-12 w-12 text-destructive" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Verification failed
          </h1>
          <p className="text-sm text-muted-foreground">
            This link is invalid or has expired.
          </p>
          <Button asChild>
            <Link href="/login">Back to login</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
