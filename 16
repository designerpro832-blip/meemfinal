import React from 'react';

type DividerStyle = 'wave' | 'zigzag' | 'angle' | 'clouds';
type DividerPosition = 'top' | 'bottom';

interface SectionDividerProps {
  style: DividerStyle;
  color: string;
  position?: DividerPosition;
  className?: string;
  height?: string;
}

const paths = {
  wave: "M0,50 C150,100 350,0 500,50 L500,100 L0,100 Z",
  zigzag: "M0,50 L125,100 L250,50 L375,100 L500,50 L500,100 L0,100 Z",
  angle: "M0,100 L500,0 V100 H0 Z",
  clouds: "M0,70 C60,20,60,120,120,70 C180,20,180,120,240,70 C300,20,300,120,360,70 C420,20,420,120,480,70 L500,70 V100 H0 Z"
};

const SectionDivider: React.FC<SectionDividerProps> = ({
  style,
  color,
  position = 'bottom',
  className = '',
  height = 'h-[60px] md:h-[100px]'
}) => {
  return (
    <div className={`absolute w-full overflow-hidden ${position === 'top' ? '-top-px' : '-bottom-px'} left-0 ${className}`} style={{ lineHeight: 0, transform: position === 'top' ? 'rotate(180deg)' : '' }}>
      <svg
        className={`relative block w-full ${height} ${color}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 500 100"
        preserveAspectRatio="none"
      >
        <path d={paths[style]} />
      </svg>
    </div>
  );
};

export default SectionDivider;
