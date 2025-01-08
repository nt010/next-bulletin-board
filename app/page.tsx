import Home from "./Home"; // クライアントコンポーネント
import { BBSData } from "./types/type";

async function getBBSAllData() {
  const response = await fetch("http://localhost:3000/api/post", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch BBS data");
  }

  const bbsAllData: BBSData[] = await response.json();
  return bbsAllData;
}

export default async function Page() {
  const bbsAllData = await getBBSAllData(); // データを取得

  return <Home bbsAllData={bbsAllData} />;
}
