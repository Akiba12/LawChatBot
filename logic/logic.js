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
    console.log(pdfMake.createPdf(docDefinition).open());
    pdfMake.createPdf(docDefinition).open();
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


// Document Generation


var docDefinition = {
	content: [
		{
			text: 'Confidentiality Agreement\n',
			style: 'header'
		},
		'\n',
		{
			text: 'Dated: ______________________\n'+
                  'Between: Company A Pty Ltd (Reg No, 12 345 678)                   (Company A)\n'+
                  'of 1 Example St, Sandton, South Africa\n',
			style: 'subheader'
		},
		'\n',
		{
			text: 'and '+ 'otherPartyName' + ' (Reg No,' + 'businessRegNumber' + ')               (Counterparty)\n' +
                  'of ' + 'businessAddress',
			style: 'subheader'
		},
		'\n',
		{
			text: 'Background',
			style: 'header'
		},
		{
		    text: 'Operative provisions',
		    style: 'header'},
		{
			ol: [
				'In this Agreement:',
				{
				    ol: [
				        'Confidential Information means  any information of a technical, business, corporate, commercial or financial nature of or in relation to the Discloser, its Related Parties and its business or shareholders or which the Discloser makes the Recipient or its agents aware is considered by it to be confidential or proprietary, or which is evident on its face as being confidential or proprietary, but excludes any such information that is in the public domain (other than through a breach by the Recipient of its obligations under this Agreement), or which was developed independently by the Recipient  without the use of any of the Discloser’s Confidential Information; ',
				        'Discloser means the party disclosing Confidential Information under this Agreement;',
				        'Permitted Purpose means' + 'purpose' + ';',
				        'Personnel means directors, officers, agents and employees;',
				        'Recipient means the party receiving Confidential Information under this Agreement; and',
				        'Related Bodies Corporate has the meaning given to that term in the Corporations Act 2001 (Cth).'
				    ]
				},
				'This Agreement is entered into in consideration of the parties incurring obligations and giving rights under this Agreement and for other valuable consideration.',
				'Each party acts as the Discloser in respect of disclosing their own Confidential Information and the Recipient when receiving the other party’s Confidential Information.',
				'The Recipient must only use the Discloser’s Confidential Information for the Permitted Purpose',
				'In respect of the Discloser’s Confidential Information, the Recipient must',
				'The Recipient may disclose the Discloser’s Confidential Information if it is required to do so by statute or court order (or by a person acting under the authority of a statute or court order), or by any stock exchange rules or accounting standards, provided the Recipient first notifies the Discloser of the disclosure requirement (to the extent it is permitted to do so), and co-operates with the Discloser to seek a court order preventing the disclosure, if requested by the Discloser and at the Discloser’s expense.',
				'The obligations of confidentiality in this document commence on' + 'startDate' + 'and continue' + 'lenght' + '.',
				'Nothing in this Agreement implies any grant of licence or assignment of title or rights to the Discloser’s Confidential Information or any other intellectual property.',
				'No party may assign, novate, transfer, encumber, pledge or otherwise dispose of or deal with any of its rights or obligations under this Agreement.',
				'The law of' + 'jurisdiction' + 'governs this Agreement and the parties submit to the exclusive jurisdiction of the courts of' + 'jurisdiction' +'.',

			]
		},
		'\n\n',
		{
			text: 'Executed as an Agreement \n',
			style: 'subheader'
		},
		'\n',
		{
			text: ['Signed for and on behalf of ',
			{text: 'Company A', bold: true},
			' by its authorised representative:  \n',
			 ]
		},
		{
		    text: [ '______________________________________\n',
		    {text: 'Signature of authorised representative'}
		    ]
		},
		'\n',
		{
		    text: [ '______________________________________\n',
		    {text: 'Name of authorised representative'}
		    ]
		},
		'\n\n\n',
		{
			text: ['Signed for and on behalf of ',
			{text: 'the Counterparty', bold: true},
			' by its authorised representative:  \n',
			 ]
		},
		'\n',
		{
		    text: [ '______________________________________\n',
		    {text: 'Signature of authorised representative'}
		    ]
		},
		'\n',
		{
		    text: [ '______________________________________\n',
		    {text: 'Name of authorised representative'}
		    ]
		},
	],
	styles: {
		header: {
			fontSize: 18,
			bold: true
		},
		subheader: {
			fontSize: 12,
			bold: true
		},
		quote: {
			italics: true
		},
		small: {
			fontSize: 8
		}
	}
};
