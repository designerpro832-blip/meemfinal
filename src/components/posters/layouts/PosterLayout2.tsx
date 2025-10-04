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

const PosterLayout2: React.FC<PosterLayoutProps> = ({ program, winners, styles, designWidth, isForDownload }) => {
  const winner1 = winners.find(w => w.position === 1);
  const winner2 = winners.find(w => w.position === 2);
  const winner3 = winners.find(w => w.position === 3);

  return (
    <div className="w-full h-full bg-ui-surface p-8 font-sans relative overflow-hidden flex flex-col">
      <StyledText style={styles.programName} designWidth={designWidth} isForDownload={isForDownload} className="tracking-tight">{program.event}</StyledText>
      <StyledText style={styles.category} designWidth={designWidth} isForDownload={isForDownload} className="uppercase tracking-wider">{program.category}</StyledText>
      
      <div className="relative flex-grow mt-24">
        {winner1 && (
            <>
                <StyledText style={styles.winner1Name} designWidth={designWidth} isForDownload={isForDownload} className="uppercase tracking-tight">{winner1.participant}</StyledText>
                <StyledText style={styles.winner1Team} designWidth={designWidth} isForDownload={isForDownload} className="uppercase tracking-wider">{winner1.school}</StyledText>
            </>
        )}
        {winner2 && (
            <>
                <StyledText style={styles.winner2Name} designWidth={designWidth} isForDownload={isForDownload} className="uppercase tracking-tight">{winner2.participant}</StyledText>
                <StyledText style={styles.winner2Team} designWidth={designWidth} isForDownload={isForDownload} className="uppercase tracking-wider">{winner2.school}</StyledText>
            </>
        )}
        {winner3 && (
            <>
                <StyledText style={styles.winner3Name} designWidth={designWidth} isForDownload={isForDownload} className="uppercase tracking-tight">{winner3.participant}</StyledText>
                <StyledText style={styles.winner3Team} designWidth={designWidth} isForDownload={isForDownload} className="uppercase tracking-wider">{winner3.school}</StyledText>
            </>
        )}
      </div>
      
      <div className="relative mt-auto text-center border-t pt-4">
        <StyledText style={styles.footerTitle} designWidth={designWidth} isForDownload={isForDownload} className="leading-tight tracking-tight">MEEM FEST</StyledText>
        <StyledText style={styles.footerSubtitle} designWidth={designWidth} isForDownload={isForDownload}>SSF DAAWA SECTOR</StyledText>
      </div>
    </div>
  );
};

export default PosterLayout2;
