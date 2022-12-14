import { API } from "../constants/api";
import axios from 'axios';
import { fileToBase } from "./utils";

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
        res.error = e.response?.data ? `${e.response.data.message} ${e.response.data?.error}` : e.message
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
        res.error = e.response?.data ? `${e.response.data.message} ${e.response.data?.error}` : e.message
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
        res.error = e.response?.data ? `${e.response.data.message} ${e.response.data?.error}` : e.message
    });

    return res
}

export const getOneCourseAction = async(courseID) => {
    let res = {
        courseData: null,
        error: null
    }

    await axios.get(`${API.base_link}/courses/${courseID}`).then(response => {
        res.courseData = response.data
    }).catch(e => {
        console.log(e)
        res.error = e.response?.data ? `${e.response.data.message} ${e.response.data?.error}` : e.message
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
        res.error = e.response?.data ? `${e.response.data.message} ${e.response.data?.error}` : e.message
    });

    return res
}

export const addCourseAction = async(data, token) => {
    let res = {
        course: null,
        error: null
    }
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    if(data.image.length) {
        data.image = await fileToBase(data.image[0]);
    } else {
        data = {
            title: data.title, 
            description: data.description
        }
    }

    await axios.post(`${API.base_link}/courses`, data, { headers }).then(response => {
        res.course = response.data
    }).catch(e => {
        console.log(e)
        res.error = e.response?.data ? `${e.response.data.message} ${e.response.data?.error}` : e.message
    });

    return res
}

export const editCourseAction = async(data, token, courseID) => {
    let res = {
        course: null,
        error: null
    }
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    if(data.image.length) {
        data.image = await fileToBase(data.image[0]);
    } else {
        data = {
            title: data.title, 
            description: data.description
        }
    }

    await axios.put(`${API.base_link}/courses/${courseID}`, data, { headers }).then(response => {
        res.course = response.data
    }).catch(e => {
        console.log(e)
        res.error = e.response?.data ? `${e.response.data.message} ${e.response.data?.error}` : e.message
    });

    return res
}

export const addModuleAction = async(data, token, courseID) => {
    let res = {
        module: null,
        error: null
    }
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    await axios.post(`${API.base_link}/courses/${courseID}/modules`, data, { headers }).then(response => {
        res.module = response.data
    }).catch(e => {
        console.log(e)
        res.error = e.response?.data ? `${e.response.data.message} ${e.response.data?.error}` : e.message
    });

    return res
}

export const editModuleAction = async(
    data, 
    token, 
    courseID, 
    moduleCode
    ) => {

    let res = {
        module: null,
        error: null
    }
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    await axios.put(`${API.base_link}/courses/${courseID}/modules/${moduleCode}`, data, { headers }).then(response => {
        res.module = response.data
    }).catch(e => {
        console.log(e)
        res.error = e.response?.data ? `${e.response.data.message} ${e.response.data?.error}` : e.message
    });

    return res
}

export const deleteModuleAction = async(token, courseID, moduleCode) => {
    let res = {
        message: null,
        error: null
    }
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    await axios.delete(`${API.base_link}/courses/${courseID}/modules/${moduleCode}`, { headers }).then(response => {
        res.message = response.data
    }).catch(e => {
        console.log(e)
        res.error = e.response?.data ? `${e.response.data.message} ${e.response.data?.error}` : e.message
    });

    return res
}

export const addLessonAction = async(data, token) => {
    let res = {
        lesson: null,
        error: null
    }
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    await axios.post(`${API.base_link}/lessons`, data, { headers }).then(response => {
        res.lesson = response.data
    }).catch(e => {
        console.log(e)
        res.error = e.response?.data ? `${e.response.data.message} ${e.response.data?.error}` : e.message
    });

    return res
}

export const editLessonAction = async(data, token, lessonID) => {
    let res = {
        lesson: null,
        error: null
    }
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    await axios.put(`${API.base_link}/lessons/${lessonID}`, data, { headers }).then(response => {
        res.lesson = response.data
    }).catch(e => {
        console.log(e)
        res.error = e.response?.data ? `${e.response.data.message} ${e.response.data?.error}` : e.message
    });

    return res 
}

export const deleteLessonAction = async(token, lessonID) => {
    let res = {
        message: null,
        error: null
    }
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    await axios.delete(`${API.base_link}/lessons/${lessonID}`, { headers }).then(response => {
        res.message = response.data
    }).catch(e => {
        console.log(e)
        res.error = e.response?.data ? `${e.response.data.message} ${e.response.data?.error}` : e.message
    });

    return res 
}

