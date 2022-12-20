
const fs = require('fs')
const pdfParse = require('pdf-parse')
const { json } = require('stream/consumers')
const { forEach } = require('underscore')

const ContentBasedRecommender =  require('content-based-recommender')
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
//  console.log(hamaradocuments)

 
const posts = [
                
    {
      id: '1000009',
      content: 'What are the main objective of this projects ?',
    },
  ];

const tagMap = hamaradocuments.reduce((acc, tag) => {
acc[tag.id] = tag;
return acc;
}, {});

const recommender = new ContentBasedRecommender();

recommender.trainBidirectional(posts, hamaradocuments);

for (let post of posts) {
const relatedTags = recommender.getSimilarDocuments(post.id,0,3);
const hamaradocuments = relatedTags.map(t => tagMap[t.id].content);
console.log(post.content, 'related tags:', relatedTags,hamaradocuments);
}





    }catch(error){
        throw new Error(error)
    }
    
    
  
}



const pdfRead = "./7th-Proposal-Sample.pdf"

let grabjson = getPDF(pdfRead);


















 