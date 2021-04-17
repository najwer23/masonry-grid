class Main {
    constructor (params) {
        this.name = params.name
    }

    sayHello() {
        console.log("Hello " + this.name)
    }
};


















//The load event fires when a given resource has loaded.
window.onload = () => {
    // console.log("All resource has loaded")
    // let main = new Main({name: "Mariusz Najwer"})
    // main.sayHello()
}

//The DOMContentLoaded event fires when the initial 
//HTML document has been completely loaded and parsed, 
//without waiting for stylesheets, images, and subframes
//to finish loading.
window.addEventListener('DOMContentLoaded', () => {
    let masonry = document.querySelector("#masonry")
    let masonryChilds = document.querySelectorAll("#masonry > *")
    let bodyClientWidth = document.body.clientWidth;
    let masonryNumOfColumnsJSON = JSON.parse(masonry.getAttribute("columns"))
    let masonryNumOfColumns = 1;

    for(let i in masonryNumOfColumnsJSON) {
        if (masonryNumOfColumnsJSON[i] < bodyClientWidth) {
            masonryNumOfColumns = i
        }
    }

    let masonryClientWidth = masonryChilds[0].offsetWidth;
    let masonryColumnWidth = masonryClientWidth / masonryNumOfColumns;
    let masonryParents = [];
    
    console.log(bodyClientWidth)
    console.log(masonryNumOfColumns)

    // stworz głowny box masonry
    addCss(masonry, {
        'display': 'block',
        'justify-content': 'space-between',
        'flex-wrap': 'wrap',
        'background-color': 'pink',
        'width': '100%'
    })
    
    //create columns
    for (let i=masonryNumOfColumns-1; i>=0; i--) {
        let newColumnDiv = document.createElement("div");
        newColumnDiv.setAttribute("id", 'masonry-column'+i);
        addCss(newColumnDiv, {
            'background-color': 'yellow',
            'color': 'red',
            'width': '50%'//`${masonryColumnWidth-masonryNumOfColumns*5}px`
        })
        masonryParents.push({element: newColumnDiv, contentHeight: 0})
        masonry.appendChild(newColumnDiv)
    }

    //wrzuc dzieci do rodzica  
    for (let i=0; i<Array.from(masonryChilds).length; i++) {
        let maxValue = Infinity;
        let minIndex = Infinity;
        for (let j=masonryParents.length-1; j>=0; j--) {
            let heightNowInColumn = document.querySelectorAll("#masonry #" + masonryParents[j].element.id + " > *")
            if (heightNowInColumn.length != 0) {
                masonryParents[j].contentHeight = [...heightNowInColumn].map(x=>x.offsetHeight).reduce((a,b)=>a+b,0)
            }            
            if (masonryParents[j].contentHeight <= maxValue) {
                maxValue = masonryParents[j].contentHeight;
                minIndex = j;
            }
        }
        masonryParents[minIndex].element.appendChild(masonryChilds.item(i))  
    }  
});

function addCss(element, style) {
    for (const property in style)
        element.style[property] = style[property];
}