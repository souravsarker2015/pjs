import { Link } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import {
  useDeleteTeamMutation,
  useGetTeamsQuery,
} from "../../../Redux/teamApi";

export default function AllTeam() {
  const { data, isLoading } = useGetTeamsQuery();
  const teams = data?.data;

  const [deleteTeam] = useDeleteTeamMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure delete this team?");
    if (isConfirm) {
      try {
        const res = await deleteTeam(id);
        if (res?.data?.success) {
          toast.success("Team deleted successfully");
        } else {
          toast.error(res?.data?.message || "Something went wrong!");
          console.log(res);
        }
      } catch (error) {
        toast.error(error?.message);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <section>
      <div className="rounded border-b bg-base-100 p-4 shadow">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-neutral">All Teams</h3>
          <Link to="/admin/team/add" className="admin_btn">
            Add Team
          </Link>
        </div>
      </div>

      <div className="relative mt-2 overflow-x-auto rounded bg-base-100 shadow">
        <table>
          <thead>
            <tr>
              <th>Sl</th>
              <th>Image</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {teams?.map((team, i) => (
              <tr key={team?._id}>
                <td>{i + 1}</td>
                <td>
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${team?.image}`}
                    alt="team"
                    className="h-10 w-20"
                    loading="lazy"
                  />
                </td>
                <td>{team?.name}</td>
                <td>{team?.designation}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/team/edit/${team?._id}`}>
                      <FaRegEdit className="text-base duration-200 hover:text-green-500" />
                    </Link>
                    <button onClick={() => handleDelete(team?._id)}>
                      <AiOutlineDelete className="text-lg duration-200 hover:text-red-500" />
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
