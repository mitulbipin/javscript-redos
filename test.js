function check_time_regexp(regexp, text){
    var t0 = new Date().getTime();;
    new RegExp(regexp).test(text);
    var t1 = new Date().getTime();;
    console.log("Regexp " + regexp + " took " + (t1 - t0) + " milliseconds.")
}

// This payloads work because the input has several "a"s
[
//  "((a+)+)+$",  //Eternal,
//  "(a?){100}$", //Eternal
    "(a|a?)+$",
    "(\\w*)+$",   //Generic
    "(a*)+$",
    "(.*a){100}$",
    "([a-zA-Z]+)*$", //Generic
    "(a+)*$",
].forEach(regexp => check_time_regexp(regexp, "aaaaaaaaaaaaaaaaaaaaaaaaaa!"))
