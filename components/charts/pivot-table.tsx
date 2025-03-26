"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function SnapViewPivotTable() {
  const users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor" },
    { id: 3, name: "Carol White", email: "carol@example.com", role: "Viewer" },
    {
      id: 4,
      name: "David Black",
      email: "david@example.com",
      role: "Contributor",
    },
    { id: 5, name: "Eva Brown", email: "eva@example.com", role: "Moderator" },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 py-6 bg-background text-foreground overflow-auto">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold">User List</h2>
        <p className="text-sm text-muted-foreground">
          Overview of all users and their roles
        </p>
      </div>

      {/* Table Section */}
      <div className="flex-1 overflow-auto">
        <Table className="min-w-full border border-gray-300 rounded-md">
          <TableCaption className="text-muted-foreground text-center">
            A list of recent users.
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="px-4 py-2 text-left">#</TableHead>
              <TableHead className="px-4 py-2 text-left">Name</TableHead>
              <TableHead className="px-4 py-2 text-left">Email</TableHead>
              <TableHead className="px-4 py-2 text-left">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id} className="border-t border-gray-200">
                <TableCell className="px-4 py-2">{index + 1}</TableCell>
                <TableCell className="px-4 py-2 font-medium">
                  {user.name}
                </TableCell>
                <TableCell className="px-4 py-2">{user.email}</TableCell>
                <TableCell className="px-4 py-2">{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
