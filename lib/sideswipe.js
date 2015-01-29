'use strict';

var TWEEN = require('tween.js');
var getComputedStyle = require('./getComputedStyle');

function sideswipe(options){

   // Default options
   var defaults = {
      overlay: true,
      overlayOpacity:.25,
      pan: true,
      side: 'left',
      menuHandleClass: 'sideswipe-handle',
      menuPanelClass: 'sideswipe-menu',
      pageClass: 'sideswipe-page',
      overlayClass: 'sideswipe-overlay',
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

   // Set local variables
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

   // Set a proper z-index on the menu
   menuPanel.style.zIndex = 999;

   // Menu handle click event
   var menuHandleClickEvent = function(e) {
      e.preventDefault();
      if(!isRunning){
         isRunning = true;
         if(!isOpen){
            open(menuPanel, menuSide);
         }else{
            close(menuPanel, menuSide);
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
      if(opts.overlay)
         showOverlay()
      isOpen = true;
   };

   // Close navigation panel
   var close = function(el, side) {
      var dir = (side == 'left') ? '-' : '+';
      tweenX(el, dir + menuPanelWidth);
      if(pan)
         tweenX(page, dir + menuPanelWidth);
      if(opts.overlay)
         closeOverlay()
      isOpen = false;
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

   // Show overlay
   var showOverlay = function() {
      var overlay = document.createElement('div');
      overlay.className = opts.overlayClass;
      overlay.style.cssText = 'position:fixed;left:0;top:0;right:0;bottom:0;opacity:0';
      overlay.style.backgroundColor = 'rgba(0,0,0,'+opts.overlayOpacity+')';
      overlay.style.zIndex = parseInt(getComputedStyle(menuPanel, 'zIndex')) - 1;
      document.body.appendChild(overlay);
      fadeIn(overlay);

      // Overlay click handler
      var overlayClickEvent = function(e) {
         e.preventDefault();
         if(!isRunning){
            isRunning = true;
            close(menuPanel, menuSide);
         }
      };

      overlay.addEventListener('click', overlayClickEvent, false);

   };

   // Fade-in overlay
   var fadeIn = function(el) {

      new TWEEN.Tween(el, { opacity : 0 }).to({
         opacity : 1
      }, 300).onUpdate(function() {
         el.style.opacity = this.opacity;
      }).start();

      var animate = function(e) {
         TWEEN.update(e);
         requestAnimationFrame(animate);
      };

      animate();
   };

   // Close overlay
   var closeOverlay = function() {
      var overlay = document.getElementsByClassName(opts.overlayClass)[0];
      fadeOut(overlay);
   };

   // Fade-out overlay
   var fadeOut = function(el) {

      new TWEEN.Tween(el, { opacity : 1 }).to({
         opacity : 0
      }, 300).onUpdate(function() {
         el.style.opacity = this.opacity;
      }).onComplete(function(){
         el.parentNode.removeChild(el);
      }).start();

      var animate = function(e) {
         TWEEN.update(e);
         requestAnimationFrame(animate);
      };

      animate();
   };
}

module.exports = sideswipe;
