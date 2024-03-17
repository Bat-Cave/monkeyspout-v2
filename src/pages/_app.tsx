import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { QuestionsProvider } from "~/context/useQuestions";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import * as ga from "../lib/ga";

const MyApp: AppType = ({ Component, pageProps }) => {
  // const router = useRouter();

  // useEffect(() => {
  //   const handleRouteChange = (url: string) => {
  //     ga.pageview(url);
  //   };
  //   router.events.on("routeChangeComplete", handleRouteChange);

  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router.events]);
  return (
    <ClerkProvider>
      <QuestionsProvider>
        <Component {...pageProps} />
        <Analytics />
        <Toaster
          toastOptions={{
            position: "bottom-right",
            success: {
              duration: 5000,
              className:
                "w-full max-w-lg border-2 border-success font-bold text-2xl",
              style: {
                background: "#ffffff",
                color: "#36D399",
              },
              iconTheme: {
                primary: "#36D399",
                secondary: "#003320",
              },
            },
            error: {
              duration: 5000,
              className:
                "w-full max-w-lg border-2 border-error font-bold text-2xl",
              style: {
                background: "#ffffff",
                color: "#F87272",
              },
              iconTheme: {
                primary: "#F87272",
                secondary: "#470000",
              },
            },
          }}
        />
      </QuestionsProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
