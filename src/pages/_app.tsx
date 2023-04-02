import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { QuestionsProvider } from "~/context/useQuestions";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <QuestionsProvider>
        <Component {...pageProps} />
      </QuestionsProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
