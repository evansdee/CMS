import { useDarkMode } from "../hook/DarkModeToggle";
import { useMenuToggle } from "../hook/useMenuToggle";
import Image from "./Image";

export default function Logo() {
  const { isDark } = useDarkMode();
  const {isSideToggle} = useMenuToggle()
  // console.log(isDark);
  return (
    <>
      <Image
        src={!isDark ? "https://qtubihsbqxewhrenphaz.supabase.co/storage/v1/object/public/asset/certsys-removebg-preview.png" :
          " https://qtubihsbqxewhrenphaz.supabase.co/storage/v1/object/public/asset/certsys-removebg-preview1.png"}
        alt=""
        width={isSideToggle && '50%'}
      />
    </>
  );
}
