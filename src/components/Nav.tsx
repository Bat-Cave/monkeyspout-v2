import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Xmark } from "iconoir-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

const Nav: React.FC = () => {
  const { isSignedIn, user } = useUser();
  const role = user?.organizationMemberships[0]?.role;
  const isAdmin = role === "admin";
  return (
    <>
      <nav className="sticky top-0 left-[15px] z-50 flex h-24 w-full max-w-[calc(100%-30px)] justify-center pt-4 sm:left-[25px] sm:max-w-[calc(100%-50px)]">
        <div className="flex w-full rounded-md bg-gradient-to-tr from-primary to-secondary p-[2px] md:max-w-7xl">
          <div className="flex w-full items-center justify-between rounded-md bg-base-300 px-2 md:max-w-7xl md:px-6">
            <Link href="/" className="flex items-center font-bold">
              <Image
                src={logo.src}
                alt="monkey emoji"
                className="w-12"
                width={48}
                height={48}
              />
              <p className="ml-2 block text-lg sm:text-4xl">Monkey Spout</p>
            </Link>
            <div className="hidden items-center gap-3 lg:flex">
              {!isSignedIn && (
                <>
                  <Link href="/widget/create" className="btn-primary btn">
                    Create Widget
                  </Link>
                  <SignInButton>
                    <div className="btn">Sign In</div>
                  </SignInButton>
                </>
              )}
              {!!isSignedIn && (
                <>
                  <p className="hidden md:block">
                    Welcome back, {user.firstName}
                  </p>
                  {isAdmin && (
                    <Link className="btn" href="/admin">
                      Admin
                    </Link>
                  )}
                  <Link href="/widget/create" className="btn-primary btn">
                    Create Widget
                  </Link>
                  <SignOutButton>
                    <div className="btn">Sign Out</div>
                  </SignOutButton>
                </>
              )}
            </div>
            <div className="flex-none lg:hidden">
              <label htmlFor="nav-drawer" className="btn-ghost btn-square btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export const NavLinks = () => {
  const { isSignedIn, user } = useUser();
  const role = user?.organizationMemberships[0]?.role;
  const isAdmin = role === "admin";
  return (
    <div className="menu flex w-full flex-col gap-3 bg-base-100 p-4 pt-16 sm:w-[75%]">
      <label
        htmlFor="nav-drawer"
        className="btn absolute right-3 top-3 cursor-pointer px-1"
      >
        <Xmark className=" h-10 w-10" />
      </label>
      <Link href="/" className="flex items-center font-bold">
        <Image
          src={logo.src}
          alt="monkey emoji"
          className="w-12"
          width={48}
          height={48}
        />
        <p className="ml-2 text-4xl">Monkey Spout</p>
      </Link>
      {!isSignedIn && (
        <>
          <Link href="/widget/create" className="btn-primary btn">
            Create Widget
          </Link>
          <SignInButton>
            <div className="btn">Sign In</div>
          </SignInButton>
        </>
      )}
      {!!isSignedIn && (
        <>
          <p className="block">Welcome back, {user.firstName}</p>
          {isAdmin && (
            <Link className="btn" href="/admin">
              Admin
            </Link>
          )}
          <Link href="/widget/create" className="btn-primary btn">
            Create Widget
          </Link>
          <SignOutButton>
            <div className="btn">Sign Out</div>
          </SignOutButton>
        </>
      )}
    </div>
  );
};

export default Nav;
