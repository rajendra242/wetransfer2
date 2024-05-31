import styled from "styled-components";
import { Container, ContentWrapper, devices } from "../../stylesCongress";

export const ResultsContainer = styled(Container)`
  padding-top: 200px;

  @media only screen and (min-width: 1024px) and (max-width: 1366px) {
    padding-top: 200px;
  }

  @media only screen and (min-width: 1024px) and (max-width: 1366px) and (orientation: portrait) {
    bottom: 200px !important;
  }

  @media only screen and (min-width: 820px) and (max-width: 1180px) and (orientation: portrait) {
    padding-top: 200px;
  }

  @media only screen and (min-width: 744px) and (max-width: 1133px) and (orientation: portrait) {
    padding-top: 200px;
  }

  @media only screen and (min-width: 820px) and (max-width: 1180px) and (orientation: landscape) {
    padding-top: 150px;
  }
`;

export const ResultsWrapper = styled(ContentWrapper)`
  padding: 0px;
  margin: 0px;
  background: transparent;
  display: flex;
  justify-content: space-between;

  @media (max-width: 1366px) {
    // margin-left: 150px;
  }

  @media ${devices.PORTRAIT} {
    margin-inline: 70px;
    position: absolute;
    bottom: 774px;
    width: 100%;
  }

  h1 {
    font-weight: 700;
    font-size: 70px;
    line-height: 130%;
    text-align: left;
    color: #c8a85d;
    margin-bottom: 24px;
  }

  @media only screen and (min-width: 1024px) and (max-width: 1366px) and (orientation: portrait) {
    h1 {
      font-size: 50px !important;
    }
  }

  @media only screen and (min-width: 820px) and (max-width: 1180px) and (orientation: portrait) {
    h1 {
      font-size: 50px;
    }
  }

  @media only screen and (min-width: 744px) and (max-width: 1133px) and (orientation: portrait) {
    h1 {
      font-size: 35px;
    }
  }


  h2 {
    font-weight: 700;
    font-size: 30px;
    line-height: 33px;
    color: #ffffff;
    margin-bottom: 44px;
  }

  hr {
    width: 80px;
    height: 2px;
    background-color: #ff681d;
    border: none;
    margin-block: 0px 16px;
  }

  button {
    width: 312px;
    height: 60px;
    padding-inline: 56px 32px;
    display: flex;
    justify-content: flex-start;
    margin-top: 24px;
    gap: 8px;

    span {
      width: 188px;
    }
  }
`;

export const ScoreCard = styled.div`
  background-color: #03212c;
  width: 100%;
  padding-block: 40px;

  h1 {
    color: #d7d2c5;
    font-weight: 500;
    font-size: 36px;
    line-height: 43px;
    text-transform: none;
  }

  span {
    color: #ff681d;
  }
`;

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 40px;
  gap: 24px;

  @media ${devices.large} {
    /* gap: 24px; */
  }
`;

export const QRContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
  margin-bottom: 44px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 28px;
    align-items: center;

    img {
      width: 216px;
      height: 216px;
    }

    p {
      font-weight: 400;
      font-size: 20px;
      line-height: 29px;
      margin: 0px;
      max-width: 285px;

      strong {
        font-weight: 700;
      }
    }
  }
`;

export const QRCodeLink = styled("p")`
  font-weight: 700;
  font-size: 16px !important;
  line-height: 30px !important;

  strong {
    font-weight: 500;
    font-family: FilsonProMedium;
  }

  @media ${devices.large} {
    font-size: 23px !important;
    line-height: 40px !important;
  }
`;
