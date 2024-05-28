import styled from "styled-components";
import { ContentWrapper, devices } from "../../stylesCongress";
import { ButtonPrimary } from "../../ComponentsCongress/Button";

export const Wrapper = styled(ContentWrapper)`
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  margin-top: ${(props) => props.showICS && "100px"};
  height: ${(props) => props.showICS && "776px !important"};
  display: ${({ isHidden }) => (isHidden ? "none" : "block")};
  /* border-bottom: ${({ isIncorrectAnswer }) =>
    isIncorrectAnswer ? "3px solid #DA3131" : "3px solid #ff681d"}; */
  margin: 0px;
  background: none;
  color: #ffffff;

  b {
    font-weight: bold;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  @media (max-width: 1366px) {
    // margin-left: 150px;
  }

  @media ${devices.PORTRAIT} {
    position: unset;
    margin: 0px;
  }
`;

export const InnerWrapper = styled.div`
  @media ${devices.PORTRAIT} {
    position: absolute;
    bottom: 774px;
    margin-inline: 70px;
    width: 100%;
  }
  padding-top: 224px;
`;

export const QuestionPagination = styled.div`
  margin-bottom: 16px;
  letter-spacing: 2px;
  color: #ffffff;
  text-transform: uppercase;
  font-size: 15px;
  line-height: 26px;
`;

export const QuestionTitle = styled.h1`
  font-size: 48px;
  line-height: 120%;
  font-weight: 700;
  color: #c8a85d;

  @media only screen and (min-device-width : 320px) and (max-device-width : 480px){ 
    font-size: 25px;
  }
`;

export const QuestionSubtitle = styled.p`
  color: #03212c;
  font-weight: 500;
  margin-top: 32px;
  font-size: 16px;
  line-height: 26px;

  @media ${devices.L} {
    font-weight: 300;
    font-size: 16px;
  }
`;

export const AnswerExplanation = styled.div`
  opacity: 0;
  visibility: hidden;
  position: absolute;
  left: 40px;
  right: 40px;
  padding-bottom: 30px;

  sup {
    font-size: 0.6em;
    vertical-align: top;
  }

  sub {
    vertical-align: bottom;
    font-size: 0.6em;
  }
  ul {
    list-style-type: disc;
    /* margin: 5px 5px 5px 20px; */
    margin-left: 20px;

    li:not(:last-of-type) {
      margin-bottom: 8px;
    }
  }

  button {
    margin-inline: auto;
  }

  @media ${devices.PORTRAIT} {
    max-width: 860px;
  }
`;

export const SubmitButtonWrapper = styled.div`
  position: absolute;
  top: calc(100% - 90px);

  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
`;

export const AnswerWrap = styled.div`
  /* margin-bottom: 16px; */
  flex-shrink: 1;
  display: flex;

  input {
    position: absolute;
    opacity: 0;
  }

  &:last-child {
    //margin-bottom: 0;
  }

  @media ${devices.M} {
    width: calc(50% - 8px);

    &:nth-child(odd) {
      /* margin-right: 8px; */
    }
  }

  @media ${devices.L} {
    width: calc(50% - 8px);
  }
`;

export const FormOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 8px;

  @media only screen and (min-device-width: 400px) and (max-device-width: 930px) {
    display: block !important;
  }

  @media ${devices.large} {
    gap: 16px;
  }
`;

export const AnswerLabel = styled.label`
  border-radius: 4px;
  color: #ffffff;
  padding: 16px 24px;
  cursor: pointer;
  font-size: 18px;
  line-height: 24px;
  flex-grow: 1;
  border: 1px solid #ffffff;

  input:checked + & {
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
      ),
      #d7d2c5;
    background: #c04c1c;
    border: 1px solid #c04c1c;
    transition: all 0.3s linear;
  }
  margin-bottom: 15px;

  input:focus + & {
    outline: 2px solid transparent;
  }
`;

export const ExplanationTitle = styled.h1`
  font-size: 36px;
  line-height: 43px;
  color: #03212c;
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 32px;

  img {
    width: 72px;
    height: 72px;
  }
  @media ${devices.PORTRAIT} {
    font-weight: 500;

    span {
      strong {
        font-weight: 700;
      }
    }
  }
  /* font-size: 26px;
  line-height: 31px;
  font-weight: 900;
  color: #d60e41;
  text-transform: uppercase;
  text-align: center;
  width: 100%;
  margin-bottom: 24px;
  font-family: FilsonProBold; */

  /* @media ${devices.M} {
    padding: 0 5%;
  }

  @media ${devices.large} {
    margin-bottom: 32px;
    font-size: 36px;
    line-height: 43px;
    padding: 0 10%;
  } */
`;

export const ExplanationLink = styled.div`
  margin-bottom: 24px;
  a {
    display: flex;
    flex-direction: column;
    align-items: left;
    padding: 16px 25px 16px 45px;
    background-color: #ffffff;
    background-repeat: no-repeat;
    border-radius: 16px;
    border: 2px solid #0e3859;
    font-style: normal;
    font-weight: 800;
    font-family: FilsonProBold;
    font-size: 18px;
    line-height: 24px;
    text-transform: uppercase;
    color: #0e3859;
    position: relative;

    &::before {
      content: url("icon_info.svg");
      position: absolute;
      left: 15px;
      top: 18px;
      display: inline-block;
    }

    &::after {
      content: url("icon_arrow.svg");
      position: absolute;
      right: 15px;
      top: 19px;
      display: inline-block;
    }

    @media ${devices.large} {
      font-weight: 800;
      font-size: 23px;
      line-height: 34px;
    }
  }
`;

export const ButtonIcon = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  position: absolute;
  right: 10px;
`;

export const Submit = styled(ButtonPrimary)`
  margin: 40px 0px;
  width: 312px;
  padding-inline: 56px 16px;
  justify-content: flex-start;

  span {
    width: 180px;
  }
`;

export const ThumbsDownContainer = styled.div`
  width: 86px;
  height: 86px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #27323e;
  margin: 0 auto 32px;
`;

export const ExplanationContent = styled.div`
  margin-bottom: 40px;

  strong {
    font-weight: 600;
  }

  p,
  ul,
  ol {
    font-size: 24px;
    line-height: 36px;
  }
`;

export const ExplanationContinueButton = styled(ButtonPrimary)`
  margin: 40px auto 0px;
  width: 312px;
  padding-inline: 56px 16px;
  justify-content: flex-start;

  span {
    width: 180px;
  }
`;