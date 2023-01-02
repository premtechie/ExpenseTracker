import { Button, Card } from "antd";
import styled, { css } from "styled-components";

export const StyledAddBtn = styled(Button)`
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 1rem;
`;

export const StyledExpenseCard = styled(Card)`
  &.Card-container {
    height: calc(100vh - 80px);
    border-bottom: 0;

    .ant-card-body {
      padding: 0 24px;
    }
    .ant-card-head {
      border: none;
    }

    &.Card-container > {
      .ant-card-head {
        position: sticky;
        top: 0;
        z-index: 999;
        background: #fff;
        background-image: none;
        background-image: none;
        background-image: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0.9) 100%
        );

        &::after {
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
      }
    }
  }
  .ant-card-head-wrapper {
    .ant-card-head-title {
      padding: 16px 0 0;

      .header {
        text-transform: uppercase;
        font-size: 12px;
        text-align: center;
        margin: 0;
        color: gray;
      }
    }

    .spent {
      /* margin-top: -1.8rem; */
      /* margin-bottom: 1rem; */
      font-size: 38px;
      text-align: center;
    }
  }

  .shimmer {
    font-weight: 300;
    font-size: 3em;
    margin: 0 auto;
    padding: 0 40px;
    text-align: center;
    color: rgba(255, 255, 255, 0.1);
    font-weight: bold;
  }

  .shimmer {
    /* the shimmer magic */
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      from(#222),
      to(#222),
      color-stop(0.5, #fff)
    );
    background: -moz-gradient(
      linear,
      left top,
      right top,
      from(#222),
      to(#222),
      color-stop(0.5, #fff)
    );
    background: gradient(
      linear,
      left top,
      right top,
      from(#222),
      to(#222),
      color-stop(0.5, #fff)
    );
    -webkit-background-size: 125px 100%;
    -moz-background-size: 125px 100%;
    background-size: 125px 100%;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
    -webkit-animation-name: shimmer;
    -moz-animation-name: shimmer;
    -webkit-animation-name: shimmer;
    animation-name: shimmer;
    -webkit-animation-duration: 2s;
    -moz-animation-duration: 2s;
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-color: #222;
  }

  @-moz-keyframes shimmer {
    0% {
      background-position: top left;
    }

    100% {
      background-position: top right;
    }
  }

  @-webkit-keyframes shimmer {
    0% {
      background-position: top left;
    }

    100% {
      background-position: top right;
    }
  }

  @-o-keyframes shimmer {
    0% {
      background-position: top left;
    }

    100% {
      background-position: top right;
    }
  }

  @-ms-keyframes shimmer {
    0% {
      background-position: top left;
    }

    100% {
      background-position: top right;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: top left;
    }

    100% {
      background-position: top right;
    }
  }
`;

// position: sticky;
// top: 0;
// z-index: 999;
// background: #fff;
//   background-image: none;
// background-image: none;
// background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.9) 100%);
export const StyledInnerCard = styled(Card)`
  margin-bottom: 12px;

  .ant-typography {
    margin-right: 8px;
  }
  .ant-tag {
    float: right;
  }
  &.inner-container {
    .ant-card-body {
      padding: 16px;
    }
    .ant-card-head {
      padding: 0 16px;
      border: inherit;
    }
    .ant-card-head-wrapper .ant-card-head-title {
      padding: 0;
    }
    .ant-btn-dangerous.ant-btn-link {
      padding-right: 0;
    }
  }
`;

export const commonStyle = css`
  position: sticky;
  top: 0;
  z-index: 999;
  background: #fff;
  background-image: none;
  background-image: none;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.9) 100%
  );
`;
