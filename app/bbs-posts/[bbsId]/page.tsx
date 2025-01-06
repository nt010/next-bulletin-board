import { BBSData } from "@/app/types/type";
import Link from "next/link";
import React, { useState } from "react";

async function getBBSDetailData(id: number) {
  const response = await fetch(`http://localhost:3000/api/post/${id}`, {
    cache: "no-store",
  });

  const bbsDetailData: BBSData = await response.json();
  return bbsDetailData;
}

const DetailPage = async ({ params }: { params: { bbsId: number } }) => {
  const bbsDetailData = await getBBSDetailData(params.bbsId);
  const { title, content, createdAt, username, imageUrl, todo } = bbsDetailData;

  // モーダル表示用の状態管理
  const [isModalOpen, setIsModalOpen] = useState(false);

  // モーダルを開く
  const openModal = () => setIsModalOpen(true);

  // モーダルを閉じる
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="mx-auto max-w-3xl p-6">
      {/* カード全体 */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* 画像エリア */}
        {imageUrl && (
          <div className="h-60 bg-gray-100 cursor-pointer" onClick={openModal}>
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* モーダル */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="relative">
              <img
                src={imageUrl}
                alt={title}
                className="max-h-[90vh] max-w-[90vw] object-contain"
              />
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-600"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* コンテンツエリア */}
        <div className="p-6">
          {/* タイトルとユーザー */}
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
          <p className="text-gray-600 text-sm mb-4">出品者: {username}</p>

          {/* 日付 */}
          <p className="text-gray-500 text-sm mb-6">
            出品日: {new Date(createdAt).toLocaleString()}
          </p>

          {/* 商品説明 */}
          <h2 className="text-lg font-semibold text-gray-800 mb-2">商品説明</h2>
          <p className="text-gray-700 mb-6">{content}</p>

          {/* やってほしいこと */}
          {todo && (
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
              <h3 className="text-md font-semibold text-gray-800 mb-2">
                やってほしいこと
              </h3>
              <p className="text-gray-700">{todo}</p>
            </div>
          )}

          {/* 戻るリンク */}
          <Link
            href="/"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            戻る
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
