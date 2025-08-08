"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { EmblaOptionsType } from "embla-carousel";
import { IoIosPin } from "react-icons/io";
import { FaHeart } from "react-icons/fa";

const OPTIONS: EmblaOptionsType = {
  dragFree: false,
  loop: true,
  containScroll: "trimSnaps",
};

const MainCarousel = () => {
  const [emblaRef] = useEmblaCarousel(OPTIONS, [
    Autoplay({ playOnInit: true, delay: 10000 }),
  ]);

  return (
    <article
      className="cursor-pointer overflow-hidden rounded-3xl w-full"
      ref={emblaRef}
    >
      <ul className="flex touch-pan-y select-none">
        {[0].map((data: any, index: number) => (
          <li
            className="relative h-[350px] md:h-[450px] flex w-full min-w-full max-w-full overflow-hidden shrink-0 md:justify-center"
            key={index}
          >
            <div className="relative w-full h-full shrink-0">
              <Image
                priority={true}
                fill
                src="/images/main/대표이미지.png"
                alt="main banner"
                sizes="100vw"
                style={{ objectFit: "cover" }}
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 p-8 text-white">
              <h4 className="text-24 md:text-30">영애이모농장</h4>
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
          </li>
        ))}
      </ul>
    </article>
  );
};

export default MainCarousel;
