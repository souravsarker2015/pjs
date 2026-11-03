import { Link } from "react-router-dom";
import { useGetAllServiceQuery } from "../../Redux/service/serviceApi";

export default function Services() {
  const { data } = useGetAllServiceQuery();
  const services = data?.data;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="mx-auto text-center text-4xl font-extrabold text-gray-900 sm:w-2/3 sm:text-5xl">
          OUR SERVICES
        </h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services?.map((service, i) => {
            const description =
              service?.description &&
              service?.description.replace(/<[^>]+>/g, "");

            return (
              <Link
                to={`/service/${service?._id}`}
                key={i}
                className="group block rounded-lg bg-white p-6 shadow-md hover:shadow-xl transition-shadow text-center duration-300 ease-in-out cursor-pointer"
                data-aos="zoom-in"
              >
                <div className="flex justify-center mb-4">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${service?.image}`}
                    alt={service?.title}
                    className="h-20 w-20 object-contain transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-800 group-hover:text-primary transition-colors duration-300">
                  {service?.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {description?.length > 80
                    ? description.slice(0, 80) + "..."
                    : description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
