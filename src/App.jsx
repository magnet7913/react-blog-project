import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'
import PostDetailPage from './pages/PostDetailPage'
import PostByCategoryPage from './pages/PostByCategory';
import SearchPage from './pages/SearchPage'
import { Routes,Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { fetchCategoryList } from './store/categorySlice';
import { fetchHeaderMenu } from './store/headerMenuSlice';


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategoryList())
  }, []);

  useEffect(() => {
    dispatch(fetchHeaderMenu())
  }, []);

  return (
    <div className="wrapper-content">
      <Header />
      {
        /*
        HomePage
        /login => LoginPage
        /register => Register
        /search => SearchPage
        /post/xxxxxxxx => PostDetailPage
        

        */
      }
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/post/*" element={<PostDetailPage></PostDetailPage>}></Route>
        <Route path="/cate/*" element={<PostByCategoryPage></PostByCategoryPage>}></Route>
        <Route path="/search?" element={<SearchPage></SearchPage>}></Route>

      </Routes>
      <div className="spacing" />
      <Footer />
    </div>
  );
}


export default App;
