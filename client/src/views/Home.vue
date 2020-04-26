<template>
    <div class="home">
        <select class="dropdown-dark" v-model='sel_sym' v-on:change="subscriber(sel_sym)">
            <option value="" disabled>Select Symbol</option>
            <option v-for="s in symbol" :disabled="disabled[s.name]" :value="s.name">{{s.dval}}</option>
        </select>
        <marquee>Welcome To Nse India Website</marquee>
        <div class="table-responsive shadow-lg">
            <table class="table table-bordered table-dark">
                <thead>
                    <tr>
                        <th style="min-width: 100px">Symbol</th>
                        <th style="min-width: 200px">Company Name</th>
                        <th style="min-width: 80px">Price</th>
                        <th style="min-width: 70px">Change</th>
                        <th style="min-width: 80px">Per%</th>
                        <th style="min-width: 80px">Open</th>
                        <th title="Privious Close" style="min-width: 80px">PClose</th>
                        <th style="min-width: 80px">Today High</th>
                        <th style="min-width: 80px">Today Low</th>
                        <th style="min-width: 80px">Bid</th>
                        <th style="min-width: 80px">Ask</th>
                        <th style="min-width: 80px">52WkLow</th>
                        <th style="min-width: 80px">52WkHigh</th>
                        <th style="min-width: 100px">Volume</th>
                    </tr>
                </thead>
                <tbody>
                    <SymbolList v-for="s in subs" v-bind:stocklst="stock" v-bind:key="s" v-bind:symbol="s" />
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
// @ is an alias to /src
import SymbolList from '@/components/SymbolList.vue'

export default {
    name: 'home',
    components: {
        SymbolList
    },

    mounted() {

        this.symbol = [
            { name: 'GBPUSD=X', dval: 'Pound To US Dollar' },
            { name: 'EURJPY=X', dval: 'Euro To Japanese Yen' },
            { name: 'AUDUSD=X', dval: 'Aus Dollar To Us Dollar' },
            { name: 'HKD=X', dval: 'Us Dollar To Hong Kong Dollar' },
            { name: 'INR=X', dval: 'Us Dollar To The Indian Rupees' },
            { name: 'ASHOKLEY.NS', dval: 'ASHOK Leyland' },
            { name: 'GRAPHITE.NS', dval: 'GRAPHITE INDIA' },
            { name: 'TATAMOTORS.NS', dval: 'TATA MOTORS' },
            { name: 'HDFCBANK.NS', dval: 'HDFC BANK' },
            { name: 'DHFL.NS', dval: 'Dewan Housing' },
            { name: 'YESBANK.NS', dval: 'YES BANK' },
            { name: 'NAVNETEDUL.NS', dval: 'Navneet Education' },
            { name: 'PCJEWELLER.NS', dval: 'PC JEWELLER' },
            { name: 'SBIN.NS', dval: 'SBI Bank' },
            { name: 'EDELWEISS.NS', dval: 'Edelweiss Broking' },
            { name: 'TCS.NS', dval: 'Tata Consultancy Services' },
            { name: 'HINDPETRO.NS', dval: 'Hindustan Petroleum' },

        ];
    },
    data() {
        return {
            symbol: [],
            stock: {},
            sel_sym: '',
            subs: [],
            subs_str: localStorage.getItem('subs'),
            disabled: {},
            old_stock: {},
        };
    },
    sockets: {
        connect: function() {

            if (this.subs_str) {
                this.subs = this.subs_str.split(',');
                Object.entries(this.subs).forEach(([k, v]) => {
                    this.subscriber(v);
                });
            }
        },
        data: function(data) {
            data = JSON.parse(data);
            if (data.regularMarketPrice < this.old_stock[data.symbol].regularMarketPrice) {
                data['h_class'] = 'highlight-red';
            } else if (data.regularMarketPrice > this.old_stock[data.symbol].regularMarketPrice) {
                data['h_class'] = 'highlight-green';
            } else {
                data['h_class'] = '';
            }

            this.$set(this.stock, data.symbol, data);
            setTimeout(() => { this.stock[data.symbol].h_class = '' }, 300);
            this.$set(this.old_stock, data.symbol, { 'regularMarketPrice': data.regularMarketPrice });

        }
    },
    methods: {
        subscriber: function(symbol) {
            this.$set(this.stock, symbol, {})

            this.$set(this.old_stock, symbol, { 'regularMarketPrice': '' })

            this.subs.indexOf(symbol) === -1 ? this.subs.push(symbol) : '';
            localStorage.setItem('subs', this.subs);

            this.disabled[symbol] = true;
            this.$socket.emit('subscribe', symbol);
        }
    }

}
</script>