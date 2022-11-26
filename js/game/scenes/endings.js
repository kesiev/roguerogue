function gameLoadEndings(game,scenes,C) {
    
    scenes.yendorEnding={
        sprites:{
            yendorAmulet:{
                zIndex:20,
                animations:{
                    default:{
                        loop:true,
                        cells:game.cells.yendorAmulet,
                        speed:0.05
                    }
                }
            },
            player:{
                y:80,
                zIndex:10,
                states:{
                    default:{
                        onEnter:(game,scene,sprite)=>{
                            sprite.timer=C.ONESEC*4;
                        },
                        onLogic:(game,scene,sprite)=>{
                            sprite.changeAnimation(sprite.animations.walk);
                            if (sprite.timer)
                                sprite.timer--;
                            else
                                sprite.setState(sprite.states.spell);
                        }
                    },
                    spell:{
                        onEnter:(game,scene,sprite)=>{
                            sprite.timer=C.ONESEC*2;
                            sprite.setSpeedX(0);
                            sprite.setAnimation(sprite.animations.still);
                        },
                        onLogic:(game,scene,sprite)=>{
                            if (sprite.timer) {
                                sprite.timer--;
                                if (sprite.timer == C.ONESEC) {
                                    sprite.setAnimation(sprite.animations.handup);
                                    if (sprite.yendorAmuletCollected)
                                        game.addNewSprite(scene.sprites.yendorAmulet,sprite.x+sprite.amuletGapX,sprite.y-14);
                                } else if (sprite.timer == C.HALFSEC) {
                                    C.MEMORY.thunder=C.HALFSEC;
                                } else if (!sprite.timer)
                                sprite.setAnimation(sprite.animations.transformed);
                            }
                        }
                    }
                }
            }
        },
        tilemaps:{
            map:{
                x:0,
                y:16,
                cells:game.cells.recap,
                tiles:[
                    { char:" ", frame:0 },
                    { char:"m", frame:1 },
                    { char:"-", frame:2 },
                    { char:".", frame:3 },
                    { char:"#", frame:4 },
                    { char:"(", frame:5 },
                    { char:"=", frame:6 },
                    { char:")", frame:7 },
                ],
                map:[
                    "                        (=======",
                    "                                ",
                    "    (===)                       ",
                    "      (===)                     ",
                    "                            (===",
                    "                                ",
                    "=)                              ",
                    "                                ",
                    "                                ",
                    "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
                    "................................",
                ]

            }
        },
        onEnter:(game,scene)=>{
            game.clearSprites();
            game.playMusic(game.audio.musicintro);
            game.addNewTilemap(scene.tilemaps.map);
            C.MEMORY.texttimer=0;
            C.MEMORY.textlines=0;
            scene.sceneduration=C.ONESEC*15;
            C.MEMORY.players.forEach((player,p)=>{
                if (player.hasPlayed) {
                    let sprite=game.addNewSprite(scene.sprites.player);
                    sprite.yendorAmuletCollected=player.yendorAmuletCollected;
                    sprite.animations=C.PLAYERSKINS[player.skin];
                    if (p==0) {
                        sprite.setX(-16);
                        sprite.setSpeedX(0.5);
                        sprite.amuletGapX=6;
                    } else {
                        sprite.setFlipX(true);
                        sprite.setX(C.SCREENWIDTH);
                        sprite.setSpeedX(-0.5);
                        sprite.amuletGapX=-6;
                    }
                }
            })
        },
        onLogic:(game,scene)=>{
            game.logicSprites();
            if (C.MEMORY.thunder) C.MEMORY.thunder--;
            if (C.MEMORY.textlines<C.LABELS.yendorEnding.length) {
                if (C.MEMORY.texttimer)
                C.MEMORY.texttimer--;
                else {
                    C.MEMORY.textlines++;
                    C.MEMORY.texttimer=C.ONESEC;
                }
            }
            if (scene.sceneduration) scene.sceneduration--;
            else {
                game.stopMusic();
                C.gotoScene(game,scene,game.scenes.staffroll);
            }
        },
        onDraw:(game, scene)=>{
            game.clearScreen();
            game.drawSprites();
            game.fillRect(game.palette[0], 0, 0, 256,16);
            C.showIdleGui(game,scene);
            if (C.MEMORY.thunder && C.checkBlink(C.MEMORY.thunder,2))
                game.fillRect(game.palette[1], 0, 16, 256,88);
            for (let i=0;i<C.MEMORY.textlines;i++)
                game.drawSimpleImage(C.LABELS.yendorEnding[i],(C.SCREENWIDTH-C.LABELS.yendorEnding[i].width)/2,128+i*16);
        }
    };

    scenes.treasureEnding={
        sprites:{
            chest:{
                zIndex:5,
                x:100,
                y:-32,
                accelY:0.1,
                animations:{
                    default:{
                        cells:game.cells.yendorChestClosed
                    },
                    opened:{
                        cells:game.cells.yendorChestOpened
                    }
                },
                states:{
                    default:{
                        onLogic:(game,scene,sprite)=>{
                            if (sprite.y>48) {
                                sprite.setY(48);
                                sprite.setAccelY(0);
                                sprite.setSpeedY(0);
                                sprite.setState(sprite.states.open);
                            }
                        }
                    },
                    open:{
                        onEnter:(game,scene,sprite)=>{
                            sprite.opentimer=C.ONESEC*3;
                            sprite.burst=60;
                        },
                        onLogic:(game,scene,sprite)=>{
                            if (sprite.opentimer) {
                                sprite.opentimer--;
                                if (sprite.opentimer==0)
                                    sprite.changeAnimation(sprite.animations.opened);
                            } else if (sprite.burst) {
                                sprite.burst--;
                                if (C.checkEvery(sprite.burst,5)) {
                                    let bonus=game.addNewSprite(scene.sprites.bonus);
                                    bonus.setFrame(C.RND.randomElement(C.BONUSES[C.MEMORY.endingSet]).frame);
                                    bonus.setSpeedX(2*C.RND.randomFloat()-1);
                                }   
                            }
                        }
                    }
                },
            },
            bonus:{
                animations:{
                    default:{
                        cells:game.cells.bonus
                    }
                },
                x:124,
                y:68,
                speedY:-3,
                zIndex:30,
                states:{
                    default:{
                        onLogic:(game,scene,sprite)=>{
                            if ((sprite.y>104)||(sprite.y<-200)) {
                                sprite.setX(C.RND.randomInteger(C.SCREENWIDTH-16));
                                sprite.setY(0);
                                sprite.setSpeedX(0);
                                sprite.setSpeedY(0.5+C.RND.randomFloat()*0.5);
                                sprite.setFrame(C.RND.randomElement(C.BONUSES[C.MEMORY.endingSet]).frame);
                            }
                        }
                    }
                },
            },
            player:{
                y:80,
                zIndex:10,
                states:{
                    default:{
                        onEnter:(game,scene,sprite)=>{
                            sprite.timer=C.ONESEC*3;
                        },
                        onLogic:(game,scene,sprite)=>{
                            sprite.changeAnimation(sprite.animations.walk);
                            if (sprite.timer)
                                sprite.timer--;
                            else
                                sprite.setState(sprite.states.spell);
                        }
                    },
                    spell:{
                        onEnter:(game,scene,sprite)=>{
                            sprite.timer=C.ONESEC*2;
                            sprite.setSpeedX(0);
                            sprite.setAnimation(sprite.animations.still);
                        },
                        onLogic:(game,scene,sprite)=>{
                            if (sprite.timer) {
                                sprite.timer--;
                                if (sprite.timer == C.ONESEC)
                                    sprite.setAnimation(sprite.animations.happy);
                            }
                        }
                    }
                }
            }
        },
        tilemaps:{
            map:{
                x:0,
                y:16,
                cells:game.cells.recap,
                tiles:[
                    { char:" ", frame:0 },
                    { char:"m", frame:1 },
                    { char:"-", frame:2 },
                    { char:".", frame:3 },
                    { char:"#", frame:4 },
                    { char:"(", frame:5 },
                    { char:"=", frame:6 },
                    { char:")", frame:7 },
                ],
                map:[
                    "                        (=======",
                    "                                ",
                    "    (===)                       ",
                    "      (===)                     ",
                    "                            (===",
                    "                                ",
                    "=)                              ",
                    "                                ",
                    "                                ",
                    "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",
                    "................................",
                ]

            }
        },
        onEnter:(game,scene)=>{
            game.clearSprites();
            game.playMusic(game.audio.musicintro);
            game.addNewTilemap(scene.tilemaps.map);
            C.MEMORY.cheston=false;
            C.MEMORY.texttimer=0;
            C.MEMORY.textlines=0;
            scene.sceneduration=C.ONESEC*15;
            C.MEMORY.players.forEach((player,p)=>{
                if (player.hasPlayed) {
                    let sprite=game.addNewSprite(scene.sprites.player);
                    sprite.animations=C.PLAYERSKINS[player.skin];
                    if (p==0) {
                        sprite.setX(-16);
                        sprite.setSpeedX(0.5);
                    } else {
                        sprite.setFlipX(true);
                        sprite.setX(C.SCREENWIDTH);
                        sprite.setSpeedX(-0.5);
                    }
                }
            });
            game.addNewSprite(scene.sprites.chest);
        },
        onLogic:(game,scene)=>{
            game.logicSprites();
            if (C.MEMORY.thunder) C.MEMORY.thunder--;
            if (C.MEMORY.textlines<C.LABELS.yendorEnding.length) {
                if (C.MEMORY.texttimer)
                C.MEMORY.texttimer--;
                else {
                    C.MEMORY.textlines++;
                    C.MEMORY.texttimer=C.ONESEC;
                }
            }
            if (scene.sceneduration) scene.sceneduration--;
            else {
                game.stopMusic();
                C.gotoScene(game,scene,game.scenes.staffroll);
            }
        },
        onDraw:(game, scene)=>{
            game.clearScreen();
            game.drawSprites();
            game.fillRect(game.palette[0], 0, 0, 256,16);
            game.fillRect(game.palette[0], 0, 104, 256,16);
            C.showIdleGui(game,scene);
            for (let i=0;i<C.MEMORY.textlines;i++)
                game.drawSimpleImage(C.LABELS.treasureEnding[i],(C.SCREENWIDTH-C.LABELS.treasureEnding[i].width)/2,128+i*16);
        }
    };
   
}