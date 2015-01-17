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
    pan: true,
    side: 'left',
    menuHandleClass: 'sideswipe-handle',
    menuPanelClass: 'sideswipe-menu',
    pageClass: 'sideswipe-page',
    tween: TWEEN.Easing.Exponential.InOut
});
```

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

<nav class="side-nav sideswipe-menu">
    <ul>
        <li><a href="#">Item One</li>
        <li><a href="#">Item One</li>
    </ul>
</nav>

```

## Credits

SideSwipe is maintained by [Piccirilli Dorsey](https://github.com/picdorsey)

## License

[MIT](LICENSE)