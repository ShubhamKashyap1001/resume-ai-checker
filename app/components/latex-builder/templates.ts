import { IIIT_VADODARA_FULL, IIT_GUWAHATI_FULL, JAKES_RESUME_WITH_LINKS } from "./fullTemplates";

export interface LatexTemplate {
  id: string;
  name: string;
  author: string;
  description: string;
  tags: string[];
  accent: string;
  code: string;
}

// ─────────────────────────────────────────────
// TEMPLATE 1: Jake's Resume (most popular on GitHub/Reddit)
// ─────────────────────────────────────────────
const JAKES_RESUME = `\\documentclass[letterpaper,11pt]{article}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule \\vspace{-5pt}]

%───── Custom commands ─────
\\newcommand{\\resumeItem}[1]{\\item\\small{#1 \\vspace{-2pt}}}
\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
  \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
    \\textbf{#1} & #2 \\\\
    \\textit{\\small#3} & \\textit{\\small #4} \\\\
  \\end{tabular*}\\vspace{-7pt}
}
\\newcommand{\\resumeProjectHeading}[2]{
  \\item
  \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
    \\small#1 & #2 \\\\
  \\end{tabular*}\\vspace{-7pt}
}
\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}
\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}
\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%════════════════════════════════════════════════
\\begin{document}

%───── HEADING ─────
\\begin{center}
  \\textbf{\\Huge \\scshape Jake Ryan} \\\\ \\vspace{1pt}
  \\small 123-456-7890 $|$
  \\href{mailto:jake@example.com}{\\underline{jake@example.com}} $|$
  \\href{https://linkedin.com/in/jake}{\\underline{linkedin.com/in/jake}} $|$
  \\href{https://github.com/jake}{\\underline{github.com/jake}}
\\end{center}

%───── EDUCATION ─────
\\section{Education}
\\resumeSubHeadingListStart
  \\resumeSubheading
    {Southwestern University}{Georgetown, TX}
    {Bachelor of Arts in Computer Science, Minor in Business}{Aug. 2018 -- May 2021}
  \\resumeSubheading
    {Blinn College}{Bryan, TX}
    {Associate's in Liberal Arts}{Aug. 2014 -- May 2018}
\\resumeSubHeadingListEnd

%───── EXPERIENCE ─────
\\section{Experience}
\\resumeSubHeadingListStart

  \\resumeSubheading
    {Undergraduate Research Assistant}{June 2020 -- Present}
    {Texas A\\&M University}{College Station, TX}
    \\resumeItemListStart
      \\resumeItem{Developed a REST API using FastAPI and PostgreSQL to store data from user trials}
      \\resumeItem{Optimized trial data ingestion speed by 18\\% using vectorized SQL queries}
      \\resumeItem{Wrote an Ansible playbook to provision a DigitalOcean VPS and run a Docker container}
    \\resumeItemListEnd

  \\resumeSubheading
    {Information Technology Support Specialist}{Sep. 2018 -- Present}
    {Southwestern University}{Georgetown, TX}
    \\resumeItemListStart
      \\resumeItem{Communicate with managers to set up campus computers used on campus}
      \\resumeItem{Assess and resolve 5+ technical issues each day; maintain uptime above 99\\%}
      \\resumeItem{Provide individualized training sessions for 10+ faculty on new technologies}
    \\resumeItemListEnd

\\resumeSubHeadingListEnd

%───── PROJECTS ─────
\\section{Projects}
\\resumeSubHeadingListStart
  \\resumeProjectHeading
    {\\textbf{Gitlytics} $|$ \\emph{Python, Flask, React, PostgreSQL, Docker}}{June 2020 -- Present}
    \\resumeItemListStart
      \\resumeItem{Built a full-stack web app enabling users to visualize GitHub repo statistics}
      \\resumeItem{Implemented GitHub OAuth2 allowing users to map private repo events}
      \\resumeItem{Rendered data with Chart.js and maintained a 99.9\\% uptime SLA}
    \\resumeItemListEnd
  \\resumeProjectHeading
    {\\textbf{Simple Paintball} $|$ \\emph{Spigot API, Java, Maven, TravisCI, Git}}{May 2018 -- May 2020}
    \\resumeItemListStart
      \\resumeItem{Developed a Minecraft server plugin to entertain 2K+ concurrent players}
      \\resumeItem{Published plugin to public use via Spigot forums; received 4.9/5 star rating}
    \\resumeItemListEnd
\\resumeSubHeadingListEnd

%───── TECHNICAL SKILLS ─────
\\section{Technical Skills}
\\begin{itemize}[leftmargin=0.15in, label={}]
  \\small{\\item{
    \\textbf{Languages}{: Java, Python, C/C++, SQL, JavaScript, HTML/CSS, R} \\\\
    \\textbf{Frameworks}{: React, Node.js, Flask, JUnit, WordPress, Material-UI, FastAPI} \\\\
    \\textbf{Developer Tools}{: Git, Docker, TravisCI, Google Cloud Platform, VS Code} \\\\
    \\textbf{Libraries}{: pandas, NumPy, Matplotlib, scikit-learn, PyTorch, Keras}
  }}
\\end{itemize}

\\end{document}`;

