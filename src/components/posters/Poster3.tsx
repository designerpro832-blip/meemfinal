import React from 'react';
import { Result } from '../../types';

interface PosterProps {
  program: { event: string; category: string };
  winners: Result[];
}

const Poster3: React.FC<PosterProps> = ({ program, winners }) => {
  const winner1 = winners.find(w => w.position === 1);
  const winner2 = winners.find(w => w.position === 2);
  const winner3 = winners.find(w => w.position === 3);

  return (
    <div className="w-full h-full bg-gradient-to-br from-brand-dark-blue via-brand-mid-blue to-brand-dark-teal text-ui-text-light font-sans flex flex-col p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/az-subtle.png')] opacity-10"></div>
      
      {/* Header - Top aligned */}
      <header className="relative z-10 text-center mb-auto">
        <h2 className="text-3xl font-bold uppercase tracking-widest mb-2">{program.event}</h2>
        <p className="text-ui-text-light/70 font-medium text-lg">{program.category}</p>
      </header>
      
      {/* Main - Center aligned */}
      <main className="relative z-10 flex-1 flex items-center justify-center py-8">
        {winner1 && (
          <div className="text-center max-w-full px-4">
            <p className="text-brand-light-blue text-xl font-semibold mb-2">WINNER</p>
            <h3 className="text-5xl font-black text-white mb-3 leading-tight">{winner1.participant}</h3>
            <p className="text-brand-light-blue text-xl font-semibold">{winner1.school}</p>
          </div>
        )}
      </main>
      
      {/* Footer - Bottom aligned */}
      <footer className="relative z-10 mt-auto">
        <div className="grid grid-cols-2 gap-4">
          {winner2 && (
            <div className="text-center">
              <p className="text-ui-text-light/80 font-semibold mb-1">2nd Place</p>
              <h4 className="text-2xl font-bold leading-tight">{winner2.participant}</h4>
              <p className="text-sm text-ui-text-light/70 mt-1">{winner2.school}</p>
            </div>
          )}
          {winner3 && (
            <div className="text-center">
              <p className="text-ui-text-light/80 font-semibold mb-1">3rd Place</p>
              <h4 className="text-2xl font-bold leading-tight">{winner3.participant}</h4>
              <p className="text-sm text-ui-text-light/70 mt-1">{winner3.school}</p>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Poster3;
