function gameLoadWaterTank(game,scene,C) {

    scene.sprites.waterTank={
        tags:["stagesprite","bright"],
        hitboxX:2,
        hitboxY:2,
        hitboxWidth:12,
        hitboxHeight:12,
        zIndex:C.PLAYERTOOLZINDEX,
        accelY:C.WATERTANKGRAVITY,
        properties:{
            brightnessX:8,
            brightnessY:8,
            brightness:16,
            backpack:[
                { dx:-6, dy:-12 },
                { dx:6, dy:-12 },
            ]
        },
        animations:{
            default:{
                cells:game.cells.waterTank
            }
        },
        states:{
            default:{
                removeBackpack:(game,scene,sprite)=>{
                    sprite.remove();
                },
                onEnter:(game,scene,sprite)=>{
                    sprite.fill=0;
                    sprite.setPhysicsEnabled(false);
                },
                onLogic:(game,scene,sprite)=>{
                    if (game.controlIsDown(game.controls[sprite.player.playerId].b)) {
                        sprite.fill+=C.WATERTANKFILLRATIO;
                        if (sprite.fill>1) sprite.fill=1;
                    } else if (game.controlIsUp(game.controls[sprite.player.playerId].b)) {
                        let playerMemory = C.MEMORY.players[sprite.player.playerId];
                        if (game.controlIsDown(game.controls[sprite.player.playerId].down))
                            sprite.setSpeedY(playerMemory.smallBubbleSpeed)
                        else if (game.controlIsDown(game.controls[sprite.player.playerId].up))
                            sprite.setSpeedY(-playerMemory.smallBubbleSpeed*C.SMALLBUBBLEDOWNRATIO)
                        else {
                            sprite.setSpeedX(sprite.player.flipX?-playerMemory.smallBubbleSpeed:playerMemory.smallBubbleSpeed);
                            sprite.setSpeedY(C.WATERTANKSPEEDY);
                        }
                        sprite.setX(sprite.player.x);
                        sprite.setState(sprite.states.bullet);
                        C.playerBlowedBubble(game,scene,sprite.player);
                        sprite.player.backpack=0;
                        sprite.player.setAnimation(sprite.player.animations[playerMemory.firingAnimation]);
                        game.playAudio(game.audio.firespecial);
                    }
                    sprite.setFrame(Math.floor(6*sprite.fill));
                }
            },
            bullet:{
                collisions:C.WATERTANKCOLLISIONS,
                onEnter:(game,scene,sprite)=>{
                    sprite.setPhysicsEnabled(true);
                },
                onLogic:(game,scene,sprite)=>{
                    C.applyVerticalWarp(sprite);
                    let pop=0;
                    if ((sprite.collisions.player&&(sprite.collisions.player.all[0].object!==sprite.player))||sprite.collisions.hitable)
                        pop=1;
                    sprite.timer--;
                    if (!sprite.timer || (((sprite.speedY>=0) && sprite.collisions.wall)||sprite.collisions.solidwall))
                        pop=sprite.fill==1?1:2;
                    switch (pop) {
                        case 1:{
                            C.manageHitableEvent(game,scene,sprite,"onWashed");
                            for (let i=0;i<3;i++) {
                                let flow=game.addNewSprite(scene.sprites.waterFlow,sprite.x+1,sprite.y);
                                flow.fill=sprite.fill;
                                flow.setFlipX(true);
                                flow.wait=1+i*5;
                                flow=game.addNewSprite(scene.sprites.waterFlow,sprite.x+1,sprite.y+6);
                                flow.fill=sprite.fill;
                                flow.setFlipX(true);
                                flow.wait=1+i*5;
                                flow=game.addNewSprite(scene.sprites.waterFlow,sprite.x+7,sprite.y);
                                flow.fill=sprite.fill;
                                flow.wait=1+i*5;
                                flow=game.addNewSprite(scene.sprites.waterFlow,sprite.x+7,sprite.y+6);
                                flow.fill=sprite.fill;
                                flow.wait=1+i*5;
                            }
                            game.addNewSprite(scene.sprites.disappear,sprite.x,sprite.y);                        
                            sprite.remove();
                            game.playAudio(game.audio.splash);
                            break;
                        }
                        case 2:{
                            C.turnIntoBubble(game,scene,sprite,true);
                            sprite.remove();
                            break;
                        }
                    }
                }
            }
        }
    };

    scene.sprites.waterFlow={
        tags:["stagesprite"],
        hitboxX:1,
        hitboxY:2,
        hitboxWidth:6,
        hitboxHeight:6,
        zIndex:C.SPECIALZINDEX,
        minSpeedX:C.MINSPEEDX, maxSpeedX:C.MAXSPEEDX, minSpeedY:C.MINSPEEDY, maxSpeedY:C.MAXSPEEDY,
        animations:{
            default:{
                cells:game.cells.waterFlow
            }
        },
        states:{
            default:{
                collisions:C.WATERFLOWCOLLISION,
                onLogic:(game,scene,sprite)=>{
                    if (sprite.wait) {
                        sprite.wait--;
                        if (!sprite.wait)
                            sprite.setAccelY(C.WATERTANKGRAVITY);
                    } else {
                        sprite.fill-=C.WATERTANKEMPTYRATIO;
                        if (sprite.fill<=0)
                            sprite.remove();
                        else {
                            C.applyVerticalWarp(sprite);
                            if (sprite.collisions.bottom && (sprite.collisions.bottom.wall||sprite.collisions.bottom.solidwall)) {
                                sprite.setFrame(Math.round(4*sprite.fill));
                                if (sprite.flipX)
                                    sprite.setSpeedX(-C.WATERFLOWSPEED);
                                else
                                    sprite.setSpeedX(C.WATERFLOWSPEED);
                                C.enemyChangeDirectionOnWall(game,scene,sprite);
                            } else {
                                sprite.setFrame(4);
                                sprite.setSpeedX(0);
                            }
                            C.manageHitableEvent(game,scene,sprite,"onWashed");
                        }
                    }
                }
            }
        }
    }

}
