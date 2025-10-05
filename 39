import React from 'react';
import { Result, PosterStyles } from '../../../types';
import StyledText from '../StyledText';

interface PosterLayoutProps {
  program: { event: string; category: string };
  winners: Result[];
  styles: PosterStyles;
  designWidth: number;
  isForDownload?: boolean;
}

const PosterLayout1: React.FC<PosterLayoutProps> = ({ program, winners, styles, designWidth, isForDownload }) => {
  const winner1 = winners.find(w => w.position === 1);
  const winner2 = winners.find(w => w.position === 2);
  const winner3 = winners.find(w => w.position === 3);

  return (
    <div className="w-full h-full bg-gradient-to-br from-brand-dark-blue via-brand-mid-blue to-brand-dark-teal text-ui-text-light font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://i.pinimg.com/736x/37/1d/da/371dda41d9edbc8c24517726b1717a95.jpg')] opacity-10"></div>
      
      <StyledText style={styles.programName} designWidth={designWidth} isForDownload={isForDownload} className="uppercase tracking-widest">{program.event}</StyledText>
      <StyledText style={styles.category} designWidth={designWidth} isForDownload={isForDownload}>{program.category}</StyledText>

      {winner1 && (
        <>
          <StyledText style={styles.winner1Name} designWidth={designWidth} isForDownload={isForDownload} className="font-black truncate">{winner1.participant}</StyledText>
          <StyledText style={styles.winner1Team} designWidth={designWidth} isForDownload={isForDownload} className="truncate">{winner1.school}</StyledText>
        </>
      )}

      {winner2 && (
        <>
          <StyledText style={styles.winner2Name} designWidth={designWidth} isForDownload={isForDownload} className="truncate">{winner2.participant}</StyledText>
          <StyledText style={styles.winner2Team} designWidth={designWidth} isForDownload={isForDownload} className="truncate">{winner2.school}</StyledText>
        </>
      )}

      {winner3 && (
        <>
          <StyledText style={styles.winner3Name} designWidth={designWidth} isForDownload={isForDownload} className="truncate">{winner3.participant}</StyledText>
          <StyledText style={styles.winner3Team} designWidth={designWidth} isForDownload={isForDownload} className="truncate">{winner3.school}</StyledText>
        </>
      )}
    </div>
  );
};

export default PosterLayout1;
