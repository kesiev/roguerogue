function gameLoadShotgun(game,scene,C) {

    scene.sprites.shotgun={
        tags:["stagesprite"],
        zIndex:C.PLAYERTOOLZINDEX,
        properties:{
            backpackFlipX:true,
            backpack:[
                { dx:-6, dy:0 },
                { dx:-10, dy:0 }
            ]
        },
        animations:{
            default:{
                cells:game.cells.shotgun
            }
        },
        states:{
            default:{
                removeBackpack:(game,scene,sprite)=>{
                    sprite.remove();
                    sprite.sumspeedx=0;
                },
                fire:(game,scene,sprite)=>{
                    sprite.ammo--;
                    let bullet=game.addNewSprite(scene.sprites.shotgunBullet,sprite.player.x+4,sprite.player.y+4);
                    bullet.setFlipX(sprite.flipX);
                    bullet.setSpeedX(sprite.flipX?-C.SHOTGUNBULLETSPEED:C.SHOTGUNBULLETSPEED);
                    if (sprite.criticalshottimer) {
                        bullet.iscritical=true;
                        bullet.setFrame(1);
                    }
                    sprite.player.setSpeedY(-1);
                    sprite.sumspeedx=sprite.flipX?2:-2;
                    let explosion=game.addNewSprite(scene.sprites.whiteExplosion,sprite.player.x+(sprite.flipX?-12:12),sprite.player.y);
                    explosion.setSpeedY(-2);
                    let ammo=game.addNewSprite(scene.sprites.shotgunAmmo,sprite.player.x+5,sprite.player.y+5);
                    ammo.setSpeedY(-1.5-C.RND.randomFloat());
                    ammo.setSpeedX(0.5-1*C.RND.randomFloat());
                    ammo.spinspeed=(4-8*C.RND.randomFloat())*4;
                    if (sprite.ammo) {
                        sprite.criticalshottimer=C.HALFSEC;
                        sprite.reloadtime=sprite.reloadmaxtime=C.HALFSEC;
                    } else
                        sprite.reloadtime=sprite.reloadmaxtime=C.ONESEC;
                    game.playAudio(game.audio.shotgunfire);
                },
                onEnter:(game,scene,sprite)=>{
                    sprite.ammo=2;
                    sprite.criticalshottimer=0;
                },
                onLogic:(game,scene,sprite)=>{
                    let wantfire=game.controlIsUp(game.controls[sprite.player.playerId].down) &&
                        game.controlIsUp(game.controls[sprite.player.playerId].up) &&
                        game.controlIsHit(game.controls[sprite.player.playerId].b);
                    if (sprite.reloadtime) {
                        sprite.reloadtime--;
                        if (!sprite.reloadtime) {
                            game.playAudio(game.audio.shotgunreload);
                            if (!sprite.ammo)
                                sprite.state.removeBackpack(game,scene,sprite);
                        } else if (C.checkBlink(sprite.reloadtime,10))
                            sprite.setX(sprite.x-1);
                        if (wantfire) {
                            game.playAudio(game.audio.shotgunempty);
                            sprite.reloadtime+=C.HALFSEC;
                            if (sprite.reloadtime>sprite.reloadmaxtime)
                                sprite.reloadtime=sprite.reloadmaxtime;
                        }
                    } else {
                        if (sprite.criticalshottimer)
                            sprite.criticalshottimer--;
                        if (wantfire)
                            sprite.state.fire(game,scene,sprite);
                    }
                    if (sprite.sumspeedx) {
                        sprite.player.setSpeedX(sprite.player.speedX+sprite.sumspeedx);
                        sprite.sumspeedx*=0.9;
                        if (Math.abs(sprite.sumspeedx)<0.1)
                            sprite.sumspeedx=0;
                    }
                },
                onDraw:(game,scene,sprite)=>{
                    if (sprite.reloadtime) {
                        game.fillRect(game.palette[1], sprite.player.x, sprite.player.y-5, 16, 4);
                        game.fillRect(game.palette[3], sprite.player.x+1, sprite.player.y-4, 14, 2);
                        game.fillRect(game.palette[5], sprite.player.x+1, sprite.player.y-4, 14*(sprite.reloadtime/sprite.reloadmaxtime), 2);
                    } else if (sprite.criticalshottimer)
                        game.fillRect(C.checkBlink(sprite.criticalshottimer,2)?game.palette[2]:game.palette[5], sprite.player.x, sprite.player.y-5, 16, 4);
                }
            }
        }
    };

    scene.sprites.shotgunBullet={
        tags:["stagesprite"],
        zIndex:C.SPECIALZINDEX,
        animations:{
            default:{
                cells:game.cells.shotgunBullet
            }
        },
        states:{
            default:{
                collisions:C.SHOTGUNBULLETCOLLISIONS,
                onEnter:(game,scene,sprite)=>{
                    sprite.timer=C.SHOTGUNBULLETTIMER;
                },
                onLogic:(game,scene,sprite)=>{
                    let remove=false;
                    sprite.timer--;
                    if (sprite.iscritical) {
                        let trail=game.addNewSprite(scene.sprites.shotgunBulletTrail,sprite.x,sprite.y);
                        trail.setSpeedY(C.RND.randomFloat()*-0.5);
                    }
                    if (!sprite.speedX || sprite.collisions.wall || sprite.collisions.solidwall || !sprite.timer)
                        remove=true;
                    else
                        remove=C.manageHitableEvent(game,scene,sprite,"onGunned");
                    if (remove) {
                        game.addNewSprite(scene.sprites.disappear,sprite.x-4,sprite.y-4);
                        sprite.remove();
                    }
                }
            }
        }
    };

    scene.sprites.shotgunBulletTrail={
        tags:["stagesprite"],
        zIndex:C.SPECIALZINDEX,
        animations:{
            default:{
                cells:game.cells.shotgunBulletTrail
            }
        },
        states:{
            default:{
                onEnter:(game,scene,sprite)=>{
                    sprite.timer=C.QUARTERSEC;
                },
                onLogic:(game,scene,sprite)=>{
                    sprite.timer--;
                    if (!sprite.timer)
                        sprite.remove();
                }
            }
        }
    };

    scene.sprites.shotgunAmmo={
        tags:["stagesprite"],
        zIndex:C.SPECIALZINDEX,
        accelY:C.GRAVITY,
        zIndex:C.PLAYERTOOLZINDEX,
        animations:{
            default:{
                cells:game.cells.shotgunAmmo
            }
        },
        states:{
            default:{
                onLogic:(game,scene,sprite)=>{
                    sprite.setAngle(sprite.angle+sprite.spinspeed);
                    if (sprite.y>C.SCREENHEIGHT)
                        sprite.remove();
                }
            }
        }
    };

}
