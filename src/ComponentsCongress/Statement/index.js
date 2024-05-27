import gsap from "gsap/gsap-core";
import React, { useEffect,  useLayoutEffect} from "react";
import TagManager from "react-gtm-module";
import sanitizeHtml from "sanitize-html";
import { swapName } from "../../utils";
import { Assessment, BodyCopy, Disclaimer, Image, Promo, Title } from "./styles";
// import { Assessment, Disclaimer, Image, Promo, Title } from "./styles";
import { q8 } from "../../contexts/siteCongress";

export default function Statement({ setShowICS }) {
  
  useEffect(() => {
    // analytics event for page load
    const tagManagerArgs = {
      dataLayer: {
        event: "gaQuizEvent",
        eventAction: "International Statements",
        eventLabel: "International consensus statements on peri-operative ID/IDA management",
      },
    };
    TagManager.dataLayer(tagManagerArgs);
  }, []);



  useLayoutEffect(() => {
    const wrapperAnimation = gsap.fromTo(
      ".wrapper",
      { height: 0 },
      {
        height: document.getElementById('ICS').offsetHeight + 65,
        duration: 0.5,
      }
    );
    wrapperAnimation.then(() => {});
  }, []);

  useLayoutEffect(() => {
    gsap.fromTo(".fadeIn", { autoAlpha: 0 }, { autoAlpha: 1, stagger: 0.05 });
  }, []);

  return (
        // <div id="ICS">
        //   <Title className="questionContent fadeIn moveUp">International consensus statements on peri-operative ID/IDA management</Title>

        //   <Assessment
        //       className="questionContent fadeIn moveUp"
        //       dangerouslySetInnerHTML={{
        //         __html: sanitizeHtml(
        //           swapName(`
        //             <p><span>Assessment:</span> For expected moderate&#8211;high blood loss (>500 mL) patients should be assessed for iron status (serum iron, ferritin and transferrin saturation) as soon as the decision for surgery is undertaken<sup>1</sup> or at least 30 days before surgery.<sup>2</sup></p>`, `surgery`)
        //           ),
        //       }}
        //   ></Assessment>
          
        //   <BodyCopy className="questionContent fadeIn moveUp">
        //     Recommendation for classification and treatment of peri-operative anaemia<sup>1</sup>
        //   </BodyCopy>

        //   <Image>
        //     <picture>
        //       <source
        //         media="(max-width: 767px)"
        //         srcSet="./statement-idida-mob.svg 767w"
        //         sizes="767px"
        //       />
        //       <source
        //         srcSet="./statement-idida.svg 1280w"
        //         sizes="1280px"
        //       />
        //       <img 
        //         width={screen.width > 767 ? "588" : "345" }
        //         height={screen.width > 767 ? "260" : "917" }
        //         className="questionContent fadeIn moveUp"  
        //         src="./statement-idida.svg" 
        //         alt="International consensus statements on peri-operative ID/IDA management" 
        //       />
        //     </picture>
        //   </Image>

        //   <Promo className="questionContent fadeIn moveUp">
        //     <p><strong>Iron deficient non-anaemic patients</strong> undergoing surgical procedures with moderate to high blood loss may benefit from pre-operative iron treatment</p>
        //   </Promo>

        //   <Disclaimer className="questionContent fadeIn moveUp">
        //     <small>Adapted from Muñoz M <em>et al.</em> 2017.</small><sup>1</sup>
        //   </Disclaimer>

        // </div>
      <div id="ICS">
        <Title className="questionContent fadeIn moveUp" dangerouslySetInnerHTML={{__html: q8.ICS.title}} />
        <Assessment className="questionContent fadeIn moveUp" dangerouslySetInnerHTML={{__html: sanitizeHtml(swapName(q8.ICS.assessment,`surgery`)) }} />
        <BodyCopy className="questionContent fadeIn moveUp" dangerouslySetInnerHTML={{__html: q8.ICS.recommendation }} />
        <Image>
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet="./statement-idida-mob.svg 767w"
              sizes="767px"
            />
            <source
              srcSet="./statement-idida.svg 1280w"
              sizes="1280px"
            />
            <img 
              width={screen.width > 767 ? "860" : "345" }
              height={screen.width > 767 ? "323" : "917" }
              className="questionContent fadeIn moveUp"  
              src="./statement-idida.svg" 
              alt="International consensus statements on peri-operative ID/IDA management" 
            />
          </picture>
        </Image>
        <Promo className="questionContent fadeIn moveUp" dangerouslySetInnerHTML={{__html: q8.ICS.promo }} />
        <Disclaimer className="questionContent fadeIn moveUp" dangerouslySetInnerHTML={{__html: q8.ICS.disclaimer }} />
      </div>
  );
}
