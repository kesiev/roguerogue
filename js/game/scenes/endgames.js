function gameLoadEndgames(game,scenes,C) {

    scenes.debrief={
        sprites:{
            disappear:C.SPRITEDISAPPEAR,
            player:{
                zIndex:10
            },
            yendorAmulet:{
                zIndex:10,
                animations:{
                    default:{
                        loop:true,
                        cells:game.cells.yendorAmulet,
                        speed:0.05
                    }
                }
            },
            treasureRoom:{
                zIndex:10,
                animations:{
                    default:{
                        loop:true,
                        cells:game.cells.treasureRoom,
                        speed:0.05
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
                ],
                map:[
                    "                                ",
                    "                                ",
                    "mmmmmmmmmmmm        mmmmmmmmmmmm",
                    "............#--##--#............",
                    "............#--##--#............",
                    "............#--##--#............",
                    "............#--##--#............",
                    "............#--##--#............",
                    "............#--##--#............",
                    "............#--##--#............",
                    "............#--##--#............",
                    "............#--##--#............",
                    "............#--##--#............",
                    "............#--##--#............",
                    "............#--##--#............",
                    "............#--##--#............",
                    "............#--##--#............",
                    "............#--##--#............",
                    "............#--##--#............",
                    "............#--##--#............",
                    "............#--##--#............",
                    "............#--##--#............",
                    "............#------#............",
                    "............#------#............",
                    "............#------#............",
                    "............########............"
                ]

            }
        },
        onEnter:(game,scene)=>{
            let savehighstage=false;
            scene.players=[];
            game.playMusic(game.audio.debrief);
            game.clearSprites();
            game.addNewTilemap(scene.tilemaps.map);
            scene.isMoving=true;
            scene.moveTimer=C.MAPSPEED;
            scene.blinktimer=1;
            scene.blinkcolor=false;
            C.MEMORY.players.forEach((player,p)=>{
                if (player.hasPlayed) {
                    if (C.HIGHSTAGE<player.lastStage+1) {
                        C.setHighStage(game,scene,player.lastStage+1,C.MEMORY.treasureMode);
                        savehighstage=true;
                    }
                    player.showStage = 0;
                    let sprite = game.addNewSprite(scene.sprites.player,104+(p*32),C.MAPSTAGESTART);
                    sprite.animations=C.PLAYERSKINS[player.skin];
                    sprite.setAnimation(sprite.animations.frontWalk);
                    scene.players[p]=sprite;
                }
            });
            if (C.MEMORY.treasureMode) {
                game.addNewSprite(scene.sprites.treasureRoom,104,C.SCREENHEIGHT-24);
                game.addNewSprite(scene.sprites.treasureRoom,136,C.SCREENHEIGHT-24);
            } else {
                scene.yendorAmulet = game.addNewSprite(scene.sprites.yendorAmulet,120,C.SCREENHEIGHT-24);
            }
            if (savehighstage)
                C.saveHighStage(game,scene);
        },
        onLogic:(game,scene)=>{
            game.logicSprites();
            scene.blinktimer--;
            if (!scene.blinktimer) {
                scene.blinktimer=C.HALFSEC;
                scene.blinkcolor=!scene.blinkcolor;
            }
            if (scene.isMoving) {
                if (scene.moveTimer)
                    scene.moveTimer--;
                else {
                    scene.isMoving=false;
                    scene.moveTimer=C.MAPSPEED;
                    C.MEMORY.players.forEach((player,p)=>{
                        if (player.hasPlayed) {
                            if (player.showStage<player.lastStage) {
                                scene.isMoving=true;
                                player.showStage++;
                                if (C.MEMORY.treasureMode)
                                    scene.players[p].setY(C.MAPSTAGESTART+(player.showStage*C.TREASUREMAPSTAGESIZE));
                                else {
                                    if (player.showStage==C.HALFSTAGE+1) {
                                        game.addNewSprite(scene.sprites.disappear,scene.yendorAmulet.x,scene.yendorAmulet.y);
                                        scene.yendorAmulet.remove();
                                    }
                                    if (player.showStage<C.HALFSTAGE)
                                        scene.players[p].setY(C.MAPSTAGESTART+(player.showStage*C.YENDORMAPSTAGESIZE));
                                    else
                                        scene.players[p].setY(C.MAPSTAGESTART+((C.HALFSTAGE-(player.showStage-C.HALFSTAGE))*C.YENDORMAPSTAGESIZE));
                                }
                            }
                        }
                    });
                }
            } else {
                C.MEMORY.players.forEach((player,p)=>{
                    if (player.hasPlayed && (game.controlIsHit(game.controls[p].a) || game.controlIsHit(game.controls[p].b) || game.controlIsHit(game.controls[p].start) )) {
                        game.stopMusic();
                        C.gotoScene(game,scene,game.scenes.gameover);
                    }
                });
            }
        },
        onDraw:(game, scene)=>{
            game.clearScreen();
            game.drawSprites();
            game.fillRect(game.palette[0], 0, 0, 256,16);
            C.showIdleGui(game,scene);
            C.MEMORY.players.forEach((player,p)=>{
                if (player.hasPlayed) {
                    let
                        text="ROUND "+(C.MEMORY.players[p].showStage+1),
                        x=(p?C.SCREENWIDTH-7-text.length*9:7),
                        y=scene.players[p].y+3;
                    game.print(game.fonts.normal.outline,C.PLAYERCOLORS[p],text,x,y+(y<C.HSCREENHEIGHT?15:0));
                    game.fillRect(game.palette[scene.blinkcolor?1:C.PLAYERCOLORS[p]],(p?136:7),y+12,113,1)
                }
            });
            if (!scene.isMoving) {
                game.print(game.fonts.normal.outline,1,"TODAY'S RECORD IS",7,24);
                if (scene.blinkcolor)
                    game.print(game.fonts.normal.outline,5,"ROUND "+C.HIGHSTAGE,170,24);
            }
        }
    };

    scenes.staffroll={
        onEnter:(game,scene)=>{
            game.playMusic(game.audio.staffroll);
            scene.row=0;
            scene.scrolltimer=0;
            scene.windowHeight=0;
        },
        onLogic:(game,scene)=>{
            if (scene.scrolltimer) scene.scrolltimer--;
            else {
                if (scene.windowHeight<C.SCREENHEIGHT)
                    scene.windowHeight++;
                else {
                    scene.row++;
                    if (scene.row == C.STAFFROLLIMAGE.height) {
                        game.stopMusic();
                        C.gotoScene(game,scene,game.scenes.debrief);
                    }
                }
                scene.scrolltimer=3;
            }
        },
        onDraw:(game, scene)=>{
            game.clearScreen();
            game.drawPartImage(C.STAFFROLLIMAGE,0,C.SCREENHEIGHT-scene.windowHeight,0,scene.row,C.SCREENWIDTH,scene.windowHeight);
            game.fillRect(game.palette[0], 0, 0, 256,24);
            C.showIdleGui(game,scene);
        }
    };

    scenes.gameover={
        onEnter:(game,scene)=>{
            game.clearSprites();
            scene.timer=C.ONESEC*3;
            C.MEMORY.credits=0;
        },
        onLogic:(game,scene)=>{
            scene.timer--;
            if (!scene.timer)
                C.gotoScene(game,scene,game.scenes.default);
        },
        onDraw:(game, scene)=>{
            game.clearScreen();
            game.drawSimpleImage(C.LABELS.gameover,C.GAMEOVERX,C.GAMEOVERY);
        }
    };

}