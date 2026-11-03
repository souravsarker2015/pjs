import { useState, useRef, useEffect } from "react";
import ReactImageUploading from "react-images-uploading";
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import JoditEditor from "jodit-react";
import {
  useEditTeamMutation,
  useGetSingleTeamQuery,
} from "../../../Redux/teamApi";

export default function EditTeam() {
  const editor = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState("");

  const { data, isLoading } = useGetSingleTeamQuery(id);
  const service = data?.data;

  useEffect(() => {
    if (service) {
      setDescription(service?.description);
    }
  }, [service]);

  const [editTeam, { isLoading: editLoading }] = useEditTeamMutation();

  const handleEdit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const designation = e.target.designation.value;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("designation", designation);
    formData.append("description", description);
    if (images?.length > 0) {
      formData.append("image", images[0].file);
    }

    const res = await editTeam({ id, formData });
    if (res?.data?.success) {
      toast.success("Team edited successfully");
      e.target.reset();
      setImages([]);
      navigate("/admin/team/all");
    } else {
      toast.error(res?.data?.message || "Something went wrong!");
      console.log(res);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>Edit Team</h3>
      </div>

      <form onSubmit={handleEdit} className="p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div>
              <p className="mb-1">Image</p>
              <ReactImageUploading
                defaultValue={images}
                onChange={(icn) => setImages(icn)}
                dataURLKey="data_url"
              >
                {({ onImageUpload, onImageRemove, dragProps }) => (
                  <div
                    className="items-center gap-10 rounded border border-dashed p-4 md:flex"
                    {...dragProps}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        onClick={onImageUpload}
                        className="w-max cursor-pointer rounded-2xl bg-primary px-4 py-1.5 text-sm text-base-100"
                      >
                        Choose Image
                      </span>

                      <p className="text-neutral-content">or Drop here</p>
                    </div>

                    <div className={`${images?.length > 0 && "mt-4"} `}>
                      {images?.map((img, index) => (
                        <div key={index} className="image-item relative">
                          <img
                            src={img["data_url"]}
                            alt="team"
                            className="h-20 w-32"
                            loading="lazy"
                          />
                          <div
                            onClick={() => onImageRemove(index)}
                            className="absolute right-0 top-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary text-base-100"
                          >
                            <AiFillDelete />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </ReactImageUploading>
            </div>
            <div className="mt-4">
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${service?.image}`}
                alt={service?.name}
                className="h-20 w-40"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1">Name</p>
            <input type="text" name="name" defaultValue={service?.name} />
          </div>

          <div>
            <p className="mb-1">Designation</p>
            <input
              type="text"
              name="designation"
              defaultValue={service?.designation}
            />
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-1">Description</p>
          <JoditEditor
            ref={editor}
            value={description}
            tabIndex={1}
            onBlur={(newContent) => setDescription(newContent)}
          />
        </div>

        <div className="mt-5">
          <div className="flex items-center gap-2">
            <Link
              to="/admin/services"
              className="rounded border bg-gray-600 px-6 py-2 text-base-100"
            >
              Cancel
            </Link>
            <button disabled={editLoading && "disabled"} className="admin_btn">
              {editLoading ? "Loading..." : "Edit Team"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
