import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { Task } from './Input'
import { updateAction, changeAction } from '../store/emplReducer'



export const Edit = (...props:any) => {
  const tasks = useSelector((state:any) => state.tasks.tasks)

  const dispatch = useDispatch()  
  const [updated, setUpdated] = useState("")

  const handleSubmit = (e:any) => {
    e.preventDefault() 
    addUpdatedHandler(updated)
    dispatch(changeAction(props.id))
    console.log(props.id)
    setUpdated("")
  }

  const addUpdatedHandler = (name:string) => {
    let updated:Task = new Task(name)
    dispatch(updateAction(updated))
  }


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text"  
              onChange={(e) => setUpdated(e.target.value)}
              value={updated}
              maxLength={40}
            />
        </form>
    </div>
  )
}

