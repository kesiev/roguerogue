function gameLoadEffects(game,scene,C) {
    scene.sprites.sparkle={
        tags:["stagesprite"],
        zIndex:C.POPUPTEXTZINDEX,
        speedY:-0.5,
        animations:{
            default:{
                cells:game.cells.sparkle,
                speed:0.1
            }
        },
        states:{
            default:{
                onLogic:(game,scene,sprite)=>{
                    if (!sprite.animationLive)
                        sprite.remove();
                }
            }
        }
    };

    scene.sprites.whiteExplosion={
        tags:["stagesprite"],
        zIndex:C.ENEMYEFFECTZINDEX,
        animations:{
            default:{
                cells:game.cells.whiteExplosion,
                speed:0.2
            }
        },
        states:{
            default:{
                onLogic:(game,scene,sprite)=>{
                    if (!sprite.animationLive) sprite.remove();
                }
            }
        }
    };

    scene.sprites.pop={
        tags:["stagesprite"],
        zIndex:C.EFFECTSZINDEX,
        animations:{
            default:{
                cells:game.cells.pop,
                speed:0.4
            }
        },
        states:{
            default:{
                onLogic:(game,scene,sprite)=>{
                    if (!sprite.animationLive) sprite.remove();
                }
            }
        }
    };

    scene.sprites.disappear=C.SPRITEDISAPPEAR;

    scene.sprites.torch={
        tags:["scrolling","stagesprite","bright"],
        zIndex:C.DECORATIONSINDEX,
        animations:{
            default:{
                loop:true,
                cells:game.cells.torch,
                speed:0.1
            }
        },
        properties:{
            brightnessX:8,
            brightnessY:8,
            brightness:16
        }
    };

    scene.sprites.statue={
        tags:["scrolling","stagesprite"],
        zIndex:C.DECORATIONSINDEX,
        animations:{
            default:{
                cells:game.cells.statues,
            }
        }
    };
   
}