function gameLoadMinigameSpacesleep(game,scene,C) {
    scene.minigames.spacesleep={
        tilemaps:{
            stage:{
                tags:["walls","stagesprite"],
                x:0,
                cells:game.cells.minigameBaseTiles,
                zIndex:8,
                tiles:[
                    { char:" " },
                    { char:",", frame:0, tags:["wall"] },
                    { char:"-", frame:1, tags:["wall"] },
                    { char:".", frame:2, tags:["wall"] },
                    { char:"^", frame:3, tags:["wall"] },
                    { char:"=", frame:4, tags:["wall"] },
                    { char:";", frame:5, tags:["wall"] },
                    { char:"#", frame:6, tags:["wall"] },
                    { char:"k", frame:7, tags:["wall"] },
                ],
                map:[
                    "^#k##############k#k#############################################################  ## ## ## ##################k#;",
                    " ^==============#####=====#####==========#kkkk#####=========================#####  ^; ^; ^; ^##################; ",
                    "                ^===;     #####          #########;                         #####                                ",
                    "                          #k#k#          #kkkk##;                           #####                                ",
                    "                          #####          ######;                            #####                                ",
                    "                          #k#k#          #kkkk#              ,-------.      #####            ,###.               ",
                    "                          #####          #####;              #########      #####        ,########.              ",
                    "                          ^===;          ^===;               ####====;      ##kk#        ^#########.             ",
                    "                                                             ####           ##kk#            #k#####.            ",
                    "                                                             ####           #####.           #k######.           ",
                    "                                                     ,-------####           ^========;       #########.          ",
                    "                                                     #########kk#                            ##########---------.",
                    "                                                     #########kk#                            ##########=========;",
                    "                                                     ^=======####           ,--------.       #########;          ",
                    "                                                             ####           #####;           #k######;           ",
                    "                                                             ####           ##kk#            #k#####;            ",
                    "                ,---.                    ,---.               ####----.      ##kk#        ,#########;             ",
                    "                #####                    #####.              #########      #####        ^########;              ",
                    "                #k#k#                    #kkkk#              ^=======;      #####            ^###;               ",
                    "                #####                    ######.                            #####                                ",
                    "                #k#k#                    #kkkk##.                           #####                                ",
                    "                #####     ,---.          #########.                         #####                                ",
                    " ,--------------#####-----#####----------#kkkk#####-------------------------#####  ,. ,. ,. ,------------------. ",
                    ",#k########################k#k###################################################  ## ## ## ##################k#.",
                ]
            }
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
            playerbullet:{
                tags:["stagesprite"],
                zIndex:15,
                speedX:2,
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
                                sprite.collisions.enemy.all.forEach(collision=>{
                                    collision.object.remove();
                                    C.addScore(game,scene,sprite.playerId,100);
                                });
                                game.playAudio(game.audio.burn);
                                game.addNewSprite(sprite.minigame.sprites.explosion,sprite.x,sprite.y);
                                sprite.remove();
                            }
                        }
                    }
                }
            },
            enemy:{
                tags:["stagesprite","killplayer","enemy"],
                hitboxX:2,hitboxy:2,hitboxWidth:14,hitboxHeight:14,
                zIndex:10,
                states:{
                    default:{
                        onEnter:(game,scene,sprite)=>{
                            sprite.timer=0;
                        },
                        onLogic:(game,scene,sprite)=>{
                            sprite.setY(sprite.centery+Math.sin(sprite.timer)*sprite.waverange);
                            sprite.timer+=sprite.wavespeed;
                            if (sprite.x<-16)
                                sprite.remove();
                        }
                    }
                }
            },
            spaceship:{
                tags:["stagesprite"],
                zIndex:10,
                hitboxX:8,hitboxY:10,hitboxWidth:6,hitboxHeight:6,

                animations:{
                    default:{
                        loop:true,
                        cells:game.cells.minigameSpaceship,
                        speed:0.1
                    }
                },
                states:{
                    default:{
                        collisions:[
                            {
                                withTilemapTags:["walls"],
                                withTileTags:["wall"],
                                withSpriteTags:["killplayer"]
                            }
                        ],
                        onEnter:(game,scene,sprite)=>{
                            sprite.cooldown=0;
                            sprite.speed=1;
                            sprite.limitx=C.SCREENWIDTH-32;
                            sprite.limity=C.SCREENHEIGHT-24;
                            sprite.firespeed=C.QUARTERSEC;
                        },
                        onLogic:(game,scene,sprite)=>{
                            let x=sprite.x,y=sprite.y;
                            if (game.controlIsDown(game.controls[sprite.playerId].right))
                                x+=sprite.speed;
                            else if (game.controlIsDown(game.controls[sprite.playerId].left))
                                x-=sprite.speed;
                            if (game.controlIsDown(game.controls[sprite.playerId].down))
                                y+=sprite.speed;
                            else if (game.controlIsDown(game.controls[sprite.playerId].up))
                                y-=sprite.speed;
                            if (x<8) x=8;
                            if (x>sprite.limitx) x=sprite.limitx;
                            if (y<24) y=24;
                            if (y>sprite.limity) y=sprite.limity;
                            if (sprite.cooldown)
                                sprite.cooldown--;
                            else if (game.controlIsHit(game.controls[sprite.playerId].a) || game.controlIsHit(game.controls[sprite.playerId].b)) {
                                let bullet=game.addNewSprite(sprite.minigame.sprites.playerbullet,x+16,y+4);
                                bullet.minigame=sprite.minigame;
                                bullet.playerId=sprite.playerId;
                                bullet.setAnimation(sprite.bulletAnimation);
                                game.addNewSprite(C.SPRITEDISAPPEAR,bullet.x,bullet.y);
                                sprite.cooldown=sprite.firespeed;
                                game.playAudio(game.audio.firebubble);
                            }
                            sprite.setX(x);
                            sprite.setY(y);
                            sprite.pilot.setX(x);
                            sprite.pilot.setY(y-2);
                            if (sprite.collisions.wall || sprite.collisions.killplayer) {
                                game.playAudio(game.audio.explosion);
                                sprite.minigame.playing=false;
                            }
                        }
                    }
                }
            },
            pilot:{
                tags:["stagesprite"],
                zIndex:9
            }
        },
        onPrepare:(game,scene,minigame)=>{
            minigame.started=0;
            minigame.goalAt=C.ONESEC*60;
            minigame.playing=true;
            minigame.endsequence=Math.floor(minigame.goalAt/150)+C.RND.randomInteger(15);
            minigame.stars=[];
            for (let i=0;i<20;i++)
                minigame.stars.push({x:-1,y:-1,speedx:0,color:0});
        },
        onEnter:(game,scene,minigame)=>{
            minigame.started=1;
            minigame.stage=game.addNewTilemap(minigame.tilemaps.stage,C.SCREENWIDTH,24);
            C.MEMORY.players.forEach((player,p)=>{
                if (player.isInGame && !player.isDead) {
                    let
                        y=96+p*32,
                        ship=game.addNewSprite(minigame.sprites.spaceship,30,y);
                        pilot=game.addNewSprite(minigame.sprites.pilot,30,y);
                    ship.playerId=p;
                    ship.minigame=minigame;
                    ship.bulletAnimation=C.PLAYERSKINS[player.skin].smallBubble;
                    pilot.setAnimation(C.PLAYERSKINS[player.skin].walk);
                    ship.pilot=pilot;
                }
            })
        },
        onLogic:(game,scene,minigame)=>{
            let
                gameover=false;

            if (minigame.goalAt && minigame.playing) {
                minigame.started=2;
                minigame.goalAt--;

                let
                    spriteSequenceId=minigame.endsequence-Math.floor(minigame.goalAt/150),
                    spriteNewSequence=spriteSequenceId%2,
                    spawnEnemy=C.checkEvery(minigame.goalAt,25);

                if (spriteNewSequence && spawnEnemy) {
                    let seq=spriteSequenceId;
                    for (let i=0;i<4;i++) {
                        if (seq%2) {
                            let
                                centery=56+i*40,
                                enemy=game.addNewSprite(minigame.sprites.enemy,C.SCREENWIDTH,centery);
                            enemy.centery=centery;
                            enemy.setFlipX(true);
                            enemy.wavespeed=0.05;
                            enemy.waverange=spriteSequenceId;
                            enemy.setAnimation(game.scenes.play.sprites.bat.animations[0].flying);
                            enemy.setSpeedX(-1);
                        }
                        seq=seq>>1;
                    }
                }

                minigame.stage.setX(minigame.stage.x-0.3);
                
                minigame.stars.forEach(star=>{
                    if (star.x<0) {
                        star.x=star.color==0?C.RND.randomInteger(C.SCREENWIDTH):C.SCREENWIDTH;
                        star.y=24+C.RND.randomInteger(C.SCREENHEIGHT-32);
                        star.speedx=0.5+C.RND.randomFloat()*2;
                        star.color=1+C.RND.randomInteger(7);
                    } else star.x-=star.speedx;
                })

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
            minigame.stars.forEach(star=>{
                game.fillRect(game.palette[star.color],star.x,star.y,2,2);
            });
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