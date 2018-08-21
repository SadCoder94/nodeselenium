const {By, Key, until, LegacyActionSequence} = require('selenium-webdriver')
const sleep = require('thread-sleep')

let dimn=({width:1366,height:768})
let chrome = require('selenium-webdriver/chrome');
let {Builder} = require('selenium-webdriver');

let driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options().windowSize(dimn))
            .build();
var openload_id_old ='none',openload_id_new ='none' 

async function login() {
  try{

    await driver.get('http://staging.superprocure.com/app')//open site
  
    const phoneNo = await driver.findElement(By.xpath('//*[@id=\"mat-form\"]/div/div[1]/input'))//phone number input field element

    phoneNo.sendKeys('1111111111', Key.RETURN)//phone number entry

    const header = await driver.findElement(By.xpath('//*[@id="form-home"]/div/div[2]/div/div[1]/div[2]/p[1]/h3'))//header element  
    var visible = await driver.wait(until.elementIsVisible(header),10000)//wait until header change is visible
    
    const OTP = await driver.findElement(By.xpath("//body/div[@id='root']/div/div/div[@id='form-home']/div[@class='form-wrapper']/div[2]/div[@class='signin-form form-two show-form']/div[@class='row']/div[@class='col-md-12']/form[@id='mat-form']/div[@class='wrapper']/div[@class='inner-wrap']/input"))//otp input field element

    await OTP.sendKeys('24680', Key.RETURN)//set otp
  }
  catch(e)
  {
    console.log('ERROR ERROR ERROR in Login\n'+e) 
   }
}


async function postLoad() {
  try{
    openload_id_old = await  get_first_load_id()//get loadid

    sleep(500)
    const postLoadxpath="/html[@class=' js flexbox flexboxlegacy canvas canvastext webgl no-touch geolocation postmessage websqldatabase indexeddb hashchange history draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow textshadow opacity cssanimations csscolumns cssgradients cssreflections csstransforms csstransforms3d csstransitions fontface generatedcontent video audio localstorage sessionstorage webworkers applicationcache svg inlinesvg smil svgclippaths']/body/div[@id='root']/div/div/div/div/div/div[1]/div[2]/div[@id='desktop-header']/div[@class='row']/div[@class='btn btn-primary dropdown m-l-20']/div[@class='col-xs-1 p-0 f-14']/b"//postload button

    const eAuctionxpath="/html[@class=' js flexbox flexboxlegacy canvas canvastext webgl no-touch geolocation postmessage websqldatabase indexeddb hashchange history draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow textshadow opacity cssanimations csscolumns cssgradients cssreflections csstransforms csstransforms3d csstransitions fontface generatedcontent video audio localstorage sessionstorage webworkers applicationcache svg inlinesvg smil svgclippaths']/body/div[@id='root']/div/div/div/div/div/div[1]/div[2]/div[@id='desktop-header']/div[@class='row']/div[@class='btn btn-primary dropdown m-l-20']/div[@class='col-xs-1 p-0 f-14']/div[@class='dropdown-content m-t-5 t-o-t-l']/ul/li[1]"//e-Auction option
    
    const postloadbutton = await driver.findElement(By.xpath(postLoadxpath))
    
    await hoverOver(postloadbutton)//trigger hover on post button
    await driver.findElement(By.xpath(eAuctionxpath)).click()

    sleep(2000)
    await driver.findElement(By.xpath("//div[@class='Select-placeholder']")).click()//Unloading point
    sleep(1000)

    await driver.findElement(By.xpath("//*[@id='react-select-4--option-0']/span/span[1]")).click()//1st option of unloading point dropdown

    await driver.findElement(By.xpath("//div[@class='modal-footer']/button[@class='btn btn-primary']")).click()//click post button

    await driver.findElement(By.xpath("//button[@class='close']")).click()//click close button
    
  }
  catch(e)
  {
    console.log('ERROR ERROR ERROR in postLoad\n'+e) 
   }
}

async function hoverOver(element) {
  await new LegacyActionSequence(driver)
    .mouseMove(element,{x:0,y:0})
    .perform()
}


async function get_first_load_id(){
  
  sleep(3000)
  var first_open_load="//body/div[@id='root']/div/div/div/div/div/div[2]/div[@class='container-fluid carrier-body m-t-5']/div[@class='carrier-load']/div[1]/div[@class='row custom-row load-row']/div[@class='col-md-2 col-sm-2 col-xs-12 margin-bottom'][1]/div[@class='row']/div[@class='col-md-6 col-sm-6 col-xs-6']"//first load in open tab

  var id= await driver.findElement(By.xpath(first_open_load)).getText()//get load id of first load 
  return id;
  
}

async function checkLoadPost(){
  try{
      
      openload_id_new = await get_first_load_id()
      sleep(1000)
      if(parseInt(openload_id_new.split('#')[1])>=parseInt(openload_id_old.split('#')[1])+1)
        console.log('load post successful')
      else
        console.log('nope')
  }
  catch(e){
    console.log('ERROR ERROR ERROR in postLoad check\n'+e)
  }

}

(async () => {
  try{
    
    console.log('login start')
    await login()
    console.log('login end, postload start')
    await postLoad()
    console.log('postload end, check load post start')
    await checkLoadPost()

    driver.quit()
  }
  catch(e)
  {
    console.log('ERROR ERROR ERROR in starter\n'+e)
  }   // async call
})()