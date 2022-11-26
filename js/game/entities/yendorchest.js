function gameLoadYendorChest(game,scene,C) {
    
    scene.sprites.yendorChest={
        tags:["toclear","stagesprite"],
        zIndex:C.ENEMYZINDEX,
        x:Math.floor((C.SCREENWIDTH-48)/2),
        y:-32,
        accelY:0.1,
        animations:{
            default:{
                cells:game.cells.yendorChestClosed
            },
            opened:{
                cells:game.cells.yendorChestOpened
            }
        },
        states:{
            default:{
                onLogic:(game,scene,sprite)=>{
                    if (sprite.y>168) {
                        sprite.setY(168);
                        if (sprite.speedY>2) {
                            let explosion=game.addNewSprite(scene.sprites.whiteExplosion,sprite.x,sprite.y+40);
                            explosion.setSpeedX(-1);
                            explosion=game.addNewSprite(scene.sprites.whiteExplosion,sprite.x+16,sprite.y+40);
                            explosion=game.addNewSprite(scene.sprites.whiteExplosion,sprite.x+32,sprite.y+40);
                            explosion=game.addNewSprite(scene.sprites.whiteExplosion,sprite.x+48,sprite.y+40);
                            explosion.setSpeedX(1);
                        }
                        if (sprite.speedY<1) {
                            sprite.setAccelY(0);
                            sprite.setSpeedY(0);
                            sprite.setState(sprite.states.open);
                        } else
                            sprite.setSpeedY(-sprite.speedY/2.5);
                        game.playAudio(game.audio.bounce);
                    }
                }
            },
            open:{
                onEnter:(game,scene,sprite)=>{
                    sprite.opentimer=C.ONESEC*3;
                },
                onLogic:(game,scene,sprite)=>{
                    if (sprite.opentimer) {
                        sprite.opentimer--;
                        if (sprite.opentimer==C.ONESEC) {
                            game.playAudio(game.audio.crack);
                            game.playAudio(game.audio.kill);
                            sprite.changeAnimation(sprite.animations.opened);
                            let bonus=C.spawnBonus(game,scene,sprite.x+16,sprite.y,"yendoramulet");
                            bonus.setSpeedY(-2);
                            bonus.setAccelY(C.GRAVITY);
                            bonus.addTag("toclear");
                            for (let i=1;i<3;i++) {
                                let bonus=C.spawnBonus(game,scene,sprite.x+32,sprite.y+32,"diamond6k");
                                bonus.setSpeedX(-i);
                                bonus.setSpeedY(-1);
                                bonus.setAccelY(C.GRAVITY);
                                bonus=C.spawnBonus(game,scene,sprite.x+16,sprite.y+32,"diamond6k");
                                bonus.setSpeedX(i);
                                bonus.setSpeedY(-1);
                                bonus.setAccelY(C.GRAVITY);
                            }
                        } else if (sprite.opentimer<C.ONESEC) {
                            sprite.setVisible(C.checkBlink(sprite.opentimer,2));
                        }
                    } else sprite.remove();
                }
            }
        },
    };

}