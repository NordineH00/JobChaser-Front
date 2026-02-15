import { useNavigate } from "react-router";
import type { Company } from "../../interfaces/companies.interface";

type CompaniesCardProps = {
  company: Company;
};

export function CompaniesCard({ company }: CompaniesCardProps) {
  const navigate = useNavigate();
  const { address } = company;
  if (!company) return;

  return (

    <button className="border rounded-lg p-4 mt-3  w-full text-center bg-white shadow transition-transform duration-200 hover:scale-110" onClick={() => navigate(`/companies/${company.id}`)}>
      <h3 className="font-bold text-lg text-black">{company.name}</h3>
      <p className="text-gray-600">
        {address ? `${address.streetNumber}, ${address.streetName} ${address.zipCode} ${address.city} ${address.country}` : "Pas d'adresse"}
      </p>
      <p className="text-sm text-gray-500">Remarque: {company.comment}</p>

    </button>
  )
};