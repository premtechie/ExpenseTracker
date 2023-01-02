import { ref, remove, update } from "firebase/database"
import { db } from "../Authentiaction/auth.config"

type PayloadData =  {
  expenseName : string
  expenseAmount: number | string
  expenseDate: number | string
  expenseCategory: string[] | []
  uid: string | null
  id: string
}

export const updateExpense = (data: any, callBack: Function) => {
  const { uid, id } = data;
  console.log("FROM UPDATE",data)
  update(ref(db,`${uid}/userData`), {
    [id]: {
      ...data,
    }
  }).then(()=> {
    callBack(data)
    // alert("successfully added")
  });
}

export const deleteExpense = (id: any, uid: string | null, callBack:Function) => {
  uid ? remove(ref(db,`${uid}/userData/${id}`)).then(()=> {
    callBack(id)
    // alert("successfully added")
  }) : alert("deletion unsuccess");
}

