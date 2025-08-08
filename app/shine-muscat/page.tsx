import Image from "next/image";
import { IoIosPin } from "react-icons/io";
import { FaHeart } from "react-icons/fa";

export default function ShineMuscatDetail() {
  return (
    <div className="relative w-full py-3.5">
      {/* Hero image from carousel */}
      <div className="relative w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden mb-8">
        <Image
          priority={true}
          fill
          src="/images/main/대표이미지.png"
          alt="영애이모농장"
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h1 className="text-24 md:text-30">영애이모농장</h1>
          <p className="text-14 md:text-18 font-medium mt-2">
            포도 농사만 30년차,
          </p>
          <p className="text-14 md:text-18 font-medium">
            고온 생육저하 현상, 봄철 뿌리 확보가 관건!
          </p>
          <div className="flex text-12 md:text-16 mt-2">
            <p className="flex items-center mr-2">
              <FaHeart className="mr-2" />
              1,200
            </p>
            <p className="flex items-center flex-row">
              <IoIosPin className="mr-1 text-16" />
              경상북도 김천시
            </p>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <section>
        <h2 className="text-24 md:text-30 font-bold mb-4">샤인머스캣</h2>
        <p className="text-16 md:text-18 text-gray-700 mb-6">
          달콤한 향이 입안 가득
        </p>
        
        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
          <h3 className="text-18 md:text-21 font-bold mb-3">상품 정보</h3>
          <div className="space-y-2">
            <p className="flex justify-between">
              <span className="text-gray-600">원산지</span>
              <span>경상북도 김천시</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">재배방식</span>
              <span>친환경 농법</span>
            </p>
            <p className="flex justify-between">
              <span className="text-gray-600">수확시기</span>
              <span>8월 ~ 9월</span>
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-2xl p-6">
          <h3 className="text-18 md:text-21 font-bold mb-3">농장 소개</h3>
          <p className="text-14 md:text-16 text-gray-700">
            포도 농사 30년차 영애이모농장에서 정성껏 기른 샤인머스캣입니다. 
            고온 생육저하 현상을 극복하고 봄철 뿌리 확보에 특별히 신경 쓴 
            최고 품질의 샤인머스캣을 만나보세요.
          </p>
        </div>
      </section>
    </div>
  );
}