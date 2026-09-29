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
    nameEn: "Tankhun Srijankaew",
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
        "A working Flutter farming prototype that combines field mapping, soil monitoring, weather information, and AI-assisted farm planning.",
      approach:
        "Built with Flutter and Supabase, with MQTT sensor integration, stored soil readings, and weather information from Open-Meteo. Gemini supports farm analysis and recommendations alongside a rule-based recommendation engine. These features are implemented in the current project; they are not merely future plans.",
      outcome: "Bronze, Central Isan regional round · National final 210 teams · No national award",
      problem:
        "Farmers need clearer data to select suitable crops, plan fields, monitor soil, and manage costs.",
      whatIDid:
        "Led project direction and pitching, developed the farm-planning software, and contributed to connecting the application with the team’s sensor hardware.",
      challenge:
        "Combining soil, weather, crop, cost, and market data into recommendations that are easy for farmers to understand.",
      whatILearned:
        "I learned to build Flutter screens, store and retrieve farm data with Supabase, and connect sensor readings to the application through MQTT. Integrating weather data and Gemini helped me understand how to supply farm context to AI, distinguish calculated recommendations from generated explanations, and handle missing data or connection failures.",
      skills: ["Flutter", "Supabase", "MQTT", "AI", "IoT"],
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
        "After attending the AI & Cyber Security workshop, our team had seven days to prepare a phishing-detection proposal and presentation video. We submitted both but did not qualify for the next round. The project has since developed into a working prototype.",
      approach:
        "The competition submission was a proposal for a multi-layer detection workflow. A working prototype is now available according to the project owner, alongside a demonstration video. No public source repository or measured detection benchmark is available; specific model and deployment claims are therefore not asserted.",
      outcome: "Workshop and proposal submission · Did not qualify for the next round",
      problem:
        "New phishing pages can evade blacklist-only protection and put personal data at risk.",
      whatIDid:
        "Attended the workshop, led the project direction, and prepared the proposal and presentation video with the team within the seven-day submission period. The software prototype was developed beyond that competition submission.",
      challenge:
        "Balancing detection quality, privacy, and a fast user experience on-device.",
      whatILearned:
        "I learned to turn workshop material into a structured cybersecurity proposal, define a detection workflow, and explain the idea in a presentation video within seven days. Developing the prototype further helped me connect the proposed workflow to software, while keeping performance claims separate from what the demonstration actually proves.",
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
        "A research concept exploring a repurposed glucose meter, cTnI testing, OCR, and TropoBot as a possible screening-support workflow. The national final is scheduled for 24 October 2026; I have not attended that round yet.",
      approach:
        "The proposal explores reading test results with OCR and communicating information through TropoBot. This is not a clinically validated or approved medical device, and is not a substitute for diagnosis.",
      outcome: "Second runner-up · Selection-round Gold · National final scheduled 24 October 2026, not yet attended",
      problem:
        "Early cardiac screening can be slow and difficult to access before a patient reaches specialist care.",
      whatIDid:
        "Served as project lead, coordinated the team, wrote the project documentation, designed the video scenes, and recorded the voice-over explaining the concept.",
      challenge:
        "Explain a medical innovation clearly while keeping its role accurate: early screening support, not medical diagnosis.",
      whatILearned:
        "I learned to organise a team around a shared research concept and turn technical material into structured project documentation. Designing video scenes and recording the narration taught me to explain the proposed measurement, OCR, and TropoBot workflow clearly, while distinguishing research goals from clinically validated results.",
      skills: [
        "Project leadership",
        "Technical writing",
        "Research",
        "Video planning",
        "Voice-over",
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
        "I learned to connect RTSP camera streams to YOLOv8 people detection, expose results through FastAPI, and use visitor records and LINE alerts in an operational workflow. The project also developed my understanding of retrieval-based heritage information and my ability to explain an AIoT architecture and research findings in English.",
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
        "I learned to build Android interfaces with Kotlin and Jetpack Compose and separate screens, application state, and data access using MVVM. Working with route graphs, fare calculations, maps, and place information taught me to connect multiple data sources into one travel workflow while prioritising a demonstrable prototype within three days.",
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
      title: "depa 2026: Central Isan Bronze · National Final 210 Teams",
      type: "Regional award and national-round qualification",
      date: "21–23 August 2026",
      dateTh: "21–23 สิงหาคม 2569",
      summary:
        "Won Bronze in the Central Isan regional round with Grow a Garden, then competed among the national final 210 teams on 21–23 August 2026. The team did not receive a national-round award.",
      whatIDid:
        "Led the project and presentation, developed software, and contributed to hardware integration for Grow a Garden across the regional and national competition stages.",
      whatILearned:
        "I practised demonstrating the farm application and sensor system together, explaining how data supports recommendations, and answering questions about the prototype. Preparing for the national round helped me prioritise improvements and organise technical evidence for the presentation.",
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
        "I practised presenting an AIoT research project in English: introducing the problem, explaining camera-based visitor counting and the heritage-information workflow, and connecting the technical design to its intended users. Preparing the pitch helped me organise the research and describe each component clearly.",
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
      outcome: "Gold · First place · Upper-secondary invention category",
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
      outcome: "Honorable mention · Upper-secondary team category",
      showcase: true,
      title: "iDektep Coding: Python for AI Challenge 2026",
      type: "AI workshop and competition",
      date: "14–15 March 2026",
      dateTh: "14–15 มีนาคม 2569",
      summary:
        "A two-day Python for AI programme at Suranaree University of Technology: a workshop on 14 March and a competition on 15 March 2026. Our team received an honorable mention in the upper-secondary category.",
      problem:
        "Object-detection models need a structured workflow for data, training, testing, and evaluation.",
      whatIDid:
        "Learned object-detection model training through Jupyter Notebook on workshop day, then applied the workflow in the next-day competition.",
      challenge:
        "Move from guided notebook training to a competition task with limited time.",
      whatILearned:
        "I learned to use Python in Jupyter Notebook to run an object-detection training workflow, inspect predictions, and review model results. Applying that workflow in the next-day competition helped me connect the training steps to a practical task and work with teammates under a time limit.",
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
      outcome: "30-hour participation certificate · Online and onsite training",
      showcase: true,
      title: "TIRA Arduino IoT Training",
      type: "Hands-on technical training",
      date: "14, 15, 22 June and 20–21 September 2025",
      dateTh: "14, 15, 22 มิถุนายน และ 20–21 กันยายน 2568",
      summary:
        "Participated in a 30-hour pilot of TIRA’s smart-electronics pre-engineering curriculum, organised with the Ministry of Education’s educational technology development fund. Online sessions took place on 14, 15 and 22 June 2025, followed by onsite sessions in Nakhon Ratchasima on 20–21 September.",
      whatIDid:
        "Worked through practical Arduino and IoT activities, connecting electronics, sensors, and software while testing how each part affects the system.",
      challenge:
        "Debugging physical systems requires checking code, wiring, power, sensors, and output behavior step by step.",
      whatILearned:
        "I learned to connect Arduino code with circuits and sensor readings, then test whether the physical output matched the program. I practised checking wiring, power, sensor behaviour, and software separately to locate faults in an IoT system.",
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
      date: "5 June 2026",
      dateTh: "5 มิถุนายน 2569",
      outcome: "School representative · Innovation exhibition",
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
        "I practised demonstrating an AI vision project to visitors, explaining its purpose and operation without assuming technical knowledge, and answering questions about the prototype. This strengthened my ability to organise a live demonstration and adapt explanations to different audiences.",
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
      outcome: "Qualified for and participated in the national round · Coding Thailand 2025",
      title: "depa 2025: Weed-Detection and Spot-Spraying Vehicle",
      type: "National competition round",
      summary:
        "Developed a vehicle designed to detect weeds and target spraying only where needed, with the aim of reducing chemical use. The project reached the national round of depa’s Coding Thailand 2025: AI-Driven Future. The participation certificate was issued on 5 October 2025.",
      whatIDid:
        "Led most of the software and hardware work, then helped prepare and present the team project at national-round level.",
      whatILearned:
        "By handling most of the software and hardware, I learned to trace problems across code, wiring, and device behaviour instead of testing each part in isolation. I also practised integrating the team’s prototype, preparing a working demonstration, and explaining technical decisions during a national-level presentation.",
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
