import React from "react";

const categories = [
  { name: "Book", id: "book" },
  { name: "文房具", id: "stationery" },
  { name: "家電", id: "electronics" },
  { name: "ファッション", id: "fashion" },
  { name: "スポーツ", id: "sports" },
];

const CategoryBar = () => {
  const handleCategoryClick = (categoryId: string) => {
    console.log(`Category clicked: ${categoryId}`);
    // 必要に応じてカテゴリ別のページに移動やフィルタリングを実装
  };

  return (
    <div className="flex justify-center items-center bg-gray-100 py-2 shadow-md">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className="mx-2 px-4 py-2 text-sm font-semibold text-gray-700 bg-white rounded-lg hover:bg-gray-200 transition-colors"
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;
