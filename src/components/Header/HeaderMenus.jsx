import { useSelector } from 'react-redux'
// import {arrayToEle} from '../../helpers'

function HeaderMenus() {
  let headerMenu = useSelector((state) => state.HEADERMENU.header)

  function arrayToEle(items) {
    return items.map(item => (
      <li key={item.title}>
        {item.title}
        {item.child_items && <ul>{arrayToEle(item.child_items)}</ul>}
      </li>
    ));
  };
  let ele = arrayToEle(headerMenu)

  return (
    <div className="tcl-col-6">
      {/* Nav */}
      <div className="header-nav">
        <ul className="header-nav__lists" id="header-nav__lists">

          {ele}
        </ul>
        <ul className="header-nav__lists">
          <li className="user">
            <a href="/login">
              <i className="icons ion-person" /> Tài khoản
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HeaderMenus;
