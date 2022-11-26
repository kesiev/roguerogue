function gameLoadVacuum(game,scene,C) {

    scene.sprites.vacuum={
        tags:["stagesprite"],
        zIndex:C.PLAYERTOOLZINDEX,
        properties:{
            backpackFlipX:true,
            backpack:[
                { dx:-6, dy:-2 },
                { dx:-9, dy:-2 }
            ]
        },
        animations:{
            default:{
                cells:game.cells.vacuum
            }
        },
        states:{
            default:{
                removeBackpack:(game,scene,sprite)=>{
                    if (sprite.inhale) sprite.inhale.remove();
                    sprite.enemies.forEach(enemy=>{
                        enemy.mode=1;
                        C.enemyRestore(game,scene,enemy);
                    });
                    sprite.enemies=[];
                    sprite.remove();
                },
                onEnter:(game,scene,sprite)=>{
                    sprite.enemies=[];
                    sprite.vacuumtimer=C.VACUUMTIMER;
                    game.playAudio(game.audio.tick1);
                },
                addSuckedEnemy:(game,scene,sprite,enemy)=>{
                    if (sprite.vacuumtimer>C.VACUUMTIMERALARMLIMIT) {
                        if (enemy.mode)
                            sprite.vacuumtimer-=C.VACUUMTIMERANGRYENEMY;
                        else
                            sprite.vacuumtimer-=C.VACUUMTIMERNORMALENEMY;
                        if (sprite.vacuumtimer<C.VACUUMTIMERALARMLIMIT) sprite.vacuumtimer=C.VACUUMTIMERALARMLIMIT;
                    }
                    sprite.enemies.push(enemy);
                },
                onLogic:(game,scene,sprite)=>{
                    if (game.controlIsDown(game.controls[sprite.player.playerId].b)) {
                        if (!sprite.inhale) {
                            sprite.inhale=game.addNewSprite(scene.sprites.vacuumInhale)
                            sprite.inhale.player=sprite.player;
                        }
                        sprite.inhale.setFlipX(sprite.flipX);
                        sprite.inhale.setY(sprite.y+4);
                        if (sprite.flipX) {
                            sprite.inhale.setX(sprite.x-13);
                            sprite.inhale.setHitboxX(0);
                            sprite.inhale.setHitboxWidth(24);
                        } else {
                            sprite.inhale.setX(sprite.x+29);
                            sprite.inhale.setHitboxX(-8);
                            sprite.inhale.setHitboxWidth(24);
                        }
                        sprite.vacuumtimer--;
                        if (sprite.vacuumtimer>0) {    
                            if ((sprite.vacuumtimer<=C.VACUUMTIMERALARM)&&(sprite.vacuumtimer%C.HALFSEC==0))
                                game.playAudio(game.audio.vacuumalarm);
                        } else {
                            sprite.state.removeBackpack(game,scene,sprite);
                            let explosion=game.addNewSprite(scene.sprites.whiteExplosion,sprite.x+(sprite.flipX?16:0),sprite.y);
                            explosion.setSpeedY(-2);
                            sprite.player.setState(sprite.player.states.dead);
                            game.playAudio(game.audio.explosion);
                        }
                    } else if (game.controlIsUp(game.controls[sprite.player.playerId].b)) {
                        let
                            combo=0,
                            playaudio=false;
                        sprite.enemies.forEach(enemy=>{
                            playaudio=true;
                            enemy.setState(enemy.states.rolling);
                            if (sprite.flipX) {
                                enemy.setFlipX(true);
                                enemy.setSpeedX(-C.SNOWBALLSPEED);
                            } else {
                                enemy.setFlipX(false);
                                enemy.setSpeedX(C.SNOWBALLSPEED);
                            }
                            enemy.rollcombo=combo;
                            combo++;
                        });
                        if (playaudio)
                            game.playAudio(game.audio.pushsnow);
                        sprite.enemies=[];
                        sprite.state.removeBackpack(game,scene,sprite);
                    }
                    sprite.setFrame(sprite.vacuumtimer<C.VACUUMTIMERALARM?C.checkBlink(sprite.vacuumtimer,2)?1:2:sprite.enemies.length?1:0);
                }
            }
        }
    };

    scene.sprites.vacuumInhale={
        tags:["stagesprite"],
        zIndex:C.PLAYERTOOLZINDEX,
        animations:{
            default:{
                loop:true,
                cells:game.cells.inhale,
                speed:0.4
            }
        },
        states:{
            default:{
                collisions:C.BULLETCOLLISIONS,
                onEnter:(game,scene,sprite)=>{
                },
                onLogic:(game,scene,sprite)=>{
                    C.manageHitableEvent(game,scene,sprite,"onSucked");
                }
            }
        }
    };


}
