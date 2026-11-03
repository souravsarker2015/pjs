import { useParams } from "react-router-dom";
import parser from "html-react-parser";
import { useGetSingleServiceQuery } from "../../Redux/service/serviceApi";
import { useGetGalleryByServiceIdQuery } from "../../Redux/service/galleryApi";

export default function ServiceDetails() {
  window.scrollTo(0, 0);
  const { id } = useParams();
  const { data } = useGetSingleServiceQuery(id);
  const service = data?.data;

  const { data: gallery } = useGetGalleryByServiceIdQuery(id);
  const allImages = gallery?.data?.images;

  return (
    <section className="min-h-[60vh] py-5">
      <div className="container">
        <div className="text-start">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${service?.image}`}
            alt="feature"
            className="min-w-56 max-w-96"
            loading="lazy"
          />
          <h2 className="mt-3 text-4xl font-medium">{service?.title}</h2>

          <div className="mt-2 text-neutral-content">
            {service?.description && parser(service?.description)}
          </div>
        </div>

        <div className="mt-6">
          <div className="rounded bg-primary px-4 py-2 text-base-100">
            {service?.title} Gallery
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {allImages?.map((image, i) => (
              <img
                key={i}
                src={`${import.meta.env.VITE_BACKEND_URL}/${image}`}
                alt={image}
                className="h-40 w-full rounded object-cover"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
