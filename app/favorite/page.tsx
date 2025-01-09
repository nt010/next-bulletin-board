// app/favorite/page.tsx
"use client";

import React from "react";
import CardList from "../components/layouts/cardList/CardList";
import { BBSData } from "../types/type";

const FavoritePage = () => {
  // 仮のデータ（実際はAPIや状態管理から取得）
  const favoriteData: BBSData[] = [
    {
      id: "1",
      title: "お気に入りの投稿1",
      content: "これはお気に入りの投稿内容です。",
      imageUrl: "/sample.jpg",
      username: "JohnDoe",
      createdAt: "2025-01-01",
      todo: [],
    },
    {
      id: "2",
      title: "お気に入りの投稿2",
      content: "これはお気に入りの投稿内容です。",
      imageUrl: "/sample2.jpg",
      username: "JaneDoe",
      createdAt: "2025-01-02",
      todo: [],
    },
  ];

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">お気に入り一覧</h1>
      <CardList bbsAllData={favoriteData} />
    </main>
  );
};

export default FavoritePage;
