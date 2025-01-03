import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
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
  const { id, title, content, createdAt, username, imageUrl } = bbsData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {username} - {new Date(createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="h-48 w-full object-cover rounded-t-lg"
        />
      )}
      <CardContent>{content}</CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/bbs-posts/${id}`} className="text-blue-500">
          Read More
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Cards;
