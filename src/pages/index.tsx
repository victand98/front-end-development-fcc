import { DefaultLayout } from "@/components";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Front End Libraries Projects</title>
      </Head>

      <ul>
        <li>
          <Link href="/random-quote-machine">Random Quote Machine</Link>
        </li>
        <li>
          <Link href="/markdown-previewer">Markdown Previewer</Link>
        </li>
        <li>
          <Link href="/drum-machine">Drum Machine</Link>
        </li>
        <li>
          <Link href="/javascript-calculator">JavaScript Calculator</Link>
        </li>
      </ul>
    </>
  );
};

Home.getLayout = (page: React.ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export default Home;
