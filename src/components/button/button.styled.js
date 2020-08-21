import styled, { css } from "styled-components";

const buttonStyles = css`
  border: none;
  color: white;
  outline: none;
`;

const movieButtonStyle = css`
  background: var(--tertiary-color-light);
  color: #fff;
  border: none;
  box-shadow: 0 10px 20px black;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  padding: 0 25px;
  transition: all 0.3s;

  & span {
    margin-left: 0.6em;
  }
  & svg {
    width: calc(var(--button-size) + 0.3em);
    height: calc(var(--button-size) + 0.3em);
  }

  &:hover {
    background-color: #fff;
    color: black;
  }
`;

const getButtonStyle = (props) => {
  if (props.movieButtonStyle) {
    return movieButtonStyle;
  }
  return buttonStyles;
};

export const CustomButtonContainer = styled.button`
  cursor: pointer;
  margin-top: 2.8em;

  font-family: inherit;
  font-weight: 500;
  font-size: var(--button-size);
  border-radius: 0.4em;
  ${getButtonStyle}
`;