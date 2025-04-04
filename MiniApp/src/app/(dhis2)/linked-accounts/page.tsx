"use client";

import { useEffect, useState } from "react";
import { getLinkedDHIS2Accounts } from "@/actions/dhis2";
import { useTelegramUser } from "@/lib/telegram";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function LinkedAccountsPage() {
  const tgUser = useTelegramUser();
  const [users, setUsers] = useState<
    { username: string; systemName: string }[]
  >([]);

  useEffect(() => {
    const loadUsers = async () => {
      if (!tgUser) return;
      const result = await getLinkedDHIS2Accounts(tgUser.id.toString());
      setUsers(result);
    };

    loadUsers();
  }, [tgUser]);

  return (
    <div className="max-w-xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>✅ Linked DHIS2 Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            <ul className="list-disc pl-4 text-sm space-y-1">
              {users.length > 0 ? (
                users.map((user, idx) => (
                  <li key={idx}>
                    <strong>{user.username}</strong> – {user.systemName}
                  </li>
                ))
              ) : (
                <p className="text-muted-foreground">No linked accounts yet.</p>
              )}
            </ul>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
