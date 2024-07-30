import Layout from './Layout';
import Home from './pages/Home';
import NewPost from './pages/NewPost';
import PostPage from './pages/PostPage';
import EditPost from './pages/EditPost';
import About from './pages/About';
import Missing from './pages/Missing';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import useAxiosFetch from './hooks/useAxiosFetch';
import { useStoreActions } from 'easy-peasy';

function App() {

  const setPosts = useStoreActions((actions) => actions.setPosts);
  const { data, isLoading, fetchError } = useAxiosFetch('http://localhost:3500/posts');

  useEffect(() => {
      setPosts(data);
  }, [data, setPosts]);


  return (
      <Routes>      
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home isLoading={isLoading} fetchError={fetchError} />} />  
          <Route path='post'>
            <Route index element={<NewPost />} />            
            <Route path=':id' element={<PostPage />} /> 
          </Route> 
          <Route path='edit/:id' element={<EditPost />} />    
          <Route path='about' element={<About />} />
          <Route path='*' element={<Missing />} />
        </Route>     
      </Routes>           
  );
}

export default App;
