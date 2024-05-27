import styled from "styled-components";
import { ButtonSecondary, devices } from "../../stylesCongress";

export const StatementWrapper = styled.div`
  height: 690px;
  margin-top: 100px;
`;

export const Title = styled.h1`
  margin-bottom: 24px;
  font-style: normal;
  font-weight: 800;
  font-size: 22px;
  line-height: 28px;
  color: ${({ theme }) => theme.secondary} !important;
  text-align: left !important;

  @media ${devices.large} {
    font-size: 23px !important;
    line-height: 34px !important;
  }
`;

export const Image = styled.div`
  img {
    width: 100%;
    position: relative;
    height: 100%;
  }

  @media ${devices.large} {
    height: 100%;
  }
`;

export const Assessment = styled.div`
  p {
    align-items: left;
    background-color: #ffffff;
    background-repeat: no-repeat;
    background-position: center left 15px;
    border-radius: 6px;
    border: 2px solid ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.body};
    display: inline-block;
    //flex-direction: column;
    font-style: normal;

    font-size: 16px;
    line-height: 24px;
    padding: 16px;
    position: relative;
    span {
      color: ${({ theme }) => theme.primary};
      font-weight: 700;
      font-family: FilsonProBold;
    }

    @media ${devices.large} {
      font-size: 20px;
      line-height: 32px;
    }
  }
`;

export const BodyCopy = styled.p`
  font-size: 16px !important;
  line-height: 24px !important;

  @media ${devices.large} {
    font-size: 18px !important;
    line-height: 32px !important;
  }
`;

export const Promo = styled.div`
  margin: 16px 0 0;
  p {
    display: flex;
    flex-direction: column;
    align-items: left;
    padding: 18px;
    margin-bottom: 0px;
    background-color: #ffffff;
    background-repeat: no-repeat;
    border-radius: 6px;
    font-style: normal;
    font-size: 16px;
    line-height: 24px;
    position: relative;
    display: inline-block;
    background-color: ${({ theme }) => theme.primary};
    color: white;
    font-size: 20px;
    line-height: 32px;
    }

    strong {
      font-weight: 700;
      font-family: FilsonProBold;
    }
  }
`;

export const Disclaimer = styled.p`
  text-align: left;
  font-size: 12px;
  margin-top: 6px;

  small {
    @media ${devices.large} {
      font-size: 17px;
      line-height: 26px;
    }
  }
`;
