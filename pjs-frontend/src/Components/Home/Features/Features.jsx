import parser from "html-react-parser";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { Navigation, A11y, Autoplay, EffectFade } from "swiper/modules";

import { useGetFeatureProjectsQuery } from "../../../Redux/featureProject/featureProjectApi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Features() {
  const { data } = useGetFeatureProjectsQuery();
  const projects = data?.data;

  const swiperRef = useRef(null);

  const [animateImage, setAnimateImage] = useState(false);

  const handleSlideChange = () => {
    setAnimateImage(false);
    setTimeout(() => setAnimateImage(true), 10);
  };

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.on("slideChange", handleSlideChange);
    }
  }, []);

  return (
    <section className="relative">
      <Swiper
        effect={"fade"}
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation, A11y, Autoplay, EffectFade]}
        className="h-[500px] w-full sm:h-[600px]"
      >
        {projects?.map((project) => (
          <SwiperSlide key={project?._id} className="h-full w-full">
            <div className="absolute left-0 top-1/2 z-40 h-full w-full -translate-y-1/2 bg-black/60">
              <div className="container flex h-full flex-col justify-center">
                <div className="grid items-center gap-4 sm:grid-cols-2">
                  <div className="text-base-100">
                    <h3 className="text-xl font-medium">Feature Projects</h3>

                    <div className={animateImage ? "fade-up-animation" : ""}>
                      <h2 className="mt-10 text-3xl font-medium uppercase md:text-4xl">
                        {project?.title}
                      </h2>
                      <div className="mt-2 text-xs md:text-base">
                        {parser(project?.description)}
                      </div>
                    </div>

                    <div className="mt-10 flex gap-4">
                      <button
                        className="rounded-full bg-black/80 p-3 text-white duration-300 hover:bg-black"
                        onClick={() => swiperRef.current?.slidePrev()}
                      >
                        <FaArrowLeft />
                      </button>
                      <button
                        className="rounded-full bg-black/80 p-3 text-white duration-300 hover:bg-black"
                        onClick={() => swiperRef.current?.slideNext()}
                      >
                        <FaArrowRight />
                      </button>
                    </div>
                  </div>

                  <div
                    data-aos-anchor-placement="top-center"
                    className={animateImage ? "fade-up-animation" : ""}
                  >
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/${project?.image}`}
                      alt={project?.title}
                      className="h-60 w-full rounded object-cover sm:h-[350px]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute left-0 top-0 z-10 h-full w-full">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${project?.image}`}
                alt={project?.title}
                className="h-full w-full rounded object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}