import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'
import PostDetailPage from './pages/PostDetailPage'
import PostByCategoryPage from './pages/PostByCategory';
import SearchPage from './pages/SearchPage'
import LogoutPage from './pages/LogoutPage';
import RegisterPage from './pages/RegisterPage';
import RegisterCompletePage from './pages/RegisteredCompletePage';

import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { fetchCategoryList } from './store/categorySlice';
import { fetchHeaderMenu } from './store/headerMenuSlice';
import { currentUserFetch } from './store/loginAndRegisterSlice';
import ChangePassword from './pages/ChangePassword';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategoryList())
  }, []);

  useEffect(() => {
    dispatch(fetchHeaderMenu())
  }, []);

  useEffect(() => {
    dispatch(currentUserFetch())
  }, [])

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
        <Route path="/post/:slug" element={<PostDetailPage></PostDetailPage>}></Route>
        <Route path="/cate/:slug" element={<PostByCategoryPage></PostByCategoryPage>}></Route>
        <Route path="/search?" element={<SearchPage></SearchPage>}></Route>
        <Route path="/logout" element={<LogoutPage></LogoutPage>}></Route>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
        <Route path='/registerComplete' element={<RegisterCompletePage></RegisterCompletePage>}></Route>
        <Route path='/changePassword' element={<ChangePassword></ChangePassword>}></Route>

      </Routes>
      <div className="spacing" />
      <Footer />
    </div>
  );
}


export default App;
