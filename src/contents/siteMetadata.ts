export const siteMetadata = {
  siteUrl: 'https://brian.style',
  siteRepo: 'https://github.com/BrianShenCC/brian.style',
  siteLogo: '/images/logo.png',
  siteShortTitle: 'Brian',
  siteTitle: "Brian's coding journey",
  siteScreenshot: '',
  siteDescription:
    'Self-motivated and creative developer. With more than 10 years of work experience in the tech industry, I strive to create responsive and user-friendly websites and web applications. Front-end addicted, Fullstack capable, with a strong emphasis on Typescript.',
  author: 'Brian Shen',
  fullName: 'Haoxiang Shen',
  location: 'Canada',
  timeZone: 'Canada/Eastern',
  locationIcon: '🇨🇦',
  // locationIcon: 'flag-china',
  position: 'Full Stack Web Developer',
  company: '',
  companySite: '',
  locale: 'en-US',
  image: '/images/logo.png',
  socialBanner: '/images/logo.png',
  profileCover: 'https://static.webjam.cn/images/bg/wew.png',
  analytics: {
    // plausibleDataDomain: '',
    // simpleAnalytics: false, // true | false
    analyticsURL: 'https://cloud.umami.is/share/yq5D6feouPx6l8Gw/brian.style',
    umamiScriptSrc: 'https://cloud.umami.is/script.js',
    umamiSiteId: '3da496e8-01be-45d2-96cd-8cbd692dd2ff',
    // googleAnalyticsId: '', // e.g. UA-000000-2 or G-XXXXXXX
  },

  postPageSize: 9,
  leetcodeUserName: 'brianshencc',
};

/**
 * Select a provider and use the environment variables associated to it
 * https://vercel.com/docs/environment-variables
 * --
 *
 * Visit each provider's documentation link and follow the instructions, then add the environment variable to your project.
 */
export const commentConfig = {
  enable: true,
  provider: 'giscus',
  // https://giscus.app/
  giscusConfig: {
    gitUsername: 'BrianShenCC',
    repo: 'brian.style', // process.env.GISCUS_REPO
    repositoryId: 'R_kgDOLMlj6g', // process.env.GISCUS_REPOSITORY_ID
    category: 'Announcements', // process.env.GISCUS_CATEGORY
    categoryId: 'DIC_kwDOLMlj6s4CdnEb', // process.env.GISCUS_CATEGORY_ID
    mapping: 'title',
    reactions: true,
    metadata: '0',
    lightTheme: 'light',
    darkTheme: 'transparent_dark',
    themeURL: '',
    lang: 'en',
  },
};

export const socialAccounts = {
  x: '',
  instagram: '',
  email: 'shenhaoxiang1990@gmail.com',
  github: 'https://github.com/BrianShenCC',
  twitter: '',
  facebook: '',
  youtube: '',
  linkedin: 'https://www.linkedin.com/in/haoxiang-shen-0b0716245/',
};

export const author = {
  name: 'Brian Shen',
  location: 'Toronto',
  timeZone: 'America/Toronto',
  locationIcon: '🇨🇦',
  position: 'Full Stack Web Developer',
  calMeetingUrl: '',
  status: 'Restart in Canada',
  workingOn: `I am learning and practicing the latest AI technology.`,
  workTogether: `I'm open for new opportunities, feel free to email me to see how can we collaborate.`,
  wakatime: 'https://wakatime.com/@BrianShen',
  github_accounts: [
    {
      username: 'BrianShenCC',
      token: process.env.GITHUB_READ_USER_TOKEN_PERSONAL,
      endpoint: '/api/github?type=personal',
      type: 'personal',
      is_active: true,
    },
  ],
};

export const featureSwich = {
  // chatGPT
  ai: false,
  contactForm: true,
  meeting: false,
  guestbook: false,
  spotify: false,
  dashboard_wakatime: false,
  dashboard_github: true,
  topBanner: false,
  dashboard_leetcode: true,
};

export const docSearch = {
  apiKey: 'd291a440fb755a9b202844a68064d4e9', // search only key
  indexName: 'BrianStyle',
  appId: 'A4M5OCLKX8',
};
