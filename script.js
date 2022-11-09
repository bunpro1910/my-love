window.onload =(e)=>{
    const elts = {
        text1: document.getElementById("text1"),

    };
    
    const texts = [
        "Yêu",
        "Bé",
        "Trúc",
        "Nhiều",
        "Nhắmmm",
        "❤❤❤"
    ];
    
    const morphTime = 1.5;
    const cooldownTime = 0.25;
    
    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;
    
    elts.text1.textContent = texts[textIndex % texts.length];

    
  
    
    function doMorph() {
        morph -= cooldown;
        cooldown = 0;
    
        let fraction = morph / morphTime;
    
        if (fraction > 1) {
            cooldown = cooldownTime;
            fraction = 1;
        }
    
        setMorph(fraction);
    }
    
    function setMorph(fraction) {

    
        fraction = 1 - fraction;
        elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
        elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

        elts.text1.textContent = texts[textIndex % texts.length];

    }
    
    function doCooldown() {
        morph = 0;
        console.log(textIndex)
        if (texts[textIndex % texts.length+1]=="❤❤❤"){
            elts.text1.style.color = "red";
        }else{
            elts.text1.style.color = "white";
        }
        elts.text1.style.filter = "";
        elts.text1.style.opacity = "0%";
    }
    
    function animate() {
        requestAnimationFrame(animate);
    
        let newTime = new Date();
        let shouldIncrementIndex = cooldown > 0;
        let dt = (newTime - time) / 1000;
        time = newTime;
        
        cooldown -= dt;
    
        if (cooldown <= 0) {
            if (shouldIncrementIndex) {
                textIndex++;
            }
    
            doMorph();
        } else {
            doCooldown();
        }
    }
    
    animate();
}
