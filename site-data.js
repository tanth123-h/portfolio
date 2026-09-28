const media = ({
  photos = [],
  certificateImages = [],
  pdfs = [],
  videos = [],
  graphics = [],
}) => ({
  photos,
  certificateImages,
  pdfs,
  videos,
  graphics,
});

const asset = (src, title, alt) => ({ src, title, alt });

export const portfolio = {
  profile: {
    nameTh: "นายแทนคุณ ศรีจันทร์แก้ว",
    nameEn: "Tankhun Srichankaew",
    title: "Student · AI Builder · Creator",
    school: "Maryvit Nakhon Ratchasima",
    schoolUrl: "https://www.mrv.ac.th/",
    grade: "Grade 11, Class 5/10, AI Programme",
    introduction:
      "I build practical AI and technology ideas that help people, farms, and communities.",
    contact: {
      email: "tankhunkhunpon2@gmail.com",
      github: "https://github.com/tanth123-h",
      instagram: "https://www.instagram.com/no_thing.we1/",
      facebook: "https://www.facebook.com/share/168muZsR9cs/",
      discord: "https://discordapp.com/users/946758214077272114",
      phone: "0935100618",
    },
  },
  projects: [
    {
      id: "agri",
      date: "21–23 August 2026",
      dateTh: "21–23 สิงหาคม 2569",
      title: "Grow a Garden: Smart Farm Planner",
      type: "AI agriculture",
      summary:
        "A Flutter prototype for mapping farm boundaries, calculating area, and planning planting spacing, within a broader AI and IoT farming project.",
      approach:
        "The repository documents Flutter field-planning screens and Supabase persistence. Soil, weather, and AI recommendations belong to the wider project scope; not all are confirmed shipped features.",
      outcome: "Regional Bronze · depa 2026 national-round qualifier",
      problem:
        "Farmers need clearer data to select suitable crops, plan fields, monitor soil, and manage costs.",
      whatIDid:
        "Led project direction and pitching, developed software, and supported hardware work for the team’s data-driven farm-planning concept and mobile application story.",
      challenge:
        "Combining soil, weather, crop, cost, and market data into recommendations that are easy for farmers to understand.",
      whatILearned:
        "Agriculture technology is strongest when complex field data becomes a useful, practical decision.",
      skills: ["Flutter", "IoT", "Field planning"],
      links: { github: "https://github.com/tanth123-h/argi" },
      media: media({
        photos: [
          asset(
            "./public/assets/photos/depa-2026-event-1.jpg",
            "depa 2026 event 1",
            "Tankhun at depa 2026",
          ),
          asset(
            "./public/assets/photos/depa-2026-event-2.jpg",
            "depa 2026 event 2",
            "depa 2026 event",
          ),
          asset(
            "./public/assets/photos/depa-2026-event-3.jpg",
            "depa 2026 event 3",
            "depa 2026 event",
          ),
          asset(
            "./public/assets/photos/depa-2026-event-4.jpg",
            "depa 2026 event 4",
            "depa 2026 event",
          ),
          asset(
            "./public/assets/photos/depa-2026-event-5.jpg",
            "depa 2026 event 5",
            "depa 2026 event",
          ),
          asset(
            "./public/assets/photos/depa-2026-event-6.jpg",
            "depa 2026 event 6",
            "depa 2026 event",
          ),
          asset(
            "./public/assets/photos/depa-2026-event-7.jpg",
            "depa 2026 event 7",
            "depa 2026 event",
          ),
          asset(
            "./public/assets/photos/depa-2026-event-8.jpg",
            "depa 2026 event 8",
            "depa 2026 event",
          ),
          asset(
            "./public/assets/photos/depa-2026-event-9.jpg",
            "depa 2026 event 9",
            "depa 2026 event",
          ),
          asset(
            "./public/assets/photos/depa-2026-event-10.png",
            "depa 2026 event 10",
            "depa 2026 event",
          ),
          asset(
            "./public/assets/projects/agri-app-screen.jpg",
            "Grow a Garden application screen",
            "Grow a Garden application screen",
          ),
          asset(
            "./public/assets/graphics/depa-2026-poster.jpg",
            "Grow a Garden poster",
            "Grow a Garden poster",
          ),
          asset(
            "./public/assets/graphics/depa-2026-project-board.jpg",
            "Grow a Garden project board",
            "Grow a Garden project board",
          ),
        ],
        certificateImages: [
          asset(
            "./public/assets/certificates/depa-2026-coding-ai-certificate.png",
            "Coding Thailand 2026 certificate",
            "Coding Thailand 2026 participation certificate",
          ),
        ],
        pdfs: [
          asset(
            "./public/assets/pdfs/grow-a-garden-features.pdf",
            "Grow a Garden features",
            "Grow a Garden feature graphic PDF",
          ),
          asset(
            "./public/assets/pdfs/grow-a-garden-poster.pdf",
            "Grow a Garden poster",
            "Grow a Garden poster PDF",
          ),
        ],
        videos: [],
        graphics: [],
      }),
    },
    {
      id: "phishwall-ai",
      title: "PhishWall AI",
      type: "Cybersecurity",
      summary:
        "An Edge AI concept exploring phishing detection and understandable warnings, with privacy and response speed as design goals.",
      approach:
        "The presentation proposes a multi-layer detection approach. A demonstration video is available, but detection benchmarks and a public implementation have not been verified.",
      outcome: "Competition concept · demonstration available",
      problem:
        "New phishing pages can evade blacklist-only protection and put personal data at risk.",
      whatIDid:
        "Led the team project direction and pitch, developed software, supported hardware work, and prepared the AI analysis approach and presentation materials.",
      challenge:
        "Balancing detection quality, privacy, and a fast user experience on-device.",
      whatILearned:
        "Cybersecurity tools must make protection understandable and practical for everyday users.",
      skills: [
        "Team leadership",
        "Pitching",
        "Software development",
        "Hardware prototyping",
        "Edge AI",
        "Cybersecurity",
      ],
      links: {},
      media: media({
        photos: [],
        certificateImages: [],
        pdfs: [
          asset(
            "./public/assets/pdfs/phishwall-certificate.pdf",
            "PhishWall participation certificate",
            "Certificate PDF",
          ),
        ],
        videos: [
          asset(
            "./public/assets/videos/phishwall-demo.mp4",
            "PhishWall demo",
            "PhishWall project video",
          ),
        ],
        graphics: [
          asset(
            "./public/assets/graphics/phishwall-poster.jpg",
            "PhishWall poster",
            "PhishWall AI poster",
          ),
        ],
      }),
    },
    {
      id: "troposense",
      title: "TropoSense",
      type: "Health innovation concept",
      summary:
        "A research concept exploring a repurposed glucose meter, cTnI testing, OCR, and TropoBot as a possible screening-support workflow.",
      approach:
        "The proposal explores reading test results with OCR and communicating information through TropoBot. This is not a clinically validated or approved medical device, and is not a substitute for diagnosis.",
      outcome: "Research concept · proposal and pitch available",
      problem:
        "Early cardiac screening can be slow and difficult to access before a patient reaches specialist care.",
      whatIDid:
        "Led the project story and pitch, built software components, supported hardware prototyping, and prepared the proposal and competition media with my team.",
      challenge:
        "Explain a medical innovation clearly while keeping its role accurate: early screening support, not medical diagnosis.",
      whatILearned:
        "A strong health innovation needs careful evidence, responsible boundaries, and a clear path from prototype data to action.",
      skills: [
        "Innovation design",
        "AI OCR",
        "Hardware prototyping",
        "Software development",
        "Pitching",
      ],
      links: {},
      media: media({
        photos: [
          asset(
            "./public/assets/photos/troposense-selection.jpg",
            "Troposense selection evidence",
            "Troposense selected for next round",
          ),
          asset(
            "./public/assets/photos/troposense-event.jpg",
            "Troposense event",
            "Troposense project activity",
          ),
        ],
        certificateImages: [],
        pdfs: [
          asset(
            "./public/assets/pdfs/troposense-proposal.pdf",
            "Troposense proposal",
            "Proposal PDF",
          ),
          asset(
            "./public/assets/pdfs/troposense-poster-portrait-source.pdf",
            "Troposense portrait poster",
            "Portrait poster PDF",
          ),
          asset(
            "./public/assets/pdfs/troposense-poster-landscape-source.pdf",
            "Troposense landscape poster",
            "Landscape poster PDF",
          ),
        ],
        videos: [
          asset(
            "./public/assets/videos/troposense-pitch.mp4",
            "Troposense pitch",
            "Troposense presentation video",
          ),
        ],
        graphics: [
          asset(
            "./public/assets/graphics/troposense-poster.png",
            "Troposense poster image",
            "Troposense poster",
          ),
        ],
      }),
    },
    {
      id: "youth-innovation",
      date: "15 July 2026",
      dateTh: "15 กรกฎาคม 2569",
      title: "Heritage AI: Smart Heritage AIoT Platform",
      type: "National AIoT innovation research",
      summary:
        "An AIoT prototype for Thai historical sites, connecting camera-based visitor counting with a dashboard and a heritage-information assistant.",
      approach:
        "The repository uses FastAPI, RTSP camera streams, and YOLOv8 for people counting, visitor history, and LINE alerts. The research paper additionally describes a RAG assistant for visitor information.",
      outcome: "Bronze award · Youth Innovation 2026",
      problem:
        "Historical sites need better visitor counting, crowd awareness, and easy access to reliable history and tourism information.",
      whatIDid:
        "Led the project, pitched in English, developed software, and supported hardware integration with the team.",
      challenge:
        "Connect real-time people detection, data tools, and visitor information into one understandable heritage platform.",
      whatILearned:
        "AIoT systems become more useful when detection data, staff decisions, and visitor experience work together.",
      skills: ["YOLOv8", "FastAPI", "RAG chatbot"],
      links: {
        github: "https://github.com/tanth123-h/phimai",
        publication:
          "https://www.istem-ed.com/nextgen/files/school-articles-2026.pdf",
      },
      media: media({
        photos: [
          asset(
            "./public/assets/photos/youth-innovation-team.jpg",
            "Youth Innovation team",
            "Youth Innovation project team",
          ),
          asset(
            "./public/assets/photos/youth-innovation-event.jpg",
            "Youth Innovation event",
            "Youth Innovation activity",
          ),
          asset(
            "./public/assets/photos/youth-innovation-1.png",
            "Youth Innovation photo 1",
            "Youth Innovation project activity",
          ),
          asset(
            "./public/assets/photos/youth-innovation-2.png",
            "Youth Innovation photo 2",
            "Youth Innovation project activity",
          ),
          asset(
            "./public/assets/photos/youth-innovation-3.png",
            "Youth Innovation photo 3",
            "Youth Innovation project activity",
          ),
          asset(
            "./public/assets/photos/youth-innovation-4.png",
            "Youth Innovation photo 4",
            "Youth Innovation project activity",
          ),
          asset(
            "./public/assets/photos/youth-innovation-5.png",
            "Youth Innovation photo 5",
            "Youth Innovation project activity",
          ),
          asset(
            "./public/assets/photos/youth-innovation-6.png",
            "Youth Innovation photo 6",
            "Youth Innovation project activity",
          ),
        ],
        certificateImages: [
          asset(
            "./public/assets/certificates/youth-innovation-final-bronze-certificate.png",
            "Youth Innovation Bronze",
            "Bronze award certificate",
          ),
        ],
        pdfs: [
          asset(
            "./public/assets/pdfs/youth-innovation-research.pdf",
            "Youth Innovation research",
            "Research PDF",
          ),
        ],
        videos: [],
        graphics: [],
      }),
    },
    {
      id: "cityflowbkk",
      date: "18–20 June 2026",
      dateTh: "18–20 มิถุนายน 2569",
      title: "CityFlowBKK",
      type: "Hackathon",
      summary:
        "An Android transit and discovery prototype for BTS/MRT route planning and exploring Bangkok. Built during a three-day hackathon; the team reached the final 20.",
      problem:
        "Travellers need to connect routes, fare estimates, and places to visit into one usable journey.",
      approach:
        "Kotlin and Jetpack Compose provide the Android interface. The repository documents an MVVM structure, mapping and places APIs, route planning, and saved destinations.",
      outcome: "Final 20 teams · Bangkok Hackathon",
      whatIDid:
        "Led the project direction and pitch, developed software, and supported hardware prototyping with the team during the three-day hackathon.",
      challenge:
        "Turn a city problem into a working, presentable prototype under a fast three-day deadline.",
      whatILearned:
        "Rapid prototyping works when the team makes focused choices, tests early, and keeps the user problem visible.",
      skills: ["Kotlin", "Jetpack Compose", "Prototyping"],
      links: { github: "https://github.com/tanth123-h/CityFlowBKK.git" },
      media: media({
        photos: [
          asset(
            "./public/assets/photos/cityflowbkk-event-1.jpg",
            "Bangkok Hackathon event 1",
            "CityFlowBKK team at hackathon",
          ),
          asset(
            "./public/assets/photos/cityflowbkk-event-2.jpg",
            "Bangkok Hackathon event 2",
            "CityFlowBKK team at hackathon",
          ),
          asset(
            "./public/assets/photos/cityflowbkk-event-3.jpg",
            "Bangkok Hackathon event 3",
            "CityFlowBKK team at hackathon",
          ),
          asset(
            "./public/assets/photos/cityflowbkk-event-4.jpg",
            "Bangkok Hackathon event 4",
            "CityFlowBKK team at hackathon",
          ),
        ],
        certificateImages: [
          asset(
            "./public/assets/certificates/cityflowbkk-final-20.jpg",
            "Final 20 recognition",
            "Bangkok Hackathon certificate",
          ),
        ],
        pdfs: [],
        videos: [],
        graphics: [
          asset(
            "./public/assets/graphics/cityflowbkk-poster-4.png",
            "Hacka Tech Bangkok competition poster",
            "Bangkok Hackathon competition poster",
          ),
        ],
      }),
    },
  ],
  achievements: [
    {
      id: "depa-2026-third-place",
      title: "depa 2026: Regional Bronze · National Round Qualifier",
      type: "Regional award and national-round qualification",
      date: "21–23 August 2026",
      dateTh: "21–23 สิงหาคม 2569",
      summary:
        "Won a Bronze award in the regional round with Grow a Garden and advanced to the national round.",
      whatIDid:
        "Presented Grow a Garden with the team at the regional competition and prepared the project for national-level competition.",
      whatILearned:
        "Judges respond to evidence, clarity, and a solution linked to a real need. Advancing nationally also required stronger testing and presentation preparation.",
      skills: ["Presentation", "AI agriculture", "National round qualifier"],
      links: {},
      media: media({
        photos: [
          asset(
            "./public/assets/photos/depa-2026-event-2.jpg",
            "depa event",
            "depa 2026 event",
          ),
          asset(
            "./public/assets/graphics/depa-2026-poster.jpg",
            "Grow a Garden poster",
            "Grow a Garden poster",
          ),
        ],
        certificateImages: [
          asset(
            "./public/assets/certificates/depa-2026-coding-ai-certificate.png",
            "Coding Thailand 2026 certificate",
            "Coding Thailand 2026 certificate",
          ),
        ],
        pdfs: [
          asset(
            "./public/assets/pdfs/grow-a-garden-features.pdf",
            "Grow a Garden feature graphic",
            "Grow a Garden graphic PDF",
          ),
          asset(
            "./public/assets/pdfs/grow-a-garden-poster.pdf",
            "Grow a Garden poster",
            "Grow a Garden poster PDF",
          ),
        ],
        videos: [],
        graphics: [],
      }),
    },
    {
      id: "youth-bronze",
      title: "Youth Innovation: Bronze Award",
      type: "National competition award",
      date: "15 July 2026",
      dateTh: "15 กรกฎาคม 2569",
      summary:
        "Earned a Bronze award after presenting Heritage AI, an AIoT innovation for Thai historical sites, in English at a national event in Chiang Mai.",
      whatIDid:
        "Led the Heritage AI project direction, pitch, software work, and hardware support with the team.",
      whatILearned:
        "English pitching improves through preparation, practice, and deep knowledge of both the research and prototype.",
      skills: ["English pitching", "AIoT", "Team leadership"],
      links: {},
      media: media({
        photos: [
          asset(
            "./public/assets/photos/youth-innovation-event.jpg",
            "Youth Innovation event",
            "Youth Innovation activity",
          ),
        ],
        certificateImages: [
          asset(
            "./public/assets/certificates/youth-innovation-final-bronze-certificate.png",
            "Bronze certificate",
            "Youth Innovation Bronze certificate",
          ),
        ],
        pdfs: [
          asset(
            "./public/assets/pdfs/youth-innovation-research.pdf",
            "Research document",
            "Youth research PDF",
          ),
        ],
        videos: [],
        graphics: [],
      }),
    },
    {
      id: "grow-a-garden-science",
      title: "Grow a Garden: Science Project Gold Award",
      type: "Private-school network science competition",
      date: "19 September 2026",
      dateTh: "19 กันยายน 2569",
      summary:
        "I developed Grow a Garden further and entered it in the invention category of the annual academic skills competition for schools in the Diocese of Nakhon Ratchasima. The event took place on 19 September 2026 in connection with Private Education Day. The project received Gold and first place.",
      problem:
        "A working innovation needs more than a good idea. It needs a clear design, a testable process, evidence from the prototype, and an explanation that judges can follow.",
      whatIDid:
        "I took Grow a Garden, an AI and IoT smart-farming project, and developed it into a science project for the private-school network competition. I helped prepare the invention presentation, explain the software and hardware system, demonstrate the prototype, answer questions, and present the project with my team.",
      challenge:
        "This was my first science-project competition after usually competing in innovation events. I had to explain Grow a Garden as a tested invention, connect the prototype to evidence, and communicate the method clearly within the judging format.",
      whatILearned:
        "I learned how to turn an innovation prototype into a more structured science project: define the problem, explain the design, observe results, support claims with evidence, and improve the story through questions from judges. I also learned that software, hardware, testing, and presentation must support one another.",
      skills: [
        "Science project",
        "Software development",
        "Hardware prototyping",
        "Project presentation",
        "Teamwork",
      ],
      links: {},
      media: media({
        photos: [
          asset(
            "./public/assets/photos/grow-a-garden-science/01-presentation.jpg",
            "Science project presentation",
            "Presenting Grow a Garden science project",
          ),
          asset(
            "./public/assets/photos/grow-a-garden-science/02-team-and-exhibit.jpg",
            "Team and exhibit",
            "Grow a Garden science project team",
          ),
          asset(
            "./public/assets/photos/grow-a-garden-science/03-presentation-wide.jpg",
            "Presentation day",
            "Grow a Garden science project presentation",
          ),
          asset(
            "./public/assets/photos/grow-a-garden-science/04-project-display.jpg",
            "Project display",
            "Grow a Garden science project display",
          ),
          asset(
            "./public/assets/photos/grow-a-garden-science/05-team-display.jpg",
            "Team beside project",
            "Grow a Garden science project team",
          ),
          asset(
            "./public/assets/photos/grow-a-garden-science/06-project-demo.jpg",
            "Prototype demonstration",
            "Demonstrating Grow a Garden prototype",
          ),
          asset(
            "./public/assets/photos/grow-a-garden-science/07-project-explanation.jpg",
            "Explaining the project",
            "Explaining Grow a Garden science project",
          ),
        ],
        certificateImages: [
          asset(
            "./public/assets/certificates/grow-a-garden-science-gold.jpg",
            "Gold first-place certificate",
            "Gold first-place Grow a Garden science project certificate",
          ),
        ],
        pdfs: [],
        videos: [],
        graphics: [],
      }),
    },
    {
      id: "idektep-honorable-mention",
      showcase: true,
      title: "iDektep Coding: Python for AI Challenge 2026",
      type: "AI workshop and competition",
      date: "14–15 March 2026",
      dateTh: "14–15 มีนาคม 2569",
      summary:
        "A two-day Python for AI programme: object-detection workshop on day one, competition on day two, earning an honorable mention.",
      problem:
        "Object-detection models need a structured workflow for data, training, testing, and evaluation.",
      whatIDid:
        "Learned object-detection model training through Jupyter Notebook on workshop day, then applied the workflow in the next-day competition.",
      challenge:
        "Move from guided notebook training to a competition task with limited time.",
      whatILearned:
        "I learned object detection, model training, and how Jupyter Notebook supports a clear train-test-improve workflow.",
      skills: [
        "Python",
        "Jupyter Notebook",
        "Object detection",
        "Model training",
        "Model evaluation",
      ],
      links: {},
      media: media({
        photos: [
          asset(
            "./public/assets/photos/idektep-event.jpg",
            "iDektep event",
            "iDektep activity",
          ),
          asset(
            "./public/assets/photos/idektep-certificate-event.jpg",
            "iDektep certificate event",
            "iDektep activity",
          ),
          asset(
            "./public/assets/photos/idektep-1.jpg",
            "iDektep photo 1",
            "iDektep activity",
          ),
          asset(
            "./public/assets/photos/idektep-2.png",
            "iDektep photo 2",
            "iDektep activity",
          ),
          asset(
            "./public/assets/photos/idektep-3.jpg",
            "iDektep photo 3",
            "iDektep activity",
          ),
          asset(
            "./public/assets/photos/idektep-4.jpg",
            "iDektep photo 4",
            "iDektep activity",
          ),
        ],
        certificateImages: [
          asset(
            "./public/assets/certificates/idektep-certificate-2026.png",
            "iDektep honorable mention certificate",
            "iDektep Coding Python for AI Challenge 2026 certificate",
          ),
        ],
        pdfs: [],
        videos: [],
        graphics: [
          asset(
            "./public/assets/graphics/idektep-challenge-poster-2026.png",
            "iDektep Coding 2026 poster",
            "iDektep Coding Python for AI Challenge 2026 poster",
          ),
        ],
      }),
    },
    {
      id: "tira-iot-training",
      showcase: true,
      title: "TIRA Arduino IoT Training",
      type: "Hands-on technical training",
      date: "14, 15, 22 June and 20–21 September 2025",
      dateTh: "14, 15, 22 มิถุนายน และ 20–21 กันยายน 2568",
      summary:
        "A 30-hour smart-electronics pre-engineering programme with TIRA: online sessions in June and hands-on sessions in Nakhon Ratchasima in September 2025.",
      whatIDid:
        "Worked through practical Arduino and IoT activities, connecting electronics, sensors, and software while testing how each part affects the system.",
      challenge:
        "Debugging physical systems requires checking code, wiring, power, sensors, and output behavior step by step.",
      whatILearned:
        "Reliable physical computing comes from testing every connection, observing system behavior, and improving one issue at a time.",
      skills: ["Arduino", "IoT", "Hardware", "Sensors", "Debugging"],
      links: {},
      media: media({
        photos: [
          asset(
            "./public/assets/photos/tira-training-1.jpg",
            "TIRA training 1",
            "Arduino IoT training activity",
          ),
          asset(
            "./public/assets/photos/tira-training-2.jpg",
            "TIRA training 2",
            "Arduino IoT training activity",
          ),
          asset(
            "./public/assets/photos/tira-training-3.jpg",
            "TIRA training 3",
            "Arduino IoT training activity",
          ),
          asset(
            "./public/assets/photos/tira-training-4.jpg",
            "TIRA training 4",
            "Arduino IoT training activity",
          ),
          asset(
            "./public/assets/photos/tira-training-5.jpg",
            "TIRA training 5",
            "Arduino IoT training activity",
          ),
          asset(
            "./public/assets/photos/tira-training-6.jpg",
            "TIRA training 6",
            "Arduino IoT training activity",
          ),
          asset(
            "./public/assets/photos/tira-training-7.jpg",
            "TIRA training 7",
            "Arduino IoT training activity",
          ),
        ],
        certificateImages: [
          asset(
            "./public/assets/certificates/tira-training-certificate.jpg",
            "TIRA training certificate",
            "TIRA certificate",
          ),
        ],
        pdfs: [],
        videos: [],
        graphics: [],
      }),
    },
    {
      id: "minister-exhibition",
      showcase: true,
      title: "Hairline Detector: Maryvit School Representative",
      type: "School innovation exhibition",
      summary:
        "Maryvit selected me to present a Hairline Detector project during Korat Next-Gen All For Education, an exhibition attended by Thailand’s Minister of Education.",
      whatIDid:
        "Represented the school, explained the Hairline Detector project, demonstrated its purpose, and answered questions from exhibition visitors.",
      challenge:
        "Presenting an AI-based school project to visitors with different technical backgrounds while keeping the explanation accurate and clear.",
      whatILearned:
        "A strong public presentation connects technical work to a simple real-world purpose and adapts to each audience.",
      skills: [
        "Public communication",
        "Exhibition presentation",
        "AI vision",
        "Demonstration",
      ],
      links: {},
      media: media({
        photos: [
          asset(
            "./public/assets/photos/minister-exhibition-1.png",
            "Minister exhibition 1",
            "Innovation exhibition at Maryvit",
          ),
          asset(
            "./public/assets/photos/minister-exhibition-2.png",
            "Minister exhibition 2",
            "Innovation exhibition at Maryvit",
          ),
          asset(
            "./public/assets/photos/minister-exhibition-3.png",
            "Minister exhibition 3",
            "Innovation exhibition at Maryvit",
          ),
          asset(
            "./public/assets/photos/minister-exhibition-4.png",
            "Minister exhibition 4",
            "Innovation exhibition at Maryvit",
          ),
        ],
        certificateImages: [],
        pdfs: [],
        videos: [],
        graphics: [],
      }),
    },
    {
      id: "depa-2025-national",
      title: "depa 2025: National Round",
      type: "National competition round",
      summary:
        "Advanced to the national round of the depa competition, supported by event photos and recognition material.",
      whatIDid:
        "Led most of the software and hardware work, then helped prepare and present the team project at national-round level.",
      whatILearned:
        "National competition preparation needs stronger evidence, clearer storytelling, and closer teamwork.",
      skills: [
        "Software development",
        "Hardware prototyping",
        "Competition presentation",
        "Teamwork",
      ],
      links: {},
      media: media({
        photos: [
          asset(
            "./public/assets/photos/depa-2025-event-1.jpg",
            "depa 2025 event 1",
            "depa 2025 activity",
          ),
          asset(
            "./public/assets/photos/depa-2025-event-2.jpg",
            "depa 2025 event 2",
            "depa 2025 activity",
          ),
        ],
        certificateImages: [
          asset(
            "./public/assets/certificates/depa-2025-national-certificate.jpg",
            "depa 2025 recognition",
            "depa 2025 certificate",
          ),
        ],
        pdfs: [],
        videos: [],
        graphics: [],
      }),
    },
  ],
};
