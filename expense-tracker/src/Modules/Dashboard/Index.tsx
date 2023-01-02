import React, { useContext, useEffect, useState } from 'react';
import { Dropdown, MenuProps, notification } from 'antd';
import { ControlTwoTone, PlusOutlined } from '@ant-design/icons';

import AuthContext from '../../Authentiaction/auth-context';
import { BottomDrawer } from '../../Components/BottomDrawer';
import EmptyData from '../../Components/EmptyData';
import { MonthCard } from './Components/monthCard/monthCard';
import { StyledAddBtn } from '../ExpensePage/style';
import { filterByMonth, filterByYear, getNumOfYears, isEmpty } from './utils';
import { StyledDashboardCard, StyledLayout } from './style';
import moment from 'moment';

type DashboardProps = {

}

export const Dashboard: React.FC<DashboardProps> = () => {
  const [open, setOpen] = useState(false);
  const [expDataPerYear, setDataPerYear] = useState<any>({});
  const [selectedYear, setSelectedYear] = useState<any>();
  const [items, setItems] = useState<MenuProps['items']>();

  const authContex = useContext(AuthContext);
  const { expenseData={} } = authContex;
  
  const { userData ={} }:any = expenseData

  useEffect(()=>{
    const keys = Object.keys(userData);

    const getIndex = (arr:any) => {
      const currentYear = moment().year();
      return arr.findIndex((item:any) => item == currentYear);
    }
    
    if(!!keys.length && getNumOfYears(userData)){
      setSelectedYear(()=> {
        setDataPerYear(filterByYear(Number(getNumOfYears(userData)[getIndex(getNumOfYears(userData))].toString()), userData));
        return getNumOfYears(userData)[getIndex(getNumOfYears(userData))].toString()
      })
      setItems(()=> {
        const item: any = [];
        getNumOfYears(userData).map((year) => item.push({key: year, label: year}))
        return item
      })
    }
  },[userData])

  const showDrawer = () => {
    setOpen(true);
  };
  
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (data:any) => {
    console.log(data, "changed");
    const {expenseName} = data
    
    const alertHeader = () => <div style={{fontSize: '12px'}}>Added <strong>{`${expenseName}`}</strong> expense successfully</div>
    notification['success']({
      message: alertHeader(),
    });
    return;
  };
  const yearSelectionHandler = (value:string) => {
    setDataPerYear(filterByYear(Number(value), userData));
    setSelectedYear(value);
  }

  const monthData = filterByMonth(expDataPerYear);
  const monthNames = Object.keys(monthData);

  return (
    <>
     <StyledLayout>
        { !isEmpty(userData) ?  <StyledDashboardCard title={selectedYear} 
          extra={
            <Dropdown
              trigger={['click']}
              menu={{items, onClick: (e)=> yearSelectionHandler(e.key)}}
            >
              <ControlTwoTone style={{fontSize: '20px', marginRight: '8px'}} />
            </Dropdown>
          }
          bodyStyle={{padding: '12px'}}
        >
          {
            !!monthNames.length && monthNames.map((month,i)=> <MonthCard key={i} monthData={monthData[month]} month={month} />)
          }
        </StyledDashboardCard> : <EmptyData />}
        <BottomDrawer expense={[]} onChange={onChange} onClose={onClose} open={open} />
        <StyledAddBtn onClick={showDrawer} type="primary" shape="circle" icon={<PlusOutlined />} size={'large'} />
      </StyledLayout>
    </>
  )
}
