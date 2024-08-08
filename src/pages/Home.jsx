import { useGetEnrollment } from "../features/Officer/Enrollment/useEnrollment";

export default function Home() {
  const { data } = useGetEnrollment();

  const arr = data?.filter(ele=>(ele.isRenewal)).reduce((acc, ele) => {
    return acc + parseInt(ele.amount);
  }, 0);

  console.log(arr);
  return <div>Home</div>;
}