export const addCommentAction = async(data, lessonID, token) => {
    let res = {
        comment: null,
        error: null
    }
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    await axios.post(`${API.base_link}/lessons/${lessonID}/comment`, data, { headers }).then(response => {
        res.comment = response.data
    }).catch(e => {
        console.log(e)
        res.error = e.response?.data ? `${e.response.data.message} ${e.response.data?.error}` : e.message
    });

    return res 
}

export const getCommentsAction = async(lessonID, token) => {
    let res = {
        comments: null,
        error: null
    }
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    await axios.get(`${API.base_link}/lessons/${lessonID}/comment`, { headers }).then(response => {
        res.comments = response.data
    }).catch(e => {
        console.log(e)
        res.error = e.response?.data ? `${e.response.data.message} ${e.response.data?.error}` : e.message
    });

    return res 
}

export const deleteCommentAction = async(commentID, token) => {
    let res = {
        message: null,
        error: null
    }
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    await axios.delete(`${API.base_link}/lessons/${commentID}/comment`, { headers }).then(response => {
        res.message = response.data.message
    }).catch(e => {
        console.log(e)
        res.error = e.response?.data ? `${e.response.data.message} ${e.response.data?.error}` : e.message
    });

    return res 
}

export const likeLessonAction = async(lessonID, token) => {
    let res = {
        likes: null,
        error: null
    }
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    await axios.post(`${API.base_link}/lessons/${lessonID}/like`, null, { headers }).then(response => {
        res.likes = response.data.likes
    }).catch(e => {
        console.log(e)
        res.error = e.response?.data ? `${e.response.data.message} ${e.response.data?.error}` : e.message
    });

    return res 
}

export const unlikeLessonAction = async(lessonID, token) => {
    let res = {
        unlikes: null,
        error: null
    }
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    await axios.post(`${API.base_link}/lessons/${lessonID}/unlike`, null, { headers }).then(response => {
        res.unlikes = response.data.unlikes
    }).catch(e => {
        console.log(e)
        res.error = e.response?.data ? `${e.response.data.message} ${e.response.data?.error}` : e.message
    });

    return res 
}

export const markAsDoneAction = async(lessonID, token) => {
    let res = {
        user: null,
        error: null
    }
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    await axios.post(`${API.base_link}/lessons/${lessonID}/done`, null, { headers }).then(response => {
        res.user = response.data
    }).catch(e => {
        console.log(e)
        res.error = e.response?.data ? `${e.response.data.message} ${e.response.data?.error}` : e.message
    });

    return res     
}

export const getAllUsersAction = async(token) => {
    let res = {
        users: null,
        error: null
    }
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    await axios.get(`${API.base_link}/auth/users`, { headers }).then(response => {
        res.users = response.data
    }).catch(e => {
        console.log(e)
        res.error = e.response?.data ? `${e.response.data.message} ${e.response.data?.error}` : e.message
    });

    return res     
}

export const getOneUserAction = async(userID, token) => {
    let res = {
        user: null,
        error: null
    }
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    await axios.get(`${API.base_link}/auth/${userID}`, { headers }).then(response => {
        res.user = response.data
    }).catch(e => {
        console.log(e)
        res.error = e.response?.data ? `${e.response.data.message} ${e.response.data?.error}` : e.message
    });

    return res     
}

export const editUserAction = async(data, token, userID) => {
    let res = {
        user: null,
        error: null
    }
    const headers = {
        'Authorization': `Bearer ${token}`
    }
    if(data.avatar.length) {
        data.avatar = await fileToBase(data.avatar[0]);
    } else {
        data = {
            name: data.name, 
            email: data.email,
            admin: data.admin
        }
    }

    await axios.put(`${API.base_link}/auth/${userID}`, data, { headers }).then(response => {
        res.user = response.data
    }).catch(e => {
        console.log(e)
        res.error = e.response?.data ? `${e.response.data.message} ${e.response.data?.error}` : e.message
    });

    return res
}

export const deleteUserAction = async(userID, token) => {
    let res = {
        user: null,
        error: null
    }
    const headers = {
        'Authorization': `Bearer ${token}`
    }

    await axios.delete(`${API.base_link}/auth/${userID}`, { headers }).then(response => {
        res.user = response.data
    }).catch(e => {
        console.log(e)
        res.error = e.response?.data ? `${e.response.data.message} ${e.response.data?.error}` : e.message
    });

    return res     
}