import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'
import LoginPage2 from './pages/LoginPage/index2'
import PostDetailPage from './pages/PostDetailPage'
import PostByCategoryPage from './pages/PostByCategory';
import SearchPage from './pages/SearchPage'
import LogoutPage from './pages/LogoutPage';
import RegisterPage from './pages/RegisterPage';
import RegisterCompletePage from './pages/RegisteredCompletePage';
import AdminPanel from './pages/AdminPage';
import TestForm from './pages/Test/TestForm'

import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { fetchCategoryList } from './store/categorySlice';
import { fetchHeaderMenu } from './store/headerMenuSlice';
import { currentUserFetch } from './store/loginAndRegisterSlice';
import { fetchPostList } from './store/articleSlice';


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

  useEffect(() => {
    dispatch(fetchPostList())
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
        <Route path="/login2" element={<LoginPage2></LoginPage2>}></Route>

        <Route path="/post/:slug" element={<PostDetailPage></PostDetailPage>}></Route>
        <Route path="/cate/:slug" element={<PostByCategoryPage></PostByCategoryPage>}></Route>
        <Route path="/search?" element={<SearchPage></SearchPage>}></Route>
        <Route path="/logout" element={<LogoutPage></LogoutPage>}></Route>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
        <Route path='/registerComplete' element={<RegisterCompletePage></RegisterCompletePage>}></Route>
        <Route path='/admin' element={<AdminPanel></AdminPanel>}></Route>
        <Route path='/test' element={<TestForm></TestForm>}></Route>

      </Routes>
      <div className="spacing" />
      <Footer />
    </div>
  );
}


export default App;
