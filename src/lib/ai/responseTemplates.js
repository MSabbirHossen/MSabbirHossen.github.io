/**
 * Multilingual AI Assistant Response Templates for English (en), Arabic (ar), and Bengali (bn).
 * Preserves all technical terms, project names, code identifiers, and URLs verbatim.
 */

export const AI_RESPONSE_TEMPLATES = {
  en: {
    greeting: (name) =>
      `👋 **Assalamu Alaikum! I'm Sabbir's Portfolio Guide.**\n` +
      `I can give you an executive recruiter walkthrough of ${name}’s latest MERN stack projects, technical architecture, and skill set.\n\n` +
      `Where would you like to begin?`,
    thanks:
      'Happy to help! Feel free to ask about specific projects, system design, code samples, or direct contact whenever you are ready.',
    reportBd:
      '🌟 **Report BD (BPS Report)** is Sabbir’s flagship MERN stack application — an institutional mentorship and multi-tenant personal reporting platform built with TypeScript, React 19, Express 4, and MongoDB Atlas.\n\n' +
      '• **Architecture:** npm workspaces monorepo separating shared validation schemas (`@reportbd/shared`), an Express REST API, and a Vite React 19 SPA.\n' +
      '• **Data Integrity & Concurrency:** Optimistic revision locking prevents stale overwrites (`HTTP 409 Conflict`) and deterministic formula engines handle variable month calculations.\n' +
      '• **Zero-Trust Security:** Firebase Admin token verification, multi-tenant RBAC (4 system roles, 7 tiers), and recursive server-side audit log sanitization.\n' +
      '• **Production Features:** Trilingual i18n (Bengali, English, Arabic RTL) and dedicated A4 printable report layouts with dual signatures.',
    eta:
      '🎓 **Exploratory Training Academy (ETA)** is Sabbir’s second featured MERN application — a comprehensive digital education management platform (LMS).\n\n' +
      '• **Role-Based Dashboards:** Distinct tailored interfaces for Students, Instructors, and System Administrators.\n' +
      '• **Course Management:** Curriculum authoring, lesson videos, interactive quizzes, and student progress tracking.\n' +
      '• **Modern Tech Stack:** React 19, Redux Toolkit for complex state, Framer Motion for smooth micro-interactions, Express, and MongoDB.\n' +
      '• **Live Deployment:** Deployed on Vercel with responsive, accessible UI across mobile and desktop.',
    whyHire:
      '💡 **Why consider Md. Sabbir Hossen for your engineering team?**\n\n' +
      '1. **Production-Minded MERN Depth:** He architects complete full-stack web applications with clean separation of concerns, robust REST APIs (Express/Node.js), and modern React 19 frontends.\n' +
      '2. **Type Safety & Data Contracts:** Experienced with TypeScript and Zod validation across shared monorepo packages (as demonstrated in Report BD).\n' +
      '3. **Concurrency & Defensive Security:** Proven implementation of optimistic revision locking (preventing stale writes with `HTTP 409 Conflict`), zero-trust Firebase token checks, and recursive audit log sanitization.\n' +
      '4. **Modern UI & State Management:** Skilled in Tailwind CSS v4, Redux Toolkit, TanStack Query, Framer Motion, and responsive accessibility.\n' +
      '5. **Disciplined Problem Solver:** 7 verified technical certifications (Phitron Web Development, CS fundamentals) and rigorous Git commit habits.',
    architecture:
      '🏛️ **Sabbir’s System Architecture Standards:**\n\n' +
      '• **Monorepo Separation:** Packages split cleanly into shared domain logic (`@reportbd/shared`), Express REST APIs, and client SPAs.\n' +
      '• **Contract-First Validation:** Shared Zod schemas ensure client-side forms and server-side endpoints validate against the exact same rules without logic drift.\n' +
      '• **Optimistic Concurrency Control:** Uses revision counters on sensitive records to reject stale edits with explicit `HTTP 409 Conflict` instead of silent data loss.\n' +
      '• **Defensive Security & RBAC:** Multi-tenant role tiers, zero-trust token decoding, and recursive sanitization of audit logs before database insertion.\n' +
      '• **Performance & Accessibility:** Mobile-first responsive layouts, dynamic typography scaling (1.0x–1.30x), trilingual LTR/RTL support, and clean A4 print formatting.',
    typescript:
      '📘 **TypeScript & Schema Validation:**\n\n' +
      'Sabbir leverages TypeScript and Zod to guarantee end-to-end type safety in production:\n' +
      '• In **Report BD**, data schemas, mathematical calculation formulas, and validation rules are centralized in a shared workspace package (`@reportbd/shared`).\n' +
      '• Both the Vite React 19 frontend and Node.js/Express API consume these contracts directly, eliminating runtime contract drift.\n' +
      '• Zod schema validation guards all mutating endpoints against invalid payloads before hitting MongoDB Atlas.',
    skills:
      '🛠️ **Technical Stack & Skills:**\n' +
      'Sabbir specializes in the MERN stack with modern full-stack tooling:\n' +
      '• **Frontend:** React 19, JavaScript (ES6+), TypeScript, Tailwind CSS v4, Redux Toolkit, TanStack Query, Framer Motion.\n' +
      '• **Backend & DB:** Node.js, Express.js, MongoDB Atlas, Mongoose, RESTful APIs, Firebase Auth, JWT, Zod Validation.\n' +
      '• **Tools & Workflow:** Git, GitHub, Vite, Vercel, Docker basics, Postman, Linux environments.',
    contact:
      '📞 **Get in Touch with Sabbir:**\n' +
      'He is actively available for Junior MERN Stack Developer, Full-Stack, Backend, or Frontend roles, internships, and freelance projects.\n' +
      'Feel free to connect directly via WhatsApp or email!',
    experience:
      '💼 **Experience & Milestones:**\n\n' +
      '• **Solo Full-Stack Developer — Report BD (BPS Report):**\n' +
      'Architected multi-tenant personal reporting & mentorship platform using TypeScript, React 19, Express 4 REST API, MongoDB Atlas, Firebase Auth, and Zod.\n\n' +
      '• **Full-Stack Developer & Mentorship — Exploratory Training Academy (ETA):**\n' +
      'Engineered comprehensive LMS with student enrollment, interactive quizzes, video progress tracking, and Redux Toolkit state management.\n\n' +
      '• **Open-Source & Project Work:**\n' +
      'Active contributor with disciplined version control, atomic commits, and continuous testing.',
    currentFocus: '⚡ **What Sabbir is Actively Building & Learning Right Now:**',
    education: (latest) =>
      latest
        ? `🎓 **Academic Background:**\nCurrently studying **${latest.degree}** at **${latest.institution}** (${latest.period}).\nSpecializing in computer science fundamentals, software engineering, and web systems.`
        : 'Education details are available in the Education section.',
    certifications: (count) =>
      `🏆 **Verified Certifications & Credentials:**\nSabbir holds **${count} verified certifications** covering full-stack web development, computer science fundamentals, and programming foundations (including Phitron Complete Web Development).`,
    resume:
      '📄 **Resume & Credentials:**\nYou can review Sabbir’s latest software engineering resume instantly via the links below:',
    llmsTxt:
      '🤖 **Machine-Readable AI Profile (/llms.txt):**\n\n' +
      'Sabbir has published an official `/llms.txt` file at the root of his portfolio according to the machine-readable standard.\n' +
      'It contains a structured markdown summary of his technical background, project architectures, technology stack, and contact links designed specifically for AI models, coding assistants, and automated web crawlers.',
    github:
      '📈 **GitHub Activity & Codebase Evidence:**\n' +
      'Sabbir maintains active GitHub activity with disciplined atomic commits, clear documentation, and open-source monorepos.\n' +
      'Explore his GitHub stats dashboard or visit his profile directly:',
    guide:
      '📖 **Interactive Portfolio Guide:**\n\n' +
      'Sabbir has built an interactive **Portfolio Guide** at /guide designed to help recruiters, engineering leads, and visitors get the most out of their exploration.\n\n' +
      'It provides an in-depth walkthrough covering:\n' +
      '• 01. Welcome & Engineering Ethos\n' +
      '• 02. Quick Start Paths (Recruiter, Architect, Credentials)\n' +
      '• 03. Complete Route & Keyboard Navigation\n' +
      '• 04. Flagship Projects & Architecture (Report BD & ETA)\n' +
      '• 05. Technology Breakdown (React 19, Zod, MongoDB, TypeScript)\n' +
      '• 06. Verified Credentials & Experience\n' +
      '• 07. Interactive Tools & Dark/Light Themes\n' +
      '• 08. Direct WhatsApp & Contact Channels\n' +
      '• 09. Frequently Asked Questions (FAQ)\n' +
      '• 10. Accessibility & Troubleshooting',
    availability: (text) =>
      `💼 **Availability:**\n${text}\nAvailable immediately for full-time, remote, internship, or freelance opportunities.`,
    unknown:
      "I can guide you through Sabbir's MERN projects (like Report BD & ETA), technical skills, system architecture, certifications, or direct contact options. What would you like to explore?",
    errorFallback:
      'I ran into an issue preparing that response. Please try again, or use the quick actions to navigate projects, skills, or contact details.',
    contextualBackend: (title, tech, arch) =>
      `⚡ **${title} Backend Architecture:**\n**Core Stack:** ${tech}${arch}`,
    headlines: {
      mern: 'Here are Sabbir’s flagship MERN stack applications, demonstrating end-to-end architecture from MongoDB and Express up to React 19:',
      security:
        'Here are projects where Sabbir implemented zero-trust authentication, audit log sanitization, and optimistic concurrency locking:',
      default:
        'Here are Sabbir’s top featured projects, prioritized by technical complexity and production readiness:',
      notFound:
        'I could not find matching project data for that request yet. You can open the Projects section to browse all available work.',
    },
  },

  ar: {
    greeting: (name) =>
      `👋 **السلام عليكم ورحمة الله وبركاته! أنا مرشد بورتفوليو صابر.**\n` +
      `يمكنني أن أقدم لك جولة مخصصة لمسؤولي التوظيف والمهندسين لاستكشاف أحدث مشاريع ${name} في MERN Stack، وهندسة النظم، والمهارات التقنية.\n\n` +
      `من أين تفضل أن نبدأ؟`,
    thanks:
      'سعيد جداً بمساعدتك! لا تتردد في سؤالي عن تفاصيل أي مشروع، أو معمارية النظم، أو نماذج الكود، أو خيارات التواصل المباشر في أي وقت.',
    reportBd:
      '🌟 **Report BD (BPS Report)** هو تطبيق MERN Stack الرئيسي لصابر — وهو عبارة عن منصة مؤسسية للإبلاغ والتوجيه والمتابعة الشخصية متعددة المستأجرين (Multi-tenant) مبنية باستخدام TypeScript و React 19 و Express 4 و MongoDB Atlas.\n\n' +
      '• **البنية الهندسية:** مستودع أحادي (npm workspaces monorepo) يفصل بوضوح بين حزم مخططات التحقق المشتركة (`@reportbd/shared`)، وواجهة REST API مبنية بـ Express، وتطبيق صفحة واحدة (SPA) بـ Vite و React 19.\n' +
      '• **تكامل البيانات والتزامن:** قفل المراجعة التفاؤلي (Optimistic Revision Locking) لمنع الكتابة المتضاربة المتزامنة (`HTTP 409 Conflict`) ومحركات حسابية دقيقة لمعالجة الأيام التلقائية للأشهر المتغيرة.\n' +
      '• **أمان انعدام الثقة (Zero-Trust):** التحقق من رموز Firebase Admin Token، ونظام صلاحيات متعدد المستأجرين RBAC (4 أدوار و 7 مستويات)، وتطهير متكرر لسجلات التدقيق قبل الحفظ.\n' +
      '• **ميزات إنتاجية متقدمة:** دعم ثلاثي اللغات (العربية RTL، الإنجليزية، البنغالية) وتصميمات طباعة A4 مخصصة للتقارير مع تواقيع مزدوجة.',
    eta:
      '🎓 **Exploratory Training Academy (ETA)** هو ثاني مشاريع MERN البارزة لصابر — منصة شاملة لإدارة التعليم الرقمي (LMS).\n\n' +
      '• **لوحات تحكم مخصصة للأدوار:** واجهات متخصصة للطلاب والمعلمين ومديري النظام.\n' +
      '• **إدارة الدورات التدريبية:** إنشاء المناهج، دروس الفيديو، الاختبارات التفاعلية، ومتابعة تقدم الطلاب خطوة بخطوة.\n' +
      '• **حزمة تقنية حديثة:** React 19، و Redux Toolkit لإدارة الحالة المعقدة، و Framer Motion للتفاعلات الحركية السلسة، مع Express و MongoDB.\n' +
      '• **نشر فعلي مباشر:** منشور على Vercel مع واجهة مستخدم سريعة الاستجابة وسهلة الوصول عبر مختلف الشاشات.',
    whyHire:
      '💡 **لماذا يجدر بك اختيار محمد صابر حسين لفريقك الهندسي؟**\n\n' +
      '1. **خبرة عملية متعمقة في MERN:** يبني تطبيقات ويب كاملة بمعمارية نظيفة، وواجهات برمجة تطبيقات REST متينة بـ Node.js و Express، مع واجهات أمامية حديثة بـ React 19.\n' +
      '2. **أمان الأنواع وعقود البيانات (Type Safety):** إتقان تام لـ TypeScript ومكتبة التحقق Zod عبر حزم المونوريبو المشتركة (كما هو موضح في مشروع Report BD).\n' +
      '3. **التعامل مع التزامن والأمان الدفاعي:** تطبيق حقيقي لقفل المراجعة التفاؤلي لمنع تضارب التعديلات (`HTTP 409 Conflict`)، وفحص رموز Firebase بانعدام ثقة تام، وتطهير سجلات التدقيق.\n' +
      '4. **واجهات مستخدم حديثة وإدارة حالة احترافية:** تمكن قوي من Tailwind CSS v4 و Redux Toolkit و TanStack Query و Framer Motion والتصميم التفاعلي الشامل.\n' +
      '5. **انضباط هندسي وحل منهجي للمشكلات:** حاصل على 7 شهادات تقنية موثقة (منها دبلوم تطوير الويب من Phitron وأساسيات علوم الحاسوب) والتزام صارم بمنهجية Conventional Commits في Git.',
    architecture:
      '🏛️ **معايير هندسة النظم لدى صابر:**\n\n' +
      '• **فصل المونوريبو (Monorepo Separation):** تقسيم المشاريع بوضوح إلى حزم منطق الأعمال المشتركة (`@reportbd/shared`)، وواجهات REST API، وتطبيقات العميل.\n' +
      '• **التحقق المستند إلى العقود (Contract-First Validation):** تضمن مخططات Zod المشتركة مطابقة البيانات في الواجهة الأمامية والخلفية بنفس القواعد دون أي تعارض.\n' +
      '• **التحكم التفاؤلي في التزامن (Optimistic Concurrency Control):** استخدام أرقام المراجعات (Revisions) للسجلات الحساسة لرفض التعديلات المتزامنة المتضاربة برمز `HTTP 409 Conflict` بدلاً من فقدان البيانات بصمت.\n' +
      '• **الأمان الدفاعي والصلاحيات (RBAC):** مستويات متعددة للأدوار، وفك تشفير الرموز بأمان، وتطهير متكرر لسجلات التدقيق قبل الحفظ في قاعدة البيانات.\n' +
      '• **الأداء وسهولة الوصول:** تصميمات متجاوبة تبدأ من الهاتف، وتحجيم ديناميكي للخطوط (1.0x–1.30x)، ودعم ثلاثي اللغات (RTL/LTR)، وتنسيقات طباعة A4 نظيفة.',
    typescript:
      '📘 **TypeScript والتحقق من المخططات (Schema Validation):**\n\n' +
      'يوظف صابر TypeScript و Zod لضمان أمان تام للأنواع من البداية إلى النهاية:\n' +
      '• في مشروع **Report BD**، تم توحيد مخططات البيانات ومعادلات الحساب وقواعد التحقق في حزمة مشتركة (`@reportbd/shared`).\n' +
      '• تستهلك كل من واجهة React 19 وخلفية Node.js/Express هذه العقود مباشرة، مما يمنع حدوث أي تعارض أثناء التشغيل.\n' +
      '• يحمي التحقق بمخطط Zod جميع نقاط النهاية (Endpoints) ضد البيانات غير الصالحة قبل وصولها إلى MongoDB Atlas.',
    skills:
      '🛠️ **حزمة التقنيات والمهارات:**\n' +
      'يتخصص صابر في حزمة MERN Stack مع أدوات حديثة لتطوير الويب المتكامل:\n' +
      '• **الواجهة الأمامية (Frontend):** React 19، JavaScript (ES6+)، TypeScript، Tailwind CSS v4، Redux Toolkit، TanStack Query، Framer Motion.\n' +
      '• **الواجهة الخلفية وقواعد البيانات (Backend & DB):** Node.js، Express.js، MongoDB Atlas، Mongoose، RESTful APIs، Firebase Auth، JWT، Zod Validation.\n' +
      '• **الأدوات وسير العمل (Tools & Workflow):** Git، GitHub، Vite، Vercel، أساسيات Docker، Postman، بيئات Linux.',
    contact:
      '📞 **تواصل مباشرة مع صابر:**\n' +
      'صابر متاح حالياً للانضمام إلى فرص عمل بدوام كامل أو عن بُعد كمطور MERN Stack مبتدئ (Junior Full-Stack / Backend / Frontend)، أو تدريب عملي، أو مشاريع حرة.\n' +
      'يسعده تواصلك المباشر عبر WhatsApp أو البريد الإلكتروني!',
    experience:
      '💼 **الخبرة والمحطات المهنية:**\n\n' +
      '• **مطور ويب متكامل مستقل — Report BD (BPS Report):**\n' +
      'هندسة منصة تقارير شخصية ومتابعة وتوجيه متعددة المستأجرين باستخدام TypeScript و React 19 و Express 4 REST API و MongoDB Atlas و Firebase Auth و Zod.\n\n' +
      '• **مطور ويب وموجه تقني — Exploratory Training Academy (ETA):**\n' +
      'تطوير منصة تعليمية متكاملة (LMS) تشمل تسجيل الطلاب، اختبارات تفاعلية، تتبع الفيديوهات، وإدارة الحالة بـ Redux Toolkit.\n\n' +
      '• **مشاريع مفتوحة المصدر وبناء مستمر:**\n' +
      'مساهم نشط مع انضباط عالٍ في إدارة الإصدارات، وكتابة التزامات ذرية (Atomic Commits)، واختبارات برمجية مستمرة.',
    currentFocus: '⚡ **ما يقوم صابر ببنائه وتعلمه بنشاط في الوقت الحالي:**',
    education: (latest) =>
      latest
        ? `🎓 **الخلفية الأكاديمية:**\nطالب جامعي يدرس **${latest.degree}** في **${latest.institution}** (${latest.period}).\nمتخصص في أساسيات علوم الحاسوب، وهندسة البرمجيات، وأنظمة الويب.`
        : 'تفاصيل التعليم متاحة في قسم التعليم.',
    certifications: (count) =>
      `🏆 **الشهادات والمؤهلات المعتمدة:**\nيحمل صابر **${count} شهادات تقنية موثقة** تغطي تطوير الويب المتكامل (MERN Stack)، وأساسيات علوم الحاسوب، وهياكل البيانات (بما في ذلك دبلوم Phitron Complete Web Development).`,
    resume:
      '📄 **السيرة الذاتية والمؤهلات:**\nيمكنك مراجعة أحدث سيرة ذاتية هندسية لصابر فوراً عبر الروابط المتاحة أدناه:',
    llmsTxt:
      '🤖 **الملف البرمجي المخصص للذكاء الاصطناعي (/llms.txt):**\n\n' +
      'نشر صابر ملف `/llms.txt` رسمي في جذر موقعه وفقاً للمواصفات القياسية لقراءة الأنظمة الذكية.\n' +
      'يحتوي الملف على ملخص منظم بتنسيق Markdown يشرح خلفيته التقنية، ومعماريات مشاريعه، وحزمة التقنيات، وروابط التواصل المباشرة المخصصة لنماذج الذكاء الاصطناعي ومساعدي البرمجة وأدوات الفحص الآلي.',
    github:
      '📈 **نشاط GitHub وأدلة الكود البرمجي:**\n' +
      'يحافظ صابر على نشاط متواصل في GitHub مع التزامات برمجية ذرية منضبطة وتوثيق واضح لمستودعات المونوريبو مفتوحة المصدر.\n' +
      'يمكنك استكشاف لوحة إحصائيات GitHub أو زيارة ملفه الشخصي مباشرة:',
    guide:
      '📖 **دليل البورتفوليو التفاعلي:**\n\n' +
      'أنشأ صابر **دليلاً تفاعلياً كاملاً** في الرابط /guide مصمماً لمساعدة مسؤولي التوظيف والمهندسين والزوار في استكشاف ملفه الهندسي بسهولة واحترافية.\n\n' +
      'يقدم الدليل جولة شاملة تغطي:\n' +
      '• 01. الترحيب والرؤية الهندسية\n' +
      '• 02. مسارات سريعة (مسؤولو التوظيف، مهندسو النظم، الشهادات)\n' +
      '• 03. التنقل بالمسارات ولوحة المفاتيح\n' +
      '• 04. المشاريع الرئيسية ومعماريتها (Report BD و ETA)\n' +
      '• 05. تفصيل التقنيات (React 19، Zod، MongoDB، TypeScript)\n' +
      '• 06. الشهادات والخبرات الموثقة\n' +
      '• 07. الأدوات التفاعلية ومظاهر الموقع (فاتح/داكن)\n' +
      '• 08. قنوات التواصل المباشر و WhatsApp\n' +
      '• 09. الأسئلة الشائعة (FAQ)\n' +
      '• 10. إمكانية الوصول وحل المشكلات',
    availability: (text) =>
      `💼 **التفرغ وفرص العمل:**\n${text}\nمتاح فوراً للانضمام إلى فرص العمل بدوام كامل، أو العمل عن بُعد، أو فترات التدريب العملي، أو المشاريع الحرة.`,
    unknown:
      'يمكنني مساعدتك في استكشاف مشاريع صابر في MERN Stack (مثل Report BD و ETA)، والمهارات التقنية، وهندسة النظم، والشهادات المعتمدة، أو خيارات التواصل المباشر. ماذا تحب أن نستكشف الآن؟',
    errorFallback:
      'واجهت مشكلة بسيطة في إعداد هذه الاستجابة. يرجى المحاولة مرة أخرى، أو استخدام الإجراءات السريعة أدناه لتصفح المشاريع والمهارات وتفاصيل التواصل.',
    contextualBackend: (title, tech, arch) =>
      `⚡ **البنية الهندسية للواجهة الخلفية لـ ${title}:**\n**حزمة التقنيات الأساسية:** ${tech}${arch}`,
    headlines: {
      mern: 'إليك مشاريع MERN Stack الرئيسية لصابر، والتي توضح المعمارية الشاملة من MongoDB و Express وحتى React 19:',
      security:
        'إليك المشاريع التي طبق فيها صابر أمان انعدام الثقة (Zero-Trust)، وتطهير سجلات التدقيق، وقفل التزامن التفاؤلي:',
      default: 'إليك أبرز المشاريع المميزة لصابر، مرتبة حسب التعقيد الهندسي والجاهزية الإنتاجية:',
      notFound:
        'لم أتمكن من العثور على بيانات مشاريع تطابق هذا الطلب حالياً. يمكنك فتح قسم المشاريع لتصفح جميع الأعمال المتاحة.',
    },
  },

  bn: {
    greeting: (name) =>
      `👋 **আসসালামু আলাইকুম! আমি সাব্বিরের পোর্টফোলিও গাইড।**\n` +
      `আমি আপনাকে ${name}-এর সাম্প্রতিক MERN স্ট্যাক প্রজেক্টসমূহ, সিস্টেম আর্কিটেকচার এবং টেকনিক্যাল দক্ষতাসমূহ ঘুরে দেখাতে পারি।\n\n` +
      `কোন বিষয়টি দিয়ে আপনি শুরু করতে চান?`,
    thanks:
      'আপনাকে সাহায্য করতে পেরে আনন্দিত! যেকোনো প্রজেক্ট, সিস্টেম ডিজাইন, কোড স্যাম্পল বা যোগাযোগের তথ্যের জন্য নির্দ্বিধায় আমাকে জিজ্ঞাসা করতে পারেন।',
    reportBd:
      '🌟 **Report BD (BPS Report)** হলো সাব্বিরের ফ্ল্যাগশিপ MERN স্ট্যাক অ্যাপ্লিকেশন — একটি মাল্টি-টেন্যান্ট প্রাতিষ্ঠানিক রিপোর্টিং ও মেন্টরশিপ প্ল্যাটফর্ম, যা TypeScript, React 19, Express 4 এবং MongoDB Atlas দিয়ে তৈরি।\n\n' +
      '• **আর্কিটেকচার:** npm workspaces দিয়ে গঠিত মোনোরিপো, যা শেয়ার্ড ভ্যালিডেশন স্কিমা প্যাকেজ (`@reportbd/shared`), Express REST API এবং Vite React 19 SPA-কে পৃথক ও সুসংগঠিত রাখে।\n' +
      '• **ডাটা ইন্টিগ্রিটি ও কনকারেন্সি:** অপটিমিস্টিক রিভিশন লকিংয়ের (Optimistic Revision Locking) মাধ্যমে কনকারেন্ট ডেটা ওভাররাইট রোধ (`HTTP 409 Conflict`) এবং পরিবর্তনশীল মাসের জন্য ডিটারমিনিস্টিক ফর্মুলা ইঞ্জিন।\n' +
      '• **জিরো-ট্রাস্ট সিকিউরিটি:** Firebase Admin টোকেন ভ্যালিডেশন, মাল্টি-টেন্যান্ট RBAC (৪টি রোল ও ৭টি টায়ার) এবং সার্ভার-সাইড অডিট লগ স্যানিটাইজেশন।\n' +
      '• **প্রোডাকশন ফিচার:** ত্রিভাষিক i18n সাপোর্ট (বাংলা, ইংরেজি, আরবি RTL) এবং অফিসিয়াল ডুয়েল-স্বাক্ষর সম্বলিত A4 প্রিন্ট লেআউট।',
    eta:
      '🎓 **Exploratory Training Academy (ETA)** হলো সাব্বিরের দ্বিতীয় উল্লেখযোগ্য MERN অ্যাপ্লিকেশন — একটি পূর্ণাঙ্গ ডিজিটাল শিক্ষা ব্যবস্থাপনা প্ল্যাটফর্ম (LMS)।\n\n' +
      '• **রোল-ভিত্তিক ড্যাশবোর্ড:** শিক্ষার্থী, প্রশিক্ষক এবং সিস্টেম অ্যাডমিনিস্ট্রেটরদের জন্য পৃথক ও সুনির্দিষ্ট ইন্টারফেস।\n' +
      '• **কোর্স ম্যানেজমেন্ট:** কারিকুলাম তৈরি, লেকচার ভিডিও, ইন্টারেক্টিভ কুইজ এবং শিক্ষার্থীর অগ্রগতি ট্র্যাকিং।\n' +
      '• **আধুনিক টেক স্ট্যাক:** React 19, জটিল স্টেট ব্যবস্থাপনায় Redux Toolkit, নিখুঁত অ্যানিমেশনে Framer Motion, Express এবং MongoDB।\n' +
      '• **লাইভ ডিপ্লয়মেন্ট:** Vercel-এ লাইভ ডিপ্লয়কৃত, যা মোবাইল ও ডেস্কটপে দ্রুত ও রেসপনসিভ অভিজ্ঞতা প্রদান করে।',
    whyHire:
      '💡 **কেন আপনার ইঞ্জিনিয়ারিং টিমে মোঃ সাব্বির হোসেনকে বিবেচনা করবেন?**\n\n' +
      '১. **প্রোডাকশন-গ্রেড MERN দক্ষতা:** পরিচ্ছন্ন সেপারেশন অফ কনসার্নস, মজবুত Express/Node.js REST API এবং আধুনিক React 19 দিয়ে পূর্ণাঙ্গ ফুল-স্ট্যাক ওয়েব অ্যাপ্লিকেশন আর্কিটেক্ট করেন।\n' +
      '২. **টাইপ সেফটি ও ডাটা কন্ট্রাক্ট:** শেয়ার্ড মোনোরিপো প্যাকেজে TypeScript ও Zod স্কিমা ভ্যালিডেশনের বাস্তব অভিজ্ঞতা (যেমন Report BD-তে বাস্তবায়িত)।\n' +
      '৩. **কনকারেন্সি ও ডিফেন্সিভ সিকিউরিটি:** অপটিমিস্টিক রিভিশন লকিং (`HTTP 409 Conflict`), জিরো-ট্রাস্ট Firebase টোকেন ভ্যালিডেশন এবং অডিট লগ স্যানিটাইজেশনের প্রমাণিত প্রয়োগ।\n' +
      '৪. **আধুনিক UI ও স্টেট ম্যানেজমেন্ট:** Tailwind CSS v4, Redux Toolkit, TanStack Query, Framer Motion এবং এক্সেসিবল ডিজাইনে দক্ষ।\n' +
      '৫. **সমস্যা সমাধানে সুশৃঙ্খল:** ৭টি যাচাইকৃত টেকনিক্যাল সার্টিফিকেশন (যেমন Phitron Complete Web Development, CS ফান্ডামেন্টালস) এবং কঠোর Git কমিট শৃঙ্খলা।',
    architecture:
      '🏛️ **সাব্বিরের সিস্টেম আর্কিটেকচার স্ট্যান্ডার্ডসমূহ:**\n\n' +
      '• **মোনোরিপো সেপারেশন:** প্যাকেজসমূহ শেয়ার্ড ডোমেন লজিক (`@reportbd/shared`), Express REST API এবং ক্লায়েন্ট SPA-তে স্পষ্টভাবে বিন্যস্ত।\n' +
      '• **কন্ট্রাক্ট-ফার্স্ট ভ্যালিডেশন:** ক্লায়েন্ট-সাইড ফর্ম এবং সার্ভার-সাইড এন্ডপয়েন্ট একই Zod স্কিমা দিয়ে ভ্যালিডেট হয়, ফলে লজিকের কোনো অমিল থাকে না।\n' +
      '• **অপটিমিস্টিক কনকারেন্সি কন্ট্রোল:** সংবেদনশীল রেকর্ডে রিভিশন কাউন্টার ব্যবহার করে ডেটা হারানোর বদলে তাৎক্ষণিক `HTTP 409 Conflict` রেসপন্স নিশ্চিত করা হয়েছে।\n' +
      '• **ডিফেন্সিভ সিকিউরিটি ও RBAC:** মাল্টি-টেন্যান্ট রোল টায়ার, জিরো-ট্রাস্ট টোকেন ডিকোডিং এবং ডাটাবেজে প্রবেশের পূর্বে অডিট লগের রিকার্সিভ স্যানিটাইজেশন।\n' +
      '• **পারফরম্যান্স ও এক্সেসিবিলিটি:** মোবাইল-ফার্স্ট রেসপনসিভ লেআউট, ডায়নামিক টাইপোগ্রাফি স্কেলিং (1.0x–1.30x), ত্রিভাষিক LTR/RTL সাপোর্ট এবং পরিচ্ছন্ন A4 প্রিন্ট ফরম্যাটিং।',
    typescript:
      '📘 **TypeScript ও স্কিমা ভ্যালিডেশন:**\n\n' +
      'প্রোডাকশনে এন্ড-টু-এন্ড টাইপ সেফটি বজায় রাখতে সাব্বির TypeScript এবং Zod ব্যবহার করেন:\n' +
      '• **Report BD** প্রজেক্টে ডেটা স্কিমা, গাণিতিক হিসাবের সূত্র এবং ভ্যালিডেশন রুলস একটি শেয়ার্ড প্যাকেজে (`@reportbd/shared`) কেন্দ্রীয়ভাবে সংরক্ষিত।\n' +
      '• Vite React 19 ফ্রন্টএন্ড এবং Node.js/Express API উভয়ই এই চুক্তিগুলো সরাসরি ব্যবহার করে, ফলে রানটাইমে কোনো অমিল হয় না।\n' +
      '• MongoDB Atlas-এ ডেটা যাওয়ার আগেই Zod স্কিমা ভ্যালিডেশন সমস্ত মিউটেটিং এন্ডপয়েন্টকে অবৈধ পেলোড থেকে সুরক্ষিত রাখে।',
    skills:
      '🛠️ **টেকনিক্যাল স্ট্যাক ও দক্ষতাসমূহ:**\n' +
      'সাব্বির আধুনিক ফুল-স্ট্যাক টুলিংসহ MERN স্ট্যাকে দক্ষ:\n' +
      '• **ফ্রন্টএন্ড:** React 19, JavaScript (ES6+), TypeScript, Tailwind CSS v4, Redux Toolkit, TanStack Query, Framer Motion।\n' +
      '• **ব্যাকএন্ড ও ডাটাবেজ:** Node.js, Express.js, MongoDB Atlas, Mongoose, RESTful APIs, Firebase Auth, JWT, Zod Validation।\n' +
      '• **টুলস ও ওয়ার্কফ্লো:** Git, GitHub, Vite, Vercel, Docker basics, Postman, Linux environments।',
    contact:
      '📞 **সাব্বিরের সাথে যোগাযোগ করুন:**\n' +
      'তিনি বর্তমানে জুনিয়র MERN স্ট্যাক ডেভেলপার, ফুল-স্ট্যাক, ব্যাকএন্ড বা ফ্রন্টএন্ড রোল, ইন্টার্নশিপ এবং ফ্রিল্যান্স প্রজেক্টের জন্য উন্মুক্ত।\n' +
      'সরাসরি হোয়াটসঅ্যাপ বা ইমেইলের মাধ্যমে যোগাযোগ করতে পারেন!',
    experience:
      '💼 **কাজের অভিজ্ঞতা ও মাইলফলক:**\n\n' +
      '• **সোলো ফুল-স্ট্যাক ডেভেলপার — Report BD (BPS Report):**\n' +
      'TypeScript, React 19, Express 4 REST API, MongoDB Atlas, Firebase Auth এবং Zod ব্যবহার করে মাল্টি-টেন্যান্ট রিপোর্টিং ও মেন্টরশিপ প্ল্যাটফর্ম তৈরি করেছেন।\n\n' +
      '• **ফুল-স্ট্যাক ডেভেলপার ও মেন্টর — Exploratory Training Academy (ETA):**\n' +
      'স্টুডেন্ট এনরোলমেন্ট, ইন্টারেক্টিভ কুইজ, ভিডিও প্রগ্রেস ট্র্যাকিং এবং Redux Toolkit স্টেট ম্যানেজমেন্ট সহ পূর্ণাঙ্গ LMS তৈরি করেছেন।\n\n' +
      '• **ওপেন-সোর্স ও প্রজেক্ট ওয়ার্ক:**\n' +
      'সুশৃঙ্খল ভার্সন কন্ট্রোল, পারমাণবিক কমিট (Atomic Commits) এবং ধারাবাহিক টেস্টিং সহ সক্রিয় কন্ট্রিবিউটর।',
    currentFocus: '⚡ **সাব্বির বর্তমানে যা সক্রিয়ভাবে তৈরি ও শিখছেন:**',
    education: (latest) =>
      latest
        ? `🎓 **শিক্ষাগত ভিত্তি:**\nবর্তমানে **${latest.institution}**-এ **${latest.degree}** নিয়ে পড়াশোনা করছেন (${latest.period})।\nকম্পিউটার সায়েন্স ফান্ডামেন্টালস, সফটওয়্যার ইঞ্জিনিয়ারিং এবং আধুনিক ওয়েব সিস্টেমের ওপর অধ্যয়নরত।`
        : 'শিক্ষা সংক্রান্ত বিস্তারিত তথ্য শিক্ষা সেকশনে রয়েছে।',
    certifications: (count) =>
      `🏆 **যাচাইকৃত সার্টিফিকেশন ও ক্রেডেনশিয়াল:**\nসাব্বিরের ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট, কম্পিউটার সায়েন্স ফান্ডামেন্টালস এবং প্রোগ্রামিং দক্ষতার ওপর **${count}টি যাচাইকৃত সার্টিফিকেট** রয়েছে (যার মধ্যে Phitron Complete Web Development অন্তর্ভুক্ত)।`,
    resume:
      '📄 **সিভি ও ক্রেডেনশিয়াল:**\nনিচের লিংকগুলো থেকে সরাসরি সাব্বিরের সর্বশেষ সফটওয়্যার ইঞ্জিনিয়ারিং সিভি দেখতে পারেন:',
    llmsTxt:
      '🤖 **মেশিন-রিডেবল এআই প্রোফাইল (/llms.txt):**\n\n' +
      'মেশিন-রিডেবল স্ট্যান্ডার্ড অনুযায়ী সাব্বির তার পোর্টফোলিওর রুটে একটি অফিসিয়াল `/llms.txt` ফাইল যুক্ত করেছেন।\n' +
      'এতে এআই মডেল, কোডিং অ্যাসিস্ট্যান্ট এবং ওয়েব ক্রলারদের জন্য তার টেকনিক্যাল ব্যাকগ্রাউন্ড, প্রজেক্ট আর্কিটেকচার, টেক স্ট্যাক ও কন্টাক্ট লিংকের স্ট্রাকচার্ড সামারি রয়েছে।',
    github:
      '📈 **গিটহাব অ্যাক্টিভিটি ও কোডবেস প্রমাণ:**\n' +
      'সাব্বির সুশৃঙ্খল পারমাণবিক কমিট (Atomic Commits), সুস্পষ্ট ডকুমেন্টেশন এবং ওপেন-সোর্স মোনোরিপো নিয়ে নিয়মিত গিটহাবে সক্রিয়।\n' +
      'গিটহাব পরিসংখ্যান ড্যাশবোর্ড দেখুন অথবা সরাসরি তার প্রোফাইল ভিজিট করুন:',
    guide:
      '📖 **ইন্টারেক্টিভ পোর্টফোলিও গাইড:**\n\n' +
      'রিক্রুটার, ইঞ্জিনিয়ারিং লিড এবং ভিজিটরদের সুবিধার্থে সাব্বির /guide পেজে একটি বিস্তারিত **পোর্টফোলিও গাইড** তৈরি করেছেন।\n\n' +
      'এতে রয়েছে পূর্ণাঙ্গ ওয়াকথ্রু:\n' +
      '• ০১. স্বাগতম ও ইঞ্জিনিয়ারিং দর্শন\n' +
      '• ০২. কুইক স্টার্ট পাথ (রিক্রুটার, আর্কিটেক্ট, ক্রেডেনশিয়াল)\n' +
      '• ০৩. কমপ্লিট রুট ও কিবোর্ড নেভিগেশন\n' +
      '• ০৪. ফ্ল্যাগশিপ প্রজেক্ট ও আর্কিটেকচার (Report BD ও ETA)\n' +
      '• ০৫. প্রযুক্তি বিশ্লেষণ (React 19, Zod, MongoDB, TypeScript)\n' +
      '• ০৬. যাচাইকৃত সনদ ও কাজের অভিজ্ঞতা\n' +
      '• ০৭. ইন্টারেক্টিভ টুলস এবং ডার্ক/লাইট থিম\n' +
      '• ০৮. সরাসরি হোয়াটসঅ্যাপ ও যোগাযোগের মাধ্যম\n' +
      '• ০৯. সাধারণ প্রশ্নোত্তর (FAQ)\n' +
      '• ১০. এক্সেসিবিলিটি ও ট্রাবলশুটিং',
    availability: (text) =>
      `💼 **কাজের জন্য প্রস্তুতি:**\n${text}\nফুল-টাইম, রিমোট, ইন্টার্নশিপ বা ফ্রিল্যান্স কাজের সুযোগে যুক্ত হওয়ার জন্য অবিলম্বে প্রস্তুত।`,
    unknown:
      'আমি আপনাকে সাব্বিরের MERN প্রজেক্টসমূহ (যেমন Report BD ও ETA), টেকনিক্যাল দক্ষতা, সিস্টেম আর্কিটেকচার, সার্টিফিকেশন অথবা যোগাযোগের উপায়গুলো জানাতে পারি। আপনি কী বিষয়ে জানতে চান?',
    errorFallback:
      'এই উত্তরটি প্রস্তুত করতে একটি সাময়িক ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন, অথবা প্রজেক্ট, দক্ষতা ও যোগাযোগের তথ্য দেখতে নিচের কুইক অ্যাকশনগুলো ব্যবহার করুন।',
    contextualBackend: (title, tech, arch) =>
      `⚡ **${title}-এর ব্যাকএন্ড আর্কিটেকচার:**\n**মূল টেক স্ট্যাক:** ${tech}${arch}`,
    headlines: {
      mern: 'এখানে সাব্বিরের ফ্ল্যাগশিপ MERN স্ট্যাক অ্যাপ্লিকেশনসমূহ দেওয়া হলো, যা MongoDB ও Express থেকে শুরু করে React 19 পর্যন্ত সম্পূর্ণ আর্কিটেকচার তুলে ধরে:',
      security:
        'এখানে এমন কিছু প্রজেক্ট রয়েছে যেখানে সাব্বির জিরো-ট্রাস্ট অথেন্টিকেশন, অডিট লগ স্যানিটাইজেশন এবং অপটিমিস্টিক কনকারেন্সি লকিং প্রয়োগ করেছেন:',
      default:
        'এখানে সাব্বিরের শীর্ষ নির্বাচিত প্রজেক্টসমূহ দেওয়া হলো, যা টেকনিক্যাল জটিলতা ও প্রোডাকশন প্রস্তুতির ভিত্তিতে অগ্রাধিকারপ্রাপ্ত:',
      notFound:
        'এই অনুরোধের সাথে মিল পাওয়া কোনো প্রজেক্ট ডাটা পাওয়া যায়নি। সকল কাজ দেখতে প্রজেক্ট সেকশনটি ওপেন করতে পারেন।',
    },
  },
};

