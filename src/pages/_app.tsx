import { ChakraProvider, extendTheme, LightMode, ThemeConfig } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { type AppProps } from "next/app";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import AuthContextProvider from "@/context";
import Head from "next/head";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });
const supabaseUrl = "https://nsaylbnbmzsbmdrdnoor.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() =>
    createPagesBrowserClient({ supabaseUrl, supabaseKey })
  );
  const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false
  };

  const theme = extendTheme({ config });
  return (
    <>
      <Head>

        <link rel="manifest" href="/manifest.json" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2754274313849445"
          crossOrigin="anonymous"
        ></script>
      </Head>
    
      <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
      >
        <ChakraProvider theme={theme}>
          <AuthContextProvider>
            <div className={inter.className}>
              <Navbar />
              <Component {...pageProps} />
            </div>
          </AuthContextProvider>
        </ChakraProvider>
      </SessionContextProvider>
    </>
  );
}
