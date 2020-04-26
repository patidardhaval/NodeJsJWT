<template>
    <tr>
      <td>{{ symbol }}</td>
      <td>{{ stocklst[symbol].shortName }}</td>
      <td class="text-right" v-bind:class="stocklst[symbol].h_class" v-bind:data-id="symbol">{{ stocklst[symbol].regularMarketPrice }}</td>
      <td class="text-right" v-bind:class="[stocklst[symbol].regularMarketChange < 0 ? 'text-danger' : 'text-success']">{{ twoplaces(stocklst[symbol].regularMarketChange) }}</td>
      <td class="text-right" v-bind:class="[stocklst[symbol].regularMarketChange < 0 ? 'text-danger' : 'text-success']">{{ twoplaces(stocklst[symbol].regularMarketChangePercent) }}%</td>
      <td class="text-right">{{ twoplaces(stocklst[symbol].regularMarketOpen) }}</td>
      <td class="text-right">{{ twoplaces(stocklst[symbol].regularMarketPreviousClose) }}</td>

      <td class="text-right">{{ twoplaces(stocklst[symbol].regularMarketDayHigh) }}</td>
      <td class="text-right">{{ twoplaces(stocklst[symbol].regularMarketDayLow) }}</td>
      <td class="text-right">{{ twoplaces(stocklst[symbol].bid) }}</td>
      <td class="text-right">{{ twoplaces(stocklst[symbol].ask) }}</td>
      <td class="text-right">{{ twoplaces(stocklst[symbol].fiftyTwoWeekLow) }}</td>
      <td class="text-right">{{ twoplaces(stocklst[symbol].fiftyTwoWeekHigh) }}</td>
      <td class="text-right">{{ twoplaces(stocklst[symbol].regularMarketVolume) }}</td>
    </tr>
</template>

<script>
export default {
  name: 'SymbolList',
  props: {
    symbol: String,
    stocklst: Object,
  },
  mounted() {
        //console.log("symbol mounted")
    },

    methods: {
        twoplaces: function(val) {
              if(typeof val != 'undefined')
              return val.toFixed(2);
        }
    }

}
</script>

