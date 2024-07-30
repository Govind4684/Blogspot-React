import { useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useStoreState,useStoreActions } from "easy-peasy";

const EditPost = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const editTitle = useStoreState((state) => state.editTitle);
    const editBody = useStoreState((state) => state.editBody);

    const editPost = useStoreActions((actions) => actions.editPost);
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
    const setEditBody = useStoreActions((actions) => actions.setEditBody);
    
    const getPostById = useStoreState((state) => state.getPostById);
    const post = getPostById(id);
        
    useEffect(() => {
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }       

    }, [ post, setEditTitle, setEditBody ])

    const handleEdit = async (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const updatedPost = {id, title: editTitle, datetime, body: editBody};
        editPost(updatedPost);
        navigate(`/post/${id}`);
        
    }

    return (
        <main className="NewPost">
            { (editTitle) && 
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="editTitle">Title :</label>
                        <input 
                            id="editTitle"
                            type="text"
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor="editBody">Post :</label>
                        <textarea
                            id="editBody"
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button type="button" onClick={() => handleEdit(post.id)}>Save changes</button>
                    </form>
                </>
            }

            {
                (!editTitle) && 
                <>
                    <h2>Post not found</h2>
                    <p>This post is not available anymore.</p>
                    <p>
                        <Link to='/'>Visit our homepage.</Link>
                    </p>
                </>
            }
        </main>
    )
}

export default EditPost