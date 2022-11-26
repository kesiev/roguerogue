function gameLoadSkeleton(game,scene,C) {
    scene.sprites.skeleton={
        tags:["enemy","hitable","tostart","killplayer","toclear","stagesprite","bright"],
        hitboxX:2, hitboxY:2,
        hitboxWidth:12, hitboxHeight:14,
        zIndex:C.ENEMYZINDEX,
        minSpeedX:C.MINSPEEDX, maxSpeedX:C.MAXSPEEDX, minSpeedY:C.MINSPEEDY, maxSpeedY:C.MAXSPEEDY,
        animations:[
            {
                still:{
                    cells:game.cells.skeletonStill,
                },
                walk:{
                    loop:true,
                    cells:game.cells.skeletonWalking,
                    speed:0.1
                },
                jump:{
                    loop:true,
                    cells:game.cells.skeletonJumping,
                    speed:0.1
                },
                fall:{
                    loop:true,
                    cells:game.cells.skeletonFalling,
                    speed:0.1
                },
                dead:{
                    cells:game.cells.skeletonStill,
                },
                bubble:{
                    loop:true,
                    cells:game.cells.skeletonBubble,
                    speed:0.1
                },
                stunned:{
                    cells:game.cells.skeletonStunned
                },
                panic:{
                    loop:true,
                    cells:game.cells.skeletonPanic,
                    speed:0.2
                },
                washed:{
                    cells:game.cells.skeletonWashed
                }
            },{
                still:{
                    cells:game.cells.angrySkeletonStill,
                },
                walk:{
                    loop:true,
                    cells:game.cells.angrySkeletonWalking,
                    speed:0.1
                },
                jump:{
                    loop:true,
                    cells:game.cells.angrySkeletonJumping,
                    speed:0.1
                },
                fall:{
                    loop:true,
                    cells:game.cells.angrySkeletonFalling,
                    speed:0.1
                },
                dead:{
                    cells:game.cells.angrySkeletonStill,
                },
                bubble:{
                    loop:true,
                    cells:game.cells.angrySkeletonBubble,
                    speed:0.1
                },
                stunned:{
                    cells:game.cells.angrySkeletonStunned
                },
                panic:{
                    loop:true,
                    cells:game.cells.angrySkeletonPanic,
                    speed:0.2
                },
                washed:{
                    cells:game.cells.angrySkeletonWashed
                }
            }
        ],
        properties:{
            brightnessX:8,
            brightnessY:8,
            brightness:16,
            onBubbleRelease:{
                addNewSprite:"skeleton",
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
                    if (sprite.resetJumpsCount === undefined) sprite.resetJumpsCount=true;
                },
                onLogic:(game,scene,sprite)=>{
                    C.commonEnemyLogic(game,scene,sprite);
                    if (C.enemyWalking(game,scene,sprite,C.SKELETONMOVESPEED) && C.enemyJumping(game,scene,sprite,C.SKELETONMOVESPEED)) {
                        sprite.timer--;
                        if (!sprite.timer) sprite.changeState(sprite.states.jumping);
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
        }
    }
}