function gameLoadBombs(game,scene,C) {

    scene.sprites.smallBomb={
        tags:["stagesprite"],
        hitboxX:2,
        hitboxY:2,
        hitboxWidth:12,
        hitboxHeight:12,
        zIndex:C.BUBBLESZINDEX,
        states:{
            default:{
                collisions:C.SMALLBUBBLECOLLISIONS,
                onLogic:(game,scene,sprite)=>{
                    C.manageBullet(game,scene,sprite,"onSmallBombed",true);
                }
            }
        }
    };

    scene.sprites.bomb={
        tags:["stagesprite","hitable","bomb","solidwall"],
        zIndex:C.PLAYERTOOLZINDEX,
        animations:{
            default:{
                loop:true,
                cells:game.cells.bomb,
                speed:0.2
            },
            exploding:{
                loop:true,
                cells:game.cells.bombExploding,
                speed:0.4
            }
        },
        states:{
            default:{
                onRushed:(game,scene,sprite,by)=>{
                    sprite.explodetimer=0;
                },
                onEnter:(game,scene,sprite)=>{
                    sprite.explodetimer=C.BOMBTIMER;
                    sprite.rushCombo=0;
                },
                onLogic:(game,scene,sprite)=>{
                    sprite.explodetimer--;
                    if (sprite.explodetimer<=0) {
                        for (let i=0;i<5;i++) {
                            let explosion=game.addNewSprite(scene.sprites.explosion,sprite.x,sprite.y);
                            explosion.bomb=sprite;
                            explosion.setSpeedY(-i);
                            explosion.explodetimer=10;
                            explosion=game.addNewSprite(scene.sprites.explosion,sprite.x,sprite.y);
                            explosion.bomb=sprite;
                            explosion.setSpeedY(i);
                            explosion.explodetimer=10;
                            explosion=game.addNewSprite(scene.sprites.explosion,sprite.x,sprite.y);
                            explosion.bomb=sprite;
                            explosion.setSpeedX(-i);
                            explosion.explodetimer=10;
                            explosion=game.addNewSprite(scene.sprites.explosion,sprite.x,sprite.y);
                            explosion.bomb=sprite;
                            explosion.setSpeedX(i);
                            explosion.explodetimer=10;
                        }
                        sprite.remove();
                        game.playAudio(game.audio.explosion);
                    } else if (sprite.explodetimer<C.ONESEC)
                        sprite.changeAnimation(sprite.animations.exploding);
                }
            }
        }
    };

    scene.sprites.explosion={
        tags:["stagesprite"],
        zIndex:C.SPECIALZINDEX,
        animations:{
            default:{
                loop:true,
                cells:game.cells.explosion,
                speed:0.2
            }
        },
        states:{
            default:{
                collisions:C.EXPLOSIONCOLLISIONS,
                onLogic:(game,scene,sprite)=>{
                    C.applyVerticalWarp(sprite);
                    sprite.explodetimer--;
                    if (!sprite.explodetimer) {
                        if (sprite.bomb.rushCombo) {
                            C.evaluatePlayerCombo(game,scene,sprite.bomb.rushCombo,1);
                            sprite.bomb.rushCombo=0;
                        }
                        sprite.remove();
                    } else if (sprite.collisions.hitable) {
                        sprite.collisions.hitable.all.forEach(collision=>{
                            if (
                                collision.object.state.onRushed &&
                                collision.object.state.onRushed(game,scene,collision.object,sprite.bomb)
                            )
                                sprite.bomb.rushCombo++;
                        });
                    } else if (sprite.collisions.player) {
                        sprite.collisions.player.all.forEach(collision=>{
                            if (collision.object.state.onPoisoned)
                                collision.object.state.onPoisoned(game,scene,collision.object);
                        });
                    }
                }
            }
        }
    };

}