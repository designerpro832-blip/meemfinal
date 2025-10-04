import React from 'react';
import { Result, PosterStyles } from '../../../types';
import StyledText from '../StyledText';

interface PosterLayoutProps {
  program: { event: string; category: string };
  winners: Result[];
  styles: PosterStyles;
  background_image_url: string | null;
  resultNumber: number;
  designWidth: number;
  isForDownload?: boolean;
}

const FlexibleLayout: React.FC<PosterLayoutProps> = ({ program, winners, styles, background_image_url, resultNumber, designWidth, isForDownload }) => {
  const winner1 = winners.find(w => w.position === 1);
  const winner2 = winners.find(w => w.position === 2);
  const winner3 = winners.find(w => w.position === 3);

  const backgroundStyle: React.CSSProperties = background_image_url
    ? { backgroundImage: `url(${background_image_url})` }
    : {};

  return (
    <div 
      className="w-full h-full bg-cover bg-center text-ui-text-light font-sans relative overflow-hidden"
      style={backgroundStyle}
    >
      <div className="absolute inset-0 bg-black/30"></div> {/* Overlay for better text readability */}
      
      {styles.resultNumber && <StyledText style={styles.resultNumber} designWidth={designWidth} isForDownload={isForDownload}>{String(resultNumber).padStart(2, '0')}</StyledText>}
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

export default FlexibleLayout;
