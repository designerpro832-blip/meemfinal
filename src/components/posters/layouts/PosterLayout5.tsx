import React from 'react';
import { Result, PosterStyles } from '../../../types';
import { Trophy } from 'lucide-react';
import StyledText from '../StyledText';

interface PosterLayoutProps {
  program: { event: string; category: string };
  winners: Result[];
  styles: PosterStyles;
  designWidth: number;
  isForDownload?: boolean;
}

const PosterLayout5: React.FC<PosterLayoutProps> = ({ program, winners, styles, designWidth, isForDownload }) => {
  const winner1 = winners.find(w => w.position === 1);
  const winner2 = winners.find(w => w.position === 2);
  const winner3 = winners.find(w => w.position === 3);

  return (
    <div className="w-full h-full bg-brand-dark-teal text-ui-text-light font-sans p-8 relative">
      <StyledText style={styles.headerTitle} designWidth={designWidth} isForDownload={isForDownload} className="uppercase tracking-tighter">RESULTS</StyledText>
      <StyledText style={styles.orgName} designWidth={designWidth} isForDownload={isForDownload}>MUHIMMATH</StyledText>
      <StyledText style={styles.orgSubName} designWidth={designWidth} isForDownload={isForDownload}>SSF DAAWA SECTOR</StyledText>
      
      <StyledText style={styles.programName} designWidth={designWidth} isForDownload={isForDownload} className="uppercase">{program.event}</StyledText>
      <StyledText style={styles.category} designWidth={designWidth} isForDownload={isForDownload}>{program.category}</StyledText>
      
      {winner1 && (
        <div className="absolute" style={{top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%'}}>
            <div className="bg-brand-coral text-brand-dark-blue p-4 rounded-lg w-full">
                <Trophy className="mx-auto w-8 h-8 mb-2" />
                <p style={{fontSize: styles.winner1Name.size, color: styles.winner1Name.color}} className="font-bold text-center truncate">{winner1.participant}</p>
                <p style={{fontSize: styles.winner1Team.size, color: styles.winner1Team.color}} className="text-sm font-medium text-center truncate">{winner1.school}</p>
            </div>
        </div>
      )}
      
      <div className="absolute" style={{top: '80%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%'}}>
        <div className="grid grid-cols-2 gap-4 w-full">
          {winner2 && (
            <div className="bg-ui-text-light/10 p-3 rounded-lg">
              <p style={{fontSize: styles.winner2Name.size, color: styles.winner2Name.color}} className="font-semibold text-sm text-center truncate">{winner2.participant}</p>
              <p style={{fontSize: styles.winner2Team.size, color: styles.winner2Team.color}} className="text-xs text-center truncate">{winner2.school}</p>
            </div>
          )}
          {winner3 && (
            <div className="bg-ui-text-light/10 p-3 rounded-lg">
              <p style={{fontSize: styles.winner3Name.size, color: styles.winner3Name.color}} className="font-semibold text-sm text-center truncate">{winner3.participant}</p>
              <p style={{fontSize: styles.winner3Team.size, color: styles.winner3Team.color}} className="text-xs text-center truncate">{winner3.school}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PosterLayout5;
