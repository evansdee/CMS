import { createContext ,useContext} from "react";
import { useUser } from "../features/authentication/useUser";
import { HiHome } from "react-icons/hi2";
import { PiCertificate, PiStudentDuotone } from "react-icons/pi";
import { TbReportAnalytics } from "react-icons/tb";
import {  MdDisplaySettings, MdOutlineApproval } from "react-icons/md";
import { TfiTimer } from "react-icons/tfi";
import { HiDocumentAdd } from "react-icons/hi";
import { FcApproval } from "react-icons/fc";
import { FaBookBookmark, FaFileSignature } from "react-icons/fa6";

const RoleContext = createContext();
const linkArr = [
  { label: "home", icon: HiHome, role: "all" },
  { label: "course", icon: FaBookBookmark, role: "madam cert" },
  { label: "validation", icon: MdOutlineApproval, role: "madam" },
  { label: "session", icon: TfiTimer, role: "office cert" },
  { label: "enrollment", icon: HiDocumentAdd, role: "office cert" },
  { label: "student", icon: PiStudentDuotone, role: "office cert" },
  { label: "report", icon: TbReportAnalytics, role: "office cert" },
  { label: "approval", icon: FcApproval, role: "madam" },
  { label: "signature", icon: FaFileSignature, role: "ceo madam" },
  { label: "certificate", icon: PiCertificate, role: "cert" },
  { label: "settings", icon: MdDisplaySettings, role: "all" },
];
export default function RoleSideBarContent({ children }) {
  const { user, isLoading } = useUser();

  // if(isLoading) return <Spinner/>
  const role = user?.user_metadata?.role;
  const data = linkArr.filter(
    (ele) => ele.role.includes(role) || ele.role.includes("all")
  );

  return <RoleContext.Provider value={{data,isLoading}}>{children}</RoleContext.Provider>;
}

export function useRoleCheck(){
    const context = useContext(RoleContext)

    if(!context) throw new Error('sidebar role error')

    return context
}
