const LEETCODE_API_ENDPOINT = 'https://leetcode.com/graphql';

export interface LeetCodeUserStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
  contributionPoint: number;
  reputation: number;
  submissionCalendar: string;
}

export interface LeetCodeProfile {
  username: string;
  name: string;
  avatar: string;
  ranking: number;
  reputation: number;
  gitHub: string;
  twitter: string;
  linkedIN: string;
  profile: {
    realName: string;
    websites: string[];
    countryName: string;
    skillTags: string[];
    company: string;
    school: string;
    aboutMe: string;
  };
}

export interface LeetCodeRecentSubmission {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
}

const userStatsQuery = `
  query userPublicProfile($username: String!) {
    matchedUser(username: $username) {
      username
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      profile {
        ranking
        reputation
      }
    }
    allQuestionsCount {
      difficulty
      count
    }
  }
`;

const userProfileQuery = `
  query userPublicProfile($username: String!) {
    matchedUser(username: $username) {
      username
      githubUrl
      twitterUrl
      linkedinUrl
      profile {
        realName
        websites
        countryName
        skillTags
        company
        school
        aboutMe
        userAvatar
        reputation
        ranking
      }
    }
  }
`;

const recentSubmissionsQuery = `
  query recentAcSubmissions($username: String!, $limit: Int!) {
    recentAcSubmissionList(username: $username, limit: $limit) {
      title
      titleSlug
      timestamp
      statusDisplay
      lang
    }
  }
`;

const submissionCalendarQuery = `
  query userProfileCalendar($username: String!) {
    matchedUser(username: $username) {
      userCalendar {
        submissionCalendar
      }
    }
  }
`;

async function fetchLeetCodeData(query: string, variables: any) {
  const response = await fetch(LEETCODE_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Referer: 'https://leetcode.com',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`LeetCode API error: ${response.status}`);
  }

  return response.json();
}

export async function getLeetCodeUserStats(
  username: string
): Promise<{ status: number; data: LeetCodeUserStats | { message: string } }> {
  try {
    const [statsData, calendarData] = await Promise.all([
      fetchLeetCodeData(userStatsQuery, { username }),
      fetchLeetCodeData(submissionCalendarQuery, { username }),
    ]);

    if (!statsData.data.matchedUser) {
      return {
        status: 404,
        data: { message: 'User not found' },
      };
    }

    const { matchedUser, allQuestionsCount } = statsData.data;
    const acSubmissionNum = matchedUser.submitStats.acSubmissionNum;

    const getCountByDifficulty = (difficulty: string) => {
      const item = acSubmissionNum.find(
        (ac: any) => ac.difficulty === difficulty
      );
      return item ? item.count : 0;
    };

    const getTotalByDifficulty = (difficulty: string) => {
      const item = allQuestionsCount.find(
        (q: any) => q.difficulty === difficulty
      );
      return item ? item.count : 0;
    };

    const stats: LeetCodeUserStats = {
      totalSolved: getCountByDifficulty('All'),
      totalQuestions: getTotalByDifficulty('All'),
      easySolved: getCountByDifficulty('Easy'),
      totalEasy: getTotalByDifficulty('Easy'),
      mediumSolved: getCountByDifficulty('Medium'),
      totalMedium: getTotalByDifficulty('Medium'),
      hardSolved: getCountByDifficulty('Hard'),
      totalHard: getTotalByDifficulty('Hard'),
      ranking: matchedUser.profile.ranking,
      contributionPoint: 0,
      reputation: matchedUser.profile.reputation,
      submissionCalendar:
        calendarData.data.matchedUser.userCalendar.submissionCalendar || '{}',
    };

    return {
      status: 200,
      data: stats,
    };
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    return {
      status: 500,
      data: { message: 'Failed to fetch LeetCode data' },
    };
  }
}

export async function getLeetCodeProfile(
  username: string
): Promise<{ status: number; data: LeetCodeProfile | { message: string } }> {
  try {
    const result = await fetchLeetCodeData(userProfileQuery, { username });

    if (!result.data.matchedUser) {
      return {
        status: 404,
        data: { message: 'User not found' },
      };
    }

    const user = result.data.matchedUser;

    const profile: LeetCodeProfile = {
      username: user.username,
      name: user.profile.realName,
      avatar: user.profile.userAvatar,
      ranking: user.profile.ranking,
      reputation: user.profile.reputation,
      gitHub: user.githubUrl || '',
      twitter: user.twitterUrl || '',
      linkedIN: user.linkedinUrl || '',
      profile: {
        realName: user.profile.realName,
        websites: user.profile.websites || [],
        countryName: user.profile.countryName || '',
        skillTags: user.profile.skillTags || [],
        company: user.profile.company || '',
        school: user.profile.school || '',
        aboutMe: user.profile.aboutMe || '',
      },
    };

    return {
      status: 200,
      data: profile,
    };
  } catch (error) {
    console.error('Error fetching LeetCode profile:', error);
    return {
      status: 500,
      data: { message: 'Failed to fetch LeetCode profile' },
    };
  }
}

export async function getLeetCodeRecentSubmissions(
  username: string,
  limit: number = 10
): Promise<{
  status: number;
  data: LeetCodeRecentSubmission[] | { message: string };
}> {
  try {
    const result = await fetchLeetCodeData(recentSubmissionsQuery, {
      username,
      limit,
    });

    if (!result.data.recentAcSubmissionList) {
      return {
        status: 404,
        data: { message: 'No submissions found' },
      };
    }

    return {
      status: 200,
      data: result.data.recentAcSubmissionList,
    };
  } catch (error) {
    console.error('Error fetching LeetCode recent submissions:', error);
    return {
      status: 500,
      data: { message: 'Failed to fetch recent submissions' },
    };
  }
}
