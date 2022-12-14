function gameLoadPlay(game,scenes,C) {
    
    scenes.play={
        minigames:{},
        sprites:{
            edgeWall:{
                width:16,
                height:500,
                tags:["solidwall"]
            },
            gui:{
                zIndex:C.GUIZINDEX,
                states:{
                    default:{
                        onEnter:(game,scene,sprite)=>{
                            sprite.darkness=game.newImage(C.SCREENWIDTH,C.SCREENHEIGHT-16);
                            sprite.timer=1;
                            sprite.messagepanel=false;
                            sprite.darknessTimer=0;
                        },
                        onLogic:(game,scene,sprite)=>{
                            sprite.time--;
                            if (C.MEMORY.darkness) {
                                sprite.darknessTimer=(sprite.darknessTimer+0.05)%6.28;
                            }
                            if (!sprite.time) {
                                sprite.time=C.GUIMESSAGETIMER;
                                sprite.messagepanel=!sprite.messagepanel;
                            }
                            if (!C.MEMORY.isSomeonePlaying) {
                                C.MEMORY.players.forEach((player,p)=>{
                                    if (C.MEMORY.credits && game.controlIsDown(game.controls[p].start)) {
                                        C.MEMORY.isSomeonePlaying = true;
                                        C.joinPlayer(game,scene,p);
                                    }
                                });
                                C.MEMORY.continueTimer--;
                                if (!C.MEMORY.continueTimer) {
                                    if (C.MEMORY.continueTime>0) {
                                        C.MEMORY.continueTimer=C.ONESEC;
                                        C.MEMORY.continueTime--;
                                        if (!C.MEMORY.credits) {
                                            game.stopMusic();
                                            C.setSanityIntensity(game,scene,1);
                                            C.gotoScene(game,scene,game.scenes.debrief);
                                        } else game.playAudio(game.audio.continue);
                                    } else {
                                        game.stopMusic();
                                        C.setSanityIntensity(game,scene,1);
                                        C.gotoScene(game,scene,game.scenes.debrief);
                                    }
                                }
                            }
                        },
                        onDraw:(game,scene,sprite)=>{
                            game.fillRect(game.palette[0], 0, 0, 256,16);
                            if (C.MEMORY.darkness) {
                                if (!scene.minigame && !scene.nodarkness) {
                                    game.fillRect(game.palette[0],0,0,sprite.darkness.width,sprite.darkness.height,sprite.darkness);
                                    game.getSpritesWithTag("bright").forEach(light=>{
                                        if (light.properties.brightness)
                                            game.clearCircle(light.x+light.properties.brightnessX,light.y+light.properties.brightnessY-16,light.properties.brightness+Math.sin(sprite.darknessTimer)*3,sprite.darkness);
                                    })
                                    game.drawSimpleImage(sprite.darkness,0,16);
                                }
                            }
                            game.drawSimpleImage(C.LABELS.highscore, C.HIGHSCOREX, 0);
                            game.drawSimpleImage(C.LABELS.highscoreValue, C.HIGHSCOREVALUEX,8);
                            C.MEMORY.players.forEach((player,p)=>{
                                game.drawSimpleImage(C.LABELS.letters[p],C.LETTERSX[p], C.LETTERSY);
                                if (player.isInGame) {
                                    game.drawSimpleImage(C.LABELS.up[p], C.GUIUPX[p],0);
                                    game.drawSimpleImage(C.LABELS.score[p], player.scoreX,8);
                                    game.drawSimpleImage(C.LABELS.lives[p], C.LIVESX[p],C.LIVESY);
                                } else if (!scene.presenting && !scene.minigame)
                                    if (sprite.messagepanel) {
                                        if (C.MEMORY.credits) {
                                            game.drawSimpleImage(C.LABELS.press[p], C.GUIPRESSX[p],C.GUIMESSAGEY1);
                                            game.drawSimpleImage(C.LABELS.start[p], C.GUISTARTX[p],C.GUIMESSAGEY2);
                                        } else {
                                            game.drawSimpleImage(C.LABELS.insert[p], C.GUIINSERTX[p],C.GUIMESSAGEY1);
                                            game.drawSimpleImage(C.LABELS.coin[p], C.GUICOINX[p],C.GUIMESSAGEY2);
                                        }
                                    } else {
                                        game.drawSimpleImage(C.LABELS.to[p], C.GUITOX[p],C.GUIMESSAGEY1);
                                        game.drawSimpleImage(C.LABELS.play[p], C.GUITPLAYX[p],C.GUIMESSAGEY2);
                                    }
                            });
                            if (scene.stage)
                                game.print(game.fonts.small.outline,1,scene.roundShortName,scene.roundShortNameX,C.SHORTNAMEY);
                            if (C.MEMORY.bonusStage) {
                                if (C.MEMORY.bonusStageTimer) {
                                    let time="TIME: "+Math.ceil(C.MEMORY.bonusStageTimer/C.ONESEC);
                                    game.print(game.fonts.normal.outline,1,time,Math.floor((C.SCREENWIDTH-(time.length*(game.fonts.normal.outline.letterWidth+game.fonts.normal.outline.letterSpacing)))/2),C.BONUSTIMERY);
                                } else if (C.checkBlink(C.MEMORY.bonusStage, C.BLINKSPEED)) {
                                    game.print(game.fonts.normal.outline,C.PLAYERCOLORS[0],C.MEMORY.statusText[0],C.STATUSTEXT1X,C.STATUSTEXTY);
                                    game.print(game.fonts.normal.outline,C.PLAYERCOLORS[1],C.MEMORY.statusText[1],C.STATUSTEXT2X,C.STATUSTEXTY);
                                }
                                game.drawSimpleCell(game.cells.vsPanel,0,C.VSPANELX,C.VSPANELY);
                                game.print(game.fonts.normal.normal,C.PLAYERCOLORS[0],C.MEMORY.players[0].bonusStageCollected,C.BONUSSTAGECOUNTER1X,C.BONUSSTAGECOUNTERY);
                                game.print(game.fonts.normal.normal,C.PLAYERCOLORS[1],C.MEMORY.players[1].bonusStageCollected,C.BONUSSTAGECOUNTER2X,C.BONUSSTAGECOUNTERY);
                            }
                            if (!C.MEMORY.isSomeonePlaying && C.MEMORY.credits) {
                                game.drawSimpleImage(C.DIMMER,0,0);
                                game.drawSimpleImage(C.LABELS.continue,C.CONTINUEX,C.ROUNDNAMEY);
                                game.drawSimpleImage(C.LABELS.credits,C.CREDITSX,C.CREDITSY);
                                game.print(game.fonts.normal.outline,1,C.MEMORY.continueTime,C.CONTINUECOUNTERX,C.READYTEXTY);
                                game.print(game.fonts.normal.outline,1,C.MEMORY.credits,C.CREDITSCOUNTERX,C.CREDITSY);
                            } else {
                                if (C.MEMORY.yendorRoom) {
                                    if (C.MEMORY.yendorRoom>2) 
                                        if (C.checkBlink(C.MEMORY.yendorRoom, C.BLINKSPEED))
                                            game.print(game.fonts.normal.outline,C.PLAYERCOLORS[C.MEMORY.yendorRoomPlayer],"WELL DONE "+(C.MEMORY.yendorRoomPlayer+1)+"UP!",C.WELLDONEX,C.WELLDONEY);
                                }
                                if (C.MEMORY.hurryUp)
                                    game.drawSimpleImage(C.LABELS.hurryup[C.checkBlink(C.MEMORY.hurryUp, C.HURRYUPBLINKSPEED)?0:1],C.HURRYUPX,C.HURRYUPY);
                                if (scene.presenting) {
                                    game.print(game.fonts.normal.outline,1,scene.roundName,scene.roundNameX,C.ROUNDNAMEY);
                                    game.print(game.fonts.normal.outline,1,C.READYTEXT,C.READYTEXTX,C.READYTEXTY);
                                }
                            }
                            
                        }
                    }
                }
            },
            colorStar:{
                tags:["stagesprite","bright"],
                zIndex:C.SPECIALZINDEX,
                y:1000,
                properties:{
                    brightnessX:8,
                    brightnessY:8,
                    brightness:28
                },
                animations:{
                    default:{
                        cells:game.cells.colorStars
                    }
                },
                states:{
                    default:{
                        onLogic:(game,scene,sprite)=>{
                            if (sprite.y>C.SCREENHEIGHT) {
                                sprite.timer=1;
                                sprite.setY(0);
                                sprite.setX(C.RND.randomInteger(C.SCREENWIDTH-16));
                                sprite.setSpeedX(-0.5+C.RND.randomFloat()*1);
                                sprite.setSpeedY(1+C.RND.randomFloat())
                            }
                            sprite.timer--;
                            if (!sprite.timer) {
                                sprite.setFrame(C.RND.randomInteger(6));
                                sprite.timer=10;
                            }
                        }
                    }
                }
            }
        },
        tilemaps:{
            flood:{
                tags:["stagesprite"],
                x:0,
                y:C.SCREENHEIGHT,
                cells:game.cells.flood,
                zIndex:C.BACKGROUNDZINDEX,
                tiles:[
                    { char:".", frame:0 },
                    { char:"m", frame:1 }
                ],
                map:[
                    "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                    "................................",
                ]
            },
            yendorRoom:{
                tags:["tilemap","scrolling"],
                x:0,
                cells:game.cells.yendorRoom,
                zIndex:C.TILEMAPZINDEX,
                tiles:[
                    { char:"*", randomFrame:[6,7,8,9,10,11] },
                    { char:" " },
                    { char:"#", frame:0 },
                    { char:"^", frame:1 },
                    { char:"1", frame:2 },
                    { char:"2", frame:3 },
                    { char:"3", frame:4 },
                    { char:"4", frame:5 },
                    { char:"A", frame:6 },
                    { char:"B", frame:7 },
                    { char:"C", frame:8 },
                    { char:"D", frame:9 },
                    { char:"E", frame:10 },
                    { char:"F", frame:11 },

                ],
                map:[
                    "12############################12",
                    "34****************************34",
                    "12*                     ******12",
                    "34* AAA B B CCC DD   E  ******34",
                    "12* A   B B  C  D D E E ******12",
                    "34* AAA  B   C  DD  EEE ******34",
                    "12* A   B B  C  D D E E ******12",
                    "34* AAA B B  C  D D E E ******34",
                    "12*                          *12",
                    "34*********** F   E  DDD CCC *34",
                    "12*********** F   E  D   C   *12",
                    "34*********** F   E  DD  CCC *34",
                    "12*********** F   E  D   C   *12",
                    "34*********** FFF E  D   CCC *34",
                    "12***********                *12",
                    "34****************************34",
                    "12****************************12",
                    "34                            34",
                    "12                            12",
                    "34                            34",
                    "12****************************12",
                    "34****************************34",
                    "12****************************12",
                    "34****************************34",
                    "12****************************12",
                    "34############################34",
                ]
            },
            minigame:{
                tags:["tilemap","scrolling"],
                x:0,
                cells:game.cells.yendorRoom,
                zIndex:C.TILEMAPZINDEX,
                tiles:[
                    { char:"#", frame:0 }
                ],
                map:[
                    "################################",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "################################",
                ]
            },
            secretsRoom:{
                tags:["tilemap","scrolling"],
                x:0,
                cells:game.cells.secretsRoom,
                zIndex:C.TILEMAPZINDEX,
                tiles:[
                    { char:" " },
                    { char:"#", frame:0, tags:["wall"] },
                    { char:"^", frame:1 },
                    { char:"-", frame:0 },
                    { char:"1", frame:2 },
                    { char:"2", frame:3 },
                    { char:"3", frame:4 },
                    { char:"4", frame:5 },
                    { char:"_", frame:6 },
                    { char:":", frame:7 },
                    { char:"x", frame:8 },
                    { char:";", frame:9 },
                    { char:"o", frame:10 },
                    { char:"W", frame:11 },
                    { char:"w", frame:12 },
                    { char:"m", frame:13 },
                    { char:"[", frame:14 },
                    { char:"]", frame:15 },

                    { char:"I", frame:16 },
                    { char:"C", frame:17 },
                    { char:"z", frame:18 },
                    { char:"i", frame:19 },
                    { char:"=", frame:20 },
                    { char:"|", frame:21 },
                    { char:"H", frame:22 },
                    { char:"s", frame:23 },
                    { char:".", frame:24 },
                    { char:"c", frame:25 },
                    { char:"L", frame:26 },
                ],
                map:[
                    "12----------------------------12",
                    "34  -                      -  34",
                    "12  -                      -  12",
                    "34  -                      -  34",
                    "12  -                      -  12",
                    "34---#####            #####---34",
                    "12                            12",
                    "34           ICzzzi           34",
                    "12   #####    mWWw    #####   12",
                    "34            mWWw            34",
                    "12            mWWw            12",
                    "34#########  _:xx;o  #########34",
                    "12           mWWWWw           12",
                    "34           mWWWWw           34",
                    "12#########  mW[]Ww  #########12",
                    "34           mWWWWw           34",
                    "12          _:xxxx;o          12",
                    "34############################34",
                    "12==|ssssssssssssssssssssssH==12",
                    "34..|ssssssssssssssssssssssH..34",
                    "12==|ssssssssssssssssssssssH==12",
                    "34##|ssssssssssssssssssssssH##34",
                    "12==|ssssssssssssssssssssssH==12",
                    "34cccccccccccccccccccccccccccc34",
                    "12LLLLLLLLLLLLLLLLLLLLLLLLLLLL12",
                    "34############################34",
                ]
            },
            bossRoom:{
                tags:["tilemap","scrolling"],
                x:0,
                cells:game.cells.bossRoom,
                zIndex:C.TILEMAPZINDEX,
                tiles:[
                    { char:" " },
                    { char:"#", frame:0, tags:["wall"] },
                    { char:"^", frame:1 },
                    { char:"-", frame:0 },
                    { char:"1", frame:2 },
                    { char:"2", frame:3 },
                    { char:"3", frame:4 },
                    { char:"4", frame:5 },
                ],
                map:[
                    "12----------------------------12",
                    "34^^^^^^^^^^^^^^^^^^^^^^^^^^^^34",
                    "12                            12",
                    "34                            34",
                    "12                            12",
                    "34       ##          ##       34",
                    "12       ^^          ^^       12",
                    "34                            34",
                    "12                            12",
                    "34                            34",
                    "12    ##       ##       ##    12",
                    "34    ^^       ^^       ^^    34",
                    "12                            12",
                    "34                            34",
                    "12                            12",
                    "34       ##          ##       34",
                    "12       ^^          ^^       12",
                    "34                            34",
                    "12                            12",
                    "34                            34",
                    "12    ##       ##       ##    12",
                    "34    ^^       ^^       ^^    34",
                    "12                            12",
                    "34                            34",
                    "12                            12",
                    "34############################34",
                ]
            }
        },
        onEnter:(game, scene)=>{
            game.clearSprites();
            scene.minigame=0;
            scene.roundShortName="";
            scene.roundShortNameX=0;
            scene.paused=false;
            scene.pausedoption=0;
            scene.pausedtimer=0;
            scene.pausedskip=0;
            scene.deathAppear = 0;
            scene.transitionTimer = 0;
            scene.presenting = 0;
            scene.nodarkness = false;
            scene.stage = 0;

            game.addNewSprite(scene.sprites.edgeWall, 0, -32);
            game.addNewSprite(scene.sprites.edgeWall, 240, -32);
            game.addNewSprite(scene.sprites.gui);
            if (C.DEBUG.enabled && C.DEBUG.map) {
                C.DEBUG.map.cells=C.STAGES[C.MEMORY.stage].cells;
                C.goToStage(game,scene,C.DEBUG.map);
            } else
                C.goToStage(game,scene,C.STAGES[C.MEMORY.stage]);
            C.resetContinueTimer(game,scene);
            if (C.DEBUG.enabled) {
                if (C.DEBUG.treasureEnding) {
                    C.setSanityIntensity(game,scene,1);
                    C.gotoScene(game,scene,game.scenes.treasureEnding);
                } else if (C.DEBUG.yendorEnding) {
                    C.setSanityIntensity(game,scene,1);
                    C.MEMORY.players[0].yendorAmuletCollected=true;
                    C.gotoScene(game,scene,game.scenes.yendorEnding);
                }
            }
        },
        onLogic:(game, scene)=>{
            if (scene.paused) {

                scene.pausedtimer++;
                if (scene.pausedtimer==C.ONESEC)
                    scene.pausedtimer=0;

                C.MEMORY.players.forEach((player,p)=>{
                    let playaudio=true;
                    if (game.controlIsHit(game.controls[p].down))
                        scene.pausedoption++;
                    else if (game.controlIsHit(game.controls[p].up))
                        scene.pausedoption--;
                    else playaudio=false;
                    if (playaudio)
                        game.playAudio(game.audio.tick1);
                    if (scene.pausedoption<0) scene.pausedoption=0;
                    if (scene.pausedoption>1) scene.pausedoption=1;
                    if (game.controlIsHit(game.controls[p].start))
                        switch (scene.pausedoption) {
                            case 0:{
                                C.unpauseGame(game,scene);
                                break;
                            }
                            case 1:{
                                C.setSanityIntensity(game,scene,1);
                                C.gotoScene(game,scene,game.scenes.gameover);
                                break;
                            }
                        }
                });

            } else {

                game.logicSprites();

                if (scene.deathAppear) {
                    scene.deathAppear--;
                    if (!scene.deathAppear) {
                        game.playMusic(C.MEMORY.stageFastMusic);
                        C.freezeStage(game,scene,false);
                    }
                } else if (C.MEMORY.hurryUp) {
                    if (C.MEMORY.hurryUp%C.HALFSEC == 0) game.playAudio(game.audio.alarm);
                    C.MEMORY.hurryUp--;
                    if (!C.MEMORY.hurryUp) {
                        C.freezeStage(game,scene,false);
                        C.setEnemiesAngry(game,scene,true);
                        game.playMusic(C.MEMORY.stageFastMusic);
                    }
                } else if (scene.transitionTimer) {
                    scene.transitionTimer--;
                    game.getSpritesWithTag("scrolling").forEach(sprite=>{
                        sprite.setY(sprite.y+scene.transitionDirection);
                    });
                    if (!scene.transitionTimer && scene.stage) C.startStage(game,scene);
                } else if (C.MEMORY.bossStage) {
                    C.mainGameCycle(game,scene);
                    switch (C.MEMORY.bossStage) {
                        case 1:{
                            C.MEMORY.bossStage++;
                            C.goToTilemap(game,scene,scene.tilemaps.bossRoom,C.MEMORY.nextStageDirection);
                            break;
                        }
                        case 2:{
                            C.MEMORY.bossStage=0;
                            game.addNewSprite(scene.sprites.dragon);
                            let spawnpoint=game.addNewSprite(scene.sprites.bossBonusSpawnPoint,72,40);
                            spawnpoint.player=0;
                            spawnpoint.bonus="bossfirebottle";
                            spawnpoint=game.addNewSprite(scene.sprites.bossBonusSpawnPoint,168,40);
                            spawnpoint.player=1;
                            spawnpoint.bonus="bossfirebottle";
                            C.MEMORY.stageMusic=game.audio.musicboss;
                            C.MEMORY.stageFastMusic=game.audio.musicboss;
                            C.startStage(game,scene,"AMULET ROOM");
                            break;
                        }
                    }
                } else if (C.MEMORY.bonusStage) {
                    C.mainGameCycle(game,scene);
                    switch (C.MEMORY.bonusStage) {
                        case 1:{
                            C.MEMORY.bonusStage++;
                            C.MEMORY.bonusStageTimer=C.BONUSSTAGETIMER;
                            C.removeAll(game,scene);
                            scene.stage.bonusStageSlots.forEach(slot=>{
                                C.spawnBonus(game,scene,slot.x,slot.y+16,C.MEMORY.bonusStageBonus,true);
                            });
                            C.MEMORY.players.forEach(player=>{
                                player.bonusStageCollected=0;
                            });
                            break;
                        }
                        case 2:{
                            let cleared=!game.getSpritesWithTag("bonusstage").length;
                            C.MEMORY.bonusStageTimer--;
                            if (cleared || !C.MEMORY.bonusStageTimer) {
                                C.MEMORY.bonusStageTimer=0;
                                C.MEMORY.bonusStage++;
                                C.MEMORY.statusText=["NO BONUS","NO BONUS"];
                                game.getSpritesWithTagCopy("bonusstage").forEach(sprite=>{
                                    sprite.remove();
                                })
                                let
                                    draw=false,
                                    players=0,
                                    bestplayer=0,
                                    bestscore=-1;
                                    C.MEMORY.players.forEach((player,p)=>{
                                    if (player.isInGame && !player.isDead) {
                                        players++;
                                        if (player.bonusStageCollected == bestscore)
                                            draw=true;
                                        else if (player.bonusStageCollected > bestscore) {
                                            bestplayer=p;
                                            bestscore=player.bonusStageCollected;
                                        }
                                    }
                                });
                                let otherplayer=(bestplayer+1)%2;
                                if (cleared) {
                                    if (players == 1) {
                                        C.MEMORY.statusText[bestplayer] = C.BONUSSTAGE1STPRIZE+"PTS!";
                                        C.addScore(game,scene,bestplayer,C.BONUSSTAGE1STPRIZE)
                                    } else {
                                        if (draw) {
                                            C.MEMORY.statusText[0] = C.BONUSSTAGE1STPRIZE+"PTS!";
                                            C.MEMORY.statusText[1] = C.BONUSSTAGE1STPRIZE+"PTS!";
                                            C.addScore(game,scene,0,C.BONUSSTAGE1STPRIZE)
                                            C.addScore(game,scene,1,C.BONUSSTAGE1STPRIZE)
                                        } else {
                                            C.MEMORY.statusText[bestplayer] = C.BONUSSTAGE1STPRIZE+"PTS!";
                                            C.MEMORY.statusText[otherplayer] = C.BONUSSTAGE2NDPRIZE+"PTS!";
                                            C.addScore(game,scene,bestplayer,C.BONUSSTAGE1STPRIZE);
                                            C.addScore(game,scene,otherplayer,C.BONUSSTAGE2NDPRIZE);
                                        }
                                    }
                                }
                                if (players == 1)
                                C.MEMORY.statusText[otherplayer]="";
                            }
                            break;
                        }
                        default:{
                            C.MEMORY.bonusStage++;
                            if (C.MEMORY.bonusStage>=C.BONUSSTAGEDEBRIEFTIMER) {
                                C.MEMORY.bonusStage=0;
                                C.MEMORY.secretsRoom=0;
                                C.MEMORY.stageEnded=true;
                                scene.timer=C.ENDSTAGETIMER-1;
                            }
                            break;
                        }
                    }
                } else if (C.MEMORY.yendorRoom) {
                    switch (C.MEMORY.yendorRoom) {
                        case 1:{
                            C.MEMORY.yendorRoom++;
                            C.goToTilemap(game,scene,scene.tilemaps.yendorRoom,C.MEMORY.nextStageDirection);
                            break;
                        }
                        case 2:{
                            scene.nodarkness=true;
                            C.MEMORY.yendorRoom++;
                            C.removeOldStage(game,scene);
                            C.gainLife(game,scene,C.MEMORY.yendorRoomPlayer)
                            break;
                        }
                        case C.YENDORROOMDURATION:{
                            scene.nodarkness=false;
                            C.MEMORY.yendorRoom=0;
                            C.resetLetters(game,scene,C.MEMORY.yendorRoomPlayer);
                            C.setSkipStages(game,scene,2);
                            break;
                        }
                        default:{
                            C.MEMORY.yendorRoom++;
                        }
                    }
                } else if (C.MEMORY.showMinigame) {
                    switch (C.MEMORY.showMinigame) {
                        case 1:{
                            C.MEMORY.showMinigame++;
                            scene.minigame=scene.minigames[C.MEMORY.playMinigame];
                            scene.minigame.onPrepare(game,scene,scene.minigame);
                            game.stopMusic();
                            C.goToTilemap(game,scene,scene.tilemaps.minigame,C.MEMORY.nextStageDirection);
                            break;
                        }
                        case 2:{
                            game.stopMusic();
                            scene.mingameBlinds=8;
                            C.MEMORY.showMinigame++;
                            C.removeOldStage(game,scene);
                            scene.minigame.onEnter(game,scene,scene.minigame);
                            game.playMusic(game.audio.minigame);
                            break;
                        }
                        case 3:{
                            if (scene.mingameBlinds) scene.mingameBlinds--;
                            let end=scene.minigame.onLogic(game,scene,scene.minigame);
                            if (end) {
                                scene.minigame.onExit(game,scene,scene.minigame);
                                C.MEMORY.showMinigame++;
                                game.stopMusic();
                            }
                            break;
                        }
                        default:{
                            scene.minigame=0;
                            C.MEMORY.showMinigame=0;
                            C.MEMORY.playMinigame=0;
                            C.MEMORY.stageEnded=true;
                            scene.timer=C.ENDSTAGETIMER-1;
                        }
                    }
                } else if (C.MEMORY.secretsRoom) {
                    switch (C.MEMORY.secretsRoom) {
                        case 1:{
                            C.MEMORY.secretsRoom++;
                            let
                                secret=C.getNextSecret(game,scene),
                                tilemap=C.goToTilemap(game,scene,scene.tilemaps.secretsRoom,C.MEMORY.nextStageDirection);
                            for (let i=0;i<2;i++) {
                                C.spawnMapBonus(game,scene,tilemap.x+48+(16*i),tilemap.y+24,"diamond9k",true);
                                C.spawnMapBonus(game,scene,tilemap.x+48+(16*i),tilemap.y+48,"diamond8k",true);
                                C.spawnMapBonus(game,scene,tilemap.x+176+(16*i),tilemap.y+24,"diamond9k",true);
                                C.spawnMapBonus(game,scene,tilemap.x+176+(16*i),tilemap.y+48,"diamond8k",true);
                            }
                            for (let i=0;i<4;i++) {
                                C.spawnMapBonus(game,scene,tilemap.x+16+(16*i),tilemap.y+72,"diamond7k",true);
                                C.spawnMapBonus(game,scene,tilemap.x+16+(16*i),tilemap.y+96,"diamond6k",true);
                                C.spawnMapBonus(game,scene,tilemap.x+16+(16*i),tilemap.y+120,"diamond6k",true);
                                C.spawnMapBonus(game,scene,tilemap.x+176+(16*i),tilemap.y+72,"diamond7k",true);
                                C.spawnMapBonus(game,scene,tilemap.x+176+(16*i),tilemap.y+96,"diamond6k",true);
                                C.spawnMapBonus(game,scene,tilemap.x+176+(16*i),tilemap.y+120,"diamond6k",true);
                            }
                            secret.text.forEach((line,id)=>{
                                let
                                    x=(C.SCREENWIDTH-(line.length*game.fonts.normal.normal.letterWidth+line.length*game.fonts.normal.normal.letterSpacing))/2,
                                    y=147+(id*(game.fonts.normal.normal.letterHeight+4));
                                game.print(game.fonts.normal.normal,2,line,x,y,tilemap.image);
                                game.print(game.fonts.normal.normal,0,line,x,y+1,tilemap.image);
                            });
                            let statue=game.addNewSprite(scene.sprites.statue,(C.SCREENWIDTH-game.cells.statues.frames[0].width)/2,tilemap.y);
                            statue.setFrame(secret.statue);
                            game.addNewSprite(scene.sprites.torch,16,tilemap.y+8);
                            game.addNewSprite(scene.sprites.torch,C.SCREENWIDTH-32,tilemap.y+8);
                            break;
                        }
                        case 2:{
                            C.MEMORY.secretsRoom=0;
                            C.MEMORY.stageMusic=game.audio.secretsroom;
                            C.MEMORY.stageFastMusic=game.audio.secretsroom;
                            C.startStage(game,scene,"SECRETS ROOM");
                            for (let i=0;i<10;i++)
                                game.addNewSprite(scene.sprites.colorStar);
                            break;
                        }
                    }
                } else if (C.MEMORY.skipStages) {
                    C.MEMORY.skipStages--;
                    C.MEMORY.stage++;
                    if (C.MEMORY.treasureMode) {
                        C.goToStage(game,scene,C.STAGES[C.MEMORY.stage],C.MEMORY.nextStageDirection);
                    } else {
                        if (C.MEMORY.stage>C.HALFSTAGE) 
                        C.goToStage(game,scene,C.STAGES[C.HALFSTAGE-(C.MEMORY.stage-C.HALFSTAGE)],C.MEMORY.nextStageDirection);
                        else
                        C.goToStage(game,scene,C.STAGES[C.MEMORY.stage],C.MEMORY.nextStageDirection);
                    }
                } else if (scene.presenting) {
                    scene.timer++;
                    if (scene.timer==C.STARTTIMER)
                        game.getSpritesWithTag("player").forEach(sprite=>{
                            sprite.setState(sprite.states.default);
                        })
                    if (scene.timer==C.ENDPRESENTTIMER) {
                        scene.presenting = false;
                        game.getSpritesWithTagCopy("tostart").forEach(sprite=>{
                            sprite.removeTag("tostart");
                            sprite.setState(sprite.states.default);
                        });
                        if (C.MEMORY.hauntedMode)
                            game.addNewSprite(scene.sprites.hauntingDeath);
                    }
                } else if (C.MEMORY.stageEnded) {
                    scene.timer++;
                    if (scene.timer == C.ENDSTAGETIMER) {
                        game.getSpritesWithTag("player").forEach(sprite=>{
                            sprite.setState(sprite.states.leave);
                        })
                    } else if (!game.getSpritesWithTag("player").length) {
                        if ((C.MEMORY.stage==C.HALFSTAGE)&&!C.MEMORY.treasureMode) {
                            if (C.MEMORY.counters.yendorAmuletCollected) {
                                C.MEMORY.nextStageDirection=2;
                                C.MEMORY.enemyMap=(C.MEMORY.enemyMap+1)%C.ENEMIESMAPS[0].length;
                            } else
                                C.MEMORY.treasureMode=true;
                        }
                        C.MEMORY.stage++;
                        if (C.MEMORY.treasureMode) {
                            if (C.MEMORY.stage>=C.STAGESCOUNT) {
                                game.stopMusic();
                                C.setSanityIntensity(game,scene,1);
                                C.allPlayersAddScore(game,scene,C.BONUSTREASUREENDING);
                                if (C.MEMORY.cheats.disableEndings)
                                    C.gotoScene(game,scene,game.scenes.staffroll);
                                else
                                    C.gotoScene(game,scene,game.scenes.treasureEnding);
                            } else
                            C.goToStage(game,scene,C.STAGES[C.MEMORY.stage],C.MEMORY.nextStageDirection);
                        } else {
                            if (C.MEMORY.stage>=C.LASTSTAGE) {
                                game.stopMusic();
                                C.setSanityIntensity(game,scene,1);
                                C.allPlayersAddScore(game,scene,C.BONUSYENDORENDING);
                                if (C.MEMORY.cheats.disableEndings)
                                    C.gotoScene(game,scene,game.scenes.staffroll);
                                else
                                    C.gotoScene(game,scene,game.scenes.yendorEnding);
                            } else if (C.MEMORY.stage==C.HALFSTAGE)
                            C.MEMORY.bossStage=1;
                            else if (C.MEMORY.stage>C.HALFSTAGE) 
                            C.goToStage(game,scene,C.STAGES[C.HALFSTAGE-(C.MEMORY.stage-C.HALFSTAGE)],C.MEMORY.nextStageDirection);
                            else
                            C.goToStage(game,scene,C.STAGES[C.MEMORY.stage],C.MEMORY.nextStageDirection);
                        }
                    }
                } else if (C.MEMORY.isSomeonePlaying) {

                    C.MEMORY.stageTimer++;

                    if (scene.stage) {

                        if (C.MEMORY.explodeStage) {
                            if (C.MEMORY.explodeStage==1) game.playAudio(game.audio.explosion);
                            C.MEMORY.explodeStage++;
                            if (C.MEMORY.explodeStage>=C.EXPLODEDURATION) {
                                C.killAllEnemies(game,scene,C.MEMORY.explodeBonusFree,C.MEMORY.explodeBonusCaged);
                                C.MEMORY.explodeStage=0;
                            }
                        }

                        if (C.MEMORY.floodStage) {
                            if (C.MEMORY.floodStage==1) game.playAudio(game.audio.flood);
                            C.MEMORY.floodStage++;
                            if (C.MEMORY.floodStage==2)
                                scene.floodTilemap=game.addNewTilemap(scene.tilemaps.flood);
                            else if (scene.floodTilemap.y>16)
                                scene.floodTilemap.setY(scene.floodTilemap.y-C.FLOODSPEED);
                            else {
                                C.killAllEnemies(game,scene,"diamond7k","diamond6k")
                                C.MEMORY.floodStage=0;
                            }
                        }

                        if (C.MEMORY.freezeEnemies) {
                            if (C.checkEvery(C.MEMORY.freezeEnemies,C.ONESEC))
                                if (C.checkBlink(C.MEMORY.freezeEnemies,C.ONESEC))
                                    game.playAudio(game.audio.tick1);
                                else
                                    game.playAudio(game.audio.tick2);
                            C.MEMORY.freezeEnemies--;
                            game.getSpritesWithTag("enemy").forEach(enemy=>{
                                if (C.MEMORY.freezeEnemies) {
                                    if (enemy.state.onFrozen)
                                        enemy.state.onFrozen(game,scene,enemy);
                                } else {
                                    if (enemy.state.onUnfrozen)
                                        enemy.state.onUnfrozen(game,scene,enemy);
                                }
                            })
                        }

                        if (C.MEMORY.stageBubbles) {
                            C.MEMORY.stageBubbles--;
                            if (!C.MEMORY.stageBubbles) {
                                let slot=C.RND.randomElement(scene.stage.spawnpoints.specialBubbles);
                                if (C.MEMORY.letterBubbles && C.MEMORY.scheduledLetterBubbles) {
                                    C.MEMORY.scheduledLetterBubbles--;
                                    C.spawnSpecialBubble(game,scene,slot,C.LETTERBUBBLES[C.RND.randomElement(C.MEMORY.letterBubbles)],slot.side);
                                } else if (C.MEMORY.specialBubbles && (game.getSpritesWithTag("specialbubble").length<scene.stage.specialBubblesAmount)) {
                                    C.spawnSpecialBubble(game,scene,slot,C.SPECIALBUBBLES[C.RND.randomElement(C.MEMORY.specialBubbles)],slot.side);
                                }
                                C.MEMORY.stageBubbles=scene.stage.specialBubblesFrequency+Math.ceil(C.RND.randomFloat()*scene.stage.specialBubblesFrequency);
                            }
                        }

                        C.MEMORY.stageTimeFrames++;
                        if (C.MEMORY.stageTimeFrames>=C.ONESEC) {
                            C.MEMORY.stageTimeFrames=0;
                            C.MEMORY.stageTimeSeconds++;
                        }
                        
                        // Since it freezes the stage stage timer check should happen for last

                        if (!C.MEMORY.hauntedMode)
                            if (C.MEMORY.stageTimer == scene.stage.stageTimer) {
                                game.stopMusic();
                                C.MEMORY.hurryUp=C.HURRYUPTIMER;
                                C.increaseAllPlayersCounter(game,scene,"hurryUpAppeared");
                                C.freezeStage(game,scene,true);
                            } else if (C.MEMORY.stageTimer == scene.stage.deathTimer) {
                                game.stopMusic();
                                game.playAudio(game.audio.deathappear);
                                scene.deathAppear=C.DEATHAPPEARTIMER;
                                C.freezeStage(game,scene,true);
                                C.spawnDeath(game,scene,scene.sprites.death);
                            }
                    
                    }

                    let toclearCount=game.getSpritesWithTag("toclear").length;

                    if (toclearCount == 1) {

                        C.MEMORY.panicMode = 1;

                    } else if (toclearCount==0) {

                        C.MEMORY.stageEnded = true;

                        C.resetStageTimer(game,scene);
                        scene.timer = 1;
                        C.MEMORY.freezeEnemies=0;
                        C.MEMORY.scheduledBonusesTimer=C.SPAWNBONUSTIMER;

                        if (scene.stage) {

                            let
                                bonusDigit,
                                playersCount=0;

                            C.MEMORY.players.forEach((player,p)=>{
                                if (player.isInGame && !player.isDead) {
                                    playersCount++;
                                    if (player.score>=100) {
                                        let digit=Math.floor((player.score / 10) % 10);
                                        if (digit == Math.floor((player.score / 100) % 10))
                                            bonusDigit = C.BONUSDIGITS[digit];
                                    }
                                }
                            });

                            if (!C.MEMORY.endBubblesSpawn) {

                                if (bonusDigit)
                                    C.MEMORY.endBubblesSpawn = bonusDigit;
                                else if (C.BONUSLORESTAGE[scene.stage.id])
                                    C.MEMORY.endBubblesSpawn=C.BONUSLORESTAGE[scene.stage.id];
                            
                            }

                            if (C.BONUSTIME[playersCount]) {
                                let bonus=C.BONUSTIME[playersCount][C.MEMORY.stageTimeSeconds];
                                if (bonus) C.scheduleBonus(game,scene,bonus);
                            }
                                    
                        }

                        game.getSpritesWithTagCopy("largebubble").forEach(sprite=>{
                            sprite.onPop(game,scene,sprite, 0, C.MEMORY.endBubblesSpawn, C.MEMORY.endBubblesSpawnPoints);
                        });
                        C.MEMORY.endBubblesSpawn=0;
                        C.MEMORY.endBubblesSpawnPoints=0;
                        if (C.MEMORY.endSpawnGiantBonus) {
                            C.spawnGiantBonus(game,scene,C.MEMORY.endSpawnGiantBonus);
                            C.MEMORY.endSpawnGiantBonus=0;
                        }
                        if (scene.stage)
                            C.increaseGlobalCounter(game,scene,"stagesClearedNoDie");

                    } else
                        if (C.MEMORY.scheduledBonuses.length && C.MEMORY.scheduledBonusesTimer)
                            C.MEMORY.scheduledBonusesTimer--;

                    C.mainGameCycle(game,scene);
                    
                }

                if (scene.pausedskip)
                    scene.pausedskip--;
                else
                    C.MEMORY.players.forEach((player,p)=>{
                        if (player.isInGame && game.controlIsHit(game.controls[p].start))
                            C.pauseGame(game,scene,p);
                    });
            }
        },
        onDraw:(game, scene)=>{
            game.clearScreen();
            if (C.MEMORY.explodeStage)
                if (C.checkBlink(C.MEMORY.explodeStage,C.EXPLODEBLINK))
                    game.fillRect(C.MEMORY.explodeColor, 0, 16, 256,208);
            if (scene.minigame && scene.minigame.onDrawPre)
                scene.minigame.onDrawPre(game,scene,scene.minigame);
            game.drawSprites();
            if (scene.minigame) {
                if (scene.minigame.onDrawPost)
                    scene.minigame.onDrawPost(game,scene,scene.minigame);
                if (scene.mingameBlinds)
                    for (let i=16;i<C.SCREENHEIGHT;i+=8)
                        game.fillRect(game.palette[0],8,i,C.SCREENWIDTH-16,scene.mingameBlinds);
            }
            if (scene.paused) {
                game.drawSimpleImage(C.DIMMER,0,0);
                game.print(game.fonts.normal.outline,C.PLAYERCOLORS[scene.pausedsymbol],"PAUSED",101,89);
                game.print(game.fonts.normal.outline,1,"CONTINUE",101,107);
                game.print(game.fonts.normal.outline,1,"GIVE UP",101,125);
                game.drawSimpleCell(game.cells.lives,scene.pausedsymbol,85+Math.sin(scene.pausedtimer/C.ONESEC*3.14)*5,108+(scene.pausedoption*18));
            }
            if (C.MEMORY.glitchIntensity)
                for (let i=0;i<10;i++) {
                    if (C.RND.randomBool(C.MEMORY.glitchIntensity)) {
                        let dx,dy,x,y,width,height;
                        dx=C.RND.randomInteger(32);
                        dy=C.RND.randomInteger(28);
                        if (C.RND.randomBool(0.5)) {
                            x=C.RND.randomInteger(32);
                            y=C.RND.randomInteger(27);
                            width=C.RND.randomInteger(32-x);
                            height=2;
                        } else {
                            x=C.RND.randomInteger(31);
                            y=C.RND.randomInteger(28);
                            width=2;
                            height=C.RND.randomInteger(28-y);
                        }
                        game.drawPartImage(game.canvas,dx*8,dy*8,x*8,y*8,width*8,height*8);
                    }
                }
                
        }
    };

}