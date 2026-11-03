import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useGetGalleryQuery } from "../../../Redux/gallery/galleryApi";

export default function Projects() {
  window.scrollTo(0, 0);
  const { data } = useGetGalleryQuery();
  const gallery = data?.data;
  const allImages = gallery?.map((item) => item.images).flat();

  return (
    <section className="gallery_wrap container py-10 sm:py-14">
      <h2 className="md:mb-8 mb-4 text-center text-4xl font-semibold text-neutral sm:text-5xl">
        Our Project Gallery
      </h2>

      <PhotoProvider>
        <div className="grid grid-cols-2 gap-2 md:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {allImages?.map((image) => (
            <PhotoView
              key={image?._id}
              src={`${import.meta.env.VITE_BACKEND_URL}/${image}`}
            >
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${image}`}
                alt="gallery"
                className="block hover:scale-105 duration-300 h-full w-full rounded object-cover"
              />
            </PhotoView>
          ))}
        </div>
      </PhotoProvider>
    </section>
  );
}
