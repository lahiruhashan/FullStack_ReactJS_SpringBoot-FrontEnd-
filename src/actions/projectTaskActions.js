import axios from "axios";
import { GET_ERRORS, GET_PROJECT_TASKS, DELETE_PROJECT_TASK } from "./types";

export const addProjectTask = (projectTask, history) => async dispatch => {
    try {
        await axios.post("http://localhost:8080/api/board", projectTask);
        history.push("/");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        })
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }
}

export const getBacklog = () => async dispatch => {
    const res = await axios.get("http://localhost:8080/api/board/all");
    dispatch({
        type: GET_PROJECT_TASKS,
        payload: res.data
    });
}

export const deleteProjectTask = (task_id) => async dispatch => {
    if(window.confirm(`You are deleting project task ${task_id}, this action cannot be undone`)){
        await axios.delete(`http://localhost:8080/api/board/${task_id}`);
        dispatch({
            type: DELETE_PROJECT_TASK,
            payload: task_id
        })
    }
}