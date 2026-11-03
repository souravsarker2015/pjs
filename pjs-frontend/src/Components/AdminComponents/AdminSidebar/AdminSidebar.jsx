import { BsMicrosoftTeams } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { FaPager } from "react-icons/fa";
import { ImSortNumbericDesc } from "react-icons/im";
import { AiOutlineProject } from "react-icons/ai";
import { MdDesignServices } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  MdMonitor,
  MdOutlineDashboard,
  MdContactPhone,
  MdOutlinePrivacyTip,
} from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { RiAdminFill, RiBarChartHorizontalFill } from "react-icons/ri";
import { FaChartLine } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { CiMail } from "react-icons/ci";

import SidebarItems from "./SidebarItems";
import { useGetLogosQuery } from "../../../Redux/logo/logoApi";

const adminSidebarItems = [
  {
    icon: <MdOutlineDashboard />,
    title: "Dashbaord",
    path: "/admin/dashboard",
  },

  {
    icon: <MdDesignServices />,
    title: "Service",
    subMenu: [
      {
        title: "Services",
        path: "/admin/service/all",
      },
      {
        title: "Gallery",
        path: "/admin/service/gallery/all",
      },
    ],
  },
  {
    icon: <AiOutlineProject />,
    title: "Project",
    subMenu: [
      {
        title: "Feature Projects",
        path: "/admin/feature-project/all",
      },
      {
        title: "Highlight Project",
        path: "/admin/highlight-project",
      },
    ],
  },

  {
    icon: <RiBarChartHorizontalFill />,
    title: "Why Choose Us",
    subMenu: [
      {
        title: "Why Choose Us Section",
        path: "/admin/whyChoose/section",
      },
      {
        title: "Why Choose Us Cards",
        path: "/admin/whyChoose/cards/all",
      },
    ],
  },

  {
    icon: <ImSortNumbericDesc />,
    title: "Counter",
    path: "/admin/counter",
  },

  {
    icon: <BsMicrosoftTeams />,
    title: "Teams",
    path: "/admin/team/all",
  },

  {
    icon: <FaUsers />,
    title: "Clients",
    path: "/admin/client/all",
  },

  {
    icon: <FaPager />,
    title: "Pages",
    subMenu: [
      {
        icon: <FcAbout />,
        title: "About Us",
        path: "/admin/about-us",
      },
      {
        icon: <MdContactPhone />,
        title: "Contact Us",
        path: "/admin/contact-us",
      },
      {
        icon: <MdContactPhone />,
        title: "FAQ",
        path: "/admin/faq/all",
      },
      {
        icon: <MdOutlinePrivacyTip />,
        title: "Privacy Policy",
        path: "/admin/privacy-policy",
      },
    ],
  },

  {
    icon: <CiMail />,
    title: "Client Message",
    path: "/admin/contact-msg",
  },

  {
    icon: <RiAdminFill />,
    title: "Administrator",
    path: "/admin/administrator/all",
  },

  {
    icon: <MdMonitor />,
    title: "Front-End Setting",
    subMenu: [
      {
        title: "Logo",
        path: "/admin/front-end/logo",
      },
      {
        title: "Favicon",
        path: "/admin/front-end/favicon",
      },
      {
        title: "Banner",
        path: "/admin/front-end/banner/all",
      },
    ],
  },

  {
    icon: <IoMdSettings />,
    title: "General Setting",
    subMenu: [
      {
        title: "Business Info",
        path: "/admin/general-setting/business-info",
      },
    ],
  },

  {
    icon: <FaChartLine />,
    title: "SEO Setting",
    path: "/admin/seo",
  },
];

export default function AdminSidebar() {
  const { data } = useGetLogosQuery();
  const logo = data?.data;

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <nav className="admin_siderbar">
          <Link to="/admin/dashboard" className="block py-3">
            <img
              className="mx-auto w-3/5"
              src={`${import.meta.env.VITE_BACKEND_URL}/${logo?.logo}`}
              alt="Logo"
            />
          </Link>

          <ul>
            {adminSidebarItems?.map((item, i) => (
              <SidebarItems item={item} key={i} />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
