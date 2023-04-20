import { useQuote } from "@/lib";
import Image from "next/image";
import { SWRConfig } from "swr";

export default function Home() {
  const { quote } = useQuote();
  console.log("quote", quote);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SWRConfig
        value={{
          revalidateIfStale: false,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          refreshWhenHidden: false,
          refreshWhenOffline: false,
          revalidateOnMount: false,
        }}
      >
        <div
          className="flex flex-col items-center justify-center"
          id="quote-box"
        >
          <div>
            <p id="text">{quote?.quote}</p>
            <p id="author">{quote?.author}</p>
          </div>

          <div>
            <a
              id="tweet-quote"
              href="https://www.twitter.com/intent/tweet"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/assets/twitter_blue.svg"
                alt="Twitter"
                width={50}
                height={50}
              />
            </a>

            <button id="new-quote">New Quote</button>
          </div>
        </div>
      </SWRConfig>
    </main>
  );
}