// ─────────────────────────────────────────────
// TEMPLATE 2: Awesome CV (two-column sidebar style)
// ─────────────────────────────────────────────
const AWESOME_CV = `\\documentclass[11pt, a4paper]{article}
\\usepackage[T1]{fontenc}
\\usepackage[margin=1.4cm]{geometry}
\\usepackage{array}
\\usepackage{color}
\\usepackage{fontawesome5}
\\usepackage{hyperref}
\\usepackage{tabularx}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{xcolor}

\\definecolor{accentblue}{HTML}{0077B5}
\\definecolor{darkgray}{HTML}{333333}
\\definecolor{midgray}{HTML}{666666}

\\hypersetup{colorlinks=true, urlcolor=accentblue}
\\pagestyle{empty}

\\titleformat{\\section}{\\large\\bfseries\\color{accentblue}}{}{0em}{}[\\color{accentblue}\\hrule\\vspace{2pt}]
\\titlespacing{\\section}{0pt}{10pt}{4pt}

\\newcommand{\\cventry}[4]{
  {\\textbf{#1} \\hfill {\\small\\color{midgray}#2}} \\\\
  {\\small\\textit{\\color{midgray}#3} \\hfill \\textit{#4}}
  \\vspace{4pt}
}

\\begin{document}

%───── HEADER ─────
\\begin{center}
  {\\Huge\\bfseries\\color{darkgray} Posquit0 Lee} \\\\[4pt]
  {\\small
    \\faEnvelope\\ \\href{mailto:posquit0.bj@gmail.com}{posquit0.bj@gmail.com} \\quad
    \\faPhone\\ +82-10-1234-5678 \\quad
    \\faLinkedin\\ \\href{https://linkedin.com/in/posquit0}{posquit0} \\quad
    \\faGithub\\ \\href{https://github.com/posquit0}{posquit0} \\quad
    \\faMapMarker\\ Seoul, South Korea
  }
\\end{center}

\\vspace{4pt}

%───── SUMMARY ─────
\\section{Summary}
Senior software engineer with 8+ years building scalable distributed systems. Passionate about open source; author of \\textbf{Awesome-CV} with 20k+ GitHub stars.

%───── EXPERIENCE ─────
\\section{Experience}

\\cventry{Senior Software Engineer}{Jan 2022 – Present}{Kakao Corp}{Seoul, Korea}
\\begin{itemize}[leftmargin=*, noitemsep, topsep=2pt]
  \\item Led migration of monolithic service to microservices, reducing latency by 40\\%
  \\item Designed Kafka-based event streaming pipeline processing 1M+ events/day
  \\item Mentored team of 6 engineers; established code review and CI/CD practices
\\end{itemize}

\\vspace{4pt}
\\cventry{Software Engineer}{Mar 2019 – Dec 2021}{LINE Corporation}{Tokyo, Japan}
\\begin{itemize}[leftmargin=*, noitemsep, topsep=2pt]
  \\item Developed real-time messaging backend in Go serving 100M+ daily users
  \\item Implemented end-to-end encryption protocol for LINE message storage
  \\item Built internal monitoring dashboard reducing mean time to recovery by 60\\%
\\end{itemize}

%───── EDUCATION ─────
\\section{Education}

\\cventry{B.Sc. Computer Science}{2013 – 2017}{Pohang University of Science and Technology}{Pohang, Korea}

%───── SKILLS ─────
\\section{Skills}
\\begin{tabular}{@{}ll}
  \\textbf{Languages} & Go, Python, TypeScript, Kotlin, Rust \\\\
  \\textbf{Infra}     & Kubernetes, AWS, Terraform, Prometheus \\\\
  \\textbf{Databases} & PostgreSQL, Redis, Cassandra, Elasticsearch \\\\
\\end{tabular}

\\end{document}`;

