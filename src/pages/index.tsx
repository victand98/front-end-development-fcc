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
      <div>
        <Link href="/random-quote-machine">Random Quote Machine</Link>
      </div>
    </>
  );
};

Home.getLayout = (page: React.ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export default Home;
