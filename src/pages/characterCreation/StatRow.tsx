import React from 'react';
import {useStatGenerator, StatIndex}  from './useStatGenerator';

type StatRowLabels = [string, string, string];

interface Props {
    statLabels: StatRowLabels
}

export const StatRow: React.FC<Props> = ({statLabels}) => {
    const physicalStats = useStatGenerator();

    function renderLabels(val: string, index: number) {
        return (
            <div key={index}>{val}: {physicalStats.values[index]}</div>
        )
    }

    function renderAptitudes(val?: StatIndex) {

        let apt;

        switch(val) {
            case 0:
                apt = 'A'
                break;
            case 1:
                apt = 'B'
                break;
            case 2:
                apt = 'C'
                break;
        }

        return (
            <div>{apt}</div>
        )
    }

    return (
        <div>
            <button onClick={physicalStats.rollStats}>Generate</button>
            {physicalStats.aptitudes.map(renderAptitudes)}
            {statLabels.map(renderLabels)}
        </div>
    )
}