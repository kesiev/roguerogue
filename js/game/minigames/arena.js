function gameLoadMinigameArena(game,scene,C) {
    scene.minigames.arena={
        tilemaps:{
            stage:{
                tags:["walls","stagesprite"],
                x:0,
                cells:game.cells.minigameArenaTiles,
                zIndex:8,
                x:8,y:24,
                tiles:[
                    { char:" " },
                    { char:"A", frame:0,tags:["wall"] },
                    { char:"B", frame:1,tags:["wall"] },
                    { char:"C", frame:2,tags:["wall"] },
                    { char:"D", frame:3,tags:["wall"] },
                    { char:"E", frame:4,tags:["wall"] },
                    { char:"F", frame:4 },
                    { char:"G", frame:6 },
                    { char:"H", frame:7,tags:["wall"] },
                    { char:"I", frame:8,tags:["wall"] },
                    { char:".", frame:5 },
                    { char:"=", frame:9 },
                    { char:"_", frame:10 },
                ],
                map:[
                    "AEEHIEEHIEEHIEEEHIEEHIEEEHIEEB",
                    "EAFGGFFGGFFGGFFFGGFFGGFFFGGFBE",
                    "EE..........................EE",
                    "EE=________________________.EE",
                    "EE._._..........==......_._.EE",
                    "EE.___..................___.EE",
                    "EE._......................_=EE",
                    "EE._.===.................._.EE",
                    "EE._......................_.EE",
                    "EE._.................==..._.EE",
                    "EE._...==................._.EE",
                    "EE._......................_.EE",
                    "EE._......................_.EE",
                    "EE._.............=====...._.EE",
                    "EE._......................_.EE",
                    "EE._...==................._.EE",
                    "EE._..................==.._.EE",
                    "EE._......................_.EE",
                    "EE.___..........==......___.EE",
                    "EE._=_.................._._.EE",
                    "EE.________________________=EE",
                    "EE............==............EE",
                    "ECEEEEEEEEEEEEEEEEEEEEEEEEEEDE",
                    "CEEEEEEEEEEEEEEEEEEEEEEEEEEEED",
                ]
            },
        },
        sprites:{
            explosion:{
                tags:["stagesprite"],
                zIndex:20,
                speedY:-0.5,
                animations:{
                    default:{
                        cells:game.cells.whiteExplosion,
                        speed:0.2
                    }
                },
                states:{
                    default:{
                        onLogic:(game,scene,sprite)=>{
                            if (!sprite.animationLive) sprite.remove();
                        }
                    }
                }
            },
            shadow:{
                tags:["stagesprite"],
                zIndex:9,
                animations:{
                    default:{
                        cells:game.cells.minigameShadow
                    }
                }
            },
            enemy:{
                tags:["stagesprite","enemy"],
                hitboxX:4,hitboxY:8,hitboxWidth:8,hitboxHeight:8,
                animations:{
                    default:{
                        cells:game.cells.skeletonStill
                    },
                    walk:{
                        loop:true,
                        cells:game.cells.skeletonWalking,
                        speed:0.1
                    }
                },
                states:{
                    default:{
                        onEnter:(game,scene,sprite)=>{
                            sprite.spawning=C.ONESEC*2;
                            sprite.setFlipX(C.RND.randomBool(0.5));
                        },
                        onLogic:(game,scene,sprite)=>{
                            if (sprite.spawning) {
                                sprite.spawning--;
                                if (sprite.spawning) {                                    
                                    sprite.setVisible(C.checkBlink(sprite.spawning, 2));
                                } else {
                                    sprite.changeAnimation(sprite.animations.walk);
                                    sprite.setVisible(true);
                                    sprite.addTag("killplayer");
                                }
                            } else {
                                let
                                    distance=10000,
                                    nearest=0;
                                game.getSpritesWithTag("miniplayer").forEach(player=>{
                                    let d=game.calcDistance(sprite.x,sprite.y,player.x,player.y);
                                    if (d<distance) {
                                        distance=d;
                                        nearest=player;
                                    }
                                });
                                
                                if (nearest) {
                                    let angle=game.calcAngle(sprite.x,sprite.y,nearest.x,nearest.y);
                                    game.applyAngleSpeed(sprite,angle,0.5);
                                }

                                sprite.setFlipX(sprite.speedX<0);
       
                            }

                            if (!sprite.shadow) sprite.shadow=game.addNewSprite(sprite.minigame.sprites.shadow);
                            sprite.shadow.setX(sprite.x);
                            sprite.shadow.setY(sprite.y+3);

                            sprite.setZIndex(sprite.y);
                        }
                    }
                }
            },
            player:{
                tags:["stagesprite","miniplayer"],
                zIndex:10,
                hitboxX:2,hitboxY:2,hitboxWidth:12,hitboxHeight:14,
                states:{
                    default:{
                        collisions:[
                            {
                                withSpriteTags:["killplayer"]
                            },
                            {
                                withTilemapTags:["walls"],
                                withTileTags:["wall"],
                                isWallX:[true,true], isWallY:[true,true],
                                isBounceX:[0,0], isBounceY:[0,0]
                            }
                        ],
                        onEnter:(game,scene,sprite)=>{
                            sprite.cooldown=0;
                            sprite.speed=1;
                            sprite.firespeed=20;
                            sprite.bulletspeed=2;
                        },
                        onLogic:(game,scene,sprite)=>{
                            if (sprite.cooldown)
                                sprite.cooldown--;
                            if (game.controlIsDown(game.controls[sprite.playerId].a) || game.controlIsDown(game.controls[sprite.playerId].b)) {
                                sprite.changeAnimation(sprite.animations.still);
                                sprite.setSpeedX(0);
                                sprite.setSpeedY(0);
                                if (!sprite.cooldown) {
                                    let sx,sy;
                                    if (game.controlIsDown(game.controls[sprite.playerId].right)) {
                                        sprite.setFlipX(false);
                                        sx=1;
                                    } else if (game.controlIsDown(game.controls[sprite.playerId].left)) {
                                        sprite.setFlipX(true);
                                        sx=-1;
                                    } else sx=0;
                                    if (game.controlIsDown(game.controls[sprite.playerId].down))
                                        sy=1;
                                    else if (game.controlIsDown(game.controls[sprite.playerId].up))
                                        sy=-1;
                                    else
                                        sy=0;
                                    
                                    if (!sx)
                                        sx=sy?0:sprite.flipX?-1:1;

                                    let bullet=game.addNewSprite(sprite.minigame.sprites.playerbullet,sprite.x,sprite.y);
                                    bullet.minigame=sprite.minigame;
                                    bullet.playerId=sprite.playerId;
                                    bullet.setSpeedX(sprite.bulletspeed*sx);
                                    bullet.setSpeedY(sprite.bulletspeed*sy);
                                    bullet.setAnimation(sprite.animations.smallBubble);
                                    sprite.cooldown=sprite.firespeed;
                                    game.addNewSprite(C.SPRITEDISAPPEAR,bullet.x,bullet.y);
                                    game.playAudio(game.audio.firebubble);
                                }
                            } else {
                                if (game.controlIsDown(game.controls[sprite.playerId].right)) {
                                    sprite.setFlipX(false);
                                    sprite.setSpeedX(sprite.speed);
                                } else if (game.controlIsDown(game.controls[sprite.playerId].left)) {
                                    sprite.setFlipX(true);
                                    sprite.setSpeedX(-sprite.speed);
                                } else {
                                    sprite.setSpeedX(0);
                                }
                                if (game.controlIsDown(game.controls[sprite.playerId].down))
                                    sprite.setSpeedY(sprite.speed);
                                else if (game.controlIsDown(game.controls[sprite.playerId].up))
                                    sprite.setSpeedY(-sprite.speed);
                                else
                                    sprite.setSpeedY(0);
                            }
                            if (sprite.speedX||sprite.speedY)
                                sprite.changeAnimation(sprite.animations.walk);
                            else
                                sprite.changeAnimation(sprite.animations.still);

                            if (sprite.collisions.killplayer) {
                                game.playAudio(game.audio.hit);
                                sprite.minigame.playing=false;
                                sprite.remove();
                            }

                            if (!sprite.shadow) sprite.shadow=game.addNewSprite(sprite.minigame.sprites.shadow);
                            sprite.shadow.setX(sprite.x);
                            sprite.shadow.setY(sprite.y+3);

                            sprite.setZIndex(sprite.y);
                        }
                    }
                }
            },
            playerbullet:{
                tags:["stagesprite"],
                zIndex:1000,
                hitboxX:4,hitboxY:4,hitboxWidth:8,hitboxHeight:8,
                states:{
                    default:{
                        collisions:[
                            {
                                withTilemapTags:["walls"],
                                withTileTags:["wall"],
                                withSpriteTags:["enemy"]
                            }
                        ],
                       onLogic:(game,scene,sprite)=>{
                            if (sprite.x>C.SCREENWIDTH)
                                sprite.remove();
                            else if (sprite.collisions.wall) {
                                game.addNewSprite(C.SPRITEDISAPPEAR,sprite.x,sprite.y);
                                game.playAudio(game.audio.crack);
                                sprite.remove();
                            } else if (sprite.collisions.enemy) {
                                let zIndex=0;
                                sprite.collisions.enemy.all.forEach(collision=>{
                                    zIndex=collision.object.zIndex;
                                    collision.object.remove();
                                    if (collision.object.shadow) collision.object.shadow.remove();
                                    C.addScore(game,scene,sprite.playerId,100);
                                });
                                game.playAudio(game.audio.burn);
                                let explosion=game.addNewSprite(sprite.minigame.sprites.explosion,sprite.x,sprite.y);
                                explosion.setZIndex(zIndex);
                                sprite.remove();
                            }
                        }
                    }
                }
            },
           
        },
        onPrepare:(game,scene,minigame)=>{
            minigame.started=0;
            minigame.goalAt=C.ONESEC*60;
            minigame.playing=true;
            minigame.spawnevery=C.ONESEC*2;
            minigame.intensity=1;
            
        },
        onEnter:(game,scene,minigame)=>{
            minigame.started=1;
            minigame.stage=game.addNewTilemap(minigame.tilemaps.stage);
            minigame.playerscount=0;
            C.MEMORY.players.forEach((player,p)=>{
                if (player.isInGame && !player.isDead) {
                    let
                        x=104+(p*32),
                        player=game.addNewSprite(minigame.sprites.player,x,100);
                    player.animations=C.PLAYERSKINS[C.MEMORY.players[p].skin];
                    player.playerId=p;
                    player.minigame=minigame;
                    minigame.playerscount++;
                    if (p) player.setFlipX(true);
                }
            })
        },
        onLogic:(game,scene,minigame)=>{
            let
                gameover=false;

            if (minigame.goalAt && minigame.playing) {

                minigame.started=2;
                minigame.goalAt--;

                if (minigame.goalAt%minigame.spawnevery==0) {
                    let times=minigame.intensity*minigame.playerscount;
                    for (let i=0;i<times;i++) {
                        let
                            x=24+C.RND.randomInteger(C.SCREENWIDTH-64),
                            y=32+C.RND.randomInteger(C.SCREENHEIGHT-72);
                        let enemy=game.addNewSprite(minigame.sprites.enemy,x,y);
                        enemy.minigame=minigame;
                        let explosion=game.addNewSprite(minigame.sprites.explosion,enemy.x,enemy.y);
                        explosion.setZIndex(enemy.y);
                    }
                    minigame.intensity+=0.08;
                    game.playAudio(game.audio.crack);
                }

            } else {
                gameover=true;
                if (minigame.playing) {
                    C.allPlayersAddScore(game,scene,5000);
                    game.playAudio(game.audio.powerup);
                }
            }
            return gameover;
        },
        onExit:(game,scene,minigame)=>{
        },
        onDrawPre:(game,scene,minigame)=>{
            
        },
        onDrawPost:(game,scene,minigame)=>{
            if (minigame.started) {
                let time=Math.ceil(minigame.goalAt/C.ONESEC);
                game.print(game.fonts.normal.outline,5,"TIME",110,24);
                game.print(game.fonts.normal.outline,1,time,118+(time<10?5:0),34);
            }
        }
    }
}