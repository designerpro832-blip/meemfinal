import React from 'react';
import { TextStyle } from '../../types';

interface StyledTextProps {
  style: TextStyle;
  designWidth: number;
  children: React.ReactNode;
  className?: string;
  isForDownload?: boolean;
}

const StyledText: React.FC<StyledTextProps> = ({ style, designWidth, children, className, isForDownload = false }) => {
  if (!style) {
    return null;
  }

  const baseFontSize = style.size || 16;
  let finalFontSize: string;

  if (isForDownload) {
    // For downloads, use a fixed pixel size for consistency.
    finalFontSize = `${baseFontSize}px`;
  } else {
    // For on-screen display, use responsive units for fluidity.
    const baseWidth = designWidth || 500;
    const vwFontSize = (baseFontSize / baseWidth) * 100;
    
    // Set sensible min/max sizes to prevent text from becoming too small or large.
    const minFontSize = baseFontSize * 0.6;
    const maxFontSize = baseFontSize * 1.4;
    
    // Use clamp() for fluid typography that scales between the min and max.
    finalFontSize = `clamp(${minFontSize}px, ${vwFontSize}vw, ${maxFontSize}px)`;
  }

  const cssProperties: React.CSSProperties = {
    position: 'absolute',
    top: `${style.y}%`,
    left: `${style.x}%`,
    transform: 'translate(-50%, -50%)',
    width: '90%', // Use a relative width to prevent overflow
    fontSize: finalFontSize,
    color: style.color,
    textAlign: style.align,
    fontWeight: style.weight,
    fontFamily: `'${style.font}', sans-serif`,
    lineHeight: 1.2,
    // Add a subtle shadow for better readability on various backgrounds
    textShadow: '0px 1px 3px rgba(0, 0, 0, 0.4)',
  };

  return <div style={cssProperties} className={className}>{children}</div>;
};

export default StyledText;
