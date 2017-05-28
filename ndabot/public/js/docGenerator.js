 var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };



 var doc = pdfMake.createPdf(docDefinition).open();
 export.doc = doc;
