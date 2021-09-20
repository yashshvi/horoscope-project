const request=require('request'); // for data request response
console.log("before");
const cheerio=require('cheerio'); // for data extraction from url
const fs=require("fs");
const path=require("path");
const PDFDocument = require('pdfkit');
function SingleMatch(Name){
  // console.log(Name);
//  request(Name,cb);
 cb(Name);
}
function cb(Name){
  // console.log(Name);
  let url;
  if(Name=="Aries" || Name=="aries"){
  url='https://www.prokerala.com/astrology/horoscope/?sign=aries';
  }else if(Name=="Taurus"|| Name=="taurus"){
  url='https://www.prokerala.com/astrology/horoscope/?sign=taurus';
  }else if(Name=="Gemini" || Name=="gemini"){
    url='https://www.prokerala.com/astrology/horoscope/?sign=gemini';
  }else if(Name=="Cancer" || Name=="cancer" ){
    url='https://www.prokerala.com/astrology/horoscope/?sign=cancer';
  }else if(Name==="Leo"||Name==="leo"){
    url='https://www.prokerala.com/astrology/horoscope/?sign=leo';
  }else if(Name=="Virgo"|| Name=="virgo"){
    url='https://www.prokerala.com/astrology/horoscope/?sign=virgo';
  }else if(Name=="Libra"||Name=="libra"){
    url='https://www.prokerala.com/astrology/horoscope/?sign=libra';
  }else if(Name=="Scorpio"||Name=="scorpio"){
    ulr='https://www.prokerala.com/astrology/horoscope/?sign=scorpio';
  }else if(Name=="Sagittarius"||Name=="sagittarius"){
    url='https://www.prokerala.com/astrology/horoscope/?sign=sagittarius';
  }else if(Name=="Capricorn"||Name=="capricorn"){
    url='https://www.prokerala.com/astrology/horoscope/?sign=capricorn';
  }else if(Name=="Aquarius"||Name=="aquarius"){
    url='https://www.prokerala.com/astrology/horoscope/?sign=aquarius';
  }else if(Name=="Pisces" || Name=="pisces"){
    url='https://www.prokerala.com/astrology/horoscope/?sign=pisces';
  }else{
    console.log("wrong input");
  }
  giveurl(url,Name);
}
let rashi=path.join(__dirname,"rashi");
makingdir(rashi);
// var aries;
function giveurl(url,Name){
  request(url,
    function (error, response, html) {
     if(error){
       console.error('error:', error);
     }else if(response.statusCode==404){
         console.log("page not found");
     }else{
       // console.log('body:', html);
       viewallfunction(html,Name);
     }
   
   });
}


function viewallfunction(html,Name){
//search tool
    let searchTool=cheerio.load(html);
    let h1=searchTool('article h2');
    // console.log(h1.length);

    let all=searchTool('article p');
    // console.log(all.length);
    var arr=[]; 
    // let subpath=path.join(__dirname,rashi);
   
    for(var i=0;i<all.length;i++){
     
          var heading= searchTool(h1[i]).text()
          var para=searchTool(all[i]).text();
         arr.push("*"+i);
          arr.push(heading);
          arr.push(para)
          arr.push("                                                                            ")
          {/* document.write("<br>"); */}
        }
        let subpath=path.join(rashi,Name);
        // let rashi=path.join(__dirname,"rashi");
// makingdir(rashi);
        let reppath=path.join(subpath+".pdf");
      let text=JSON.stringify(arr);
      let pdfDoc = new PDFDocument;
      pdfDoc.pipe(fs.createWriteStream(reppath));
      pdfDoc.text(text);
      pdfDoc.end();
      // console.log(arr);
arr=[];
}
function makingdir(path){
  if(fs.existsSync(path)==false){
    fs.mkdirSync(path);
  }
}

module.exports={
  pms:SingleMatch
}