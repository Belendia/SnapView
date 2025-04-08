"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  getLinkedDHIS2Accounts,
  deleteDHIS2Account,
} from "@/actions/link-dhis2-accounts";
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
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
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

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null
  );

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
      router.replace("/settings/linked-accounts"); // clean URL
    }
  }, [searchParams, router]);

  const handleDelete = async () => {
    if (!tgUser || !selectedAccountId) return;

    const result = await deleteDHIS2Account({
      id: selectedAccountId,
      telegramId: tgUser.id.toString(),
    });

    if (result.success) {
      toast.success(result.success);
      setAccounts((prev) => prev.filter((a) => a.id !== selectedAccountId));
    } else {
      toast.error(result.error || "Failed to delete account");
    }

    setDeleteDialogOpen(false);
    setSelectedAccountId(null);
  };

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
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-5 w-5" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  router.push(
                                    `/settings/connect-dhis2?id=${acc.id}`
                                  )
                                }
                              >
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setSelectedAccountId(acc.id);
                                  setDeleteDialogOpen(true);
                                }}
                                className="text-destructive"
                              >
                                Delete
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
      <Link href="/settings/connect-dhis2">
        <button
          aria-label="Add Account"
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition"
        >
          <Plus className="h-6 w-6" />
        </button>
      </Link>

      {/* Alert Dialog for Deletion */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="sm:max-w-[90%]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the selected DHIS2 account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white hover:bg-destructive/90"
              onClick={handleDelete}
            >
              Yes, delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
