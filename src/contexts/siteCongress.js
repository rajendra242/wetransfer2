// Use [NAME] to replace it with patient name on render
import { createContext, useContext } from "react";
import { useLanguage } from "./LanguageContext";
import Explanation_Q1_1 from "../assets/images/explanation/q1_1.png";
import Explanation_Q1_2 from "../assets/images/explanation/q1_2.png";
import Explanation_Q5 from "../assets/images/explanation/q3.png";
import Explanation_Q6 from "../assets/images/explanation/q6.png";

const dictionaryEN = {
  intro: {
    heading: `Diagnosing and monitoring geographic atrophy (GA)`,
    subheading: "How much do you know?",
    cta: `Start the quiz`,
    copyright: "&copy; Apellis International GmbH. All rights reserved.",
    jobCode: "EU-GA-2400055",
    dop: "July 2024",
  },
  questions: {
    treat: `Continue`,
  },
  explanation: {
    correct: "You've made the <strong>correct</strong> selection",
    incorrect: "You've made the <strong>incorrect</strong> selection",
  },
  resultsPage: {
    youScored: `Your score is`,
    outOf: "/",
    qrCodeLabelOne:
      "Scan the QR code to join us on our journey in geographic atrophy (GA)",
    negative: "Would you like to try again?",
    positive: "Well done!",
    tryAgain: "Take the quiz again",
  },
  menuBar: {
    restart: "Restart",
    back: "Back",
  },
  footnotes: {
    footnotesAbbreviationsReference: "References",
    footnotesAbbreviationsReferences: "References",
    footnotesAbbreviationReference: "References",
    footnotesAbbreviationReferences: "References",
    abbreviation: `References`,
    abbreviations: `References`,
    abbreviationReference: "References",
    abbreviationReferences: "References",
    abbreviationsReference: "References",
    abbreviationsReferences: "References",
    footnoteAndAbbreviation: "References",
    footnotesAbbreviation: "References",
    footnotesAbbreviations: "References",
    footnoteReferences: "References",
    footnotesReferences: "References",
    reference: `References`,
    references: `References`,
    footnoteAndReference: `References`,
    footnoteAndAbbreviations: "References",
    footnoteAndReferences: `References`,
  },
  restart: {
    heading: "Start again",
    copy: "Are you sure you want to restart?",
    continueBtn: "Keep going",
    restartBtn: "Start again",
  },
  buttons: {
    continue: `Continue`,
    select: `Continue`,
  },
  pagination: {
    question: "Question",
    of: "of 5",
  },
  timeout: {
    heading: "You haven't finished",
    para: "Are you sure you want to give up?",
    continue: "Continue",
    restart: "I give up!",
    second: "second",
    seconds: "seconds",
  },
};

export const shared = {
  right: "You've made the right selection for",
  wrong: "You've made the wrong selection for",
  selection: "selection for",
};

export const references = {
  "/": "", // Homepage
  "patient-selector": "",
  tutorial: "",
  results: "",
  intersection: "",
  statement: "",
};

export const abbreviations = {
  "/": "", // Homepage
  "patient-selector": "",
  tutorial: "",
  results: "",
  intersection: "",
  statement: "",
};


const q1 = {
  title:
    "What was the median time to develop foveal involvement after GA diagnosis in the AREDS study?",
  subheading: "Select an answer",
  answers: [
    { label: "1.9 years" },
    { label: "2.5 years", isRight: true },
    { label: "4.8 years" },
    { label: "7.1 years" },
  ],
  explanation: {
    body: `<div><p><strong>Answer:</strong> 2.5 years</p><p>In the prospective AREDS study (N=3640), patients were analysed for progression to foveal GA. Of the 397 patients with GA that progressed to the fovea, the median time to foveal involvement was only 2.5 years (95% CI: 2.0–3.0) from diagnosis.<sup>1</sup></p><p>Hence, early identification of GA is critical, as is regular monitoring of disease progression.<sup>2</sup></p></div>`,
  },
  questionAbbreviations: "",
  questionReferences:
    "<ol><li>Lindblad AS, <em>et al. Arch Ophthalmol.</em> 2009;127(9):1168–1174.</li><li>Royal College of Ophthalmologists. Age-related macular degeneration services: executive summary. 2021. Available at: https://www.rcophth.ac.uk/wp-content/uploads/2021/08/AMD-Commissioning-Guidance-Executive-Summary-June-2021.pdf (accessed August 2023).</li></ol>",
  explanationAbbreviations: "",
  explanationReferences:
    "<ol><li>Fleckenstein M, et al. Ophthalmology. 2018;125(3):369&ndash;390.</li></ol>",
};

