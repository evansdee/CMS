import { useDarkMode } from "../hook/DarkModeToggle";
import Flex from "./Flex";
import Image from "./Image";

export default function EmptyData({ img1, img2,size }) {

    const {isDark} = useDarkMode()
  
    return (
      <>
      <br />
      <Flex align="center" justify="center">
        <Image width={`${size}%`} src={isDark ? img1 : img2} />
      </Flex>
      </>
    );
}
