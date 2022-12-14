/*

Add:

SamJs.js - github.com/discordier/sam:
<script src="js/external/samjs.min.js"></script>

jsxm - github.com/a1k0n/jsxm:
<script src="js/external/xm.js"></script>
<script src="js/external/xmeffects.js"></script>

to enable SAM and XM support.

*/
function Game(settings, scenesloader) {

    const
        OUTLINE = 1,
        PI=3.14,
        DEGTORAD=PI/180,
        COLLISIONPRECISION=0.01,
        EMPTYLIST=[],
        SPRITESPROPS = [
			{
				id:0,
				coord:"x",
				size:"width",
				speed:"speedX",
				accel:"accelX",
				isWall:"isWallX",
				isBounce:"isBounceX",
				tileSize:"tileWidth",
				higherSide:"right",
				lowerSide:"left",
				noSide:"xnone",
				hitboxCoord:"hitboxX",
				hitboxSize:"hitboxWidth",
                maxSpeed:"maxSpeedX",
                minSpeed:"minSpeedX",
			},{
				id:1,
				coord:"y",
				size:"height",
				speed:"speedY",
				accel:"accelY",
				isWall:"isWallY",
				isBounce:"isBounceY",
				tileSize:"tileHeight",
				higherSide:"bottom",
				lowerSide:"top",
				noSide:"ynone",
				hitboxCoord:"hitboxY",
				hitboxSize:"hitboxHeight",
                maxSpeed:"maxSpeedY",
                minSpeed:"minSpeedY",
			}
		],
        NOISETIMES=["attack","sustain","decay","release"],
        NOISEWAVES={
            whitenoise:function(v,i,p) { return Math.floor((i-1)/(p/2))!=Math.floor(i/(p/2))?Math.random()*2-1:v },
            square:function(v,i,p) { return ((Math.floor(i/(p/2))%-2)*-2)+1 },
            sine:function(v,i,p) { return Math.sin(i*6.28/p) },
            saw:function(v,i,p) { return ((v+1+(2/p)) % 2) - 1},
            triangle:function(v,i,p) { return Math.abs((i % p - (p/2))/p*4)-1 },
            tangent:function(v,i,p) { 
                v= 0.15*Math.tan(i/p*3.14);
                if (v<-1) v=-1;
                if (v>1) v=1;
                return v;
            },
            whistle:function(v,i,p) { return 0.75 * Math.sin(i/p*6.28) + 0.25 * Math.sin(40 *3.14 * i/p) },
            breaker:function(v,i,p) {
                v=(i/p) + 0.8660;
                v=v - Math.floor(v);
                return -1 + 2 * Math.abs(1 - v*v*2);
            }
        },
        KEYSYMBOLS={
			8:"Backspace",
			9:"Tab",
			13:"Enter",
			16:"Shift",
			17:"Ctrl",
			18:"Alt",
			19:"Pause/break",
			20:"Caps lock",
			27:"Escape",
			32:"Space",
			33:"Page up",
			34:"Page down",
			35:"End",
			36:"Home",
			37:"Left arrow",
			38:"Up arrow",
			39:"Right arrow",
			40:"Down arrow",
			45:"Insert",
			46:"Delete",
			91:"Left window",
			92:"Right window",
			93:"Select key",
			96:"Numpad 0",
			97:"Numpad 1",
			98:"Numpad 2",
			99:"Numpad 3",
			100:"Numpad 4",
			101:"Numpad 5",
			102:"Numpad 6",
			103:"Numpad 7",
			104:"Numpad 8",
			105:"Numpad 9",
			106:"Multiply",
			107:"Add",
			109:"Subtract",
			110:"Decimal point",
			111:"Divide",
			112:"F1",
			113:"F2",
			114:"F3",
			115:"F4",
			116:"F5",
			117:"F6",
			118:"F7",
			119:"F8",
			120:"F9",
			121:"F10",
			122:"F11",
			123:"F12",
			144:"Num lock",
			145:"Scroll lock",
			186:";",
			187:"=",
			188:",",
			189:"-",
			190:".",
			191:"/",
			192:"`",
			219:"[",
			220:"\\",
			221:"]",
			222:"'"
        };

    // Environment detection

    var
        div=document.createElement('div'),
        audio = document.createElement('audio'),
        passiveSupported,
        fullScreen,
        resourcesPrefix="";

    window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || 0;
    document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

    if (div.requestFullscreen) fullScreen={request:"requestFullscreen",exit:"exitFullscreen",is:"fullscreen",on:"fullscreenchange",error:"fullscreenerror"};
    else if (div.webkitRequestFullScreen) fullScreen={request:"webkitRequestFullScreen",exit:"webkitExitFullscreen",is:"webkitIsFullScreen",on:"webkitfullscreenchange",error:"webkitfullscreenerror"};
    else if (div.mozRequestFullScreen) fullScreen={request:"mozRequestFullScreen",exit:"mozCancelFullScreen",is:"mozFullScreenElement",on:"mozfullscreenchange",error:"mozfullscreenerror"};
    else if (div.msRequestFullscreen) fullScreen={request:"msRequestFullscreen",exit:"msExitFullscreen",is:"msFullscreenElement",on:"MSFullscreenChange",error:"msfullscreenerror"};

    this.isFirefox=navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
    this.isWakeLock='wakeLock' in navigator;
    this.isTouch=!!('ontouchstart' in window || navigator.maxTouchPoints);
    this.canPlayOgg=!!(audio.canPlayType && audio.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ''));

    if (!window.requestAnimFrame) window.requestAnimFrame = function( callback ){ callback() };

    var passiveSupported = false;

    try {
        var options = {
            get passive() {
                passiveSupported = true;
            }
        };
        window.addEventListener("test", options, options);
        window.removeEventListener("test", options, options);
    } catch(err) {
        passiveSupported = false;
    }

    // Fullscreen

    let setFullScreen=()=>{
        if (displayNode.requestFullscreen)
            displayNode.requestFullscreen();
        else if (displayNode.webkitRequestFullscreen)
            displayNode.webkitRequestFullscreen();
        else if (displayNode.msRequestFullscreen)
            displayNode.msRequestFullscreen();
    }

    // Controls

    let
        rawkeyboard = [],
        watchKeys,
        useGamepads=false;

    let keydown = (e)=>{
        rawkeyboard[e.keyCode] = 1;
    }

    let keyup = (e)=>{
        rawkeyboard[e.keyCode] = 0;
    }
    
    let padButtonIsPressed=(b)=>{
		if (gamepadPressedMode) return b?Math.abs(b.value)>0.7:0;
		else return b==1.0;
	}

    let updateControls = ()=>{

        let pluggedGamepads;
        if (useGamepads) pluggedGamepads=navigator.getGamepads();

        watchKeys.forEach(key=>{
            let
                subcontrol = this.controls[key.id],
                down=false;

            if (key.keyCode)
                down|=rawkeyboard[key.keyCode];
            
            if (useGamepads && key.gamepad) {
                let
                    padkey=key.gamepad,
                    gamepad=pluggedGamepads[key.id];
                if (gamepad) {
                    if (padkey.button !== undefined)
                        down|=padButtonIsPressed(gamepad.buttons[padkey.button]);
                    if (padkey.altButton !== undefined)
                        down|=padButtonIsPressed(gamepad.buttons[padkey.altButton]);
                    if (padkey.buttonAxis !== undefined)
                        down|=gamepad.axes[padkey.buttonAxis]?gamepad.axes[padkey.buttonAxis]*padkey.axisSensitivity>0.7:0;
                    if (padkey.axisGreater !== undefined)
                        down|=gamepad.axes[padkey.axisGreater]?gamepad.axes[padkey.axisGreater]*padkey.axisSensitivity>0.7:0;
                    if (padkey.axisLesser !== undefined)
                        down|=gamepad.axes[padkey.axisLesser]?gamepad.axes[padkey.axisLesser]*padkey.axisSensitivity<-0.7:0;
                }
            }

            if (down) {
                if (!subcontrol[key.subId] || (subcontrol[key.subId]<0))
                    subcontrol[key.subId]=1;
                else
                    subcontrol[key.subId]++;
            } else {
                if (subcontrol[key.subId] > 0)
                    subcontrol[key.subId] = -1;
                else if (subcontrol[key.subId] == -1)
                    subcontrol[key.subId] = 0;
            }
        });

    }

    this.controlIsHit = (control)=>{ return control == 1; }

    this.controlIsDown = (control)=>{ return control > 0; }

    this.controlIsUp = (control)=>{ return control < 1; }

    this.controlIsReleased = (control)=>{ return control == -1; }

    this.watchKeys = (keys) => {
        this.controls = {};
        watchKeys = keys;
        watchKeys.forEach(key=>{
            if (!this.controls[key.id]) this.controls[key.id] = {};
            this.controls[key.id][key.subId] = 0;
        });
    }

    // Storage

    let
        storageId="_ARCADE_"+(settings.name||"noname"),
        storageData;

    if (window.localStorage) {
        if (localStorage[storageId])
            storageData=JSON.parse(localStorage[storageId]);
        else
            storageData={};
    } else storageData={};

    this.writeData=()=>{
        if (localStorage) localStorage[storageId]=JSON.stringify(storageData);
    }

    this.saveData=(key,value,skipsave)=>{
        storageData[key]=value;
        if (!skipsave) this.writeData();
    }

    this.loadData=(key)=>{
        return storageData[key];
    }

    // Image manipulation

    let
        imagesToLoad = settings.images||[];

    let loadImages = (cb) => {

        if (imagesToLoad.length) {

            setLoadingMessage("Loading images ("+imagesToLoad.length+" left)")
            
            let image = imagesToLoad.shift();

            loadImage(resourcesPrefix+image.src,(loadedImage)=>{

                this.images[image.id] = loadedImage;
                
                if (image.cells) {
                    for (let s in image.cells) {
                        this.cells[s]=image.cells[s];
                        let cells=image.cells[s];
                        cells.image = this.images[image.id];
                        if (cells.frames) {
                            let frames = [];
                            cells.frames.forEach(frame=>{
                                switch (frame.macro) {
                                    case "rectangles":{
                                        if (frame.framesCount)
                                            for (let i=0;i<frame.framesCount;i++)
                                                frames.push({
                                                    x1:frame.x1+(frame.width*i),
                                                    y1:frame.y1,
                                                    width:frame.width,
                                                    height:frame.height
                                                });
                                        else    
                                            frame.frames.forEach(subframe=>{
                                                frames.push({
                                                    x1:frame.x1+(frame.width*subframe),
                                                    y1:frame.y1,
                                                    width:frame.width,
                                                    height:frame.height
                                                })
                                            });
                                        break;
                                    }
                                    default:{
                                        frames.push(frame);
                                    }
                                }
                            });
                            cells.frames=frames;
                            if (cells.cut && (frames.length==1)) {
                                let
                                    frame=frames[0],
                                    image=this.newImage(frame.width,frame.height);
                                this.drawSimpleCell(cells,0,0,0,image);
                                cells.image=image;
                                frame.x1=0;
                                frame.y1=0;
                            }
                        }
                    }
                }

                delay(()=>loadImages(cb));
                
            });
   
        } else {
            setLoadingMessage();
            cb();
        }
    }

    let loadImage = (url,cb) => {
        let img = document.createElement("img");
        img.onload=()=>{
            var canvas=document.createElement("canvas");
            canvas.width=img.width;
            canvas.height=img.height;
            var tctx=canvas.getContext("2d");
            tctx.drawImage(img,0,0);
            var imgdata=tctx.getImageData(0,0,img.width,img.height);
            document.body.removeChild(img);
            cb({
                width:img.width,
                height:img.height,
                node:canvas,
                ctx:tctx,
                imgdata:imgdata,
                data:imgdata.data
            });
        }
        img.style.position="absolute";
        img.style.top="-100000px";
        img.src = url;
        document.body.appendChild(img);
    }

    let rgbLimit = (value)=>{
        if (value<0) return 0;
        else if (value>255) return 255;
        else return ~~(value);
    }

    this.newImage = (width, height)=> {
        var canvas=document.createElement("canvas");
        canvas.width=width;
        canvas.height=height;
        var
            tctx=canvas.getContext("2d"),
            imgdata=tctx.getImageData(0,0,width,height);
        return {
            width:width,
            height:height,
            node:canvas,
            ctx:tctx,
            imgdata:imgdata,
            data:imgdata.data
        };
    }

    this.getPixel=(image,tox,toy)=>{
        var destPixel=((toy*image.width)+tox)*4;
        return [
            image.data[destPixel],
            image.data[destPixel+1],
            image.data[destPixel+2],
            image.data[destPixel+3]
        ];
    }

    this.putPixel = (image,tox,toy,color)=>{
        var destPixel=((toy*image.width)+tox)*4;
        image.data[destPixel]=rgbLimit(color[0]);
        image.data[destPixel+1]=rgbLimit(color[1]);
        image.data[destPixel+2]=rgbLimit(color[2]);
        image.data[destPixel+3]=rgbLimit(color[3]);
    }


    // Random generators

    function addRandomMethods(rand) {
        
        rand.randomInteger=(x)=>{
            return Math.floor(rand.randomFloat()*x);
        }

        rand.randomBool=(x)=>{
            return rand.randomFloat()>x;
        }

        rand.randomElement=(ar)=>{
            return ar[rand.randomInteger(ar.length)];
        }
        
        rand.randomItemPosition=(ar)=>{
            return rand.randomInteger(ar.length);
        }

        rand.randomElementDraw=(ar)=>{
            let
                pos=rand.randomItemPosition(ar),
                element=ar[pos];
            ar.splice(pos,1);
            return element;
        }

        rand.newBag=(set)=>{
            return {
                topick:[],
                pick:function() {
                    if (this.topick.length==0)
                        for (let i=0;i<set.length;i++)
                            this.topick.push(i);
                    return set[rand.randomElementDraw(this.topick)];
                }

            }
        }

        return rand;

    }

    function Randomizer(seed) {
        
        this.randomFloat=()=>{
            return Math.random();
        }

        addRandomMethods(this);

        return this;

    }

    function SeededRandomizer(seed) {
        
        this.randomFloat=()=>{
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
        }

        addRandomMethods(this);

        return this;

    }

    this.newRandomizer = ()=>{
        return new Randomizer();
    }

    this.newSeededRandomizer = (seed)=>{
        return new SeededRandomizer(seed);
    }

    // Audio

    var
        sam,
        ready=false,
        audioContext=audioOut=0,
        audioPlaying={},
        musicPlaying=0,
        audioToLoad = settings.audio||[];

    this.audio = {};
    
    if (settings.volume==undefined) settings.volume=1;
    if (settings.musicVolume==undefined) settings.musicVolume=0.3;
    
    let loadAudio=(cb,second)=>{
        if (!audioToLoad || !audioToLoad.length) {
            setLoadingMessage();
            cb();
        } else {

            setLoadingMessage("Loading audio ("+audioToLoad.length+" left)")

            if (!second) this.audioInitialize();

            var sample=audioToLoad.shift();
            if (!this.audioEnabled) {

                this.audio[sample.id]={
                    id:sample.id,
                    buffer:0,
                    properties:sample
                };

                delay(()=>loadAudio(cb,true));

            } else if (sample.sam) {

                if (!sam) sam=new SamJs();
                var
                    audiobuffer=sam.buf32(sample.sam.text),
                    source = audioContext.createBufferSource(),
                    soundBuffer = audioContext.createBuffer(1, audiobuffer.length, 22050),
                    buffer = soundBuffer.getChannelData(0);
                for(var i=0; i<audiobuffer.length; i++)
                    buffer[i] = audiobuffer[i];
                this.audio[sample.id]={
                    id:sample.id,
                    buffer:soundBuffer,
                    properties:sample
                };
                delay(()=>loadAudio(cb,true));

            } else if (sample.mod) {

                var request = new XMLHttpRequest();
                request.open("GET", resourcesPrefix+sample.mod);
                request.responseType = "arraybuffer";
                request.onload = ()=>{
                    if (request.status === 200) {
                        this.audio[sample.id]={
                            id:sample.id,
                            buffer:0,
                            properties:sample,
                            mod:request.response
                        }
                    }
                    loadAudio(cb,true);
                };
                request.send();

            } else if (sample.like) {

                 this.audio[sample.id]={
                    id:sample.id,
                    buffer:this.audio[sample.like].buffer,
                    mod:this.audio[sample.like].mod,
                    properties:sample
                };
                delay(()=>loadAudio(cb,true));

            } else if (sample.noise) {

                var
                    sampleRate = audioContext.sampleRate,
                    data={},
                    out,bits,steps;

                for (var a in sample.noise) data[a]=sample.noise[a];
                for (var i=0;i<NOISETIMES.length;i++) data[NOISETIMES[i]]*=sampleRate;

                var 
                    attackDecay=data.attack+data.decay,
                    attackSustain=attackDecay+data.sustain,
                    samplePitch = sampleRate/data.frequency,
                    sampleLength = attackSustain+data.release,  

                    tremolo = .9,
                    value = .9,
                    envelope = 0;    

                var buffer = audioContext.createBuffer(2,sampleLength,sampleRate);

                for(var i=0;i<2;i++) {
                    var channel = buffer.getChannelData(i),
                        jump1=sampleLength*data.frequencyJump1onset,
                    jump2=sampleLength*data.frequencyJump2onset;
                    for(var j=0; j<buffer.length; j++) {
                        // ADSR Generator
                        value = NOISEWAVES[data.wave](value,j,samplePitch);
                        if (j<=data.attack) envelope=j/data.attack;
                        else if (j<=attackDecay) envelope=-(j-attackDecay)/data.decay*(1-data.limit)+data.limit;
                        if (j>attackSustain) envelope=(-(j-attackSustain)/data.release+1)*data.limit;
                        // Tremolo
                        tremolo = NOISEWAVES.sine(value,j,sampleRate/data.tremoloFrequency)*data.tremoloDepth+(1-data.tremoloDepth);
                        out = value*tremolo*envelope*0.9;
                        // Bit crush
                        if (data.bitCrush||data.bitCrushSweep) {
                            bits = Math.round(data.bitCrush + j / sampleLength * data.bitCrushSweep);
                            if (bits<1) bits=1;
                            if (bits>16) bits=16;
                            steps=Math.pow(2,bits);
                            out=-1 + 2 * Math.round((0.5 + 0.5 * out) * steps) / steps;
                        }

                        // Done!
                        if (!out) out=0;
                        if(out>1) out= 1;
                        if(out<-1) out = -1;

                        channel[j]=out;

                        // Frequency jump
                        if (j>=jump1) { samplePitch*=1-data.frequencyJump1amount; jump1=sampleLength }
                        if (j>=jump2) { samplePitch*=1-data.frequencyJump2amount; jump2=sampleLength }

                        // Pitch
                        samplePitch-= data.pitch;
                    }
                }
                this.audio[sample.id]={
                    id:sample.id,
                    buffer:buffer,
                    properties:sample
                };
                delay(()=>loadAudio(cb,true));

            } else {

                var request = new XMLHttpRequest();
                request.open('GET', resourcesPrefix+sample.file+(this.canPlayOgg?".ogg":".mp4"), true);
                request.responseType = 'arraybuffer';
                request.onload = ()=>{                   
                    audioContext.decodeAudioData(request.response, (buffer)=>{
                        this.audio[sample.id]={
                            id:sample.id,
                            buffer:buffer,
                            properties:sample
                        };
                        loadAudio(cb,true);
                    }, function(e){
                        console.log("Error loading resource",sample);
                        cb();
                    });
                }   
                request.send();

            }

        }
    }

    this.setMusic=(enabled)=>{
        this.musicEnabled=this.audioEnabled;
        if (ready)
            if (enabled) this.playMusic(musicPlaying,true);
            else this.stopMusic(true);
    }

    this.setEffects=(enabled)=>{
        this.effectsEnabled=enabled;
    }

    this.audioIsEnded=(sample)=>{
        return !audioPlaying[sample.id]||audioPlaying[sample.id].ended;
    }

    this.setVolume=(vol)=>{
        settings.volume=vol;
    }

    this.setAudioVolume=(audio,vol)=>{
        if (audio&&audioPlaying[audio.id]&&audioPlaying[audio.id].gain)
            audioPlaying[audio.id].gain.gain.value=vol;
    }

    this.setMusicVolume=(vol)=>{
        settings.musicVolume=vol;
        if (window.XMPlayer&&XMPlayer.gainNode) {
            XMPlayer.gainNode.gain.value=0.1*vol;
        }
        this.setAudioVolume(musicPlaying,vol);
    }

    this.playAudio=(sample,loop,volume,force)=>{
        if (this.audioInitialize()&&sample&&this.audioEnabled&&(this.effectsEnabled||force)&&audioContext) {
            if (sample.mod) {
                XMPlayer.stop();
                XMPlayer.load(sample.mod);
                XMPlayer.play();
                audioPlaying[sample.id]="mod";
            } else {
                loop=!!loop;
                this.stopAudio(sample);
                var sound={
                    id:sample.id,
                    gain:audioContext.createGain(),
                    source: audioContext.createBufferSource(),
                    ended:false
                }
                sound.gain.connect(audioOut);
                sound.gain.gain.value=volume||settings.volume;
                sound.source.buffer = sample.buffer;
                sound.source.loop=loop;
                if (sample.properties.pitchStart!==undefined)
                    sound.source.playbackRate.value=sample.properties.pitchStart+(sample.properties.pitchRange*Math.random());
                sound.source.onended=()=>{ sound.ended=true; }
                if (loop&&(sample.properties.loopStart!==undefined)) {
                    sound.source.loopStart=sample.properties.loopStart;
                    sound.source.loopEnd=sample.properties.loopEnd;
                }
                sound.source.connect(sound.gain);
                sound.source.start(0);
                audioPlaying[sample.id]=sound;
            }
        }
    }

    this.playMusic=(sample,force)=>{
        if (force||(sample!=musicPlaying)) {
            if (this.audioInitialize()) {
                this.stopMusic();
                if (this.musicEnabled) this.playAudio(sample,true,settings.musicVolume,true);
                musicPlaying=sample;
            }
        }
    }

    this.stopMusic=(dontforget)=>{
        if (this.audioInitialize()) {
            this.stopAudio(musicPlaying)
            if (!dontforget) musicPlaying=0;
        }
    }
    this.replayMusic=()=>{
        if (this.audioInitialize())
            this.playMusic(musicPlaying,true);
    }

    this.stopEffects=()=>{
        if (this.audioInitialize()) {
            for (var a in audioPlaying)
                if (!musicPlaying||(audioPlaying[a].id!=musicPlaying.id))
                    this.stopAudio(audioPlaying[a]);
        }
    }

    this.stopAllAudio=()=>{
        if (this.audioInitialize()) {
            for (var a in audioPlaying)
                this.stopAudio(audioPlaying[a]);
        }
    }

    this.stopAudio=(sample)=>{
        if (this.audioInitialize()) {
            if (audioPlaying[sample.id]=="mod") {
                XMPlayer.stop();
            } else if (audioPlaying[sample.id]) {
                let playing=audioPlaying[sample.id];
                playing.source.stop(0);
                playing.gain.disconnect();
                playing.source.disconnect();
                audioPlaying[sample.id]=0;
            }
        }
    }

    this.setAudioEnabled=(state)=>{
        this.audioEnabled=state;
        this.stopAllAudio();
    }

    this.audioInitialize=()=>{
        if (!this.audioEnabled||ready) return true;
        else {
            if (window.XMPlayer)
                XMPlayer.init();
            if (window.AudioContext)
                audioContext=new window.AudioContext();
            else if (window.webkitAudioContext)
                audioContext=new window.webkitAudioContext();
            if (audioContext) {
                ready=true;
                audioOut=audioContext.createGain();
                audioOut.connect(audioContext.destination);
                audioOut.gain.value=0.9;
            }
            return false;
        }
    }

    // Math

    this.calcDistance=(x1,y1,x2,y2)=>{
        let 
            a = x1 - x2,
            b = y1 - y2;
        return Math.sqrt( a*a + b*b );
    }

    this.calcAngle=(x1,y1,x2,y2)=>{
        let 
            a = x1 - x2,
            b = y1 - y2;
        return Math.atan2(a,b);
    }

    this.applyAngleSpeed=(sprite,angle,len)=>{
        sprite.setSpeedX(-Math.sin(angle)*len);
        sprite.setSpeedY(-Math.cos(angle)*len);
    }
   
    // Sprites

    let
        spriteId = 0,
        sprites = [],
        spriteTags = [];

    function Sprite(game, spriteid, config, x, y) {
        let
            cells,
            tags = [],
            animationCounter = 0;

        this.frame = 0;
		this.animation = 0;
		this.animations = config.animations;
		this.states = config.states;
		this.properties = config.properties;
		this.animationLive = false;
        this.id = spriteid;
        this.tags = {};
		this.x = x;
		this.y = y;
		this.prevCoord = [x, y];
		this.nextCoord = [x, y];
        this.hitboxX = 0;
        this.hitboxY = 0;
		this.visible = true;
		this.state = 0;
		this.width = 0;
		this.height = 0;
		this.speedX = 0;
		this.speedY = 0;
        this.logicEnabled = true;
        this.physicsEnabled = true;
        this.animationEnabled = true;
        this.maxSpeedX = undefined;
        this.maxSpeedY = undefined;
        this.minSpeedX = undefined;
        this.minSpeedY = undefined;
		this.accelX = 0;
		this.accelY = 0;
		this.flipX = 0;
		this.flipY = 0;
        this.angle = 0;
        this.opacity = 1;
        this.scale = 1;
        this.removed = true;
        this.checkCollisions = 0;
        this.collisions = {};
        this.ignoredWalls = {};

        let resetCollisions = () => {
            this.collisions = { index:{}, all:[] };
        }

        this.addCollision = (id, object, tag, side) => {

            let collision;

            if (!this.collisions.index[id]) {
                collision={ object:object };
                this.collisions.index[id] = collision;
                this.collisions.all.push(collision);
                this.collisions.is = true;
            } else collision = this.collisions.index[id];

            if (!collision[side]) {
                collision[side]=true;
                if (!this.collisions[side]) this.collisions[side]={all:[]};
                if (!this.collisions[side][tag]) this.collisions[side][tag]=[];
                this.collisions[side].all.push(collision);
                this.collisions[side][tag].push(collision);
            }

            if (!collision[tag]) {
                collision[tag]=true;
                if (!this.collisions[tag]) this.collisions[tag]={all:[]};
                if (!this.collisions[tag][side]) this.collisions[tag][side]=[];
                this.collisions[tag].all.push(collision);
                this.collisions[tag][side].push(collision);
            }

        }

        this.add = ()=>{
            this.removed=false;
            game.addSprite(this);
            return this;
        }

        this.remove = ()=>{
            if (!this.removed) {
                this.removed=true;
                tags.forEach(tag=>game.removeSpriteTag(this,tag));
                game.removeSprite(this);
            }
            return this;
        }

		this.setVisible = (v)=> {
			this.visible = !!v;
			return this;
		}

        this.setLogicEnabled = (v)=> {
			this.logicEnabled = !!v;
			return this;
		}

        this.setPhysicsEnabled = (v)=> {
			this.physicsEnabled = !!v;
			return this;
		}

        this.setAnimationEnabled = (v)=> {
			this.animationEnabled = !!v;
			return this;
		}

        this.setFrame = (fr) => {
            this.frame = fr;
            this.animationLive=false;
            return this;
        }

        this.setX = (px) => {
            this.x = px;
            return this;
        }

        this.setY = (py) => {
            this.y = py;
            return this;
        }

        this.setZIndex = (zi)=> {
            zi=Math.abs(~~zi);
            if (this.removed)
                this.zIndex = zi;
            else {
                game.changeSpriteZIndex(this,zi);
                this.zIndex = zi;
            }
            return this;
        }

		this.setHitboxX = (px) => {
            this.hitboxX = px;
            return this;
        }

        this.setHitboxY = (py) => {
            this.hitboxY = py;
            return this;
        }

		this.setWidth = (wi) => {
            this.width = wi;
            if (!this.hitboxWidth) this.setHitboxWidth(wi);
            return this;
        }

        this.setHeight = (he) => {
            this.height = he;
            if (!this.hitboxHeight) this.setHitboxHeight(he);
            return this;
        }

		this.setHitboxWidth = (wi) => {
            this.hitboxWidth = wi;
            return this;
        }

        this.setHitboxHeight = (he) => {
            this.hitboxHeight = he;
            return this;
        }

        this.setSpeedX = (sx) => {
            this.speedX = sx||0;
            this.limitSpeed(SPRITESPROPS[0])
            return this;
        }

        this.setSpeedY = (sy) => {
            this.speedY = sy||0;
            this.limitSpeed(SPRITESPROPS[1])
            return this;
        }

        this.setMinSpeedX = (sx) => {
            this.minSpeedX = sx;
            return this;
        }

        this.setMaxSpeedX = (sx) => {
            this.maxSpeedX = sx;
            return this;
        }

        this.setMinSpeedY = (sy) => {
            this.minSpeedY = sy;
            return this;
        }

        this.setMaxSpeedY = (sy) => {
            this.maxSpeedY = sy;
            return this;
        }

        this.setFlipX = (fx) => {
            this.flipX = !!fx
            return this;
        }

		this.flip = () => {
			this.flipX = !this.flipX;
			return this;
		}

        this.setFlipY = (fy) => {
            this.flipY = !!fy;
            return this;
        }

        this.setAccelX = (ax) => {
            this.accelX = ax||0;
            return this;
        }

        this.setAccelY = (ay) => {
            this.accelY = ay||0;
            return this;
        }

        this.setState = (st) => {
			if (config.states) {
				if (this.state && this.state.onExit) this.state.onExit(game, game.scene, this);
				this.state = st;
                this.checkCollisions = st.collisions;
				if (this.state && this.state.onEnter) this.state.onEnter(game, game.scene, this);
			}
            return this;
        }

        this.setCollisions = (co) => {
            this.checkCollisions = co;
            return this;
        }

        this.changeState = (st) => {
            if (this.state !== st)
                this.setState(st);
        }

        this.setAngle = (ang) => {
            this.angle = ang;
            return this;
        }

        this.setOpacity = (op) => {
            this.opacity = op;
            return this;
        }

        this.setScale = (sc) => {
            this.scale = sc;
            return this;
        }

        this.addTag = (tag) => {
            if (tags.indexOf(tag) == -1) {
                this.tags[tag] = true;
                tags.push(tag);
                game.addSpriteTag(this,tag);
            }
            return this;
        }

        this.removeTag = (tag) => {
            let pos = tags.indexOf(tag);
            if (pos != -1) {
                delete this.tags[tag];
                tags.splice(pos,1);
                game.removeSpriteTag(this, tag);
            }
            return this;
        }

        this.collidesWith = (sprite) => {
            return !(
                ( this.x+this.hitboxX >= sprite.x+sprite.hitboxX+sprite.hitboxWidth) ||
                ( this.x+this.hitboxX+this.hitboxWidth <= sprite.x+sprite.hitboxX) ||
                ( this.y+this.hitboxY >= sprite.y+sprite.hitboxY+sprite.hitboxHeight) ||
                ( this.y+this.hitboxY+this.hitboxHeight <= sprite.y+sprite.hitboxY)
            );
        }

        this.setAnimation = (newanimation)=>{
			if (newanimation) {
				this.animation = newanimation;
				this.frame = newanimation.frame||0;
				animationCounter = this.animation.counterStart||0;
				cells = this.animation.cells;
				this.animationLive = !newanimation.isStill;
                if (!cells) debugger;
                if (!this.hitboxWidth) this.setHitboxWidth(cells.frames[0].width);
                if (!this.hitboxHeight) this.setHitboxHeight(cells.frames[0].height);
                if (!this.width) this.setWidth(cells.frames[0].width);
                if (!this.height) this.setHeight(cells.frames[0].height);
			} else {
				this.animation = 0;
				this.animationLive = false;
			}
        }

        this.changeAnimation = (newanimation)=>{
            if (this.animation !== newanimation)
                this.setAnimation(newanimation);
        }

        this.stop = () => {
            this.setSpeedX(0);
            this.setSpeedY(0);
            this.setAccelX(0);
            this.setAccelY(0);
            this.accelX = 0;
            this.accelY = 0;
            this.animationLive = false;
        }

        this.limitSpeed = (props)=> {
            if (this[props.maxSpeed] !== undefined && (this[props.speed]>this[props.maxSpeed])) this[props.speed]=this[props.maxSpeed];
            if (this[props.minSpeed] !== undefined && (this[props.speed]<this[props.minSpeed])) this[props.speed]=this[props.minSpeed];
        }

        this.animate = () => {

            // Animation
            if (this.animationLive && this.animationEnabled) {
                animationCounter+=this.animation.speed;
                if (animationCounter < 0) {
                    if (this.animation.loop)
                        animationCounter = cells.frames.length+animationCounter;
                    else {
                        animationCounter = 0;
                        this.animationLive = false;
                    }
                }
                if (animationCounter >= cells.frames.length) {
                    if (this.animation.loop)
                        animationCounter = animationCounter-cells.frames.length;
                    else {
                        animationCounter = cells.frames.length-1;
                        this.animationLive = false;
                    }
                }
                this.frame = animationCounter|0;
            }

            // Movement
            if (this.physicsEnabled) {

                resetCollisions();

                // Cache previous collisions
                let
                    side,
                    prevCollisions={};

                if (this.checkCollisions) {
                    let checked = {};
                    checked[this.id] = false;
                    
                    this.checkCollisions.forEach((collision,id)=>{

                        if (collision.isWallX || collision.isWallY) {
                            // With tilemaps
                            if (collision.withTilemapTags)
                                collision.withTilemapTags.forEach(tag=>{
                                    let tilemaps = game.getSpritesWithTag(tag);
                                    if (tilemaps) {
                                        tilemaps.forEach(tilemap=>{
                                            tilemap.getCollidingWalls(prevCollisions, collision, this);
                                        })
                                    }
                                });

                            // With sprites
                            if (collision.withSpriteTags)
                                collision.withSpriteTags.forEach(tag=>{
                                    let sprites = game.getSpritesWithTag(tag);
                                    if (sprites) {
                                        sprites.forEach(sprite=>{
                                            if (checked[sprite.id] === undefined)
                                                checked[sprite.id]=sprite.collidesWith(this);
                                            if (checked[sprite.id])
                                                prevCollisions[sprite.id] = true;
                                        })
                                    }
                                });
                        }
                    });

                }

                for (let a=0; a<2;a++) {
                    let props = SPRITESPROPS[a];

                    if (this.prevCoord[a]===undefined) this.prevCoord[a]=this[props.coord];
                    
                    this[props.speed]+=this[props.accel];
                    this[props.coord]+=this[props.speed];
                    this.limitSpeed(props);

                    side = this[props.speed]<0?0:1;
                    
                    if (this.checkCollisions) {
                        let checked = {};
                        checked[this.id] = false;
                        this.checkCollisions.forEach((collision,id)=>{

                            // With tilemaps
                            if (collision.withTilemapTags)
                                collision.withTilemapTags.forEach(tag=>{
                                    let tilemaps = game.getSpritesWithTag(tag);
                                    if (tilemaps) {
                                        tilemaps.forEach(tilemap=>{
                                            tilemap.collidesWith(prevCollisions, collision, this,this[props.speed], props, side);
                                        })
                                    }
                                });

                            // With sprites
                            if (collision.withSpriteTags)
                                collision.withSpriteTags.forEach(tag=>{
                                    let sprites = game.getSpritesWithTag(tag);
                                    if (sprites) {
                                        sprites.forEach(sprite=>{
                                            if (checked[sprite.id] === undefined)
                                                checked[sprite.id]=sprite.collidesWith(this);
                                            if (checked[sprite.id]) {
                                                this.addCollision(sprite.id, sprite, tag, this[props.speed]>0 ? props.higherSide : this[props.speed]<0 ? props.lowerSide : props.noSide );
                                                if (!prevCollisions[sprite.id] && collision[props.isWall] && collision[props.isWall][side]) {
                                                    let bounce = collision[props.isBounce] ? collision[props.isBounce][side] : undefined;
                                                    if (this[props.speed]>0) {
                                                        if (checked[sprite.id] == true) this[props.coord]=sprite[props.coord]+sprite[props.hitboxCoord]-this[props.hitboxCoord]-this[props.hitboxSize];
                                                        if (bounce !== undefined) this[props.speed]*=bounce;
                                                    }
                                                    else if (this[props.speed]<0) {
                                                        if (checked[sprite.id] == true) this[props.coord]=sprite[props.coord]+sprite[props.hitboxCoord]+sprite[props.hitboxSize]-this[props.hitboxCoord];
                                                        if (bounce !== undefined) this[props.speed]*=bounce;
                                                    }
                                                    this.limitSpeed(props);
                                                }
                                            }
                                        })
                                    }
                                });

                        })
                    }

                    this.nextCoord[a] = this[props.coord];
                    this[props.coord] = this.prevCoord[a];
                }

                for (let a=0; a<2;a++)
                    this[SPRITESPROPS[a].coord]=this.prevCoord[a]=this.nextCoord[a];

            }

            // Logic

            if (this.logicEnabled && this.state && this.state.onLogic)
                this.state.onLogic(game, game.scene, this);

        }

        this.draw = ()=>{
			if (cells && this.visible)
            	game.drawCell(cells, this.frame, this.x, this.y, this.flipX, this.flipY, this.angle, this.opacity, this.scale);
            if (this.state && this.state.onDraw)
                this.state.onDraw(game, game.scene, this);
            return this;
        }

        resetCollisions();
        if (this.animations) this.setAnimation(config.animation==undefined?this.animations.default:this.animations[config.animation]);
        if (this.states) this.setState(config.state==undefined?this.states.default:this.states[config.state]);
        if (config.x !== undefined) this.setX(config.x);
        if (config.y !== undefined) this.setY(config.y);
        this.setZIndex(config.zIndex==undefined?0:config.zIndex);
        if (config.hitboxX !== undefined) this.setHitboxX(config.hitboxX);
        if (config.hitboxY !== undefined) this.setHitboxY(config.hitboxY);
        if (config.width !== undefined) this.setWidth(config.width);
        if (config.height !== undefined) this.setHeight(config.height);
        if (config.hitboxWidth !== undefined) this.setHitboxWidth(config.hitboxWidth);
        if (config.hitboxHeight !== undefined) this.setHitboxHeight(config.hitboxHeight);
        if (config.speedX !== undefined) this.setSpeedX(config.speedX);
        if (config.speedY !== undefined) this.setSpeedY(config.speedY);
        if (config.accelX !== undefined) this.setAccelX(config.accelX);
        if (config.accelY !== undefined) this.setAccelY(config.accelY);
        if (config.flipX !== undefined) this.setFlipX(config.flipX);
        if (config.flipY !== undefined) this.setFlipY(config.flipY);
        if (config.angle !== undefined) this.setAngle(config.angle);
        if (config.opacity !== undefined) this.setOpacity(config.opacity);
        if (config.scale !== undefined) this.setScale(config.scale);
        if (config.minSpeedX !== undefined) this.setMinSpeedX(config.minSpeedX);
        if (config.maxSpeedX !== undefined) this.setMaxSpeedX(config.maxSpeedX);
        if (config.minSpeedY !== undefined) this.setMinSpeedY(config.minSpeedY);
        if (config.maxSpeedY !== undefined) this.setMaxSpeedY(config.maxSpeedY);
        if (config.logicEnabled !== undefined) this.setLogicEnabled(config.logicEnabled);
        if (config.physicsEnabled !== undefined) this.setPhysicsEnabled(config.physicsEnabled);
        if (config.animationEnabled !== undefined) this.setAnimationEnabled(config.animationEnabled);
        if (config.tags)
            config.tags.forEach(tag=>this.addTag(tag));
        if (config.events)
            for (let k in config.events)
                this[k]=config.events[k];

    }

    this.addSprite = (sprite) => {
        if (!sprites[sprite.zIndex]) sprites[sprite.zIndex]=[];
        if (sprites[sprite.zIndex].indexOf(sprite) == -1)
            sprites[sprite.zIndex].push(sprite);
    }

    this.removeSprite = (sprite) => {
        if (sprites[sprite.zIndex]) {
            let pos=sprites[sprite.zIndex].indexOf(sprite);
            if (pos != -1)
                sprites[sprite.zIndex].splice(pos,1);
        }
    }

    this.changeSpriteZIndex = (sprite, zIndex) => {
        if (sprite.zIndex != zIndex) {
            this.removeSprite(sprite);
            sprite.zIndex = zIndex;
            this.addSprite(sprite);
        }
    }

    this.clearSprites = () => {
        spriteId = 0;
        sprites.length = 0;
        spriteTags = {};
    }

    this.newSprite = (config, x,y) => {
        spriteId++;
        return new Sprite(this, spriteId, config, x, y);
    }

    this.addNewSprite = (config, x,y) => {
        return this.newSprite(config, x,y).add();
    }

    this.getSpritesWithTag = (tag) => {
        return spriteTags[tag]||EMPTYLIST;
    }

    this.getSpritesWithTagCopy = (tag) => {
        let
            out=[],
            sprites=this.getSpritesWithTag(tag);
        sprites.forEach(sprite=>out.push(sprite));
        return out;
    }

    this.addSpriteTag = (sprite, tag) => {
        if (!spriteTags[tag]) spriteTags[tag]=[];
        spriteTags[tag].push(sprite);
    }

    this.removeSpriteTag = (sprite, tag) => {
        if (spriteTags[tag]) {
            let pos = spriteTags[tag].indexOf(sprite);
            if (pos != -1) spriteTags[tag].splice(pos,1);
        }
    }

    let logicId=false;
    this.logicSprites = () => {
        logicId=!logicId;
        sprites.forEach(spriteset=>{
            spriteset.forEach(sprite=>{
                if (sprite._logicId != logicId) {
                    sprite.animate();
                    sprite.draw();
                    sprite._logicId=logicId;
                }
            })
        })
    }

    this.drawSprites = () => {
        sprites.forEach(spriteset=>{
            spriteset.forEach(sprite=>{
                sprite.draw();
            })
        })
    }

    
    // Tilemaps

    function Tilemap(game, spriteid, config, x, y, width, height) {

        let
            tags=[],
            cells = config.cells,
            tiles = cells.frames,
            charIndex = {};

        if ((height == undefined) && config.map) height = config.map.length;
        if ((width == undefined) && config.map[0]) width = config.map[0].length;

        config.tiles.forEach((tile,id)=>{
            if (tile) {
                tile.tagsIndex={};
                if (tile.char)
                    charIndex[tile.char] = id;
                if (tile.tags)
                    tile.tags.forEach(tag=>tile.tagsIndex[tag]=true)
            }
        })

        let setTileId = (x,y,id) =>{
            let tile = config.tiles[id];
            if (!this.map[y]) this.map[y]=[];
            this.map[y][x] = tile;
            if (tile.randomFrame !== undefined)
                game.drawSimpleCell(cells, tile.randomFrame[Math.floor(Math.random()*tile.randomFrame.length)], x*this.tileWidth, y*this.tileHeight, this.image);
            else if (tile.frame == undefined)
                game.clearSimpleCell(cells, id, x*this.tileWidth, y*this.tileHeight, this.image);
            else
                game.drawSimpleCell(cells, tile.frame, x*this.tileWidth, y*this.tileHeight, this.image);
        }

        let manageTileCollision = (sprite, collision, speed, coord, props, side) => {
            if (collision[props.isWall] && collision[props.isWall][side]) {
                let bounce = collision[props.isBounce] ? collision[props.isBounce][side] : undefined;
                if (speed>0) {
                    sprite[props.coord]=this[props.coord]+(coord*this[props.tileSize])-sprite[props.hitboxCoord]-sprite[props.hitboxSize];
                    if (bounce !== undefined) sprite[props.speed]*=bounce;
                }
                else if (speed<0) {
                    sprite[props.coord]=this[props.coord]+((coord+1)*this[props.tileSize])-sprite[props.hitboxCoord];
                    if (bounce !== undefined) sprite[props.speed]*=bounce;
                }
                sprite.limitSpeed(props);
            }
        }

        this.map = [];

        this.id = spriteid;

        this.tileWidth = tiles[0].width;
		this.tileHeight = tiles[0].height;

        this.x = x;
		this.y = y;
        this.width = width*this.tileWidth;
        this.height = height*this.tileHeight;
        this.removed = true;
        this.zIndex = 0;
        this.image = game.newImage(this.width, this.height );

        this.tags = {};

        this.add = ()=>{
            game.addSprite(this);
            this.removed = false;
            return this;
        }

        this.remove = ()=>{
            if (!this.removed) {
                this.removed=true;
                tags.forEach(tag=>game.removeSpriteTag(this,tag));
                game.removeSprite(this);
            }
            return this;
        }

        this.setTile = (x,y,tile) => {
            setTileId(x,y,tile);
            return this;
        }

        this.getTileAtPixel = (x,y) => {
            let
                tx=Math.floor((x-this.x)/this.tileWidth),
                ty=Math.floor((y-this.y)/this.tileHeight);

            if (this.map[ty])
                return this.map[ty][tx];
        }

        this.setTileChar = (x,y,char) => {
            if (charIndex[char] !== undefined)
                setTileId(x,y,charIndex[char]);
            return this;
        }

        this.setX = (px) => {
            this.x = px;
            return this;
        }

        this.setY = (py) => {
            this.y = py;
            return this;
        }

        this.setZIndex = (zi)=> {
            if (!this.removed)
                game.changeSpriteZIndex(this,zi);
            this.zIndex = zi;
            return this;
        }

        this.animate = () => {

        }

        this.draw = ()=>{
            game.drawSimpleImage(this.image, this.x, this.y);
            return this;
        }

        this.addTag = (tag) => {
            if (!this.tags[tag]) {
                this.tags[tag] = true;
                tags.push(tag);
                game.addSpriteTag(this,tag);
            }
            return this;
        }

        this.removeTag = (tag) => {
            if (this.tags[tag]) {
                delete this.tags[tag];
                game.removeSpriteTag(this,tag);
            }
            return this;
        }

        this.getCollidingWalls = (walls, collision, sprite)=>{
            let
				startX=sprite.x+sprite.hitboxX-this.x,
                endX=startX+sprite.hitboxWidth-COLLISIONPRECISION,
                startY=sprite.y+sprite.hitboxY-this.y,
                endY=startY+sprite.hitboxHeight-COLLISIONPRECISION;

            startX=~~(startX/this.tileWidth);
            endX=~~(endX/this.tileWidth);
            startY=~~(startY/this.tileHeight);
            endY=~~(endY/this.tileHeight);

            for (let x=startX;x<=endX;x++)
                for (let y=startY;y<=endY;y++)
                    if (this.map[y]) {
                        let tile = this.map[y][x];
                        if (tile && tile.tags)
                            for (let i=0;i<collision.withTileTags.length;i++)
                                if (tile.tags.indexOf(collision.withTileTags[i]) != -1)
                                    walls[this.id+"-"+x+"-"+y]=true;
                    }

        }

        this.collidesWith = (prevcollisions, collision, sprite, speed, props, side) => {
            let
                id,
                check = true,
                direction = 1,
                startX=sprite.x+sprite.hitboxX-this.x,
                endX=startX+sprite.hitboxWidth-COLLISIONPRECISION,
                startY=sprite.y+sprite.hitboxY-this.y,
                endY=startY+sprite.hitboxHeight-COLLISIONPRECISION;

            startX=~~(startX/this.tileWidth);
            endX=~~(endX/this.tileWidth);
            startY=~~(startY/this.tileHeight);
            endY=~~(endY/this.tileHeight);

            switch (props.id) {
                case 0:{
                    if (speed<0) {
                        let tmp = startX;
                        startX = endX;
                        endX = tmp-1;
                        direction = -1;
                    } else endX++;
                    for (let x=startX;check && (x!=endX);x+=direction)
                        for (let y=startY;y<=endY;y++) {
                            if (this.map[y]) {
                                let tile = this.map[y][x];
                                if (tile && tile.tags) {
                                    for (let i=0;i<collision.withTileTags.length;i++)
                                        if (tile.tags.indexOf(collision.withTileTags[i]) != -1) {
                                            id = this.id+"-"+x+"-"+y;
                                            if (!prevcollisions[id]) {
                                                sprite.addCollision(id,this,collision.withTileTags[i],side?props.higherSide:props.lowerSide);
                                                if (check) {
                                                    manageTileCollision(sprite, collision, speed, x, props, side);
                                                    check = false;
                                                }
                                            }
                                        }
                                }
                            }
                        }
                    break;
                }
                case 1:{
                    if (speed<0) {
                        let tmp = startY;
                        startY = endY;
                        endY = tmp-1;
                        direction = -1;
                    } else endY++;
                    for (let y=startY;check && (y!=endY);y+=direction)
                        for (let x=startX;x<=endX;x++) {
                            if (this.map[y]) {
                                let tile = this.map[y][x];
                                if (tile && tile.tags) {
                                    for (let i=0;i<collision.withTileTags.length;i++)
                                        if (tile.tags.indexOf(collision.withTileTags[i]) != -1) {
                                            id = this.id+"-"+x+"-"+y;
                                            if (!prevcollisions[id]) {
                                                sprite.addCollision(id,this,collision.withTileTags[i],side?props.higherSide:props.lowerSide);
                                                if (check) {
                                                    manageTileCollision(sprite, collision, speed, y, props, side);
                                                    check = false;
                                                }
                                            }
                                        }
                                }
                            }
                        }
                    break;
                }
            }

        }

        if (config.map)
            config.map.forEach((line,y)=>{
                for (let x=0;x<line.length;x++)
                    this.setTileChar(x,y,line[x]);
            });
        if (config.tags)
            config.tags.forEach(tag=>this.addTag(tag));

        this.setX(x==undefined?config.x==undefined?0:config.x:x);
        this.setY(y==undefined?config.y==undefined?0:config.y:y);
        this.setZIndex(config.zIndex==undefined?0:config.zIndex);
    }

    this.newTilemap = (config, x,y, width, height) => {
        spriteId++;
        return new Tilemap(this, spriteId, config, x, y, width, height);
    }

    this.addNewTilemap = (config, x,y, width, height) => {
        return this.newTilemap(config, x,y, width, height).add();
    }

    // Text
    
    let
        fontsToLoad = settings.fonts||[];

    let loadFonts = (cb) => {
        if (fontsToLoad.length) {

            setLoadingMessage("Loading fonts ("+fontsToLoad.length+" left)")
            
            let font = fontsToLoad.shift();

            loadImage(resourcesPrefix+font.src,(loadedFont)=>{

                // Prepare stats
                let
                    outlineColor=this.palette[font.outlineColor].rgb,
                    lettersCount=loadedFont.width/(font.letterWidth+font.letterSpacing),
                    letterHeight=loadedFont.height,
                    letterWidth=font.letterWidth,
                    outlineLetterHeight=letterHeight+OUTLINE*2,
                    outlineLetterWidth=letterWidth+OUTLINE*2;

                // Prepare output
                let
                    outlineFont=this.newImage(outlineLetterWidth*lettersCount, outlineLetterHeight*this.palette.length),
                    normalFont=this.newImage(letterWidth*lettersCount, letterHeight*this.palette.length);

                outlineFont.letterWidth = outlineLetterWidth;
                outlineFont.letterHeight = outlineLetterHeight;
                outlineFont.letterSpacing = -1;

                normalFont.letterWidth = letterWidth;
                normalFont.letterHeight = letterHeight;
                normalFont.letterSpacing = 0;

                this.palette.forEach((rendercolor,colorid)=>{
                    let
                        rgbcolor=rendercolor.rgb,
                        ox=0,
                        oy=colorid*outlineLetterHeight,
                        noy=colorid*letterHeight,
                        _y1=0;
                    for (let i=0;i<lettersCount;i++) {
                        let
                            nlx=ox+(i*letterWidth),
                            lx=ox+(i*outlineLetterWidth),
                            nly=noy,
                            ly=oy,
                            _x1=i*(font.letterWidth+font.letterSpacing);
                        
                        // Outline
                        for (let y=0;y<letterHeight;y++) {
                            let dy=ly+y+1;
                            for (let x=0;x<letterWidth;x++) {
                                let dx=lx+x+1;
                                var color=this.getPixel(loadedFont,x+_x1,y+_y1);
                                if (color[3]) {
                                    this.putPixel(outlineFont,dx-1,dy,outlineColor);
                                    this.putPixel(outlineFont,dx+1,dy,outlineColor);
                                    this.putPixel(outlineFont,dx,dy-1,outlineColor);
                                    this.putPixel(outlineFont,dx,dy+1,outlineColor);
                                        
                                    this.putPixel(outlineFont,dx-1,dy-1,outlineColor);
                                    this.putPixel(outlineFont,dx-1,dy+1,outlineColor);
                                    this.putPixel(outlineFont,dx+1,dy-1,outlineColor);
                                    this.putPixel(outlineFont,dx+1,dy+1,outlineColor);
                                }
                            }
                        }
                        
                        // Font
                        for (var y=0;y<letterHeight;y++) {
                            let
                                dy=ly+y+1,
                                ndy=nly+y;
                            for (var x=0;x<letterWidth;x++) {
                                let
                                    dx=lx+x+1,
                                    ndx=nlx+x,
                                    color=this.getPixel(loadedFont,x+_x1,y+_y1);
                                if (color[3]) {
                                    this.putPixel(outlineFont,dx,dy,rgbcolor);
                                    this.putPixel(normalFont,ndx,ndy,rgbcolor);
                                }
                            }
                        }
                    }

                });

                outlineFont.ctx.putImageData(outlineFont.imgdata,0,0);
                normalFont.ctx.putImageData(normalFont.imgdata,0,0);

                this.fonts[font.id]={
                    normal:normalFont,
                    outline:outlineFont
                };

                delay(()=>{
                    loadFonts(cb);
                })
                
            });
   
        } else {
            setLoadingMessage();
            cb();
        }
    };

    this.print = (font, color, text, x, y, into) => {
        x=~~x;
        y=~~y;
        if (!into) into = canvas;
        text=String(text);
        let sy=font.letterHeight*color;
        for (let i=0;i<text.length;i++) {
            let sx=(text.charCodeAt(i)-32)*font.letterWidth;
            into.ctx.drawImage(font.node,sx,sy,font.letterWidth,font.letterHeight,x,y,font.letterWidth,font.letterHeight);
            x+=font.letterWidth+font.letterSpacing;
        }
    }

    this.printImage = (font, color, text) => {
        text=String(text);
        let out=this.newImage(text.length*(font.letterWidth+font.letterSpacing),font.letterHeight);
        this.print(font, color, text, 0, 0, out);
        return out;
    }

    // Image blitting

    this.drawSimpleImage = (image, x, y, into) => {
        if (!into) into = canvas;
        into.ctx.drawImage(image.node,x,y);
    }

    this.drawPartImage = (image, x, y, ox, oy, width, height, into) => {
        if (!into) into = canvas;
        into.ctx.drawImage(image.node,ox,oy,width,height,x,y,width,height);
    }

    this.drawSimpleCell = (cell, frame, x, y, into) => {
        if (!into) into = canvas;
        let framedata = cell.frames[~~frame];
        into.ctx.drawImage(cell.image.node,framedata.x1,framedata.y1,framedata.width,framedata.height,~~x,~~y,framedata.width,framedata.height);
    }

    this.clearSimpleCell = (cell, frame, x, y, into) => {
        if (!into) into = canvas;
        let framedata = cell.frames[~~frame];
        into.ctx.clearRect(~~x,~~y,framedata.width,framedata.height);
    }

    this.drawCell = (cell, frame, x, y, flipx, flipy, angle, opacity, scale, into) => {
        if (!into) into = canvas;
        let framedata = cell.frames[~~frame];

        if (flipx||flipy||angle||(opacity<1)||(scale!=1)) {

            var
                tx=framedata.width/2,
                ty=framedata.height/2,
                fx=flipx?-scale:scale,
                fy=flipy?-scale:scale;

            into.ctx.save();
            into.ctx.transform(fx,0,0,fy,(~~x)+tx, (~~y)+ty);
            into.ctx.rotate(angle*DEGTORAD);
            into.ctx.translate(-tx, -ty);
            into.ctx.globalAlpha=opacity;
            into.ctx.drawImage(cell.image.node,framedata.x1,framedata.y1,framedata.width,framedata.height,0,0,framedata.width,framedata.height);
            into.ctx.restore();

        } else
            into.ctx.drawImage(cell.image.node,framedata.x1,framedata.y1,framedata.width,framedata.height,~~x,~~y,framedata.width,framedata.height);
    }

	this.fillRect = (color, x, y, width, height, into) => {
        if (!into) into = canvas;
		into.ctx.fillStyle = color.html;
        into.ctx.fillRect(~~x,~~y,~~width,~~height);
    }

    this.clearRect = (x, y, width, height, into) => {
        if (!into) into = canvas;
        into.ctx.clearRect(~~x,~~y,~~width,~~height);
    }

    this.clearCircle = (x,y,radius,into)=>{
        if (!into) into = canvas;
        into.ctx.save();
        into.ctx.globalCompositeOperation = 'destination-out';
        into.ctx.beginPath();
        into.ctx.arc(x, y, ~~radius, 0, 2 * Math.PI, false);
        into.ctx.fill();
        into.ctx.restore();
    }

    this.clearImage = (into) => {
        if (!into) into = canvas;
        into.node.width = into.node.width;
    }

    this.clearScreen = () => {
        canvas.node.width = canvas.node.width;
    }  

    // Game cycle
    
    let
        prevScene,
        delta = 0,
        renderer = false,
        sceneStarted = false,
        mspf = 1000/settings.fps,
        time_step = mspf,
        lastframems = 0;

    let frame =(timestamp)=>{
        if (this.scene) {

            if (!timestamp) timestamp = 0;
            if (!lastframems) lastframems = timestamp;
            
            if (timestamp < lastframems + mspf) {
                requestAnimationFrame(frame);
                return;
            }

            delta += timestamp - lastframems;
            lastframems = timestamp;

            let
                num_update_steps = 0,
                stepsLimit = settings.frameSkip;
            while (delta >= time_step) {
                updateControls();
                do {
                    if (prevScene) {
                        if (prevScene.onExit) prevScene.onExit(this, this.scene);
                        prevScene = 0;
                    }
                    if (!sceneStarted) {
                        sceneStarted = true;
                        if (this.scene.onEnter) this.scene.onEnter(this, this.scene, time_step);
                    }
                    if (!prevScene && this.scene.onLogic) this.scene.onLogic(this, this.scene, time_step);
                } while (prevScene);
                delta -= time_step;
                if (!--stepsLimit) {
                    delta=0;
                    lastframems = 0;
                    break;
                }
            }

            this.scene.onDraw(this, this.scene);
            if (renderer) renderer(timestamp);

            requestAnimationFrame(frame);
        
        } else requestAnimationFrame(frame);
    }

    this.setScene = (newscene)=>{
        if (!newscene) debugger;
        prevScene = this.scene;
        sceneStarted = false;
        this.scene = newscene;
        return newscene;
    }

    // Game configuration
    
    let
        preparePage=()=>{
            document.body.style.padding="0px";
            document.body.style.margin="0px";
            document.body.style.overflow="hidden";
            document.body.style.backgroundColor = settings.pageBackgroundColor;
        },
        configRow=0,
        loadingSpan=0,
        guiPanel=0,
        guiKeyMap=[],
        guiAudioEnabled=0,
        guiCrtEnabled=0;

    let setLoadingMessage=(message)=>{
        if (loadingSpan)
            loadingSpan.innerHTML=message||"";
    }

    let updateConfigurationGui=()=>{
        guiKeyMap.forEach((input,id)=>{
            input.value=KEYSYMBOLS[settings.watchKeys[id].keyCode]||String.fromCharCode(settings.watchKeys[id].keyCode);
            input.style.backgroundColor=settings.pageBackgroundColor;
            input.style.border="1px solid "+settings.configure.color;
            input.style.color=settings.configure.color;
        });
        guiAudioEnabled.checked=settings.audioEnabled?"checked":"";
        guiCrtEnabled.checked=settings.crt?"checked":"";
    }

    let createRow=(table,label)=>{
        if (!configRow || (configRow.childElementCount == 4)) {
            configRow = document.createElement("tr");
            table.appendChild(configRow);
        }
        let cell=document.createElement("td");
        cell.style.whiteSpace="nowrap";
        cell.innerHTML=label;
        configRow.appendChild(cell);
        cell=document.createElement("td");
        cell.style.whiteSpace="nowrap";
        configRow.appendChild(cell);
        return cell;
    }

    let createSpan=(container,text)=>{
        let span=document.createElement("span");
        span.innerHTML=text;
        span.style.color=settings.configure.color;
        span.style.fontFamily=settings.configure.fontFamily;
        span.style.fontSize=settings.configure.fontSize;
        container.appendChild(span);
        return span;
    }

    let createCheckbox=(container,onchange)=>{
        let checkbox=document.createElement("input");
        checkbox.type="checkbox";
        container.appendChild(checkbox);
        checkbox.onchange=onchange;
        createSpan(container,"Enabled");
        return checkbox;
    }

    let formatSmallInput=(input)=>{
        input.style.padding="5px";
        input.style.textAlign="center";
        input.style.cursor="pointer";
        input.style.marginRight="5px";
        input.style.borderRadius="5px";
        input.style.fontSize=settings.configure.fontSize;
    }

    let formatInput=(input)=>{
        formatSmallInput(input);
        input.style.width="150px";
    }

    let prepareConfig=()=>{
        settings.watchKeys.forEach(control=>{
            control.defaultKeyCode=control.keyCode;
        });
        if (settings.audioEnabled===undefined) settings.audioEnabled=true;
        if (settings.crt===undefined) settings.crt=true;
    }

    let loadConfig=()=>{
        let config=this.loadData("config");
        if (config) {
            if (config.watchKeys)
                config.watchKeys.forEach((setting,id)=>{
                    if (settings.watchKeys[id]) {
                        if (setting.keyCode!==undefined)
                            settings.watchKeys[id].keyCode=setting.keyCode;
                    }
                });
            if (config.audioEnabled !== undefined)
                settings.audioEnabled=config.audioEnabled;
            if (config.crt !== undefined)
                settings.crt=config.crt;
        }
    }

    let saveConfig=()=>{
        let config={
            watchKeys:[],
            audioEnabled:settings.audioEnabled,
            crt:settings.crt
        };
    
        settings.watchKeys.forEach(setting=>{
            config.watchKeys.push({
                keyCode:setting.keyCode
            })
        });

        this.saveData("config",config);
    }

    let addConfigImage=(panel)=>{
        let image=document.createElement("img");
        image.src=resourcesPrefix+settings.configure.image;
        image.style.margin="auto";
        image.style.display="block";
        image.style.marginBottom="20px";
        panel.appendChild(image);
        return image;
    }

    let delay=(cb)=>{
        setTimeout(cb,10);
    }

    this.scheduleLoadingMessage=(message,cb)=>{
        setLoadingMessage(message);
        delay(cb);
    }

    this.configure =(node)=>{
        preparePage();
        prepareConfig();
        loadConfig();
        guiPanel=document.createElement("div");
        let
            credits=document.createElement("div"),
            notes=document.createElement("div"),
            config=document.createElement("table"),
            audioEnabled=createRow(config,"Audio"),
            crtEnabled=createRow(config,"CRT Effect");

        credits.style.position="absolute";
        credits.style.fontFamily=settings.configure.fontFamily;
        credits.style.fontSize=settings.configure.fontSize;
        credits.style.textAlign="center";
        credits.style.left=credits.style.right=credits.style.bottom="0px";
        credits.style.padding="10px";
        credits.style.color=settings.configure.color;
        credits.style.backgroundColor=settings.pageBackgroundColor;
        credits.style.zIndex=10;
        credits.innerHTML=settings.configure.credits;

        notes.style.marginTop="20px";
        notes.style.fontFamily=settings.configure.fontFamily;
        notes.style.fontSize=settings.configure.fontSize;
        notes.style.color=settings.configure.color;
        notes.innerHTML=settings.configure.notes;

        let anchors=credits.getElementsByTagName("A");
        for (let i=0;i<anchors.length;i++)
            anchors[i].style.color=settings.configure.color;

        guiPanel.style.position="absolute";
        guiPanel.style.top="50%";
        guiPanel.style.left="50%";
        guiPanel.style.transform="translateX(-50%) translateY(-50%)";
        guiPanel.style.textAlign="center";

        addConfigImage(guiPanel);

        config.style.color=settings.configure.color;
        config.style.fontFamily=settings.configure.fontFamily;
        config.style.fontSize=settings.configure.fontSize;
        guiPanel.appendChild(config);

        guiAudioEnabled=createCheckbox(audioEnabled,()=>{
            settings.audioEnabled=!!guiAudioEnabled.checked;
            updateConfigurationGui();
        });

        guiCrtEnabled=createCheckbox(crtEnabled,()=>{
            settings.crt=!!guiCrtEnabled.checked;
            updateConfigurationGui();
        });

        configRow=0;

        settings.watchKeys.forEach((control,id)=>{
            let
                cell=createRow(config,"Player "+(control.id+1)+" "+control.label),
                input=document.createElement("input");
            guiKeyMap[id]=input;
            input.readOnly=true;
            formatInput(input);
            input.onclick=(e)=>{
                input.value="Press any key...";
                input.style.backgroundColor=settings.configure.color;
                input.style.border="1px solid "+settings.pageBackgroundColor;
                input.style.color=settings.pageBackgroundColor;
                input.onkeydown = (e)=>{
                    control.keyCode=e.keyCode;
                    input.onkeydown=0;
                    updateConfigurationGui();
                };
            }
            cell.appendChild(input);
            let defaultinput=document.createElement("input");
            defaultinput.type="button";
            defaultinput.value="Reset";
            defaultinput.onclick=(e)=>{
                control.keyCode=control.defaultKeyCode;
                updateConfigurationGui();
            }
            formatSmallInput(defaultinput);
            cell.appendChild(defaultinput);
        });

        configRow=0;

        let startButton=document.createElement("input");

        startButton.type="button";
        startButton.value="Play!";
        startButton.style.backgroundColor=settings.configure.color;
        startButton.style.border="1px solid "+settings.pageBackgroundColor;
        startButton.style.marginTop="20px";
        startButton.style.color=settings.pageBackgroundColor;
        startButton.onclick=()=>{
            guiPanel.innerHTML="";
            let image=addConfigImage(guiPanel);
            loadingSpan=createSpan(guiPanel,"");
            loadingSpan.style.display="block";
            loadingSpan.style.textAlign="center";
            image.className="floating";

            credits.parentNode.removeChild(credits);
            saveConfig();
            setTimeout(()=>{
                this.start();
            },10)
            
        }
        formatInput(startButton);
        guiPanel.appendChild(notes);
        guiPanel.appendChild(startButton);

        node.appendChild(guiPanel);
        node.appendChild(credits);
        updateConfigurationGui();
    }

    // Wakelock
    
    let wakelock;
    
    let getWakeLock=async()=>{
        if (this.isWakeLock && !wakelock) {
            try {
                wakelock = await navigator.wakeLock.request('screen');
            } catch (err) {
                wakelock=0;
            }
        }
    }

    let releaseWakeLock=async()=> {
        if (this.isWakeLock && wakelock) {
            wakelock.release();
            wakelock=0;
        }
    }

    function onVisibilityChange() {
        switch (document.visibilityState) {
            case "visible":{
                getWakeLock();
                break;
            }
            case "hidden":{
                releaseWakeLock();
                break;
            }
        }   
    }
           

    // Game start

    let
        displayNode,
        canvas,
        doResize,
        maxScale=settings.maxScale;

    this.scene = 0;
    this.scenes = 0;
    this.keyboard = {};
    this.fonts = {};
    this.images = {};
    this.cells = {};
    this.palette = [];

    let resizeScreen=()=>{
        if (doResize) {
            doResize--;
            let
                screenWidth=document.body.clientWidth,
                screenHeight=document.body.clientHeight,
                ratio=Math.min(
                    Math.floor(screenWidth/settings.width*10)/10,
                    Math.floor(screenHeight/settings.height*10)/10
                ),x,y;

            if (maxScale) ratio=Math.min(maxScale);

            x=Math.floor((screenWidth-(ratio*settings.width))/2);
            y=Math.floor((screenHeight-(ratio*settings.height))/2);

            canvas.node.style.transformOrigin="0 0";
            canvas.node.style.transform="translate("+x+"px,"+y+"px) scale("+ratio+")";
        }
    }

    this.start = ()=>{
        displayNode = document.createElement("div");
        document.body.appendChild(displayNode);
        this.audioEnabled=settings.audioEnabled===undefined?true:settings.audioEnabled;
        this.musicEnabled=settings.musicEnabled===undefined?true:settings.musicEnabled;
        this.effectsEnabled=settings.effectsEnabled===undefined?true:settings.effectsEnabled;  
        if (this.isWakeLock) {
            document.addEventListener('visibilitychange', onVisibilityChange);
            document.addEventListener("fullscreenchange", onVisibilityChange);
            getWakeLock();
        }
        settings.palette.forEach(color=>{
            this.palette.push({
                rgb:color,
                html:"rgba("+color[0]+","+color[1]+","+color[2]+","+Math.floor(color[3]/255)+")"
            })
        });  
        if (settings.crt) {
            // Forces deep black as color 0
            this.palette[0]={
                rgb:[0,0,0,255],
                html:"rgba(0,0,0,1)"
            };
        }
  
        loadAudio(()=>{
            loadFonts(()=>{
                loadImages(()=>{
                    this.scheduleLoadingMessage("Hold on!",()=>{
                        if (guiPanel) {
                            guiPanel.parentNode.removeChild(guiPanel);
                            loadingSpan=0;
                        }
                        this.scenes = scenesloader(this);
                        if (this.scenes && this.scenes.default) {
                            preparePage();
                            document.body.onmousedown=function(e) {
                                setFullScreen();
                                return false;
                            }
                            document.body.ontouchstart=function(e) {
                                setFullScreen();
                                e.preventDefault();
                                return false;
                            }
                            this.watchKeys(settings.watchKeys||[]);
                            window.addEventListener("gamepadconnected", (e) => {
                                useGamepads=true;
                                if (e.gamepad.buttons[0]) gamepadPressedMode=typeof e.gamepad.buttons[0]=="object";
                            });            
                            this.canvas = canvas = this.newImage(settings.width, settings.height);
                            canvas.node.style.backgroundColor = settings.backgroundColor;
                            displayNode.appendChild(canvas.node);
                            document.body.onkeydown = keydown;
                            document.body.onkeyup = keyup;
                            if (settings.crt) {
                                this.clearScreen = () => {
                                    this.fillRect(this.palette[0],0,0,canvas.width,canvas.height);
                                }
                                renderer = initRenderer(canvas.node);
                            } else {
                                doResize=10;
                                window.onresize=()=>{
                                    doResize=10;
                                    resizeScreen();
                                }
                                resizeScreen();
                            }
                            this.setScene(this.scenes.default);
                            frame();
                        }
                    })
                })
            })
        });

    }

    // Setup

    if (settings.resourcesPrefix !== undefined) resourcesPrefix=settings.resourcesPrefix;

    
}
