var Logic = (function(){
return{
    presentText:"Do you need a mutual or a one way NDA?",
    process:getDocType,
    getDocType: getDocType,
    getPartyType:getPartyType,
    answers: {
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
    length2 : ["Yes", "yes", "Y", "y"],
    // ---------------------------------------- //
    jurisdiction1 : []
    }
}

var docType
var partyType
var purpose
var lenght
var jurisdiction
var startDate
var otherPartyName
var businessRegNum
var businessAddress




// Q1
function getDocType(res) {
  this.presentText = "Are we the party that is receiving confidential information"
  +" or the party that is sharing our confidential information?";
  if (this.answers.docType1.includes(res)) {
    this.docType = "Mutual"
  } else if (this.answers.docType2.includes(res)){
    this.docType = "One way"
  } else if (res == "/hint") {
      return "A mutual NDA is where both parties are sharing confidential"+
      "information with each other. A one way agreement is where only one party "+
      "shares confidential information with the other party."
  } else {
    return "You've entered an invalid response.";
  }
  this.process=this.getPartyType;
  return this.presentText;
};


// Q1a
function getPartyType(res) {
  if (this.answers.partyType1.includes(res)) {
    this.partyType = res
  } else if (this.answers.partyType2.includes(res)) {
    this.partyType = res
  } else {
    return "You've entered an invalid response.";
  }
}


function getDocLength(res) {
  if (this.answers.lenght1.includes(res)) {
    lenght = "Indefinite"
  } else if (this.answers.length2.includes(res)) {
    lenght = res
  } else {
    return "You've entered an invalid response.";
  }
}

// Q4
var getJurisdiction = function (res) {

}

}());