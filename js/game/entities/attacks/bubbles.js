function gameLoadBubbles(game,scene,C) {

    scene.sprites.smallBubble={
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
                    C.manageBullet(game,scene,sprite,"onBubbled");
                }
            }
        }
    };

    scene.sprites.largeBubble={
        hitboxX:4, hitboxY:4,
        hitboxWidth:7, hitboxHeight:7,
        zIndex:C.BUBBLESZINDEX,
        tags:["largebubble","stagesprite"],
        events:{
            onPop:(game,scene,sprite,from,spawnifnormal,pointsifnormal)=>{
                if (from) C.addScore(game,scene,from.playerId,C.BUBBLEPOPSCORE);
                if (sprite.onBubblePopped) {
                    if (sprite.onBubblePopped.scatterAround) {
                        C.killEnemy(game,scene,sprite,C.MEMORY.players[from.playerId].comboCount);
                        C.increasePlayerCombo(game,scene,from.playerId);
                    }
                    if (sprite.onBubblePopped.spawnWaterWave) {
                        game.playAudio(game.audio.wash);
                        for (let i=0;i<sprite.onBubblePopped.spawnWaterWave;i++) {
                            let wave=game.addNewSprite(scene.sprites.waterWave,sprite.x+((i-1)*8),sprite.y);
                            wave.wait=C.checkEvery(i,2)?1:C.WATERWAVEDELAY;
                            if (!C.MEMORY.cheats.classicMode)
                                wave.setSpeedX((i-1)*C.WATERWAVESPEEDX);
                            if (from) wave.by=from;
                        }
                    }
                    if (sprite.onBubblePopped.spawnTornado) {
                        game.playAudio(game.audio.tornado);
                        for (let i=0;i<sprite.onBubblePopped.spawnTornado;i++) {
                            let tornado=game.addNewSprite(scene.sprites.tornado,sprite.x+((i-1)*8),sprite.y);
                            tornado.wait=C.checkEvery(i,2)?1:C.TORNADODELAY;
                            if (from) tornado.by=from;
                        }
                    }
                    if (sprite.onBubblePopped.spawnSpinStar) {
                        game.playAudio(game.audio.spinstar);
                        for (let i=0;i<sprite.onBubblePopped.spawnSpinStar;i++) {
                            let spinStar=game.addNewSprite(scene.sprites.spinStar,sprite.x,sprite.y);
                            spinStar.wait=Math.floor(i/3)*C.SPINSTARDELAY;
                            spinStar.angledelta=C.SPINSTARANGLEDELTA*i;
                            if (from) spinStar.by=from;
                        }
                    }
                    if (sprite.onBubblePopped.spawnPoison) {
                        game.playAudio(game.audio.poison);
                        for (let i=0;i<sprite.onBubblePopped.spawnPoison;i++) {
                            let poison=game.addNewSprite(scene.sprites.poison,sprite.x,sprite.y);
                            switch (i) {
                                case 0:{
                                    poison.setSpeedY(-1);
                                    break;
                                }
                                case 1:{
                                    poison.setFlipY(true);
                                    poison.setSpeedX(1);
                                    poison.setSpeedY(1);
                                    break;
                                }
                                case 2:{
                                    poison.setFlipY(true);
                                    poison.setSpeedX(-1);
                                    poison.setSpeedY(1);
                                    break;
                                }
                            }
                            if (from) poison.by=from;
                        }
                    }
                    if ((sprite.onBubblePopped.gainLetter!==undefined) && from)
                        C.gainLetter(game,scene,from.playerId,sprite.onBubblePopped.gainLetter);
                    if (sprite.onBubblePopped.spawnFire) {
                        game.playAudio(game.audio.burn);
                        for (let i=0;i<sprite.onBubblePopped.spawnFire;i++) {
                            fire=game.addNewSprite(scene.sprites.fire,sprite.x+3,sprite.y+4);
                            fire.spread=true;
                        }
                    }
                    if (sprite.onBubblePopped.spawnBolts) {
                        if (C.MEMORY.cheats.classicMode) {
                            for (let i=0;i<sprite.onBubblePopped.spawnBolts;i++) {
                                let bolt=game.addNewSprite(scene.sprites.bolt,sprite.x,sprite.y);
                                bolt.wait=1+i*C.BOLTDELAY;
                                if (from)
                                    if (from.flipX)
                                        bolt.speed=C.BOLTSPEED;
                                    else 
                                        bolt.speed=-C.BOLTSPEED;
                                else
                                    bolt.speed=C.BOLTSPEED*(C.RND.randomBool(0.5)?-1:1);
                            }
                        } else {
                            let bolt=game.addNewSprite(scene.sprites.bolt,sprite.x,sprite.y);
                            bolt.wait=1;
                            bolt.speed=C.BOLTSPEED;
                            bolt=game.addNewSprite(scene.sprites.bolt,sprite.x,sprite.y);
                            bolt.wait=1;
                            bolt.speed=-C.BOLTSPEED;
                        }
                        game.playAudio(game.audio.bolt);
                    }
                } else if (spawnifnormal)
                    C.spawnBonus(game,scene,sprite.x,sprite.y,spawnifnormal,false,pointsifnormal);
                game.addNewSprite(scene.sprites.pop,sprite.x,sprite.y);
                sprite.remove();
            }
        },
        states:{
            default:{
                collisions:C.LARGEBUBBLECOLLISIONS,
                onEnter:(game,scene,sprite)=>{
                    sprite.invulnerability = C.LARGEBUBBLEINVULNERABILITY;
                    sprite.side = C.RND.randomBool(0.5);
                    sprite.timer = C.LARGEBUBBLETIMER;
                    sprite.checkside = "top";
                    sprite.setSpeedY(-C.LARGEBUBBLESPEED);
                },
                onLogic:(game,scene,sprite)=>{
                    sprite.timer--;
                    if (sprite.timer<C.BLINKTIME)
                        sprite.setVisible(C.checkBlink(sprite.timer,2));
                    if (sprite.timer) {
                        C.applyVerticalWarp(sprite);
                        if (sprite.invulnerability)
                            sprite.invulnerability--;
                        if (sprite.collisions[sprite.checkside] && (sprite.collisions[sprite.checkside].wall||sprite.collisions[sprite.checkside].solidwall||sprite.collisions[sprite.checkside].ceilingwall)) {
                            if (sprite.side) {
                                sprite.setSpeedX(-C.LARGEBUBBLESPEED);
                                if (sprite.collisions.left && (sprite.collisions.left.wall||sprite.collisions.left.solidwall||sprite.collisions.left.ceilingwall))
                                    sprite.side = !sprite.side;
                            } else {
                                sprite.setSpeedX(C.LARGEBUBBLESPEED);
                                if (sprite.collisions.right && (sprite.collisions.right.wall||sprite.collisions.right.solidwall||sprite.collisions.right.ceilingwall))
                                    sprite.side = !sprite.side;
                            }
                        } else
                            sprite.setSpeedX(0);
                    } else {
                        if (sprite.onBubbleRelease) {
                            if (sprite.onBubbleRelease.addNewSprite) {
                                let newsprite = game.addNewSprite(scene.sprites[sprite.onBubbleRelease.addNewSprite], C.fixXSprite(sprite.x), sprite.y);
                                if (sprite.onBubbleRelease.setMode) newsprite.mode=sprite.onBubbleRelease.setMode;
                            }
                        }
                        game.addNewSprite(scene.sprites.pop,sprite.x,sprite.y);
                        sprite.remove();
                    }
                }
            }
        }
    };
}