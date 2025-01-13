'use server';

export const getTitleFromURL = async ({ url }: { url: string }) => {
  try {
    const html = await fetch(url).then((r) => r.text());
    const match = html.match(/<title>(.*?)<\/title>/);

    return match?.[1] || url;
  } catch (error) {
    console.error(error);

    return url;
  }
};
