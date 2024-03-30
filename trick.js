// function respond(match) {
//     process.send({ match });
// }

// function handleMessage(input) {
//     const regex = /A(B|C+)+D/; // Example regex
//     const match = regex.test(input);
//     respond(match);
// }

// process.on('message', handleMessage);

// function calculateComplexity(input, regex) {
//     let score = 0;

//     // Add to score for each character in the input
//     score += input.length;

//     // Add to score for each character in the regex
//     score += regex.source.length;

//     // Add to score for each metacharacter in the regex
//     score += (regex.source.match(/[\.\^\$\*\+\?\(\)\[\]\{\}\|\\]/g) || []).length;

//     // Add to score for each quantifier in the regex
//     score += (regex.source.match(/[\*\+\?]\??/g) || []).length;

//     // Add to score for each alternation in the regex
//     score += (regex.source.match(/\|/g) || []).length;

//     return score;
// }

// let input = 'ACCCCCCCCCCCCCCCCCCCCCCABD';
// let regex = /A(B|C+)+D/;
// console.log(calculateComplexity(input, regex)); // Outputs: 16

function calculateComplexity(input, regex) {
    const start = process.hrtime.bigint(); // Get the start time

    regex.test(input); // Perform the regex match

    const end = process.hrtime.bigint(); // Get the end time

    // Calculate the difference in milliseconds and return it as the score
    return Number(end - start) / 1e6;
}

let input = 'ABCCCCCCCCCCCCCCCCCCCCCCCCCCCX';
let regex = /A(B|C+)+D/;
console.log(calculateComplexity(input, regex)); // Outputs: time taken in milliseconds