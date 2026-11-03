import { useGetPrivacyQuery } from "../../Redux/privacy/privacyApi";
import parser from "html-react-parser";

export default function PrivacyPolicy() {
  window.scrollTo(0, 0);
  const { data } = useGetPrivacyQuery();
  const privacy = data?.data;

  return (
    <section className="min-h-[60vh] py-10">
      <div className="container">
        <h2 className="mb-6 text-center text-4xl font-medium text-primary sm:text-5xl">
          Privacy Policy
        </h2>
        {privacy?.description && parser(privacy?.description)}
      </div>
    </section>
  );
}
