# Pavel-Pleshkov-Academy-Test-Task
## Applied Music Theory
---
### Notes:

**intervalIdentification()**
Intervals between some notes can't be identificate - get an error 'Cannot identify the interval'.
For example: Test case with ['C#', 'Fb'] input array throw the error because we have a Fourth (4 interval with 3 semitones) in output, but it isn't an allowed value: Perfect fourth(P4 with 5 semitones) from allowed intervals(m2, M2, m3, M3, P4, P5, m6, M6, m7, M7, P8) in task:
```javascript
let arr = ['C#', 'Fb'];
console.log(intervalIdentification(arr));//m4
//output interval is m4 (by the function) that is out of allowed intervals
```

