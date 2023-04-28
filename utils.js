function getPixelMatrix(imgData){
    const mat = new Array(imgData.height)
    for (let i=0; i< imgData.height;i++){
        mat[i] = new Array(imgData.width)
    }

    for(let i=0;i<imgData.data.length;i+=4){
        const pColor = {
            r:imgData.data[i],
            g:imgData.data[i+1],
            b:imgData.data[i+2],
            a:imgData.data[i+3]
        }
        const pIndex = i/4
        let y = Math.floor(pIndex/imgData.width)
        let x = pIndex%imgData.width

        mat[y][x] = pColor
    }

    return mat
}

function toPolar({x, y}){
    return {
        dir:direction({x, y}),
        mag:magnitude({x, y})
    }
}

function magnitude({x, y}) {
    return Math.hypot(x, y)
}

function direction({x, y}) {
    return Math.atan2(y, x)
}

function toXY({mag, dir}){
    return {
        x: Math.cos(dir)*mag,
        y: Math.sin(dir)*mag,
    }
}

function add(p1 , p2) {
    return {
        x:p1.x+p2.x,
        y:p1.y+p2.y,
    }
}
function subtract(p1 , p2) {
    return {
        x:p1.x-p2.x,
        y:p1.y-p2.y,
    }
}