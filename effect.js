class Effect{
    constructor(canvas, video) {
        this.canvas = canvas
        this.video =video
        this.ctx = canvas.getContext("2d")
        this.#animate()
        this.bm = Math.hypot(canvas.width, canvas.height)
    }

    #animate(){
        const {ctx,bm, canvas, video} = this;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

        const imgData = ctx.getImageData(0,0,canvas.width, canvas.height)
        const mat = getPixelMatrix(imgData)
        const newImgData = ctx2.createImageData(myCanvas2.width, myCanvas2.height)
        const offset = {
            x: canvas.width/2,
            y: canvas.height/2,
        }
        for(let i = 0;i<newImgData.data.length;i+=4){
            const pIndex = i/4
            let x = pIndex%canvas.width
            let y = Math.floor(pIndex/canvas.width)

            
            let {mag, dir} = toPolar({x:x-offset.x, y:y-offset.y})
            mag = (bm*4*(mag/bm)**(2))
            const newXY = toXY({mag, dir})

            newXY.x = Math.round(newXY.x+offset.x)
            newXY.y = Math.round(newXY.y+offset.y)
            if(mag<bm/4 && newXY.x < canvas.width &&newXY.x >0&& newXY.y >0 && newXY.y < canvas.height){
                const {r, g, b, a} = mat[newXY.y][newXY.x]
                newImgData.data[i] = r
                newImgData.data[i+1] = g
                newImgData.data[i+2] = b
                newImgData.data[i+3] = a

            }

        }
        

        ctx2.putImageData(newImgData, 0, 0)

        requestAnimationFrame(this.#animate.bind(this))
    }
}