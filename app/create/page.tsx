"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { postBBS } from "@/app/actions/postBBSAction";
import Header from "../components/layouts/header/Header"; // ヘッダーをインポート

// バリデーションスキーマ
export const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "ユーザー名は2文字以上で入力してください" }),
  title: z
    .string()
    .min(2, { message: "タイトルは2文字以上で入力してください" }),
  content: z
    .string()
    .min(10, { message: "内容は10文字以上で入力してください" }),
  todo: z.string(),
});

const CreatePage = () => {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null); // プレビュー用の状態
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      title: "",
      content: "",
      todo: "",
      image: undefined,
    },
  });

  async function onSubmit(value: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("username", value.username);
    formData.append("title", value.title);
    formData.append("content", value.content);
    formData.append("todo", value.todo);

    // 画像のバリデーション
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (!fileInput?.files?.[0]) {
      alert("正しい形式の画像をアップロードしてください");
      return;
    }
    formData.append("image", fileInput.files[0]);

    try {
      await postBBS(formData); // サーバーに送信
      router.push("/"); // 成功した場合はリダイレクト
    } catch (error) {
      console.error("投稿に失敗しました:", error);
    }
  }

  // ファイル選択時の処理
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 画像サイズをチェック
      if (file.size > 2 * 1024 * 1024) {
        alert("画像サイズは2MB以下にしてください");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string); // プレビュー用URLを設定
      };
      reader.readAsDataURL(file); // ファイルをデータURLとして読み込む
    }
  };

  return (
    <>
      {/* ヘッダー */}
      <Header onSearch={() => {}} />

      {/* メインコンテンツ */}
      <div className="flex justify-center mt-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 w-1/2 px-7 bg-white p-6 shadow-md rounded-lg"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ユーザーネーム</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="出品者名を入力してください"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>タイトル</FormLabel>
                  <FormControl>
                    <Input placeholder="商品タイトルを入力してください" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>説明文</FormLabel>
                  <FormControl>
                    <Textarea placeholder="例：
ご覧いただきありがとうございます！
【商品名】：商品名を記載してください
【サイズ】：縦〇cm × 横〇cm × 高さ〇cm（該当する場合）
【カラー】：色を記載してください
【状態】：未使用品／新品同様／目立つ汚れなし／使用感あり（詳細を記載）
【購入時期】：〇年〇月頃（わかる範囲で記載してください）

◆商品のポイント◆
商品の特徴やおすすめポイントを簡潔に記載してください。

◆その他◆
ペットや喫煙環境の有無など、購入者が気になる情報をご記載ください。

【注意事項】
・中古品のため、完璧を求める方はご遠慮ください。
・簡易包装で発送します。
・ご不明点がありましたらお気軽にコメントください！" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="todo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>やってほしいこと</FormLabel>
                  <FormControl>
                    <Input placeholder="やってほしいことを入力してください" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>商品画像（jpg・jpeg・png）</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </FormControl>
              <FormDescription>
                アップロードした画像のプレビューが下に表示されます。
              </FormDescription>
              {imagePreview && (
                <div className="mt-2">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={200}
                    height={200}
                    className="rounded-lg"
                  />
                </div>
              )}
            </FormItem>

            <Button type="submit" className="w-full">
              出品
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CreatePage;
