let gameLoadPlayer=(game,scene,C)=>{
    scene.sprites.player={
        tags:["player","stagesprite","bright"],
        hitboxX:2, hitboxY:2,
        hitboxWidth:12, hitboxHeight:14,
        zIndex:C.PLAYERZINDEX,
        animation:"still",
        accelY:C.GRAVITY,
        properties:{
            brightnessX:8,
            brightnessY:8,
            brightness:48
        },
        states:{
            default:{
                collisions:C.PLAYERCOLLISIONS,
                onEnter:(game,scene,sprite)=>{
                    sprite.coyoteTime=0;
                    sprite.oldX=sprite.x;
                    sprite.oldY=sprite.y;
                    sprite.warpLoop=0;
                    sprite.nextWarpLoop=1;
                    sprite.canCutJump=false;
                    sprite.stunned=0;
                    sprite.invulnerability=0;
                },
                onPoisoned:(game,scene,sprite)=>{
                    if (!sprite.stunned && !sprite.invulnerability) {
                        sprite.stunned=C.ONESEC;
                        C.removeBackpack(game,scene,sprite);
                        game.playAudio(game.audio.stun);
                    }
                },
                onLogic:(game,scene,sprite)=>{

                    let
                        playerMemory = C.MEMORY.players[sprite.playerId],
                        wantJump = game.controlIsDown(game.controls[sprite.playerId].a),
                        applyLockSide = playerMemory.lockSide && (game.controlIsDown(game.controls[sprite.playerId].b) || game.controlIsReleased(game.controls[sprite.playerId].b)),
                        movingSpeed = playerMemory.moveFast || sprite.deadly ? C.PLAYERFASTMOVINGSPEED : 1,
                        lockedMovingSpeed = applyLockSide ? movingSpeed/3 : movingSpeed,
                        isTouchingFloor = sprite.collisions.bottom && (sprite.collisions.bottom.wall||sprite.collisions.bottom.solidwall);

                    if (sprite.stunned) {

                        wantJump=false;
                        sprite.stunned--;
                        if (sprite.stunned) {
                            sprite.changeAnimation(sprite.animations.stunned);
                            if (C.checkEvery(sprite.stunned,2))
                            sprite.setX(C.checkBlink(sprite.stunned,2)?sprite.x+1:sprite.x-1);
                            sprite.setVisible(true);
                            sprite.setAccelY(0);
                            sprite.setSpeedX(0);
                            sprite.setSpeedY(0);
                        } else {
                            sprite.setAccelY(C.GRAVITY*movingSpeed*movingSpeed);
                            sprite.changeAnimation(sprite.animations.still);
                        }

                    } else {

                        let
                            isNotFiring = !sprite.animation.isFire || !sprite.animationLive,
                            wantFire = playerMemory.fireHold ? game.controlIsDown(game.controls[sprite.playerId].b) : game.controlIsHit(game.controls[sprite.playerId].b);

                        if (sprite.y>224) {
                            sprite.setY(sprite.y-224);
                            sprite.warpLoop++;
                            if (sprite.warpLoop == sprite.nextWarpLoop) {
                                C.increaseCounter(game,scene,sprite.playerId,"timesWarped",0,playerMemory.canDropDown?C.PLAYERJUMPDOWNWARPINCREASE:C.PLAYERWARPINCREASE);
                                sprite.nextWarpLoop++;
                            }
                        } else if (sprite.y<-8) {
                            sprite.warpLoop--;
                            sprite.setY(232+sprite.y);
                        }
                    
                        if (game.controlIsDown(game.controls[sprite.playerId].right)) {
                            sprite.setSpeedX(C.NORMALMOVESPEED*lockedMovingSpeed);
                            if (!applyLockSide)
                                sprite.setFlipX(0);
                        } else if (game.controlIsDown(game.controls[sprite.playerId].left)) {
                            sprite.setSpeedX(-C.NORMALMOVESPEED*lockedMovingSpeed);
                            if (!applyLockSide)
                                sprite.setFlipX(1);
                        } else
                            sprite.setSpeedX(0);

                        if (isTouchingFloor) {
                            sprite.setAccelY(C.GRAVITY*movingSpeed*movingSpeed);
                            sprite.setMinSpeedY(C.MINSPEEDY*movingSpeed);
                            sprite.setMaxSpeedY(C.MAXSPEEDY);
                            sprite.coyoteTime=C.COYOTETIME;
                            if (playerMemory.canDropDown && game.controlIsHit(game.controls[sprite.playerId].a) && game.controlIsDown(game.controls[sprite.playerId].down)) {
                                wantJump=false;
                                sprite.setY(sprite.y+1);
                                sprite.coyoteTime=0;
                            }
                            if (isNotFiring) 
                                if (sprite.speedX)
                                    sprite.changeAnimation(sprite.animations.walk);
                                else
                                    sprite.changeAnimation(sprite.animations.still);
                        } else {
                            if (sprite.coyoteTime) sprite.coyoteTime--;
                            if (isNotFiring)
                                if (sprite.speedY<0)
                                    sprite.changeAnimation(sprite.animations.jump);
                                else
                                    sprite.changeAnimation(sprite.animations.fall);
                        }

                        if (isNotFiring && wantFire) {
                            let fired=false;

                            switch (playerMemory.fireMode) {
                                case 0:{
                                    // Bubbles
                                    C.fireBullet(game,scene,sprite,scene.sprites.smallBubble,playerMemory);
                                    game.playAudio(game.audio.firebubble);
                                    fired=true;
                                    break;
                                }
                                case 1:{
                                    // Fireballs
                                    let fireball = game.addNewSprite(scene.sprites.fireball,sprite.x,sprite.y);
                                    fireball.setSpeedX(sprite.flipX?-C.FIREBALLSPEED:C.FIREBALLSPEED);
                                    fireball.setFlipX(sprite.flipX);
                                    game.playAudio(game.audio.fireflame);
                                    fired=true;
                                    break;
                                }
                                case 2:{
                                    // Snowball
                                    let bullet=C.fireBullet(game,scene,sprite,scene.sprites.smallSnow,playerMemory);
                                    if (!bullet.speedY) bullet.setSpeedY(C.SMALLSNOWSPEEDY);
                                    game.playAudio(game.audio.firespecial);
                                    fired=true;
                                    break;
                                }
                                case 3:{
                                    // Diamond
                                    C.fireBullet(game,scene,sprite,scene.sprites.smallDiamond,playerMemory);
                                    game.playAudio(game.audio.firespecial);
                                    fired=true;
                                    break;
                                }
                                case 4:{
                                    // Water tank
                                    if (!sprite.backpack || sprite.backpack.removed) {
                                        sprite.backpack=C.fireSprite(game,scene,sprite,scene.sprites.waterTank,playerMemory);
                                        sprite.backpack.player=sprite;
                                    }
                                    break;
                                }
                                case 5:{
                                    // Bombs
                                    if (game.getSpritesWithTag("bomb").length<C.BOMBSMAXCOUNT) {
                                        game.playAudio(game.audio.place);
                                        C.fireSprite(game,scene,sprite,scene.sprites.bomb,playerMemory);
                                        fired=true;
                                    }
                                    break;
                                }
                                case 6:{
                                    // Vacuum
                                    if (game.controlIsDown(game.controls[sprite.playerId].down)||game.controlIsDown(game.controls[sprite.playerId].up)) {
                                        if (game.controlIsHit(game.controls[sprite.playerId].b)) {
                                            C.fireBullet(game,scene,sprite,scene.sprites.smallDiamond,playerMemory);
                                            game.playAudio(game.audio.firebubble);
                                            fired=true;
                                        }
                                    } else if (!sprite.backpack || sprite.backpack.removed) {
                                        sprite.backpack=C.fireSprite(game,scene,sprite,scene.sprites.vacuum,playerMemory);
                                        sprite.backpack.player=sprite;
                                    }
                                    break;
                                }
                                case 7:{
                                    // Shotgun
                                    if (game.controlIsDown(game.controls[sprite.playerId].down)||game.controlIsDown(game.controls[sprite.playerId].up)) {
                                        if (game.controlIsHit(game.controls[sprite.playerId].b)) {
                                            C.fireBullet(game,scene,sprite,scene.sprites.smallDiamond,playerMemory);
                                            game.playAudio(game.audio.firebubble);
                                            fired=true;
                                        }
                                    } else if (!sprite.backpack || sprite.backpack.removed) {
                                        sprite.backpack=C.fireSprite(game,scene,sprite,scene.sprites.shotgun,playerMemory);
                                        sprite.backpack.player=sprite;
                                    }
                                    break;
                                }
                            }

                            if (fired) {

                                C.playerBlowedBubble(game,scene,sprite);
                                sprite.setAnimation(sprite.animations[playerMemory.firingAnimation]);

                            }
        
                        }

                        if (playerMemory.canCutJump && (sprite.speedY<0) && sprite.canCutJump && game.controlIsReleased(game.controls[sprite.playerId].a))
                            sprite.setSpeedY(sprite.speedY/3);

                        if (sprite.x != sprite.oldX) {
                            playerMemory.distanceWalked+=Math.abs(sprite.oldX-sprite.x);
                            if (playerMemory.distanceWalked>C.LONGDISTANCE) {
                                C.increaseCounter(game,scene,sprite.playerId,"longDistanceWalked");
                                playerMemory.distanceWalked=0;
                            }
                        }

                        if (playerMemory.bonusPerMove && ((sprite.x != sprite.oldX)||(sprite.y != sprite.oldY)))
                            C.addScore(game,scene,sprite.playerId,playerMemory.bonusPerMove);

                        if (playerMemory.canSquish)
                            if ((sprite.speedY>0)&&sprite.collisions.hitable) {
                                let squishing=false;
                                for (let i=0;i<sprite.collisions.hitable.all.length;i++) {
                                    let squished=sprite.collisions.hitable.all[i].object
                                    if ((squished.y > sprite.y) && squished.state.onSquished) {
                                        squished.state.onSquished(game,scene,squished,sprite);
                                        game.addNewSprite(scene.sprites.disappear,squished.x,squished.y-8);
                                        squishing=true;
                                    }
                                }
                                if (squishing) {
                                    sprite.setSpeedY(C.SQUISHBUMP*movingSpeed);
                                    if (sprite.invulnerability<C.HALFSEC)
                                        sprite.invulnerability=C.HALFSEC;
                                }
                            }

                    }

                    if (sprite.collisions.largebubble)
                        sprite.collisions.largebubble.all.forEach(collision=>{
                            let bubble = collision.object;
                            if (!bubble.invulnerability)
                                if (wantJump && collision.bottom) {
                                    bubble.invulnerability = 5;
                                    isTouchingFloor = true;
                                } else {
                                    if (!bubble.onBubblePopped) C.increaseCounter(game,scene,sprite.playerId,"regularBubblesPopped");
                                    if (bubble.isWaterBubble) C.increaseCounter(game,scene,sprite.playerId,"waterBubblesPopped");
                                    if (bubble.isFireBubble) C.increaseCounter(game,scene,sprite.playerId,"fireBubblesPopped");
                                    if (bubble.isBoltBubble) C.increaseCounter(game,scene,sprite.playerId,"boltBubblesPopped");
                                    game.playAudio(game.audio.pop);
                                    bubble.onPop(game,scene,bubble,sprite);
                                }
                        });

                    if (wantJump) {
                        if (sprite.coyoteTime || isTouchingFloor) {
                            sprite.coyoteTime=0;
                            game.playAudio(game.audio.jump);
                            C.increaseCounter(game,scene,sprite.playerId,"jumps");
                            if (playerMemory.bonusPerJump) C.addScore(game,scene,sprite.playerId,playerMemory.bonusPerJump);
                            sprite.setSpeedY(C.JUMPSPEED*movingSpeed);
                            sprite.canCutJump=true;
                        }
                    }

                    if (sprite.collisions.bonus)
                        sprite.collisions.bonus.all.forEach(bonus=>{
                            let data = bonus.object.bonusData;
                            
                            if (bonus.object.points) {
                                if (bonus.object.isFake || !playerMemory.isReal)
                                    C.addPopupText(game,scene,C.LABELS.points[bonus.object.points][0],bonus.object);
                                else {
                                    C.addPopupText(game,scene,C.LABELS.points[bonus.object.points][sprite.playerId],bonus.object);
                                    C.addScore(game,scene,sprite.playerId,bonus.object.points);
                                }
                            }
                            if (data.setSmallBubbleDistance)
                                playerMemory.smallBubbleDistance=data.setSmallBubbleDistance;

                            if (data.setSmallBubbleSpeed)
                                playerMemory.smallBubbleSpeed=data.setSmallBubbleSpeed;

                            if (data.setFiringAnimation)
                                playerMemory.firingAnimation=data.setFiringAnimation;

                            if (data.setMoveFast)
                                playerMemory.moveFast=data.setMoveFast;

                            if (data.setBonusPerBlow)
                                playerMemory.bonusPerBlow=data.setBonusPerBlow;

                            if (data.setBonusPerJump)
                                playerMemory.bonusPerJump=data.setBonusPerJump;

                            if (data.setBonusPerMove)
                                playerMemory.bonusPerMove=data.setBonusPerMove;
                                
                            if (data.setFireMode) {
                                C.removeBackpack(game,scene,sprite);
                                playerMemory.fireMode=data.setFireMode;
                            }

                            if (data.setBulletsCount !== undefined)
                                playerMemory.bulletsCount=data.setBulletsCount;

                            if (data.floodStage)
                                C.MEMORY.floodStage=1;

                            if (data.boltStage) {
                                game.playAudio(game.audio.explosion);
                                game.addNewSprite(scene.sprites.giantBolt,C.SCREENWIDTH,0);  
                                for (let i=0;i<3;i++) {
                                    game.addNewSprite(scene.sprites.giantBolt,C.SCREENWIDTH-(i*48),0);    
                                    game.addNewSprite(scene.sprites.giantBolt,C.SCREENWIDTH,i*48);    
                                }
                            }
                                
                            if (data.explodeStage) {
                                C.MEMORY.explodeStage=1;
                                C.MEMORY.explodeColor=game.palette[data.explodeColor];
                                C.MEMORY.explodeBonusFree=data.explodeBonusFree;
                                C.MEMORY.explodeBonusCaged=data.explodeBonusCaged;
                            }

                            if (data.setBubbleType)
                                playerMemory.bubbleType=data.setBubbleType;

                            if (data.setDefaultBubbleType)
                                playerMemory.defaultBubbleType=data.setDefaultBubbleType;

                            if (data.setDefaultFireHold !== undefined) {
                                playerMemory.defaultFireHold=data.setDefaultFireHold;
                                playerMemory.fireHold=data.setDefaultFireHold;
                            }

                            if (data.setFireHold !== undefined)
                                playerMemory.fireHold=data.setFireHold;

                            if (data.setDefaultLockSide !== undefined) {
                                playerMemory.defaultLockSide=data.setDefaultLockSide;
                                playerMemory.lockSide=data.setDefaultLockSide;
                            }

                            if (data.setLockSide !== undefined)
                                playerMemory.lockSide=data.setLockSide;

                            if (data.setDefaultFireMode !== undefined) {
                                if (playerMemory.fireMode == playerMemory.defaultFireMode) {
                                    C.removeBackpack(game,scene,sprite);
                                    playerMemory.fireMode=data.setDefaultFireMode;
                                }
                                playerMemory.defaultFireMode=data.setDefaultFireMode;
                            }

                            if (data.setDefaultCanSquish !== undefined) {
                                playerMemory.canSquish=data.setDefaultCanSquish;
                                playerMemory.defaultCanSquish=data.setDefaultCanSquish;
                            }

                            if (data.setCanDropDown !== undefined)
                                playerMemory.canDropDown=data.setCanDropDown;

                            if (data.setDefaultCanDropDown !== undefined) {
                                playerMemory.canDropDown=data.setDefaultCanDropDown;
                                playerMemory.defaultCanDropDown=data.setDefaultCanDropDown;
                            }
                                
                            if (data.setDefaultCanCutJump !== undefined) {
                                playerMemory.canCutJump=data.setDefaultCanCutJump;
                                playerMemory.defaultCanCutJump=data.setDefaultCanCutJump;
                            }

                            if (data.addScheduledLetterBubbles)
                                C.addScheduledLetterBubbles(game,scene,data.addScheduledLetterBubbles);

                            if (data.spawnStars)
                                for (let i=0;i<data.spawnStars;i++) {
                                    game.addNewSprite(scene.sprites.star,C.SCREENWIDTH-(i*48),0);    
                                    game.addNewSprite(scene.sprites.star,C.SCREENWIDTH,i*48);  
                                }  

                            if (data.freezeEnemiesFor)
                                C.MEMORY.freezeEnemies = data.freezeEnemiesFor;

                            if (data.setEndBubblesSpawn) {
                                C.MEMORY.endBubblesSpawn = data.setEndBubblesSpawn;
                                C.MEMORY.endBubblesSpawnPoints = data.setEndBubblesSpawnPoints;
                            }

                            if (data.bonusStage) {
                                C.MEMORY.bonusStage = 1;
                                C.MEMORY.bonusStageBonus = data.bonusStage;
                            }

                            if (data.setEndSpawnGiantBonus)
                                C.MEMORY.endSpawnGiantBonus = data.setEndSpawnGiantBonus;

                            if (data.spawnBalls)
                                for (let i=0;i<data.spawnBalls;i++) {
                                    let ball=game.addNewSprite(scene.sprites.ball,sprite.x,sprite.y);
                                    ball.wait=1+i*C.BALLDELAY;
                                    ball.xspeed=C.RND.randomBool(0.5)?-C.BALLSPEED:C.BALLSPEED;
                                    ball.yspeed=C.RND.randomBool(0.5)?-C.BALLSPEED:C.BALLSPEED;
                                }

                            if (data.gotoSecretsRoom)
                                C.MEMORY.secretsRoom=1;

                            if (data.allPlayersPoints) {
                                game.getSpritesWithTag("player").forEach(player=>{
                                    C.addPopupText(game,scene,C.LABELS.points[data.allPlayersPoints][player.playerId],player);
                                    C.addScore(game,scene,player.playerId,data.allPlayersPoints);
                                })
                            }

                            if (data.deadlyFor)
                                sprite.deadly = data.deadlyFor;

                            if (data.increaseCounters)
                                data.increaseCounters.forEach(counter=>{
                                    C.increaseCounter(game,scene,sprite.playerId,counter);
                                })

                            if (data.increaseGlobalCounters)
                                data.increaseGlobalCounters.forEach(counter=>{
                                    C.increaseGlobalCounter(game,scene,counter);
                                })

                            if (data.skipStages)
                                C.setSkipStages(game,scene,data.skipStages);

                            if (data.playAudio)
                                game.playAudio(data.playAudio);

                            if (data.playMinigame) {
                                C.MEMORY.playMinigame=C.RND.randomElement(data.playMinigame);
                                C.MEMORY.showMinigame=1;
                            }

                            if (data.setPlayerSkin) {
                                playerMemory.skin=data.setPlayerSkin;
                                sprite.animations=C.PLAYERSKINS[data.setPlayerSkin];
                                sprite.setAnimation(sprite.animations.fall);
                                game.playAudio(game.audio.pop);
                            }

                            if (data.setDarkness) {
                                C.MEMORY.darkness=true;
                                game.playAudio(game.audio.clear);
                            }

                            if (data.setHauntedMode)
                                C.MEMORY.hauntedMode=true;

                            if (data.setEndingSet)
                                C.MEMORY.endingSet=data.setEndingSet;

                            if (bonus.object.isCagedEnemy)
                                C.increaseCounter(game,scene,sprite.playerId,"bonusFromCagedEnemy")

                            bonus.object.remove();
                        });

                    
                    if (sprite.deadly) {
                        sprite.deadly--;
                        if ((sprite.deadly>C.ONESEC) && C.checkEvery(sprite.deadly,5))
                            game.addNewSprite(scene.sprites.sparkle,sprite.x+C.RND.randomInteger(8),sprite.y+C.RND.randomInteger(8));
                        C.bulletLogic(game,scene,sprite,0,"diamond6k");
                    } else if (sprite.invulnerability) {
                        sprite.invulnerability--;
                        if (sprite.invulnerability<C.HALFSEC)
                            sprite.setVisible(true);
                        else
                            sprite.setVisible(C.checkBlink(sprite.invulnerability,2));
                    } else {
                        sprite.setVisible(true);
                        if (sprite.collisions.killplayer) {
                            sprite.collisions.killplayer.all.forEach(killer=>{
                                if (!killer.object.squished && !killer.object.state.isKilling && killer.object.states.kill)
                                    killer.object.setState(killer.object.states.kill);
                            })
                            sprite.setState(sprite.states.dead);
                        }
                    }

                    if (playerMemory.comboTimer) {
                        playerMemory.comboTimer--;
                        if (!playerMemory.comboTimer) {
                            C.evaluatePlayerCombo(game,scene,playerMemory.comboCount,1);
                            C.resetPlayerCombo(game,scene,sprite.playerId);
                        }
                    }

                    if (sprite.backpack) {
                        if (sprite.backpack.properties.backpackFlipX)
                            sprite.backpack.setFlipX(sprite.flipX);
                        if (sprite.flipX) {
                            sprite.backpack.setX(sprite.x+sprite.backpack.properties.backpack[1].dx);
                            sprite.backpack.setY(sprite.y+sprite.backpack.properties.backpack[1].dy);
                        } else {
                            sprite.backpack.setX(sprite.x+sprite.backpack.properties.backpack[0].dx);
                            sprite.backpack.setY(sprite.y+sprite.backpack.properties.backpack[0].dy);
                        }
                    }

                    sprite.oldX=sprite.x;
                    sprite.oldY=sprite.y;

                }
            },
            dead:{
                onEnter:(game,scene,sprite)=>{
                    sprite.spinTimer=0;
                    sprite.timer=C.HALFSEC;
                    sprite.changeAnimation(sprite.animations.dead);
                    sprite.setSpeedX(0);
                    sprite.setSpeedY(0);
                    sprite.setMinSpeedY(C.MINSPEEDY);
                    sprite.setMaxSpeedY();
                    sprite.setAccelY(0);
                    C.removeBackpack(game,scene,sprite);
                    game.playAudio(game.audio.hit);
                    C.killedPlayer(game,scene,sprite.playerId);
                    C.increaseCounter(game,scene,sprite.playerId,"livesLost");
                },
                onLogic:(game,scene,sprite)=>{
                    if (sprite.timer) {
                        sprite.timer--;
                        if (sprite.timer) {
                            if (C.checkEvery(sprite.timer,2))
                                if (C.checkBlink(sprite.timer,2))
                                    sprite.setX(sprite.x+1);
                                else
                                    sprite.setX(sprite.x-1);
                        } else {
                            game.playAudio(game.audio.loselife);
                            sprite.setSpeedY(C.JUMPSPEED);
                            sprite.setAccelY(C.GRAVITY*2);
                        }
                    } else {
                        sprite.spinTimer++;
                        if (C.checkEvery(sprite.spinTimer,2))
                            sprite.setAngle(sprite.angle-90);
                        if (sprite.y > C.SCREENHEIGHT) {
                            C.MEMORY.players[sprite.playerId].isDead=true;
                            sprite.remove();
                        }
                    }                    
                }
            },
            preparing:{
                onEnter:(game,scene,sprite)=>{
                    sprite.setY(C.SCREENHEIGHT);
                    sprite.setSpeedY(C.JUMPSPEED);
                    sprite.setAnimation(sprite.animations.jump);
                },
                onLogic:(game,scene,sprite)=>{
                    if (sprite.speedY>0)
                        if (sprite.y>=C.FLOORY) {
                            sprite.setY(C.FLOORY);
                            sprite.changeAnimation(sprite.animations.still);
                        } else
                            sprite.changeAnimation(sprite.animations.fall);
                }
            },
            leave:{
                onEnter:(game,scene,sprite)=>{
                    game.playAudio(game.audio.clear);
                    sprite.setMinSpeedY(C.MINSPEEDY);
                    sprite.setMaxSpeedY();
                    sprite.setSpeedX(0);
                    sprite.setSpeedY(C.JUMPSPEED*2);
                    sprite.setAccelY(C.GRAVITY*2);
                    sprite.setAnimation(sprite.animations.jump);
                    C.removeBackpack(game,scene,sprite);
                },
                onLogic:(game,scene,sprite)=>{
                    if (sprite.speedY>0)
                        if (sprite.y>=C.SCREENHEIGHT)
                            sprite.remove();
                        else
                            sprite.changeAnimation(sprite.animations.fall);
                }
            }
        }
    }
}
