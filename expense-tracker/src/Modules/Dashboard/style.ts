import { Card } from "antd";
import styled from "styled-components";

export const StyledDashboardCard = styled(Card)`
  position: relative;
  height: calc(100% - 50px);
  border-bottom: 0;

  .ant-card-head {
    padding: 0 16px;

    .ant-card-head-title {
      font-size: 14px;
      color: gray;
    }
  }
`;
export const StyledLoaderSpin = styled.div`
  position: absolute;
  top: auto;
  left: 50%;
`;
export const StyledLayout = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  position: relative;
  border-bottom: 0;
`;
