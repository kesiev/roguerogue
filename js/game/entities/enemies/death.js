function gameLoadDeath(game,scene,C) {
    scene.sprites.death={
        tags:["killplayer","death","stagesprite","bright"],
        hitboxX:2, hitboxY:2,
        hitboxWidth:12, hitboxHeight:12,
        zIndex:C.ENEMYZINDEX,
        y:24,
        animations:{
            default:{
                cells:game.cells.death,
                loop:true,
                speed:0.1
            }
        },
        properties:{
            brightnessX:8,
            brightnessY:8,
            brightness:16
        },
        events:{
            onReset:(game,scene,sprite)=>{
                game.addNewSprite(scene.sprites.disappear,sprite.x,sprite.y);
                sprite.remove();
            }
        },
        states:{
            default:{
                onEnter:(game,scene,sprite)=>{
                    sprite.timer=-C.DEATHAPPEARTIMER;
                    sprite.direction=true;
                    sprite.speed=C.DEATHSPEED;
                },
                onLogic:(game,scene,sprite)=>{
                    if (sprite.timer<=C.DEATHWAIT) sprite.timer++;
                    if (sprite.timer == C.DEATHWAIT) {
                        sprite.timer++;
                        sprite.dest=0;
                        sprite.reached=false;
                        game.getSpritesWithTag("player").forEach(player=>{
                            if (player.playerId == sprite.follow) {
                                if (sprite.direction)
                                    sprite.dest=player.x;
                                else
                                    sprite.dest=player.y;
                                sprite.setFlipX(player.x<sprite.x);
                            }
                        })
                    } else if (sprite.timer > C.DEATHWAIT) {
                        if (sprite.direction) {
                            if (Math.abs(sprite.x-sprite.dest)<sprite.speed) {
                                sprite.x=sprite.dest;
                                sprite.dest=0;
                                sprite.timer=0;
                                sprite.direction=!sprite.direction;
                                sprite.speed+=C.DEATHSPEEDINCREASE;
                            }  else
                                sprite.setX(sprite.x+(sprite.x>sprite.dest?-sprite.speed:sprite.speed));
                        } else {
                            if (Math.abs(sprite.y-sprite.dest)<sprite.speed) {
                                sprite.y=sprite.dest;
                                sprite.dest=0;
                                sprite.timer=0;
                                sprite.direction=!sprite.direction;
                                sprite.speed+=C.DEATHSPEEDINCREASE;
                            }  else
                                sprite.setY(sprite.y+(sprite.y>sprite.dest?-sprite.speed:sprite.speed));
                        }
                    }
                }
            }
        }
    }

    scene.sprites.hauntingDeath={
        tags:["killplayer","death","stagesprite","bright"],
        hitboxX:2, hitboxY:2,
        hitboxWidth:12, hitboxHeight:12,
        zIndex:C.ENEMYZINDEX,
        x:120, y:0,
        animations:{
            default:{
                cells:game.cells.death,
                loop:true,
                speed:0.1
            }
        },
        properties:{
            brightnessX:8,
            brightnessY:8,
            brightness:16
        },
        events:{
            onReset:(game,scene,sprite)=>{
                if (C.MEMORY.stageEnded) {
                    game.addNewSprite(scene.sprites.disappear,sprite.x,sprite.y);
                    sprite.remove();
                    C.setSanityIntensity(game,scene,1);
                } else {
                    sprite.visibility=C.ONESEC*3;
                    sprite.movespeed=C.HAUNTINGDEATHSPEED;
                    sprite.timer=C.HAUNTINGDEATHSPEEDTIMER;
                }   
            }
        },
        states:{
            default:{
                onEnter:(game,scene,sprite)=>{
                    sprite.visibility=0;
                    sprite.movespeed=C.HAUNTINGDEATHSPEED;
                    sprite.timer=C.HAUNTINGDEATHSPEEDTIMER;
                },
                onLogic:(game,scene,sprite)=>{
                    if (sprite.visibility)
                        sprite.visibility--;
                    if (sprite.timer)
                        sprite.timer--;
                    else {
                        sprite.timer=C.HAUNTINGDEATHSPEEDTIMER;
                        sprite.movespeed+=C.HAUNTINGDEATHSPEEDINCREASE;
                    }
                    let
                        nearest=0,
                        distance=0;
                    game.getSpritesWithTag("player").forEach(player=>{
                        let d=game.calcDistance(sprite.x,sprite.y,player.x,player.y);;
                        if (!nearest || (d<distance)) {
                            nearest=player;
                            distance=d;
                        }
                    })
                    if (nearest) {
                        let angle=game.calcAngle(sprite.x,sprite.y,nearest.x,nearest.y);
                        game.applyAngleSpeed(sprite,angle,sprite.movespeed);
                        sprite.setFlipX(nearest.x<sprite.x);
                        
                        if (!distance) {
                            C.setSanityIntensity(game,scene,0);
                        } else if (distance<80) {
                            C.setSanityIntensity(game,scene,distance/80);
                        }

                        if (sprite.visibility) {
                            sprite.setVisible(true);
                            sprite.properties.brightness=16;
                        } else if (distance<80) {
                            sprite.setVisible(false);
                            sprite.properties.brightness=0;
                        } else {
                            sprite.setVisible(true);
                            sprite.properties.brightness=distance/10;
                        }
                    } else {
                        C.setSanityIntensity(game,scene,1);
                        sprite.setVisible(true);
                        sprite.properties.brightness=16;
                    }

                }
            }
        }
    }
}