function gameLoadSnowballs(game,scene,C) {

    scene.sprites.smallSnow={
        tags:["stagesprite"],
        hitboxX:2,
        hitboxY:2,
        hitboxWidth:12,
        hitboxHeight:12,
        zIndex:C.BUBBLESZINDEX,
        accelY:C.GRAVITY,
        states:{
            default:{
                collisions:C.SMALLBUBBLECOLLISIONS,
                onLogic:(game,scene,sprite)=>{
                    C.manageBullet(game,scene,sprite,"onSnowed",true);
                }
            }
        }
    };

    scene.sprites.snowing={
        tags:["stagesprite","bright"],
        hitboxX:2, hitboxY:2,
        hitboxWidth:12, hitboxHeight:14,
        accelY:C.GRAVITY,
        zIndex:C.ENEMYEFFECTZINDEX,
        minSpeedX:C.MINSPEEDX, maxSpeedX:C.MAXSPEEDX, minSpeedY:C.MINSPEEDY, maxSpeedY:C.MAXSPEEDY,
        animations:{
            default:{
                cells:game.cells.fillingSnowBall
            },
            rolling:{
                cells:game.cells.fillingSnowBallRolling
            },
        },
        properties:{
            brightnessX:8,
            brightnessY:8,
            brightness:16
        },
        states:{
            default:{
                collisions:C.SNOWBALLCOLLISIONS,
                onEnemySnowed:(game,scene,sprite)=>{
                    sprite.defrostTimer=C.SNOWDEFROSTTIMER;
                    sprite.defrostLevel+=C.SNOWDEFROSTLEVELPERHIT;
                    if (sprite.defrostLevel>C.SNOWMAXDEFROSTLEVEL)
                        sprite.defrostLevel=C.SNOWMAXDEFROSTLEVEL;
                },
                onEnter:(game,scene,sprite)=>{
                    sprite.defrostTimer=C.SNOWDEFROSTTIMER;
                    sprite.defrostLevel=C.SNOWDEFROSTLEVELPERHIT;
                },
                onLogic:(game,scene,sprite)=>{
                    if (sprite.snowedsprite.removed)
                        sprite.remove();
                    else {
                        C.applyVerticalWarp(sprite);
                        sprite.snowedsprite.setX(sprite.x);
                        sprite.snowedsprite.setY(sprite.y);
                        sprite.setFrame(Math.min(Math.floor(3*sprite.defrostLevel),3));
                        if (sprite.defrostTimer) {
                            sprite.defrostTimer--;
                            if (!sprite.defrostTimer) {
                                sprite.defrostTimer=C.SNOWDEFROSTTIMER;
                                sprite.defrostLevel-=C.SNOWDEFROSTAMOUNT;
                                if (sprite.defrostLevel<=0) {
                                    sprite.snowedsprite.mode=1
                                    C.enemyRestore(game,scene,sprite.snowedsprite);
                                    sprite.remove();
                                }
                            }
                        }
                        if (sprite.defrostLevel>=1) {
                            sprite.snowedsprite.setVisible(false);
                            C.managePlayerPush(game,scene,sprite,sprite.states.rolling);
                        } else {
                            sprite.snowedsprite.setVisible(true);
                        }
                    }
                }
            },
            rolling:{
                collisions:C.ROLLINGSNOWBALLCOLLISIONS,
                onEnter:(game,scene,sprite)=>{
                    sprite.setAnimation(sprite.animations.rolling);
                    sprite.snowedsprite.setVisible(false);
                    sprite.rolltimer=C.SNOWBALLROLLTIMER;
                    sprite.bouncesoundtimer=0;
                    sprite.timer=0;
                    sprite.rushCombo=0;
                    sprite.invulerability=C.SNOWBALLINVULNERABILITY;
                },
                onLogic:(game,scene,sprite)=>{
                    if (sprite.snowedsprite.removed)
                        sprite.remove();
                    else {
                        C.applyVerticalWarp(sprite);
                        sprite.snowedsprite.setX(sprite.x);
                        sprite.snowedsprite.setY(sprite.y);
                    
                        if (sprite.bouncesoundtimer)
                            sprite.bouncesoundtimer--;

                        if (sprite.rolltimer)
                            sprite.rolltimer--;

                        sprite.timer++;

                        if (sprite.timer==5) {
                            sprite.timer=0;
                            if (sprite.speedX>0)
                                sprite.setAngle(sprite.angle+90);
                            else
                                sprite.setAngle(sprite.angle-90);
                        }

                        if (sprite.collisions.hitable) {
                            sprite.collisions.hitable.all.forEach(collision=>{
                                if (
                                    (collision.object !== sprite.snowedsprite) &&
                                    collision.object.state.onRushed &&
                                    collision.object.state.onRushed(game,scene,collision.object,sprite)
                                ) {
                                    game.addNewSprite(scene.sprites.disappear,sprite.x,sprite.y-8);
                                    sprite.rushCombo++;
                                }
                            });
                        }

                        if (sprite.invulerability)
                            sprite.invulerability--;
                        else
                            if (sprite.collisions.player) {
                                sprite.collisions.player.all.forEach(collision=>{
                                    game.addNewSprite(scene.sprites.disappear,sprite.x,sprite.y-8);
                                    collision.object.setSpeedY(C.SNOWBALLPLAYERHIT);
                                });
                                sprite.invulerability=C.SNOWBALLINVULNERABILITY;
                                game.playAudio(game.audio.bounce);
                            }

                        if (
                            !sprite.speedX||
                            (sprite.collisions.left&&(sprite.collisions.left.wall||sprite.collisions.left.solidwall||sprite.collisions.left.ceilingwall))||
                            (sprite.collisions.right&&(sprite.collisions.right.wall||sprite.collisions.right.solidwall||sprite.collisions.right.ceilingwall))
                        ) {
                            if (sprite.rolltimer) {
                                if (!sprite.bouncesoundtimer) {
                                    game.addNewSprite(scene.sprites.disappear,sprite.x,sprite.y);
                                    game.playAudio(game.audio.bounce);    
                                    sprite.bouncesoundtimer=C.HALFSEC;
                                }
                            } else {
                                game.addNewSprite(scene.sprites.disappear,sprite.x,sprite.y);
                                C.killEnemy(game,scene,sprite.snowedsprite,sprite.rushCombo);
                                C.evaluatePlayerCombo(game,scene,sprite.rushCombo,1);
                                sprite.remove();
                                game.playAudio(game.audio.crack);
                            }
                        }
                    }
                }
            }
        }
    };

}