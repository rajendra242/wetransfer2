import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useLanguage } from "../../contexts/LanguageContext";
import { dictionary } from "../../contexts/siteCongress";
import { devices } from "../../stylesCongress";

export default function Modal({ show, setShow }) {
  const { language } = useLanguage();
  const wrapper = useRef(null);

  const handleCancel = () => {
    setShow(false);
    window.location.href = "/";
  };

  const handleContinue = () => {
    setShow(false);
  };

  useEffect(() => {
    if (show) {
      wrapper.current.focus();
    }
  }, [show]);

  return show ? (
    <ModalWrapper
      className="fadeOut"
      aria-hidden={!show}
      ref={(node) => (wrapper.current = node)}
    >
      <ModalInner className="fadeInUp fadeOut">
        <ModalContent
          dangerouslySetInnerHTML={{
            __html: dictionary[language].modal.children,
          }}
        ></ModalContent>
        <p>
          <button
            className="fadeInUp fadeOut"
            type="button"
            onClick={handleCancel}
            dangerouslySetInnerHTML={{
              __html: dictionary[language].modal.cancel,
            }}
          />
          <button
            className="fadeInUp fadeOut"
            type="button"
            onClick={handleContinue}
            dangerouslySetInnerHTML={{
              __html: dictionary[language].modal.continue,
            }}
          />
        </p>
      </ModalInner>
    </ModalWrapper>
  ) : null;
}

const appear = keyframes`
  to {
    opacity: 1;
  }
`;

export const ModalWrapper = styled.div`
  background-color: rgba(14, 56, 89, 0.75);
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  //opacity: 0;
  //animation: ${appear} .3s linear forwards;
`;

export const ModalInner = styled.div`
  background-color: white;
  border-radius: 16px;
  max-width: 100%;
  padding: 40px 16px 40px 16px;
  position: absolute;
  top: 32px;
  left: 16px;
  right: 16px;

  @media ${devices.M} {
    padding: 56px 40px;
    top: 33%;
    left: 24px;
    right: 24px;
    margin-top: 0;
  }

  @media ${devices.Portrait} {
    left: 20%;
    right: 20%;
  }

  @media ${devices.L} {
    top: 50%;
    left: 50%;
    right: 50%;
    margin-top: 0;
    transform: translate(-50%, -50%);
    min-width: 1031px;
  }

  p {
    text-align: center;
    margin-bottom: 0;
    //max-width: 670px;

    button {
      border-radius: 8px;
      font-style: normal;
      font-weight: 600;
      font-family: FilsonProBold;
      font-size: 14px;
      line-height: 17px;
      margin-bottom: 10px;
      padding: 13px 24px;
      text-transform: uppercase;
      width: 100%;

      @media ${devices.M} {
        margin-bottom: 0;
        width: unset;
      }

      @media ${devices.L} {
        font-size: 24px;
        line-height: 29px;
        padding: 24px 60px;
      }

      &:first-child {
        background: white;
        color: #3b2b2b;
        border: 1px solid #3b2b2b;
        margin-right: 40px;
        &:hover {
          background: #3b2b2b;
          color: white;
        }
      }

      &:last-child {
        background: #0e3859;
        color: white;
        border: 1px solid #0e3859;
        margin-bottom: 0;

        &:hover {
          background: white;
          color: #0e3859;
        }
      }
    }
  }
`;

export const ModalContent = styled.div`
  p {
    font-style: normal;
    font-size: 14px;
    color: #3b2b2b;
    line-height: 28px;
    margin-bottom: 50px;
    text-align: center;

    &:last-child {
      margin-bottom: 40px;
    }

    @media ${devices.M} {
      font-size: 16px;
      line-height: 30px;
    }

    @media ${devices.L} {
      font-size: 23px;
      line-height: 40px;
    }

    strong {
      font-weight: 700;
      font-family: FilsonProBold;
    }
  }
`;
