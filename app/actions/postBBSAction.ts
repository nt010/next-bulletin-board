import supabase from "@/lib/supabaseClient";

export const postBBS = async (formData: FormData) => {
  try {
    // フォームデータから情報を取得
    const { username, title, content, todo } = Object.fromEntries(formData.entries());

    // 初期値
    let imageUrl = "https://doodleipsum.com/640x400/";

    // 画像をSupabaseストレージにアップロード
    const imageFile = formData.get("image") as File;
    if (imageFile) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("upload")
        .upload(`images/${Date.now()}-${imageFile.name}`, imageFile);

      // アップロードエラーをチェック
      if (uploadError) {
        console.error("Image upload error:", uploadError.message);
        throw new Error(`画像のアップロードに失敗しました: ${uploadError.message}`);
      }

      // アップロード成功時にパスを取得
      if (uploadData) {
        const { data: publicUrlData, error: publicUrlError } = supabase.storage
          .from("upload")
          .getPublicUrl(uploadData.path);

        if (publicUrlError) {
          console.error("Error getting public URL:", publicUrlError.message);
          throw new Error("画像の公開URL取得に失敗しました");
        }

        imageUrl = publicUrlData.publicUrl;
      }
    }

    // 投稿データをSupabaseに保存
    const { data, error } = await supabase.from("Post").insert({
      username,
      title,
      content,
      todo,
      imageUrl: imageUrl, // アップロードされた画像のURL
    });

    if (error) {
      console.error("Database insert error:", error.message);
      throw new Error("Supabaseへの投稿に失敗しました");
    }

    return data;
  } catch (error) {
    console.error("Error while posting BBS:", error.message);
    throw new Error(`投稿に失敗しました: ${error.message}`);
  }
};
