import React from 'react';

interface SubmissionCalendarProps {
  submissionCalendar: string;
}

const SubmissionCalendar: React.FC<SubmissionCalendarProps> = ({
  submissionCalendar,
}) => {
  const parseCalendarData = () => {
    try {
      const data = JSON.parse(submissionCalendar);
      return Object.entries(data).map(([timestamp, count]) => ({
        date: new Date(parseInt(timestamp) * 1000),
        count: count as number,
      }));
    } catch {
      return [];
    }
  };

  const submissions = parseCalendarData();

  // Get last 365 days
  const today = new Date();
  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  // Create a map for quick lookup
  const submissionMap = new Map(
    submissions.map((s) => [s.date.toDateString(), s.count])
  );

  // Generate all days for the last year
  const days: { date: Date; count: number }[] = [];
  for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
    const currentDate = new Date(d);
    const count = submissionMap.get(currentDate.toDateString()) || 0;
    days.push({ date: new Date(currentDate), count });
  }

  const getColorClass = (count: number) => {
    if (count === 0) return 'bg-neutral-100 dark:bg-neutral-800';
    if (count < 3) return 'bg-green-200 dark:bg-green-900';
    if (count < 6) return 'bg-green-400 dark:bg-green-700';
    if (count < 10) return 'bg-green-600 dark:bg-green-500';
    return 'bg-green-700 dark:bg-green-400';
  };

  // Group by weeks
  const weeks: { date: Date; count: number }[][] = [];
  let currentWeek: { date: Date; count: number }[] = [];

  days.forEach((day, index) => {
    currentWeek.push(day);
    if (day.date.getDay() === 6 || index === days.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  const maxCount = Math.max(...submissions.map((s) => s.count), 0);
  const totalSubmissions = submissions.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className='space-y-4'>
      {/* Stats */}
      <div className='flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400'>
        <span>
          <span className='font-semibold text-neutral-800 dark:text-neutral-200'>
            {totalSubmissions}
          </span>{' '}
          submissions in the last year
        </span>
        <span className='text-xs'>
          Max streak: <span className='font-semibold'>{maxCount}</span> in a day
        </span>
      </div>

      {/* Calendar Grid */}
      <div className='overflow-x-auto'>
        <div className='inline-flex gap-1'>
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className='flex flex-col gap-1'>
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`w-2.5 h-2.5 rounded-sm ${getColorClass(
                    day.count
                  )} hover:ring-2 hover:ring-neutral-400 dark:hover:ring-neutral-500 transition-all cursor-pointer`}
                  title={`${day.date.toDateString()}: ${day.count} submissions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className='flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400'>
        <span>Less</span>
        <div className='flex gap-1'>
          <div className='w-2.5 h-2.5 rounded-sm bg-neutral-100 dark:bg-neutral-800' />
          <div className='w-2.5 h-2.5 rounded-sm bg-green-200 dark:bg-green-900' />
          <div className='w-2.5 h-2.5 rounded-sm bg-green-400 dark:bg-green-700' />
          <div className='w-2.5 h-2.5 rounded-sm bg-green-600 dark:bg-green-500' />
          <div className='w-2.5 h-2.5 rounded-sm bg-green-700 dark:bg-green-400' />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};

export default SubmissionCalendar;
