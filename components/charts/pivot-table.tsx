import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
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
    <Card className="@container/card w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>User List</CardTitle>
        <CardDescription>Overview of all users and their roles</CardDescription>
      </CardHeader>
      <CardContent className="overflow-auto flex-1">
        <Table className="min-w-[600px]">
          <TableCaption className="text-muted-foreground">
            A list of recent users.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, i) => (
              <TableRow key={user.id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-right">{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
