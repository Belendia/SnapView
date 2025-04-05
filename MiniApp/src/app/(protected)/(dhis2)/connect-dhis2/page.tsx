"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getDHIS2AccountById } from "@/actions/dhis2";
import { ConnectDHIS2Account } from "../_components/connect-dhis2-account";
import { Loader } from "@/components/loader"; // optional loader component

const DHIS2Page = () => {
  const router = useRouter();
  const params = useSearchParams();
  const accountId = params.get("id");

  const [account, setAccount] = useState<{
    id: string;
    systemId: string;
    username: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAccount = async () => {
      if (accountId) {
        const data = await getDHIS2AccountById(accountId);
        if (data) {
          setAccount(data);
        } else {
          // Account not found – redirect
          router.push("/linked-accounts");
        }
      }
      setLoading(false);
    };

    loadAccount();
  }, [accountId, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <ConnectDHIS2Account account={account ?? undefined} />
      </div>
    </div>
  );
};

export default DHIS2Page;