// ─────────────────────────────────────────────
// TEMPLATE 4: Modern Minimal (clean single-column)
// ─────────────────────────────────────────────
const MODERN_MINIMAL = `\\documentclass[10pt, letterpaper]{article}
\\usepackage[
  ignoreheadfoot,
  top=1.2cm, bottom=1.2cm,
  left=1.4cm, right=1.4cm,
  columnsep=1.2cm
]{geometry}
\\usepackage{fontenc}
\\usepackage{inputenc}
\\usepackage{tabularx}
\\usepackage{array}
\\usepackage{parskip}
\\usepackage{color}
\\usepackage[normalem]{ulem}
\\usepackage{amsmath}
\\usepackage{amssymb}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{hyperref}
\\usepackage{xcolor}

\\definecolor{primary}{HTML}{1a1a1a}
\\definecolor{accent}{HTML}{0d6efd}
\\definecolor{subtle}{HTML}{6c757d}

\\hypersetup{colorlinks=true,urlcolor=accent,linkcolor=primary}
\\pagestyle{empty}
\\setlength{\\parindent}{0pt}
\\setlength{\\parskip}{0pt}

\\titleformat{\\section}
  {\\normalsize\\bfseries\\color{primary}}
  {}{0pt}{}
  [{\\color{subtle}\\titlerule[0.4pt]}]
\\titlespacing{\\section}{0pt}{10pt}{5pt}

\\newcommand{\\entry}[3]{%
  {\\textbf{#1}} \\hfill {\\small\\color{subtle}#2} \\\\
  {\\small\\color{subtle}\\textit{#3}}
}

\\begin{document}

%───── NAME ─────
{\\LARGE\\bfseries\\color{primary} Sarah Chen}

\\vspace{3pt}
{\\small
  \\href{mailto:sarah.chen@gmail.com}{sarah.chen@gmail.com} \\;·\\;
  (650) 555-0123 \\;·\\;
  San Francisco, CA \\;·\\;
  \\href{https://sarahchen.dev}{sarahchen.dev} \\;·\\;
  \\href{https://github.com/sarahchen}{github/sarahchen}
}

\\vspace{8pt}

%───── ABOUT ─────
\\section{About}
Product-minded full-stack engineer with 6 years building consumer products at scale. Fluent in React, Node.js, and distributed systems. I care about fast UIs, clean APIs, and teams that ship.

%───── EXPERIENCE ─────
\\section{Experience}

\\entry{Staff Engineer}{Stripe · San Francisco, CA}{Jan 2022 – Present}
\\begin{itemize}[noitemsep, topsep=4pt, leftmargin=12pt]
  \\item Led 0→1 of Stripe's new merchant analytics product, now used by 300k+ businesses
  \\item Architected event-driven data pipeline (Kafka + Flink) reducing report latency to \\textless{}2s
  \\item Grew and managed a team of 8 engineers across two time zones
\\end{itemize}

\\vspace{6pt}
\\entry{Senior Software Engineer}{Figma · San Francisco, CA}{Jun 2019 – Dec 2021}
\\begin{itemize}[noitemsep, topsep=4pt, leftmargin=12pt]
  \\item Re-architected Figma's real-time collaboration engine, cutting CPU usage by 35\\%
  \\item Built plugin API used by 2M+ users and 5k+ third-party integrations
  \\item Shipped dark mode end-to-end in 6 weeks; led cross-functional rollout
\\end{itemize}

%───── PROJECTS ─────
\\section{Projects}
\\entry{\\href{https://github.com/sarahchen/lazydb}{LazyDB}}{Open Source · 2023}{Embedded key-value store in Rust, 3k+ GitHub stars}

\\entry{\\href{https://github.com/sarahchen/cssbot}{CSSBot}}{Side project · 2022}{AI that converts Figma designs to Tailwind CSS, 800 weekly users}

%───── EDUCATION ─────
\\section{Education}
\\entry{B.S. Computer Science, Minor Statistics}{UC Berkeley · Berkeley, CA}{2015 – 2019}

%───── SKILLS ─────
\\section{Skills}
\\begin{tabular}{@{} l l}
  \\textbf{Languages}  & TypeScript, Rust, Go, Python, SQL \\\\
  \\textbf{Frontend}   & React, Next.js, WebAssembly, CSS/animations \\\\
  \\textbf{Backend}    & Node.js, PostgreSQL, Redis, Kafka, gRPC \\\\
  \\textbf{Infra}      & AWS, Kubernetes, Terraform, Datadog \\\\
\\end{tabular}

\\end{document}`;

