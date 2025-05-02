import AppNavbar from "./app-navbar";
import AppFooter from "./app-footer";
import Faq from "./app-faq";

type AppLayoutProps = {
  children: React.ReactNode;
  showFaq?: boolean;
};

export default function AppLayout({ children, showFaq = true }: AppLayoutProps) {
  return (
    <>
      <AppNavbar />
      <main>
        {children}
      </main>
      {showFaq && <Faq />}
      <AppFooter />
    </>
  );
} 