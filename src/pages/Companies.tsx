
import { useNavigate } from "react-router";


import { useEffect, useState } from "react";
import { useSearchStore } from "../stores/search.store";
import { useCompStore } from "../stores/company.store";
import type { Company } from "../interfaces/companies.interface";
import { CompaniesCard } from "../components/Card/CompanieCard";




const Companies = () => {
  const navigate = useNavigate();
  const companies = useCompStore((state) => state.comps)
  if (!companies) return;

  const { query, setQuery, open } = useSearchStore();

  const [searchCompanies, setSearchCompanies] = useState<Company[]>([]);




  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      setSearchCompanies(companies);
      return;
    }
    const filtered = companies.filter((a) =>
      [a.name].some((field) => String(field ?? '').toLowerCase().includes(q))
    );
    setSearchCompanies(filtered);
  }, [query, companies]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim().length > 0) open();
  };

  return (
    <div className="w-full text-center" >
      <div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
            </svg>
          </div>
        </div>
        <input
          id="search"
          name="search"
          value={query}
          onChange={handleChange}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Rechercher une candidature"
          aria-label="Recherche"
          type="search"
        />
      </div>
      <button
        onClick={() => navigate('/companies-creation')}
        className="my-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
      >Ajouter une entreprise</button>
      {searchCompanies.map((company: Company) => <CompaniesCard key={company.id} company={company} />)}
    </div>
  )
}

export default Companies