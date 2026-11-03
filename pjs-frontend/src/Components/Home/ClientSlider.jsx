import { useGetAllClientQuery } from "../../Redux/client/clientApi";

export default function ClientSlider() {
  const { data } = useGetAllClientQuery();
  const clients = data?.data;

  return (
    <section className="bg-stone-100 py-10">
      <h2 className="mb-4 text-center text-4xl font-medium text-neutral sm:text-5xl">
        Featured Clients
      </h2>
      <div className="container">
        <div className="wrapper">
          {clients?.map((client, index) => (
            <div key={index} className={`itemLeft item${index + 1}`}>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${client?.logo}`}
                alt="client"
              />
            </div>
          ))}
        </div>
        <div className="wrapper">
          {clients?.map((client, index) => (
            <div key={index} className={`itemRight item${index + 1}`}>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${client?.logo}`}
                alt="client"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
