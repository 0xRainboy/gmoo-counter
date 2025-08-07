import type { NextApiRequest, NextApiResponse } from "next";

let leaderboard: Record<string, number> = {};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const sorted = Object.entries(leaderboard)
    .map(([username, count]) => ({ username, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  res.status(200).json({ leaderboard: sorted });
}
