var webdriver = require('selenium-webdriver');
require('chromedriver')
var driver = new webdriver.Builder()
.forBrowser('chrome')
.build();
//driver.manage().timeouts().implicitlyWait(10);
 function scrollingIntoView() {
var element = driver.findElement(webdriver.By.id("featurette-13"))
.then(function(element) {
var element1 = driver.executeScript("arguments[0].scrollIntoView();", element);
});
}
driver.get('https://smartbear.com')
.then(scrollingIntoView());
driver.quit()