const q2 = {
  title: "What is the approximate median yearly progression rate for GA?",
  subheading: "Select an answer",
  answers: [
    {
      label: "0.53 mm<sup>2</sup>/year",
    },
    {
      label: "1.78 mm<sup>2</sup>/year",
      isRight: true,
    },
    { label: "2.62 mm<sup>2</sup>/year" },
    { label: "4.21 mm<sup>2</sup>/year" },
  ],
  explanation: {
    body: `<div><p><strong>Answer:</strong> 1.78 mm<sup>2</sup>/year</p><p>While GA progression rates demonstrate variability, overall rates reported in the literature range from 0.5341 to 2.642 mm<sup>2</sup>/year, with a median of ~1.78 mm<sup>2</sup>/year.<sup>1</sup></p><p>It is critical to recognise GA at first sight and regularly monitor progression to help patients manage their disease.<sup>2</sup></p></div>`,
  },
  questionAbbreviations: "",
  questionReferences:
    "<ol><li>Fleckenstein M, <em>et al. Ophthalmology.</em> 2018;125(3):369–390.</li><li>Royal College of Ophthalmologists. Age-related macular degeneration services: executive summary. 2021. Available at: https://www.rcophth.ac.uk/wp-content/uploads/2021/08/AMD-Commissioning-Guidance-Executive-Summary-June-2021.pdf (accessed August 2023).</li></ol>",
  explanationAbbreviations: "",
  explanationReferences:
    "<ol><li>Archivdaten. Global Harris Poll Patientenumfrage 2022.</li></ol>",
};

const q3 = {
  title:
    "What are some of the risk factors for developing fast progressing GA?",
  subheading: "Select all that apply",
  answers: [
    {
      label: "Unifocal lesions",
    },
    {
      label: "Foveal involvement",
    },
    { label: "Larger diagnosis lesion size", isRight: true },
    { label: "Perilesional FAF patterns", isRight: true },
  ],
  explanation: {
    body: `<div><p><strong>Answers:</strong> 3 and 4</p><p>Lesion characteristics such as larger lesion size at baseline, multifocal lesions, perilesional FAF patterns (indicating excessive lipofuscin accumulation), and non-subfoveal location are all considered prognostic for a higher progression rate of GA</p><img alt="" src=${Explanation_Q5} width="500" height="300" />
    <small>
      <span>Lesion features associated with progression of GA on fundus autofluorescence (FAF).</span><span>Images from Fleckenstein <em> et al.</em> 2018.<sup>1</sup></span>
    </small>
    <small>
      <span>
        <strong>Watch icon denotes a morphology related to faster progression</strong><br>
      Images courtesy of Netan Choudhry, MD, FRCS(C), DABO, Vitreous Retina Macula Specialists of Toronto (Lesion location).Images reprinted from Fleckenstein M, et al. Ophthalmology. 2018;125(3):369-390. ©️ 2018, with permission from the American Academy of Ophthalmology (FAF pattern).</span>
    </small>
    </div>`,
  },
  questionAbbreviations: "",
  questionReferences:
    "<ol><li>Fleckenstein M, <em>et al. Ophthalmology.</em> 2018;125(3):369–390.</li></ol>",
  explanationAbbreviations: "",
  explanationReferences:
    "<ol><li>Boyer DS, et al. Retina. 2017;37(5):819&ndash;835.</li></ol>",
};

