import { auth } from "@/auth";

const DashboardPage = async () => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <h3>Dashboard</h3>
    </div>
  );
};

export default DashboardPage;