export const AI_ACTION_LABELS = {
  en: {
    caseStudy: 'Case Study',
    liveDemo: 'Live Demo',
    githubCode: 'GitHub Code',
    openProjects: 'Open Projects Section',
    openSkills: 'Open Skills Section',
    openContact: 'Open Contact Form',
    openAbout: 'Open About Section',
    openEducation: 'Open Education Section',
    educationTimeline: 'Education Timeline',
    openCerts: 'Open Certifications Section',
    viewAllCerts: 'View All Certifications',
    openFocus: 'Open Current Focus',
    openGithubStats: 'Open GitHub Stats',
    openGithubProfile: 'Open GitHub Profile',
    openFullGuide: 'Open Full Guide',
    openLlmsTxt: 'Open /llms.txt',
    viewResume: '📄 View Resume',
    downloadResume: '📄 Download Resume',
    resumePdf: 'Open Resume (PDF)',
    resumeDrive: 'Open Resume (Drive)',
    openLinkedIn: 'Open LinkedIn',
    chatWhatsApp: 'Chat on WhatsApp',
    copyEmail: 'Copy Email',
    whyHirePrompt: '💡 Why Hire Sabbir?',
    contactPrompt: '📞 Contact Sabbir',
    reportBdPrompt: '🌟 Report BD (Flagship)',
    topProjectsPrompt: '🚀 Top Projects',
    skillsPrompt: '🛠 Tech Stack',
    exploreReportBd: '🌟 Explore Report BD',
    viewReportBd: '🌟 View Report BD',
    reportBdDeepDive: '🌟 Report BD Deep Dive',
    seeSkillsReportBd: '🌟 See Skills in Report BD',
    viewLatestProject: '🌟 View Latest Project',
  },
  ar: {
    caseStudy: 'دراسة الحالة',
    liveDemo: 'معاينة حية',
    githubCode: 'كود GitHub',
    openProjects: 'فتح قسم المشاريع',
    openSkills: 'فتح قسم المهارات',
    openContact: 'فتح نموذج التواصل',
    openAbout: 'فتح قسم من أنا',
    openEducation: 'فتح قسم التعليم',
    educationTimeline: 'الخط الزمني للتعليم',
    openCerts: 'فتح قسم الشهادات',
    viewAllCerts: 'عرض جميع الشهادات',
    openFocus: 'فتح التركيز الحالي',
    openGithubStats: 'إحصائيات GitHub',
    openGithubProfile: 'ملف GitHub',
    openFullGuide: 'دليل البورتفوليو الكامل',
    openLlmsTxt: 'فتح /llms.txt',
    viewResume: '📄 عرض السيرة الذاتية',
    downloadResume: '📄 تحميل السيرة الذاتية',
    resumePdf: 'السيرة الذاتية (PDF)',
    resumeDrive: 'السيرة الذاتية (Drive)',
    openLinkedIn: 'فتح LinkedIn',
    chatWhatsApp: 'محادثة عبر WhatsApp',
    copyEmail: 'نسخ البريد الإلكتروني',
    whyHirePrompt: '💡 لماذا نوظف صابر؟',
    contactPrompt: '📞 تواصل مع صابر',
    reportBdPrompt: '🌟 Report BD (المشروع الرئيسي)',
    topProjectsPrompt: '🚀 أبرز المشاريع',
    skillsPrompt: '🛠 حزمة التقنيات',
    exploreReportBd: '🌟 استكشف Report BD',
    viewReportBd: '🌟 عرض Report BD',
    reportBdDeepDive: '🌟 تفاصيل Report BD',
    seeSkillsReportBd: '🌟 مهارات Report BD',
    viewLatestProject: '🌟 عرض أحدث مشروع',
  },
  bn: {
    caseStudy: 'কেস স্টাডি',
    liveDemo: 'লাইভ ডেমো',
    githubCode: 'গিটহাব কোড',
    openProjects: 'প্রজেক্ট সেকশন',
    openSkills: 'দক্ষতা সেকশন',
    openContact: 'যোগাযোগ ফরম',
    openAbout: 'পরিচিতি সেকশন',
    openEducation: 'শিক্ষা সেকশন',
    educationTimeline: 'শিক্ষাগত টাইমলাইন',
    openCerts: 'সার্টিফিকেশন সেকশন',
    viewAllCerts: 'সকল সার্টিফিকেশন',
    openFocus: 'বর্তমান ফোকাস',
    openGithubStats: 'গিটহাব পরিসংখ্যান',
    openGithubProfile: 'গিটহাব প্রোফাইল',
    openFullGuide: 'সম্পূর্ণ পোর্টফোলিও গাইড',
    openLlmsTxt: 'ওপেন /llms.txt',
    viewResume: '📄 সিভি দেখুন',
    downloadResume: '📄 সিভি ডাউনলোড',
    resumePdf: 'সিভি (PDF)',
    resumeDrive: 'সিভি (Drive)',
    openLinkedIn: 'লিঙ্কডইন',
    chatWhatsApp: 'হোয়াটসঅ্যাপে চ্যাট',
    copyEmail: 'ইমেইল কপি করুন',
    whyHirePrompt: '💡 কেন সাব্বিরকে নিয়োগ করবেন?',
    contactPrompt: '📞 সাব্বিরের সাথে যোগাযোগ',
    reportBdPrompt: '🌟 Report BD (ফ্ল্যাগশিপ)',
    topProjectsPrompt: '🚀 শীর্ষ প্রজেক্টসমূহ',
    skillsPrompt: '🛠 টেক স্ট্যাক',
    exploreReportBd: '🌟 Report BD এক্সপ্লোর করুন',
    viewReportBd: '🌟 Report BD দেখুন',
    reportBdDeepDive: '🌟 Report BD বিশ্লেষণ',
    seeSkillsReportBd: '🌟 Report BD-তে ব্যবহৃত দক্ষতা',
    viewLatestProject: '🌟 সর্বশেষ প্রজেক্ট দেখুন',
  },
};

