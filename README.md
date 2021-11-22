# Masonry Grid
IE11, Chrome, Firefox, Edge

## Inside
- Babel, 
- CSS, 
- JavaScript
- FontAwesome 5
- Font Muli
- Webpack 
    - MiniCssExtractPlugin
    - HtmlWebpackPlugin
    - File manager
- HTML template

## Usage

```sh
<div id="container">
    <div id="masonry" columns='{"400": 1, "800": 2, "1500": 3}' space='30'>
        <div id="masonry-child-0"></div>
        <div id="masonry-child-1"></div>
        <div id="masonry-child-2"></div>
    </div>
</div>

<div id="container">
    <div id="masonry2" columns='{"400": 1, "800": 2, "1500": 3}' space='30'>
        <div id="masonry-child-0"></div>
        <div id="masonry-child-1"></div>
        <div id="masonry-child-2"></div>
    </div>
</div>
```

Remember to set your masonry on masonry-grid.js
```sh
let MASONRY_ARR_ID = [
    "masonry",
    "masonry2"
]

```
- 400, 800, 1500 - custom breakpoints
- 1, 2, 3 - number of columns for breakpoints
- 30 - space between masonry-child 

### Installation
```sh
$ yarn install
```

### Dev
```sh
$ yarn start
```

### Production
```sh
$ yarn build
```

### Deploy
```sh
$ yarn deploy
```

### Author
Mariusz Najwer
[https://najwer23.github.io/](https://najwer23.github.io/)

### License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
