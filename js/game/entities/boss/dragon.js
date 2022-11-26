function gameLoadDragon(game,scene,C) {
    scene.sprites.dragon={
        tags:["enemy","hitable","killplayer","toclear","stagesprite","bright"],
        hitboxX:4, hitboxY:4,
        hitboxWidth:40, hitboxHeight:40,
        zIndex:C.ENEMYZINDEX,
        y:-32,
        x:Math.floor((C.SCREENWIDTH-48)/2),
        animations:{
            default:{
                loop:true,
                cells:game.cells.dragonFlying,
                speed:0.1
            },
            defeated:{
                cells:game.cells.dragonDead
            }
        },
        properties:{
            brightnessX:24,
            brightnessY:24,
            brightness:48
        },
        states:{
            default:{
                onEnter:(game,scene,sprite)=>{
                    if (C.MEMORY.cheats.weakBoss || (C.DEBUG.enabled && C.DEBUG.weakBoss))
                        sprite.health=0;
                    else
                        sprite.health=9;
                    sprite.invulnerability=0;
                },
                onLogic:(game,scene,sprite)=>{
                    if (sprite.y<40) sprite.setY(sprite.y+1);
                    else sprite.setState(sprite.states.attack);
                }
            },
            attack:{
                onBulleted:(game,scene,sprite,audio,bonus,by,counter)=>{
                    if (!sprite.invulnerability) {
                        if (sprite.health) {
                            game.playAudio(game.audio.pain);
                            sprite.health--;
                            sprite.invulnerability=C.ONESEC;
                        } else
                            sprite.setState(sprite.states.defeated);
                        if (audio) game.playAudio(audio);
                    } else
                        sprite.invulnerability=C.ONESEC;
                },
                onEnter:(game,scene,sprite)=>{
                    sprite.movement=3.14/2;
                    sprite.flipLimit=C.SCREENWIDTH/2-24;
                    sprite.fireTimer=C.ONESEC;
                },  
                onLogic:(game,scene,sprite)=>{
                    if (sprite.fireTimer)
                        sprite.fireTimer--;
                    else {
                        let targets=game.getSpritesWithTag("player");
                        if (targets.length) {
                            let
                                target=C.RND.randomElement(targets);
                                bullet=game.addNewSprite(scene.sprites.whiteFireball,sprite.x+16,sprite.y+16),
                                angle=game.calcAngle(bullet.x,bullet.y,target.x,target.y);
                            game.applyAngleSpeed(bullet,angle,2);
                            game.playAudio(game.audio.burn);
                        }
                        sprite.fireTimer=C.ONESEC;
                    }
                    if (sprite.invulnerability) {
                        sprite.invulnerability--;
                        sprite.setVisible(C.checkBlink(sprite.invulnerability,2));
                    } else sprite.setVisible(true);
                    sprite.movement-=0.02;
                    sprite.setX(sprite.x+Math.sin(sprite.movement)*1.4);
                    sprite.setY(sprite.y+Math.cos(sprite.movement)*1.3);
                    sprite.setFlipX(sprite.x<sprite.flipLimit)
                }
            },
            defeated:{
                onEnter:(game,scene,sprite)=>{
                    C.endBossBattle(game,scene);
                    game.playAudio(game.audio.explosion);
                    sprite.setAnimation(sprite.animations.defeated);
                    sprite.setAccelY(0.025);
                    sprite.setSpeedX(0);
                    sprite.setSpeedY(-2);
                    sprite.removeTag("killplayer");
                    sprite.explosionTimer=0;
                    C.MEMORY.stageMusic=0;
                    C.MEMORY.stageFastMusic=0;
                    game.stopMusic();
                },  
                onLogic:(game,scene,sprite)=>{
                    sprite.explosionTimer++;
                    if (C.checkEvery(sprite.explosionTimer,2)) {
                        let explosion=game.addNewSprite(scene.sprites.whiteExplosion,sprite.x+C.RND.randomInteger(32),sprite.y+C.RND.randomInteger(32));
                        explosion.setSpeedY(-2);
                    }
                    if (sprite.explosionTimer%C.HALFSEC == 0)
                        game.playAudio(game.audio.explosion);
                    if (sprite.y>C.SCREENHEIGHT) {
                        sprite.remove();
                        game.addNewSprite(scene.sprites.yendorChest);
                    }

                }
            }
        }
    }
}