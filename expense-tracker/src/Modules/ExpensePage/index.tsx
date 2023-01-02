import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Dropdown, DatePickerProps, Divider, Modal, Tag, Typography, notification, MenuProps } from 'antd'
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import moment from 'moment';
import { BottomDrawer } from '../../Components/BottomDrawer';

import { commonStyle, StyledAddBtn, StyledExpenseCard, StyledInnerCard } from './style';
import { deleteExpense } from '../../config/dbHandlers';
import { setTimeZone } from '../Dashboard/utils';
import EmptyData from '../../Components/EmptyData';
import classNames from 'classnames';


type DropdownProps = {
  items: MenuProps['items'],
}


const {Text, Title} = Typography
export const ExpensePage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openModal, setModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState({})
  const [selectedDate, setSelectedDate] = useState<any>('');
  const [monthExpense,setMonthExpense] = useState<any>([]);
  const isEdit = useRef(false);
  const seletedRef:any = useRef(null);
  const deleteExp:any = useRef(null);

  const showDrawer = (exp:any,status:boolean) => {
    setOpen(true);
    setSelectedExpense(exp)
    isEdit.current = status;
  };

  const showDeleteModal = (exp: any) => {
    setModalOpen(true);
    deleteExp.current = exp;
  }
  const items = [
    {
      key: '2',
      label: (
        <Button onClick={()=>showDrawer(selectedExpense,true)} type='link'>Edit</Button>
      ),
    },
    {
      key: '1',
      label: (
        <Button onClick={() => showDeleteModal(selectedExpense)} danger type='link'>Delete</Button>
      ),
    }
  ];

  useEffect(()=> {
    const {state:{expense}} = location;
    setMonthExpense(expense)
  },[]);

  const location = useLocation();
  const onClose = () => {
    setOpen(false);
    setSelectedExpense({});
    isEdit.current = false;
    deleteExp.current = null;
  };

  const onChange = (newExpense:any) => {
    const { date, expenseName } = newExpense;
    if(moment().month(month).month() === moment(date).month()) {
      if(isEdit.current){
        updateExpense(newExpense);
      }else{
        addExpense(newExpense);
      }
    }
    const alertHeader = () => <div style={{fontSize: '12px'}}>{ isEdit.current ? 'Updated' : 'Added'} <strong>{`${expenseName}`}</strong> expense successfully</div>
    notification['success']({
      message: alertHeader(),
    });
  };

  const addExpense = (exp:any) => {
    const {amount, expenseName, category, date} = exp
    setMonthExpense((oldMonthExp:any)=> {
      return [...oldMonthExp, { amount, expenseName, category, date }]
    })
  }

  const updateExpense = (exp:any) => {
    const updatedExpense = monthExpense.map((expense:any) => {
      if(expense.id === exp.id){
        return exp;
      }
      return expense;
    });
    setMonthExpense(updatedExpense);
  }

  const removeData = (id:any) => {
    console.log(id);
    setMonthExpense((oldExp:any)=> {
      const filtered = oldExp.filter((exp:any)=>exp.id !== id);
      if(!filtered.length) {
        navigate('/')
      }
      return filtered
    })
    setModalOpen(false);
  }
  const onDelete = () => {
    const uid = localStorage.getItem('uid');
    deleteExpense(deleteExp?.current?.id,uid,removeData);

    const alertHeader = () => <div style={{fontSize: '12px'}}>Removed <strong>{`${deleteExp?.current?.expenseName}`}</strong> expense successfully</div>
    notification['success']({
      message: alertHeader(),
    });
    deleteExp.current = null;
  }
  const onDateChange: DatePickerProps['onChange'] = (date) => {

    date && setSelectedDate(setTimeZone(date));
    setMonthExpense(()=> {
      const {state:{expense}} = location;
      const filteredExpense = expense.filter((item:any)=> {
        if(date) {
          if(item.date === setTimeZone(date)) {
            return item
          }
        }
        else {
          return item
        }
      })

      return filteredExpense;
    })
    
  };
  const {state:{expense, month, spent}} = location;
  
  const getDate =(date: number)=> {
    return new Date(date).toDateString()
  };

  const getMinAndMax = () => {
    const dateArr = expense.map((exp:any)=>exp.date);
    const min = moment(Math.min(...dateArr)).format("YYYY-MM-DD");
    const max = moment(Math.max(...dateArr)).format("YYYY-MM-DD");

    return {
      min,
      max
    }
  }

  const disableDateRange =(d:any)=>{
    const start = getMinAndMax().min;
    const end = getMinAndMax().max;
    const mo = moment(end).add(1,'days');
    return (d.isBefore(start) || d.isAfter(mo))
  };
  console.log("SHOW EXPENSE",spent);
  console.log("DRAWER CLOSE:", open)
  return (
    <div>
      <StyledExpenseCard title={
          <div>
            <div className='header'>{`${month} EXPENSE`}</div>
            <div className={classNames('spent', 'shimmer')}>{`${spent} $`}</div>
          </div>
        }
        className='Card-container'
      >
        {/* <DatePicker defaultValue={moment().month(month)} disabledDate={disableDateRange} onChange={onDateChange} /> */}
        { monthExpense.length ? monthExpense.map((exp:any, i:number) => 
          <>
            <Divider plain><Text type='secondary'>{getDate(exp.date)}</Text></Divider>
            <StyledInnerCard 
              key={i}
              className='inner-container'
              type="inner" 
              title={<Text>{exp.expenseName}</Text>}
              extra={
                // <>
                //   <Button onClick={()=>showDrawer(exp,true)} type='link'>Edit</Button>
                //   <Button onClick={() => showDeleteModal(exp)} danger type='link'>Delete</Button>
                // </>
                <Dropdown trigger={['click']} onOpenChange={()=>setSelectedExpense(exp)} menu={{items}}>
                  <EllipsisOutlined />
                </Dropdown>
              }>
              <Text type='secondary'>Spent:</Text>
              <Text>{exp.amount}</Text>
              {
                exp.category?.map((cat:string, i:number) => <Tag color="#87d068" key={i}>{cat}</Tag>)
              }
            </StyledInnerCard>
            <Modal
              title=""
              centered
              open={openModal}
              onOk={onDelete}
              onCancel={() => setModalOpen(false)}
            >
              <Title level={5}>{`Are you sure want to delete ?`}</Title>
            </Modal>
          </>
          ): <EmptyData />}
          <BottomDrawer expense={ selectedExpense } onChange={onChange} onClose={onClose} open={open} />
        </StyledExpenseCard>
      <StyledAddBtn onClick={()=>showDrawer({},false)} type="primary" shape="circle" icon={<PlusOutlined />} size={'large'} />
    </div>
  )
}
