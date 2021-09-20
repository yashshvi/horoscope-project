
const prompt = require('prompt-sync')();
let puppeteer=  require('puppeteer');

// var inputarr=process.argv.slice(2); // because in 0,1 position we get node ,path
// let filename=inputarr[0];
console.log("welcome to my horrorscope world");
console.log("Press 1 if you dont know your rashi ");
console.log("Press 2 if you know your Zodic sign(rashi) and know your horrorscope ");

var filename = prompt('ENTER YOUR CHOICE(1-2)?');
console.log(`Hey there::${filename}`);
console.log( filename);

// console.log("type 1 :for birth date horror scope");
 if(filename=='2'){
    console.log( "hii");
   
    var Name = prompt('Enter your rashi (Please enter correct spelling)?');   
    console.log(`YOUR PDF OF ${Name} IS READY IN RASHI FOLDER `);
   let result=require('./result');
    result.pms(Name);
 }else if(filename=='1'){

  
        console.log( "hii");
        var Name = prompt('What is your name?');
        console.log(`Hey there::${Name}`);
        var gender = prompt('Your gender?');
        console.log(`Gender::${gender}`);
        var Place = prompt('What is your Birth place?');
        console.log(`Place::${Place}`);
        const Date = prompt('What is your Date of Birth in the formate(yyyy/mm/date)? eg(2001/nov/06) Note month should ne in words');
        console.log(`Birth ${Date}`);
        const Time = prompt('What is Birth time? in formate(hh/mm/AM)');
        console.log(`Time ${Time}`);
        const myArr = Date.split("/");
        console.log(myArr);
        var Date1=myArr[0];
        var Date2=myArr[1];
        if(Date2.length>3){
            function split_at_index(value, index)
            {
     return value.substring(0, index) + "," + value.substring(index);
              }
              let Final=split_at_index(Date2, 3);
    // console.log(Final);
            Date2=Final.split(",");
            
            Date2=Date2[0];
            
        }
        var Date3=myArr[2];
        console.log(Date1); console.log(Date2); console.log(Date3);
        const myArr1 = Time.split("/");
        console.log(myArr1);
        var hh=myArr1[0];
        var minute=myArr1[1];
        var ap=myArr1[2];
        console.log(hh+minute+ap);
        
    
    
    let BrowserStartPromise=puppeteer.launch({
        headless:false,
        defaultViewport:null,
        args: ["--start-maximized","--disable-notifications"]
    })
    const loginLink = "https://www.prokerala.com/astrology/horoscope/";
    
    
    let page,browser;
    (async function fn(){
       let browserobj=await BrowserStartPromise;
       console.log("browser start");
       browser=browserobj;
       page=await browser.newPage();
       await page.goto(loginLink);
    //    .wdgt-menu-list.nav.nav-main-list
    // let navarr=[];
       let navarr= await page.$$(".wdgt-menu-list.nav.nav-main-list li");
       let cl= await navarr[3].click();
        // //    .form-control 
        // let Formarr= await page.$$(".form-control");
        // // let cl= await navarr[3].click();
       
        // await page.type(Formarr[0],name);
           await page.waitForTimeout(4000)
              await page.type("input[name='name']",Name);
              
              let genarr= await page.$$(".form-list-wrapper.custom-form-control.inline .radio");
              if(gender==="f"){
                let gclick= await genarr[1].click();
              }else{
                let gclick= await genarr[0].click();
              }
    
       
            
             let pclick=await page.click(".form-clear-text-wrapper input[name='location']");
             for(let i=0;i<28;i++){
                await page.keyboard.press('Backspace');
             }
            
             await page.waitForTimeout(1000)
              await page.type(".form-clear-text-wrapper input[name='location']",Place);
              await page.waitForTimeout(3000)
              await page.keyboard.press('ArrowDown');
              await page.waitForTimeout(3000)
              await page.keyboard.press('Enter');
                 //   let leftarr=page.$$(".no-margin");
            await page.click(".control-label.col-form-label");
              await page.type(".no-margin select[name='year']",Date1);
              await page.type(".no-margin select[name='month']",Date2);
              await page.type(".no-margin select[name='day']",Date3);
            
              await page.type(".no-margin select[name='hour']",hh);
              await page.type(".no-margin select[name='min']",minute);
              await page.type(".no-margin select[name='apm']",ap);
            //   await page.waitForTimeout(3000)
            //   await page.keyboard.press('ArrowDown');
              await page.waitForTimeout(3000)
              await page.keyboard.press('Enter');
            //   option[value="am"]
            
            //   await page.click(".no-margin option[value='pm']");
            await page.click(".btn.btn-danger.submit-btn");
              await page.keyboard.press('Enter');
            //   .no-margin select[name='hour']
            //   await page.type(".ui-tooltip-wrapper #input-2","yashshvi");
            //   await page.keyboard.press('Enter');   
               await page.waitForTimeout(1000)
            let WaitPromise= await page.waitForSelector(".tr-heading-orange.tc",{visible:true});
            let a= await page.click(".tr-heading-orange.tc");
            // await page.html();
    // await page.waitForTimeout(4000)
            // let url=`https://www.prokerala.com/astrology/birth-chart/`;
            // result.pms(url);  
    })()

 }else{
    console.log("wront input");
 }


// function waitandclick(selector,cpage){
//     return new Promise(function(resolve,reject){
//         let waitpromise=cpage.waitForSelector(selector,{visible:true});
//         waitpromise.then(function(){
//             let clickPromise=cpage.click(selector,{delay:100})
//             return clickPromise;
//         }).then(function(){
//               resolve();
//         }).catch(function(){
//                 reject();
//         })
//     })
// }
// function waitAndClick(selector,cpage){
//     return new Promise(function(resolve,reject){
//         let WaitPromise=cpage.waitForSelector(selector,{visible:true});
//         WaitPromise.then(function(){
//             let clickPromise=cpage.click(selector,{delay:20});
//             return clickPromise
//         }).then(function(){
//             resolve();
//         }).catch(function(){
//             reject();
//         })
//     })
// }