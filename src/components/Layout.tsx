import type { PropsWithChildren } from "react";
import Nav from "./Nav";

const Layout: React.FC<PropsWithChildren & { className?: string }> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className="pt-20">
      <Nav />
      <main
        className={`shadow-x mx-auto flex min-h-[calc(100vh-80px)] w-full flex-col items-center bg-base-300 px-6 md:max-w-7xl md:px-24 ${
          className || ""
        }`}
        {...props}
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
