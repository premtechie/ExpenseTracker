import {Input, Button, Typography, DatePicker, DatePickerProps, Space, InputNumber } from 'antd';
import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { v4 as uuidV4 } from 'uuid';
import { isEmpty, setTimeZone } from '../../Modules/Dashboard/utils';
import { updateExpense } from '../../config/dbHandlers';
import { CustomTags } from '../Tag';
import { StyledDrawer, StyledInputWrapper } from './style';

const { Title} = Typography;

type DrawerProps = {
  onChange: (val:any)=> void,
  onClose: ()=> void,
  open: boolean,
  expense: any
}

export const BottomDrawer: React.FC<DrawerProps> = ({onChange, onClose, open, expense = [] }) => {

  const [expenseName,setExpenseName] = useState('');
  const [expAmount,setExpAmount] = useState('');
  const [expDate,setExpDate] = useState<number | string>('');
  const [expCategory,setExpCategory] = useState<string[]>([]);
  const [selectedExpense, setSelectedExpense] = useState('')

  useEffect(()=> {
    setExpDate(setTimeZone(''));
    console.log(expense)
    if(!isEmpty(expense)) {
      console.log("COMES_HERE",expense)
      setExpenseName(expense?.expenseName);
      setExpAmount(expense?.amount);
      setExpDate(expense?.date);
      console.log(expense.category)
      setExpCategory(expense?.category)
      setSelectedExpense(expense?.id)
    }
  },[expense])
  console.log("Expense",expense)

  const expHandler = (e:any) => {
    switch (e.target.name) {
      case "expenseName":
        setExpenseName(e.target.value)
        break
      case "expenseAmount":
        console.log(e.target.value)
        setExpAmount(e.target.value)
        break
      default:
        return
    }
  }
  const defineDrawerHeader = () => {
    const keys = Object.keys(expense);
    return !!keys.length ? "Edit expense" : "Add expense"
  }
  const expCategoryHandler = (tags: string) => {
    setExpCategory((oldState)=> {
      console.log(oldState, tags);
      return [...oldState, tags]
    })
  }
  const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date?.month(), setTimeZone(date), moment(date).valueOf());
    setExpDate(setTimeZone(date));
  };
  const onCloseHandler = () => {
    setExpAmount('');
    setExpCategory([]);
    setExpenseName('');
    setExpDate(setTimeZone(''));
    onClose()
  }

  const addExpenseHandler = () => {
    const uid = localStorage.getItem('uid');
    console.log(moment(expDate).month(), moment(expDate).toLocaleString());
    if(expAmount && expenseName && expDate && !!expCategory.length) {
      const payload = {
        expenseName,
        amount: expAmount,
        date: expDate,
        category: expCategory,
        uid,
        id: selectedExpense ? selectedExpense : uuidV4(),
      }

      const finish = (payload:any) => {
        onChange(payload);
        onCloseHandler();
      }

      updateExpense(payload, finish);
      // onChange(payload)
    }
    else {
      console.log("Data:",expAmount, expCategory, expenseName, expDate)
      alert("Please provide valid data");
    }
  }

  return (
    <div>
      <StyledDrawer
       title={defineDrawerHeader()}
       placement="bottom" 
       onClose={()=>console.log("cllosed")}
       open={open}
       height={500}
       footer={
        <>
          <Button onClick={onCloseHandler}>Cancel</Button>
          <Button type="primary" onClick={addExpenseHandler}>
            Save
          </Button>
        </>
       }
      closable = {false}
      destroyOnClose
      >
        <StyledInputWrapper>
          <Title level={4}>
            Expense name
          </Title>
          <Input name='expenseName' placeholder="Enter expense name" value={expenseName} allowClear onChange={expHandler} />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <Title level={4}>
            Amount spent
          </Title>
          <Input allowClear type='number' name='expenseAmount' value={expAmount} placeholder="Enter amount spent" onChange={expHandler} />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <Title level={4}>
            Spent on Date
          </Title>
          <DatePicker name='expenseDate' defaultValue={moment(expDate)} value={moment(expDate)} onChange={onDateChange} />
        </StyledInputWrapper>
        <StyledInputWrapper>
          <Title level={4}>
            Categories
          </Title>
          <CustomTags tag={expCategory} onChange={expCategoryHandler} />
        </StyledInputWrapper>
      </StyledDrawer>
    </div>
  )
};
