import { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

export default function Modal({ isOpen = false, children }) {
  const wrapper = useRef(null);

  useEffect(() => {
    if (isOpen) {
      wrapper.current.focus();
    }
  }, [isOpen]);

  return isOpen ? (
    <ModalWrapper
      className="fadeOut"
      aria-hidden={!isOpen}
      ref={(node) => (wrapper.current = node)}
    >
      {children}
    </ModalWrapper>
  ) : null;
}

const appear = keyframes`
  to {
    opacity: 1;
  }
`;

export const ModalWrapper = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 100;
  opacity: 0;
  animation: ${appear} 0.3s linear forwards;

`;

