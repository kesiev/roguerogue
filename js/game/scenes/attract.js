function gameLoadAttract(game,scenes,C) {
    
    scenes.attract={
        onEnter:(game, scene)=>{

            // Initialize
            game.clearSprites();
            game.addNewSprite(scene.sprites.edgeWall, 0, -32);
            game.addNewSprite(scene.sprites.edgeWall, 240, -32);
            C.goToStage(game,scene,C.STAGES[C.RND.randomInteger(3)]);

            // Prepare fake player
            C.MEMORY.players=[];
            C.MEMORY.players[10]={
                startX:C.PLAYERSTARTX[0],
                livesSymbol:0,
                isReal:false,
                isInGame:true,
                hasPlayed:true,
                lastStage:0,
                livesLost:0,
                skippedRules:[],
                yendorAmuletCollected:0,
                defaultBubbleType:0,
                defaultFireMode:0,
                defaultFiringAnimation:"fire",
                defaultCanSquish:false,
                defaultCanCutJump:false,
                skin:0
            };
            C.resetPlayer(game,scene,10);
            C.resetLetters(game,scene,10);
            game.controls[10]={};

            // Starts the stage
            scene.attracttimer=C.ATTRACTTIMER;
            scene.transitionTimer=0;
            scene.timer=0;
            scene.presenting=true;
            C.startStage(game,scene,"",true);
        },
        onExit:(game,scene)=>{
            delete C.MEMORY.players[10];
        },
        onLogic:(game, scene)=>{
            game.logicSprites();
            if (scene.presenting) {
                scene.timer++;
                if (scene.timer==C.STARTTIMER)
                    game.getSpritesWithTag("player").forEach(sprite=>{
                        sprite.setState(sprite.states.default);
                    })
                if (scene.timer==C.ENDPRESENTTIMER) {
                    scene.presenting = false;
                    game.getSpritesWithTagCopy("tostart").forEach(sprite=>{
                        sprite.setState(sprite.states.default);
                    })
                }
            }
            
            // Player control
            let players=game.getSpritesWithTag("player");
            if (players[0]) {
                game.controls[10]={};

                let
                    player=players[0],
                    distance=10000,
                   
                    targetX=0,
                    targetY=0,
                    enemyDistX=0,
                    enemyDistY=0,
                    distX=0,
                    distY=0;

                if (player.attention)
                    player.attention--;

                if (!player.attention || !player.nearest || player.nearest.removed) {
                    let nearest=0;
                    game.getSpritesWithTag("toclear").forEach(enemy=>{
                        let d=game.calcDistance(player.x,player.y,enemy.x,enemy.y);
                        if (d<distance) {
                            distance=d;
                            nearest=enemy;
                        }
                    });
                    game.getSpritesWithTag("bonus").forEach(bonus=>{
                        let d=game.calcDistance(player.x,player.y,bonus.x,bonus.y);
                        if (d<distance) {
                            distance=d;
                            nearest=bonus;
                        }
                    });
                    if (nearest) {
                        player.nearest=nearest;
                        player.attention=C.HALFSEC;
                    }
                }

                if (player.nearest) {
                    targetY=player.nearest.y;
                    if (player.x<player.nearest.x)
                        targetX=player.nearest.x-48;
                    else
                        targetX=player.nearest.x+64;
                    if (targetX<16)
                        targetX=player.nearest.x+64;
                    if (targetX>C.SCREENWIDTH-32)
                        targetX=player.nearest.x-48;
                    enemyDistX=player.nearest.x-player.x;
                    enemyDistY=player.nearest.y-player.y;
                    distX=targetX-player.x;
                    distY=targetY-player.y;

                    if (player.nearest.isCagedEnemy || player.nearest.bonusData) {

                        if (Math.abs(enemyDistX)>4)
                            if (enemyDistX>0)
                                game.controls[10].right=true;
                            else
                                game.controls[10].left=true;

                        if (enemyDistY<0)
                            game.controls[10].a=true;

                    } else {
                        
                        if ((Math.abs(enemyDistX)<80)&&(Math.abs(enemyDistY)<8)) {
                            if (enemyDistX>0)
                                game.controls[10].right=true;
                            else
                                game.controls[10].left=true;
                            game.controls[10].b=true;
                        } else {
    
                            if (Math.abs(distX)>8)
                                if (distX>0)
                                    game.controls[10].right=true;
                                else
                                    game.controls[10].left=true;
    
                            if (Math.abs(enemyDistX)>24 && (distY<8))
                                game.controls[10].a=true;
    
                        }
                        
                    }

                    
                }

                if (game.controls[10].a) {
                    player.tryjumping=(player.tryjumping||0)+1;
                    if (player.tryjumping>C.ONESEC) {
                        game.controls[10].b=true;
                        game.controls[10].down=true;
                        player.tryjumping=0;
                    }
                }

            } else
                C.spawnPlayer(game,scene,10);

            // Abort attract
            scene.attracttimer--;
            for (let i=0;i<C.PLAYERSCOUNT;i++) {
                if (
                    game.controlIsDown(game.controls[i].a)||
                    game.controlIsDown(game.controls[i].b)||
                    game.controlIsDown(game.controls[i].start)
                )
                    scene.attracttimer=0;
            }
            if (scene.attracttimer<=0)
                C.gotoScene(game,scene,game.scenes.default);
        },
        onDraw:(game, scene)=>{
            game.clearScreen();
            game.drawSprites();
            game.fillRect(game.palette[0], 0, 0, 256,16);
            C.showIdleGui(game,scene,true);
            game.drawSimpleImage(C.LABELS.credits,C.CREDITSX,C.CREDITSY);
            game.print(game.fonts.normal.outline,1,C.MEMORY.credits,C.CREDITSCOUNTERX,C.CREDITSY);
        }
    };

}