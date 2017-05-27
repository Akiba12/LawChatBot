var Logic = (function(){
return{
    presentText:"Do you need a mutual or a one way NDA?",
    process:getDocType,
    getDocType: getDocType,
    getPartyType:getPartyType,
    getExactLength:getExactLength,
    getJurisdiction: getJurisdiction,
    getPurpose: getPurpose,
    getDocLength:getDocLength,
    getOtherJur: getOtherJur,
    getStartDate: getStartDate,
    getExactDate: getExactDate,
    getCompanyName: getCompanyName,
    getRegNumber: getRegNumber,
    getAddress: getAddress,
    summaryInfo: summaryInfo,
    getVerification: getVerification,
    answers: {
    purpose: ['investment','supply of products',
    'supply of services','joint venture'],
    docType1 : ["Mutual", "mutual", "M", "m"],
    docType2 : ["One Way", "One way", "one way", "One", "one", "O", "o"],
    startDate1 : ["Signature", "signature", "On signature", "on signature"],
    startDate2 : ["Another date", "another date", "Another", "another"],
    // ---------------------------------------- //
    partyType1 : ["Receiving", "receiving", "R", "r"],
    partyType2 : ["Sharing", "sharing", "S", "s"],
    // ---------------------------------------- //
    purpose1 : [],
    purpose2 : [],
    // ---------------------------------------- //
    yes : ["Yes", "yes", "Y", "y"],
    no : ["No", "no", "N", "n"],
    // ---------------------------------------- //
    jurisdiction1 : []
    }
}

var docType
var partyType
var purpose
var length
var jurisdiction
var startDate
var otherPartyName
var businessRegNum
var businessAddress




// Q1
function getDocType(res) {
  var next = "Are we the party that is receiving confidential information"
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
  return next
};


// Q1a
function getPartyType(res) {
  var next = "Now I need to know why you are receiving or sharing information. Would you like some examples?"
  if (this.answers.partyType1.includes(res)) {
    this.partyType = res
  } else if (this.answers.partyType2.includes(res)) {
    this.partyType = res
  } else {
    return "You've entered an invalid response.";
  }
  this.process = processPartyType;
  return next;
}


function processPartyType(res) {
  this.process = getPurpose;
  if (this.answers.yes.includes(res)) {
    return "Some examples would be receiving or sharing information in relation"+
    "to an investment, for a supply of products or services or for a joint venture. So why are you receiving or sharing information?";
  }else if (this.answers.no.includes(res)) {
    return "So why are you receiving or sharing information?";
  }else{
    this.process = processPartyType;
    return "You've entered an invalid response.";
  }
}

function getPurpose(res){
  if(this.answers.purpose.includes(res.toLowerCase())){
    this.purpose = res.toLowerCase();
    this.process = this.getDocLength;
    return "We normally say that confidentiality obligations should last forever. Should this NDA be any different?"
  } else{
    this.process = this.getPurpose;
    return "You've entered an invalid response.";
  }
}


function getDocLength(res) {
  if (this.answers.no.includes(res)) {
    this.length = "indefinitely";
    this.process = this.getJurisdiction;
    return "We normally have our NDAs governed by South African law. Should this NDA be any different?"
  } else if (this.answers.yes.includes(res)) {
    this.process = this.getExactLength;
    return "How long should the confidentiality obligations last for here?"
  } else{
    return "You've entered an invalid response.";
  }
}

function getExactLength(len) {
  this.length = len;
  //Parse to extract time as <NUMBER> <Period>
  this.process = this.getJurisdiction;
  return "We normally have our NDAs governed by South African law. Should this NDA be any different?";
}


// Q4
function getJurisdiction(res) {
    if (this.answers.no.includes(res)) {
    this.jurisdiction = "South African law";
    this.process = this.getStartDate;
    return "Should the confidentiality obligations start on signature or on another date?";
  } else if (this.answers.yes.includes(res)) {
    this.process = this.getOtherJur;
    return "You will need to get this signed off by Legal."+
    " Do you still want the laws of another country to apply?";
  }
}

function getOtherJur(res){
    if (this.answers.no.includes(res)) {
    this.jurisdiction = "South African law";
    this.process = this.getStartDate;
    return "Should the confidentiality obligations start on signature or on another date?"
  } else if (this.answers.yes.includes(res)) {
    this.process = this.getCountry;
    return "Which country?";
  }
}

function getStartDate(res){
  if (this.answers.startDate1.includes(res)) {
    this.startDate = "On signature";
    this.process = this.getCompanyName;
    return "What is the full legal name of the other party?";
  } else if (this.answers.startDate2.includes(res)) {
    return "What date?"
  }
}

function getExactDate(date){
  //TODO: parse date properly
  this.startDate = date;
  this.process = this.getCompanyName;
  return "What is the full legal name of the other party?";
}

function getCompanyName(name){
  this.otherPartyName = name;
  this.process = this.getRegNumber;
  return "What is the registration number or business number of " +
  this.otherPartyName + "?";
}

function getRegNumber(number){
  this.businessRegNum  = number;
  this.process = this.getAddress;
  return "What is the address of " +
  this.otherPartyName + "?";
}

function getAddress(address) {
  this.businessAddress = address;
  return this.summaryInfo();
}

function summaryInfo() {
  var summary =  "Great, thanks for that. Just to confirm, you want a "+this.docType+
  " NDA with "+this.otherPartyName+" "+this.businessRegNum+" of "+this.businessAddress+
  " for the purpose of "+this.purpose +", with confidentiality obligations that last "+
  this.length+" and governed by "+this.jurisdiction+
  ". The confidentiality obligations will start on "+this.startDate+
  ". Is that all correct?"
  this.process = getVerification;
  return summary;
}

function getVerification (res) {
  if (this.answers.yes.includes(res)) {
    return "Thanks! I’ll email you a draft shortly."
  } else if (this.answers.no.includes(res)) {
    return "I’ll have to start again. Is that ok?"
  }
}

}());