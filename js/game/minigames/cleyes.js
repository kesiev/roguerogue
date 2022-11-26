function gameLoadMinigameCleyes(game,scene,C) {
    scene.minigames.cleyes={
        onPrepare:(game,scene,minigame)=>{
            minigame.started=0;
            minigame.playerY=C.SCREENHEIGHT-80;
            minigame.cx=C.HSCREENWIDTH-20;
            minigame.scale=1/C.SCREENHEIGHT;
            minigame.disappear=C.SCREENHEIGHT+24;
            minigame.angle=0;
            minigame.dotTimer=0;
            minigame.pinTimer=0;
            minigame.road=[];
            minigame.elements=[];
            minigame.stun=0;
            minigame.flashSpeed=0.01;
            minigame.bushspeed=C.ONESEC*3;
            minigame.timer=C.SCREENHEIGHT+minigame.bushspeed;
            minigame.goalAt=C.ONESEC*60;
            minigame.steerSpeed=0.01;
            minigame.playing=[];
            let playerscount=0;
            C.MEMORY.players.forEach((player,p)=>{
                let isplaying=player.isInGame && !player.isDead;
                if (isplaying)
                    playerscount++;
                minigame.playing.push(isplaying);
            });
            minigame.steerSpeed=0.01/playerscount;
        },
        onEnter:(game,scene,minigame)=>{
            minigame.started=1;
        },
        onLogic:(game,scene,minigame)=>{
            let
                gameover=false,
                times=minigame.started==1?C.SCREENHEIGHT:1;

            if (minigame.goalAt) {
                minigame.started=2;
                
                minigame.goalAt--;
                if (minigame.stun)
                    minigame.stun--;
                else {
                    let steer=0;
                    minigame.playing.forEach((playing,p)=>{
                        if (playing)
                        if (game.controlIsDown(game.controls[p].left))
                            steer+=minigame.steerSpeed;
                        else if (game.controlIsDown(game.controls[p].right))
                            steer-=minigame.steerSpeed;
                    })
                    minigame.angle+=steer;
                    
                    if (minigame.angle<-0.5) minigame.angle=-0.5;
                    if (minigame.angle>0.5) minigame.angle=0.5;

                }
                    
                for (let i=0;i<times;i++) {

                    if (!minigame.timer) {
                        if (minigame.bushspeed>C.ONESEC)
                            minigame.bushspeed-=5;
                        minigame.flashSpeed+=0.0001;
                        minigame.elements.push({ type:0, angle: 0.5-C.RND.randomFloat(),distance:0, photoTimer:90, photoFire:135, hit:true, stun:30, score:100})
                        minigame.timer=minigame.bushspeed;
                    } else minigame.timer--;
                    if (!minigame.dotTimer) {
                        minigame.dotTimer=5;
                        minigame.elements.unshift({ type:1, angle: 0,distance:0})
                    } else minigame.dotTimer--;
                    if (!minigame.pinTimer) {
                        minigame.pinTimer=10;
                        minigame.elements.unshift({ type:2, angle:-0.65,distance:0, side:false})
                        minigame.elements.unshift({ type:2, angle:0.65,distance:0, side:true})
                    } else minigame.pinTimer--;
                    let elements=[];
                    minigame.elements.forEach(element=>{
                        element.distance++;
                        if (element.distance<minigame.disappear)
                            elements.push(element);
                        else
                            if (element.score) {
                                game.playAudio(game.audio.pick);
                                C.allPlayersAddScore(game,scene,element.score);
                            }
                        if (element.photoFire) {
                            element.photoFire--;
                            if (!element.photoFire) {
                                game.playAudio(game.audio.pop);
                                elements.push({ type:4, angle: element.angle, side:C.RND.randomBool(0.5)?-minigame.flashSpeed:minigame.flashSpeed, distance:element.distance, flashTimer:30, hit:true, kill:true})
                            }
                        }
                        if (element.flashTimer) {
                            element.flashTimer--;
                            if (!element.flashTimer)
                                elements.pop();
                            else {
                                element.angle+=element.side;
                                element.show=C.checkBlink(element.flashTimer,2);
                            }
                        }
                        if (element.photoTimer) {
                            element.photoTimer--;
                            if (!element.photoTimer) element.type=3;
                        }
                        if (element.hit) {
                            if ((Math.abs(minigame.angle-element.angle)<0.19)&&(element.distance>160)&&(element.distance<170)) {
                                if (!minigame.stun && element.stun) {
                                    minigame.stun=element.stun;
                                    game.playAudio(game.audio.bolt);
                                }
                                if (element.kill) {
                                    game.playAudio(game.audio.hit);
                                    gameover=true;
                                }
                            }
                        }
                    });
                    minigame.elements=elements;
                }
            } else {
                gameover=true;
                C.allPlayersAddScore(game,scene,100000);
                game.playAudio(game.audio.powerup);
            }
            return gameover;
        },
        onExit:(game,scene,minigame)=>{
        },
        onDrawPre:(game,scene,minigame)=>{
            if (minigame.started) {
                game.fillRect(game.palette[6],8,24,C.SCREENWIDTH-16,C.SCREENHEIGHT-32);
                let
                    drawplayer=true,
                    waveY=Math.sin(minigame.goalAt/10)*3,
                    stunX=minigame.stun?C.checkBlink(minigame.stun,2)?-1:1:0;
                minigame.elements.forEach(element=>{
                    let
                        y=element.distance-24,
                        angle=minigame.angle-element.angle,
                        x=minigame.cx+Math.sin(angle)*element.distance,
                        scale=element.distance*minigame.scale;
                    switch (element.type) {
                        // Large bush
                        case 4:
                        case 3:
                        case 0:{
                            if (drawplayer&&(y>minigame.playerY)) {
                                drawplayer=false;
                                game.drawSimpleCell(game.cells.minigameShadow, 0, C.HSCREENWIDTH-20+stunX, minigame.playerY+20);
                                game.drawSimpleCell(game.cells.minigameShadow, 0, C.HSCREENWIDTH+4+stunX, minigame.playerY+20);
                                game.drawSimpleCell(game.cells.minigameCleyes, 0, C.HSCREENWIDTH-20+stunX, minigame.playerY+17+waveY);
                                game.drawSimpleCell(game.cells.minigameCleyes, 0, C.HSCREENWIDTH+4+stunX, minigame.playerY+17+waveY);
                            }
                            switch (element.type) {
                                case 0:{
                                    game.drawCell(game.cells.minigameLargeBush, 0, x, y, false, false, 0, 1, scale);
                                    break;
                                }
                                case 3:{
                                    game.drawCell(game.cells.minigameLargeBushPhotographer, 0, x, y, false, false, 0, 1, scale);
                                    break;
                                }
                                case 4:{
                                    if (element.show)
                                        game.drawCell(game.cells.minigameLargeFlash, 0, x, y, false, false, 0, 1, scale);
                                    break;
                                }
                            }
                            break;
                        }
                        // Large dot
                        case 1:{
                            game.drawCell(game.cells.minigameLargeDot, 0, x, y, false, false, 0, 1, scale);
                            break;
                        }
                        // Pin
                        case 2:{
                            if (element.side)
                                game.fillRect(game.palette[3],0,y+20-20*scale,x+20-10*scale,7+40*scale);
                            else
                                game.fillRect(game.palette[3],x+20+10*scale,y+20-20*scale,C.SCREENWIDTH,7+40*scale);
                            game.drawCell(game.cells.minigameLargePin, 0, x, y, false, false, 0, 1, scale);
                            break;
                        }
                    }
                });
                if (drawplayer) {
                    game.drawSimpleCell(game.cells.minigameShadow, 0, C.HSCREENWIDTH-20+stunX, minigame.playerY+20);
                    game.drawSimpleCell(game.cells.minigameShadow, 0, C.HSCREENWIDTH+4+stunX, minigame.playerY+20);
                    game.drawSimpleCell(game.cells.minigameCleyes, 0, C.HSCREENWIDTH-20+stunX, minigame.playerY+17+waveY);
                    game.drawSimpleCell(game.cells.minigameCleyes, 0, C.HSCREENWIDTH+4+stunX, minigame.playerY+17+waveY);
                }
                let time=Math.ceil(minigame.goalAt/C.ONESEC);
                game.print(game.fonts.normal.outline,5,"GOAL",110,24);
                game.print(game.fonts.normal.outline,1,time+"mt",110+(time<10?4:0),34);
            }
        }
    }
}