// ─────────────────────────────────────────────
// TEMPLATE 5: Deedy CV (two-column compact)
// ─────────────────────────────────────────────
const DEEDY_CV = `\\documentclass[letterpaper]{article}
\\usepackage[
  left=1cm, right=1cm,
  top=1.2cm, bottom=1.2cm
]{geometry}
\\usepackage{array}
\\usepackage{tabularx}
\\usepackage{color}
\\usepackage{xcolor}
\\usepackage{enumitem}
\\usepackage{hyperref}
\\usepackage{titlesec}
\\usepackage{fontenc}

\\definecolor{date}{HTML}{666666}
\\definecolor{primary}{HTML}{2b2b2b}
\\definecolor{headings}{HTML}{6A6A6A}
\\definecolor{subheadings}{HTML}{333333}

\\hypersetup{colorlinks=true,urlcolor=date}
\\pagestyle{empty}

\\titleformat{\\section}{\\color{headings}\\scshape\\fontsize{11pt}{11pt}\\selectfont\\bfseries\\raggedright}{}{0em}{}
\\titlespacing{\\section}{0pt}{0pt}{5pt}

% Two column setup
\\newcolumntype{L}{>{\\raggedright\\arraybackslash}p{0.25\\textwidth}}
\\newcolumntype{R}{>{\\raggedright\\arraybackslash}p{0.72\\textwidth}}

\\begin{document}

%───── HEADER ─────
\\begin{center}
  {\\fontsize{32pt}{32pt}\\selectfont\\scshape Deedy Das} \\\\[4pt]
  {\\fontsize{11pt}{11pt}\\selectfont\\color{headings}
    \\href{mailto:deedy@cs.cornell.edu}{deedy@cs.cornell.edu} $\\cdot$
    \\href{https://deedydas.com}{deedydas.com} $\\cdot$
    (607) 555-0199
  }
\\end{center}

\\vspace{6pt}

\\begin{tabular}{LR}

%───── LEFT COLUMN ─────
\\begin{minipage}[t]{0.27\\textwidth}

\\section{Education}
\\textbf{Cornell University} \\\\
\\textit{B.S. Computer Science} \\\\
\\textcolor{date}{Aug 2012 – May 2016} \\\\
GPA: 3.92 / 4.0 \\\\[4pt]
\\textbf{The Frank Anthony} \\\\
\\textbf{Public School} \\\\
\\textcolor{date}{Graduated 2012} \\\\
\\textit{All India Rank 23}

\\section{Links}
\\href{https://github.com/deedydas}{GitHub: deedydas} \\\\
\\href{https://linkedin.com/in/deedydas}{LinkedIn: deedydas} \\\\
\\href{https://deedydas.com}{deedydas.com}

\\section{Skills}
\\textbf{Proficient} \\\\
Java, C, Python, iOS, \\\\
MATLAB, \\LaTeX \\\\[4pt]
\\textbf{Familiar} \\\\
C++, Ruby, Android \\\\[4pt]
\\textbf{Tools} \\\\
Git, Xcode, Eclipse, \\\\
JIRA, Photoshop

\\section{Coursework}
Algorithms \\\\
Operating Systems \\\\
Distributed Systems \\\\
Computer Graphics \\\\
Machine Learning \\\\
Computer Vision

\\end{minipage}

&

%───── RIGHT COLUMN ─────
\\begin{minipage}[t]{0.70\\textwidth}

\\section{Experience}

\\textbf{Facebook} \\hfill \\textcolor{date}{May 2015 – Aug 2015} \\\\
\\textit{Software Engineer Intern, Ads Infrastructure} \\\\[3pt]
\\begin{itemize}[noitemsep, topsep=0pt, leftmargin=10pt]
  \\item Designed a data model enabling engineers to write safer, testable feature experiments
  \\item Built end-to-end logging pipeline for 4M+ experiment variants per day
  \\item Reduced experiment cycle time from 2 weeks to 3 days via automated analysis
\\end{itemize}

\\vspace{6pt}
\\textbf{Palantir Technologies} \\hfill \\textcolor{date}{Jan 2015 – May 2015} \\\\
\\textit{Software Engineer Intern, Forward Deployed} \\\\[3pt]
\\begin{itemize}[noitemsep, topsep=0pt, leftmargin=10pt]
  \\item Built Palantir's first mobile investigative analysis tool for the DOJ
  \\item Delivered working iOS prototype in 10 weeks; deployed to 50+ analysts
\\end{itemize}

\\section{Projects}

\\textbf{MacroHard} $|$ \\textit{iOS, Swift, Core ML} \\hfill \\textcolor{date}{2023} \\\\
Real-time food macronutrient recognition using on-device ML; 15k App Store installs. \\\\[4pt]

\\textbf{Quora Answer Bot} $|$ \\textit{Python, NLTK, scikit-learn} \\hfill \\textcolor{date}{2022} \\\\
Automated answering system for 1M+ Quora questions; 82\\% accuracy on held-out set.

\\section{Research}

\\textbf{Prof. Kavita Bala, Cornell CG Lab} \\hfill \\textcolor{date}{Jan – May 2016} \\\\
Designed a GPU-accelerated Monte Carlo rendering pipeline in C++/CUDA; \\\\
achieved 8$\\times$ speedup over reference CPU implementation.

\\end{minipage}

\\end{tabular}

\\end{document}`;

