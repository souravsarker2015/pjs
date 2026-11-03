import { useGetAllClientQuery } from "../../../Redux/client/clientApi";

export default function Clients() {
  const { data } = useGetAllClientQuery();
  const client = data?.data;

  return (
    <section className="min-h-[100vh] py-8">
      <div className="flex items-center pb-5 justify-center">
        <h2 className="text-4xl font-semibold text-primary">
          Our Clients
        </h2>
      </div>
      <div className="container">
        <div className="grid grid-cols-6 gap-5">
          {client?.map((client) => (
            <div
              target="_blank"
              rel="noopener noreferrer"
              key={client?.id}
              className="flex h-20 w-full items-center justify-center"
            >
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${client?.logo}`}
                alt="clients_img"
                className="h-[98%] w-[90%] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
