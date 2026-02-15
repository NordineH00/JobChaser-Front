import { Link } from "react-router";

export default function Documents() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0">
        <div className="p-6 space-y-6 md:space-y-8 sm:p-8">
          <h1 className="text-2xl font-bold text-center text-gray-900">
            Mes Documents
          </h1>

          <div className="flex flex-col gap-4">
            <Link
              to="/resumes"
              className="w-full text-center text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 transition"
            >
              Mes CV
            </Link>

            <Link
              to="/cover-letters"
              className="w-full text-center text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 transition"
            >
              Mes lettres
            </Link>

            <Link
              to="/other-documents"
              className="w-full text-center text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 transition"
            >
              Autres documents
            </Link>
            <Link
              to="/templates"
              className="w-full text-center text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 transition"
            >
              Templates
            </Link>
          </div>

          <p className="text-sm text-center text-gray-500">
            Gérez facilement tous vos documents personnels.
          </p>
        </div>
      </div>
    </div>
  );
}
