const http2 = require('http2');
const fs = require('fs');
const client = http2.connect('https://query1.finance.yahoo.com', {
    //ca: fs.readFileSync('localhost-cert.pem')
});
client.on('socketError', (err) => console.error(err));
client.on('error', (err) => console.error(err));

var API_TM = 1000;
var path = "/v6/finance/quote?&symbols=GBPUSD=X,EURJPY=X,AUDUSD=X,HKD=X,INR=X,GRAPHITE.NS,HDFCBANK.NS,TATAMOTORS.NS,DHFL.NS,YESBANK.NS,NAVNETEDUL.NS,PCJEWELLER.NS,YESBANK.NS,SBIN.NS,ASHOKLEY.NS,EDELWEISS.NS,TCS.NS,HINDPETRO.NS";
//var path = "/v6/finance/quote?&symbols=BTC-USD,ETH-USD,XRP-USD,BCH-USD,ADA-USD,EOS-USD,LTC-USD,XEM-USD,NEO-USD,XLM-USD,IOT-USD,TRX-USD,DASH-USD,XMR-USD,VEN-USD,QTUM-USD,BTG-USD,ETC-USD,BTM-USD,BNB-USD,LSK-USD,OMG-USD,GNO-USD,SNT-USD,BCCOIN-USD&fields=regularMarketPrice,regularMarketChange,regularMarketChangePercent,regularMarketVolume";
var old_stock = [];

var requester = function(callback) {
    Timer = setTimeout(function() {
        const req = client.request({
            ':path': path
        });
        req.on('response', (headers, flags) => {
            // for (const name in headers) {
            //   console.log(`${name}: ${headers[name]}`);
            // }
        });
        req.setEncoding('utf8');
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {
            if (data != '') {
                try {
                    data = JSON.parse(data);
                    fs_reader(data, requester);
                } catch (e) {
                    console.log(e); // error in the above string (in this case, yes)!
                }
            } else {
                requester();
            }

        });
        req.end();
    }, API_TM);
}
var fs_reader = function(data, callback) {
    try {

        for (var k in data.quoteResponse.result) {

            fs_writer(data.quoteResponse.result[k], data.quoteResponse.result[k].symbol);
        }

    } catch (err) {
        console.log(err);
    }
    callback();
}
var fs_writer = function(data, symbol) {
    try {

        if (symbol in old_stock) {
        } else {
            old_stock[symbol]= {"price":0};
        }

        if (data.regularMarketPrice != old_stock[symbol].price) {
            //console.log(data.regularMarketPrice+"!="+old_stock[symbol].price);
            fs.writeFile("json/" + symbol + ".json", JSON.stringify(data), 'utf8', function(err) {
                if (err) {
                    return console.log(err);
                }
               console.log("The file was saved  ! && Date =   " + Date.now() + "");

            });
         }

         old_stock[symbol] = {"price":data.regularMarketPrice};

    } catch (err) {
        console.log(err);
    }
}
requester();