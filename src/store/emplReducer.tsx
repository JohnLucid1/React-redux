import { Task } from "../elements/Input"

const defState ={
    tasks: [] = []
}
const ADD_TASK = "ADD_EMPL"
const REM_TASK = "REM_EMPL"
const DEL_ALL = "DEL_ALL"
const CHANGE = "CHANGE"
const UPDATE = "UPDATE"

export const tasksReducer = (state = defState, action:any) => {
    switch (action.type) {
        case ADD_TASK:
            return {...state, tasks: [...state.tasks, action.payload]}
        case REM_TASK:
            // @ts-ignore
            return {...state, tasks: state.tasks.filter((tasks:[])=> tasks.id != action.payload)}

        case DEL_ALL:
            return {...state, tasks: state.tasks = [] }
        

        case CHANGE: 
            return {
                ...state, tasks: state.tasks.map((task:Task)=> {
                    if(task.id !== action.payload) {
                        return task
                    }else{
                        return {
                            ...task, changed: !task.changed 
                        }
                    }
                })
            }
        
        case UPDATE:
            return {
                ...state, tasks: state.tasks.map((task:Task)=> {
                    if(task.id !== action.payload.id){
                        return task
                    }else{
                        
                        return {
                            ...task,  name: action.payload.name, id: task.id, changed: false 
                        }
                    }
                })
            }
        default:
            return state;
    }
}


export const addEmpleAction = (payload:Task) => ({type:ADD_TASK, payload:payload})
export const remEmpleAction = (payload:number) => ({type:REM_TASK, payload:payload})
export const delAllAction = () => ({type:DEL_ALL})
export const changeAction = (payload:number) => ({type:CHANGE, payload:payload})
export const updateAction = (payload:any) => ({type:UPDATE, payload:payload})
