import { API } from "../constants/api";
import axios from 'axios';

export const registerAction = async(data) => {
    let res = {
        token: null,
        error: null
    }
    await axios.post(`${API.base_link}/auth/register`, data).then(response => {
        res.token = response.data.token
      }).catch(e => {
        console.log(e);
        res.error = e.response?.data.message ? e.response?.data.message : e.toString()
      });

      return res
}

export const loginAction = async(data) => {
    let res = {
        token: null,
        error: null
    }
    await axios.post(`${API.base_link}/auth/authenticate`, data).then(response => {
        res.token = response.data.token
    }).catch(e => {
        console.log(e)
        res.error = e.response?.data.message ? e.response?.data.message : e.toString()
    });

    return res
}