import { useSelector,useDispatch } from 'react-redux'
import { handleLogOut } from "../../helpers";
import { Link,useNavigate } from 'react-router-dom';
import { logout } from '../../store/loginAndRegisterSlice'

// import {arrayToEle} from '../../helpers'

function HeaderMenus() {  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let headerMenu = useSelector((state) => state.HEADERMENU.header)

  function arrayToEle(items) {
    return items.map(item => (
      <li key={item.title}>
        {item.title}
        {item.childItems.length > 0 && <ul>{arrayToEle(item.childItems)}</ul>}
      </li>
    ));
  };
  let ele = arrayToEle(headerMenu)

  let value = useSelector((state) => state.LOGIN.user)

  const handleLogOut = (e) => {
    e.preventDefault()
    dispatch(logout())
    navigate('/logout')
  }

  return (
    <div className="tcl-col-6">
      {/* Nav */}
      <div className="header-nav">
        <ul className="header-nav__lists" id="header-nav__lists">

          {ele}

        </ul>
        <ul className="header-nav__lists">
          <li className="user">
            {value ? (<>
              <Link to={"/"}><i className="icons ion-person" /> {value.user_display_name}</Link>
                <ul>  
                  <li>
                    <Link to={"/changePassword"} >Đổi mật khẩu</Link>
                  </li>      
                  <li>
                    <Link to={"/logout"} onClick={handleLogOut}>Log Out</Link>
                  </li>            
                </ul>
              </>
              ) : (
              <Link to={"/login"}><i className="icons ion-person" /> Tài khoản</Link>
              )
            }
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HeaderMenus;
