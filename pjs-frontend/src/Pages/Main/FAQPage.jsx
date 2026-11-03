import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useGetAllFAQQuery } from "../../Redux/FAQ/faqApi";

export default function FAQPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data } = useGetAllFAQQuery();
  const faqs = data?.data;

  const [toggleFAQ, setToggleFAQ] = useState(null);

  const handelToggleFAQ = (i) => {
    if (toggleFAQ === i) {
      return setToggleFAQ(null);
    }
    setToggleFAQ(i);
  };

  return (
    <section className="min-h-[60vh] py-10">
      <div className="container">
        <h2 className="text-center text-6xl">FAQ</h2>

        <div className="mx-auto mt-6 sm:w-2/3">
          {faqs?.map((faq, i) => (
            <div key={i} className="mb-2">
              <button
                onClick={() => handelToggleFAQ(i)}
                className="flex w-full items-center justify-between rounded bg-primary p-4 text-start text-sm font-semibold text-base-100 sm:text-base"
              >
                <p>{faq?.question}</p>
                <span>
                  {toggleFAQ === i && "activeFAQ" ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </span>
              </button>

              {/* Content/Ans */}
              <div
                className={`faq-content text-neutral-content duration-500 ${
                  toggleFAQ === i && "activeFAQ"
                }`}
              >
                <p className="p-3 pb-5 text-sm sm:text-base">{faq?.ans}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
