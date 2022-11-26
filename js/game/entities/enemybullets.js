function gameLoadEnemyBullets(game,scene,C) {

    scene.sprites.snowball={
        tags:["killplayer","enemybullet","stagesprite","bright"],
        hitboxX:2, hitboxY:2,
        hitboxWidth:12, hitboxHeight:14,
        zIndex:C.ENEMYZINDEX,
        animations:{
            snowballRight:{
                loop:true,
                cells:game.cells.snowballRight,
                speed:0.5
            },
            snowballLeft:{
                loop:true,
                cells:game.cells.snowballLeft,
                speed:0.5
            }
        },
        properties:{
            brightnessX:8,
            brightnessY:8,
            brightness:16
        },
        states:{
            default:{
                collisions:C.ENEMYBULLETCOLLISIONS,
                onLogic:(game,scene,sprite)=>{
                    if (sprite.speedX>0)
                        sprite.changeAnimation(sprite.animations.snowballRight);
                    else
                        sprite.changeAnimation(sprite.animations.snowballLeft);
                    if (sprite.collisions.all.length) {
                        game.playAudio(game.audio.crack);
                        game.addNewSprite(scene.sprites.disappear,sprite.x,sprite.y);
                        sprite.remove();
                    }
                }
            },
            kill:C.ENEMYKILL
        },
    };

    scene.sprites.boomerang={
        tags:["killplayer","enemybullet","stagesprite","bright"],
        hitboxX:2, hitboxY:2,
        hitboxWidth:12, hitboxHeight:14,
        zIndex:C.ENEMYZINDEX,
        animations:{
            boomerangRight:{
                loop:true,
                cells:game.cells.boomerangRight,
                speed:0.5
            },
            boomerangLeft:{
                loop:true,
                cells:game.cells.boomerangLeft,
                speed:0.5
            }
        },
        properties:{
            brightnessX:8,
            brightnessY:8,
            brightness:16
        },
        states:{
            default:{
                collisions:C.ENEMYBULLETBOUNCECOLLISIONS,
                onEnter:(game,scene,sprite)=>{
                    if (sprite.times === undefined) sprite.times=1;
                },
                onLogic:(game,scene,sprite)=>{
                    if (sprite.speedX>0)
                        sprite.changeAnimation(sprite.animations.boomerangRight);
                    else
                        sprite.changeAnimation(sprite.animations.boomerangLeft);
                    if (sprite.collisions.all.length) {
                        game.addNewSprite(scene.sprites.disappear,sprite.x,sprite.y);
                        if (sprite.times) {
                            game.playAudio(game.audio.bounce);
                            sprite.times--;
                        } else {
                            game.playAudio(game.audio.crack);
                            sprite.remove();
                        }
                    }
                }
            },
            kill:C.ENEMYKILL
        },
    };

    scene.sprites.whiteFireball={
        tags:["killplayer","enemybullet","stagesprite","bright"],
        hitboxX:2, hitboxY:2,
        hitboxWidth:12, hitboxHeight:12,
        zIndex:C.ENEMYZINDEX,
        animations:{
            default:{
                loop:true,
                cells:game.cells.whiteFireball,
                speed:0.5
            }
        },
        properties:{
            brightnessX:8,
            brightnessY:8,
            brightness:16
        },
        states:{
            default:{
                onLogic:(game,scene,sprite)=>{
                    if ((sprite.x<-16)||(sprite.x>C.SCREENWIDTH)||(sprite.y<-16)||(sprite.y>C.SCREENHEIGHT))
                        sprite.remove();
                }
            },
            kill:C.ENEMYKILL
        },
    };

    scene.sprites.firebolt={
        tags:["killplayer","enemybullet","stagesprite","bright"],
        hitboxX:4, hitboxY:2,
        hitboxWidth:8, hitboxHeight:14,
        zIndex:C.ENEMYZINDEX,
        speedY:C.FIREBOLTSPEED,
        animations:{
            default:{
                loop:true,
                cells:game.cells.fireBolt,
                speed:0.5
            },
        },
        properties:{
            brightnessX:8,
            brightnessY:8,
            brightness:16
        },
        states:{
            default:{
                onLogic:(game,scene,sprite)=>{
                    if (sprite.y>C.SCREENHEIGHT)
                        sprite.remove();
                }      
            },
            kill:C.ENEMYKILL
        },
    };
    
}