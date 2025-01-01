"use server";

import { z } from "zod";
import { formSchema } from "../bbs-posts/create/page"; // スキーマのインポート
import prisma from "../../lib/prismaClient"; // Prisma クライアントのインポート
import supabase from "../../lib/supabaseClient"; // Supabase クライアントのインポート
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const postBBS = async ({
  username,
  title,
  content,
  file,
}: z.infer<typeof formSchema> & { file: File | null }) => {
  try {
    let imageUrl = null;

    if (file) {
      // Supabaseに画像をアップロード
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("images") // バケット名
        .upload(fileName, file);

      if (error) {
        console.error("Error uploading file to Supabase:", error);
        throw new Error("画像のアップロードに失敗しました");
      }

      // 公開URLを取得
      const { data: publicUrlData } = supabase.storage
        .from("images")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData?.publicUrl || null;
    }

    // Prismaを使ってデータを保存
    await prisma.post.create({
      data: {
        username,
        title,
        content,
        imageUrl, // 画像URLを保存
      },
    });

    // キャッシュの再検証
    revalidatePath("/");

    // "/" ページにリダイレクト
    redirect("/");
  } catch (error) {
    console.error("Error while posting BBS:", error);
    throw new Error("投稿に失敗しました");
  }
};
