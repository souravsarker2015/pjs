import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import {
  useGetWhychooseByIdQuery,
  useUpdateWhychooseMutation,
} from "../../../Redux/whychoose/whychooseApi";

export default function UpdateWhyChooseCard() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch existing data
  const { data: existingData, isLoading: isFetching, error } = useGetWhychooseByIdQuery(id);

  // Local states
  const [title, setTitle] = useState("");
  const [image, setImage] = useState([]); // For new upload or preview
  const [existingImageUrl, setExistingImageUrl] = useState(""); // Existing image url from backend

  const [updateWhychoose, { isLoading: isUpdating }] = useUpdateWhychooseMutation();

  // When existing data loads, populate fields
  useEffect(() => {
    if (existingData?.success && existingData?.data) {
      setTitle(existingData.data.title || "");
      if (existingData.data.image) {
        // Assuming your backend serves images from a URL like /uploads/whychoose/filename
        setExistingImageUrl(`/uploads/whychoose/${existingData.data.image}`);
      }
    }
  }, [existingData]);

  // Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      return Swal.fire("", "Title is required", "warning");
    }

    const formData = new FormData();
    formData.append("title", title);

    // If user uploads a new image, send it; else, don't send image to keep old one
    if (image.length > 0) {
      formData.append("image", image[0].file);
    }

    try {
      const res = await updateWhychoose({ id, formData }).unwrap();

      if (res?.success) {
        Swal.fire("", "Why Choose card updated successfully!", "success");
        navigate("/admin/whyChoose/cards/all");
      }
    } catch (error) {
      Swal.fire("", error.message || "Something went wrong!", "error");
    }
  };

  // Remove existing image preview if user uploads new image or removes image
  useEffect(() => {
    if (image.length > 0) {
      setExistingImageUrl("");
    }
  }, [image]);

  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>Update Why Choose Card</h3>
      </div>
      <form className="p-4" onSubmit={handleUpdate}>
        <div className="grid items-start gap-4 text-neutral-content sm:grid-cols-2 md:grid-cols-3">
          <div className="text-neutral-content">
            <div>
              <p className="mb-1">Title</p>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
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

                      <div className={`${(image.length > 0 || existingImageUrl) && "mt-4"} `}>
                        {image.length > 0 ? (
                          image.map((img, index) => (
                            <div key={index} className="image-item relative">
                              <img
                                src={img["data_url"]}
                                alt="Selected"
                                className="w-24"
                              />
                              <div
                                onClick={() => onImageRemove(index)}
                                className="absolute right-0 top-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary text-base-100"
                              >
                                <AiFillDelete />
                              </div>
                            </div>
                          ))
                        ) : existingImageUrl ? (
                          <div className="image-item relative">
                            <img
                              src={existingImageUrl}
                              alt="Existing"
                              className="w-24"
                            />
                            <div
                              onClick={() => setExistingImageUrl("")}
                              className="absolute right-0 top-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary text-base-100"
                            >
                              <AiFillDelete />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )}
                </ImageUploading>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button type="submit" className="admin_btn" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Card"}
          </button>
        </div>
      </form>
    </section>
  );
}
