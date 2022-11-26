function gameLoadBonus(game,scene,C) {
    
    scene.sprites.bonusSpawnPoint={
        width:16,
        height:16,
        tags:["stagesprite"],
        states:{
            default:{
                collisions:C.BONUSSPAWNPOINTCOLLISIONS,
                onLogic:(game,scene,sprite)=>{
                    if (!C.MEMORY.stageEnded && !C.MEMORY.scheduledBonusesTimer && C.isScheduledBonusAvailable(game,scene) && !sprite.collisions.all.length) {
                        C.spawnBonus(game,scene,sprite.x,sprite.y,C.getNextScheduledBonus(game,scene));
                        C.MEMORY.scheduledBonusesTimer=C.SPAWNBONUSTIMER;
                    }
                }
            }
        }
    };

    scene.sprites.bossBonusSpawnPoint={
        width:16,
        height:16,
        tags:["stagesprite","spawnpoint"],
        states:{
            default:{
                collisions:C.BONUSSPAWNPOINTCOLLISIONS,
                onLogic:(game,scene,sprite)=>{
                    let player=C.MEMORY.players[sprite.player];
                    if (!sprite.collisions.all.length && player.isInGame && !player.isDead  && (player.fireMode == player.defaultFireMode) && (!sprite.spawnedBonus || sprite.spawnedBonus.removed)) {
                        sprite.spawnedBonus=C.spawnBonus(game,scene,sprite.x,sprite.y,sprite.bonus);
                    }
                }
            }
        }
    };

    scene.sprites.scatter={
        tags:["stagesprite"],
        zIndex:C.SCATTERZINDEX,
        accelY:C.GRAVITY,
        states:{
            default:{
                collisions:C.SCATTERBOUNCECOLLISIONS,
                onEnter:(game,scene,sprite)=>{
                    sprite.timer = C.SCATTERTIMER;
                    sprite.setSpeedX(C.SCATTERSPEEDX*(C.RND.randomFloat()-0.5));
                    sprite.setSpeedY(C.SCATTERSPEEDY);
                },
                onLogic:(game,scene,sprite)=>{
                    C.applyVerticalWarp(sprite);
                    if (sprite.timer) {
                        sprite.timer--;
                        if (C.checkEvery(sprite.timer,5)) sprite.setAngle(sprite.angle+(sprite.speedX>0?90:-90));
                    } else sprite.setState(sprite.states.fall);
                }
            },
            fall:{
                collisions:C.SCATTERCOLLISIONS,
                onEnter:(game,scene,sprite)=>{
                    sprite.waitingfloor=true;
                    sprite.timer = C.SCATTERFALLTIMER;
                    sprite.setSpeedX(0);
                    sprite.setSpeedY(C.SCATTERFALLSPEED);
                    sprite.setAccelY(0);
                },
                onLogic:(game,scene,sprite)=>{
                    let
                        disappear = false,
                        collidesWall = sprite.collisions.wall || sprite.collisions.ceilingwall;
                        C.applyVerticalWarp(sprite);
                    if (sprite.timer) {
                        sprite.timer--;
                        if (C.checkEvery(sprite.timer,10)) sprite.setAngle(sprite.angle+90);
                        if (sprite.waitingfloor) {
                            if (!collidesWall) {
                                sprite.setCollisions(C.SCATTERFALLINGCOLLISIONS);
                                sprite.waitingfloor=false;
                            }
                        } else if (collidesWall)
                            disappear = true;
                    } else disappear = true;
                    if (disappear) {
                        if (sprite.onDie) {
                            if (sprite.onDie.spawnBonus) {
                                let bonus=C.spawnBonus(game,scene,sprite.x,sprite.y,sprite.onDie.spawnBonus);
                                bonus.isCagedEnemy = sprite.isCagedEnemy;
                            }
                        }
                        sprite.remove();
                    }
                }
            }
        }
    };
    
    scene.sprites.popupText={
        tags:["stagesprite"],
        zIndex:C.POPUPTEXTZINDEX,
        states:{
            default:{
                onEnter:(game,scene,sprite)=>{
                    sprite.setSpeedY(C.POPUPTEXTSPEEDY);
                    sprite.timer=C.POPUPTEXTTIMER;
                },
                onDraw:(game,scene,sprite)=>{
                    game.drawSimpleImage(sprite.image,sprite.x,sprite.y);
                },
                onLogic:(game,scene,sprite)=>{
                    sprite.timer--;
                    if (!sprite.timer) sprite.remove();
                }
            }
        }
    };

    scene.sprites.bonus={
        zIndex:C.BONUSZINDEX,
        tags:["bonus","stagesprite","bright"],
        animations:{
            default:{
                cells:game.cells.bonus
            }
        },
        speedY:C.SCATTERFALLSPEED,
        properties:{
            brightnessX:8,
            brightnessY:8,
            brightness:16
        },
        states:{
            default:{
                collisions:C.BONUSCOLLISIONS,
                onLogic:(game,scene,sprite)=>{
                    C.applyVerticalWarp(sprite);
                    if (sprite.scale<1) {
                        sprite.setScale(sprite.scale+C.BONUSSTAGEZOOMSPEED);
                        if (sprite.scale>1) sprite.setScale(1);
                    }
                    if (sprite.timer!==undefined) {
                        sprite.timer--;
                        if (sprite.timer) {
                            if (sprite.timer<C.BLINKTIME)
                                sprite.setVisible(C.checkBlink(sprite.timer,2));
                        } else {
                            game.addNewSprite(scene.sprites.disappear,sprite.x,sprite.y);
                            sprite.remove();
                        }
                    }
                    if (sprite.accelY && sprite.collisions.wall) {
                        sprite.setSpeedX(0);
                        sprite.setSpeedY(0);
                    }
                }
            }
        }
    };

    scene.sprites.giantBonus={
        zIndex:C.BONUSZINDEX,
        tags:["bonus","stagesprite","bright"],
        x:Math.floor((C.SCREENWIDTH-32)/2),
        y:-16,
        animations:{
            default:{
                cells:game.cells.giantBonus
            }
        },
        properties:{
            brightnessX:16,
            brightnessY:16,
            brightness:48
        },
        states:{
            default:{
                collisions:C.BONUSCOLLISIONS,
                onLogic:(game,scene,sprite)=>{
                    if (sprite.y<C.GIANTBONUSFLOOR)
                        sprite.setY(Math.min(sprite.y+C.GIANTBONUSSPEED,C.GIANTBONUSFLOOR));
                    sprite.timer--;
                    if (sprite.timer) {
                        if (sprite.timer<C.BLINKTIME)
                            sprite.setVisible(C.checkBlink(sprite.timer,2));
                    } else
                        sprite.remove();
                }
            }
        }
    };

}