export const home = {
  section1: {
    title1: "Unlimited movies, TV shows, and more.",
    title2: "Watch anywhere. Cancel anytime.",
    p: "Ready to watch? Enter your email to create or restart your membership.",
    button: "Get Started >",
  },
  section2: {
    title: "Enjoy on your TV.",
    p: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
  },
  section3: {
    title: "Download your shows to watch offline.",
    p: "Save your favorites easily and always have something to watch.",
    card: {
      title: "Stranger Things",
      p: "Downloading...",
    },
  },
  section4: {
    title: "Watch everywhere.",
    p: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
  },
  section5: {
    title: "Create profiles for kids.",
    p: "Send kids on adventures with their favorite characters in a space made just for them—free with your membership.",
  },
  Section6: {
    title: "Frequently Asked Questions",
    faq: [
      {
        question: "What is Netflix?",
        answer:
          "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.\nYou can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!",
      },
      {
        question: "How much does Netflix cost",
        answer:
          "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from IDR54,000 to IDR186,000 a month. No extra costs, no contracts.",
      },
      {
        question: "Where can I watch?",
        answer:
          "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles. \nYou can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.",
      },
      {
        question: "How do I cancel",
        answer:
          "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.",
      },
      {
        question: "What can I watch on Netflix",
        answer:
          "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.",
      },
      {
        question: "Is Netflix good for kids?",
        answer:
          "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space. \nKids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.",
      },
    ],
  },
};

export const signup = {
  section0: {
    steps: "STEP 1 OF 3",
    title1: "Welcome back! ",
    title2: "Joining Netflix is easy.",
    p1: "Enter your password and you'll be watching in no time.",
    p2: "Email",
    form: {
      type: "password",
      name: "password",
      placeholder: "Enter your password",
    },
    p3: "Forgot your password?",
    button: "Next",
  },
  section1: {
    steps: "STEP 1 OF 3",
    title: "Finish setting up your account",
    p1: "Netflix is personalized for you.",
    p2: "Create a password to watch on any",
    p3: "device at any time.",
    button: "Next",
  },
  section2: {
    steps: "STEP 1 OF 3",
    title: "Create a password to start your membership",
    p1: "Just a few more steps and you're done!",
    p2: " We hate paperwork, too.",
    form: [
      { placeholder: "Email", name: "email", type: "email" },
      { placeholder: "Add a password", name: "password", type: "password" },
    ],
    checkBox: "Please do not email me Netflic special offers.",
    button: "Next",
  },
  section3: {
    steps: "STEP 2 OF 3",
    title: "Choose your plan.",
    checklist: [
      "No commitments, cancel anytime.",
      "Everything on Netflix for one low price.",
      "No ads and no extra fees. Ever.",
    ],
    button: "Next",
  },
  section4: {
    steps: "STEP 2 OF 3",
    title: "Choose the plan that’s right for you",
    checklist: [
      "Watch all you want. Ad-free.",
      "Recommendations just for you.",
      "Change or cancel your plan anytime.",
    ],
    plans: ["Mobile", "Basic", "Standard", "Premium"],
    plansTable: [
      ["Monthly price", "IDR54,000", "IDR120,000", "IDR153,000", "IDR186,000"],
      ["Video quality", "Good", "Good", "Better", "Best"],
      ["Resolution", "480p", "480p", "1080p", "4K+HDR"],
    ],
    p1: "HD (720p), Full HD (1080p), Ultra HD (4K) and HDR availability subject to your internet service and device capabilities. Not all content is available in all resolutions. See our Terms of Use for more details.",
    p2: "Only people who live with you may use your account. Watch on 4 different devices at the same time with Premium, 2 with Standard, and 1 with Basic and Mobile.",
    button: "Next",
  },
  section5: {
    steps: "STEP 3 OF 3",
    title: "Choose how to pay",
    p1: "Your payment is encrypted and you can change how you pay anytime.",
    p2: { 1: "Secure for peace of mind.", 2: "Cancel easily online." },
    payments: [
      {
        text: "Credit or Debit Card",
        images: [
          "/assets/visa.svg",
          "/assets/mastercard.svg",
          "/assets/amex.svg",
        ],
      },
      {
        text: "Digital Wallet",
        images: ["/assets/gopay.svg", "/assets/dana.svg", "/assets/ovo.svg"],
      },
      { text: "Gift Code", images: ["/assets/netflix.svg"] },
    ],
  },
};
