function gameLoadPlayerBullets(game,scene,C) {
    scene.sprites.fireball={
        tags:["stagesprite","bright"],
        hitboxX:2,
        hitboxY:2,
        hitboxWidth:12,
        hitboxHeight:12,
        zIndex:C.BUBBLESZINDEX,
        animations:{
            default:{
                loop:true,
                cells:game.cells.fireball,
                speed:1
            }
        },
        properties:{
            brightnessX:8,
            brightnessY:8,
            brightness:16
        },
        states:{
            default:{
                collisions:C.FIREBALLCOLLISIONS,
                onLogic:(game,scene,sprite)=>{
                    if (sprite.collisions.solidwall || C.bulletLogic(game,scene,sprite,game.audio.burn,"diamond9k")) {
                        game.addNewSprite(scene.sprites.disappear,sprite.x,sprite.y);
                        sprite.remove();
                    }
                }
            }
        }
    };

    scene.sprites.bolt={
        tags:["stagesprite","bright"],
        zIndex:C.SPECIALZINDEX,
        animations:{
            default:{
                loop:true,
                cells:game.cells.bolt,
                speed:0.3
            }
        },
        properties:{
            brightnessX:8,
            brightnessY:8,
            brightness:16
        },
        states:{
            default:{
                collisions:C.BULLETCOLLISIONS,
                onLogic:(game,scene,sprite)=>{
                    if (sprite.wait) {
                        sprite.wait--;
                        if (!sprite.wait)
                            sprite.setSpeedX(sprite.speed);
                    } else if ((sprite.x>C.SCREENWIDTH)||(sprite.x<-16)) {
                        sprite.remove();
                    } else C.bulletLogic(game,scene,sprite,game.audio.bolt,"diamond8k",sprite.by,"boltedEnemies");
                }
            }
        }
    };

    scene.sprites.ball={
        tags:["stagesprite","bright"],
        zIndex:C.SPECIALZINDEX,
        animations:{
            default:{
                loop:true,
                cells:game.cells.ball,
                speed:0.6
            }
        },
        properties:{
            brightnessX:8,
            brightnessY:8,
            brightness:16
        },
        states:{
            default:{
                collisions:C.BALLCOLLISIONS,
                onEnter:(game,scene,sprite)=>{
                    sprite.timer=C.BALLTIMER;
                },
                onLogic:(game,scene,sprite)=>{
                    C.applyVerticalWarp(sprite);
                    if (sprite.wait) {
                        sprite.wait--;
                        if (!sprite.wait) {
                            sprite.setSpeedX(sprite.xspeed);
                            sprite.setSpeedY(sprite.yspeed);
                        }
                    } else if (sprite.timer) {
                        C.bulletLogic(game,scene,sprite,game.audio.bolt,"diamond6k",sprite.by,"balledEnemies");
                        sprite.timer--;
                    } else {
                        game.addNewSprite(scene.sprites.disappear,sprite.x,sprite.y);
                        sprite.remove();
                    }
                }
            }
        }
    };

    scene.sprites.fire={
        tags:["stagesprite","bright"],
        zIndex:C.SPECIALZINDEX,
        speedY:C.FIRESPEED,
        animations:{
            default:{
                loop:true,
                cells:game.cells.fire,
                speed:0.3
            }
        },
        properties:{
            brightnessX:4,
            brightnessY:4,
            brightness:8
        },
        states:{
            default:{
                collisions:C.FIRECOLLISIONS,
                onEnter:(game,scene,sprite)=>{
                    sprite.timer=C.FIRETIMER;
                },
                onLogic:(game,scene,sprite)=>{
                    if (sprite.spread && sprite.collisions.wall) {
                        sprite.spread=false;
                        let times=C.MEMORY.cheats.classicMode?2:4;
                        for (let i=0;i<times;i++) {
                            let fire=game.addNewSprite(scene.sprites.fire,sprite.x,sprite.y);
                            fire.spreadtimer=8*(1+Math.floor(i/2));
                            fire.setSpeedX(C.checkEvery(i,2)?-1:1);
                            fire.timer=sprite.timer;
                        }
                    }
                    if (sprite.spreadtimer) {
                        sprite.spreadtimer--;
                        if (!sprite.spreadtimer) {
                            sprite.setSpeedX(0);
                        }
                    }
                    if (sprite.y>C.SCREENHEIGHT)
                        sprite.remove();
                    else if (sprite.timer) {
                        sprite.timer--;
                        C.bulletLogic(game,scene,sprite,game.audio.burn,"diamond9k",sprite.by,"burnedEnemies");
                    } else sprite.remove();
                }
            }
        }
    };

    scene.sprites.waterWave={
        tags:["stagesprite"],
        zIndex:C.SPECIALZINDEX,
        animations:{
            default:{
                loop:true,
                cells:game.cells.waterWave,
                speed:0.3
            }
        },
        states:{
            default:{
                collisions:C.BULLETCOLLISIONS,
                onLogic:(game,scene,sprite)=>{
                    if (sprite.wait) {
                        sprite.wait--;
                        if (!sprite.wait)
                            sprite.setSpeedY(C.WATERWAVESPEED);
                    } else if (sprite.y>C.SCREENHEIGHT)
                        sprite.remove();
                    else
                        C.bulletLogic(game,scene,sprite,game.audio.wash,"diamond7k",sprite.by,"drownedEnemies");
                }
            }
        }
    };

    scene.sprites.poison={
        tags:["stagesprite"],
        zIndex:C.SPECIALZINDEX,
        animations:{
            default:{
                cells:game.cells.poison,
                speed:0.1
            }
        },
        states:{
            default:{
                collisions:C.EVILBULLETCOLLISION,
                onLogic:(game,scene,sprite)=>{
                    if (!sprite.animationLive) sprite.remove();
                    else if (sprite.collisions.player) {
                        sprite.collisions.player.all.forEach(collision=>{
                            if (collision.object.state.onPoisoned)
                                collision.object.state.onPoisoned(game,scene,collision.object);
                        });
                    }
                }
            }
        }
    };

    scene.sprites.tornado={
        tags:["stagesprite"],
        zIndex:C.SPECIALZINDEX,
        animations:{
            default:{
                loop:true,
                cells:game.cells.tornado,
                speed:0.5
            }
        },
        states:{
            default:{
                collisions:C.BULLETCOLLISIONS,
                onEnter:(game,scene,sprite)=>{
                    sprite.timer=0;
                },
                onLogic:(game,scene,sprite)=>{
                    if (sprite.wait) {
                        sprite.wait--;
                        if (!sprite.wait)
                            sprite.setAccelY(C.TORNADOACCEL);
                    } else if (sprite.y<0)
                        sprite.remove();
                    else {
                        sprite.timer++;
                        sprite.setSpeedX(Math.sin(sprite.timer/5)*(sprite.timer/30));
                        C.bulletLogic(game,scene,sprite,game.audio.wash,"diamond7k",sprite.by,"tornadoEnemies");
                    }
                }
            }
        }
    };

    scene.sprites.spinStar={
        tags:["stagesprite","bright"],
        zIndex:C.SPECIALZINDEX,
        animations:{
            default:{
                cells:game.cells.spinStar
            }
        },
        properties:{
            brightnessX:8,
            brightnessY:8,
            brightness:16
        },
        states:{
            default:{
                collisions:C.BULLETCOLLISIONS,
                onEnter:(game,scene,sprite)=>{
                    sprite.timer=0;
                },
                onLogic:(game,scene,sprite)=>{
                    if (sprite.wait) {
                        sprite.wait--;
                    } else if (sprite.timer>C.HALFSEC)
                        sprite.remove();
                    else {
                        sprite.timer++;
                        sprite.setSpeedX(Math.sin(sprite.angledelta+(sprite.timer/10))*(sprite.timer/8));
                        sprite.setSpeedY(Math.cos(sprite.angledelta+(sprite.timer/10))*(sprite.timer/8));
                        C.bulletLogic(game,scene,sprite,game.audio.wash,"diamond6k",sprite.by,"spinStarredEnemies");
                    }
                }
            }
        }
    };

    scene.sprites.star={
        tags:["stagesprite","bright"],
        zIndex:C.SPECIALZINDEX,
        speedX:-3,
        speedY:3,
        animations:{
            default:{
                cells:game.cells.star
            }
        },
        properties:{
            brightnessX:8,
            brightnessY:8,
            brightness:16
        },
        states:{
            default:{
                collisions:C.BULLETCOLLISIONS,
                onLogic:(game,scene,sprite)=>{
                    sprite.setAngle(sprite.angle-10);
                    if (sprite.y>C.SCREENHEIGHT)
                        sprite.remove();
                    else
                        C.bulletLogic(game,scene,sprite,game.audio.bolt,"diamond6k");
                }
            }
        }
    };

    scene.sprites.giantBolt={
        tags:["stagesprite"],
        zIndex:C.BACKGROUNDZINDEX,
        speedX:-3,
        speedY:3,
        animations:{
            default:{
                cells:game.cells.giantBolt
            }
        },
        states:{
            default:{
                collisions:C.BULLETCOLLISIONS,
                onLogic:(game,scene,sprite)=>{
                    C.bulletLogic(game,scene,sprite,game.audio.bolt,"diamond8k");
                    if (sprite.y>C.SCREENHEIGHT)
                        sprite.remove();
                }
            }
        }
    };

}