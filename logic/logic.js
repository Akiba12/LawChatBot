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
  yes : ["Yes", "yes", "Y", "y"],
  no : ["No", "no", "N", "n"],
  // ---------------------------------------- //
  startDate1 : ["Signature", "signature", "On signature", "on signature"],
  startDate2 : ["Another date", "another date", "Another", "another"]

};

// Q1
var getDocType = function (res) {
  if (answers.docType1.includes(res)) {
    docType = "Mutual"
  } else if (answers.docType2.includes(res)){
    docType = "One way"
  } else if (res == "/hint") {
      return "A mutual NDA is where both parties are sharing confidential"+
      "information with each other. A one way agreement is where only one party "+
      "shares confidential information with the other party."
  } else {
    console.log("You entered wrong answer.");
  }
};
// Q1a
var getPartyType = function (res) {
  if (answers.partyType1.includes(res)) {
    partyType = "Receiving"
  } else if (answers.partyType2.includes(res)) {
    partyType = "Sharing"
  } else {
    console.log("You entered wrong answer.");
  }
}

// Q2
var getPurpose = function (res) {
  if (res == "/hint") {
    return "Some examples would be receiving or sharing information in relation"+
    "to an investment, for a supply of products or services or for a joint venture."
  }
  purpose = res

}

// Q3
var getDocLength = function(res) {
  if (answers.no.includes(res)) {
    lenght = "Indefinite"
  } else if (answers.yes.includes(res)) {
    return "How long should the confidentiality obligations last for here?"
    exactLength(len)
  } else{
    console.log("You entered wrong answer.");
  }
}

var exactLength = function (len) {
  lenght = len
}

// Q4
var getJurisdiction = function (res) {
  if (answers.no.includes(res)) {
    jurisdiction = "South African law"
  } else if (answers.yes.includes(res)) {
    return "You will need to get this signed off by Legal."+
    " Do you still want the laws of another country to apply?"
    jurPart(res);
  }
}
// Q4ab
var jurPart = function (res) {
  if (answers.no.includes(res)) {
    jurisdiction = "South African law"
  } else if (answers.yes.includes(res)) {
    return "Which country?"
    jurisdiction = res
  }
}

// Q5
var getStartDate = function (res) {
  if (answers.startDate1.includes(res)) {
    startDate = "On signature"
  } else if (answers.startDate2.includes(res)) {
    return "What date?"
    exactDate(date);
  }
}
// Q5a
var exactDate = function (date) {
  startDate = date
}

// Q6
var getCompanyName = function (name) {
  otherPartyName = name;
}

// Q7
var getRegNumber = function (regNum) {
  businessRegNum = regNum;
}

// Q8
var getAddress = function (address) {
  businessAddress = address;
}

// Q9
var summaryInfo = function () {
  summary =  "Great, thanks for that. Just to confirm, you want a "+docType+
  " NDA with "+otherPartyName+" "+businessRegNum+" of "+businessAddress+
  " for the purpose of "+purpose", with confidentiality obligations that last "+
  lenght+" and governed by "+jurisdiction+
  ". The confidentiality obligations will start on "+startDate+
  ". Is that all correct?"
  return summary;
}

var getVarification = function (res) {
  if (answers.yes.includes(res)) {
    return "Thanks! I’ll email you a draft shortly."
  } else if (answers.no.includes(res)) {
    return "I’ll have to start again. Is that ok?"
    startAgain(res)
  }
}

var startAgain = function (res) {
  if (answers.yes.includes(res)) {
    // TODO go to Q1
  } else if (answers.no.includes(res)) {
    return "Sorry I couldn’t help. Please contact Legal for assistance."
  }
}
