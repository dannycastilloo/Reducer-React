import { useReducer } from 'react'
import { useForm } from "../hooks/useForm"

const initialState = [{
    id: new Date().getDate(),
    task: 'Explain reducer',
    done: false
}]

// Centralizar toda la lógica de negocio en un solo lado (reducer)
const taskReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case '[TASKS] Add Task':
            return [...state, action.payload]
        case '[TASKS] Check Task':
            return state.map(task => {
                if (task.id === action.payload) {
                    return {
                        ...task,
                        done: !task.done
                    }
                } return task
            })
        case '[TASKS] Delete Task':
            return state.filter(task => task.id !== action.payload)
        case '[TASKS] Erase Tasks':
            return action.payload
        default:
            return state
    }
}

export const TaskList = () => {

    const [state, dispatch] = useReducer(taskReducer, initialState)

    const { task, formState, onInputChange } = useForm({ task: '' })

    const addTask = (event) => {
        event.preventDefault()

        if (formState.task == '') return

        const task = {
            id: new Date().getTime(),
            task: formState.task,
            done: false
        }

        const action = {
            type: '[TASKS] Add Task',
            payload: task
        }
        dispatch(action)
    }

    const checkTask = (id) => {
        const action = {
            type: '[TASKS] Check Task',
            payload: id
        }
        dispatch(action)
    }

    const deleteTask = ({id}) => {
        const action = {
            type: '[TASKS] Delete Task',
            payload: id
        }
        dispatch(action)
    }

    const reset = () => {
        const action = {
            type: '[TASKS] Erase Tasks',
            payload: []
        }
        dispatch(action)
    }

    return (
        <>
            <h1>Add task</h1>
            <form onSubmit={addTask}>
                <div className="mb-3">
                    <input type="text"
                        className="form-control"
                        name="task"
                        value={task}
                        onChange={onInputChange} />
                </div>
                <div className="action">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <button type="button" className="btn btn-danger" onClick={reset}>Reset</button>
                </div>
            </form>

            <hr />

            <h1>Tasks Lisk</h1>
            <ul className="list-group">
                {state.map(item => {
                    return (
                        <li className="list-group-item d-flex justify-content-between" key={item.id}>
                            <span>{item.task}</span>
                            <div>
                                <input type="checkbox"
                                    value={item.done}
                                    onChange={() => checkTask(item)} />
                                <button className="btn btn-danger"
                                        onClick={() => deleteTask(item)}>
                                    Delete
                                </button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}