const IIIT_ALLAHABAD = `\\documentclass[a4paper,11pt]{article}
\\usepackage[margin=1.2cm]{geometry}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{titlesec}
\\pagestyle{empty}
\\titleformat{\\section}{\\large\\bfseries}{}{0em}{}[\\titlerule]
\\begin{document}
\\begin{center}
  \\textbf{\\Huge ARJUN SHARMA} \\\\
  B.Tech, Information Technology $|$ IIIT Allahabad \\\\
  \\href{mailto:arjun@example.com}{arjun@example.com} $|$ +91 98765 43210 $|$
  \\href{https://linkedin.com/in/arjun}{LinkedIn} $|$ \\href{https://github.com/arjun}{GitHub}
\\end{center}
\\section{Education}
\\textbf{Indian Institute of Information Technology, Allahabad} \\hfill 2022 -- 2026 \\\\
B.Tech in Information Technology \\hfill CGPA: 8.8/10 \\\\
\\textbf{Senior Secondary (CBSE)} \\hfill 2022 \\\\
Science with Computer Science \\hfill 94.2\\%
\\section{Experience}
\\textbf{Software Engineering Intern, FinTech Labs} \\hfill May 2025 -- Jul 2025
\\begin{itemize}[noitemsep]
  \\item Built a Spring Boot reconciliation service processing 2M+ transactions daily
  \\item Reduced settlement mismatches by 31\\% through automated validation rules
\\end{itemize}
\\section{Projects}
\\textbf{Campus Connect} $|$ React, Node.js, PostgreSQL
\\begin{itemize}[noitemsep]
  \\item Created a placement portal used by 1,200+ students with role-based access
  \\item Improved search response time 45\\% using indexed queries and Redis caching
\\end{itemize}
\\textbf{CodeJudge} $|$ Python, Docker, FastAPI
\\begin{itemize}[noitemsep]
  \\item Developed a sandboxed code evaluator supporting 5 languages and 500 daily submissions
\\end{itemize}
\\section{Technical Skills}
\\textbf{Languages:} C++, Java, Python, JavaScript, SQL \\\\
\\textbf{Technologies:} React, Node.js, Spring Boot, PostgreSQL, Docker, Git
\\section{Achievements and Leadership}
\\begin{itemize}[noitemsep]
  \\item Specialist on Codeforces; solved 700+ data structures and algorithms problems
  \\item Coordinated institute hackathon with 40 teams and 12 industry mentors
\\end{itemize}
\\end{document}`;

