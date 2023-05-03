import { DefaultLayout, Title } from "@/components";
import { menuRoutes } from "@/lib";
import { NextPageWithLayout } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Front End Projects</title>
      </Head>

      <div className="mx-auto my-auto p-4">
        <Title>Front End Projects</Title>
        <ul className="p-3 space-y-1 text-sm font-medium text-gray-700 dark:text-gray-200 my-auto">
          {menuRoutes.map(({ icon: Icon, ...route }) => (
            <li key={route.path}>
              <Link
                href={route.path}
                className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white rounded-md border border-gray-100"
              >
                <Icon className="mr-2" />
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

Home.getLayout = (page: React.ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export default Home;
