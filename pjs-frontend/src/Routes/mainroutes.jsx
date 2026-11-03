import { lazy, Suspense } from "react";
import MainLayout from "../Layout/MainLayout";
import Spinner from "../Components/Spinner/Spinner";
import Home from "../Pages/Main/Home/Home";
import Teams from "../Pages/Main/Team/Teams";
import Clients from "../Pages/Main/Clients/Clients";
import Projects from "../Pages/Main/Projects/Projects";

// Lazy loading the components
const FAQPage = lazy(() => import("../Pages/Main/FAQPage"));
const ServicesPage = lazy(() => import("../Pages/Main/ServicesPage"));
const Aboutus = lazy(() => import("../Pages/Main/Aboutus/Aboutus"));
const Contactus = lazy(() => import("../Pages/Main/Contactus/Contactus"));

const ServiceDetails = lazy(() => import("../Pages/Main/ServiceDetails"));
const PrivacyPolicy = lazy(() => import("../Pages/Main/PrivacyPolicy"));

export const mainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/services",
      element: (
        <Suspense fallback={<Spinner />}>
          <ServicesPage />
        </Suspense>
      ),
    },
    {
      path: "/service/:id",
      element: (
        <Suspense fallback={<Spinner />}>
          <ServiceDetails />
        </Suspense>
      ),
    },
    {
      path: "/about-us",
      element: (
        <Suspense fallback={<Spinner />}>
          <Aboutus />
        </Suspense>
      ),
    },
    {
      path: "/contact-us",
      element: (
        <Suspense fallback={<Spinner />}>
          <Contactus />
        </Suspense>
      ),
    },
    {
      path: "/clients",
      element: (
        <Suspense fallback={<Spinner />}>
          <Clients />
        </Suspense>
      ),
    },
    {
      path: "/projects",
      element: (
        <Suspense fallback={<Spinner />}>
          <Projects />
        </Suspense>
      ),
    },
    {
      path: "/faq",
      element: (
        <Suspense fallback={<Spinner />}>
          <FAQPage />
        </Suspense>
      ),
    },
    {
      path: "/privacy-policy",
      element: (
        <Suspense fallback={<Spinner />}>
          <PrivacyPolicy />
        </Suspense>
      ),
    },
    {
      path: "/our-team",
      element: (
        <Suspense fallback={<Spinner />}>
          <Teams />
        </Suspense>
      ),
    },
  ],
};
