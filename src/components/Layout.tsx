"use client";

import type { PropsWithChildren } from "react";
import Nav, { NavLinks } from "./Nav";
import Footer from "./Footer";
import { QuestionsProvider } from "@/context/useQuestions";

const Layout: React.FC<PropsWithChildren & { className?: string }> = ({
  children,
  className,
  ...props
}) => {
  return (
    <QuestionsProvider>
      <div className="drawer bg-base-300">
        <input
          aria-label="Open Drawer"
          id="nav-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content overflow-x-hidden">
          <Nav />
          <main
            className={`shadow-x relative mx-auto flex min-h-[calc(100vh-96px)] w-full flex-col items-center bg-base-300 px-6 py-12 md:px-24 ${
              className || ""
            }`}
            {...props}
          >
            {children}
          </main>
          <Footer />
        </div>
        <div className="drawer-side">
          <label htmlFor="nav-drawer" className="drawer-overlay"></label>
          <NavLinks />
        </div>
      </div>
    </QuestionsProvider>
  );
};

export default Layout;
