import { BBSData } from "@/app/types/type";
import Link from "next/link";
import React from "react";

async function getBBSDetailData(id: number) {
  const response = await fetch(`http://localhost:3000/api/post/${id}`, {
    cache: "no-store",
  });

  const bbsDetailData: BBSData = await response.json();
  return bbsDetailData;
}

const DetailPage = async ({ params }: { params: { bbsId: number } }) => {
  const bbsDetailData = await getBBSDetailData(params.bbsId);
  console.log(bbsDetailData);
  const { title, content, createdAt, username, imageUrl, todo } = bbsDetailData;

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-700">{username}</p>
      </div>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="mb-4 w-full rounded-lg object-cover"
        />
      )}
      <p>{new Date(createdAt).toLocaleString()}</p>
      <div>
        <p className="text-gray-900">{content}</p>
      </div>
      <div>{todo}</div>
      <Link href="/" className="text-blue-500">
        Back
      </Link>
    </div>
  );
};

export default DetailPage;
