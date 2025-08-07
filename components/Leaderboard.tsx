import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [data, setData] = useState<{ username: string; count: number }[]>([]);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((res) => setData(res.leaderboard));
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Weekly Top 10 🏆</h2>
      <ul className="text-sm">
        {data.map((user, i) => (
          <li key={i} className="mb-1">
            #{i + 1} <strong>@{user.username}</strong>: {user.count}
          </li>
        ))}
      </ul>
    </div>
  );
}
