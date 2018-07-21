To run this project go to the link   http://nginx.org/en/download.html and download nginx for window 
after that ofen ngnix.conf in confg folder change for root and index for port 80 with end as ;
like as described below
location / {
            #root   html;
			root    "C:/Users/dinu/Downloads/ngflytta";
            index  index.html index.htm;
        }
        