const ALTACV_INSPIRED = `\\documentclass[a4paper,10pt]{article}
\\usepackage[margin=1.2cm]{geometry}
\\usepackage{xcolor}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{titlesec}
\\definecolor{accent}{HTML}{7B2CBF}
\\pagestyle{empty}
\\titleformat{\\section}{\\large\\bfseries\\color{accent}}{}{0em}{}[\\color{accent}\\titlerule]
\\begin{document}
{\\Huge\\textbf{MAYA PATEL}} \\\\
{\\large Product Engineer} \\\\
\\href{mailto:maya@example.com}{maya@example.com} $|$ Bengaluru, India $|$
\\href{https://mayapatel.dev}{Portfolio} $|$ \\href{https://github.com/maya}{GitHub}
\\section{Profile}
Product-minded engineer with 5 years of experience building accessible SaaS products. Combines strong frontend craft with pragmatic backend and analytics skills.
\\section{Experience}
\\textbf{Senior Product Engineer, CloudWorks} \\hfill 2023 -- Present
\\begin{itemize}[noitemsep]
  \\item Led a self-service onboarding redesign that improved activation by 19\\%
  \\item Built a reusable React component system adopted across 6 product squads
  \\item Mentored 4 engineers and introduced accessibility checks into CI
\\end{itemize}
\\textbf{Software Engineer, StudioOne} \\hfill 2021 -- 2023
\\begin{itemize}[noitemsep]
  \\item Shipped collaborative editing for 80K monthly users using WebSockets and CRDTs
  \\item Cut frontend bundle size by 37\\%, improving mobile conversion by 8\\%
\\end{itemize}
\\section{Strengths}
Product strategy $|$ Design systems $|$ Technical leadership $|$ Accessibility
\\section{Skills}
TypeScript, React, Next.js, Node.js, PostgreSQL, GraphQL, AWS, Figma
\\section{Education}
\\textbf{B.E. Computer Science, BITS Pilani} \\hfill 2017 -- 2021
\\end{document}`;

