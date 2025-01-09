"use client";

import React from "react";

const ProfilePage = () => {
  // ユーザー情報の仮データ
  const userData = {
    username: "JohnDoe",
    email: "john.doe@example.com",
    joinedAt: "2025-01-01",
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">プロフィール</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p><strong>ユーザー名:</strong> {userData.username}</p>
        <p><strong>メールアドレス:</strong> {userData.email}</p>
        <p><strong>登録日:</strong> {userData.joinedAt}</p>
      </div>
    </main>
  );
};

export default ProfilePage;
