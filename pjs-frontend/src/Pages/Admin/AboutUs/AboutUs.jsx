import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import {
  useGetAboutUsQuery,
  useCreateAboutUsMutation,
  useUpdateAboutUsMutation,
} from "../../../Redux/about/aboutApi";

export default function About() {
  const editor = useRef(null);

  const [image, setImage] = useState([]);
  const [heading, setHeading] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [profile, setProfile] = useState("");

  const { data, isLoading: isAboutLoading } = useGetAboutUsQuery();
  const id = data?.data?._id;

  const [createAboutUs, { isLoading: isCreateLoading }] =
    useCreateAboutUsMutation();
  const [updateAboutUs, { isLoading: isUpdateLoading }] =
    useUpdateAboutUsMutation();

  useEffect(() => {
    if (data && data?.data) {
      setHeading(data?.data?.heading);
      setTitle(data?.data?.title);
      setDescription(data?.data?.description);
      setImage([
        { data_url: `${import.meta.env.VITE_BACKEND_URL}${data?.data?.image}` },
      ]);
    }
  }, [data]);

  const handleAbout = async (e) => {
    e.preventDefault();

    const img = image[0]?.file;

    const formData = new FormData();
    formData.append("heading", heading);
    formData.append("title", title);
    formData.append("description", description);

    if (img) formData.append("image", img);
    if (profile) formData.append("profileDoc", profile);

    try {
      if (id) {
        const res = await updateAboutUs({ id, formData });
        if (res?.data?.success) {
          Swal.fire("", "Updated successfully", "success");
        } else {
          Swal.fire("", res?.data?.message || "Operation failed", "error");
          console.log(res);
        }
      } else {
        const res = await createAboutUs(formData);
        if (res?.data?.success) {
          Swal.fire("", "Created successfully", "success");
        } else {
          Swal.fire("", res?.data?.message || "Operation failed", "error");
          console.log(res);
        }
      }
    } catch (error) {
      Swal.fire("", error?.data?.message || "Operation failed", "error");
      console.log(error);
    }
  };

  if (isAboutLoading) return <p>Loading...</p>;

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="border-b p-4">
        <h3 className="font-medium text-neutral">About Info</h3>
      </div>

      <form onSubmit={handleAbout} className="p-4">
        <div className="grid items-start gap-4 text-neutral-content sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-1">Heading</p>
              <input
                type="text"
                name="heading"
                className="border"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
              />
            </div>
            <div>
              <p className="mb-1">Title</p>
              <input
                type="text"
                name="title"
                className="border"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <div>
                <p className="mb-1">Image</p>
                <div>
                  <ImageUploading
                    value={image}
                    onChange={(icn) => setImage(icn)}
                    dataURLKey="data_url"
                  >
                    {({ onImageUpload, onImageRemove, dragProps }) => (
                      <div
                        className="rounded border border-dashed p-4"
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

                        <div className={`${image?.length > 0 && "mt-4"} `}>
                          {image?.map((img, index) => (
                            <div key={index} className="image-item relative">
                              <img
                                src={img["data_url"]}
                                alt=""
                                className="h-20 w-20"
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
                  </ImageUploading>
                </div>
              </div>
            </div>

            <div>
              <p className="mb-1">
                Profile - <small>(only pdf)</small>
              </p>
              <input
                type="file"
                name="profile"
                accept="application/pdf"
                onChange={(e) => setProfile(e.target.files[0])}
              />
              {data?.data?.profileDoc && data?.data?.profileDoc}
            </div>
          </div>

          <div className="rounded border md:col-span-2">
            <p className="border-b p-3">Description</p>
            <div className="about_details p-4">
              <JoditEditor
                ref={editor}
                value={description}
                onBlur={(text) => setDescription(text)}
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="admin_btn"
            disabled={isCreateLoading || isUpdateLoading}
          >
            {isCreateLoading || isUpdateLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </section>
  );
}
