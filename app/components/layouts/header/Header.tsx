"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FiShoppingCart, FiUser, FiSearch, FiMenu } from "react-icons/fi";

const Header = ({ onSearch }: { onSearch: (term: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // 親コンポーネントに検索状態を伝える
  };

  return (
    <header className="relative bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex justify-between items-center py-5">
          {/* ロゴ */}
          <Link
            href="/"
            className="text-3xl font-extrabold tracking-tight bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            TreMa
          </Link>

          {/* 検索バー */}
          <div className="hidden md:flex items-center w-1/2 relative">
            <input
              type="text"
              placeholder="Find amazing deals..."
              className="w-full py-3 px-6 rounded-full text-gray-700 shadow-md focus:ring-4 focus:ring-pink-300 focus:outline-none"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="absolute right-2 top-2.5 bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full transition-colors">
              <FiSearch size={20} />
            </button>
          </div>

          {/* ユーザー操作エリア */}
          <div className="flex items-center space-x-6">
            <Link href="/create">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-md transition-colors">
                出品
              </button>
            </Link>
            <Link href="/cart" className="hover:scale-110 transition-transform">
              <FiShoppingCart size={28} />
            </Link>
            <Link href="/profile" className="hover:scale-110 transition-transform">
              <FiUser size={28} />
            </Link>
            <button className="md:hidden text-white hover:scale-110 transition-transform">
              <FiMenu size={28} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
