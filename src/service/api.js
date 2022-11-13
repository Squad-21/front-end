import { API } from "../constants/api";
import axios from 'axios';

export const registerAction = async(data) => {
    let res = {
        token: null,
        user: null,
        error: null
    }
    await axios.post(`${API.base_link}/auth/register`, data).then(response => {
        res.token = response.data.token
        res.user = response.data.user
      }).catch(e => {
        console.log(e);
        res.error = e.response?.data.message ? e.response.data.message : e.toString()
      });

      return res
}

export const loginAction = async(data) => {
    let res = {
        token: null,
        user: null,
        error: null
    }
    await axios.post(`${API.base_link}/auth/authenticate`, data).then(response => {
        res.token = response.data.token
        res.user = response.data.user
    }).catch(e => {
        console.log(e)
        res.error = e.response?.data.message ? e.response.data.message : e.toString()
    });

    return res
}

export const getCoursesAction = async() => {
    let res = {
        courses: null,
        error: null
    }

    await axios.get(`${API.base_link}/courses`).then(response => {
        res.courses = response.data
    }).catch(e => {
        console.log(e)
        res.error = e.response?.data.message ? e.response.data.message : e.toString()
    });

    return res
}