import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addEmpleAction } from '../store/emplReducer'
import { changeAction } from '../store/emplReducer'

export class Task{
  name: string
  id = Date.now()
  changed = false
  constructor(name:string){
    this.name = name
  }
}


export const Input = () => {
    const dispatch = useDispatch()
    
    const [task, setTask] = useState('');


    const addEmplHandler = (name:string) => {
        let thing:Task = new Task(name)

        dispatch(addEmpleAction(thing))
    }
    
    const handleSubmit = (e:any) =>{
        e.preventDefault()
        addEmplHandler(task)
        setTask("")

    }

    return (
        <div>
            <form onSubmit={handleSubmit}> {/* On submit addAmpleHandler*/}
                <div className="form__group field">
                    <input type="text"
                    onChange={(e)=> setTask(e.target.value)}
                    value={task}
                    className="form__field"
                    placeholder="Task"
                    name="name"
                    id="name"
                    autoComplete="off"
                    maxLength={40}
                    />
                    <label htmlFor="name" className="form__label">Task</label>
                </div>
            </form>
        </div>
    )
}
