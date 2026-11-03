import { BsTwitter } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetContactsQuery } from "../../Redux/contact/contactApi";

export default function SidebarMenu({ showSidebar, setShowSidebar }) {
  const { data } = useGetContactsQuery();
  const contact = data?.data;

  return (
    <div
      className={`sidebar_menu flex flex-col justify-between ${showSidebar && "active"}`}
    >
      <div>
        <div className="flex justify-end">
          <button
            onClick={() => setShowSidebar(false)}
            className="header_menu_btn"
          >
            <MdOutlineClose />
          </button>
        </div>

        <div className={`mt-6 ${showSidebar && "fade_left_animation"}`}>
          <ul className="flex flex-col gap-3 text-lg">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
            <li>
              <Link to="/contact-us">Contact Us</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
          </ul>
        </div>
      </div>

      <div
        className={`flex items-center gap-4 ${showSidebar && "fade-up-animation"}`}
      >
        <Link
          to={contact?.facebookLink}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral/90 text-lg text-base-100 duration-300 hover:bg-primary"
        >
          <FaFacebookF />
        </Link>
        <Link
          to={contact?.linkedinLink}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral/90 text-lg text-base-100 duration-300 hover:bg-primary"
        >
          <FaLinkedinIn />
        </Link>
        <Link
          to={contact?.twitterLink}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral/90 text-lg text-base-100 duration-300 hover:bg-primary"
        >
          <BsTwitter />
        </Link>
        <Link
          to={contact?.youtubeLink}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral/90 text-lg text-base-100 duration-300 hover:bg-primary"
        >
          <FaYoutube />
        </Link>
      </div>
    </div>
  );
}
