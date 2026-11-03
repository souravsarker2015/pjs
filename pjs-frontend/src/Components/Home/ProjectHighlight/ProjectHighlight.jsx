import parser from "html-react-parser";
import { useGetHighlightProjectQuery } from "../../../Redux/highlightProject/highlightProjectApi";

export default function ProjectHighlight() {
  const { data } = useGetHighlightProjectQuery();

  const highlightProject = data?.data;
  const description =
    highlightProject?.description && parser(highlightProject?.description);

  if (!highlightProject) return null;

  return (
    <section className="bg-stone-50 py-10">
      <div className="container">
        <div className="grid items-center gap-4 md:grid-cols-2 md:gap-10">
          <div data-aos="fade-down">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${highlightProject?.image}`}
              alt="project"
              className="rounded"
            />
          </div>

          <div data-aos="fade-up">
            <h2 className="text-4xl font-medium uppercase text-neutral md:text-6xl">
              {highlightProject?.title}
            </h2>

            <div className="mt-1.5 text-[8px] text-neutral-content md:mt-3 md:text-[15px]">
              {description}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
