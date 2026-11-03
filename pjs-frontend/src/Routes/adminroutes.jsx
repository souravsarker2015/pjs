import { lazy, Suspense } from "react";
import AdminLayout from "../Layout/AdminLayout";
import Spinner from "../Components/Spinner/Spinner";
import AllTeam from "../Pages/Admin/Team/AllTeam";
import AddTeam from "../Pages/Admin/Team/AddTeam";
import EditTeam from "../Pages/Admin/Team/EditTeam";
import UpdateWhyChooseCard from "../Pages/Admin/WhyChoose/UpdateWhyChooseCard";

// Lazy loading the components
const AdminRoute = lazy(() => import("../AdminRoute/AdminRoute"));

//---------------service
const AllServices = lazy(
  () => import("../Pages/Admin/Service/Services/AllServices"),
);
const AddService = lazy(
  () => import("../Pages/Admin/Service/Services/AddService"),
);
const EditService = lazy(
  () => import("../Pages/Admin/Service/Services/EditService"),
);

const Gallery = lazy(
  () => import("../Pages/Admin/FrontEndSetting/Gallery/Gallery"),
);
const AddGallery = lazy(
  () => import("../Pages/Admin/FrontEndSetting/Gallery/AddGallery"),
);
const EditGallery = lazy(
  () => import("../Pages/Admin/FrontEndSetting/Gallery/EditGallery"),
);

const Counter = lazy(() => import("../Pages/Admin/Counter/Counter"));

//---------------project
const FeaturesProjectList = lazy(
  () => import("../Pages/Admin/Project/FeaturesProject/FeaturesProjectList"),
);
const AddFeaturesProject = lazy(
  () => import("../Pages/Admin/Project/FeaturesProject/AddFeaturesProject"),
);
const EditFeaturesProject = lazy(
  () => import("../Pages/Admin/Project/FeaturesProject/EditFeaturesProject"),
);
const HighlightProject = lazy(
  () => import("../Pages/Admin/Project/HighlightProject/HighlightProject"),
);

//------------pages
const About = lazy(() => import("../Pages/Admin/AboutUs/AboutUs"));
const ContactUs = lazy(() => import("../Pages/Admin/ContactUs/ContactUs"));
const PrivacyPolicy = lazy(
  () => import("../Pages/Admin/PrivacyPolicy/PrivacyPolicy"),
);

const AddAdministrator = lazy(
  () => import("../Pages/Admin/Administrator/AddAdministrator"),
);
const Administrator = lazy(
  () => import("../Pages/Admin/Administrator/Administrator"),
);
const Dashboard = lazy(() => import("../Pages/Admin/Dashboard/Dashboard"));

const BusinessInfo = lazy(
  () => import("../Pages/Admin/GeneralSetting/BusinessInfo/BusinessInfo"),
);

const WhyChooseSection = lazy(
  () => import("../Pages/Admin/WhyChoose/WhyChooseSection"),
);
const WhyChooseCards = lazy(
  () => import("../Pages/Admin/WhyChoose/WhyChooseCards"),
);
const AddWhyChooseCard = lazy(
  () => import("../Pages/Admin/WhyChoose/AddWhyChooseCard"),
);

const ContactMsgList = lazy(
  () => import("../Pages/Admin/ContactMsg/ContactMsgList"),
);
const ContactMsgDetail = lazy(
  () => import("../Pages/Admin/ContactMsg/ContactMsgDetail"),
);

//----------Frontend
const Favicon = lazy(
  () => import("../Pages/Admin/FrontEndSetting/Favicon/Favicon"),
);
const Logo = lazy(() => import("../Pages/Admin/FrontEndSetting/Logo/Logo"));

