import styled from "styled-components"
import Button from "./ui/Button"
import { useLocalEnroll } from "./hook/EnrollmentListContext"
import { fakeData } from "./helper/data"

const Fake = styled.div`
background-color: var(--color-grey-400);
padding: 1em;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
border-radius: 30px;
gap: 1em;
text-align: center;
`


export default function FakeData() {
    const {setEnroll} = useLocalEnroll()

  return (
    <Fake>
        <h4>Upload Fake Data</h4>
        <Button size='small' onClick={()=>setEnroll([...fakeData])}>
            Say Fake😁
        </Button>
    </Fake>
  )
}
