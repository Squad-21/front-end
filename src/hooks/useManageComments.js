import { useState } from "react";
import { addCommentAction, deleteCommentAction } from "../service/api";

const useManageComments = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const addCommentAsync = async({
        data, 
        lessonID,
        token
    }) => {
        setIsLoading(true);
        const dataComment = await addCommentAction(data, lessonID, token);
        setIsLoading(false);

        if(dataComment.error) {
            setError(dataComment.error)
            return
        }
    }

    const deleteCommentAsync = async({
        id, 
        token
    }) => {
        setIsLoading(true)
        const dataDelete = await deleteCommentAction(id, token)
        setIsLoading(false);

        if(dataDelete.error) {
            alert(dataDelete.error)
            return 
        }
    }

    return {
        isLoading,
        error,
        addCommentAsync,
        deleteCommentAsync
    }
}

export default useManageComments