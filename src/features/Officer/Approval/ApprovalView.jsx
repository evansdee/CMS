/* eslint-disable react/prop-types */
import { FaBookOpenReader, FaPhone, FaRegAddressCard } from "react-icons/fa6";
import GridContainer from "../../../ui/GridContainer";
import GridItem from "../../../ui/GridItem";
import Flex from "../../../ui/Flex";
import { FaCity, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { format } from "date-fns";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import Button from "../../../ui/Button";
import { useUpdateEnrollment } from "./useUpdateEnrollment";
import { useDeleteEnrollment } from "./useDeleteEnrollment";
import { RiBankFill } from "react-icons/ri";
import { formatToNaira } from "../../../helper/helper";
import { BsCashCoin } from "react-icons/bs";
import { TbGenderBigender } from "react-icons/tb";
import { AiFillHeart, AiOutlineUser } from "react-icons/ai";
import { MdNumbers, MdOutlineEmail } from "react-icons/md";
import { IoIdCardOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { useCourse, useUpdateCourseCount } from "../Enrollment/useCourse";

export default function ApprovalView({ data, onCloseModal,updateStudent }) {
  const { updateCount } = useUpdateCourseCount();
  const { data: countList } = useCourse();
  const mutate = useDeleteEnrollment();
  const {
    id,
    fullName,
    photo,
    dob,
    courseCode,
    codeAlt,
    courseName,
    bank,
    amount,
    state,
    country,
    gender,
    marital,
    address,
    gsm,
    email,
    means,
    meansId
  } = data;

  function handleUpdate() {
    const count = countList?.find((ele) => ele.codeAlt === codeAlt && ele.courseCode === courseCode);

    let newObj = {
      newEnrollment: {
        ...data,
        status: true,
        certificateNo: `JINSR/${courseCode}/${codeAlt}/${count?.count}/${format(
          new Date(),
          "yyyy"
        )}`,
      },
      id: id,
    };

    // console.log(newObj);
    updateStudent(newObj)
    updateCount({
      item: { ...count, count: count.count + 1 },
      countId: count.courseName,
    });
    onCloseModal?.();
  }

  function handleDelete() {
    mutate(id);
    onCloseModal?.();
  }


  return (
    <GridContainer>
      <GridItem className="item1">
        <img src={photo} />
        <div>
          <Flex align="center" gap=".5em">
            <FaUser />
            <span>{fullName}</span>
          </Flex>
        </div>
        <div>
          <Flex align="center" gap=".5em">
            <LiaBirthdayCakeSolid />
            <span>{format(dob, "dd MMM yyyy")}</span>
          </Flex>
        </div>
        <Flex gap="1em">
          <Button variation="btn" size="small" onClick={handleUpdate}>
            Approve
          </Button>
          <Button variation="danger" size="small" onClick={handleDelete}>
            Decline
          </Button>
        </Flex>
      </GridItem>
      <GridItem className="item2">
        <div>
          <Flex align="center" gap=".5em">
            <FaBookOpenReader />
            <span>{courseName}</span>
          </Flex>
        </div>
        <div>
          <Flex align="center" gap=".5em">
            <RiBankFill />
            <span>{bank}</span>
          </Flex>
        </div>
        <div>
          <Flex align="center" gap=".5em">
            <BsCashCoin />
            <span>{formatToNaira(amount)}</span>
          </Flex>
        </div>
      </GridItem>
      <GridItem className="item4">
        <div>
          <Flex align="center" gap=".5em">
            <FaMapMarkerAlt />
            <span>{country}</span>
          </Flex>
        </div>
        <div>
          <Flex align="center" gap=".5em">
            <FaCity />
            <span>{state}</span>
          </Flex>
        </div>
        <div>
          <Flex align="center" gap=".5em">
            <TbGenderBigender />
            <span>{gender}</span>
          </Flex>
        </div>
        <div>
          <Flex align="center" gap=".5em">
            {marital.toLowerCase() === 'single' ? <AiOutlineUser />:<AiFillHeart />}
            <span>{marital}</span>
          </Flex>
        </div>
      </GridItem>
      <GridItem className="item3">
      <div>
          <Flex align="center" gap=".5em">
            <FaRegAddressCard />
            <span>{address}</span>
          </Flex>
        </div>
      <div>
          <Flex align="center" gap=".5em">
            <FaPhone />
            <span>{gsm}</span>
          </Flex>
        </div>
      <div>
          <Flex align="center" gap=".5em">
            <MdOutlineEmail />
            <span>{email}</span>
          </Flex>
        </div>
      </GridItem>
      <GridItem className="item5">
      <div>
          <Flex align="center" gap=".5em">
            <IoIdCardOutline  />
            <span>{means}</span>
          </Flex>
        </div>
      <div>
          <Flex align="center" gap=".5em">
            <MdNumbers  />
            <span>{meansId}</span>
          </Flex>
        </div>
      </GridItem>
    </GridContainer>
  );
}
