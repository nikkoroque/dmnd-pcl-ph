import Faq from "@/app/components/app-faq";
import AppFooter from "@/app/components/app-footer";
import AppNavbar from "@/app/components/app-navbar";
import ProductsView from "@/app/pages/lab-diamonds/page";
export default function Home() {
  return (
    <>
      <AppNavbar />
      <ProductsView />
      <Faq />
      <AppFooter />
    </>
  );
}
