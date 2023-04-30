import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { Cancel } from "iconoir-react";
import Image from "next/image";
import Link from "next/link";
import logo from "~/assets/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="footer footer-center bg-primary py-24 px-3 text-primary-content">
      <div>
        <Link
          href="/"
          className="flex flex-col items-center font-bold sm:flex-row"
        >
          <Image
            src={logo.src}
            alt="monkey emoji"
            className="w-12"
            width={48}
            height={48}
          />
          <p className="ml-2 block text-lg sm:text-4xl">Monkey Spout</p>
        </Link>
        <p>Copyright © 2023 - All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
