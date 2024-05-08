// function respond(match) {
//     process.send({ match });
// }

// function handleMessage(input) {
//     const regex = /A(B|C+)+D/; // Example regex
//     const match = regex.test(input);
//     respond(match);
// }

// process.on('message', handleMessage);

//     let score = 0;

//     score += input.length;
//     score += regex.source.length;
//     score += (regex.source.match(/[\.\^\$\*\+\?\(\)\[\]\{\}\|\\]/g) || []).length;
//     score += (regex.source.match(/[\*\+\?]\??/g) || []).length;
//     score += (regex.source.match(/\|/g) || []).length;

//     return score;
// }

// let input = 'ACCCCCCCCCCCCCCCCCCCCCCABD';
// let regex = /A(B|C+)+D/;
// console.log(calculateComplexity(input, regex)); // Outputs: 16

function calculateComplexity(input, regex) {
    const start = process.hrtime.bigint(); 
    regex.test(input);
    const end = process.hrtime.bigint(); 
    return Number(end - start) / 1e6;
}

let input = 'ABCCCCCCCCCCCCCCCCCCCCCCCCCCCX';
let regex = /A(B|C+)+D/;
console.log(calculateComplexity(input, regex)); 