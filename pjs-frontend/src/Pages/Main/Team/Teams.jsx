import parse from "html-react-parser";
import { useGetTeamsQuery } from "../../../Redux/teamApi";

export default function Teams() {
  window.scrollTo(0, 0);

  const { data } = useGetTeamsQuery();
  const teams = data?.data;

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center text-3xl font-medium sm:text-4xl">
          Our Team Member
        </h2>
        <div className="mt-5 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {teams?.map((team) => (
            <div key={team?._id} className="rounded bg-gray-50 p-4">
              <img
                src={import.meta.env.VITE_BACKEND_URL + "/" + team?.image}
                alt={team?.name}
                className="mx-auto w-[80%] rounded"
              />

              <div className="mt-3 flex flex-wrap items-center justify-center gap-1 text-lg font-semibold">
                <h4 className="">{team?.name}</h4>
                <p>-</p>
                <p className="text-neutral">{team?.designation}</p>
              </div>

              <div className="mt-6 text-[15px] text-neutral">
                {team?.description && parse(team?.description)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
