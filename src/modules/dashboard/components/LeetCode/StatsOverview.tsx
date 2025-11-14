import React from 'react';
import { LeetCodeUserStats } from '@/services/leetcode';

interface StatsOverviewProps {
  stats: LeetCodeUserStats;
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  const solvedPercentage = Math.round(
    (stats.totalSolved / stats.totalQuestions) * 100
  );

  const getDifficultyPercentage = (solved: number, total: number) => {
    return total > 0 ? Math.round((solved / total) * 100) : 0;
  };

  const difficultyStats = [
    {
      label: 'Easy',
      solved: stats.easySolved,
      total: stats.totalEasy,
      color: 'bg-green-500',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      label: 'Medium',
      solved: stats.mediumSolved,
      total: stats.totalMedium,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      label: 'Hard',
      solved: stats.hardSolved,
      total: stats.totalHard,
      color: 'bg-red-500',
      textColor: 'text-red-600 dark:text-red-400',
    },
  ];

  return (
    <div className='space-y-6'>
      {/* Total Solved */}
      <div className='text-center'>
        <div className='text-5xl font-bold text-neutral-800 dark:text-neutral-200'>
          {stats.totalSolved}
        </div>
        <div className='text-sm text-neutral-600 dark:text-neutral-400 mt-1'>
          Solved Problems
        </div>
        <div className='text-xs text-neutral-500 dark:text-neutral-500 mt-1'>
          {solvedPercentage}% of {stats.totalQuestions} total
        </div>
      </div>

      {/* Progress Bar */}
      <div className='w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 overflow-hidden'>
        <div
          className='h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all duration-500'
          style={{ width: `${solvedPercentage}%` }}
        />
      </div>

      {/* Difficulty Stats */}
      <div className='grid grid-cols-3 gap-4'>
        {difficultyStats.map((stat) => {
          const percentage = getDifficultyPercentage(stat.solved, stat.total);
          return (
            <div key={stat.label} className='space-y-2'>
              <div className='flex items-center justify-between text-xs'>
                <span className={`font-medium ${stat.textColor}`}>
                  {stat.label}
                </span>
                <span className='text-neutral-600 dark:text-neutral-400'>
                  {percentage}%
                </span>
              </div>
              <div className='w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5 overflow-hidden'>
                <div
                  className={`h-full ${stat.color} transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className='text-xs text-neutral-600 dark:text-neutral-400 text-center'>
                {stat.solved} / {stat.total}
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Stats */}
      <div className='grid grid-cols-2 gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-700'>
        <div className='text-center'>
          <div className='text-2xl font-bold text-neutral-800 dark:text-neutral-200'>
            {stats.ranking > 0 ? stats.ranking.toLocaleString() : 'N/A'}
          </div>
          <div className='text-xs text-neutral-600 dark:text-neutral-400 mt-1'>
            Ranking
          </div>
        </div>
        <div className='text-center'>
          <div className='text-2xl font-bold text-neutral-800 dark:text-neutral-200'>
            {stats.reputation.toLocaleString()}
          </div>
          <div className='text-xs text-neutral-600 dark:text-neutral-400 mt-1'>
            Reputation
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
