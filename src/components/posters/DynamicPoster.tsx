import React from 'react';
import { Result, PosterStyles, PosterTemplate } from '../../types';
import PosterLayout1 from './layouts/PosterLayout1';
import PosterLayout2 from './layouts/PosterLayout2';
import PosterLayout3 from './layouts/PosterLayout3';
import PosterLayout4 from './layouts/PosterLayout4';
import PosterLayout5 from './layouts/PosterLayout5';
import FlexibleLayout from './layouts/FlexibleLayout';

interface DynamicPosterProps {
  template: PosterTemplate;
  styles: PosterStyles;
  program: { event: string; category: string };
  winners: Result[];
  resultNumber: number;
  isForDownload?: boolean;
}

const posterLayoutMap: { [key: string]: React.FC<any> } = {
  'Poster1': PosterLayout1,
  'Poster2': PosterLayout2,
  'Poster3': PosterLayout3,
  'Poster4': PosterLayout4,
  'Poster5': PosterLayout5,
  'FlexibleLayout': FlexibleLayout,
};

const DynamicPoster: React.FC<DynamicPosterProps> = ({ template, styles, program, winners, resultNumber, isForDownload = false }) => {
  const componentName = template.layout_name;
  const PosterComponent = posterLayoutMap[componentName];

  if (!PosterComponent) {
    return (
      <div className="w-full h-full bg-red-200 flex items-center justify-center text-center p-4">
        Layout component <code className="bg-red-300 p-1 rounded">{componentName || '[None]'}.tsx</code> not found.
      </div>
    );
  }
  
  if (!styles) {
    return <div className="w-full h-full bg-amber-200 flex items-center justify-center text-center p-4">Styles for this template are not defined. Please configure them in the admin panel.</div>;
  }

  return <PosterComponent 
            styles={styles} 
            program={program} 
            winners={winners} 
            background_image_url={template.background_image_url}
            resultNumber={resultNumber}
            designWidth={template.width}
            isForDownload={isForDownload}
          />;
};

export default DynamicPoster;
