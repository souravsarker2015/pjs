import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useGetGalleryQuery } from "../../../Redux/gallery/galleryApi";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { EffectCoverflow, Autoplay } from "swiper/modules";

export default function Gallery() {
  const { data } = useGetGalleryQuery();
  const gallery = data?.data;

  const allImages = gallery?.map((item) => item.images).flat();

  return (
    <section className="gallery_wrap py-10 sm:py-14">
      <h2 className="mb-8 text-center text-4xl font-semibold text-neutral sm:text-5xl">
        Our Project Gallery
      </h2>

      <PhotoProvider>
        <Swiper
          effect={"coverflow"}
          slidesPerView={1}
          spaceBetween={10}
          grabCursor={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          coverflowEffect={{
            rotate: 2,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="h-[270px] w-full sm:h-[450px]"
        >
          {allImages?.map((image, i) => (
            <SwiperSlide key={i} className="h-full">
              <PhotoView
                key={image?._id}
                src={`${import.meta.env.VITE_BACKEND_URL}/${image}`}
              >
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${image}`}
                  alt="gallery"
                  className="block h-full w-full rounded object-cover"
                />
              </PhotoView>
            </SwiperSlide>
          ))}
        </Swiper>
      </PhotoProvider>
    </section>
  );
}
