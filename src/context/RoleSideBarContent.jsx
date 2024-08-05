import { createContext ,useContext} from "react";
import { useUser } from "../features/authentication/useUser";
import { HiHome } from "react-icons/hi2";
import { PiCertificate, PiStudentDuotone } from "react-icons/pi";
import { TbReportAnalytics } from "react-icons/tb";
import { MdDisplaySettings } from "react-icons/md";
import { TfiTimer } from "react-icons/tfi";
import { HiDocumentAdd } from "react-icons/hi";
import Spinner from "../ui/Spinner";

const RoleContext = createContext();
const linkArr = [
  { label: "home", icon: HiHome, role: "all" },
  { label: "session", icon: TfiTimer, role: "office" },
  { label: "enrollment", icon: HiDocumentAdd, role: "office" },
  { label: "student", icon: PiStudentDuotone, role: "office" },
  { label: "report", icon: TbReportAnalytics, role: "office" },
  { label: "enrollments", icon: HiDocumentAdd, role: "madam" },
  { label: "settings", icon: MdDisplaySettings, role: "all" },
  { label: "certificate", icon: PiCertificate, role: "cert" },
];
export default function RoleSideBarContent({ children }) {
  const { user, isLoading } = useUser();

  if(isLoading) return <Spinner/>
  const role = user?.user_metadata?.role;
  const data = linkArr.filter(
    (ele) => ele.role.includes(role) || ele.role.includes("all")
  );

  return <RoleContext.Provider value={{data,isLoading}}>{children}</RoleContext.Provider>;
}

export function useRoleCheck(){
    const context = useContext(RoleContext)

    if(!context) throw new Error('nigga')

    return context
}
