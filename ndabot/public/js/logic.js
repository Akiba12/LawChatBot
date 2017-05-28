var Logic = (function(){
return{
    presentText:"Hello and welcome! I'm LiNDA and I'll help you create your NDA agreement quickly and easily. Are you ready?",
    process:getStarted,
    getStarted: getStarted,
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
    getCountry: getCountry,
    summaryInfo: summaryInfo,
    getVerification: getVerification,
    startAgain: startAgain,
    answers: {
    purpose: ['investment','supply of products',
    'supply of services','joint venture'],
    docType1 : ["mutual","m"],
    docType2 : ["one way",  "one","o"],
    startDate1 : [ "signature",  "on signature"],
    startDate2 : ["another date", "another"],
    // ---------------------------------------- //
    partyType1 : [ "receiving","r"],
    partyType2 : [ "sharing", "s"],
    // ---------------------------------------- //
    yes : [ "yes", "y"],
    no : [ "no", "n"],
    // ---------------------------------------- //
    jurisdiction1 : []
    }
}

// Q1

function getStarted(res){
  if(this.answers.yes.includes(res)){
    this.process = this.getDocType;
    return "Let's get started. Firstly, do you need a mutual or a one way NDA?";
  }
  else{
    return "Ok, just say yes when you are!";
  }
}



function getDocType(res) {
  var next = "Are we the party that is receiving confidential information"
  +" or the party that is sharing our confidential information?";
  if (this.answers.docType1.includes(res)) {
    this.docType = "mutual"
  } else if (this.answers.docType2.includes(res)){
    this.docType = "one way"
  }  else {
    return "You've entered an invalid response.";
  }
  this.process=this.getPartyType;
  return next
};


// Q1a
function getPartyType(res) {
  var next = "Now I need to know why you are receiving or sharing information."
  +"<br>Would you like some examples?"
  if (this.answers.partyType1.includes(res)) {
    this.partyType = res
  } else if (this.answers.partyType2.includes(res)) {
    this.partyType = res;
  } else if (res == "help") {
      return "A mutual NDA is where both parties are sharing confidential"+
      "information with each other. A one way agreement is where only one party "+
      "shares confidential information with the other party."
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
    "to an investment, for a supply of products or services or for a joint venture."
    +"<br>So why are you receiving or sharing information?";
  }else if (this.answers.no.includes(res)) {
    return "So why are you receiving or sharing information?";
  }else if (res=="help"){
    return "Some examples would be receiving or sharing information in relation"+
    "to an investment, for a supply of products or services or for a joint venture."
    +"<br>So why are you receiving or sharing information?"
  }else{
    this.process = processPartyType;
    return "You've entered an invalid response.";
  }
}

function getPurpose(res){
  if(this.answers.purpose.includes(res.toLowerCase())){
    this.purpose = res.toLowerCase();
    this.process = this.getDocLength;
    return "We normally say that confidentiality obligations should last forever. <br>Should this NDA be any different?"
  }else{
    this.process = this.getPurpose;
    return "You've entered an invalid response.";
  }
}


function getDocLength(res) {
  if (this.answers.no.includes(res)) {
    this.length = "indefinitely";
    this.process = this.getJurisdiction;
    return "We normally have our NDAs governed by South African law. <br>Should this NDA be any different?"
  } else if (this.answers.yes.includes(res)) {
    this.process = this.getExactLength;
    return "How long should the confidentiality obligations last for here?"
  } else{
    return "You've entered an invalid response.";
  }
}

function getExactLength(len) {
  var match = len.match(/\d+ (month|year)s*/);
  if(match !== null){
    this.length = match[0];
    this.length = len;
    this.process = this.getJurisdiction;
  }
  return "We normally have our NDAs governed by South African law. <br>Should this NDA be any different?";
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
  else{
    return "You've entered an invalid response.";
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
  else{
    return "You've entered an invalid response.";
  }
}

function getCountry(res){
  this.jurisdiction = res;
  this.process = this.getStartDate;
  return "Should the confidentiality obligations start on signature or on another date?";
}



function getStartDate(res){
  if (this.answers.startDate1.includes(res)) {
    this.startDate = "signature";
    this.process = this.getCompanyName;
    return "What is the full legal name of the other party?";
  } else if (this.answers.startDate2.includes(res)) {
    this.process = this.getExactDate;
    return "What date?"
  }
  else{
    return "You've entered an invalid response.";
  }
}

function getExactDate(date){
  this.startDate = date;
  this.process = this.getCompanyName;
  return "What is the full legal name of the other party?";

}

function getCompanyName(name){
  name = name.split(' ').map(function(w){return w[0].toUpperCase()+w.slice(1)}).join(' ');
  this.otherPartyName = name;
  this.process = this.getRegNumber;
  return "What is the registration number or business number of " +
  this.otherPartyName + "?";
}

function getRegNumber(number){
  var match = number.match(/\d+/);
  if(match !== null){
    this.businessRegNum  = match[0];
    this.process = this.getAddress;
    return "What is the address of " +
    this.otherPartyName + "?";
  }else{
    return "You've entered an invalid response.";
  }
}

function getAddress(address) {
  this.businessAddress = address;
  return this.summaryInfo();
}

function summaryInfo() {
  var fields = ['docType','otherPartyName','businessRegNum','businessAddress',
  'purpose','length','jurisdiction','startDate'
  ]


  var summary =  "Great, thanks for that. <br>Just to confirm, you want a <span contenteditable class='field'> {value1} </span> NDA with <span contenteditable class='field'> {value2} </span> <span contenteditable class='field'> {value3} </span> of <span contenteditable class='field'> {value4} </span> for the purpose of <span contenteditable class='field'> {value5} </span>, with confidentiality obligations that last <span contenteditable class='field'> {value6} </span> and governed by <span contenteditable class='field'> {value7} </span>. The confidentiality obligations will start on <span contenteditable class='field'> {value8} </span>. Is that all correct?"

  fields.forEach(function(field,i){
      summary = summary.replace('{value'+(i+1)+'}',this[field].toUpperCase());
  }.bind(this));
  this.process = getVerification;
  return summary;
}

function getVerification (res) {
  if (this.answers.yes.includes(res)) {
    this.process = this.startAgain;
    return "Thanks! I will email you a draft shortly."
  } else if (this.answers.no.includes(res)) {
    this.process = this.startAgain;
    return "I will have to start again. Is that ok?"
  }else{
    return "You've entered an invalid response. Please confirm whether the above summary is correct.";
  }
}

function startAgain(res){
  if (this.answers.yes.includes(res)) {
    this.process = this.getStarted;
    return "Do you need a mutual or a one way NDA?"
  } else if (this.answers.no.includes(res)) {
    this.process = this.getVerification;
    return "In that case please say yes to if above summary is correct."
  }else{
    return "You've entered an invalid response. Please confirm whether the above summary is correct.";
  }
}


}());