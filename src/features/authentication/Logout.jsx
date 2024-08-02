import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";



export default function Logout() {
  const { logout, isPending } = useLogout();
//   const { logout, isLoading: isLoggingOut } = useLogout();


  return (
    <>
      <ButtonIcon onClick={logout} disable={isPending}>
           {isPending ? <SpinnerMini/>: <HiArrowRightOnRectangle/>}
        </ButtonIcon>
    </>
  )
}