const CAMPUS_PLACEMENT = `\\documentclass[a4paper,10pt]{article}
\\usepackage[margin=1.1cm]{geometry}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{titlesec}
\\pagestyle{empty}
\\titleformat{\\section}{\\normalsize\\bfseries}{}{0em}{}[\\titlerule]
\\begin{document}
\\begin{center}
  \\textbf{\\Huge RAHUL VERMA} \\\\
  Computer Science and Engineering $|$ Class of 2026 \\\\
  +91 90000 00000 $|$ \\href{mailto:rahul@example.com}{rahul@example.com} $|$
  \\href{https://github.com/rahul}{GitHub} $|$ \\href{https://linkedin.com/in/rahul}{LinkedIn}
\\end{center}
\\section{Academic Qualifications}
\\textbf{B.Tech, Computer Science and Engineering} \\hfill 2022 -- 2026 \\\\
National Institute of Technology \\hfill CGPA: 9.1/10 \\\\
\\textbf{Class XII, CBSE} \\hfill 95.0\\% \\\\
\\textbf{Class X, CBSE} \\hfill 96.4\\%
\\section{Internship}
\\textbf{Backend Engineering Intern, DataStack} \\hfill Summer 2025
\\begin{itemize}[noitemsep]
  \\item Designed event ingestion APIs handling 8K requests per second with 99.95\\% availability
  \\item Added distributed tracing that reduced incident diagnosis time by 52\\%
\\end{itemize}
\\section{Key Projects}
\\textbf{Distributed File Store} $|$ Go, gRPC, Raft
\\begin{itemize}[noitemsep]
  \\item Implemented replicated storage with leader election and automatic recovery
\\end{itemize}
\\textbf{Smart Attendance} $|$ Python, OpenCV, FastAPI
\\begin{itemize}[noitemsep]
  \\item Achieved 96\\% validation accuracy across 10K classroom images
\\end{itemize}
\\section{Skills and Coursework}
\\textbf{Skills:} C++, Go, Python, TypeScript, SQL, Linux, Docker, AWS \\\\
\\textbf{Coursework:} DSA, Operating Systems, DBMS, Networks, Machine Learning
\\section{Positions of Responsibility}
\\begin{itemize}[noitemsep]
  \\item Technical Lead, Coding Club: guided 8 contributors and organized weekly contests
  \\item Teaching Assistant, Data Structures: supported 120 students in labs and tutorials
\\end{itemize}
\\end{document}`;

const SOFTWARE_ENGINEER = `\\documentclass[letterpaper,10pt]{article}
\\usepackage[margin=0.6in]{geometry}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{titlesec}
\\pagestyle{empty}
\\titleformat{\\section}{\\large\\bfseries}{}{0em}{}[\\titlerule]
\\begin{document}
\\begin{center}
  \\textbf{\\Huge PRIYA SINGH} \\\\
  Senior Software Engineer \\\\
  \\href{mailto:priya@example.com}{priya@example.com} $|$ Pune, India $|$
  \\href{https://linkedin.com/in/priya}{LinkedIn} $|$ \\href{https://github.com/priya}{GitHub}
\\end{center}
\\section{Summary}
Backend-focused software engineer with 7 years building reliable cloud platforms and developer tooling. Experienced in distributed systems, observability and technical leadership.
\\section{Experience}
\\textbf{Senior Software Engineer, ScaleGrid} \\hfill 2022 -- Present
\\begin{itemize}[noitemsep]
  \\item Architected a multi-region control plane serving 14K enterprise workloads at 99.99\\% availability
  \\item Reduced cloud spend by \\$480K annually through autoscaling and storage lifecycle policies
  \\item Led delivery across 7 engineers and partnered with security on SOC 2 controls
\\end{itemize}
\\textbf{Software Engineer, DevFlow} \\hfill 2019 -- 2022
\\begin{itemize}[noitemsep]
  \\item Built CI orchestration APIs processing 1.5M jobs per month
  \\item Improved p95 API latency from 620ms to 180ms using caching and query redesign
\\end{itemize}
\\section{Selected Projects}
\\textbf{TraceLite} $|$ Go, OpenTelemetry, ClickHouse \\hfill 2024 \\\\
Open-source tracing backend with 1.8K GitHub stars and 40 community contributors.
\\section{Skills}
Go, Java, Python, Kubernetes, AWS, PostgreSQL, Kafka, Terraform, OpenTelemetry
\\section{Education}
\\textbf{B.Tech in Computer Engineering, COEP Technological University} \\hfill 2015 -- 2019
\\end{document}`;

