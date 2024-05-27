// Use [NAME] to replace it with patient name on render
import { createContext, useContext } from "react";
import { useLanguage } from "./LanguageContext";
import Explanation_Q1_1 from "../assets/images/explanation/q1_1.png";
import Explanation_Q1_2 from "../assets/images/explanation/q1_2.png";
import Explanation_Q5 from "../assets/images/explanation/q5.png";
import Explanation_Q6 from "../assets/images/explanation/q6.png";

const dictionaryEN = {
  intro: {
    heading: `Diagnosing and monitoring geographic atrophy (GA)`,
    subheading: "How much do you know?",
    cta: `Start the quiz`,
    copyright: "&copy; Apellis International GmbH. All rights reserved.",
    jobCode: "EU-GA-2300030",
    dop: "September 2023",
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
      "<strong>Sign up:</strong> Be the first to receive the latest GA news",
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
    of: "of 6",
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
  title: "Which of the following are criteria for cRORA for imaging GA on OCT?",
  subheading: "Select all that apply",
  answers: [
    {
      label: "Region of hypertransmission ≥250 μm in diameter",
      isRight: true,
    },
    {
      label: "Zone of attenuation/disruption of the RPE ≥250 μm in diameter",
      isRight: true,
    },
    {
      label: "Evidence of overlying photoreceptor degeneration",
      isRight: true,
    },
    {
      label: "Presence of scrolled RPE or other signs of an RPE tear",
    },
  ],
  explanation: {
    body: `<div><p><strong>Answers:</strong> 1, 2, 3</p><p>GA is classified as a subset of cRORA (complete RPE and outer retinal atrophy) and its criteria include: (i) a zone of choroidal hypertransmission (≥250 μm), (ii) a zone of RPE attenuation/disruption (≥250 μm), (iii) evidence of overlying photoreceptor degeneration, and (iv) absence of scrolled RPE or other signs of an RPE tear.<sup>1</sup></p><p>OCT is recommended as the reference standard to diagnose and stage atrophy, while other methods, like fundus autofluorescence, near-infrared reflectance and colour imaging, are used to support and confirm the diagnosis.<sup>1</sup></p><div class="flex-row gap-24"><img alt="" src=${Explanation_Q1_1} width="308" height="133" /><img alt="" src=${Explanation_Q1_2} width="308" height="133" /></div><small class="mt-28"><span>OCT B-scans demonstrating cRORA definition of atrophy.</span><span>ELM, external limiting membrane; EZ, ellipsoid zone; PR, photoreceptor; RPE, retinal pigment epithelium.</span><span>Image from Sadda et al. 2018.<sup>1</sup></span></small></div>`,
  },
  questionAbbreviations: "",
  questionReferences:
    "<ol><li>Sadda SR, <em>et al. Ophthalmology.</em> 2018;125(4):537–548.</li></ol>",
  explanationAbbreviations: "",
  explanationReferences:
    "<ol><li>Fleckenstein M, et al. Ophthalmology. 2018;125(3):369&ndash;390.</li><li>Schmitz-Valckenberg S. Ophthalmologica. 2017;237(1):11&ndash;20.</li></ol>",
};

const q2 = {
  title:
    "What was the percentage of foveal involvement at GA diagnosis in cohort studies (Rotterdam Study cohorts 1, 2 and 3 and the Blue Mountain Eye Study)?",
  subheading: "Select an answer",
  answers: [
    { label: "16.3%" },
    { label: "22.5%" },
    { label: "37.4%", isRight: true },
    { label: "41.2%" },
  ],
  explanation: {
    body: `<div><p><strong>Answer:</strong> 37.4%</p><p>In a study examining participant data from the Rotterdam Study and the Blue Mountain Eye Study, over a third of newly diagnosed GA patients (55/147 eyes) already had atrophy involving the fovea.<sup>1</sup></p><p>This emphasises the need for early screening and timely identification of patients with GA, as disease progression is constant and irreversible,<sup>2&ndash;5</sup> and lesion growth can affect functional vision even before reaching the fovea.<sup>6</sup></p></div>`,
  },
  questionAbbreviations: "",
  questionReferences:
    "<ol><li>Colijn JM, <em>et al. JAMA Ophthalmol.</em> 2021;139(7):743–750.</li><li>Boyer DS, <em>et al. Retina.</em> 2017;37(5):819–835.</li><li>Lindblad AS, <em>et al. Arch Ophthalmol.</em> 2009;127(9):1168–1174.</li><li>Holz FG, <em>et al. Ophthalmology.</em> 2014;121(5):1079–1091.</li><li>Sunness JS, <em>et al. Ophthalmology.</em> 2007;114(2):271–277.</li><li>Fleckenstein M, <em>et al. Ophthalmology.</em> 2018;125(3):369–390.</li></ol>",
  explanationAbbreviations: "",
  explanationReferences:
    "<ol><li>Kaszubski P, et al. Ophthalmic Res. 2016;55(4):185&ndash;193.</li><li>Chakravarthy U, et al. Ophthalmol Retina. 2020;4(7):662&ndash;672.</li><li>Rofagha S, et al. Ophthalmology. 2013;120(11):2292&ndash;2299.</li></ol>",
};

const q3 = {
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
    "<ol><li>Lindblad AS, <em>et al. Arch Ophthalmol.</em> 2009;127(9):1168–1174.</li><li>Royal College of Ophthalmologists. Age related macular degeneration services: executive summary. 2021. Available at: https://www.rcophth.ac.uk/wp-content/uploads/2021/08/AMD-Commissioning-Guidance-Executive-Summary-June-2021.pdf (accessed August 2023).</li></ol>",
  explanationAbbreviations: "",
  explanationReferences:
    "<ol><li>Fleckenstein M, et al. Ophthalmology. 2018;125(3):369&ndash;390.</li></ol>",
};

const q4 = {
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
    "<ol><li>Fleckenstein M, <em>et al. Ophthalmology.</em> 2018;125(3):369–390.</li><li>Royal College of Ophthalmologists. Age related macular degeneration services: executive summary. 2021. Available at: https://www.rcophth.ac.uk/wp-content/uploads/2021/08/AMD-Commissioning-Guidance-Executive-Summary-June-2021.pdf (accessed August 2023).</li></ol>",
  explanationAbbreviations: "",
  explanationReferences:
    "<ol><li>Archivdaten. Global Harris Poll Patientenumfrage 2022.</li></ol>",
};

const q5 = {
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
    { label: "Larger baseline lesion size", isRight: true },
    { label: "Perilesional FAF patterns", isRight: true },
  ],
  explanation: {
    body: `<div><p><strong>Answers:</strong> 3 and 4</p><p>Lesion characteristics such as larger lesion size at baseline, multifocal lesions, perilesional FAF patterns (indicating excessive lipofuscin accumulation), and nonsubfoveal location are all considered prognostic for a higher progression rate of GA.<sup>1</sup></p><img alt="" src=${Explanation_Q5} width="642" height="358" /><small><span>Lesion features associated with progression of GA on fundus autofluorescence (FAF).</span><span>Images from Fleckenstein et al. 2018.<sup>1</sup></span></small></div>`,
  },
  questionAbbreviations: "",
  questionReferences:
    "<ol><li>Fleckenstein M, <em>et al. Ophthalmology.</em> 2018;125(3):369–390.</li></ol>",
  explanationAbbreviations: "",
  explanationReferences:
    "<ol><li>Boyer DS, et al. Retina. 2017;37(5):819&ndash;835.</li></ol>",
};

