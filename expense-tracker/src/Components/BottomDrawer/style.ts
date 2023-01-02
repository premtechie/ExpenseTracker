import styled from "styled-components";
import { Drawer } from "antd";

export const StyledDrawer = styled(Drawer)`
  .ant-input-affix-wrapper {
    min-width: 125px;
    max-width: 250px;
  }
  .ant-input-number {
    width: 250px;
  }
  .ant-tag,
  .ant-input-sm {
    margin: 8px 8px 8px 0;
  }
  .ant-drawer-footer {
    gap: 24px;
    display: flex;
    justify-content: end;
  }
`;

export const StyledFooter = styled.div`
  display: flex;
  position: absolute;
  bottom: 24px;
  right: 24px;

  .ant-btn-primary {
    margin-left: 12px;
  }
`;

export const StyledInputWrapper = styled.div`
  margin-bottom: 12px;
`;
