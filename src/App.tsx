import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import { useAuthStore } from "./stores/auth.store";

import Navbar from "./components/NavBar";
import BottomNav from "./components/BottomNav";
import RequireAuth from "./routes/RequireAuth";

import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import LostPassword from "./pages/LostPassword";
import ResetPassword from "./pages/ResetPassword";
import ConfirmInscription from "./pages/ConfirmInscription";

import Documents from "./pages/Documents";
import Resumes from "./pages/Resumes";
import CoverLetters from "./pages/CoverLetters";
import OtherDocuments from "./pages/OtherDocuments";
import CreateTemplate from "./pages/CreateTemplate";
import CreateDocument from "./pages/CreateDocument";

import Applications from "./pages/Applications";
import DetailApplication from "./pages/DetailApplication";
import CreateApplication from "./pages/CreateApplication";

import Companies from "./pages/Companies";
import DetailCompanies from "./pages/DetailCompanies";
import CreateCompany from "./pages/CreateCompany";

import Events from "./pages/Events";
import DetailEvent from "./pages/detailEvent/DetailEvent";

import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";
import Page404 from "./pages/Page404";

export default function App() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // Hydratation simple, compatible toutes versions Zustand
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // micro-retard pour laisser Zustand hydrater depuis localStorage
    const t = setTimeout(() => {
      setHydrated(true);
    }, 0);

    return () => clearTimeout(t);
  }, []);

  // tant que Zustand n’est pas prêt : écran neutre (pas de boucle)
  if (!hydrated) {
    return <div className="w-full h-screen bg-white"></div>;
  }

  return (
    <div className="min-h-dvh flex flex-col w-full">
      <div className="hidden md:block shrink-0">
        {isAuthenticated ? <Navbar /> : null}
      </div>

      <main className="flex-1 w-full">
        <div className="p-4">
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/register" element={<ConfirmInscription />} />
            <Route path="/lost-password" element={<LostPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Private */}
            <Route element={<RequireAuth />}>
              <Route path="/documents" element={<Documents />} />
              <Route path="/resumes" element={<Resumes />} />
              <Route path="/cover-letters" element={<CoverLetters />} />
              <Route path="/other-documents" element={<OtherDocuments />} />
              <Route path="/templates" element={<CreateTemplate />} />

              <Route path="/resume-creation" element={<CreateDocument type="cv" />} />
              <Route path="/letter-creation" element={<CreateDocument type="lettre" />} />
              <Route path="/other-creation" element={<CreateDocument type="autre" />} />

              <Route path="/applications" element={<Applications />} />
              <Route path="/applications/:id" element={<DetailApplication />} />
              <Route path="/application-creation" element={<CreateApplication />} />

              <Route path="/companies" element={<Companies />} />
              <Route path="/companies/:id" element={<DetailCompanies />} />
              <Route path="/companies-creation" element={<CreateCompany />} />

              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<DetailEvent />} />
              <Route path="/events-creation" element={<CreateCompany />} />

              <Route path="/calendar" element={<Calendar />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </main>

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 w-full md:hidden z-10">
        {isAuthenticated ? <BottomNav /> : null}
      </div>
    </div>
  );
}
