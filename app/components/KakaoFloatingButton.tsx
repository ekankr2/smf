"use client";
import React from "react";
import Image from "next/image";

const KakaoFloatingButton = () => {
  const handleKakaoContact = () => {
    // KakaoTalk contact URL - replace with your actual KakaoTalk channel URL
    window.open("http://pf.kakao.com/_UheNn/chat", "_blank");
  };

  return (
    <button
      onClick={handleKakaoContact}
      className="cursor-pointer fixed bottom-6 right-6 z-50 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full px-6 py-4 shadow-lg transition-all duration-300 hover:scale-110 flex items-center gap-2"
      aria-label="카카오톡 문의하기"
    >
      <Image
        src="/images/kakao_logo.png"
        alt="KakaoTalk"
        width={24}
        height={24}
        className="w-6 h-6 mt-1"
      />
      <span className="text-16 font-bold whitespace-nowrap">문의하기</span>
    </button>
  );
};

export default KakaoFloatingButton;
