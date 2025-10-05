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

const PosterLayout4: React.FC<PosterLayoutProps> = ({ program, winners, styles, designWidth, isForDownload }) => {
  const winner1 = winners.find(w => w.position === 1);
  const winner2 = winners.find(w => w.position === 2);
  const winner3 = winners.find(w => w.position === 3);

  return (
    <div className="w-full h-full bg-ui-surface text-ui-text-primary font-serif p-8 relative border-8 border-double border-brand-light-blue/20">
      <StyledText style={styles.headerText} designWidth={designWidth} isForDownload={isForDownload} className="tracking-[0.2em] uppercase">SSF DAAWA SECTOR</StyledText>
      <StyledText style={styles.mainTitle} designWidth={designWidth} isForDownload={isForDownload}>MUHIMMATH</StyledText>
      <div className="absolute top-[24%] left-1/2 -translate-x-1/2 w-24 h-px bg-brand-light-blue/50"></div>
      
      <StyledText style={styles.programName} designWidth={designWidth} isForDownload={isForDownload}>{program.event}</StyledText>
      <StyledText style={styles.category} designWidth={designWidth} isForDownload={isForDownload}>{program.category}</StyledText>
      
      {winner1 && (
        <React.Fragment>
          <StyledText style={styles.winner1Name} designWidth={designWidth} isForDownload={isForDownload}>{winner1.participant}</StyledText>
          <StyledText style={styles.winner1Team} designWidth={designWidth} isForDownload={isForDownload}>{winner1.school}</StyledText>
        </React.Fragment>
      )}
      {winner2 && (
        <React.Fragment>
          <StyledText style={styles.winner2Name} designWidth={designWidth} isForDownload={isForDownload}>{winner2.participant}</StyledText>
          <StyledText style={styles.winner2Team} designWidth={designWidth} isForDownload={isForDownload}>{winner2.school}</StyledText>
        </React.Fragment>
      )}
      {winner3 && (
        <React.Fragment>
          <StyledText style={styles.winner3Name} designWidth={designWidth} isForDownload={isForDownload}>{winner3.participant}</StyledText>
          <StyledText style={styles.winner3Team} designWidth={designWidth} isForDownload={isForDownload}>{winner3.school}</StyledText>
        </React.Fragment>
      )}
      
      <div className="absolute bottom-[14%] left-1/2 -translate-x-1/2 w-24 h-px bg-brand-light-blue/50"></div>
      <StyledText style={styles.footerText} designWidth={designWidth} isForDownload={isForDownload}>Results of 2025</StyledText>
    </div>
  );
};

export default PosterLayout4;
