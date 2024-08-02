// import img1 from "https://qtubihsbqxewhrenphaz.supabase.co/storage/v1/object/public/asset/certsys-removebg-preview.png";
// import img2 from "https://qtubihsbqxewhrenphaz.supabase.co/storage/v1/object/public/asset/certsys-removebg-preview1.png";
import { useDarkMode } from "../hook/DarkModeToggle";
import Image from "./Image";

export default function Logo() {
  const { isDark } = useDarkMode();
  // console.log(isDark);
  return (
    <>
      <Image
        src={!isDark ? "https://qtubihsbqxewhrenphaz.supabase.co/storage/v1/object/public/asset/certsys-removebg-preview.png" :
          " https://qtubihsbqxewhrenphaz.supabase.co/storage/v1/object/public/asset/certsys-removebg-preview1.png"}
        alt=""
        width='75%'
      />
    </>
  );
}
