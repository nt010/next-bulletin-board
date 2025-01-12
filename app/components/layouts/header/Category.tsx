import React, { useState } from "react";

const categories = [
  { name: "Book", id: "book", color: "bg-blue-200" },
  { name: "文房具", id: "stationery", color: "bg-green-200" },
  { name: "家電", id: "electronics", color: "bg-yellow-200" },
  { name: "ファッション", id: "fashion", color: "bg-pink-200" },
  { name: "スポーツ", id: "sports", color: "bg-purple-200" },
];

// ダミーデータ
const items = [
  { id: 1, name: "本1", category: "book" },
  { id: 2, name: "ペン", category: "stationery" },
  { id: 3, name: "冷蔵庫", category: "electronics" },
  { id: 4, name: "Tシャツ", category: "fashion" },
  { id: 5, name: "バスケットボール", category: "sports" },
  { id: 6, name: "本2", category: "book" },
  { id: 7, name: "ノート", category: "stationery" },
];

const CategoryBar = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // フィルタリングされたアイテム
  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  return (
    <div>
      {/* カテゴリーバー */}
      <div className="flex justify-center items-center gap-4 py-4 bg-gradient-to-r from-purple-400 via-pink-300 to-blue-300 shadow-lg">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === category.id ? null : category.id
              )
            }
            className={`px-5 py-2 rounded-full text-sm font-semibold text-gray-800 shadow-md hover:scale-105 transform transition-all ${
              category.color
            } ${
              selectedCategory === category.id
                ? "ring-4 ring-offset-2 ring-purple-600"
                : ""
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* アイテムリスト */}
      <div className="container mx-auto mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all"
          >
            <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-500">カテゴリ: {item.category}</p>
          </div>
        ))}
        {filteredItems.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            該当するアイテムがありません
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryBar;
