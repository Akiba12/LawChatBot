var docType
var partyType
var purpose
var lenght
var jurisdiction
var startDate
var otherPartyName
var businessRegNum
var businessAddress


var answers = {
  docType1 : ["Mutual", "mutual", "M", "m"],
  docType2 : ["One Way", "One way", "one way", "One", "one", "O", "o"],
  // ---------------------------------------- //
  partyType1 : ["Receiving", "receiving", "R", "r"],
  partyType2 : ["Sharing", "sharing", "S", "s"],
  // ---------------------------------------- //
  purpose1 : [],
  purpose2 : [],
  // ---------------------------------------- //
  lenght1 : ["No", "no", "N", "n"],
  length2 : ["Yes", "yes", "Y", "y"]
  // ---------------------------------------- //
  jurisdiction1 : []
};

// Q1
var getDocType = function (res) {
  if (answers.docType1.includes(res)) {
    docType = res
  } else if (answers.docType2.includes(res)){
    docType = res
  } else {
    console.log("You entered wrong answer.");
  }
};
// Q1a
var getPartyType = function (res) {
  if (answers.partyType1.includes(res)) {
    partyType = res
  } else if (answers.partyType2.includes(res)) {
    partyType = res
  } else {
    console.log("You entered wrong answer.");
  }
}
// TODO Q2

// Q3
var getDocLength = function(res) {
  if (answers.lenght1.includes(res)) {
    lenght = "Indefinite"
  } else if (answers.length2.includes(res)) {
    lenght = res
  } else {
    console.log("You entered wrong answer.");
  }
}

// Q4
var getJurisdiction = function (res) {

}
