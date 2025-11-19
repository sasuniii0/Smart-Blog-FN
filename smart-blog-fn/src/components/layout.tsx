import { Outlet } from "react-router-dom";
import Header from "./header";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}

// outlet - meka erenna anith okkoma fixed elements. mekata thmay api dana components wala dynamic ewa set  wenne

// 768px up - desktop   (responsive)
// down - mobile
