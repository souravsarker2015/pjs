import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useAddFAQMutation,
  useGetSingleFAQQuery,
  useUpdateFAQMutation,
} from "../../../../Redux/FAQ/faqApi";

export default function EditFAQ() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data } = useGetSingleFAQQuery(id);
  const faq = data?.data;

  const [updateFAQ, { isLoading }] = useUpdateFAQMutation();

  const handleEdit = async (e) => {
    e.preventDefault();
    const question = e.target.question.value;
    const ans = e.target.ans.value;

    const data = {
      question,
      ans,
    };

    try {
      const res = await updateFAQ({ id, data });
      if (res?.data?.success) {
        Swal.fire("", "FAQ edit successfully", "success");
        e.target.reset();
        navigate("/admin/faq/all");
      } else {
        Swal.fire("", res?.data?.message || "Something went wrong!", "error");
        console.log(res);
      }
    } catch (error) {
      Swal.fire("", "Something went wrong!", "error");
      console.log(error);
    }
  };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>Add FAQ</h3>
      </div>

      <form className="p-4" onSubmit={handleEdit}>
        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-1">Question</p>
            <input
              type="text"
              name="question"
              required
              defaultValue={faq?.question}
            />
          </div>

          <div>
            <p className="mb-1">Ans</p>
            <textarea
              name="ans"
              required
              rows={6}
              defaultValue={faq?.ans}
            ></textarea>
          </div>
        </div>

        <div className="mt-6">
          <button className="admin_btn" disabled={isLoading}>
            {isLoading ? "Editing..." : "Edit FAQ"}
          </button>
        </div>
      </form>
    </section>
  );
}
