

import { useMutation } from '@tanstack/react-query'
import {useState} from 'react'
import { updateCurrentUser } from '../service/apiAuth'
import toast from 'react-hot-toast'

export default function UpdateRoleForm() {

    const {mutate} = useMutation({
        mutationFn:updateCurrentUser,
        onSuccess:()=>toast.success("role updated"),
        onError:()=>toast.error("error")
    })
    const [inp,setInp] = useState()
    function handleSubmit(e){
        e.preventDefault()
        mutate({role:inp})
    }
  return (
    <form onSubmit={handleSubmit}>

    <input type='text' value={inp} onChange={(e)=>setInp(e.target.value)}/>
    <button>add</button>
    </form>
  )
}
