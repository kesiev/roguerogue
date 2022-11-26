function gameLoadGolem(game,scene,C) {
    scene.sprites.golem={
        tags:["enemy","hitable","tostart","killplayer","toclear","stagesprite","bright"],
        hitboxX:2, hitboxY:2,
        hitboxWidth:12, hitboxHeight:14,
        zIndex:C.ENEMYZINDEX,
        minSpeedX:C.MINSPEEDX, maxSpeedX:C.MAXSPEEDX, minSpeedY:C.MINSPEEDY, maxSpeedY:C.MAXSPEEDY,
        animations:[
            {
                still:{
                    cells:game.cells.golemStill,
                },
                walk:{
                    loop:true,
                    cells:game.cells.golemWalking,
                    speed:0.1
                },
                jump:{
                    loop:true,
                    cells:game.cells.golemJumping,
                    speed:0.1
                },
                fall:{
                    loop:true,
                    cells:game.cells.golemFalling,
                    speed:0.1
                },
                dead:{
                    cells:game.cells.golemStill,
                },
                bubble:{
                    loop:true,
                    cells:game.cells.golemBubble,
                    speed:0.1
                },
                stunned:{
                    cells:game.cells.golemStunned
                },
                panic:{
                    loop:true,
                    cells:game.cells.golemPanic,
                    speed:0.2
                },
                washed:{
                    cells:game.cells.golemWashed
                }
            },{
                still:{
                    cells:game.cells.angryGolemStill,
                },
                walk:{
                    loop:true,
                    cells:game.cells.angryGolemWalking,
                    speed:0.1
                },
                jump:{
                    loop:true,
                    cells:game.cells.angryGolemJumping,
                    speed:0.1
                },
                fall:{
                    loop:true,
                    cells:game.cells.angryGolemFalling,
                    speed:0.1
                },
                dead:{
                    cells:game.cells.angryGolemStill,
                },
                bubble:{
                    loop:true,
                    cells:game.cells.angryGolemBubble,
                    speed:0.1
                },
                stunned:{
                    cells:game.cells.angryGolemStunned
                },
                panic:{
                    loop:true,
                    cells:game.cells.angryGolemPanic,
                    speed:0.2
                },
                washed:{
                    cells:game.cells.angryGolemWashed
                }
            }
        ],
        properties:{
            brightnessX:8,
            brightnessY:8,
            brightness:16,
            onBubbleRelease:{
                addNewSprite:"golem",
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
                    if (!sprite.timer) sprite.timer=(C.ENEMYJUMPTIMER*(1+C.RND.randomInteger(3)));
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
                                if ((sprite.flipX && (target.x<sprite.x))||(!sprite.flipX && (target.x>sprite.x))) {
                                    let ball=game.addNewSprite(scene.sprites.snowball,sprite.x,sprite.y);
                                    ball.setSpeedX(sprite.flipX?-C.SNOWBALLSPEED:C.SNOWBALLSPEED);
                                }
                            }
                            sprite.fireTimer=C.ENEMYFIRETIMER;
                        }
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