import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

const Nav: React.FC = () => {
  const { isSignedIn, user } = useUser();
  return (
    <nav className="fixed top-0 flex h-20 w-full justify-center bg-gradient-to-tr from-primary-focus to-primary px-12">
      <div className="flex w-full items-center justify-between md:max-w-7xl">
        <p>MonkeySpout</p>
        <div className="flex items-center gap-3">
          {!isSignedIn && (
            <SignInButton>
              <div className="btn">Sign In</div>
            </SignInButton>
          )}
          {!!isSignedIn && (
            <>
              <p>Welcome back, {user.firstName}</p>
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
