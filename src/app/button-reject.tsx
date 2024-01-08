"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AcceptButton() {
  const [loading, setLoading] = useState(false);
  const accept = async () => {
    setLoading(true);
    const response = await fetch("/api/submit", {
      body: JSON.stringify({
        value: "reject",
      }),
    });
    if (response.status !== 200) {
      toast.error("Terjadi kesalaham, silahkan coba lagi");
      setLoading(false);
      return;
    }
    setLoading(false);
    toast.success("Terima kasih, kami tunggu kedatanganmu");
  };

  return (
    <div className="flex flex-row cursor-pointer" onClick={() => accept()}>
      <p className="hover:underline border border-black px-4 py-2 flex-grow text-center">
        No, I cannot come
      </p>
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
    </div>
  );
}
