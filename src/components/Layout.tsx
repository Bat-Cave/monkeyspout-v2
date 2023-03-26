import type { PropsWithChildren } from "react";
import Nav from "./Nav";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="pt-20">
      <Nav />
      <main className="mx-auto flex min-h-[calc(100vh-80px)] w-full flex-col items-center bg-base-300/80 px-3 shadow-xl md:max-w-7xl">
        {children}
      </main>
    </div>
  );
};

export default Layout;
