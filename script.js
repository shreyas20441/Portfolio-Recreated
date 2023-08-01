var timeout;

const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});



function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from('#nav',{
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelem",{
        y:0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: .2
    })
    .from("#herofooter",{
        y:-10,
        opacity:0,
        duration:1.5,
        delay:-1,
        ease:Expo.easeInOut
    })
}



function circleSkew(){
    //define default scale value
    var xScale = 1;
    var yScale = 1;

    var xPrev = 0;
    var yPrev = 0;
    window.addEventListener('mousemove', (dts)=>{
        clearTimeout(timeout)

        xScale = gsap.utils.clamp(.8, 1.2, dts.clientX - xPrev);
        yScale = gsap.utils.clamp(.8, 1.2, dts.clientY -yPrev);


        xPrev = dts.clientX;
        yPrev = dts.clientY;

        circleMouseFollower(xScale, yScale)

        timeout = setTimeout(() => {
            document.querySelector('#minicircle').style.transform = `translate(${dts.clientX}px, ${dts.clientY}px) scale(${1},${1}) `

        }, 100);
    })
}

function circleMouseFollower(xScale, yScale){
    window.addEventListener('mousemove',(dts)=>{
        document.querySelector('#minicircle').style.transform = `translate(${dts.clientX}px, ${dts.clientY}px) scale(${xScale},${yScale}) `
    })
}


circleSkew();
firstPageAnim();






//

document.querySelectorAll(".elem").forEach(function (elem){
    var rotate = 0;
    var diff1 = 0;

    elem.addEventListener("mouseleave", function (dts){

        gsap.to(elem.querySelector("img"),{
            opacity: 0,
            ease: Power3,
            duration: 0.5
        })
    })
    elem.addEventListener("mousemove", function (dts){

        var diff = dts.clientY - elem.getBoundingClientRect().top;

        diff1 = dts.clientX - rotate;
        rotate = dts.clientX;

        var rot = gsap.utils.clamp(-20, 20, diff1 * 0.5);
        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dts.clientX,
            rotate: rot,
        })
    })
})
