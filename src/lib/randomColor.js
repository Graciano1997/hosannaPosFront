export const RandomColor=()=>{
    return {
        background:`rgba(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${0.4})`,
        borderColor:`rgba(${Math.floor(Math.random()*100)},${Math.floor(Math.random()*20)},${Math.floor(Math.random()*100)},${0.8})`
    }
}
