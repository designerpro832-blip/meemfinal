import React from 'react';
import { Result } from '../../types';

interface PosterProps {
  program: { event: string; category: string };
  winners: Result[];
}

const Poster2: React.FC<PosterProps> = ({ program, winners }) => {
  const sortedWinners = [...winners].sort((a, b) => a.position - b.position);

  function ordinal(num: number) {
    if (num === 1) return "1st";
    if (num === 2) return "2nd";
    if (num === 3) return "3rd";
    return `${num}th`;
  }

  const numberColors = ["text-brand-coral", "text-brand-mid-blue", "text-brand-dark-teal"];

  return (
    <div className="w-full h-full bg-ui-surface p-8 font-sans relative overflow-hidden flex flex-col justify-between">
      {/* Top header */}
      <div>
        <div className="flex items-start justify-between">
          <span className="text-lg font-bold text-brand-mid-blue">@muhimmath</span>
          <div className="text-right">
            <h2 className="text-4xl font-black tracking-tight text-brand-dark-blue">{program.event}</h2>
            <p className="text-md font-semibold uppercase tracking-wider text-brand-mid-blue">{program.category}</p>
          </div>
        </div>
      </div>

      {/* Winners List */}
      <div className="flex-grow flex items-center">
        <div className="flex flex-col gap-4 w-full">
          {sortedWinners.map((w, idx) => (
            <div key={w.id} className="flex items-center gap-4">
              <span className={`font-bold text-2xl ${numberColors[idx % numberColors.length]} w-12 text-center`}>{ordinal(w.position)}</span>
              <div>
                <span className="font-extrabold text-xl uppercase tracking-tight text-brand-dark-blue">{w.participant}</span>
                <div className="text-sm font-semibold uppercase tracking-wider text-brand-mid-blue">{w.school}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center w-full border-t pt-4">
        <div className="text-2xl font-black text-brand-dark-blue leading-tight tracking-tight">MEEM FEST</div>
        <div className="text-sm text-brand-mid-blue font-semibold mt-0.5">
          SSF DAAWA SECTOR
        </div>
      </div>
    </div>
  );
};

export default Poster2;
