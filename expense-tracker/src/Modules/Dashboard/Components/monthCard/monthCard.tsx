import { DollarTwoTone } from '@ant-design/icons';
import { Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { StyledInnerCard, StyledText } from './style';

export const MonthCard = ({monthData, month}:any) => {

  const getTotalAmount = () => {
    let amount = 0;
    monthData.map((month:any)=> amount+=Number(month.amount))
    return amount;
  }
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/expense/${month}`, { state: {expense: monthData, month, spent: getTotalAmount()} });
  }

  return (
    <StyledInnerCard 
      type="inner" 
      title={<StyledText>{month}</StyledText>} 
      onClick={handleNavigation}
      // extra={<Link to={`/expense/${month}`} state={{expense: monthData, month, spent: getTotalAmount()}}>view</Link>}
    >
      <StyledText type='secondary'>
        Total spent:
      </StyledText>
      <StyledText style={{fontSize: '12px', marginLeft: '6px', color: "#40a9ff"}}>
        {getTotalAmount()}
        <DollarTwoTone style={{fontSize: '14px', marginLeft: '4px'}} />
      </StyledText>
    </StyledInnerCard>
  )
};
