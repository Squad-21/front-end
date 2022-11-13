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
        res.error = e.response?.data.message ? e.response.data.message : e.message
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
        res.error = e.response?.data.message ? e.response.data.message : e.message
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
        res.error = e.response?.data.message ? e.response.data.message : e.message
    });

    return res
}

export const deleteCourseAction = async(courseID, token) => {
    let res = {
        message: null,
        error: null
    }
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    await axios.delete(`${API.base_link}/courses/${courseID}`, { headers }).then(response => {
        res.message = response.data.message
    }).catch(e => {
        console.log(e)
        res.error = e.response?.data.message ? e.response.data.message : e.message
    });

    return res
}

export const addCourseAction = async(data, token) => {
    let res = {
        course: null,
        error: null
    }
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data;'
    }

    console.log(data);

    await axios.post(`${API.base_link}/courses`, data, { headers }).then(response => {
        res.course = response.data
    }).catch(e => {
        console.log(e)
        res.error = e.response?.data.message ? e.response.data.message : e.message
    });

    return res
}