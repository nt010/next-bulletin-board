import React from "react";
import { BBSData } from "../../../types/type";
import Cards from "../card/Cards";

type CardListProps = {
  bbsAllData: BBSData[];
};

export default function CardList({ bbsAllData }: CardListProps) {
  if (!bbsAllData || bbsAllData.length === 0) {
    return <div>該当する商品がありません</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-8 mx-auto max-w-7xl mt-8 mb-8">
      {bbsAllData.map((bbsData: BBSData) => (
        <Cards key={bbsData.id} bbsData={bbsData} />
      ))}
    </div>
  );
}
