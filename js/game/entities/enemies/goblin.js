function gameLoadGoblin(game,scene,C) {
    scene.sprites.goblin={
        tags:["enemy","hitable","tostart","killplayer","toclear","stagesprite","bright"],
        hitboxX:2, hitboxY:2,
        hitboxWidth:12, hitboxHeight:14,
        zIndex:C.ENEMYZINDEX,
        minSpeedX:C.MINSPEEDX, maxSpeedX:C.MAXSPEEDX, minSpeedY:C.MINSPEEDY, maxSpeedY:C.MAXSPEEDY,
        animations:[
            {
                still:{
                    cells:game.cells.goblinStill,
                },
                walk:{
                    loop:true,
                    cells:game.cells.goblinWalking,
                    speed:0.1
                },
                jump:{
                    loop:true,
                    cells:game.cells.goblinJumping,
                    speed:0.1
                },
                fall:{
                    loop:true,
                    cells:game.cells.goblinFalling,
                    speed:0.1
                },
                dead:{
                    cells:game.cells.goblinStill,
                },
                bubble:{
                    loop:true,
                    cells:game.cells.goblinBubble,
                    speed:0.1
                },
                stunned:{
                    cells:game.cells.goblinStunned
                },
                panic:{
                    loop:true,
                    cells:game.cells.goblinPanic,
                    speed:0.2
                },
                washed:{
                    cells:game.cells.goblinWashed
                }
            },{
                still:{
                    cells:game.cells.angryGoblinStill,
                },
                walk:{
                    loop:true,
                    cells:game.cells.angryGoblinWalking,
                    speed:0.1
                },
                jump:{
                    loop:true,
                    cells:game.cells.angryGoblinJumping,
                    speed:0.1
                },
                fall:{
                    loop:true,
                    cells:game.cells.angryGoblinFalling,
                    speed:0.1
                },
                dead:{
                    cells:game.cells.angryGoblinStill,
                },
                bubble:{
                    loop:true,
                    cells:game.cells.angryGoblinBubble,
                    speed:0.1
                },
                stunned:{
                    cells:game.cells.angryGoblinStunned
                },
                panic:{
                    loop:true,
                    cells:game.cells.angryGoblinPanic,
                    speed:0.2
                },
                washed:{
                    cells:game.cells.angryGoblinWashed
                }
            }
        ],
        properties:{
            brightnessX:8,
            brightnessY:8,
            brightness:16,
            onBubbleRelease:{
                addNewSprite:"goblin",
                setMode:1
            },
            onBubblePopped:{
                scatterAround:true
            },
            onDie:{
                spawnBonus:"tier1points",
                spawnBonusSequence:C.SPAWNBONUSSEQUENCE
            }
        },
        states:{
            default:{
                collisions:C.ENEMYCOLLISIONS,
                onBubbled:C.cageInBubble,
                onSnowed:C.cageInSnow,
                onSquished:C.squished,
                onWashed:C.washed,
                onRushed:C.rushed,
                onBulleted:C.bulleted,
                onFrozen:C.frozen,
                onUnfrozen:C.unfrozen,
                onSucked:C.sucked,
                onGunned:C.gunned,
                onEnter:(game,scene,sprite)=>{
                    C.enemyStart(game,scene,sprite);
                    C.walkingEnemyStart(game,scene,sprite);
                    if (!sprite.timer) sprite.timer=C.ENEMYJUMPTIMER*(1+C.RND.randomInteger(3));
                    if (!sprite.fireTimer) sprite.fireTimer=C.ENEMYFIRETIMER;
                    if (sprite.resetJumpsCount === undefined) sprite.resetJumpsCount=true;
                },
                onLogic:(game,scene,sprite)=>{
                    C.commonEnemyLogic(game,scene,sprite);
                    if (C.enemyWalking(game,scene,sprite,C.SKELETONMOVESPEED) && C.enemyJumping(game,scene,sprite,C.SKELETONMOVESPEED)) {
                        sprite.timer--;
                        if (!sprite.timer) sprite.changeState(sprite.states.jumping);
                        if (sprite.fireTimer)
                            sprite.fireTimer--;
                        else {
                            let target=C.getFrontPlayer(game,scene,sprite);
                            if (target) {
                                if (target.x>sprite.x)
                                    sprite.setFlipX(false);
                                else
                                    sprite.setFlipX(true);
                                sprite.changeState(sprite.states.firing);
                            }
                        }
                    }
                }
            },
            firing:{
                onBubbled:C.cageInBubble,
                onSnowed:C.cageInSnow,
                onSquished:C.squished,
                onWashed:C.washed,
                onRushed:C.rushed,
                onBulleted:C.bulleted,
                onFrozen:C.frozen,
                onUnfrozen:C.unfrozen,
                onSucked:C.sucked,
                onGunned:C.gunned,
                onEnter:(game,scene,sprite)=>{
                    sprite.setPhysicsEnabled(false);
                    sprite.setAnimation(sprite.animations[sprite.mode].still);
                    sprite.aimingTimer=C.ENEMYAIMINGTIMER;
                },
                onLogic:(game,scene,sprite)=>{
                    C.commonEnemyLogic(game,scene,sprite);
                    if (sprite.aimingTimer)
                        sprite.aimingTimer--;
                    else {
                        let ball=game.addNewSprite(scene.sprites.boomerang,sprite.x,sprite.y);
                        ball.setSpeedX(sprite.flipX?-C.SNOWBALLSPEED:C.SNOWBALLSPEED);
                        sprite.changeState(sprite.states.default);
                    }
                }
            },
            jumping:C.ENEMYJUMPING,
            smalljumping:C.SMALLJUMPING,
            preparing:C.ENEMYPREPARING,
            kill:C.ENEMYKILL,
            snowing:C.ENEMYSNOWING,
            stunned:C.ENEMYSTUNNED,
            rolling:C.ENEMYROLLING,
            sucking:C.ENEMYSUCKING,
            sucked:C.ENEMYSUCKED
        },
    }
}