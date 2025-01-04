import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { BBSData } from "@/app/types/type";

interface BBSDataProps {
  bbsData: BBSData;
}

const Cards = ({ bbsData }: BBSDataProps) => {
  const { id, title, content, createdAt, username, imageUrl, todo } = bbsData;

  return (
    <Card className="w-full mx-auto shadow-lg border rounded-lg overflow-hidden">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="h-56 w-full object-cover"
        />
      )}
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-bold">{title}</CardTitle>
        <p className="text-sm text-gray-500">
          {username} ・ {new Date(createdAt).toLocaleDateString()}
        </p>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-gray-700 line-clamp-2">{content}</p>
        <div className="mt-2 text-sm text-blue-500 font-semibold">
          やってほしいこと: {todo}
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t text-center">
        <Link
          href={`/bbs-posts/${id}`}
          className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded"
        >
          詳細を見る
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Cards;
