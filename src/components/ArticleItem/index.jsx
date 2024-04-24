import cls from 'classnames';
import ArticleItemCategories from './ArticleItemCategories';
import ArticleItemDesc from './ArticleItemDesc';
import ArticleItemInfo from './ArticleItemInfo';
import ArticleItemStats from './ArticleItemStats';
import ArticleItemThumb from './ArticleItemThumb';
import ArticleItemTitle from './ArticleItemTitle';
import './article-item.css';

export default function ArticleItem({
  isStyleRow = false,
  isStyleCard = false,
  isShowDesc = false,
  isShowCategories = false,
  isShowAvatar = true,
  item
}) {
  const classes = cls('article-item', {
    'style-card': isStyleCard,
    'style-row': isStyleRow,
  });

  // mapping // chuẩn hóa dữ liệu: lọc và lấy ra các field cần thiết, đặt lại tên theo chuẩn ở phía frontend

  return (
    <article className={classes}>
      <ArticleItemThumb thumb={item.thumb} slug={item.slug}/>
      <div className="article-item__content">
        {isShowCategories && <ArticleItemCategories cate={item.category}/>}
        {isShowCategories && <ArticleItemStats view={item.view}/>}

        <ArticleItemTitle title={item.title} slug={item.slug}/>

        {isShowDesc && <ArticleItemDesc desc={item.desc}/>}

        <ArticleItemInfo isShowAvatar={isShowAvatar} authorData = {item.author} postDate = {item.postDate}/>
      </div>
    </article>
  );
}
