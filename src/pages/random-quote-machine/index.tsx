import { Button, DefaultLayout } from "@/components";
import { useQuote } from "@/hooks";
import { QuoteService, getSWRKey } from "@/lib";
import { InferGetServerSidePropsType, NextPageWithLayout } from "next";
import Head from "next/head";
import Image from "next/image";

const RandomQuoteMachine: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const { data, mutate, loading, isValidating } = useQuote();
  const quote = data?.[0]!;

  const updateQuote = () => mutate();

  return (
    <>
      <Head>
        <title>Random Quote Machine</title>
      </Head>

      <div
        className="flex flex-col items-center justify-center max-w-sm space-y-8"
        id="quote-box"
      >
        <div className="text-center space-y-3">
          <p id="text">{quote?.quote}</p>
          <p id="author" className="font-bold">
            {quote?.author}
          </p>
        </div>

        <div className="flex justify-between items-center w-full">
          <a
            id="tweet-quote"
            href={`https://www.twitter.com/intent/tweet?text=${encodeURIComponent(
              `"${quote.quote}" - ${quote.author}`
            )}&hashtags=${encodeURIComponent(quote.category)}`}
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src="/assets/twitter_blue.svg"
              alt="Twitter"
              width={25}
              height={25}
              style={{ width: 25, height: 25 }}
            />
          </a>

          <Button
            id="new-quote"
            onClick={updateQuote}
            disabled={loading || isValidating}
          >
            New Quote
          </Button>
        </div>
      </div>
    </>
  );
};

RandomQuoteMachine.getLayout = (page: React.ReactElement) => (
  <DefaultLayout>{page}</DefaultLayout>
);

export const getServerSideProps = async () => {
  const quote = await QuoteService.getQuote();

  return {
    props: {
      fallback: {
        [getSWRKey(quote.config)]: { data: quote.data },
      },
    },
  };
};

export default RandomQuoteMachine;
