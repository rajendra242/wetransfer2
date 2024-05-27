import styled from "styled-components";
import ArrowRight from "./ArrowRight";

export function ButtonPrimary({
  onClick,
  includeIcon = false,
  children,
  ...props
}) {
  if (props.submitRef) {
    return (
      <Button ref={props.submitRef} onClick={onClick} {...props}>
        {children}
        {includeIcon && <ArrowRight />}
      </Button>
    );
  }

  return (
    <Button onClick={onClick} {...props}>
      {children}
      {includeIcon && <ArrowRight />}
    </Button>
  );
}
export function ButtonSecondary({
  onClick,
  includeIcon = false,
  children,
  ...props
}) {
  if (props.submitRef) {
    return (
      <StyledButtonSecondary ref={props.submitRef} onClick={onClick} {...props}>
        {children}
        {includeIcon && <ArrowRight />}
      </StyledButtonSecondary>
    );
  }

  return (
    <StyledButtonSecondary onClick={onClick} {...props}>
      {children}
      {includeIcon && <ArrowRight />}
    </StyledButtonSecondary>
  );
}

const Button = styled.button`
  background-color: #c04c1c;
  box-shadow: 0px 1px 3px 1px rgba(60, 64, 67, 0.15),
    0px 1px 2px 0px rgba(60, 64, 67, 0.3);
  border: none;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 32px 16px 56px;

  img {
    width: 28px;
    height: 28px;
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`;

const StyledButtonSecondary = styled(Button)`
  background-color: #ffffff;
  color: #c04c1c;

  &:disabled {
    background: #ffffff;
    opacity: 0.6;
    border: 2px solid #03212c;
    color: #03212c;
  }
`;
