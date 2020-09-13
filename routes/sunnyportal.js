const puppeteer = require('puppeteer');


class SunnyPortal{

	constructor (_username, _password, _plantID){
		this.username = _username;
		this.password = _password;
        this.plantID = _plantID;
        	
    }
    
    get PVtoday(){
        return this._PVtoday;
    }

    get PVyesterday(){
        return this._PVyesterday;
    }
    set PVtoday(_PVtoday){
        this._PVtoday = _PVtoday;
    }
    set PVyesterday(_PVyesterday){
        this._PVyesterday = _PVyesterday;
    }

	async init(){

		this.browser = await puppeteer.launch({headless: true,
            slowMo: 250,
			args: ['--no-sandbox',  '--disable-setuid-sandbox', '--window-size=1920,1080']});
		this.page = await this.browser.newPage();

			await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');
			await this.page.goto('https://www.sunnyportal.com/Templates/Start.aspx',  {waitUntil: 'networkidle0'});
		  
			await this.page.waitForSelector('#ctl00_ContentPlaceHolder1_Logincontrol1_LoginBtn');
			await this.page.type('#txtUserName', this.username);
			await this.page.type('#txtPassword', this.password);
		  
			await this.page.click('#ctl00_ContentPlaceHolder1_Logincontrol1_LoginBtn');
		  
			await this.page.waitForSelector('#DataTables_Table_0_info').catch(e => { throw new Error('Login Failed')});
            
            var PVtoday = await this.page.evaluate(() => { return parseFloat(document.getElementById("ac33056e-02d8-4bba-af8b-394795fda506").getElementsByTagName("td")[3].innerText); }) || 0;
            var PVyesterday = await this.page.evaluate(() => {return parseFloat(document.getElementById("ac33056e-02d8-4bba-af8b-394795fda506").getElementsByTagName("td")[2].innerText); }) || 0;


            var todayObj = new Date();
            var yesterdayObj = new Date(Date.now() - 86400000);
           
            this._PVtoday = [PVtoday, todayObj.getUTCDate() + "-" + todayObj.getUTCMonth() + "-" + todayObj.getUTCFullYear()];
            this._PVyesterday = [PVyesterday, yesterdayObj.getUTCDate() + "-" + yesterdayObj.getUTCMonth() + "-" + yesterdayObj.getUTCFullYear()];        
		  
			this.browser.close();
	}


   
  

}

module.exports = SunnyPortal;
