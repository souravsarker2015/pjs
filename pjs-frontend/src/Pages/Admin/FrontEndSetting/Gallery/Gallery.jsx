import { AiFillEdit } from "react-icons/ai";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import {
  useDeleteGalleryByIdMutation,
  useGetGalleryQuery,
} from "../../../../Redux/gallery/galleryApi";
import Spinner from "../../../../Components/Spinner/Spinner";

export default function Gallery() {
  const { data, isLoading, isError, isSuccess } = useGetGalleryQuery();
  const gallery = data?.data;

  const [deleteGallery] = useDeleteGalleryByIdMutation();
  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this product?");
    if (isConfirm) {
      try {
        const res = await deleteGallery(id);
        if (res?.data?.success) {
          Swal.fire("", "Gallery Deleted Successfully", "success");
        }
      } catch (error) {
        Swal.fire("", "Something went wrong", "error");
      }
    }
  };

  let content = null;
  if (isLoading) return (content = <Spinner />);

  if (isError) {
    content = (
      <p className="mt-5 text-red-500">Something went wrong to get data!</p>
    );
  }

  if (!isError && isSuccess) {
    content = (
      <tbody>
        {gallery?.map((gallery, i) => (
          <tr key={gallery?._id}>
            <td>{i + 1}</td>
            <td>
              <div className="flex -space-x-4 rtl:space-x-reverse">
                {gallery?.images?.map((img, i) => (
                  <img
                    key={i}
                    className="obejct-cover h-10 w-10 rounded-full border-2 border-base-100"
                    src={`${import.meta.env.VITE_BACKEND_URL}/${img}`}
                    alt="gallery"
                  />
                ))}
              </div>
            </td>
            <td>{gallery?.service?.title}</td>
            <td>
              <div className="flex items-center gap-3">
                <Link
                  to={`/admin/service/gallery/edit/${gallery?._id}`}
                  className="text-lg hover:text-green-500"
                >
                  <AiFillEdit />
                </Link>

                <button onClick={() => handleDelete(gallery?._id)}>
                  <AiOutlineDelete className="text-lg hover:text-red-500" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  return (
    <section>
      <div className="rounded border-b bg-base-100 p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-neutral">Gallery</h1>
          <Link to="/admin/service/gallery/add" className="admin_btn text-sm">
            Add Gallery
          </Link>
        </div>
      </div>

      <div className="relative mt-2 overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Image</th>
              <th>Service</th>
              <th>Action</th>
            </tr>
          </thead>
          {content}
        </table>
      </div>
    </section>
  );
}
