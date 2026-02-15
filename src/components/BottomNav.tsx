import { useLocation, Link } from "react-router";

const BottomNav = () => {
  const location = useLocation();
  const activeTab = location.pathname;


  return (
    <nav className="bottom-0 left-0 right-0 bg-blue-500 shadow-lg rounded-t-xl ">
      <div className="flex justify-around items-center h-16 px-4">


        <Link
          to="/"
          className={`flex flex-col items-center ${activeTab === "/" ? "text-white" : "text-black"
            }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <p>Accueil</p>
        </Link>


        <Link
          to="/documents"
          className={`flex flex-col items-center ${activeTab === "/documents" ? "text-white" : "text-black"
            }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
            <path d="M14 3v5h5M16 13H8M16 17H8M10 9H8" />
          </svg>
          <p>Documents</p>
        </Link>


        <Link
          to="/messagerie"
          className={`flex flex-col items-center ${activeTab === "/messagerie" ? "text-white" : "text-black"
            }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
          <p>Messagerie</p>
        </Link>


        <Link
          to="/settings"
          className={`flex flex-col items-center ${activeTab === "/profil" ? "text-white" : "text-black"
            }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <p>Mon profil</p>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;