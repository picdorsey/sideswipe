'use strict';

var TWEEN = require('tween.js');
var getComputedStyle = require('./getComputedStyle');

function SideSwipe(options){

   // Default options
   var defaults = {
      pan: true,
      side: 'right',
      menuHandleClass: 'backside-handle',
      menuPanelClass: 'backside-menu',
      pageClass: 'backside-page',
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

   // Get the width of the navigation panel
   var menuPanelWidth = parseInt(getComputedStyle(menuPanel, 'width'));

   // Set the left or right position based on the side
   if(menuSide == 'left') {
      menuPanel.style.left = '-' + menuPanelWidth + 'px';
      menuPanel.style.right = 'auto';
   }else{
      menuPanel.style.right = '-' + menuPanelWidth + 'px';
      menuPanel.style.left = 'auto';
   }

   // Menu handle click event
   var menuHandleClickEvent = function(e){
      e.preventDefault();
      if(!isOpen)
         openBackside(menuPanel, menuSide);
      else
         closeBackside(menuPanel, menuSide);
   };

   menuHandle.addEventListener('click', menuHandleClickEvent, false);

   // Open Backside navigation panel
   var openBackside = function(el, side){
      var dir = (side == 'left') ? '+' : '-';
      tweenX(el, dir + menuPanelWidth);

      if(pan)
         tweenX(page, dir + menuPanelWidth);
      //body.style.overflow = 'hidden';
      isOpen = true;
   };

   // Close Backside navigation panel
   var closeBackside = function(el, side){
      var dir = (side == 'left') ? '-' : '+';
      tweenX(el, dir + menuPanelWidth);
      if(pan)
         tweenX(page, dir + menuPanelWidth);
      //body.style.overflow = 'auto';
      isOpen = false;
   };

   // External close method
   var close = function(){
      console.log("here again");
   };

   // Re-usable tween method
   var tweenX = function(el, to){

      new TWEEN.Tween(el).to({
             x: to
          }, 600).easing(opts.tween).onUpdate(function() {
             el.style.transform = 'translateX(' + this.x + 'px)';
          }).start();

      var animate = function(e) {
         TWEEN.update(e);
         requestAnimationFrame(animate);
      };

      animate();
   };

   // Output to the console that we have loaded
   console.log('Backside loaded successfully.');
}

module.exports = SideSwipe;