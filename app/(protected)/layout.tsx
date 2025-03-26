import { Navbar } from "./_components/navbar";

import "swiper/css";
import "swiper/css/effect-creative";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center pt-16 pb-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-gray-50">
      <Navbar />
      <main className="w-full flex-1">{children}</main>
    </div>
  );
};

export default ProtectedLayout;
