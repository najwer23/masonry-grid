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

        let paddingLeft = 0;
        let paddingRight = 0;
        let paddingBottom = 0;
        //create new columns
        for (let i = 0; i < masonryNumberOfColumns; i++) {
            let newDivColumn = document.createElement("div");
            let newDivId = "masonry-col-" + i
            newDivColumn.id = newDivId;
            masonryParent.appendChild(newDivColumn)

            //first and last column
            if ((i%(masonryNumberOfColumns-1)) == 0) {
                if (i==0) {
                    paddingLeft = 0;
                    paddingRight = masonryParentColumnsSpace / 2;
                } else {
                    paddingLeft = masonryParentColumnsSpace /2;
                    paddingRight = 0;
                }
            } else {
                paddingLeft = masonryParentColumnsSpace / 2
                paddingRight = masonryParentColumnsSpace / 2
            }

            // zero if one column
            if (masonryNumberOfColumns == 1) {
                paddingLeft = 0;
                paddingRight = 0;
            }

            let paddingWidth = paddingLeft + paddingRight;
            addCss2Element(newDivColumn, {
                'background-color': 'yellow',
                'color': 'red',
                'float': "left",
                'width': `calc((100% / ${masonryNumberOfColumns}) - ${paddingWidth+"px"})`,
                'padding': `0 ${paddingRight+"px"} ${paddingBottom+"px"} ${paddingLeft+"px"}` 
            })
            currentColumns = masonryNumberOfColumns
        }
    }

    // set height for columns
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
        let ele = document.querySelector("#masonry-child-" + i)
        addCss2Element(ele, {
            'margin-bottom': `${masonryParentColumnsSpace + "px"}`
        })
        document.querySelector("#" + colMinHeightName).appendChild(ele)
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

function addCss2Element(element, style) {
    for (const property in style) {
        element.style[property] = style[property];
    }    
}