export const TEMPLATES: LatexTemplate[] = [
  {
    id: "jakes",
    name: "Jake's Resume",
    author: "Jake Gutierrez",
    description: "The most starred LaTeX resume on GitHub. Clean single-column ATS-friendly design used by thousands of engineers.",
    tags: ["ATS-friendly", "Software", "Popular"],
    accent: "#10b981",
    code: JAKES_RESUME_WITH_LINKS,
  },
  {
    id: "awesome-cv",
    name: "Awesome CV",
    author: "Claud D. Park (posquit0)",
    description: "Professional two-section layout with colored accents. Used widely in Korea/Asia tech. 20k+ GitHub stars.",
    tags: ["Professional", "Tech", "Icons"],
    accent: "#0077B5",
    code: AWESOME_CV,
  },
//   {
//     id: "academic",
//     name: "Academic CV",
//     author: "Open Source",
//     description: "Classic academic format with publications, grants, and appointments sections. Ideal for PhD students, researchers, and faculty.",
//     tags: ["Academic", "Research", "PhD"],
//     accent: "#002147",
//     code: ACADEMIC_CV,
//   },
  {
    id: "modern-minimal",
    name: "Modern Minimal",
    author: "Community",
    description: "Sleek, typographically refined single-column CV. Perfect for product engineers and designers who want clean aesthetics.",
    tags: ["Minimal", "Modern", "Design"],
    accent: "#0d6efd",
    code: MODERN_MINIMAL,
  },
  {
    id: "deedy",
    name: "Deedy CV",
    author: "Debarghya Das",
    description: "Iconic two-column format—left sidebar for skills, right for experience. Hugely popular in US CS graduate circles.",
    tags: ["Two-column", "CS", "Compact"],
    accent: "#e53e3e",
    code: DEEDY_CV,
  },
  {
    id: "iiit-vadodara",
    name: "IIIT Vadodara",
    author: "Overleaf community",
    description: "Complete IIIT Vadodara placement source with education, experience, projects, skills, PORs, and achievements.",
    tags: ["IIIT", "Placement", "Full source"],
    accent: "#2563eb",
    code: IIIT_VADODARA_FULL,
  },
  {
    id: "altacv",
    name: "AltaCV Inspired",
    author: "LianTze Lim inspired",
    description: "A colorful modern direction based on an Overleaf staff-selected top pick.",
    tags: ["Overleaf pick", "Modern", "Product"],
    accent: "#7c3aed",
    code: ALTACV_INSPIRED,
  },
  {
    id: "iit-guwahati",
    name: "IIT Guwahati",
    author: "Arkadeep Das et al.",
    description: "Complete Intern Fair and campus placement template with academic table, projects, courses, PORs, and achievements.",
    tags: ["IITG", "Internship", "Full source"],
    accent: "#0f766e",
    code: IIT_GUWAHATI_FULL,
  },
  {
    id: "software-engineer",
    name: "Software Engineer",
    author: "Community adaptation",
    description: "Metric-focused one-page format for experienced backend and full-stack engineers.",
    tags: ["Experienced", "ATS-friendly", "Tech"],
    accent: "#ea580c",
    code: SOFTWARE_ENGINEER,
  },
];
