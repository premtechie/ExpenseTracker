import styled from "styled-components"

export const StyledLoginLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const StyledButton = styled.button`
  border-radius: 6px;
  width: 180px;
  border: 1px solid lightgrey;
  background-color: whitesmoke;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  color: gray;
  font-size: 14px;
`;

export const StyledGoogleIcon = styled.img`
  width: 24px;
  padding-left: 8px;
`;
