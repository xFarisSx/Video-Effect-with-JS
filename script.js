const video = document.createElement("video")
const ctx2 = myCanvas2.getContext("2d")
navigator.mediaDevices.getUserMedia({video:true}).then(function(stream){
    video.srcObject = stream
    video.play()
    video.onloadeddata = beginEffect
}).catch(err=> console.log(err))

function beginEffect(e){
    myCanvas.width = video.videoWidth
    myCanvas.height = video.videoHeight
    myCanvas2.width = video.videoWidth
    myCanvas2.height = video.videoHeight

    new Effect(myCanvas, video)
}