export const AI_FOLLOW_UPS = {
  en: {
    projects: [
      'Tell me about Report BD',
      'Tell me about ETA (LMS)',
      'What architecture do you use?',
      'Show GitHub code',
    ],
    skills: ['Show MERN stack projects', 'Do you use TypeScript and Zod?', 'Why hire Sabbir?'],
    default: [
      'Tell me about Report BD',
      'Why should we hire Sabbir?',
      'Show MERN skills',
      'How can I contact Sabbir on WhatsApp?',
    ],
    reportBd: [
      'What backend tech is used in Report BD?',
      'Tell me about ETA (LMS)',
      'Why should we hire Sabbir?',
      'How can I contact Sabbir on WhatsApp?',
    ],
    eta: [
      'Tell me about Report BD',
      'Show MERN stack skills',
      'Why should we hire Sabbir?',
      'How can I contact Sabbir?',
    ],
    whyHire: [
      'Tell me about Report BD',
      'What architecture do you use?',
      'How can I contact Sabbir on WhatsApp?',
      'Show certifications',
    ],
    architecture: [
      'Tell me about Report BD',
      'Do you use TypeScript and Zod?',
      'Why should we hire Sabbir?',
    ],
    typescript: ['What architecture do you use?', 'Tell me about ETA (LMS)', 'Why hire Sabbir?'],
    experience: [
      'Tell me about Report BD',
      'Why should we hire Sabbir?',
      'How can I contact Sabbir on WhatsApp?',
    ],
    currentFocus: ['Show projects', 'Show skills', 'How can I contact Sabbir?'],
    education: ['Show certifications', 'Show current focus', 'Contact Sabbir'],
    certifications: ['Show skills', 'Tell me about Report BD', 'How to contact Sabbir'],
    resume: ['Why should we hire Sabbir?', 'Show best projects', 'Contact Sabbir'],
    llmsTxt: ['Tell me about Report BD', 'Show skills', 'How can I contact Sabbir?'],
    github: ['Tell me about Report BD', 'Which stack is strongest?', 'How can I contact Sabbir?'],
    guide: [
      'Tell me about Report BD',
      'Why should we hire Sabbir?',
      'How can I contact Sabbir on WhatsApp?',
    ],
    backend: ['Tell me about ETA (LMS)', 'What about security?', 'How can I contact Sabbir?'],
    availability: [
      'How can I contact Sabbir on WhatsApp?',
      'Why should we hire Sabbir?',
      'Show best projects',
    ],
  },
  ar: {
    projects: [
      'أخبرني عن Report BD',
      'أخبرني عن ETA (LMS)',
      'ما هي البنية الهندسية المستخدمة؟',
      'عرض كود GitHub',
    ],
    skills: ['عرض مشاريع MERN Stack', 'هل تستخدم TypeScript و Zod؟', 'لماذا نوظف صابر؟'],
    default: [
      'أخبرني عن Report BD',
      'لماذا نوظف صابر؟',
      'عرض مهارات MERN',
      'كيف أتواصل مع صابر عبر WhatsApp؟',
    ],
    reportBd: [
      'ما هي تقنيات الواجهة الخلفية في Report BD؟',
      'أخبرني عن ETA (LMS)',
      'لماذا نوظف صابر؟',
      'كيف أتواصل مع صابر عبر WhatsApp؟',
    ],
    eta: [
      'أخبرني عن Report BD',
      'عرض مهارات MERN Stack',
      'لماذا نوظف صابر؟',
      'كيف أتواصل مع صابر؟',
    ],
    whyHire: [
      'أخبرني عن Report BD',
      'ما هي البنية الهندسية المستخدمة؟',
      'كيف أتواصل مع صابر عبر WhatsApp؟',
      'عرض الشهادات المعتمدة',
    ],
    architecture: ['أخبرني عن Report BD', 'هل تستخدم TypeScript و Zod؟', 'لماذا نوظف صابر؟'],
    typescript: ['ما هي البنية الهندسية المستخدمة؟', 'أخبرني عن ETA (LMS)', 'لماذا نوظف صابر؟'],
    experience: ['أخبرني عن Report BD', 'لماذا نوظف صابر؟', 'كيف أتواصل مع صابر عبر WhatsApp؟'],
    currentFocus: ['عرض المشاريع', 'عرض المهارات', 'كيف أتواصل مع صابر؟'],
    education: ['عرض الشهادات', 'عرض التركيز الحالي', 'تواصل مع صابر'],
    certifications: ['عرض المهارات', 'أخبرني عن Report BD', 'كيفية التواصل مع صابر'],
    resume: ['لماذا نوظف صابر؟', 'عرض أفضل المشاريع', 'تواصل مع صابر'],
    llmsTxt: ['أخبرني عن Report BD', 'عرض المهارات', 'كيف أتواصل مع صابر؟'],
    github: ['أخبرني عن Report BD', 'ما هي أقوى تقنياتك؟', 'كيف أتواصل مع صابر؟'],
    guide: ['أخبرني عن Report BD', 'لماذا نوظف صابر؟', 'كيف أتواصل مع صابر عبر WhatsApp؟'],
    backend: ['أخبرني عن ETA (LMS)', 'ماذا عن الأمان والحماية؟', 'كيف أتواصل مع صابر؟'],
    availability: ['كيف أتواصل مع صابر عبر WhatsApp؟', 'لماذا نوظف صابر؟', 'عرض أفضل المشاريع'],
  },
  bn: {
    projects: [
      'Report BD সম্পর্কে বলুন',
      'ETA (LMS) সম্পর্কে বলুন',
      'কী ধরনের আর্কিটেকচার ব্যবহার করা হয়েছে?',
      'গিটহাব কোড দেখুন',
    ],
    skills: [
      'MERN স্ট্যাক প্রজেক্ট দেখুন',
      'TypeScript ও Zod কি ব্যবহার করেন?',
      'কেন সাব্বিরকে নিয়োগ করবেন?',
    ],
    default: [
      'Report BD সম্পর্কে বলুন',
      'কেন সাব্বিরকে নিয়োগ করবেন?',
      'MERN স্ট্যাক দক্ষতা দেখুন',
      'কীভাবে হোয়াটসঅ্যাপে যোগাযোগ করবেন?',
    ],
    reportBd: [
      'Report BD-র ব্যাকএন্ড প্রযুক্তি কী?',
      'ETA (LMS) সম্পর্কে বলুন',
      'কেন সাব্বিরকে নিয়োগ করবেন?',
      'কীভাবে হোয়াটসঅ্যাপে যোগাযোগ করবেন?',
    ],
    eta: [
      'Report BD সম্পর্কে বলুন',
      'MERN স্ট্যাক দক্ষতা দেখুন',
      'কেন সাব্বিরকে নিয়োগ করবেন?',
      'কীভাবে সাব্বিরের সাথে যোগাযোগ করব?',
    ],
    whyHire: [
      'Report BD সম্পর্কে বলুন',
      'কী ধরনের আর্কিটেকচার ব্যবহার করেন?',
      'কীভাবে হোয়াটসঅ্যাপে যোগাযোগ করবেন?',
      'সার্টিফিকেশন দেখুন',
    ],
    architecture: [
      'Report BD সম্পর্কে বলুন',
      'TypeScript ও Zod কি ব্যবহার করেন?',
      'কেন সাব্বিরকে নিয়োগ করবেন?',
    ],
    typescript: [
      'কী ধরনের আর্কিটেকচার ব্যবহার করেন?',
      'ETA (LMS) সম্পর্কে বলুন',
      'কেন সাব্বিরকে নিয়োগ করবেন?',
    ],
    experience: [
      'Report BD সম্পর্কে বলুন',
      'কেন সাব্বিরকে নিয়োগ করবেন?',
      'কীভাবে হোয়াটসঅ্যাপে যোগাযোগ করবেন?',
    ],
    currentFocus: ['প্রজেক্ট দেখুন', 'দক্ষতা দেখুন', 'কীভাবে যোগাযোগ করবেন?'],
    education: ['সার্টিফিকেশন দেখুন', 'বর্তমান ফোকাস দেখুন', 'সাব্বিরের সাথে যোগাযোগ'],
    certifications: ['দক্ষতা দেখুন', 'Report BD সম্পর্কে বলুন', 'কীভাবে যোগাযোগ করবেন'],
    resume: ['কেন সাব্বিরকে নিয়োগ করবেন?', 'সেরা প্রজেক্টসমূহ দেখুন', 'সাব্বিরের সাথে যোগাযোগ'],
    llmsTxt: ['Report BD সম্পর্কে বলুন', 'দক্ষতা দেখুন', 'কীভাবে যোগাযোগ করবেন?'],
    github: ['Report BD সম্পর্কে বলুন', 'কোন স্ট্যাকে সবচেয়ে দক্ষ?', 'কীভাবে যোগাযোগ করবেন?'],
    guide: [
      'Report BD সম্পর্কে বলুন',
      'কেন সাব্বিরকে নিয়োগ করবেন?',
      'কীভাবে হোয়াটসঅ্যাপে যোগাযোগ করবেন?',
    ],
    backend: ['ETA (LMS) সম্পর্কে বলুন', 'নিরাপত্তা ব্যবস্থা কেমন?', 'কীভাবে যোগাযোগ করবেন?'],
    availability: [
      'কীভাবে হোয়াটসঅ্যাপে যোগাযোগ করবেন?',
      'কেন সাব্বিরকে নিয়োগ করবেন?',
      'সেরা প্রজেক্টসমূহ দেখুন',
    ],
  },
};

