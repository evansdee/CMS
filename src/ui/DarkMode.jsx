import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../hook/DarkModeToggle";

export default function DarkMode() {
  const {isDark,handleToggle} = useDarkMode()
  // const isDark = 12 > 30;
  return (
    <>
      <ButtonIcon onClick={handleToggle}>{isDark ? <HiOutlineSun /> : <HiOutlineMoon />}</ButtonIcon>
    </>
  );
}
