import { useGetWhychooseQuery } from "../../../Redux/whychoose/whychooseApi";
import { useGetWhychooseSectionQuery } from "../../../Redux/whychooseSection/whychooseSectionApi";

export default function WhyChoose() {
  const { data } = useGetWhychooseSectionQuery();
  const section = data?.data;
  const { data: whychoose } = useGetWhychooseQuery();
  const whychooses = whychoose?.data;

  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-black mb-10">
          {section?.title || "Why Choose Us"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {whychooses?.map((item) => (
            <div
              key={item?._id}
              className="bg-white shadow-md p-6 rounded-xl text-center transition duration-300 hover:shadow-xl"
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-100">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/whychoose/${item?.image}`}
                  alt={item?.title}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">{item?.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
