import { useNavigate } from "react-router";
import type { Application } from "../../interfaces/applications.interface";
import { useCompStore } from "../../stores/company.store";
import type { ApplicationStatus } from "../../interfaces/status.interface";
import { statusStyles } from "../../style/status.style";

export const ApplicationCard = ({ application }: { application: Application }) => {
  const navigate = useNavigate();
  const companys = useCompStore((state) => state.comps)
  const company = companys?.find((comp) => comp.id === application.companyId)

  return (

    <button className="border rounded-lg p-4 mt-3  w-full text-center bg-white shadow transition-transform duration-200 hover:scale-110"
      onClick={() => navigate(`/applications/${application.id}`)}>
      <h3 className="font-bold text-lg text-black">{application.jobTitle}</h3>
      <p className="text-gray-600">{company?.name}</p>
      <p className="text-sm text-gray-500">Remarque: {application.observation}</p>
      <span className={`inline-block mt-2 px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[application.appStatus as ApplicationStatus]}`}>
        {application.appStatus}
      </span>
    </button>
  )
};