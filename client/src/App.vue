<template>
    <div id="app">
        <router-view />
    </div>
</template>
<style>
html, body {
  height: 100%;
  min-height: 60vh;
  overflow: hidden;
}
body {
    background-repeat: no-repeat center center fixed;
    background-color: #29343C !important;
    border-top: solid 3px #06233f !important;
}
.container
{
  width: 100%;
  margin: 0; 
  padding: 0;
}

.highlight-red {

    background-color: red;
    color: #fff;
}

.highlight-green {
    background-color: green;
    color: #fff;
}

th,
td {
    padding: 6px 6px !important;
}

td {
    -webkit-transition: 1s linear all;
    transition: 1s linear all;
    background-color: clear;

}

marquee {
    display: inline-block;
    float: right;
    max-width: 49%;
    color: #c4e6ff;
}

.text-danger {
    color: #ff596a !important;
}

.footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    background-color: #26292D;
    color: #c4e6ff;
    text-align: center;
}
.dropdown-dark {
  background: #676a73;
  border-color: #002141;
  color:#fff;
  max-width: 50%
}
.dropdown-dark:focus{
    background: #676a73;
   border-color: #002141;
}


</style>