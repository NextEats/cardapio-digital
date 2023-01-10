import { productType } from "../../types/product";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import Image from "next/image";

export default function ProductHorizontalScrollList({
  products,
  openProductModal,
}: {
  products: productType[];
  openProductModal: Function;
}) {
  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      rtl: false,
      slides: {
        number: products.length,
        spacing: 10,
        perView: 2.5,
      },
      breakpoints: {
        "(min-width: 768px)": {
          slides: {
            number: products.length,
            spacing: 10,
            perView: 3.5,
          },
        },
      },
    },
    autoPlaySlider()
  );

  function ProductItem({ productData }: { productData: productType }) {
    return (
      <div
        onClick={() => openProductModal(productData)}
        className="border rounded-md border-gray-300 bg-white hover:bg-gray-200 cursor-pointer transition-all duration-200 ease-in-out lg:h-[180px] h-[330px] p-5 flex flex-col lg:flex-row items-center"
      >
        <div className="h-full flex products-center">
          <div className="w-full lg:w-32">
            <Image
              src={productData.picture}
              className="rounded-md"
              alt="208c90f0-5596-48a4-a1ce-aebb38cf789d"
              width={350}
              height={150}
            />
          </div>
        </div>
        <div className="ml-2 flex items-center flex-col">
          <span className="font-bold lg:text-xl">{productData.name}</span>
          <p className="w-full mt-2 font-semibold text-green-500 before:content-['R$']">
            &nbsp;{productData.price}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div ref={sliderRef} className="keen-slider">
        {products.map((product: productType, index) => {
          return (
            <div className="keen-slider__slide" key={index}>
              <ProductItem productData={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function autoPlaySlider() {
  return [
    (slider: any) => {
      let timeout: any;
      let mouseOver = false;
      function clearNextTimeout() {
        clearTimeout(timeout);
      }
      function nextTimeout() {
        clearTimeout(timeout);
        if (mouseOver) return;
        timeout = setTimeout(() => {
          slider.next();
        }, 2000);
      }
      slider.on("created", () => {
        slider.container.addEventListener("mouseover", () => {
          mouseOver = true;
          clearNextTimeout();
        });
        slider.container.addEventListener("mouseout", () => {
          mouseOver = false;
          nextTimeout();
        });
        nextTimeout();
      });
      slider.on("dragStarted", clearNextTimeout);
      slider.on("animationEnded", nextTimeout);
      slider.on("updated", nextTimeout);
    },
  ];
}
