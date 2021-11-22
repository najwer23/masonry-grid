// let masonry = document.querySelector("#masonry")
// let masonryChilds = document.querySelectorAll("#masonry > *")
// let bodyClientWidth = document.body.clientWidth;
// let masonryNumOfColumnsJSON = JSON.parse(masonry.getAttribute("columns"))
// let masonryNumOfColumns = 1;


var currentColumns = -1
var percentScroll;

//In
var masonryParent = document.querySelector("#masonry")

window.onload = () => {
    makeMasonryLayout(masonryParent)
};

window.addEventListener('resize', function(){
    makeMasonryLayout(masonryParent)
    var Ypos = document.body.scrollHeight * percentScroll;
    window.scrollTo(0, Ypos);
})

window.addEventListener("scroll", getScrollPercent);
function getScrollPercent() {
    percentScroll = window.pageYOffset / document.body.scrollHeight;
}

function makeMasonryLayout(masonryParent) {
    addCss2Element(masonryParent, {
    })

    let masonryChilds = masonryParent.querySelectorAll('[id^="masonry-child-"]');
    let masonryParentWidth = masonryParent.clientWidth;
    let masonryParentColumnsDictionary = JSON.parse(masonryParent.getAttribute("columns"))
    let masonryParentColumnsSpace = masonryParent.getAttribute("space")

    let masonryNumberOfColumns = findNumberOfColumns(masonryParentWidth, masonryParentColumnsDictionary)
    // console.log(masonryNumberOfColumns)


    //set columns
    if (currentColumns != masonryNumberOfColumns) {

        //reset child position in columns
        for (let i = 0; i < masonryChilds.length; i++) {
            masonryParent.appendChild(document.querySelector("#masonry-child-"+i))
        }

        //remove old columns
        let divColumnToRemove = document.querySelectorAll('[id^="masonry-col-"]')
        for (let i = 0; i < divColumnToRemove.length; i++) {
            masonryParent.removeChild(divColumnToRemove[i])
        }

        //create new columns
        for (let i = 0; i < masonryNumberOfColumns; i++) {
            let newDivColumn = document.createElement("div");
            let newDivId = "masonry-col-" + i
            newDivColumn.id = newDivId;
            masonryParent.appendChild(newDivColumn)
            addCss2Element(newDivColumn, {
                'background-color': 'yellow',
                'color': 'red',
                'float': "left",
                'width': `calc((100% / ${masonryNumberOfColumns}) )`
            })
            currentColumns = masonryNumberOfColumns
        }
    }

    var allCurrentColumnsId = {};
    let allCurrentColumnsIdNodeList = document.querySelectorAll('[id^="masonry-col-"]')
    for (let i = 0; i < allCurrentColumnsIdNodeList.length; i++) {
        allCurrentColumnsId[allCurrentColumnsIdNodeList[i].id] = 0;
    }

    //insert childs in new columns
    for (let i=0; i<masonryChilds.length; i++) {
        let heightChild = document.querySelector("#masonry-child-" + i).clientHeight;

        let allCurrentColumnsIdKeys = Object.keys(allCurrentColumnsId)
        let colMinHeightName = ""
        let colMinHeightValue = Infinity
        
        for (let j = allCurrentColumnsIdKeys.length-1; j>=0; j--) {
            if (allCurrentColumnsId[allCurrentColumnsIdKeys[j]] <= colMinHeightValue) {
                colMinHeightName = allCurrentColumnsIdKeys[j];
                colMinHeightValue = allCurrentColumnsId[allCurrentColumnsIdKeys[j]]
            }
        }

        allCurrentColumnsId[colMinHeightName] += heightChild;
        document.querySelector("#" + colMinHeightName).appendChild(document.querySelector("#masonry-child-" + i))
    }
}



function findNumberOfColumns(currentWidth, dictionary) {
    let dictionaryKeys = Object.keys(dictionary).map(v=>+v).sort((a,b)=>a-b)
    let numberOfColumns = 4; 

    for (let i=0; i<dictionaryKeys.length; i++) {
        if (currentWidth <= dictionaryKeys[i]) {
            numberOfColumns = dictionary[dictionaryKeys[i]]
            break;
        }
    }

    return numberOfColumns
}




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