export function getSafeLanguage(lang) {
  if (lang === 'ar' || lang === 'bn' || lang === 'en') {
    return lang;
  }
  return 'en';
}

export function getTemplate(lang) {
  const safeLang = getSafeLanguage(lang);
  return AI_RESPONSE_TEMPLATES[safeLang] || AI_RESPONSE_TEMPLATES.en;
}

export function getActionLabels(lang) {
  const safeLang = getSafeLanguage(lang);
  return AI_ACTION_LABELS[safeLang] || AI_ACTION_LABELS.en;
}

export function getFollowUps(category, lang) {
  const safeLang = getSafeLanguage(lang);
  const langFollowUps = AI_FOLLOW_UPS[safeLang] || AI_FOLLOW_UPS.en;
  return langFollowUps[category] || langFollowUps.default || AI_FOLLOW_UPS.en.default;
}

export function getCardBadge(isFlagship, isFeatured, fallbackCategory, lang) {
  const safeLang = getSafeLanguage(lang);
  if (safeLang === 'ar') {
    return isFlagship ? '🌟 تطبيق MERN الرئيسي' : isFeatured ? '🚀 مميز' : fallbackCategory;
  }
  if (safeLang === 'bn') {
    return isFlagship ? '🌟 ফ্ল্যাগশিপ MERN' : isFeatured ? '🚀 সেরা নির্বাচিত' : fallbackCategory;
  }
  return isFlagship ? '🌟 Flagship MERN' : isFeatured ? '🚀 Top Featured' : fallbackCategory;
}
