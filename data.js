/* =====================================================================
   data.js: EVERYTHING PERSONAL LIVES HERE
   ---------------------------------------------------------------------
   Edit this one file to update the whole site. Every page pulls from it.

   - Anything marked [EDIT] is placeholder copy I made up in your voice.
     Rewrite it, then delete the [EDIT] tag.
   - [EDIT: some note] shows up as a little orange "EDIT" badge on the
     page, with the note as a tooltip. Set showEditMarkers to false to hide
     all badges at once (e.g. right before you send the link to anyone).
   - Wrap text in `backticks` to render it in monospace.
   - Leave a url as "" and the link just won't show.
   ===================================================================== */

window.SITE = {
  showEditMarkers: true,

  /* ---------- You ---------- */
  person: {
    firstName: "Jierui",
    fullName: "Jierui [EDIT: last name]",
    // Hero "element tile". Pick an atomic number that means something.
    element: {
      symbol: "Ji",
      number: 6, // carbon: the backbone of organic chem (and of me) [EDIT if you want your own number]
      mass: "20.27", // "class of 2027", disguised as an atomic mass [EDIT]
      config: "[Ne] chem² code² cheme¹",
    },
    tagline: "I write code and break molecules. Sometimes the other way around.",
    intro:
      "High school student at the intersection of chemistry, computer science, and chemical engineering. I like problems you can titrate and problems you can debug. [EDIT]",
    location: "[EDIT: city, state]",
  },

  /* ---------- Nav (labels are yours to rename) ---------- */
  nav: [
    { page: "home", href: "index.html", label: "Home" },
    { page: "about", href: "about.html", label: "About" },
    { page: "projects", href: "projects.html", label: "Reactions" },
    { page: "experience", href: "experience.html", label: "Lab Notes" },
    { page: "skills", href: "skills.html", label: "Elements" },
    { page: "now", href: "now.html", label: "Now" },
    { page: "contact", href: "contact.html", label: "Contact" },
  ],

  /* ---------- Home page tiles ---------- */
  homeTiles: [
    { symbol: "Ab", number: 1, name: "About", href: "about.html", blurb: "Why chem + code + ChemE is one hobby, not three." },
    { symbol: "Rx", number: 2, name: "Reactions", href: "projects.html", blurb: "Things I've built, tested, and occasionally set on (metaphorical) fire." },
    { symbol: "Co", number: 3, name: "Contact", href: "contact.html", blurb: "Collabs, questions, or a good molecule recommendation." },
  ],

  /* ---------- One-line intros under each page title ---------- */
  intros: {
    projects: "Things I've built, run, or written. Reactants: curiosity, caffeine, a text editor. Products: below. Click a card for the full lab report.",
    experience: "The official record: clubs, research, competitions, and the occasional award. Observations recorded in pen, as is tradition.",
    skills: "My personal periodic table. Hover or tap an element to see where I've actually used it. Stable isotopes only (mostly).",
    now: "What I'm up to this month. It's a /now page, an idea from nownownow.com: less résumé, more live readout.",
    contact: "Questions, collabs, research leads, or just a strong opinion about chirality. My inbox is open.",
  },

  /* ---------- Home page process flow diagram ----------
     Equipment tags (R-101 etc.) are how real ChemE diagrams label units.   */
  process: {
    steps: [
      { tag: "F-001", label: "Curiosity", note: "a question I can't drop" },
      { tag: "R-101", label: "Lab bench", note: "try it for real" },
      { tag: "C-201", label: "Code", note: "model it, automate it" },
      { tag: "P-301", label: "Product", note: "a tool someone can use" },
    ],
    recycle: "Recycle stream: bugs + failed runs. Nothing is wasted, only re-fed.",
  },

  /* ---------- About ---------- */
  about: {
    paragraphs: [
      "I got into chemistry the normal way: something changed color and I needed to know why. I got into code the other normal way: I got tired of doing the same calculation by hand for the fifth time. Somewhere around my third stoichiometry spreadsheet I realized these were the same hobby. [EDIT]",
      "Chemistry tells you what a reaction does. Code lets me model it: run the titration a thousand times, nudge the rate constant, watch the curve move, all before I touch a single beaker. And when the tool a science problem needs doesn't exist yet (see: my EcoChemical Footprint Calculator), I can just build it. [EDIT]",
      "Chemical engineering is where it all lands. A reaction that works in a 50 mL flask is a fun fact. A reaction that works in a 50,000 L reactor, safely, cheaply, and without poisoning a river, is a job. That's the part I want to do: take good lab ideas and scale them into real processes. [EDIT]",
    ],
    // Drop a photo in the folder (e.g. "me.jpg") and put its name here.
    photo: {
      src: "",
      alt: "Jierui in the chem lab, wearing goggles and a suspiciously calm expression [EDIT]",
    },
    favoriteMolecule: {
      name: "Caffeine",
      formula: "C₈H₁₀N₄O₂",
      why: "Fuel for both titrations and debugging. Also a genuinely pretty purine ring. [EDIT]",
    },
    funFacts: [
      "I can name the first 36 elements in order faster than I can remember my locker combination. [EDIT]",
      "My variable names are sometimes element symbols. My teammates have opinions about this. [EDIT]",
      "Proudest lab moment: a titration endpoint so pale pink it was basically a rumor. [EDIT]",
      "I think mass balances are relaxing. I'm aware this is not a normal opinion. [EDIT]",
    ],
  },

  /* ---------- Reactions (projects) ----------
     categories must be any of: "Chem", "Code", "ChemE", "Outreach"
     id becomes the URL: project.html?id=<id>  (lowercase, no spaces)        */
  projects: [
    {
      id: "ecochem-footprint",
      title: "EcoChemical Footprint Calculator",
      blurb: "A web app that estimates a chemical's environmental impact with a potency-weighted LC50 metric. Congressional App Challenge entry.",
      categories: ["Code", "Chem"],
      tags: ["HTML", "CSS", "JavaScript", "Toxicology", "Congressional App Challenge"],
      year: "2025 [EDIT]",
      links: [
        { label: "Live demo", url: "" }, // [EDIT] paste the URL
        { label: "Source on GitHub", url: "" }, // [EDIT]
      ],
      problem:
        "Safety data sheets tell you how toxic a chemical is, but not in a way a normal person can compare. \"LC50 = 4.2 mg/L\" means nothing at the cleaning-supplies aisle. I wanted one number that says: this one is rougher on the environment than that one. [EDIT]",
      built:
        "A plain HTML/CSS/JS app (no frameworks) where you enter chemicals and amounts. Each one gets weighted by potency using its LC50, the concentration that kills half of a test population, so a little of something nasty counts more than a lot of something mild. The weighted values roll up into a single footprint score you can compare across products. [EDIT: double-check this matches your actual formula]",
      learned:
        "Toxicity data is messy, units are a crime scene, and the hardest part of a science tool is explaining the number, not computing it. I also learned that judges read the README. [EDIT]",
    },
    {
      id: "crime-busters-mock",
      title: "Crime Busters Mock Test",
      blurb: "Wrote and ran a Science Olympiad \"Crime Busters\" mock test for middle schoolers.",
      categories: ["Outreach", "Chem"],
      tags: ["Science Olympiad", "Forensics", "Teaching", "Test writing"],
      year: "2026 [EDIT]",
      links: [],
      problem:
        "The middle school team was walking into Crime Busters with no practice materials and a lot of confidence. One of those is great. The other needed help. [EDIT]",
      built:
        "A full mock event: unknown powder and liquid identification, polymer and fiber tests, chromatography, and a crime scene story that ties the evidence together. I wrote the test, prepped the stations, ran it, and graded it. [EDIT: adjust to what was actually on it]",
      learned:
        "Writing a test teaches you more than taking one. Every ambiguous question gets found by a twelve-year-old within four minutes. Also: label your unknowns twice. [EDIT]",
    },
    {
      id: "titration-sim",
      title: "Titration Curve Simulator [EDIT]",
      blurb: "Python script that plots pH vs. titrant volume for weak acid / strong base titrations, so I could stop sketching them by hand. [EDIT]",
      categories: ["Code", "Chem"],
      tags: ["Python", "matplotlib", "Acid–base equilibria"],
      year: "2025 [EDIT]",
      links: [{ label: "Source on GitHub", url: "" }],
      problem:
        "Textbook titration curves are static. I wanted to see what happens to the buffer region when you change Ka or concentration, live. [EDIT]",
      built:
        "A script that solves the charge balance at each titrant volume and plots the curve, with sliders for Ka, concentrations, and volume. It marks the half-equivalence and equivalence points automatically. [EDIT]",
      learned:
        "Solving equilibria numerically is way more forgiving than the approximations we use on tests, and way less forgiving of sign errors. [EDIT]",
    },
    {
      id: "batch-reactor",
      title: "Batch Reactor in a Notebook [EDIT]",
      blurb: "A tiny ChemE model: first-order kinetics plus a mass balance, to see how scale-up changes reaction time and heat load. [EDIT]",
      categories: ["ChemE", "Code"],
      tags: ["Python", "NumPy", "Kinetics", "Mass balance"],
      year: "2026 [EDIT]",
      links: [{ label: "Notebook", url: "" }],
      problem:
        "I wanted to understand why you can't just make the flask bigger. Turns out heat is the answer to almost every \"why\" in scale-up. [EDIT]",
      built:
        "A Jupyter notebook that integrates concentration over time for a first-order reaction, then compares heat generated against heat removed as the reactor volume grows. [EDIT]",
      learned:
        "Surface area scales with r² and volume with r³, and that one fact explains a scary amount of chemical engineering. [EDIT]",
    },
    {
      id: "demo-day",
      title: "Chem Club Demo Day [EDIT]",
      blurb: "Ran hands-on chemistry demos for younger students: elephant toothpaste, flame tests, and a lot of safety goggles. [EDIT]",
      categories: ["Outreach", "Chem"],
      tags: ["Outreach", "Lab safety", "Public speaking"],
      year: "2026 [EDIT]",
      links: [],
      problem: "Most kids meet chemistry as a worksheet. I wanted them to meet it as a loud foam explosion first. [EDIT]",
      built: "Planned a rotation of five demos, wrote one-page explainers for each, and trained club members to run stations safely. [EDIT]",
      learned: "If you can explain catalysts to a fifth grader in thirty seconds, you actually understand catalysts. [EDIT]",
    },
  ],

  /* ---------- Lab Notes (experience timeline) ----------
     type: Research | Club | Competition | Leadership | Award | Volunteering
     Newest first.                                                           */
  experience: [
    {
      date: "Summer 2026 [EDIT]",
      type: "Research",
      title: "Research Intern [EDIT]",
      org: "[EDIT: lab / university / program]",
      body: "Worked on [EDIT: topic]. Ran [EDIT: technique], wrote Python to clean and plot the data, and learned that 80% of research is figuring out why the control didn't behave. [EDIT]",
    },
    {
      date: "2025 – present [EDIT]",
      type: "Competition",
      title: "Science Olympiad",
      org: "[EDIT: school] team",
      body: "Compete in [EDIT: events, e.g. Chem Lab, Forensics]. Wrote and ran a Crime Busters mock test for our middle school feeder team. [EDIT: placements]",
    },
    {
      date: "Fall 2025 [EDIT]",
      type: "Competition",
      title: "Congressional App Challenge",
      org: "U.S. House of Representatives",
      body: "Built and submitted the EcoChemical Footprint Calculator, a potency-weighted LC50 tool for estimating chemical environmental impact. [EDIT: result]",
    },
    {
      date: "2025 – present [EDIT]",
      type: "Leadership",
      title: "[EDIT: Officer role], Chemistry Club",
      org: "[EDIT: school]",
      body: "Plan meetings, run demos, and make sure nothing that's supposed to stay in the beaker leaves the beaker. [EDIT]",
    },
    {
      date: "2024 – present [EDIT]",
      type: "Club",
      title: "Computer Science / Coding Club [EDIT]",
      org: "[EDIT: school]",
      body: "Build small projects, do competitive programming practice, and argue about tabs vs. spaces (spaces). [EDIT]",
    },
    {
      date: "2024 – present [EDIT]",
      type: "Volunteering",
      title: "Chemistry & Math Tutor [EDIT]",
      org: "[EDIT: organization]",
      body: "Tutor [EDIT: grade level] students in chemistry and algebra. Main skill developed: drawing the mole map from memory, upside down. [EDIT]",
    },
    {
      date: "2025 [EDIT]",
      type: "Award",
      title: "[EDIT: Award name]",
      org: "[EDIT: issuer]",
      body: "[EDIT: one line on what it was for.]",
    },
  ],

  /* ---------- Elements (skills) ----------
     group: "chem" | "code" | "eng"
     sym: 1–2 letters, like a real element symbol                             */
  skillGroups: {
    chem: "Chemistry",
    code: "Programming",
    eng: "Engineering & Other",
  },
  skills: [
    { sym: "Ti", name: "Titration", group: "chem", note: "Acid–base and redox titrations; I chase faint-pink endpoints for fun. [EDIT]" },
    { sym: "St", name: "Stoichiometry", group: "chem", note: "Dimensional analysis is my love language. [EDIT]" },
    { sym: "Sp", name: "Spectroscopy", group: "chem", note: "Beer–Lambert concentration curves with a school spectrophotometer. [EDIT]" },
    { sym: "Cr", name: "Chromatography", group: "chem", note: "Paper and TLC, including for the Crime Busters mock test. [EDIT]" },
    { sym: "Tx", name: "Toxicology data", group: "chem", note: "Reading SDSs and LC50 values for the EcoChemical Footprint Calculator." },
    { sym: "Ls", name: "Lab safety", group: "chem", note: "Goggles on, hair tied, acid into water. Always. [EDIT]" },

    { sym: "Js", name: "JavaScript", group: "code", note: "Built the EcoChemical Footprint Calculator (and this site) with plain JS." },
    { sym: "Ht", name: "HTML / CSS", group: "code", note: "Responsive layouts without a framework, which is how this page exists." },
    { sym: "Py", name: "Python", group: "code", note: "Data cleanup, plotting, and simulations like my titration curve model. [EDIT]" },
    { sym: "Np", name: "NumPy / matplotlib", group: "code", note: "Turning lab numbers into graphs that actually say something. [EDIT]" },
    { sym: "Gt", name: "Git", group: "code", note: "Commit early, commit often, write messages future me can read. [EDIT]" },
    { sym: "Jv", name: "Java", group: "code", note: "AP CS A: objects, arrays, and a deep respect for semicolons. [EDIT]" },

    { sym: "Mb", name: "Mass balances", group: "eng", note: "In = out + accumulation. Works on reactors and on my schedule. [EDIT]" },
    { sym: "Pf", name: "Process flow diagrams", group: "eng", note: "Sketching how a lab reaction would run as a real plant. [EDIT]" },
    { sym: "Xl", name: "Spreadsheet modeling", group: "eng", note: "Excel / Sheets models for kinetics and data analysis. [EDIT]" },
    { sym: "Tw", name: "Technical writing", group: "eng", note: "Lab reports, READMEs, and one very thorough mock test." },
    { sym: "Te", name: "Teaching", group: "eng", note: "Tutoring and outreach: explaining things until they click. [EDIT]" },
  ],

  /* ---------- Now ---------- */
  now: {
    lastUpdated: "2026-10-19", // YYYY-MM-DD. Bump this whenever you edit the board.
    items: [
      { label: "Reading", title: "[EDIT: book title]", note: "[EDIT: one line on why]" },
      { label: "Learning", title: "Organic reaction mechanisms [EDIT]", note: "Arrow-pushing until it feels like a language. [EDIT]" },
      { label: "Building", title: "This website", note: "You're looking at it. Press ` for the part I'm proudest of." },
      { label: "Obsessed with", title: "Distillation columns [EDIT]", note: "Separating things by boiling point is so elegant it's almost rude. [EDIT]" },
      { label: "Listening to", title: "[EDIT: album / playlist]", note: "Lab-safe volume. [EDIT]" },
      { label: "Prepping for", title: "[EDIT: e.g. USNCO, AP Chem, SciOly regionals]", note: "[EDIT]" },
    ],
  },

  /* ---------- Contact ---------- */
  contact: {
    email: "you@example.com", // [EDIT] the contact form sends here
    line: "Say hi — I reply faster than an SN2 reaction.",
    links: [
      { label: "Email", url: "mailto:you@example.com", handle: "you@example.com [EDIT]" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/your-handle", handle: "in/your-handle [EDIT]" },
      { label: "GitHub", url: "https://github.com/your-handle", handle: "@your-handle [EDIT]" },
    ],
  },

  /* ---------- Footer ---------- */
  footer: "No beakers or servers were harmed in the making of this site.",
};
