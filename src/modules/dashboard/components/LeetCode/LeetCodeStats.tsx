import React from 'react';
import Link from 'next/link';
import { SiLeetcode } from 'react-icons/si';
import useSWR from 'swr';

import SectionHeading from '@/common/components/elements/SectionHeading';
import SectionSubHeading from '@/common/components/elements/SectionSubHeading';
import { fetcher } from '@/services/fetcher';
import { LeetCodeUserStats } from '@/services/leetcode';

import StatsOverview from './StatsOverview';
import SubmissionCalendar from './SubmissionCalendar';

interface LeetCodeStatsProps {
  username: string;
}

const LeetCodeStats: React.FC<LeetCodeStatsProps> = ({ username }) => {
  const { data, error, isLoading } = useSWR<LeetCodeUserStats>(
    `/api/leetcode?username=${username}`,
    fetcher
  );

  return (
    <section className='flex flex-col gap-y-2'>
      <SectionHeading
        title='LeetCode Stats'
        icon={<SiLeetcode className='mr-1' />}
      />
      <SectionSubHeading>
        <p className='dark:text-neutral-400'>
          My coding practice stats on LeetCode.
        </p>
        <Link
          href={`https://leetcode.com/${username}`}
          target='_blank'
          rel='noopener noreferrer'
          className='text-sm font-code text-neutral-400 dark:text-neutral-600 hover:text-neutral-700 hover:dark:text-neutral-400 transition-colors'
        >
          @{username}
        </Link>
      </SectionSubHeading>

      {isLoading && (
        <div className='flex items-center justify-center py-12'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-800 dark:border-neutral-200'></div>
        </div>
      )}

      {error && (
        <div className='text-center py-12 text-neutral-600 dark:text-neutral-400'>
          Failed to load LeetCode stats
        </div>
      )}

      {!isLoading && !error && !data && (
        <div className='text-center py-12 text-neutral-600 dark:text-neutral-400'>
          No data available
        </div>
      )}

      {data && (
        <div className='space-y-6'>
          {/* Stats Overview Card */}
          <div className='rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm hover:shadow-md transition-shadow'>
            <StatsOverview stats={data} />
          </div>

          {/* Submission Calendar Card */}
          <div className='rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-sm hover:shadow-md transition-shadow'>
            <h3 className='text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4'>
              Submission Activity
            </h3>
            <SubmissionCalendar submissionCalendar={data.submissionCalendar} />
          </div>
        </div>
      )}
    </section>
  );
};

export default LeetCodeStats;
