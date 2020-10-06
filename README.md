# ShopBridge
Shopping Website

Steps for running the application:

1. Clone the project from https://github.com/mohana-majumder/ShopBridge

2. Clone the project API from https://github.com/mohana-majumder/ShopBridge_BE

3. In the project API go to folder "SQLBackup" and restore the database.
	
4. In the "web.config part of ShopBridge_BE" and "App.config part of ShopBridge_BE.Tests" find the following node
	"
	<connectionStrings>
		<add name="ShopBridgeString" connectionString="Data Source=<Your DB Instance>;Initial Catalog=ShopBridge;User ID=<Your DB UserID>;Password=<Your DB Password>;" providerName="System.Data.SqlClient" />
	  </connectionStrings>
	  "
  and change the "Data Source" to your database instance name and change "User ID" and "Password" of your database
  
5. Go to "Properties" under "ShopBridge" application and "ShopBridge_BE" API => Under the tab "Web" => under the heading "Servers" => select "local IIS" =>  Click on the button "Create Virtual Directory"
		 
 