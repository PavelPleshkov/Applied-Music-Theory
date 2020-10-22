function intervalConstruction(arr) {
    const interval = arr[0];
    const regExpInputInterval = /[mM][2367]|P[458]/;
    let intervals = 'm2, M2, m3, M3, P4, P5, m6, M6, m7, M7, P8';
    let intervalsArr = [];
    let semitones = {};
    const inputNoteName = arr[1];
    arr.forEach(item => {
        if (typeof item != 'string') throw new Error(`${item} in input array is not a 'string'`);
    });
    const regExpInputNote = /^[A-G](#{0,1}|b{0,1})$/;
    const inputNaturalNoteName = inputNoteName.charAt(0);
    const octave = 'C C#/Db D D#/Eb E F F#/Gb G G#/Ab A A#/Bb B';
    const octaveArr = octave.split(' ');
    const degree = +interval.charAt(1);
    const naturalInterval = octave.split(' ').filter(note => note.length === 1);

    let outputNaturalNoteName = '';
    let outputAccidental = '';
    let outputNoteName = '';
    const regExpOutput = /^[A-G](#{0,2}|b{0,2})$/;

    if (arr.length < 2 || arr.length > 3) throw new Error('Illegal number of elements in input array');
    if (!regExpInputInterval.test(interval)) throw new Error(`Illegal interval name: '${interval}' in input array`);
    if (!regExpInputNote.test(inputNoteName)) throw new Error(`Illegal note name: '${inputNoteName}' in input array`);
    if (arr.length === 2) arr.push('asc');

    intervals = intervals.split(', ');
    for (let i = 0; i < intervals.length; i++) {
        if (i >= 5) {
            intervalsArr.push([intervals[i], i + 2]);
            continue;
        }
        intervalsArr.push([intervals[i], i + 1]);
    }
    // console.log(intervalsArr);

    for (let i = 0; i < intervalsArr.length; i++) {
        semitones[intervalsArr[i][0]] = intervalsArr[i][1];
    }
    // console.log(semitones);

    let startIntervalIndex = naturalInterval.findIndex(item => item === inputNaturalNoteName);
    let endIntervalIndex;
    // console.log(`Note ${inputNoteName} with interval ${interval} has start natural interval index: ${startIntervalIndex}`);
    let startSemitoneIndex = octaveArr.findIndex(item => item === inputNaturalNoteName);
    let endSemitoneIndex;

    if (inputNoteName[1] == 'b') {
        startSemitoneIndex -= 1;
    } else if (inputNoteName[1] == '#') {
        startSemitoneIndex += 1;
    }

    if (arr[2] === 'asc') {
        endIntervalIndex = startIntervalIndex + degree - 1;
        if (endIntervalIndex > naturalInterval.length - 1) {
            endIntervalIndex = degree - (naturalInterval.length - startIntervalIndex) - 1;
        }
        endSemitoneIndex = startSemitoneIndex + semitones[interval];
        if (endSemitoneIndex > octaveArr.length - 1) {
            endSemitoneIndex = semitones[interval] - (octaveArr.length - startSemitoneIndex);
        }
    }

    if (arr[2] === 'dsc') {
        endIntervalIndex = startIntervalIndex - degree + 1;
        if (endIntervalIndex < 0) {
            endIntervalIndex = naturalInterval.length - Math.abs((startIntervalIndex + 1 - degree));
        }
        endSemitoneIndex = startSemitoneIndex - semitones[interval];
        if (endSemitoneIndex < 0) {
            endSemitoneIndex = octaveArr.length - Math.abs(startSemitoneIndex - semitones[interval]);
        }
    }
    // console.log(`End natural interval index: ${endIntervalIndex}\nNote name is: ${naturalInterval[endIntervalIndex]}`);

    outputNaturalNoteName = naturalInterval[endIntervalIndex];
    
    switch (endSemitoneIndex - octaveArr.findIndex(item => item === outputNaturalNoteName)) {
        case 0:
            outputAccidental = '';
            break;
        case -2:
            outputAccidental = 'bb';
            break;
        case -1:
            outputAccidental = 'b';
            break;
        case 1:
            outputAccidental = '#';
            break;
        case 2:
            outputAccidental = '##';
            break;
    
        default:
            throw new Error('Smth wrong in output accidental')
            break;
    }

    // console.log(`${inputNoteName} startSemitoneIndex in octave: ${startSemitoneIndex}\ninterval: ${interval} has semitone: ${semitones[interval]}\nendSemitoneIndex in octave: ${endSemitoneIndex}`);

    outputNoteName = `${outputNaturalNoteName}${outputAccidental}`;

    return (regExpOutput.test(outputNoteName)) ? outputNoteName : new Error(`Illegal output note name`);
}

function intervalIdentification(arr) {
    const startNote = arr[0];
    const endNote = arr[1];
    const regExpInput = /^[A-G](#{0,2}|b{0,2})$/;
    const octave = 'C C#/Db D D#/Eb E F F#/Gb G G#/Ab A A#/Bb B';
    arr.forEach(item => {
        if (typeof item != 'string') throw new Error(`${item} in input array is not a 'string'`);
    });
    const octaveArr = octave.split(' ');
    const naturalInterval = octave.split(' ').filter(note => note.length === 1);
    const startIntervalIndex = naturalInterval.findIndex(item => item === startNote.charAt(0));
    const endIntervalIndex = naturalInterval.findIndex(item => item === endNote.charAt(0));
    // console.log(`startIntervalIndex: ${startIntervalIndex}\nendIntervalIndex: ${endIntervalIndex}`);
    let startSemitoneIndex = octaveArr.findIndex(item => item === startNote.charAt(0));
    let endSemitoneIndex = octaveArr.findIndex(item => item === endNote.charAt(0));
    let semitone;
    let intervalLetter = '';

    let outputInterval = '';
    let degree;
    const regExpOutput = /[mM][2367]|P[458]/;

    if (!regExpInput.test(startNote)) throw new Error(`Illegal start note name: '${startNote}'`);
    if (!regExpInput.test(endNote)) throw new Error(`Illegal end note name: '${endNote}'`);
    if (arr.length < 2 || arr.length > 3) throw new Error('Illegal number of elements in input array');
    if (arr.length === 2) arr.push('asc');

    switch (startNote.slice(1)) {
        case '##':
            startSemitoneIndex += 2;
            break;
        case '#':
            startSemitoneIndex += 1;
            break;
        case 'b':
            startSemitoneIndex -= 1;
            break;
        case 'bb':
            startSemitoneIndex -= 2;
            break;
    
        default:
            break;
    }
    switch (endNote.slice(1)) {
        case '##':
            endSemitoneIndex += 2;
            break;
        case '#':
            endSemitoneIndex += 1;
            break;
        case 'b':
            endSemitoneIndex -= 1;
            break;
        case 'bb':
            endSemitoneIndex -= 2;
            break;
    
        default:
            break;
    }

    if (startIntervalIndex === endIntervalIndex) {
        degree = naturalInterval.length + 1;
    }
    if (arr[2] === 'asc') {
        degree = endIntervalIndex - startIntervalIndex + 1;
        if (startIntervalIndex > endIntervalIndex) {
            degree = endIntervalIndex + naturalInterval.length - startIntervalIndex + 1;
        }
        semitone = endSemitoneIndex - startSemitoneIndex;
        if (startSemitoneIndex > endSemitoneIndex) {
            semitone = endSemitoneIndex + octaveArr.length - startSemitoneIndex;
        }
    }
    if (arr[2] === 'dsc') {
        degree = startIntervalIndex - endIntervalIndex + 1;
        if (startIntervalIndex < endIntervalIndex) {
            degree = startIntervalIndex + naturalInterval.length - endIntervalIndex + 1;
        }
        semitone = startSemitoneIndex - endSemitoneIndex;
        if (startSemitoneIndex < endSemitoneIndex) {
            semitone = startSemitoneIndex + octaveArr.length - endSemitoneIndex;
        }
    }
    
    // console.log(`degree: ${degree}`);
    // console.log(`start note ${startNote} has startSemitoneIndex: ${startSemitoneIndex}`);
    // console.log(`end note ${endNote} has endSemitoneIndex: ${endSemitoneIndex}`);
    // console.log(`semitone: ${semitone}`);

    if (semitone === 1 || semitone === 3 || semitone === 8 || semitone === 10) {
        intervalLetter += 'm';
    } else if (semitone === 2 || semitone === 4 || semitone === 9 || semitone === 11) {
        intervalLetter += 'M';
    } else if ( semitone === 5 || semitone === 7 || semitone === 12) {
        intervalLetter += 'P';
    }
    // console.log(`interval letter: ${intervalLetter}`);

    outputInterval = `${intervalLetter}${degree}`
    
    return (regExpOutput.test(outputInterval) ? outputInterval : new Error('Cannot identify the interval'));
}

//Intervals between some notes can't be identificate - get an error 'Cannot identify the interval'.
//For example: Test case with ['C#', 'Fb'] input array throw the error because we have a Fourth (4 interval with 3 semitones) in output, but it isn't an allowed value: Perfect fourth(P4 with 5 semitones) from allowed intervals(m2, M2, m3, M3, P4, P5, m6, M6, m7, M7, P8) in task:

// let inputArr2 = ['C#', 'Fb'];//m4
// console.log(intervalIdentification(inputArr2));
