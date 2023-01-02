import styled from "styled-components";
import { PageHeader } from "antd";

export const StyledHeader = styled(PageHeader)`
  &.site-page-header {
    border: 1px solid rgb(235, 237, 240);
    padding: 8px 16px;

    .header {
      display: flex;
      align-items: center;
    }
    .title {
      font-size: 12px;
      margin-left: 8px;
    }
  }
  .ant-avatar {
    margin-right: 0;
  }
  &.ant-page-header-compact .ant-page-header-heading {
    flex-wrap: nowrap;
  }
  .ant-page-header-heading-left {
    .ant-page-header-heading-title {
      font-size: 16px;
    }
  }
  .username {
    font-size: 12px;
    color: gray;
    font-weight: 600;
  }
`;
