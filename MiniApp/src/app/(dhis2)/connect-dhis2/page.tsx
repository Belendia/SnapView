"use client";

import { ConnectDHIS2Account } from "../_components/connect-dhis2-account";

const DHIS2Page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <ConnectDHIS2Account />
      </div>
    </div>
  );
};

export default DHIS2Page;
