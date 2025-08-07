import { useState } from "react";
import Leaderboard from "../components/Leaderboard";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [username, setUsername] = useState("");
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/count?username=${username}`);
    const data = await res.json();
    setCount(data.count);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative">
      <h1 className="text-3xl font-bold mb-6">gMoo Counter</h1>

      <div className="mb-6">
        <Image src="/common-logo.png" alt="Common Logo" width={90} height={90} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter your Twitter handle"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="text-black px-4 py-2 rounded-md"
          required
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md"
        >
          Count gMoo
        </button>
      </form>

      {loading && <p>Counting...</p>}
      {count !== null && <p className="text-xl">You said "gMoo" {count} times this week.</p>}

      <div className="fixed bottom-4 right-4 w-[300px]">
        <Leaderboard />
      </div>

      <div className="fixed bottom-4 left-4 text-xs text-gray-400 flex flex-col gap-2">
        <Link href="https://x.com/lamumudotxyz" target="_blank">lamumu</Link>
        <span className="text-[10px]">powered by 0xRainb0y</span>
      </div>

      <div className="absolute top-4 right-4">
        <Link href="https://x.com/commondotxyz" target="_blank">
          <Image src="/gmoo-cow.png" alt="Cow" width={80} height={80} />
        </Link>
      </div>
    </main>
  );
}
