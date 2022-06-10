import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import Link from "next/link";
import { StateContext } from "../context/context";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const state = React.useContext(StateContext);

  useEffect(() => {
    if (state.user) {
      router.push("/dashboard");
    }
  }, [state.user]);

  return (
    <div className="">
      <Head>
        <title>Sun.Day | כלי לניהול העסק</title>
        <link rel="icon" href="/favicon-sunday.svg" />
      </Head>
      <Header />

      <main
        className="min-h-[calc(100vh-158px)] flex flex-col justify-center bg-graybg text-center md:text-right font-sans"
        dir="rtl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 max-w-screen-xl mx-auto md:pr-16">
          <div className="flex flex-col gap-4 items-center md:items-start justify-center">
            <Image src="/logo.svg" alt="logo" width="196" height="107" />
            <h1 className="text-3xl md:text-5xl -mt-8">
              כל מה שהעסק שלך צריך
              <div className="font-bold">בכלי ניהול אחד</div>
            </h1>
            <p className="text-md md:text-xl font-semibold text-gray-400">
              שפר ועקוב אחר העבודה שלך מול הלקוחות
              <br />
              ואנשי הצוות בכל פרויקט.
            </p>

            <div className="flex gap-2">
              <Link href="/register">
                <button className="px-5 py-2 text-sm font-bold text-black bg-primary rounded-full">
                  התחל עכשיו
                </button>
              </Link>
              <Link href="/login">
                <button className="px-5 py-2 text-sm font-bold text-black border-primary border-2 rounded-full">
                  כניסה ללקוחות
                </button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <Image
              src="/assets/avatar-bg.svg"
              alt="sunday-application"
              width="330%"
              height="330%"
            />
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/logo.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
