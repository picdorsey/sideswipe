'use strict';

var TWEEN = require('tween.js');
var getComputedStyle = require('./getComputedStyle');

function sideswipe(options){

   // Default options
   var defaults = {
      overlay: true,
      pan: true,
      side: 'left',
      menuHandleClass: 'sideswipe-handle',
      menuPanelClass: 'sideswipe-menu',
      pageClass: 'sideswipe-page',
      tween: TWEEN.Easing.Exponential.InOut
   };

   // Set the state of the menu
   var isOpen = false;

   // Replace any default attribute with those provided
   if(options){
      for (var attrname in options)
         defaults[attrname] = options[attrname];
   }
   var opts = defaults;

   // Set local object variables
   var pan = opts.pan;
   var body = document.getElementsByTagName('body')[0];
   var menuHandle = document.getElementsByClassName(opts.menuHandleClass)[0];
   var menuPanel = document.getElementsByClassName(opts.menuPanelClass)[0];
   var menuSide = opts.side;
   var page = document.getElementsByClassName(opts.pageClass)[0];
   var isRunning = false;

   // Get the width of the navigation panel
   var menuPanelWidth = parseInt(getComputedStyle(menuPanel, 'width'));

   // Set the left or right position based on the side
   if(menuSide == 'left') {
      menuPanel.style.left = '-' + menuPanelWidth + 'px';
      menuPanel.style.right = 'auto';
   } else {
      menuPanel.style.right = '-' + menuPanelWidth + 'px';
      menuPanel.style.left = 'auto';
   }

   // Menu handle click event
   var menuHandleClickEvent = function(e) {
      e.preventDefault();
      if(!isRunning){
         isRunning = true;
         if(!isOpen){
            open(menuPanel, menuSide);
            if(opts.overlay) { showOverlay() }
         }else{
            close(menuPanel, menuSide);
            if(opts.overlay) { closeOverlay() }
         }
      }
   };

   menuHandle.addEventListener('click', menuHandleClickEvent, false);

   // Open navigation panel
   var open = function(el, side) {
      var dir = (side == 'left') ? '+' : '-';
      tweenX(el, dir + menuPanelWidth);

      if(pan)
         tweenX(page, dir + menuPanelWidth);
      //body.style.overflow = 'hidden';
      isOpen = true;
   };

   // Close navigation panel
   var close = function(el, side) {
      var dir = (side == 'left') ? '-' : '+';
      tweenX(el, dir + menuPanelWidth);
      if(pan)
         tweenX(page, dir + menuPanelWidth);
      //body.style.overflow = 'auto';
      isOpen = false;
   };

   // Show overlay
   var showOverlay = function() {
      //console.log("Overlay in...");
   };

   // Show overlay
   var closeOverlay = function() {
      //console.log("Overlay out...");
   };

   // Re-usable tween method
   var tweenX = function(el, to) {

      new TWEEN.Tween(el).to({
         x: to
      }, 600).easing(opts.tween).onUpdate(function() {
         el.style.transform = 'translateX(' + this.x + 'px)';
      }).onComplete(function(){
         isRunning = false;
      }).start();

      var animate = function(e) {
         TWEEN.update(e);
         requestAnimationFrame(animate);
      };

      animate();
   };
}

module.exports = sideswipe;
