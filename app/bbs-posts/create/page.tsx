"use client";

import React from "react";
import { useState } from "react";
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

export const formSchema = z.object({
  username: z
    .string()
    .min(2, { message: "ユーザー名は2文字以上で入力してください" }),
  title: z
    .string()
    .min(2, { message: "タイトルは2文字以上で入力してください" }),
  content: z
    .string()
    .min(10, { message: "内容は10文字以上で入力してください" })
    .max(140, { message: "内容は140文字以内で入力してください" }),
  image: z.instanceof(File).optional(), // File型を指定
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
      image: undefined,
    },
  });
  async function onSubmit(value: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("username", value.username);
    formData.append("title", value.title);
    formData.append("content", value.content);
  
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput?.files?.[0]) {
      formData.append("image", fileInput.files[0]);
    }
  
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
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string); // プレビュー用URLを設定
      };
      reader.readAsDataURL(file); // ファイルをデータURLとして読み込む
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 w-1/2 px-7"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UserName</FormLabel>
              <FormControl>
                <Input
                  placeholder="username"
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
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Created-Content" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 画像アップロード */}
        <FormItem>
          <FormLabel>Upload Image</FormLabel>
          <FormControl>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CreatePage;
