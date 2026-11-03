import "../../../assets/css/hero.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";
import { useGetAllBannerQuery } from "../../../Redux/banner/bannerApi";

export default function Hero() {
  const { data } = useGetAllBannerQuery();
  const banners = data?.data;

  return (
    <div className="hero_slider absolute left-0 top-[80px] z-30 h-[30vh] md:h-[80vh] w-full sm:h-screen">
      <Swiper
        slidesPerView={1}
        effect={"fade"}
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Autoplay, EffectFade]}
        className="h-full w-full"
        // loop={true}
      >
        {banners?.map((banner) => (
          <SwiperSlide key={banner?._id}>
            <div className="h-full overflow-hidden">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${banner?.bg}`}
                alt="slider"
                className="hero_img h-full w-full object-cover"
              />
            </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
