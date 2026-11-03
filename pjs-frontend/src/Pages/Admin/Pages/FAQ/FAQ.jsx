import { Link } from "react-router-dom";
import {
  useDeleteFAQMutation,
  useGetAllFAQQuery,
} from "../../../../Redux/FAQ/faqApi";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Swal from "sweetalert2";

export default function FAQ() {
  const { data } = useGetAllFAQQuery();
  const faqs = data?.data;

  const [deleteFAQ] = useDeleteFAQMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this FAQ?");
    if (isConfirm) {
      try {
        const res = await deleteFAQ(id);
        if (res?.data?.success) {
          Swal.fire("", "FAQ Deleted Successfully", "success");
        } else {
          Swal.fire("", res?.data?.message || "Something went wrong", "error");
          console.log(res);
        }
      } catch (error) {
        alert("Something went wrong");
        console.log(error);
      }
    }
  };

  return (
    <section>
      <div className="rounded border-b bg-base-100 p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-neutral">All FAQ</h1>
          <Link to="/admin/faq/add" className="admin_btn text-sm">
            Add Faq
          </Link>
        </div>
      </div>

      <div className="relative mt-2 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Question</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {faqs?.map((faq, i) => (
              <tr key={faq?._id}>
                <td>{i + 1}</td>
                <td>{faq?.question}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <Link to={`/admin/faq/edit/${faq?._id}`}>
                      <AiOutlineEdit className="text-lg hover:text-red-500" />
                    </Link>
                    <button onClick={() => handleDelete(faq?._id)}>
                      <AiOutlineDelete className="text-lg hover:text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
