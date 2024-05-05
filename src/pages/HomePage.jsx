import ArticleGeneral from "../components/ArticleGeneral";
import ArticleLatest from "../components/ArticleLatest";
import ArticlePopular from "../components/ArticlePopular";
import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { clearCate, clearRandom, clearRelated, clearSlug } from "../store/articleSlice";

function HomePage() {
  return (
    <>
      <ArticleLatest />
      <ArticlePopular />
      <ArticleGeneral />
    </>
  )
}

export default HomePage