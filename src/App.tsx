import {useSelector, useDispatch} from "react-redux"
import React, {  useState } from "react"
import {FC} from "react"
import { remEmpleAction, delAllAction, changeAction, updateAction } from "./store/emplReducer"
import "./App.css"
import { Header } from "./Header"
import Timer from "./Timer"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { Input } from "./elements/Input"


const Edit = (props:any) => {
  const dispatch = useDispatch()
  const [edit, setEdit] = useState("") 

  const editTaskHandler = () => {
    let edited = {
      id: props.id,
      name: edit,
    } 
    dispatch(updateAction(edited))
  }

  const handleEdit = (e:any) => {
    e.preventDefault()
    editTaskHandler()
    setEdit("")
  }

  return (
    <div>
      <form className="editForm" onSubmit={handleEdit}>
        <input
          className="Edit"
          type="text" 
          onChange={(e) => setEdit(e.target.value)} 
          value={edit} 
          placeholder={props.name}
          autoFocus
          maxLength={40}
         />
      </form> 
    </div>
  )
}



const App:FC = () => {
  const empl = useSelector((state:any) => state.tasks.tasks)
  const dispatch = useDispatch()


  const removeEmpl = (e:any) =>{
    dispatch(remEmpleAction(e.id)) 
  }

  const handleEdit = (e:any) => {
    handleChange(e)
  }

  const handleEverything = (e:any) => {
    e.changed ? handleEdit(e) : handleChange(e)
  }

  const handleChange = (e:any) => {
    dispatch(changeAction(e.id))
  }
  const deleteAll = () => dispatch(delAllAction())

  return (
    <div className="container">
        <Header/>
        <div className="another">
          <div className="App">
            <Timer/>
            <div className="main_tasks" >
                <Input />
              <div className="Tasks" style={{width:"auto", height:"auto", }}>
                <ReactCSSTransitionGroup 
                 transitionName="example"
                 transitionEnterTimeout={300}
                 transitionLeaveTimeout={300}>

                  {empl.map((e:any)=>
                    <div className="taskStyle" key={e.id} >
                          <div className="taskmain" onDoubleClick={() => handleEverything(e)}>
                            {e.changed ? <Edit id={e.id} name={e.name} /> : e.name}
                          </div>
                          <div className="DelBut">
                            <button onClick={() => removeEmpl(e)} className="ButnStyle">&#10005;</button>
                          </div>
                    </div>
                  )} 

                  </ReactCSSTransitionGroup>
              </div>
                <button className="DelAll" onClick={deleteAll}>Delete all</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default App
