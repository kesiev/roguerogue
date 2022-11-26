function gameLoadMinigameCeiling(game,scene,C) {
    scene.minigames.ceiling={
        tilemaps:{
            stage:{
                tags:["walls","stagesprite"],
                x:0,
                cells:game.cells.minigamePuzzleTiles,
                zIndex:8,
                x:120,y:24,
                tiles:[
                    { char:" " },
                    { char:"A", frame:0  },
                    { char:"B", frame:1  },
                    { char:"C", frame:2  },
                    { char:"D", frame:3  },
                ],
                map:[
                    "AB",
                    "CD",
                    "AB",
                    "CD",
                    "AB",
                    "CD",
                    "AB",
                    "CD",
                    "AB",
                    "CD",
                    "AB",
                    "CD",
                    "AB",
                    "CD",
                    "AB",
                    "CD",
                    "AB",
                    "CD",
                    "AB",
                    "CD",
                    "AB",
                    "CD",
                    "AB",
                    "CD",
                ]
            },
        },
        sprites:{
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
            },  
        },
        onPrepare:(game,scene,minigame)=>{
            minigame.started=0;
            minigame.goalAt=C.ONESEC*60;
        },
        onEnter:(game,scene,minigame)=>{
            minigame.started=1;
            minigame.playing=true;
            minigame.stage=game.addNewTilemap(minigame.tilemaps.stage);
            minigame.playerscount=0;
            minigame.fields=[];
            minigame.crackTime=C.HALFSEC;
            minigame.colors=[2,5,3,4];
            minigame.maxAimLength=190;
            minigame.lastRow=12;
            minigame.deadLine=10;
            C.MEMORY.players.forEach((player,p)=>{
                let field={
                    rowSpeed:C.ONESEC*6,
                    combo:0,
                    rowTimer:0,
                    rowCount:4,
                    isPlaying:false,
                    check:false,
                    gridX:8+(p*128),
                    gridY:8,
                    playerFrame:0,
                    playerX:3,
                    playerY:200,
                    playerHold:0,
                    grid:[],
                };
                for (let y=0;y<13;y++) {
                    let row=[];
                    for (let x=0;x<7;x++)
                        row.push(0);
                    field.grid.push(row);
                }
                if (player.isInGame && !player.isDead) {
                    field.playerCells=C.PLAYERSKINS[C.MEMORY.players[p].skin].frontWalk.cells;
                    field.isPlaying=true;
                }     
                minigame.fields.push(field);
            })
        },
        onLogic:(game,scene,minigame)=>{
            let
                gameover=false;

            if (minigame.goalAt && minigame.playing) {

                minigame.started=2;
                minigame.goalAt--;

                minigame.fields.forEach((field,p)=>{
                    if (field.isPlaying) {
                        if (field.filledRectTimer)
                            field.filledRectTimer--;
                        field.aimY=0;
                        field.aimLength=minigame.maxAimLength;

                        if (game.controlIsHit(game.controls[p].right) && (field.playerX<field.grid[0].length-1)) {
                            game.addNewSprite(minigame.sprites.explosion,field.gridX+(field.playerX*16), field.playerY);
                            field.playerFrame=(field.playerFrame+1)%2;
                            field.playerX++;
                        } else if (game.controlIsHit(game.controls[p].left) && (field.playerX>0)) {
                            game.addNewSprite(minigame.sprites.explosion,field.gridX+(field.playerX*16), field.playerY);
                            field.playerFrame=(field.playerFrame+1)%2;
                            field.playerX--;
                        }

                        if (game.controlIsHit(game.controls[p].a)) {
                            if (field.playerHold) {
                                let holdy,holdcolor=field.playerHold[0].color;
                                game.playAudio(game.audio.tick1);
                                for (let y=0;y<field.grid.length;y++)
                                    if (!field.grid[y][field.playerX]) {
                                        field.grid[y][field.playerX]=field.playerHold.shift();
                                        field.grid[y][field.playerX].check=true;
                                        holdy=y;
                                        if (!field.playerHold.length) break;
                                    }
                                if (!field.playerHold.length) field.playerHold=0;
                                field.check=true;
                                if (holdy!==undefined) {
                                    field.filledRectX=field.playerX;
                                    field.filledRectTimer=3;
                                    field.filledRectY=field.gridY+field.gridGapY+(holdy*16);
                                    field.filledRectColor=holdcolor;
                                    field.filledRectLength=minigame.maxAimLength-field.filledRectY;
                                }
                            } else {
                                game.playAudio(game.audio.tick2);
                                let hold=[],holdy;
                                for (let y=minigame.lastRow;y>=0;y--) {
                                    if (field.grid[y][field.playerX])
                                        if (field.grid[y][field.playerX].crack || (hold.length && (hold[0].color!=field.grid[y][field.playerX].color)))
                                            break;
                                        else {
                                            holdy=y;
                                            hold.push(field.grid[y][field.playerX]);
                                            field.grid[y][field.playerX]=0;
                                        }
                                }
                                if (hold.length) {
                                    field.holdY=field.playerY+8-(Math.ceil(hold.length/3)*8);
                                    field.lastGapX=12-(hold.length%3)*4;
                                    field.lastGapXLimit=(Math.floor(hold.length/3)*3)-1;
                                    field.playerHold=hold;
                                    field.filledRectX=field.playerX;
                                    field.filledRectTimer=3;
                                    field.filledRectY=field.gridY+field.gridGapY+(holdy*16);
                                    field.filledRectColor=hold[0].color;
                                    field.filledRectLength=minigame.maxAimLength-field.filledRectY;
                                }
                            }
                        }

                        if (game.controlIsHit(game.controls[p].b))
                            field.rowTimer=0;

                        if (field.check) {
                            let
                                bonus=20,
                                score=0,
                                cracked=false;
                            field.check=false;
                            for (let y=0;y<field.grid.length;y++)
                                for (let x=0;x<field.grid.length;x++)
                                    if (field.grid[y][x] && field.grid[y][x].check) {
                                        let crack=true;
                                        for (let i=1;i<3;i++)
                                            if (!field.grid[y-i] || !field.grid[y-i][x] || (field.grid[y-i][x].color!=field.grid[y][x].color)) {
                                                crack=false;
                                                break;
                                            }
                                        field.grid[y][x].check=false;
                                        if (crack) {
                                            cracked=true;
                                            field.grid[y][x].crack=1;
                                            score+=bonus;
                                            bonus+=20;
                                        }
                                    }

                            if (cracked) {
                                game.playAudio(game.audio.powerup);

                                do {
                                    cracked=false;
                                    for (let y=0;y<field.grid.length;y++)
                                        for (let x=0;x<field.grid.length;x++)
                                            if (field.grid[y][x] && field.grid[y][x].crack) {
                                                let cracks=false;
                                                if (field.grid[y][x-1] && !field.grid[y][x-1].crack && (field.grid[y][x-1].color == field.grid[y][x].color)) {
                                                    cracks=true;
                                                    field.grid[y][x-1].crack=1;
                                                }
                                                if (field.grid[y][x+1] && !field.grid[y][x+1].crack && (field.grid[y][x+1].color == field.grid[y][x].color)) {
                                                    cracks=true;
                                                    field.grid[y][x+1].crack=1;
                                                }
                                                if (field.grid[y-1] && field.grid[y-1][x] && !field.grid[y-1][x].crack && (field.grid[y-1][x].color == field.grid[y][x].color)) {
                                                    cracks=true;
                                                    field.grid[y-1][x].crack=1;
                                                }
                                                if (field.grid[y+1] && field.grid[y+1][x] && !field.grid[y+1][x].crack && (field.grid[y+1][x].color == field.grid[y][x].color)) {
                                                    cracks=true;
                                                    field.grid[y+1][x].crack=1;
                                                }
                                                if (cracks) {
                                                    cracked=true;
                                                    score+=bonus;
                                                    bonus+=20;
                                                }
                                        }
                                } while (cracked);
                            }

                            if (score)
                                C.addScore(game,scene,p,score);
                        }

                        let docell;
                        for (let y=0;y<field.grid.length;y++)
                            for (let x=0;x<field.grid.length;x++)
                                do {
                                    if (field.grid[y][x] && field.grid[y][x].crack) {
                                        field.grid[y][x].crack++;
                                        if (field.grid[y][x].crack>=minigame.crackTime) {
                                            docell=true;
                                            for (let i=y;i<field.grid.length;i++)
                                                if (field.grid[i+1]) {
                                                    field.grid[i][x]=field.grid[i+1][x];
                                                    if (field.grid[i][x])
                                                        field.grid[i][x].check=true;
                                                    field.check=true;
                                                } else field.grid[i][x]=0;
                                        } else docell=false;
                                    } else docell=false;
                                    if ((x==field.playerX)&&field.grid[y][x]) {
                                        field.aimY=(y*16)+17;
                                        field.aimLength=minigame.maxAimLength-field.aimY;
                                    }
                                } while (docell);

                        
                        if (field.rowTimer)
                            field.rowTimer--;
                        else {
                            if (field.rowCount)
                                for (let y=minigame.lastRow;y>=0;y--)
                                    for (let x=0;x<field.grid[y].length;x++) {
                                        if ((y>minigame.deadLine) && field.grid[y][x]) {
                                            minigame.playing=false;
                                            gameover=true;
                                        } else if (y<field.rowCount)
                                            field.grid[y][x]={
                                                color:C.RND.randomInteger(4),
                                                crack:0
                                            }
                                        else
                                            field.grid[y][x]=field.grid[y-1][x];
                                    }
                            field.rowSpeed-=17;
                            if (field.rowSpeed<80) field.rowSpeed=80;
                            field.rowTimer=field.rowSpeed;
                            field.rowCount=1;
                        }

                        field.gridGapY=Math.floor(16*(1-field.rowTimer/field.rowSpeed));
                    }
                });

                if (!minigame.playing)
                    game.playAudio(game.audio.hit);

            } else {
                gameover=true;
                if (minigame.playing) {
                    C.allPlayersAddScore(game,scene,10000);
                    game.playAudio(game.audio.powerup);
                }
            }
            return gameover;
        },
        onExit:(game,scene,minigame)=>{
        },
        onDrawPre:(game,scene,minigame)=>{
            if (minigame.started) {

                minigame.fields.forEach(field=>{
                    if (field.isPlaying) {
                        for (let y=0;y<field.grid.length;y++)
                            for (let x=0;x<field.grid[y].length;x++)
                                if (field.grid[y][x] && !C.checkBlink(field.grid[y][x].crack,2))
                                    game.drawSimpleCell(game.cells.minigameTiles, field.grid[y][x].color, field.gridX+(x*16), field.gridGapY+field.gridY+(y*16));

                        if (field.aimLength>0)
                            game.fillRect(game.palette[field.playerHold?minigame.colors[field.playerHold[0].color]:1],field.gridX+(field.playerX*16)+8, field.gridY+field.gridGapY+field.aimY,1,field.aimLength-field.gridGapY);

                        if (field.filledRectTimer)
                            game.fillRect(game.palette[minigame.colors[field.filledRectColor]],field.gridX+(field.filledRectX*16), field.filledRectY,16,field.filledRectLength);

                        game.drawSimpleCell(field.playerCells, field.playerFrame, field.gridX+(field.playerX*16), field.playerY);
                    }
                });
            }
        },
        onDrawPost:(game,scene,minigame)=>{
            if (minigame.started) {

                minigame.fields.forEach(field=>{
                    if (field.isPlaying) {
                        if (field.playerHold) {
                            let gapx;
                            for (let i=0;i<field.playerHold.length;i++) {
                                if (i>field.lastGapXLimit) gapx=field.lastGapX; else gapx=0;
                                game.drawSimpleCell(game.cells.minigamePuzzleTiles, field.playerHold[i].color, field.gridX+(field.playerX*16)-4+gapx+(i%3*8), field.holdY+Math.floor(i/3)*8);
                            }
                        }
                    }
                });

                let time=Math.ceil(minigame.goalAt/C.ONESEC);
                game.print(game.fonts.normal.outline,5,"TIME",110,24);
                game.print(game.fonts.normal.outline,1,time,118+(time<10?5:0),34);
            }
        }
    }
}