import ArticleGeneral from "../components/ArticleGeneral";
import ArticleLatest from "../components/ArticleLatest";
import ArticlePopular from "../components/ArticlePopular";
import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { clearCate, clearRandom, clearRelated, clearSlug } from "../store/articleSlice";

function HomePage() {
  const dispatch = useDispatch()
  dispatch(clearSlug())
  dispatch(clearRelated())
  dispatch(clearCate())
  dispatch(clearRandom())

  return (
    <>
      <ArticleLatest />
      <ArticlePopular />
      <ArticleGeneral />
    </>
  )
}

export default HomePage