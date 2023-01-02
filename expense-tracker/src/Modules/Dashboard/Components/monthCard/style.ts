import { Card, Typography } from "antd";
import styled from "styled-components";
const { Text } = Typography;
export const StyledInnerCard = styled(Card)`
  margin-bottom: 12px;

  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    cursor: pointer;
  }

  .ant-card-body {
    padding: 16px;
  }
`;

export const StyledText = styled(Text)`
  font-weight: 500;
`;
