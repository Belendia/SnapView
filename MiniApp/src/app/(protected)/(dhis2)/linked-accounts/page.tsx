"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteDHIS2Account, getLinkedDHIS2Accounts } from "@/actions/dhis2";
import { useTelegramUser } from "@/lib/telegram";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { MoreVertical, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LinkedAccountsPage() {
  const router = useRouter();
  const tgUser = useTelegramUser();
  const [accounts, setAccounts] = useState<
    { id: string; username: string; name: string; systemName: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!tgUser) return;
      const result = await getLinkedDHIS2Accounts(tgUser.id.toString());
      setAccounts(result);
      setLoading(false);
    };

    load();
  }, [tgUser]);

  const searchParams = useSearchParams();
  const allowedSuccessMessages = new Set([
    "Account connected!",
    "Account updated!",
  ]);

  useEffect(() => {
    const successMessage = searchParams.get("success");

    if (successMessage && allowedSuccessMessages.has(successMessage)) {
      toast.success(successMessage);
      router.replace("/linked-accounts"); // clean URL
    }
  }, [searchParams, router]);

  return (
    <div className="flex justify-center p-4 relative">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Linked DHIS2 Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </div>
                ))}
              </div>
            ) : accounts.length === 0 ? (
              <p className="text-muted-foreground">No linked accounts yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Username</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>System</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accounts.map((acc) => (
                      <TableRow key={acc.id}>
                        <TableCell>{acc.username}</TableCell>
                        <TableCell>{acc.name}</TableCell>
                        <TableCell>{acc.systemName}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <MoreVertical className="h-5 w-5 cursor-pointer" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  router.push(`/connect-dhis2?id=${acc.id}`)
                                }
                              >
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Dialog>
                                  <DialogTrigger className="w-full text-left">
                                    Delete
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Are you sure?</DialogTitle>
                                      <p>
                                        This action will permanently delete the
                                        account.
                                      </p>
                                    </DialogHeader>
                                    <DialogFooter className="flex justify-end gap-2">
                                      <Button
                                        variant="outline"
                                        onClick={() => document.body.click()}
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        variant="destructive"
                                        onClick={async () => {
                                          if (!tgUser) {
                                            toast.error(
                                              "Telegram user not found"
                                            );
                                            return;
                                          }
                                          const res = await deleteDHIS2Account({
                                            id: acc.id,
                                            telegramId: tgUser.id.toString(),
                                          });
                                          if (res.success) {
                                            toast.success(res.success);
                                            setAccounts((prev) =>
                                              prev.filter(
                                                (item) => item.id !== acc.id
                                              )
                                            );
                                          } else {
                                            toast.error(
                                              res.error ?? "Failed to delete"
                                            );
                                          }
                                        }}
                                      >
                                        Delete
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Floating Add Button */}
      <Link href="/connect-dhis2">
        <button
          aria-label="Add Account"
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition"
        >
          <Plus className="h-6 w-" />
        </button>
      </Link>
    </div>
  );
}
