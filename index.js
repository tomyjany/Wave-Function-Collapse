const init = () => {
    let array = get_array() // vytvoření pole podle parametrů v url
    array = waveFunctionCollapse(array);
    
    
    disp_array(array) // výpis pole do konzole
    display_map(array) // vykreslení mapy podle pole
    console.log(array)
}

const get_array = () => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    let x = urlParams.get("height")
    let y = urlParams.get("width")
    let array = []
    for (let i = 0; i < x; i++) {
        array.push([])
        for (let j = 0; j < y; j++) {
            array[i].push(0)
        }
    }
    return array
}

const get_image = (id) => {
    switch (id) {
       case 1:
            return "imgs/cross.png"
        case 2:
            return "imgs/downleft.png"
        case 3:
            return "imgs/start.png"
        case 4:
            return "imgs/upleft.png"
        case 5:
            return "imgs/upright.png"
    }
}

const disp_array = (array) => {
    for (let i = 0; i < array.length; i++) {
        let row = ""
        for (let j = 0; j < array[0].length; j++) {
            row += array[i][j]
        }
        //console.log(row)
    }

}

const display_map = (array) => {
    let id = document.getElementById("map");
    for (let i = 0; i < array.length; i++) {
        let row = document.createElement("tr")
        id.append(row)
        for (let j = 0; j < array[0].length; j++) {
            let col = document.createElement("td")
            row.append(col)
            let img = document.createElement("img")
            img.src = get_image(array[i][j])
            col.append(img)
        }
    }
}

document.addEventListener("DOMContentLoaded", init)