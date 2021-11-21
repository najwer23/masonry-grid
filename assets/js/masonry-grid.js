// let masonry = document.querySelector("#masonry")
// let masonryChilds = document.querySelectorAll("#masonry > *")
// let bodyClientWidth = document.body.clientWidth;
// let masonryNumOfColumnsJSON = JSON.parse(masonry.getAttribute("columns"))
// let masonryNumOfColumns = 1;



window.addEventListener('resize', function(){
    console.log("maruszz")
})





// masonryParents[minIndex].element.appendChild(masonryChilds.item(i))


// addCss(newColumnDiv, {
//     'background-color': 'yellow',
//     'color': 'red',
//     'width': '50%'//`${masonryColumnWidth-masonryNumOfColumns*5}px`
// })


function addCss2Element(element, style) {
    for (const property in style) {
        element.style[property] = style[property];
    }    
}