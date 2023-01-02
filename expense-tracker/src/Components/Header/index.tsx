import { Avatar, Button } from 'antd';
import {getAuth,signOut} from 'firebase/auth' 
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FilterOutlined, PieChartTwoTone } from '@ant-design/icons';
import AuthContext from '../../Authentiaction/auth-context';
import { DropDown } from '../Dropdown';
import { StyledHeader } from './style';

type HeaderProps = {
  title: string
};

const Header: React.FC<HeaderProps> = ({title}) => {
  const auth = getAuth();
  const authContex = useContext(AuthContext);

  const logoutUser = () => {
    signOut(auth)
    authContex.logout()
  }
  const username = localStorage.getItem('userName')
  const uid = localStorage.getItem('uid')
  const { userData }:any = authContex;

  const sampleMenu = [
    {
      key: '2',
      label: (
        <Button key="1" type="primary" onClick={()=>logoutUser()}>
          Change user
        </Button>
      ),
    },
    {
      key: '1',
      label: (
        <Button style={{width: '100%'}} key="1" type="primary" danger onClick={()=>logoutUser()}>
          Sign out
        </Button>
      ),
    }
  ]
  console.log("User Data",userData)
  return (
    <div>
      <StyledHeader
        className="site-page-header"
        title={<Link to={'/'}>
          { <div className='header'>
              <PieChartTwoTone style={{fontSize: '20px'}} />
              <span className='title'>CashFlow</span>
            </div>
          }
        </Link>}
        extra={
          <>
            { uid && 
              <>
                <div className='username'>{username}</div>
                <DropDown items={sampleMenu} />
              </>
            }
          </>
        }
      />
    </div>
  )
}

export default Header