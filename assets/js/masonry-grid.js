var CURRENT_NUMBER_OF_COLUMNS = -1
var SCROLL_PERCENT_POSITION;

// IN - SET ID OF Masonry
let MASONRY_ARR_ID = [
    "masonry"
]





window.addEventListener('load', (event) => {
    setMasonryOnLoad();
});

window.addEventListener('resize', function(){
    setMasonryOnResize();
    //remember scroll position when resize
    window.scrollTo(0, document.body.scrollHeight * SCROLL_PERCENT_POSITION);
})

window.addEventListener("scroll", function(){
    SCROLL_PERCENT_POSITION = window.pageYOffset / document.body.scrollHeight;
});





function setMasonryOnResize() {
    for (let i = 0; i < MASONRY_ARR_ID.length; i++) {
        makeMasonryLayout(document.querySelector("#" + MASONRY_ARR_ID[i]))
    }
}

function setMasonryOnLoad() {
    let ele;
    for (let i=0; i<MASONRY_ARR_ID.length; i++) {
        ele = document.querySelector("#" + MASONRY_ARR_ID[i])
        addCss2Element(ele, {
            "box-sizing": "border-box"
        })
        makeMasonryLayout(ele)
    }
}

function makeMasonryLayout(masonryParentEle) {
    let masonryChilds = masonryParentEle.querySelectorAll('[id^="masonry-child-"]');
    let masonryParentEleWidth = masonryParentEle.clientWidth;
    let masonrySpace = masonryParentEle.getAttribute("space");
    let masonrySpaceHalf = masonrySpace/2;
    let masonryNumberOfColumns = findNumberOfColumns(
        masonryParentEleWidth, 
        JSON.parse(masonryParentEle.getAttribute("columns"))
    )

    //set columns
    if (CURRENT_NUMBER_OF_COLUMNS != masonryNumberOfColumns) {
        
        //reset child position in columns
        for (let i = 0; i < masonryChilds.length; i++) {
            masonryParentEle.appendChild(masonryParentEle.querySelector("#masonry-child-"+i))
        }

        //remove old columns
        let masonryColumnsToRemove = document.querySelectorAll('[id^="masonry-col-"]')
        for (let i = 0; i < masonryColumnsToRemove.length; i++) {
            masonryParentEle.removeChild(masonryColumnsToRemove[i])
        }

        //create new columns
        let paddingLeft = 0;
        let paddingRight = 0;
        let paddingBottom = 0;
        let newMasonryColumn;
        let paddingLeftRight;

        for (let i = 0; i < masonryNumberOfColumns; i++) {
            newMasonryColumn = document.createElement("div");
            newMasonryColumn.id = "masonry-col-" + i;
            masonryParentEle.appendChild(newMasonryColumn)

            //set padding for first and last column
            if ((i % (masonryNumberOfColumns-1)) == 0) {
                paddingRight = (i==0) ? masonrySpaceHalf : 0;
                paddingLeft = (i!=0) ? masonrySpaceHalf : 0;
            } else {
                paddingLeft = masonrySpaceHalf
                paddingRight = masonrySpaceHalf
            }

            //set zero padding if masonry has one column
            if (masonryNumberOfColumns == 1) {
                paddingLeft = 0;
                paddingRight = 0;
            }

            //set padding in column
            paddingLeftRight = paddingLeft + paddingRight;
            addCss2Element(newMasonryColumn, {
                "background": "inherit",
                'float': "left",
                'width': `calc(100% / ${masonryNumberOfColumns})`,
                'padding': `0 ${paddingRight+"px"} ${paddingBottom+"px"} ${paddingLeft+"px"}` 
            })

            // update number of columns
            CURRENT_NUMBER_OF_COLUMNS = masonryNumberOfColumns
        }
    }

    // set starting height for columns
    var masonryColumnsCurrentHeight = {};
    let masonryColumnsCurrent = masonryParentEle.querySelectorAll('[id^="masonry-col-"]')
    for (let i = 0; i < masonryColumnsCurrent.length; i++) {
        masonryColumnsCurrentHeight[masonryColumnsCurrent[i].id] = 0;
    }

    //insert childs in new columns
    let masonryChildHeight;
    let masonryColumnsCurrentHeightKeys = Object.keys(masonryColumnsCurrentHeight)
    let masonryColumnMinHeightName = "";


    for (let i=0; i<masonryChilds.length; i++) {
        let masonryChildEle = masonryParentEle.querySelector("#masonry-child-" + i)
        masonryChildHeight = masonryChildEle.clientHeight;

        let masonryColumnMinHeightValue = Infinity
        for (let j = masonryColumnsCurrentHeightKeys.length-1; j>=0; j--) {
            if (masonryColumnsCurrentHeight[masonryColumnsCurrentHeightKeys[j]] <= masonryColumnMinHeightValue) {
                masonryColumnMinHeightName = masonryColumnsCurrentHeightKeys[j];
                masonryColumnMinHeightValue = masonryColumnsCurrentHeight[masonryColumnsCurrentHeightKeys[j]]
            }
        }

        masonryColumnsCurrentHeight[masonryColumnMinHeightName] += masonryChildHeight;
        addCss2Element(masonryChildEle, {
            'margin-bottom': `${masonrySpace + "px"}`
        })
        masonryParentEle.querySelector("#" + masonryColumnMinHeightName).appendChild(masonryChildEle)
    }
    
    for (let i = 0; i < masonryColumnsCurrent.length; i++) {
        masonryColumnsCurrentHeight[masonryColumnsCurrent[i].id] = masonryColumnsCurrent[i].clientHeight;
    }
    addCss2Element(masonryParentEle.parentElement, {
        "height": Math.max(...Object.keys(masonryColumnsCurrentHeight).map(key => masonryColumnsCurrentHeight[key])) + "px"
    })
}

function findNumberOfColumns(parentWidth, dictionary) {
    let dictionaryKeys = Object.keys(dictionary).map(v=>+v).sort((a,b)=>a-b)

    // set default columns
    let numberOfColumns = 4; 

    for (let i=0; i<dictionaryKeys.length; i++) {
        if (parentWidth <= dictionaryKeys[i]) {
            numberOfColumns = dictionary[dictionaryKeys[i]]
            break;
        }
    }

    return numberOfColumns;
}

function addCss2Element(element, style) {
    for (const property in style) {
        element.style[property] = style[property];
    }    
}