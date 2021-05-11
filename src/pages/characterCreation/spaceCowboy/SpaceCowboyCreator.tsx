import React from 'react';
import {StatRow} from '../StatRow';

export const SpaceCowboyCreator: React.FC<{}> = () => {
    return <StatRow statLabels={['Strength', 'Reflexes', 'Endurance']}/>
}