const fs = require('fs')
const pdfParse = require('pdf-parse')
const { json } = require('stream/consumers')
const { forEach } = require('underscore')
const getPDF = async (file) => {
    let readFileSync =  await fs.readFileSync(file)
    try{
        let pdfExtract = await pdfParse(readFileSync)
        const text =  await pdfExtract.text;
        // console.log('File conten: ',pdfExtract.text)
        // console.log('Total pages:',pdfExtract.numpages)
        // console.log('All content:',pdfExtract.info)
        let page1 = text.match(/(?=[^])(?:\P{Sentence_Terminal}|\p{Sentence_Terminal}(?!['"`\p{Close_Punctuation}\p{Final_Punctuation}\s]))*(?:\p{Sentence_Terminal}+['"`\p{Close_Punctuation}\p{Final_Punctuation}]*|$)/guy);
         let hamrojson =  page1.map((item,index)=>{
            let id = index;
            let content = item;
            if(id!==undefined || content!==undefined){
                return(({id:id,content:content}))

            }
        })
       // console.log(hamrojson)
        
const hamaradocuments = hamrojson.map((paragraph)=>{
    let id = paragraph.id;
    let content = paragraph.content 
    return(({id:id,content:content}));

   
   
})
// console.log(hamaradocuments)
const hamararecommendor = require('content-based-recommender')
const recommender = new hamararecommendor({
   minScore:0.1,
   maxSimilarDocuments:100
})
//
recommender.train(hamaradocuments);
//
const similarDocuments = recommender.getSimilarDocuments('15',0,1);
console.log(similarDocuments)
// console.log(similarDocuments)
let result = similarDocuments.map(({id}) => id);

let id = result[0]


 var rec = hamrojson.findIndex(item => item.id === id);
 console.log(hamrojson[rec].content);
        

        
    }catch(error){
        throw new Error(error)
    }
    
    
  
}



const pdfRead = "./Ambulance_management_system_using_GIS.pdf"

let grabjson = getPDF(pdfRead);



