import MainCarousel from "@/app/MainCarousel";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative w-full py-3.5">
      <MainCarousel />
      <h2 className="text-24 pt-10">과일 도매</h2>
      <p className="pt-2 font-medium">제철 과일을 원하는 날짜에 도매가로</p>
      <section className="pt-4 flex-col flex gap-2">
        <ul className="flex flex-row gap-2">
          <li className="rounded-3xl w-1/2 h-auto aspect-square bg-gray-300 relative overflow-hidden">
            <Image
              src="/images/main/shine-muscat.jpg"
              alt="shine-muscat"
              fill
              className="relative flex"
            />
            <div className="absolute bottom-3 left-4 text-white">
              <h4 className="text-18">샤인머스캣</h4>
              <p className="text-12 font-medium">무슨말을 넣을까나</p>
            </div>
          </li>
          <li className="rounded-3xl w-1/2 h-auto aspect-square bg-gray-300 relative overflow-hidden">
            <Image
              src="/images/main/딸기.jpg"
              alt="딸기"
              fill
              className="relative flex"
            />
            <div className="absolute bottom-3 left-4 text-white">
              <h4 className="text-18">딸기</h4>
              <p className="text-12 font-medium">무슨말을 넣을까나</p>
            </div>
          </li>
        </ul>
        <ul className="flex flex-row gap-2">
          <li className="rounded-3xl w-1/2 h-auto aspect-square bg-gray-300 relative overflow-hidden">
            <Image
              src="/images/main/귤.jpg"
              alt="귤"
              fill
              className="relative flex"
            />
            <div className="absolute bottom-3 left-4 text-white">
              <h4 className="text-18">귤</h4>
              <p className="text-12 font-medium">무슨말을 넣을까나</p>
            </div>
          </li>
          <li className="rounded-3xl w-1/2 h-auto aspect-square bg-gray-300 relative overflow-hidden">
            <Image
              src="/images/main/사과.png"
              alt="사과"
              fill
              className="relative flex"
            />
            <div className="absolute bottom-3 left-4 text-white">
              <h4 className="text-18">사과</h4>
              <p className="text-12 font-medium">무슨말을 넣을까나</p>
            </div>
          </li>
        </ul>
        <ul className="flex flex-row gap-2">
          <li className="rounded-3xl w-1/2 h-auto aspect-square bg-gray-300 relative overflow-hidden">
            <Image
              src="/images/main/배.jpg"
              alt="배"
              fill
              className="relative flex"
            />
            <div className="absolute bottom-3 left-4 text-white">
              <h4 className="text-18">배</h4>
              <p className="text-12 font-medium">무슨말을 넣을까나</p>
            </div>
          </li>
          <li className="rounded-3xl w-1/2 h-auto aspect-square bg-gray-300 relative overflow-hidden">
            <Image
              src="/images/main/블루베리.jpg"
              alt="블루베리"
              fill
              className="relative flex"
            />
            <div className="absolute bottom-3 left-4 text-white">
              <h4 className="text-18">블루베리</h4>
              <p className="text-12 font-medium">무슨말을 넣을까나</p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}