const q4 = {
  title:
    "What is the expected decrease in visual acuity over five years in patients with GA?",
  subheading: "Select an answer",
  answers: [
    { label: "6.7 letters" },
    { label: "12 letters" },
    { label: "17.2 letters" },
    { label: "22 letters", isRight: true },
  ],
  explanation: {
    body: `<div><p><strong>Answer:</strong> 22 letters</p><p>Data from the AREDS study (N=3640) show that visual acuity progressively declined following foveal involvement of GA lesions. Five years after diagnosis of foveal GA, participants' visual acuity had decreased by an average of 22 letters to 41.9 letters (~6/48).<sup>1</sup></p>
    <p>Disease progression in GA is constant.<sup>1–4</sup> It is critical to recognise GA as early as possible as it can have a significant impact on patients' vision and subsequent quality of life.<sup>5–7</sup></p><img alt="" src=${Explanation_Q6} width="500" height="304" /><small><span>Mean visual acuity one year before diagnosis of foveal GA to five years after diagnosis (with 95% confidence intervals).<br />Adapted from Lindblad <em>et al</em>. 2009.<sup>1</sup></span></small></div>`,
  },
  questionAbbreviations: "",
  questionReferences:
    "<ol><li>Lindblad AS,<em>et al. Arch Ophthalmol.</em> 2009;127(9):1168–1174.</li><li>Boyer DS, <em>et al. Retina.</em> 2017;37(5):819–835.</li><li>Holz FG, <em>et al. Ophthalmology.</em> 2014;121(5):1079–1091.</li><li>Sunness JS, <em>et al. Ophthalmology.</em> 2007;114(2):271–277. </li><li>Jones D, <em>et al. Invest Ophthalmol Vis Sci.</em> 2022;63(7):A0145.</li><li>Sivaprasad S, <em>et al. Ophthalmol Ther.</em> 2019;8(1):115–124. </li><li>Apellis & The Harris Poll. 2022. Geographic Atrophy Insights Survey (GAINS).</li></ol>",
  explanationAbbreviations: "",
  explanationReferences:
    "<ol><li>Fleckenstein, M. et al. Ophthalmology. 2018;125(3):369&ndash;390.</li><li>Sunness JS, et al. Ophthalmology. 2007;114(2):271&ndash;277.</li><li>Boyer DS, et al. Retina. 2017;37(5):819&ndash;835.</li></ol>",
};

const q5 = {
  title: "What is the role of microperimetry in GA?",
  subheading: "Select an answer",
  answers: [
    {
      label: "Microperimetry bridges retinal structure (measured by OCT/FAF) to visual function",
    },
    {
      label: "Microperimetry measures patient reported perception of light stimuli",
    },
    { label: "Microperimetry specifically assesses macular sensitivity" },
    { label: "Microperimetry showed highest correlation with GA area (vs BCVA, LLVA, reading speed and more)" },
    { label: "All of the above", isRight: true,},
  ],
  explanation: {
    body: `<div><p><strong>Answer:</strong> All of the above</p><p>
      Microperimetry is an important tool in GA. It bridges retinal structure (measured by OCT/FAF) to visual function, measures patient reported perception of light stimuli and assesses macular sensitivity. In the CHROMA and SPECTRI studies microperimetry showed highest correlation with GA area vs. BCVA, LLVA, NEI VFQ-25, FRI Index, reading speed.
    </p></div>`,
  },
  questionAbbreviations: "",
  questionReferences:
  "<ol> <li>Rachitskaya AV, et al. oral presentation at the Macula Society Annual Meeting. Palm Springs, CA, USA. 7–10 February 2024;</li> <li>Heier JS, et al. Ophthalmol Retina 2020;4:673–688. </li><li>Chang DS <em>et al. Ophthalmology</em> Sci 2023;4(1):100351.<br>BCVA=Best-corrected Visual Acuity; GA=geographic atrophy; LLVA=low luminance visual acuity.</li></ol>",
  explanationAbbreviations: "",
  explanationReferences:
    "<ol><li>Archivdaten. Global Harris Poll Patientenumfrage 2022.</li></ol>",
};

export const patient1 = {
  name: "quiz",
  questions: [q1, q2, q3, q4, q5],
};

// list of the available 'patients' for each language version
const PATIENTS_EN = [patient1];

const PatientsContextEN = createContext(PATIENTS_EN);

// list contexts for each language version patient so you can have different patients/questions for different languages
const PatientsContexts = {
  en: PatientsContextEN,
};

// return patients for the chosen language for use in the rest of the app
export const usePatients = () => {
  const { language } = useLanguage();

  return useContext(PatientsContexts[language]);
};

export const dictionary = {
  en: dictionaryEN,
};