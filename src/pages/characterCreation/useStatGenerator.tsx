import React from 'react';

export type Stats = [number, number, number];
export type StatIndex = 0 | 1 | 2;
export type Aptitudes = [StatIndex?, StatIndex?, StatIndex?];

export const useStatGenerator = () => {
    const [statRow, setStatRow] = React.useState([0,0,0] as Stats);
    const [aptitudes, setAptitudes] = React.useState([] as Aptitudes);

    React.useEffect(() => {
        if(statRow[0] === 0) {
            return
        }

        setAptitudes(getAptitudes(statRow));
    }, [statRow])


    // DICE *
    function rollDice() {
        return Math.floor(Math.random()*6) + 1
    }

    function rollTwoDice() {
        return rollDice() + rollDice();
    }

    // STAT HANDLERS **

    function rollStats() {
        setStatRow([rollTwoDice(), rollTwoDice(), rollTwoDice()]);
    }

    function rollSingleStat(index: StatIndex) {
        updateSingleStat(index, rollTwoDice())
    }

    function updateSingleStat(index: StatIndex, newValue: number) {
        let newStatRow = [...statRow] as Stats;
        newStatRow[index] = newValue;

        setStatRow(newStatRow);
    }

    // APTITUDE Handlers ***

    function getAptitudes(stats: Stats) {

        // Caclulate Atpitudes
        return stats.reduce((acc, val, index, arr) => {
            let apts = [...acc] as Aptitudes;
            let first = apts.length === 0 ? 0 : arr[apts[0] || 0];

            // Handle low values and first value 7 or higher
            if(val < 7) {
                return apts;
            } else if (val >= 7 && first === 0) {
                apts.push(index as StatIndex);
                return apts
            }

            // Handle values above 10
            if(val > 10 && first === 7) {
                apts.splice(0, 1, index as StatIndex)
                return apts;
            } else if (val > 10) {
                apts.push(index as StatIndex)
                return apts;
            }

            // Handle competeting values
            if (val > first) {
                apts.splice(0, 1, index as StatIndex)
            } else if(first > 10 && val !== 7) {
                apts.unshift(index as StatIndex)
            }

            return apts;

        }, [] as Aptitudes)
    }

    function switchAptitude(newIndex: StatIndex) {
        if(aptitudes[0] && statRow[aptitudes[0]] === statRow[newIndex]) {
            let apts = [...aptitudes] as Aptitudes;
            apts.splice(0, 0, newIndex as StatIndex)

            setAptitudes([newIndex])
        }
    }

    return {
        values: statRow,
        aptitudes,
        rollStats,
        rollSingleStat,
        updateSingleStat,
        switchAptitude
    }
}