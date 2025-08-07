import type { NextApiRequest, NextApiResponse } from "next";

let leaderboard: Record<string, number> = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const username = req.query.username as string;
  if (!username) return res.status(400).json({ error: "Missing username" });

  const headers = {
    Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
  };

  const userRes = await fetch(`https://api.twitter.com/2/users/by/username/${username}`, { headers });
  const userData = await userRes.json();
  const userId = userData?.data?.id;
  if (!userId) return res.status(404).json({ error: "User not found" });

  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const since = oneWeekAgo.toISOString();

  const tweetsRes = await fetch(
    `https://api.twitter.com/2/users/${userId}/tweets?max_results=100&tweet.fields=created_at&start_time=${since}`,
    { headers }
  );
  const tweetsData = await tweetsRes.json();
  const tweets = tweetsData?.data || [];

  const count = tweets.filter((t: any) => t.text.toLowerCase().includes("gmoo")).length;
  leaderboard[username] = (leaderboard[username] || 0) + count;

  return res.status(200).json({ count });
}
