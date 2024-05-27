import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2;
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 1219px;
    padding: 0px 220px;
    height: 100%;
    background: ${(props) =>
      props.hasGradient
        ? `linear-gradient(
      91deg,
      rgba(0, 0, 0, 0.68) 0%,
      rgba(0, 0, 0, 0.68) 72.19%,
      rgba(31, 31, 30, 0) 100%
    )`
        : `none`};
    backdrop-filter: ${(props) => (props.hasGradient ? `blur(7px)` : `none`)};

    h2 {
      font-size: 70px;
      line-height: 91px;
      color: #c8a85d;
      margin-bottom: 24px;
    }

    p {
      font-size: 38px;
      font-weight: 600;
      line-height: 46px;
      margin-bottom: 76px;
    }
  }
`;
