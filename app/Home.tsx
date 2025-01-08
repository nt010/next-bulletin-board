"use client";

import React, { useState } from "react";
import Header from "./components/layouts/header/Header";
import CardList from "./components/layouts/cardList/CardList";
import { BBSData } from "./types/type";

type HomeProps = {
  bbsAllData: BBSData[];
};

export default function Home({ bbsAllData }: HomeProps) {
  const [filteredData, setFilteredData] = useState<BBSData[]>(bbsAllData);

  const handleSearch = (term: string) => {
    const lowerCaseTerm = term.toLowerCase();
    const filtered = bbsAllData.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerCaseTerm) ||
        item.content.toLowerCase().includes(lowerCaseTerm)
    );
    setFilteredData(filtered);
  };

  return (
    <main>
      <Header onSearch={handleSearch} />
      <CardList bbsAllData={filteredData} />
    </main>
  );
}
