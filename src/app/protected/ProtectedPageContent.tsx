"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchApiKeys } from "@/api/apiKeys";
import { Toast } from "@/components/ui/Toast";

export default function ProtectedPageContent() {
  const searchParams = useSearchParams();
  const apiKey = searchParams.get("apiKey") || "";
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    async function validateKey() {
      if (!apiKey) {
        setToast({ message: "No API key provided", type: "error" });
        setValidated(true);
        return;
      }
      const { data } = await fetchApiKeys();
      const isValid = data?.some(key => key.value === apiKey);
      if (isValid) {
        setToast({ message: "A valid API key, /protected can be accessed", type: "success" });
      } else {
        setToast({ message: "Invalid API key", type: "error" });
      }
      setValidated(true);
    }
    validateKey();
  }, [apiKey]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8">
      <h1 className="text-2xl font-bold mb-6">Protected Page</h1>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {validated && toast?.type === "success" && (
        <div className="mt-6 text-green-700 font-semibold">Welcome! You have access.</div>
      )}
      {validated && toast?.type === "error" && (
        <div className="mt-6 text-red-700 font-semibold">Access denied.</div>
      )}
    </div>
  );
} 