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
        states:{
            default:{
                collisions:C.ENEMYCOLLISIONS,
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
}