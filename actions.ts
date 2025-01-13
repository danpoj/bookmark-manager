'use server';

// export const getTitleFromURL = async ({ url }: { url: string }) => {
//   try {
//     const html = await fetch(url).then((r) => r.text());
//     const match = html.match(/<title>(.*?)<\/title>/);

//     return match?.[1] || url;
//   } catch (error) {
//     console.error(error);

//     return url;
//   }
// };

export async function getTitleFromURL({ url }: { url: string }) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2000); // timeout if it takes longer than 2 seconds
  const title = await fetch(url, { signal: controller.signal })
    .then((res) => {
      clearTimeout(timeoutId);
      return res.text();
    })
    .then((body: string) => {
      const match = body.match(/<title>([^<]*)<\/title>/); // regular expression to parse contents of the <title> tag
      if (!match || typeof match[1] !== 'string') return 'No title found'; // if no title found, return "No title found"
      return match[1];
    })
    .then((body: string) => {
      const match = body.match(/<title([^<]*)>([^<]*)<\/title>/); // regular expression to parse contents of the <title> tag
      if (!match || typeof match[match.length - 1] !== 'string')
        return 'No title found'; // if no title found, return "No title found"
      return match[match.length - 1];
    })
    .catch((err) => {
      console.log(err);
      return 'No title found'; // if there's an error, return "No title found"
    });
  return title;
}
