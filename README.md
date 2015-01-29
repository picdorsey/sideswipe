# SideSwipe
### A trendy JS side menu component.

SideSwipe is a really simple side menu component written in vanilla JS.

- **[Changelog](https://github.com/picdorsey/sideswipe/releases)**
- **[Issues](https://github.com/picdorsey/sideswipe/issues)**

## Requirments
- [Tween.js](https://github.com/sole/tween.js/)

## Installation

```
npm install sideswipe
```

## Usage

Require it:

```
var Menu = require('sideswipe');
```

Initialize it:

```
window.onload = function(){
    new Menu();
};
```

Customize the menu:

```
new Menu({
    overlay: true,
    overlayOpacity:.25,
    pan: true,
    side: 'left',
    menuHandleClass: 'sideswipe-handle',
    menuPanelClass: 'sideswipe-menu',
    pageClass: 'sideswipe-page',
    tween: TWEEN.Easing.Exponential.InOut
});
```

SideSwipe uses the wonderful tween.js package. The default easing is InOut, you can pass it anything listed [here](http://sole.github.io/tween.js/examples/03_graphs.html).

SideSwipe requires the menuHandle, menuPanel and page classes to be defined.

Here is some HTML to get you started:

```
<header>
    <a class="sideswipe-handle" href="#">
        <span class="hamburger-icon"></span>
    </a>
</header>

<div id="content" class="sideswipe-page" role="main">
    ...
</div>

<nav class="sideswipe-menu">
    <ul>
        <li><a href="#">Item One</li>
        <li><a href="#">Item One</li>
    </ul>
</nav>

```

And some CSS for the sideswipe-menu:

```
.sideswipe-menu{
    position: fixed;
    top: 0;
    left: -270px;
    bottom: 0;
    width: 270px;
    background-color: #efefef;
    z-index: 9999;
    overflow-y: auto;
}
```

## Credits

SideSwipe is maintained by [Piccirilli Dorsey](https://github.com/picdorsey)

## License

[MIT](LICENSE)