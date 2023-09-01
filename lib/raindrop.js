export async function getAllBookmarks() {
  const res = await fetch(
    "https://api.raindrop.io/rest/v1/raindrops/0?perpage=100",
    {
      headers: {
        Authorization: `Bearer ${process.env.RAINDROP_CLIENT_SECRET}`,
      },
    }
  );
  const data = await res.json();
  return data.items;
}

export async function getLastBookmarks() {
  const res = await fetch(
    "https://api.raindrop.io/rest/v1/raindrops/0?perpage=2",
    {
      headers: {
        Authorization: `Bearer ${process.env.RAINDROP_CLIENT_SECRET}`,
      },
    }
  );
  const data = await res.json();
  return data.items;
}
