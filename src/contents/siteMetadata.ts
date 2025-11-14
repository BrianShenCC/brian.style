export const siteMetadata = {
  siteUrl: 'https://webjam.cn',
  siteRepo: 'https://github.com/wencaizhang/wencaizhang.github.io/tree/nextjs',
  siteLogo: '/images/logo.jpg',
  siteShortTitle: 'WebJAM',
  siteTitle: "前端果酱开发历险记- Wencai's coding journey",
  siteScreenshot: '',
  siteDescription:
    '经验丰富的软件工程师，尤其是前端方面的软件工程师，热衷于创建像素完美的网络体验。我使用 JavaScript 并专注于万事万物网络。我热衷于与团队合作，交付高效、可扩展且具有视觉吸引力的 Web 应用程序。',
  author: 'WebJAM',
  fullName: 'WebJAM',
  location: '[::1]:443 - China',
  timeZone: 'Asia/Shanghai',
  locationIcon: '🇨🇳',
  // locationIcon: 'flag-china',
  position: 'Full Stack Web Developer',
  company: '',
  companySite: '',
  locale: 'en-US',
  image: '/images/logo.jpg',
  socialBanner: '/images/logo.jpg',
  profileCover: 'https://static.webjam.cn/images/bg/wew.png',
  analytics: {
    // plausibleDataDomain: '',
    // simpleAnalytics: false, // true | false
    analyticsURL: '',
    umamiScriptSrc: '',
    umamiSiteId: '',
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
  enable: false,
  provider: 'giscus',
  // https://giscus.app/
  giscusConfig: {
    gitUsername: '',
    repo: '', // process.env.GISCUS_REPO
    repositoryId: '', // process.env.GISCUS_REPOSITORY_ID
    category: '', // process.env.GISCUS_CATEGORY
    categoryId: '', // process.env.GISCUS_CATEGORY_ID
    mapping: 'title',
    reactions: true,
    metadata: '0',
    lightTheme: 'light',
    darkTheme: 'transparent_dark',
    themeURL: '',
    lang: 'zh-CN',
  },
};

export const socialAccounts = {
  x: '',
  instagram: '',
  email: 'zwcxyz@gmail.com',
  github: 'https://github.com/wencaizhang',
  twitter: '',
  facebook: '',
  youtube: '',
  linkedin: '',
};

export const author = {
  name: 'wencaizhang',
  location: '[::1]:443 - China',
  timeZone: 'Asia/Shanghai',
  locationIcon: '🇨🇳',
  position: 'Full Stack Web Developer',
  calMeetingUrl: '',
  status: 'Working remotely around the world',
  workingOn: `I assist brands, companies, institutions, and startups in creating
  exceptional digital experiences for their businesses through strategic
  development services.`,
  workTogether: `I'm open for freelance projects, feel free to email me to see how can we collaborate.`,
  wakatime: 'https://wakatime.com/@wencaizhang',
  github_accounts: [
    {
      username: 'wencaizhang',
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
  topBanner: true,
  dashboard_leetcode: true,
};
