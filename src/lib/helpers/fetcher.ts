export const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: { "X-Api-Key": process.env.NEXT_PUBLIC_API_KEY! },
  });
  return res.json();
};
