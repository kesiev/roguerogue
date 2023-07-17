function gameLoadStartings(game,scenes,C) {

    scenes.quitGame={
        onEnter:(game,scene)=>{
            window.close();
        },
        onLogic:(game,scene)=>{},
        onDraw:(game,scene)=>{}
    }

    scenes.default={
        sprites:{
            panel:{
                zIndex:10,
                scale:0,
                animations:{
                    default:{
                        cells:game.cells.panel,
                    }
                },
                states:{
                    default:{
                        onLogic:(game,scene,sprite)=>{
                            if (sprite.scale<1)
                                sprite.setScale(sprite.scale+0.01);
                        }
                    }
                }
            },
            kesiev:{
                zIndex:10,
                animations:{
                    default:{
                        cells:game.cells.kesiev,
                    }
                }
            },
            rogue:{
                zIndex:20,
                animations:{
                    default:{
                        loop:true,
                        cells:game.cells.rogue,
                        speed:0.05
                    }
                },
                states:{
                    default:{
                        onEnter:(game,scene,sprite)=>{
                            sprite.timer=C.SCREENWIDTH;
                        },
                        onLogic:(game,scene,sprite)=>{
                            if (sprite.timer)
                                sprite.timer--;
                            else
                                sprite.setSpeedX(0);
                        }
                    }
                }
            }
        },
        onEnter:(game,scene)=>{
            game.clearSprites();
            C.initializeGame(game,scene);
            game.addNewSprite(scene.sprites.panel,Math.floor((C.SCREENWIDTH-game.cells.panel.frames[0].width)/2),28);
            game.addNewSprite(scene.sprites.rogue,Math.floor((C.SCREENWIDTH-game.cells.rogue.frames[0].width)/2)-10-C.SCREENWIDTH,40).setSpeedX(1);
            game.addNewSprite(scene.sprites.rogue,Math.floor((C.SCREENWIDTH-game.cells.rogue.frames[0].width)/2)+10+C.SCREENWIDTH,84).setSpeedX(-1);
            game.addNewSprite(scene.sprites.kesiev,Math.floor((C.SCREENWIDTH-game.cells.kesiev.frames[0].width)/2),145);
            scene.creditsTimer=C.CREDITTIMER;
            if (C.DEBUG.enabled) {
                if (C.DEBUG.cheats)
                    for (let k in C.DEBUG.cheats)
                        C.MEMORY.cheats[k]=C.DEBUG.cheats[k];
                if (C.DEBUG.joinPlayer2)
                    C.markPlayerAsAlive(game,scene,1);
                if (C.DEBUG.minigame) {
                    C.MEMORY.playMinigame=C.DEBUG.minigame;
                    C.MEMORY.showMinigame=1;
                }
                if (C.DEBUG.skin) {
                    C.MEMORY.players[0].skin=C.DEBUG.skin;
                    C.MEMORY.players[1].skin=C.DEBUG.skin;
                }
                if (C.DEBUG.defaultFireMode) {
                    C.MEMORY.players[0].fireMode=C.DEBUG.defaultFireMode;
                    C.MEMORY.players[0].defaultFireMode=C.DEBUG.defaultFireMode;
                    C.MEMORY.players[1].fireMode=C.DEBUG.defaultFireMode;
                    C.MEMORY.players[1].defaultFireMode=C.DEBUG.defaultFireMode;
                }
                if (C.DEBUG.defaultFireHold) {
                    C.MEMORY.players[0].fireHold=C.DEBUG.defaultFireHold;
                    C.MEMORY.players[0].defaultFireHold=C.DEBUG.defaultFireHold;
                    C.MEMORY.players[1].fireHold=C.DEBUG.defaultFireHold;
                    C.MEMORY.players[1].defaultFireHold=C.DEBUG.defaultFireHold;
                }
                if (C.DEBUG.defaultLockSide) {
                    C.MEMORY.players[0].lockSide=C.DEBUG.defaultLockSide;
                    C.MEMORY.players[0].defaultLockSide=C.DEBUG.defaultLockSide;
                    C.MEMORY.players[1].lockSide=C.DEBUG.defaultLockSide;
                    C.MEMORY.players[1].defaultLockSide=C.DEBUG.defaultLockSide;
                }
                if (C.DEBUG.defaultFiringAnimation) {
                    C.MEMORY.players[0].defaultFiringAnimation=C.DEBUG.defaultFiringAnimation;
                    C.MEMORY.players[1].defaultFiringAnimation=C.DEBUG.defaultFiringAnimation;
                    C.MEMORY.players[0].firingAnimation=C.DEBUG.defaultFiringAnimation;
                    C.MEMORY.players[1].firingAnimation=C.DEBUG.defaultFiringAnimation;
                }
                if (C.DEBUG.defaultCanSquish) {
                    C.MEMORY.players[0].canSquish=C.DEBUG.defaultCanSquish;
                    C.MEMORY.players[1].canSquish=C.DEBUG.defaultCanSquish;
                    C.MEMORY.players[0].defaultCanSquish=C.DEBUG.defaultCanSquish;
                    C.MEMORY.players[1].defaultCanSquish=C.DEBUG.defaultCanSquish;
                }
                if (C.DEBUG.defaultCanCutJump) {
                    C.MEMORY.players[0].canCutJump=C.DEBUG.defaultCanCutJump;
                    C.MEMORY.players[1].canCutJump=C.DEBUG.defaultCanCutJump;
                    C.MEMORY.players[0].defaultCanCutJump=C.DEBUG.defaultCanCutJump;
                    C.MEMORY.players[1].defaultCanCutJump=C.DEBUG.defaultCanCutJump;
                }
                if (C.DEBUG.darkness)
                    C.MEMORY.darkness=C.DEBUG.darkness;
                if (C.DEBUG.scheduledLetterBubbles)
                    C.MEMORY.scheduledLetterBubbles=C.DEBUG.scheduledLetterBubbles;
                if (C.DEBUG.allLetters) {
                    C.gainLetter(game,scene,0,0);
                    C.gainLetter(game,scene,0,1);
                    C.gainLetter(game,scene,0,2);
                    C.gainLetter(game,scene,0,3);
                    C.gainLetter(game,scene,0,4);
                }
                if (C.DEBUG.skipIntro) {
                    C.markPlayerAsAlive(game,scene,0);
                    game.setScene(game.scenes.play);
                }
                if (C.DEBUG.debrief)
                    game.setScene(game.scenes.debrief);
                if (C.DEBUG.tutorial)
                    game.setScene(game.scenes.tutorial);
                if (C.DEBUG.attractMode)
                    game.setScene(game.scenes.attract);
            }
            scene.cheatSequence="";
            scene.title="";
            scene.tutorialTimer=C.TUTORIALTIMER;
            if (scene.attractType === undefined) scene.attractType=0;
        },
        onLogic:(game,scene)=>{
            let sequenceChanged=false;
            game.logicSprites();
            C.MEMORY.players.forEach((player,p)=>{
                if (game.isKioskModeQuit(p)) {
                    C.gotoScene(game,scene,game.scenes.quitGame);
                } else if (C.MEMORY.credits && !player.isInGame && game.controlIsReleased(game.controls[p].start)) {
                    C.MEMORY.credits--;
                    C.markPlayerAsAlive(game,scene,p);
                    C.increaseGlobalCounter(game,scene,"timesJoined");
                    C.gotoScene(game,scene,game.scenes.intro);
                    if (C.MEMORY.cheats.superMode)
                        C.MEMORY.enemyMap=1;
                    if (C.MEMORY.cheats.scheduleBonus)
                        C.MEMORY.cheats.scheduleBonus.forEach(bonus=>{
                            C.scheduleNextBonus(game,scene,bonus,true);
                        })
                    if (C.MEMORY.cheats.enableEndings)
                        C.MEMORY.cheats.disableEndings=false;
                }
            });
            for (let i=0;i<C.PLAYERSCOUNT;i++)
                C.CHEATCONTROLS.forEach(control=>{
                    if (game.controlIsHit(game.controls[i][control.button])) {
                        scene.tutorialTimer=C.TUTORIALTIMER;
                        scene.cheatSequence+=control.cheatLetter;
                        sequenceChanged=true;
                    }
                });
            if (scene.creditsTimer) {
                scene.creditsTimer--;
                if (C.MEMORY.credits<C.STARTINGCREDITS) {
                    if (scene.creditsTimer == C.CREDITTIME)
                        game.playAudio(game.audio.insertcoin);
                    else if (!scene.creditsTimer) {
                        game.playAudio(game.audio.powerup);
                        C.MEMORY.credits = C.STARTINGCREDITS;
                    }
                }
            }
            if (sequenceChanged) {
                scene.cheatSequence= scene.cheatSequence.substr(0,100);
                C.CHEATS.forEach(cheat=>{
                    if (scene.cheatSequence.endsWith(cheat.letters)) {
                        if (cheat.setTitle) scene.title=cheat.setTitle;
                        if (cheat.playAudio) game.playAudio(cheat.playAudio);
                        if (cheat.set)
                            for (let k in cheat.set)
                                C.MEMORY.cheats[k]=cheat.set[k];
                        scene.cheatSequence="";
                    }
                })
            }
            if (scene.tutorialTimer) {
                scene.tutorialTimer--;
                if (!scene.tutorialTimer) {
                    scene.attractType=(scene.attractType+1)%2;
                    switch (scene.attractType) {
                        case 0:{
                            C.gotoScene(game,scene,game.scenes.attract);
                            break;
                        }
                        case 1:{
                            C.gotoScene(game,scene,game.scenes.tutorial);
                            break;
                        }
                    }
                }   
            }
        },
        onDraw:(game, scene)=>{
            game.clearScreen();
            game.drawSprites();
            C.showIdleGui(game,scene,true);
            game.drawSimpleImage(C.LABELS.credits,C.CREDITSX,C.CREDITSY);
            game.print(game.fonts.normal.outline,1,C.MEMORY.credits,C.CREDITSCOUNTERX,C.CREDITSY);
            game.drawSimpleImage(C.LABELS.titlerow1,20,176);
            game.drawSimpleImage(C.LABELS.titlerow2,48,192);
            if (scene.title)
                game.print(game.fonts.normal.outline,1,scene.title,40,29);
        }
    };

    scenes.intro={
        sprites:{
            player:{
                zIndex:10,
                animations:[
                    {
                        walk:{
                            loop:true,
                            cells:game.cells.player1Front,
                            speed:0.05
                        }
                    },{
                        walk:{
                            loop:true,
                            cells:game.cells.player2Front,
                            speed:0.05
                        }
                    }
                ],
                states:{
                    default:{
                        onLogic:(game,scene,sprite)=>{
                            sprite.setX(sprite.centerX+Math.sin(scene.spin)*sprite.radius);
                            sprite.setY(sprite.centerY+Math.cos(scene.spin)*sprite.radius);
                        }
                    }
                }
            },
        },
        onEnter:(game,scene)=>{
            game.clearSprites();
            game.playMusic(game.audio.musicintro);
            scene.spin=0;
            scene.stars=[];
            scene.timer=C.INTROTIMER;
            for (let i=0;i<20;i++)
                scene.stars.push({x:-1,y:-1});
            C.MEMORY.players.forEach((player,p)=>{
                if (player.isInGame) {
                    let sprite = game.addNewSprite(scene.sprites.player);
                    sprite.setAnimation(sprite.animations[p].walk);
                    sprite.centerX=104+(32*p);
                    sprite.centerY=(C.SCREENHEIGHT/2)-8;
                    sprite.radius=10;
                }
            });
        },
        onLogic:(game,scene)=>{
            let start=false;
            scene.spin+=0.05;
            game.logicSprites();
            scene.stars.forEach(star=>{
                if ((star.x<0)||(star.x>C.SCREENWIDTH)||(star.y<0)||(star.y>C.SCREENHEIGHT)) {
                    star.x=C.HSCREENWIDTH;
                    star.y=C.HSCREENHEIGHT;
                    star.angle=(C.RND.randomFloat()*6.28)-3.14;
                    star.speed=2+C.RND.randomFloat()*2;
                    star.size=1;
                    star.color=1+C.RND.randomInteger(7);
                } else {
                    star.x+=Math.sin(star.angle)*star.speed;
                    star.y+=Math.cos(star.angle)*star.speed;
                    star.size+=0.025;
                }
            });
            if (scene.timer) scene.timer--;
            else start=true;
            C.MEMORY.players.forEach((player,p)=>{
                if (player.isInGame && (game.controlIsHit(game.controls[p].a)||game.controlIsHit(game.controls[p].b)))
                    start=true;
            });
            if (start)
                C.gotoScene(game,scene,game.scenes.play);
        },
        onDraw:(game, scene)=>{
            game.clearScreen();
            scene.stars.forEach(star=>{
                game.fillRect(game.palette[star.color],star.x-star.size,star.y-star.size,star.size*2,star.size*2);
            });
            game.drawSprites();
            game.drawSimpleImage(C.LABELS.introrow1,8,8);
            game.drawSimpleImage(C.LABELS.introrow2,2,24);
            game.drawSimpleImage(C.LABELS.introrow3,2,40);
            game.drawSimpleImage(C.LABELS.introrow4,7,56);
        }
    };

}