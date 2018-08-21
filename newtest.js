require('chromedriver'); 
const selenium = require('selenium-webdriver'); 
var until = selenium.until;
var By = selenium.By;
const driver = new selenium.Builder().forBrowser("chrome").build(); 
const url = "http://staging.superprocure.com/app";
driver.get(url);

var phno=driver.findElement(By.xpath("//*[@id=\"mat-form\"]/div/div[1]/input"))
.then(function(phno){
    phno.sendKeys('1111111111')
    .then(function(){
        console.log('LOGIN');
        var button=driver.findElement(By.className("btn btn-primary")).click()
    })
    .then(function(){
        var otp=driver.findElement(By.xpath("/html[@class=' js flexbox flexboxlegacy canvas canvastext webgl no-touch geolocation postmessage websqldatabase indexeddb hashchange history draganddrop websockets rgba hsla multiplebgs backgroundsize borderimage borderradius boxshadow textshadow opacity cssanimations csscolumns cssgradients cssreflections csstransforms csstransforms3d csstransitions fontface generatedcontent video audio localstorage sessionstorage webworkers applicationcache svg inlinesvg smil svgclippaths']/body/div[@id='root']/div/div/div[@id='form-home']/div[@class='form-wrapper']/div[2]/div[@class='signin-form form-two show-form']/div[@class='row']/div[@class='col-md-12']/form[@id='mat-form']/div[@class='wrapper']/div[@class='inner-wrap']/input"))
    });
});
//*[@id="form-home"]/div/div[1]/div/div[4]/div/button
//driver.wait(until.elementLocated(By.xpath("//*[@id=\"form-home\"]/div/div[2]/div/div[1]/div[2]/p[1]/h3")),3000);