const q6 = {
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
    body: `<div><p><strong>Answer:</strong> 22 letters</p><p>Data from the AREDS study (N=3640) show that visual acuity progressively declined following foveal involvement of GA lesions. Five years after diagnosis of foveal GA, participants' visual acuity had decreased by an average of 22 letters to 41.9 letters (~6/48).<sup>1</sup></p><p>Disease progression in GA is constant.<sup>1–4</sup> It is critical to recognise GA as early as possible as it can have a significant impact on patients' vision and subsequent quality of life.<sup>5–7</sup></p><img alt="" src=${Explanation_Q6} width="642" height="304" /><small><span>Mean visual acuity one year before diagnosis of foveal GA to five years after diagnosis (with 95% confidence intervals).<br />Adapted from Lindblad et al. 2009.<sup>1</sup></span></small></div>`,
  },
  questionAbbreviations: "",
  questionReferences:
    "<ol><li>Lindblad AS,<em>et al. Arch Ophthalmol.</em> 2009;127(9):1168–1174.</li><li>Boyer DS, <em>et al. Retina.</em> 2017;37(5):819–835.</li><li>Holz FG, <em>et al. Ophthalmology.</em> 2014;121(5):1079–1091.</li><li>Sunness JS, <em>et al. Ophthalmology.</em> 2007;114(2):271–277. </li><li>Jones D, <em>et al. Invest Ophthalmol Vis Sci.</em> 2022;63(7):A0145.</li><li>Sivaprasad S, <em>et al. Ophthalmol Ther.</em> 2019;8(1):115–124. </li><li>Apellis & The Harris Poll. 2022. Geographic Atrophy Insights Survey (GAINS).</li></ol>",
  explanationAbbreviations: "",
  explanationReferences:
    "<ol><li>Fleckenstein, M. et al. Ophthalmology. 2018;125(3):369&ndash;390.</li><li>Sunness JS, et al. Ophthalmology. 2007;114(2):271&ndash;277.</li><li>Boyer DS, et al. Retina. 2017;37(5):819&ndash;835.</li></ol>",
};

export const patient1 = {
  name: "quiz",
  questions: [q1, q2, q3, q4, q5, q6],
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