import styled from "styled-components";
import { Container, ContentWrapper, devices } from "../../stylesCongress";

export const IntroContainer = styled(Container)`
  margin: 0px;

  > img {
    width: 198px;
    // position: absolute;
    // top: 73px;
    // right: 55px;
  }

  // @media (max-width: 1366px) {
  //   > img {
  //     margin-left: 150px;
  //     position: absolute;
  //     bottom: -400px;
  //   }
  // }

  // @media ${devices.PORTRAIT} {
  //   margin-inline: 70px;
  //   > img {
  //     margin-left: 0px;
  //     position: absolute;
  //     bottom: 189px;
  //   }
  // }
`;

export const IntroWrapper = styled(ContentWrapper)`
  margin: 0px;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: unset;
  padding-top: 180px;

  @media (max-width: 1366px) {
    /* margin-left: 150px; */
  }

  @media ${devices.PORTRAIT} {
    /* margin-top: 549px;
    margin-left: 0px; */
  }

  h1 {
    margin-bottom: 24px;
    font-size: 70px;
    line-height: 130%;
    font-weight: 700;
    letter-spacing: 1px;
    color: #c8a85d;
  }

  h2 {
    margin-bottom: 76px;
    color: #ffffff;
    font-size: 38px;
    line-height: 46px;
    font-weight: 600;
  }

  p {
    color: #d7d2c5;
    font-size: 24px;
    line-height: 36px;
  }

  p:last-of-type {
    margin-bottom: 80px;
  }

  @media (max-width: 667px) {
    h1 {
      font-size: 50px !important;
    }
  }

  @media only screen and (max-width: 480px) { 
    h1 {
      font-size: 30px !important;
    }

    h2{
      font-size: 25px !important;
    }
  }

  @media only screen and (min-width: 744px) and (max-width: 1133px) and (orientation: portrait) {
    h1 {
      font-size: 50px !important;
    }
  }

  @media only screen and (min-device-width : 320px) and (max-device-width : 480px){ 
    padding-top: 170px;

    h1 {
      font-size: 30px !important;
    }

    h2 {
      font-size: 20px;
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
    padding-top: 150px;
  }
`;

export const JobCode = styled.div`
  // bottom: 50px;
  // position: absolute;
  color: #fff;
  letter-spacing: 0.5px;
  line-height: 150%;
  display: flex;
  gap: 11px;
  margin-top: 100px;

  @media only screen and (min-width: 1024px) and (max-width: 1366px) and (orientation: portrait) {
   margin-top: 400px
  }

  @media only screen and (min-width: 820px) and (max-width: 1180px) and (orientation: portrait) {
   margin-top: 400px
  }

  @media only screen and (min-width: 744px) and (max-width: 1133px) and (orientation: portrait) {
   margin-top: 200px
  }

  @media only screen and (min-width: 800px) and (max-width: 1280px) and (orientation: portrait) {
   margin-top: 400px
  }
`;