export const fetchAndParse = async (url: string) => {
  const response = await fetch(url);

  try {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const res = await response.json();

    // Handling error inside status 200 response
    if (res.error) {
      throw new Error(res.error.message);
    }

    return { data: res || [], error: null };
  } catch (e) {
    console.log("error ", e);
  }
};
