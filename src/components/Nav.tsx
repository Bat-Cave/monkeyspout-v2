import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import logo from "~/assets/logo.png";

const Nav: React.FC = () => {
  const { isSignedIn, user } = useUser();
  const role = user?.organizationMemberships[0]?.role;
  const isAdmin = role === "admin";
  return (
    <nav className="fixed top-0 z-50 flex h-20 w-full justify-center bg-gradient-to-tr from-primary-focus to-primary px-2 md:px-12">
      <div className="flex w-full items-center justify-between md:max-w-7xl">
        <Link href="/" className="flex items-center font-bold">
          <Image
            src={logo.src}
            alt="monkey emoji"
            className="w-12"
            width={48}
            height={48}
          />
          <p className="ml-2 hidden text-4xl md:block">Monkey Spout</p>
        </Link>
        <div className="flex items-center gap-3">
          {!isSignedIn && (
            <SignInButton>
              <div className="btn">Sign In</div>
            </SignInButton>
          )}
          {!!isSignedIn && (
            <>
              <p className="hidden md:block">Welcome back, {user.firstName}</p>
              {isAdmin && (
                <Link className="btn" href="/admin">
                  Admin
                </Link>
              )}
              <SignOutButton>
                <div className="btn">Sign Out</div>
              </SignOutButton>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
