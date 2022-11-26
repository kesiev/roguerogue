function gameLoadMinigameNicobar(game,scene,C) {
    scene.minigames.nicobar={
        tilemaps:{
            stage:{
                tags:["walls","stagesprite"],
                x:0,
                cells:game.cells.minigameBarTiles,
                zIndex:8,
                x:8,y:24,
                tiles:[
                    { char:" " },
                    { char:"A", frame:0 },
                    { char:"B", frame:1 },
                    { char:"C", frame:2 },
                    { char:"D", frame:3 },
                    { char:"E", frame:4 },
                    { char:"F", frame:5 },
                    { char:"G", frame:6 },
                    { char:"H", frame:7 },
                    { char:"I", frame:8 },
                    { char:"J", frame:9 },
                    { char:"K", frame:10 },
                    { char:"L", frame:11 },
                    { char:"M", frame:12 },
                    { char:"N", frame:13 },
                ],
                map:[
                    "                              ",
                    "                              ",
                    "       IIIIIIIIIIIIIIIII      ",
                    "  AEB  I               I  AEB ",
                    "  F G  I               I  F G ",
                    "  F G  IJJJJJJJJJJJJJJJI  F G ",
                    "  F G  IIIIIIIIIIIIIIIII  F G ",
                    "  F G  I               I  F G ",
                    "  F G  I               I  F G ",
                    "  F G  IJJJJJJJJJJJJJJJI  F G ",
                    "  F G  IIIIIIIIIIIIIIIII  F G ",
                    "  F G  I               I  F G ",
                    "  F G  I               I  F G ",
                    "  F G  IJJJJJJJJJJJJJJJI  F G ",
                    "  F G  IIIIIIIIIIIIIIIII  F G ",
                    "  F G  I               I  F G ",
                    "  F G  I               I  F G ",
                    "  F G  IJJJJJJJJJJJJJJJI  F G ",
                    "  C D  IIIIIIIIIIIIIIIII  C#D ",
                    "   H   IIIIIIIIIIIIIIIII   H  ",
                    "       IIIIIIIIIIIIIIIII      ",
                    "       IIIIIIIIIIIIIIIII      ",
                    "KLKLKLKLKLKLKLKLKLKLKLKLKLKLKL",
                    "MNMNMNMNMNMNMNMNMNMNMNMNMNMNMN",
                ]
            }
        },
        sprites:{
            barman:{
                tags:["stagesprite"],
                zIndex:9
            },
            drink:{
                tags:["stagesprite"],
                zIndex:10,
                animations:{
                    default:{
                        cells:game.cells.minigameDrink
                    }
                }
            },
            explosion:{
                tags:["stagesprite"],
                zIndex:20,
                speedY:-0.5,
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
            }
        },
        onPrepare:(game,scene,minigame)=>{
            let
                bonusSet=C.RND.newBag(C.BONUSES.nicobaritem),
                ingredients=[];
            minigame.started=0;
            minigame.goalAt=C.ONESEC*60;
            minigame.playing=true;
            minigame.grid=[];
            minigame.ingredients=[];
            minigame.recipe=0;
            minigame.bonus=200;
            minigame.players=[
                {x:0,y:0,r:0,stun:0,wait:0,won:false,isRunning:false,audioMove:game.audio.tick1},
                {x:3,y:0,r:0,stun:0,wait:0,won:false,isRunning:false,audioMove:game.audio.tick2}
            ];
            for (let i=0;i<4;i++) {
                let row=[];
                for (let j=0;j<4;j++) {
                    let ingredient=bonusSet.pick();
                    row.push(ingredient);
                    ingredients.push(ingredient);
                }
                minigame.grid.push(row);
            }
            minigame.ingredientsSet=C.RND.newBag(ingredients);
        },
        onEnter:(game,scene,minigame)=>{
            minigame.started=1;
            minigame.tilemap=minigame.stage=game.addNewTilemap(minigame.tilemaps.stage);
            game.print(game.fonts.normal.outline,0,"NICOBAR",89,155,minigame.tilemap.image);
            C.MEMORY.players.forEach((player,p)=>{
                if (player.isInGame && !player.isDead) {
                    let
                        barman=game.addNewSprite(minigame.sprites.barman,28+p*192,184),
                        drink=game.addNewSprite(minigame.sprites.drink,40+p*192,184);
                    barman.animations=C.PLAYERSKINS[player.skin];
                    minigame.players[p].sprite=barman;
                    minigame.players[p].drink=drink;
                    barman.setAnimation(barman.animations.walk);
                    minigame.players[p].isRunning=true;
                    if (p) {
                        barman.setFlipX(true);
                        drink.setFlipX(true);
                        drink.setX(drink.x-24);
                    }
                }
            })
        },
        onLogic:(game,scene,minigame)=>{
            let
                gameover=false;

            if (minigame.goalAt) {
                minigame.started=2;
                minigame.goalAt--;

                if (!minigame.recipe) {
                    minigame.recipe=[];
                    for (let i=0;i<4;i++)
                        minigame.recipe.push(minigame.ingredientsSet.pick());
                }

                minigame.players.forEach((player,p)=>{
                    if (player.isRunning) {
                        if (player.stun)
                            player.stun--;
                        else {
                            let moved=false;
                            if (game.controlIsHit(game.controls[p].up)) {
                                moved=true;
                                player.y--;
                            } else if (game.controlIsHit(game.controls[p].down)) {
                                moved=true;
                                player.y++;
                            }
                            if (game.controlIsHit(game.controls[p].left)) {
                                moved=true;
                                player.x--;
                            } else if (game.controlIsHit(game.controls[p].right)) {
                                moved=true;
                                player.x++;
                            }

                            if (player.x<0) player.x=minigame.grid[0].length-1;
                            if (player.x>=minigame.grid[0].length) player.x=0;
                            if (player.y<0) player.y=minigame.grid.length-1;
                            if (player.y>=minigame.grid.length) player.y=0;

                            if (moved) game.playAudio(player.audioMove);

                            if (player.wait) {
                                player.wait--;
                                if (!player.wait) {
                                    minigame.recipe=0;
                                    player.r=0;
                                    player.won=false;
                                    player.sprite.setAnimation(player.sprite.animations.walk);
                                    player.drink.setVisible(true);
                                }
                            } else if (game.controlIsHit(game.controls[p].a) || game.controlIsHit(game.controls[p].b)) {
                                if (minigame.recipe[player.r].frame==minigame.grid[player.y][player.x].frame) {
                                    player.r++;
                                    if (player.r>=minigame.recipe.length) {
                                        game.playAudio(game.audio.powerup);
                                        player.won=true;
                                        C.addScore(game,scene,p,minigame.bonus);
                                        minigame.bonus+=200;
                                        minigame.players.forEach((player,pc)=>{
                                            if (player.isRunning) {
                                                if (p==pc) {
                                                    player.sprite.setAnimation(player.sprite.animations.happy);
                                                } else {
                                                    player.drink.setVisible(false);
                                                    player.sprite.setAnimation(player.sprite.animations.still);
                                                    game.addNewSprite(minigame.sprites.explosion,player.drink.x,player.drink.y);
                                                }
                                                player.wait=C.ONESEC;
                                            }
                                        })
                                    } else game.playAudio(game.audio.pick);
                                } else {
                                    player.stun=C.HALFSEC;
                                    game.playAudio(game.audio.bolt);
                                }
                            }

                        }
                    }
                });

            } else {
                gameover=true;
                game.playAudio(game.audio.powerup);
            }
            return gameover;
        },
        onExit:(game,scene,minigame)=>{
        },
        onDrawPre:(game,scene,minigame)=>{
            if (minigame.started)
                game.print(game.fonts.normal.outline,1+Math.floor(minigame.goalAt/C.HALFSEC)%6,"NICOBAR",89,154,minigame.tilemap.image);
        },
        onDrawPost:(game,scene,minigame)=>{
            if (minigame.started) {

                if (minigame.started) {
                    minigame.grid.forEach((row,y)=>{
                        row.forEach((item,x)=>{
                            game.drawSimpleCell(game.cells.bonus,item.frame,76+x*32,55+y*32);
                        })    
                    });
                    minigame.players.forEach((player,p)=>{
                        if (player.isRunning) {
                            let stun=C.checkBlink(player.stun,2);
                            if (minigame.recipe) {
                                let visible=true;
                                if (player.wait)
                                    if (player.won)
                                        visible=C.checkBlink(player.wait,4);
                                    else
                                        visible=false;
                                if (visible)
                                    minigame.recipe.forEach((ingredient,i)=>{
                                        game.drawSimpleCell(game.cells.bonus,ingredient.frame,28+p*192,55+i*32);
                                    });
                                if (!player.wait)
                                    game.drawSimpleCell(game.cells.minigameLargeCursors,p,20+p*192+stun,47+player.r*32);
                            }
                            game.drawSimpleCell(game.cells.minigameLargeCursors,p,68+player.x*32+stun,47+player.y*32);
                        }
                    })
                }

                let time=Math.ceil(minigame.goalAt/C.ONESEC);
                game.print(game.fonts.normal.outline,5,"TIME",110,24);
                game.print(game.fonts.normal.outline,1,time,118+(time<10?5:0),34);
            }
        }
    }
}