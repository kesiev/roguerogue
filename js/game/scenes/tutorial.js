function gameLoadTutorial(game,scenes,C) {
    
    scenes.tutorial={
        tilemaps:{
            tutorial:{
                tags:["tilemap"],
                x:0,y:16,
                cells:game.cells.yendorRoom,
                zIndex:C.TILEMAPZINDEX,
                tiles:[
                    { char:"#", frame:0, tags:["wall"] },
                    { char:"^", frame:1 },
                ],
                map:[
                    "################################",
                    "#^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^#",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "#                           ## #",
                    "#                           ^^ #",
                    "#                              #",
                    "#                              #",
                    "#                           ## #",
                    "#                           ^^ #",
                    "#                              #",
                    "#                              #",
                    "#                              #",
                    "#           ##           ##    #",
                    "# ##        ###############    #",
                    "# ^^        ^^^^^^^^^^^^^^^    #",
                    "#                              #",
                    "#                              #",
                    "# ##                           #",
                    "# ^^                           #",
                    "#                              #",
                    "#                              #",
                    "################################",
                ]
            }
        },
        onEnter:(game, scene)=>{
            game.clearSprites();
            game.addNewSprite(scene.sprites.edgeWall, 0, -32);
            game.addNewSprite(scene.sprites.edgeWall, 240, -32);
            scene.tilemap=game.addNewTilemap(scene.tilemaps.tutorial);
            scene.player=game.addNewSprite(scene.sprites.player,C.PLAYERSTARTX[0],C.PLAYERSTARTY);
            scene.player.playerId = 10;
            C.MEMORY.players[10]={
                skin:0,
                moveFast:0,
                firingAnimation:"fire",
                bonusPerBlow:0,
                bonusPerJump:0,
                bonusPerMove:0,
                smallBubbleSpeed:C.SMALLBUBBLESPEED,
                smallBubbleDistance:C.SMALLBUBBLEDISTANCE,
                fireMode:0,
                bubbleType:0,
                skippedRules:[]
            };
            scene.player.animations=C.PLAYERSKINS[C.MEMORY.players[10].skin];
            game.controls[10]={};
            scene.tutorialTimer=0;
            scene.tutorialSec=0;
            scene.tutorialPhase=0;
            scene.tutorialTimerLimit=C.HALFSEC;
            scene.tutorialLines=0;
            scene.end=false;
        },
        onExit:(game,scene)=>{
            delete C.MEMORY.players[10];
        },
        onLogic:(game, scene)=>{
            scene.tutorialTimer++;
            if (scene.tutorialTimer>=scene.tutorialTimerLimit) {
                scene.tutorialSec++;
                scene.tutorialTimer=0;
            }
            for (let i=0;i<C.PLAYERSCOUNT;i++) {
                if (
                    game.controlIsDown(game.controls[i].a)||
                    game.controlIsDown(game.controls[i].b)||
                    game.controlIsDown(game.controls[i].start)
                )
                    scene.end=true;
            }
            switch (scene.tutorialPhase) {
                case 0:{
                    switch (scene.tutorialSec) {
                        case 1:{
                            if (scene.tutorialTimer==1) {
                                scene.tutorialX=24;
                                scene.tutorialY=40;
                                scene.tutorialLines=[
                                    [ 5, "CONTROLS" ],
                                    [ 1, "HOLD DOWN LEFT OR RIGHT"],
                                    [ 1, "TO MOVE YOUR ROGUE"],
                                ]
                            }
                            break;
                        }
                        case 3:{
                            scene.tutorialSec=0;
                            scene.tutorialPhase++;
                            break;
                        }
                    }
                    break;
                }
                case 1:{
                    switch (Math.floor(scene.tutorialSec)%8) {
                        case 2:{
                            game.controls[10]={right:true};
                            break;
                        }
                        case 6:{
                            game.controls[10]={left:true};
                            break;
                        }
                        case 4:
                        case 0:{
                            game.controls[10]={};
                        }
                    }
                    if (scene.tutorialSec==16) {
                        scene.tutorialSec=0;
                        scene.tutorialPhase++;
                    }
                    break;
                }
                case 2:{
                    switch (scene.tutorialSec) {
                        case 1:{
                            scene.player.setFlipX(false);
                            if (scene.tutorialTimer==1) {
                                scene.tutorialX=24;
                                scene.tutorialY=40;
                                scene.tutorialLines=[
                                    [ 5, "CONTROLS" ],
                                    [ 1, "PRESS FIRE TO THROW"],
                                    [ 1, "MAGIC BUBBLES"],
                                ]
                            }
                            break;
                        }
                        case 3:{
                            scene.tutorialSec=0;
                            scene.tutorialPhase++;
                            break;
                        }
                    }
                    break;
                }
                case 3:{
                    switch (scene.tutorialSec) {
                        case 1:
                        case 2:{
                            game.controls[10]={b:1};
                            break;
                        }
                        case 5:
                        case 6:{
                            game.controls[10]={right:true};
                            break;
                        }
                        case 7:{
                            game.controls[10]={};
                            scene.player.setFlipX(true);
                            break;
                        }
                        case 9:
                        case 10:{
                            game.controls[10]={b:1};
                            break;
                        }
                        case 13:
                        case 14:{
                            game.controls[10]={left:true};
                            break;
                        }
                        default:{
                            game.controls[10]={};
                        }
                    }
                    if (scene.tutorialSec==15) {
                        scene.tutorialSec=0;
                        scene.tutorialPhase++;
                    }
                    break;
                }
                case 4:{
                    switch (scene.tutorialSec) {
                        case 1:{
                            scene.player.setFlipX(false);
                            if (scene.tutorialTimer==1) {
                                scene.tutorialX=24;
                                scene.tutorialY=40;
                                scene.tutorialLines=[
                                    [ 5, "CONTROLS" ],
                                    [ 1, "PRESS THE JUMP BUTTON" ],
                                    [ 1, "TO JUMP"]
                                ]
                            }
                            break;
                        }
                        case 3:{
                            scene.tutorialSec=0;
                            scene.tutorialPhase++;
                            break;
                        }
                    }
                    break;
                }
                case 5:{
                    switch (scene.tutorialSec) {
                        case 1:
                        case 2:
                        case 3:
                        case 4:{
                            game.controls[10]={a:true};
                            break;
                        }
                        case 5:{
                            game.controls[10]={};
                            break;
                        }
                        case 7:{
                            if (scene.tutorialTimer<16)
                                game.controls[10]={right:true};
                            else
                                game.controls[10]={};
                            break;
                        }
                        case 10:{
                            if (scene.tutorialTimer<16)
                                game.controls[10]={left:true};
                            else
                                game.controls[10]={};
                            break;
                        }
                        case 12:{
                            game.controls[10]={};
                            break;
                        }
                    }
                    if (scene.tutorialSec==14) {
                        scene.tutorialSec=0;
                        scene.tutorialPhase++;
                    }
                    break;
                }
                case 6:{
                    switch (scene.tutorialSec) {
                        case 1:{
                            if (scene.tutorialTimer==1) {
                                scene.player.setFlipX(false);
                                let enemy=game.addNewSprite(scene.sprites.skeleton, 172, 128);
                                enemy.setFlipX(true);
                                enemy.timer=-1;

                                scene.tutorialX=24;
                                scene.tutorialY=40;
                                scene.tutorialLines=[
                                    [ 5, "ATTACKING" ],
                                    [ 1, "TRAP ENEMIES IN BUBBLES" ],
                                    [ 1, "AND HIT THEM QUICKLY!"]
                                ]
                            }
                            break;
                        }
                        case 3:{
                            scene.tutorialSec=0;
                            scene.tutorialPhase++;
                            break;
                        }
                    }
                    break;
                }
                case 7:{
                    switch (scene.tutorialSec) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:{
                            game.controls[10]={a:true};
                            break;
                        }
                        case 5:{
                            game.controls[10]={right:true,a:true};
                            break;
                        }
                        case 7:{
                            game.controls[10]={};
                            break;
                        }
                        case 8:{
                            game.controls[10]={right:true};
                            break;
                        }
                        case 9:{
                            if (scene.tutorialTimer==1)
                                game.controls[10]={b:true};
                            else
                                game.controls[10]={};
                            break;
                        }
                        case 10:{
                            game.controls[10]={};
                            break;
                        }
                        case 11:{
                            if (scene.tutorialTimer<27)
                                game.controls[10]={a:true,right:true};
                            else
                                game.controls[10]={};
                            break;
                        }
                    }
                    if (scene.tutorialSec==17) {
                        scene.tutorialSec=0;
                        scene.tutorialPhase++;
                    }
                    break;
                }
                case 8:{
                    switch (scene.tutorialSec) {
                        case 1:{
                            if (scene.tutorialTimer==1) {
                                scene.player.setFlipX(true);

                                scene.tutorialX=24;
                                scene.tutorialY=168;
                                scene.tutorialLines=[
                                    [ 5, "ADVANCED TECHNIQUE" ],
                                    [ 1, "HOLD DOWN JUMP TO KEEP" ],
                                    [ 1, "JUMPING ON BUBBLES!"]
                                ]
                            }
                            break;
                        }
                        case 3:{
                            scene.tutorialSec=0;
                            scene.tutorialPhase++;
                            break;
                        }
                    }
                    break;
                }
                case 9:{
                    switch (scene.tutorialSec) {
                        case 0:{
                            if (scene.tutorialTimer==1)
                                game.controls[10]={b:true};
                            else
                                game.controls[10]={left:true};
                            break;
                        }
                        case 1:{
                            if (scene.tutorialTimer<10)
                                game.controls[10]={left:true};
                            else
                                game.controls[10]={a:true};
                            break;
                        }
                        case 2:
                        case 3:{
                            game.controls[10]={a:true};
                            break;
                        }
                        case 4:{
                            game.controls[10]={};
                            break;
                        }
                    }
                    if (scene.tutorialSec==8) {
                        scene.tutorialSec=0;
                        scene.tutorialPhase++;
                    }
                    break;
                }
                case 10:{
                    switch (scene.tutorialSec) {
                        case 1:{
                            if (scene.tutorialTimer==1) {
                                scene.player.setFlipX(false);

                                scene.tutorialX=24;
                                scene.tutorialY=168;
                                scene.tutorialLines=[
                                    [ 5, "ADVANCED TECHNIQUE" ],
                                    [ 1, "HOLD UP OR DOWN AND" ],
                                    [ 1, "FIRE TO BUBBLE AROUND"]
                                ]
                            }
                            break;
                        }
                        case 3:{
                            scene.tutorialSec=0;
                            scene.tutorialPhase++;
                            break;
                        }
                    }
                    break;
                }
                case 11:{
                    switch (scene.tutorialSec) {
                        case 0:{
                            game.controls[10]={b:true,up:true};
                            break;
                        }
                        case 2:{
                            game.controls[10]={};
                            break;
                        }
                        case 6:{
                            game.controls[10]={a:true,b:true,down:true,right:true};
                            break;
                        }
                        case 8:{
                            game.controls[10]={};
                        }
                    }
                    if (scene.tutorialSec==11) {
                        scene.tutorialSec=0;
                        scene.tutorialPhase++;
                    }
                    break;
                }
                case 12:{
                    switch (scene.tutorialSec) {
                        case 1:{
                            if (scene.tutorialTimer==1) {
                                let bonus=C.spawnBonus(game,scene,224,24,"tier1points");
                                bonus.isFake=true;

                                scene.tutorialX=24;
                                scene.tutorialY=168;
                                scene.tutorialLines=[
                                    [ 5, "BONUSES" ],
                                    [ 1, "COLLECT THEM FOR POINTS" ],
                                    [ 1, "AND SPECIAL POWERS!"]
                                ]
                            }
                            break;
                        }
                        case 3:{
                            scene.tutorialSec=0;
                            scene.tutorialPhase++;
                            break;
                        }
                    }
                    break;
                }
                case 13:{
                    switch (scene.tutorialSec) {
                        case 0:{
                            game.controls[10]={a:true,right:true};
                            break;
                        }
                        case 1:{
                            if (scene.tutorialTimer<4)
                                game.controls[10]={a:true,right:true};
                            else
                                game.controls[10]={a:true};
                            break;
                        }
                        case 3:{
                            game.controls[10]={};
                            break;
                        }
                    }
                    if (scene.tutorialSec==5) {
                        scene.tutorialSec=0;
                        scene.tutorialPhase++;
                    }
                    break;
                }
                case 14:{
                    switch (scene.tutorialSec) {
                        case 1:{
                            scene.player.setFlipX(true);
                            if (scene.tutorialTimer==1) {
                                scene.tutorialX=24;
                                scene.tutorialY=40;
                                scene.tutorialLines=[
                                    [ 5, "HOW TO WIN" ],
                                    [ 1, "CLEAR ALL OF THE" ],
                                    [ 1, "STAGE ENEMIES TO" ],
                                    [ 1, "GO TO THE NEXT STAGE!" ],
                                    [ 1, "HOW FAR YOU WILL GO?" ],
                                ]
                            }
                            break;
                        }
                        case 12:{
                            scene.tutorialSec=0;
                            scene.tutorialPhase++;
                            break;
                        }
                    }
                    break;
                }
                case 15:{
                    switch (scene.tutorialSec) {
                        case 1:{
                            if (scene.tutorialTimer==1) {
                                scene.tutorialX=24;
                                scene.tutorialY=40;
                                scene.tutorialLines=[
                                    [ 5, "ONE LAST THING!" ],
                                    [ 1, "ROGUE ROGUE CAVES" ],
                                    [ 1, "CHANGES WEEKLY AND" ],
                                    [ 1, "ARE FULL OF SECRETS..." ],
                                    [ 4, "GOOD LUCK!"]
                                ]
                            }
                            break;
                        }
                        case 12:{
                            scene.tutorialSec=0;
                            scene.tutorialPhase++;
                            break;
                        }
                    }
                    break;
                }
                case 16:{
                    switch (scene.tutorialSec) {
                        case 1:{
                            if (scene.tutorialTimer==1)
                                scene.end=true;    
                            break;
                        }
                    }
                    break;
                }
            }
            game.logicSprites();
            if (scene.end)
                C.gotoScene(game,scene,game.scenes.default);
        },
        onDraw:(game, scene)=>{
            game.clearScreen();
            C.showIdleGui(game,scene,true);
            game.drawSprites();
            if (scene.tutorialLines)
                scene.tutorialLines.forEach((line,y)=>{
                    game.print(game.fonts.normal.outline,line[0],line[1],scene.tutorialX,scene.tutorialY+(y*16));
                })
        }
    };

}