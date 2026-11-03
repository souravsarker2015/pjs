import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { mainRoutes } from "./Routes/mainroutes";
import { adminRoutes } from "./Routes/adminroutes";
import { commonRoute } from "./Routes/commonRoute";
import useAuthCheck from "./Hook/useAuthCheck";
import { useGetFaviconsQuery } from "./Redux/favicon/faviconApi";
import { useGetSEOQuery } from "./Redux/seo/seoApi";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const router = createBrowserRouter([mainRoutes, adminRoutes, commonRoute]);

function App() {
  useAuthCheck();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const { data: favicon } = useGetFaviconsQuery();
  const icon = favicon?.data?.icon;

  const { data: seoData } = useGetSEOQuery();
  const seo = seoData?.data;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{seo?.title}</title>
        <link
          rel="icon"
          type="image/svg+xml"
          href={`${import.meta.env.VITE_BACKEND_URL}/${icon}`}
        />
        <meta name="description" content={seo?.description} />
        <meta name="keywords" content={seo?.keywords} />
        <meta name="author" content={seo?.author} />
      </Helmet>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
}

export default App;
