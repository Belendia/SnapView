// import { auth } from "@/auth";

// const DashboardPage = async () => {
//   const session = await auth();
//   return (
//     <div>
//       {JSON.stringify(session)}
//       <h3>Dashboard</h3>
//     </div>
//   );
// };

// export default DashboardPage;

"use client";

import { useCurrentUser } from "@/hooks/use-current-user";

const DashboardPage = () => {
  const user = useCurrentUser();
  console.log(user);

  return (
    <div>
      {JSON.stringify(user)}
      <h3>Dashboard</h3>
    </div>
  );
};

export default DashboardPage;
