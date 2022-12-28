import React, { useState, useEffect } from 'react';
import { getCommentsAction } from '../service/api';

const useFetchComments = ({
    lessonID,
    token
}) => {
    const [allComments, setAllComments] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getCommentsAsync = async() => {
        setIsLoading(true);
        const data = await getCommentsAction(lessonID, token);
        setIsLoading(false);

        if(data.error) {
            setError(data.error)
            return 
        }
        console.log(data.comments)
        setAllComments(data.comments);
    }

    useEffect(() => {
        getCommentsAsync()
        .catch(e => setError('Erro ao obter dados'))
    },[])

    return {
        allComments,
        isLoading,
        error,
        getCommentsAsync
    }
}

export default useFetchComments