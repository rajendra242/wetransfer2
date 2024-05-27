import { ButtonPrimary } from "../Button";
import { useScreensaver } from "../../hooks/useScreensaver";
import { Wrapper } from "./styles";

export default function Screensaver({ close }) {
  const { screensaverContent } = useScreensaver();

  return (
    <Wrapper
      hasGradient={screensaverContent.gradient}
      image={screensaverContent.image}
    >
      <div>
        <h2>{screensaverContent.heading}</h2>
        <p>{screensaverContent.body}</p>
        <ButtonPrimary includeIcon onClick={close}>
          {screensaverContent.ctaCopy}
        </ButtonPrimary>
      </div>
    </Wrapper>
  );
}
