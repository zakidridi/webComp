import './libs/webaudio-controls.js';

const getBaseURL = () => {
    return new URL('.', import.meta.url);
};

const template = document.createElement("template");
template.innerHTML = /*html*/`
  <style>
  
.body{
    margin: 0;
	padding: 0;
	font-family: Arial, Helvetica, sans-serif;
	height: 100vh;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
  .main{
	position: relative;
	height: 80%;
	width: 80%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(to right, #636e72, #b2bec3);
}

.right,.left{
	position: relative;
	height: 100%;
	width: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}
.left #title{
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    text-transform: capitalize;
    color: #fff;
    font-size: 35px;
 }
 .left #artist{
     position: absolute;
     top: 70px;
     left: 50%;
     transform: translateX(-50%);
     text-transform: capitalize;
     color: #fff;
     font-size: 18px;
 }
.left .img{
	height: 200px;
	width: 80%;
    margin-top: 100px;
	border-radius: 15px;
	box-shadow: 1px 0px 20px 12px rgba(240,240,240,0.2);
}

.left #progress{
    width:80%;
}

.right canvas{
    height: 100px;
	width: 80%;
    margin-top: 20px;
	border-radius: 15px;
	box-shadow: 1px 0px 20px 12px rgba(240,240,240,0.2);
    background-color:black;
}
.left .middle{
    width: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   
}
.left .middle .button{
   border: none;
   height: 70px;
   width: 70px;
   border-radius: 50%;	
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
   outline: none;
   transition: 0.5s;
   background: rgba(178, 190, 195,1.0);
}
.right .equalizer{
    width:60%;
    color:white;
    background-color:#2d3436;
    margin-top:30px;
    padding:5px;
    border-radius:5px;
}

.left .button:hover{
	background: #fdcb6e;
}
.left i:before{
	color: #fff;
	font-size: 20px;
}
.btn-nav{
    position: relative;
	height: 20%;
	width: 60%;
	display: flex;
	align-items: center;
	justify-content: center;
	
}
.btn-right,.btn-left{
    position: relative;
	height: 100%;
	width: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
}
.loop{
    position: absolute;
    margin-left: 400px;
    display: inline-block;
    width: 60px;
    height: 34px;
}


  </style>
  <div class="body">
    <div class="main">
            <div class="left">
                <p id="title">Miage.mp3</p>
                <p id="artist">Dridi Zakaria</p>
                <img class="img" id="track_image" src="./myComponents/assets/imgs/jazzbook.jpg">
                
                <audio id="myPlayer" crossorigin="anonymous"></audio>
                Progression : <input id="progress" type="range" value="0">
                 <label id="progressvalue" for="progress" ></label>
                </br>

                <div class="middle">
                    <div class="button" id="recule10"><img src="https://img.icons8.com/fluent-systems-regular/24/000000/replay-10.png" alt="Backward"/></div>
                    <div class="button" id="play"><img src="https://img.icons8.com/android/24/000000/play.png" alt="Play"/></div> 
                    <div class="button" id="pause"><img src="https://img.icons8.com/android/24/000000/pause.png" alt="Pause"/></div>
                    <div class="button" id="stop"><img src="https://img.icons8.com/android/24/000000/stop.png" alt="stop"/></div>
                    <div class="button" id="avance10"><img src="https://img.icons8.com/fluent-systems-regular/24/000000/forward-10.png" a alt="Forward"/></div>
                    <div class="button" id="retoura0"><img src="https://img.icons8.com/material-outlined/24/000000/creative-commons-zero.png" alt="Retour à zero"></div>
                </div>
                
            </div>
            <div class="right">
                <canvas id="myCanvas" width=400></canvas>
                <canvas id="myCanvas2" width=400></canvas>
                    
                <div class="equalizer" id="equalizer-inputs">
                    <CENTER>
                    <label >Band 00060Hz:   </label>
                    <input id="eq-in-1" type="range" min="-20" max="20" value="0" step="0.1">
                    <label id="eq-value" for="eq-1">0</label>
                    <br>   
                    <label >Band 00170Hz:  </label>
                    <input id="eq-in-2" type="range" min="-20" max="20" value="0" step="0.1">
                    <label id="eq-value" for="eq-2">0</label>
                    <br>
                    <label >Band 00350Hz:  </label>
                    <input id="eq-in-3" type="range" min="-20" max="20" value="0" step="0.1">
                    <label id="eq-value" for="eq-3">0</label>
                    <br>
                    <label >Band 01000Hz: </label>
                    <input id="eq-in-4" type="range" min="-20" max="20" value="0" step="0.1">
                    <label id="eq-value" for="eq-4">0</label>
                    <br>
                    <label ">Band 03500Hz: </label>
                    <input id="eq-in-5" type="range" min="-20" max="20" value="0" step="0.1">
                    <label id="eq-value" for="eq-5">0</label>
                    <br>
                    <label >Band 10000Hz:</label>
                    <input id="eq-in-6" type="range" min="-20" max="20" value="0" step="0.1">
                    <label id="eq-value" for="eq-6">0</label>
                    <br>
                    </CENTER>
                </div>


                <br>
                <div class="btn-nav">
                    <div class="btn-left">
                    <webaudio-knob id="volumeKnob" 
                    src="./assets/imgs/Sonatom.png" 
                    value="5" min=0 max=20 step=0.01 
                    diameter="60" 
                    tooltip="Volume: %d"><p>Volume</p>
                    </webaudio-knob>
                    </div>
                
                    <div class="btn-right">
                    <webaudio-knob id="vitesseLecture" 
                    src="./assets/imgs/Sonatom.png" 
                    value="5" min=0 max=4 step=0.01 
                    diameter="60" 
                    tooltip="Vitesse: %d"><p>Vitesse De Lecture</p>
                    </webaudio-knob>
                    </div>
                    Loop: <input class="loop" id="loop" type="checkbox">
                </div>
               
               
            </div>
        </div>
    </div>
  `;

  class MyAudioPlayer extends HTMLElement {
    constructor() {
        super();
        // Récupération des attributs HTML
        //this.value = this.getAttribute("value");

        // On crée un shadow DOM
        this.filters=[]
        this.attachShadow({ mode: "open" });

        console.log("URL de base du composant : " + getBaseURL())
        //
        
    }
    connectedCallback() {
        // Appelée automatiquement par le browser
        // quand il insère le web component dans le DOM
        // de la page du parent..

        // On clone le template HTML/CSS (la gui du wc)
        // et on l'ajoute dans le shadow DOM
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // fix relative URLs
        this.fixRelativeURLs();

        this.player = this.shadowRoot.querySelector("#myPlayer");
        this.player.src = this.getAttribute("src");

        // récupérer le canvas
        this.canvas = this.shadowRoot.querySelector("#myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas1 = this.shadowRoot.querySelector("#myCanvas2");
        this.ctx1 = this.canvas1.getContext("2d");

        // Récupération du contexte WebAudio
        this.audioCtx = new AudioContext();

        // on définit les écouteurs etc.
        this.defineListeners();

        // On construit un graphe webaudio pour capturer
        // le son du lecteur et pouvoir le traiter
        // en insérant des "noeuds" webaudio dans le graphe
        this.build();

        // on démarre l'animation
        requestAnimationFrame(() => {
            this.animationLoop();
            this.animationLoop2();
        });
    }
    build(){
        let audioContext = this.audioCtx;
        let player=this.player
        let sourceNode = audioContext.createMediaElementSource(player);
        this.buildAudioGraph(audioContext,player,sourceNode);
        this.buildequalizer(audioContext,player,sourceNode);
    }
    buildAudioGraph(audioContext,player,playerNode) {
        
        // Create an analyser node
        this.analyserNode = audioContext.createAnalyser();
        this.analyserNode1 = audioContext.createAnalyser();
        // Try changing for lower values: 512, 256, 128, 64...

        this.analyserNode.fftSize = 256;
        this.bufferLength = this.analyserNode.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);

        this.analyserNode1.fftSize = 256;
        this.bufferLength1 = this.analyserNode.frequencyBinCount;
        this.dataArray1 = new Uint8Array(this.bufferLength1);
        // lecteur audio -> analyser -> haut parleurs
        playerNode.connect(this.analyserNode);
        this.analyserNode.connect(audioContext.destination);

        playerNode.connect(this.analyserNode1);
        this.analyserNode1.connect(audioContext.destination);
    }
    buildequalizer(audioContext,player,sourceNode){
        this.analyser = audioContext.createAnalyser();
        let filters=this.filters;
        [60, 170, 350, 1000, 3500, 10000].forEach(function(freq, i) {
      var eq = audioContext.createBiquadFilter();
      eq.frequency.value = freq;
      eq.type = "peaking";
      eq.gain.value = 0;
      filters.push(eq);
    });
   sourceNode.connect(filters[0]);
   for(var i = 0; i < filters.length - 1; i++) {
      filters[i].connect(filters[i+1]);
    }

   // connect the last filter to the speakers
   filters[filters.length - 1].connect(this.analyser);

  this.analyser.connect(audioContext.destination);

    }
animationLoop() {
    // 1 on efface le canvas

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = 'rgba(0,0, 0,0.1)';

    // 2 on dessine les objets
    //this.ctx.fillRect(10+Math.random()*20, 10, 100, 100);
    // Get the analyser data
    this.analyserNode.getByteFrequencyData(this.dataArray);

    let barWidth = this.canvas.width / this.bufferLength;
    let barHeight;
    let x = 0;

    // values go from 0 to 256 and the canvas heigt is 100. Let's rescale
    // before drawing. This is the scale factor
    let heightScale = this.canvas.height / 128;

    for (let i = 0; i < this.bufferLength; i++) {
        barHeight = this.dataArray[i];

        this.ctx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
        barHeight *= heightScale;
        this.ctx.fillRect(x, this.canvas.height - barHeight / 2, barWidth, barHeight / 2);

        // 2 is the number of pixels between bars
        x += barWidth + 1;
    }

    
    // 3 on deplace les objets

    // 4 On demande au navigateur de recommencer l'animation
    requestAnimationFrame(() => {
        this.animationLoop();
    });

}

animationLoop2() {
    
   
    let width = this.canvas1.width
    let height = this.canvas1.height

    this.ctx1.fillStyle = 'rgba(0,0, 0,0.1)'
        this.ctx1.fillRect(0, 0, width, height)

    this.analyserNode1.getByteTimeDomainData(
        this.dataArray1
    )

    this.ctx1.beginPath()
    this.ctx1.strokeStyle = 'lightBlue';

    let sliceWidth = this.canvas1.width / this.bufferLength1;
    let x = 0;


    // values go from 0 to 256 and the canvas heigt is 100. Let's rescale
    // before drawing. This is the scale factor
    
    let heightScale = this.canvas1.height / 128;
    for (let i = 0; i < this.bufferLength1; i++) {
        // dataArray values are between 0 and 255,
        // normalize v, now between 0 and 1
        let v = this.dataArray1[i] / 255
        // y will be in [0, canvas height], in pixels
        let y = v * height

        if (i === 0) {
            this.ctx1.moveTo(x, y)
        } else {
            this.ctx1.lineTo(x, y)
        }

        x += sliceWidth
    }
    this.ctx1.lineTo(
        this.canvas1.width,
        this.canvas1.height / 2
    )
    this.ctx1.stroke()
    // 3 on deplace les objets
    // 4 On demande au navigateur de recommencer l'animation
    requestAnimationFrame(() => {
        this.animationLoop2();
    });

}
fixRelativeURLs() {
    const elems = this.shadowRoot.querySelectorAll("webaudio-knob, webaudio-slider, webaudio-switch, img");
    elems.forEach(e => {
        const path = e.src;
        if (path.startsWith(".")) {
            e.src = getBaseURL() + path;
        }
    });
}

defineListeners() {
    this.shadowRoot.querySelector("#play").onclick = () => {
       
        this.player.play();
        this.audioCtx.resume();
    }

    this.shadowRoot.querySelector("#pause").onclick = () => {
        this.player.pause();
    }

    this.shadowRoot.querySelector("#avance10").onclick = () => {
        this.player.currentTime += 10;
    }

    this.shadowRoot.querySelector("#recule10").onclick = () => {
        this.player.currentTime -= 10;
    }

    this.shadowRoot.querySelector("#stop").onclick = () => {
        console.log(this.player.duration)
        this.player.currentTime = 0;
        this.player.pause();
    }

    this.shadowRoot.querySelector("#retoura0").onclick = () => {
        this.player.currentTime = 0;
    }

    

    this.shadowRoot.querySelector("#vitesseLecture").oninput = (event) => {
        this.player.playbackRate = parseFloat(event.target.value);
        console.log("vitesse =  " + this.player.playbackRate);
        this.shadowRoot.querySelector("#vitessevalue").innerHTML = event.target.value;
    }

    this.shadowRoot.querySelector("#progress").onchange = (event) => { 
        this.player.currentTime = parseFloat(event.target.value);
         }

    this.player.ontimeupdate = (event) => {
        let progressSlider = this.shadowRoot.querySelector("#progress");
        console.log(this.player.duration)
            this.shadowRoot.querySelector("#progressvalue").innerHTML = parseInt(this.player.currentTime/60)+":"+parseInt((this.player.currentTime/60-parseInt(this.player.currentTime/60))*60)+"/"+parseInt((parseInt(this.player.duration/60)))+":"+parseInt((this.player.duration/60-parseInt(this.player.duration/60))*60);
            progressSlider.max = this.player.duration;
            progressSlider.min = 0;
            progressSlider.value = this.player.currentTime;
       
    }

    this.shadowRoot.querySelector("#volumeKnob").oninput = (event) =>{
        this.player.volume = event.target.value;

    }
    
    this.shadowRoot.querySelector("#loop").oninput = (e) => {
        this.player.loop = e.target.checked
    }

    this.shadowRoot.querySelectorAll('[id^=eq-in-]').forEach((e, i) => {
        e.oninput = (e) => {
                this.filters[i].gain.value = e.target.value
                this.shadowRoot.querySelectorAll('#eq-value')[i].innerHTML = e.target.value
            }
        })
    }


    // L'API du Web Component

}

customElements.define("my-player", MyAudioPlayer);

