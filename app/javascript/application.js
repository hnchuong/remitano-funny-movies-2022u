// Entry point for the build script in your package.json
// import "@hotwired/turbo-rails"
import { Turbo } from "@hotwired/turbo-rails"
Turbo.session.drive = false
import "./controllers"
require("@rails/ujs").start()

import * as bootstrap from "bootstrap"

import jquery from "jquery"
window.jQuery = jquery
window.$ = jquery

$(function() {
  localStorage.currentUser = $('body').data()['currentUser'];
  localStorage.authToken = document.getElementsByName('csrf-token')[0].content;
})

import "./components/application";
