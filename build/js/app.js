(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FindEpicodus = exports.FindEpicodus = function FindEpicodus() {
  _classCallCheck(this, FindEpicodus);
};

},{}],2:[function(require,module,exports){
"use strict";

var _FindEpicodus = require("./../js/FindEpicodus.js");

$(document).ready(function () {
  $("#button").click(function () {
    var word = $("#input").val();
    $.get("http://api.wordnik.com:80/v4/word.json/" + word + "?useCanonical=false&includeSuggestions=true&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5").then(function (response) {
      if (response.canonicalForm != undefined) {
        $("#output").text("" + response.canonicalForm);
      } else {
        $("#output").text("That ain't a word");
      }
    }).fail(function (error) {
      alert("Please");
    });
  });
});

},{"./../js/FindEpicodus.js":1}]},{},[2]);
