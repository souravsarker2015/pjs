import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useGetAllServiceQuery } from "../../../../Redux/service/serviceApi";
import { useAddGalleryMutation } from "../../../../Redux/service/galleryApi";

export default function AddGallery() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const { data } = useGetAllServiceQuery();
  const services = data?.data;

  const [addGallery, { isLoading }] = useAddGalleryMutation();

  const handleAdd = async (e) => {
    e.preventDefault();

    const serviceId = e.target.service.value;

    const formData = new FormData();
    images?.map((img) => formData.append("image", img.file));
    formData.append("service", serviceId);

    try {
      const res = await addGallery(formData);

      if (res?.data?.success) {
        setImages([]);
        Swal.fire("", "Gallery added successfully", "success");
        navigate("/admin/service/gallery/all");
      } else {
        Swal.fire("", res?.data?.message || "Something went wrong!", "error");
        console.log(res);
      }
    } catch (error) {
      console.error(error);
      Swal.fire("", error.message || "Something went wrong!", "error");
    }
  };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="border-b p-4">
        <h3 className="font-medium text-neutral">Gallery</h3>
      </div>

      <form onSubmit={handleAdd} className="p-4">
        <div className="flex flex-col gap-3">
          <div className="sm:w-96">
            <p className="mb-1">Service</p>
            <select name="service">
              {services?.map((service) => (
                <option key={service?._id} value={service?._id}>
                  {service?.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="mb-1">Images</p>
            <div>
              <ImageUploading
                value={images}
                onChange={(image) => setImages(image)}
                dataURLKey="data_url"
                multiple
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

                    <div
                      className={`${images?.length > 0 && "mt-4 flex flex-wrap gap-4"} `}
                    >
                      {images?.map((img, index) => (
                        <div key={index} className="image-item relative">
                          <img
                            src={img["data_url"]}
                            alt="gallery"
                            className="h-20 w-20 rounded"
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

        <div className="mt-6">
          <button disabled={isLoading} className="admin_btn">
            {isLoading ? "Loading.." : "Add"}
          </button>
        </div>
      </form>
    </section>
  );
}