const AllBanner = lazy(
  () => import("../Pages/Admin/FrontEndSetting/Banner/AllBanner"),
);
const AddBanner = lazy(
  () => import("../Pages/Admin/FrontEndSetting/Banner/AddBanner"),
);
const EditBanner = lazy(
  () => import("../Pages/Admin/FrontEndSetting/Banner/EditBanner"),
);
const FAQ = lazy(() => import("../Pages/Admin/Pages/FAQ/FAQ"));
const AddFAQ = lazy(() => import("../Pages/Admin/Pages/FAQ/AddFAQ"));
const EditFAQ = lazy(() => import("../Pages/Admin/Pages/FAQ/EditFAQ"));
const AllClients = lazy(() => import("../Pages/Admin/Clients/AllClients"));
const AddClient = lazy(() => import("../Pages/Admin/Clients/AddClient"));

const SEO = lazy(() => import("../Pages/Admin/SEO/SEO"));

export const adminRoutes = {
  path: "/admin",
  element: (
    <Suspense fallback={<Spinner />}>
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    </Suspense>
  ),
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },

    //-------------service routes
    {
      path: "service/all",
      element: <AllServices />,
    },
    {
      path: "service/add",
      element: <AddService />,
    },
    {
      path: "service/edit/:id",
      element: <EditService />,
    },

    {
      path: "service/gallery/ALL",
      element: <Gallery />,
    },
    {
      path: "service/gallery/add",
      element: <AddGallery />,
    },
    {
      path: "service/gallery/edit/:id",
      element: <EditGallery />,
    },

    //-------------project routes
    {
      path: "feature-project/all",
      element: <FeaturesProjectList />,
    },
    {
      path: "feature-project/add",
      element: <AddFeaturesProject />,
    },
    {
      path: "feature-project/edit/:id",
      element: <EditFeaturesProject />,
    },
    {
      path: "highlight-project",
      element: <HighlightProject />,
    },

    //----counter routes
    {
      path: "counter",
      element: <Counter />,
    },

    //----Client routes
    {
      path: "client/all",
      element: <AllClients />,
    },
    {
      path: "client/add",
      element: <AddClient />,
    },

    //--------pages
    {
      path: "faq/all",
      element: <FAQ />,
    },
    {
      path: "faq/add",
      element: <AddFAQ />,
    },
    {
      path: "faq/edit/:id",
      element: <EditFAQ />,
    },

    // ----front-end
    {
      path: "front-end/banner/all",
      element: <AllBanner />,
    },
    {
      path: "front-end/banner/add",
      element: <AddBanner />,
    },
    {
      path: "front-end/banner/edit/:id",
      element: <EditBanner />,
    },

    {
      path: "front-end/favicon",
      element: <Favicon />,
    },
    {
      path: "front-end/logo",
      element: <Logo />,
    },

    {
      path: "general-setting/business-info",
      element: <BusinessInfo />,
    },
    {
      path: "seo",
      element: <SEO />,
    },
    {
      path: "privacy-policy",
      element: <PrivacyPolicy />,
    },
    {
      path: "administrator/all",
      element: <Administrator />,
    },
    {
      path: "administrator/add",
      element: <AddAdministrator />,
    },
    {
      path: "about-us",
      element: <About />,
    },

    {
      path: "contact-us",
      element: <ContactUs />,
    },
    {
      path: "contact-msg",
      element: <ContactMsgList />,
    },
    {
      path: "contact-msg/:id",
      element: <ContactMsgDetail />,
    },
    {
      path: "whyChoose/section",
      element: <WhyChooseSection />,
    },
    {
      path: "whyChoose/cards/all",
      element: <WhyChooseCards />,
    },
    {
      path: "whyChoose/cards/add",
      element: <AddWhyChooseCard />,
    },
    {
      path: "whyChoose/cards/update/:id",
      element: <UpdateWhyChooseCard />,
    },
    // -----Team
    {
      path: "team/all",
      element: <AllTeam />,
    },
    {
      path: "team/add",
      element: <AddTeam />,
    },
    {
      path: "team/edit/:id",
      element: <EditTeam />,
    },
  ],
};
