function gameLoadFunctions(game,C) {

    // Daily stage record
    C.DAY=Math.floor(Date.now()/(1000*60*60*24));

    // A new seed every week
    C.SEED=Math.floor((3+C.DAY)/7);

    // An extra credit every new seed
    C.setStartingCredits=(game,C)=>{

        let lastSeed=game.loadData("lastSeed")*1;
        C.STARTINGCREDITS=game.loadData("startingCredits")*1;
        if (!C.STARTINGCREDITS) C.STARTINGCREDITS=C.FIRSTSTARTINGCREDITS;

        if (lastSeed && (lastSeed < C.SEED))
            C.STARTINGCREDITS++;

        if (C.STARTINGCREDITS < C.FIRSTSTARTINGCREDITS)
            C.STARTINGCREDITS = C.FIRSTSTARTINGCREDITS;

        if (C.STARTINGCREDITS > C.MAXSTARTINGCREDITS)
            C.STARTINGCREDITS = C.MAXSTARTINGCREDITS;

        game.saveData("lastSeed",C.SEED);
        game.saveData("startingCredits",C.STARTINGCREDITS);

    }

    C.integrityCheck=(game,scenes,C)=>{

        function checkUndefined(root,prefix,depth) {
            if (!depth) depth=0;
            if (depth>5) return;
            for (var k in root) {
                if (root[k]===undefined)
                    console.error(prefix+" has undefined value: "+k);
                else if ((typeof root[k] == "object") && root[k]!==window)
                    checkUndefined(root[k],prefix+"."+k,depth+1);
            }
        }

        // Check stages
        C.STAGES.forEach((stage,id)=>{
            if (!stage.bonusStageSlots.length)
                console.error("Stage "+id+" has no bonus stage slots.");
            if (!stage.enemies.length)
                console.error("Stage "+id+" has no enemies.");
            if (!stage.spawnpoints.bonus.length)
                console.error("Stage "+id+" has no bonus spawnpoint.");
            if (!stage.spawnpoints.specialBubbles.length && stage.specialBubbles)
                console.error("Stage "+id+" has special bubbles but no spawnpoints.");
            if (stage.spawnpoints.specialBubbles.length && !stage.specialBubbles)
                console.error("Stage "+id+" has no special bubbles but spawnpoints.");
            checkUndefined(stage,"Stage "+id);
        });

    }

    C.scheduleBonus=(game,scene,bonus,force)=>{
        if (force || (C.MEMORY.scheduledBonuses.indexOf(bonus) == -1))
            C.MEMORY.scheduledBonuses.push(bonus);
    }

    C.scheduleNextBonus=(game,scene,bonus,force)=>{
        if (force || (C.MEMORY.scheduledBonuses.indexOf(bonus) == -1))
            C.MEMORY.scheduledBonuses.unshift(bonus);
    }

    C.isScheduledBonusAvailable=(game,scene)=>{
        return C.MEMORY.scheduledBonuses.length>0;
    }

    C.getNextScheduledBonus=(game,scene)=>{
        return C.MEMORY.scheduledBonuses.shift();
    }

    C.turnIntoBubble=(game,scene,sprite,isweak)=>{
        if (sprite.bubbleType)
            C.spawnSpecialBubble(game,scene,sprite,C.SPECIALBUBBLES[sprite.bubbleType]);
        else {
            let bubble = game.addNewSprite(scene.sprites.largeBubble,C.keepInRange(sprite.x,16,224),sprite.y);
            if (isweak) bubble.timer = C.WEAKLARGEBUBBLETIMER;
            bubble.setAnimation(sprite.largeBubbleAnimation);
        }
        sprite.remove();
    }

    C.managePlayerPush=(game,scene,sprite,rollstate)=>{
        if (sprite.collisions.player) {
            let player=sprite.collisions.player.all[0].object;
            sprite.hitby=player;
            if (player.x<sprite.x) {
                sprite.setFlipX(false);
                sprite.setSpeedX(C.SNOWBALLSPEED);
            } else {
                sprite.setFlipX(true);
                sprite.setSpeedX(-C.SNOWBALLSPEED);
            }
            game.addNewSprite(scene.sprites.disappear,sprite.x,sprite.y-8);
            sprite.setState(rollstate);
            game.playAudio(game.audio.pushsnow);
        }
    }

    C.manageHitableEvent=(game,scene,sprite,event)=>{
        let ret=false;
        if (sprite.collisions.hitable)
            sprite.collisions.hitable.all.forEach(collision=>{
                if (collision.object.state[event]) {
                    collision.object.state[event](game,scene,collision.object,sprite);
                    ret=true;
                }
            })
        return ret;
    }

    C.manageBullet=(game,scene,sprite,event,isweak)=>{
        C.applyVerticalWarp(sprite);
        sprite.timer--;
        if (C.manageHitableEvent(game,scene,sprite,event))
            sprite.remove();
        else
            if (sprite.collisions.wall || sprite.collisions.solidwall || !sprite.timer)
                C.turnIntoBubble(game,scene,sprite,isweak);
    }

    C.fireSprite=(game,scene,sprite,bullettype,playerMemory)=>{
        let bullet=game.addNewSprite(bullettype,sprite.x,sprite.y);
        bullet.bubbleType = playerMemory.bubbleType||playerMemory.defaultBubbleType;
        bullet.largeBubbleAnimation = sprite.animations.largeBubble;
        bullet.timer = Math.ceil(playerMemory.smallBubbleDistance/playerMemory.smallBubbleSpeed);
        return bullet;
    }

    C.fireBullet=(game,scene,sprite,bullettype,playerMemory)=>{
        let bullet=C.fireSprite(game,scene,sprite,bullettype,playerMemory);
        if (C.MEMORY.cheats.classicMode)
            bullet.setSpeedX(sprite.flipX?-playerMemory.smallBubbleSpeed:playerMemory.smallBubbleSpeed);
        else {
            if (game.controlIsDown(game.controls[sprite.playerId].down))
                bullet.setSpeedY(playerMemory.smallBubbleSpeed*C.SMALLBUBBLEDOWNRATIO)
            else if (game.controlIsDown(game.controls[sprite.playerId].up))
                bullet.setSpeedY(-playerMemory.smallBubbleSpeed)
            else
                bullet.setSpeedX(sprite.flipX?-playerMemory.smallBubbleSpeed:playerMemory.smallBubbleSpeed);
        }
        bullet.setAnimation(sprite.animations.smallBubble);
        return bullet;
    }
    
    C.gainLetter=(game,scene,id,letter)=>{
        let player=C.MEMORY.players[id];
        C.increaseCounter(game,scene,id,"gainLetter"+letter);
        if (!player.letters[letter]) {
            player.letters[letter]=true;
            player.lettersCount++;
            game.drawSimpleCell(game.cells.letterBubbles,letter,0,letter*game.cells.letterBubbles.frames[letter].height,C.LABELS.letters[id]);
            if (player.lettersCount == C.LETTERBUBBLESCOUNT) {
                C.MEMORY.yendorRoom=1;
                C.MEMORY.yendorRoomPlayer=id;
                game.playAudio(game.audio.gainallletters);
            } else game.playAudio(game.audio.gainletter);
        }
    }

    C.resetLetters=(game,scene,id)=>{
        let player=C.MEMORY.players[id];
        player.letters=[];
        player.lettersCount=0;
        game.clearImage(C.LABELS.letters[id]);
    }

    C.increasePlayerCombo=(game,scene,id)=>{
        let player=C.MEMORY.players[id];
        player.comboCount++;
        player.comboTimer=C.PLAYERCOMBOTIMER;
    }

    C.resetPlayerCombo=(game,scene,id)=>{
        let player=C.MEMORY.players[id];
        player.comboCount=0;
        player.comboTimer=0;
    }

    C.evaluatePlayerCombo=(game,scene,combo,combolimit)=>{
        if (combo>combolimit)
            C.addScheduledLetterBubbles(game,scene,combo-combolimit);
    }

    C.setHighScore=(game,scene,score)=>{
        C.HIGHSCORE=score;
        C.LABELS.highscoreValue=game.printImage(game.fonts.normal.normal,1,C.HIGHSCORE);
        C.HIGHSCOREVALUEX=Math.floor((C.SCREENWIDTH-C.LABELS.highscoreValue.width)/2);
    }

    C.setHighStage=(game,scene,stage,mode)=>{
        C.HIGHSTAGE=stage;
        C.HIGHSTAGETREASUREMODE=mode;
    }

    C.saveHighScore=(game,scene)=>{
        game.saveData("hiscore",C.HIGHSCORE);
    }

    C.saveHighStage=(game,scene)=>{
        game.saveData("highstage",C.HIGHSTAGE);
        game.saveData("highstagemode",C.HIGHSTAGETREASUREMODE);
        game.saveData("highstageday",C.DAY);
    }

    C.addScheduledLetterBubbles=(game,scene,amount)=>{
        C.MEMORY.scheduledLetterBubbles+=amount;
        if (C.MEMORY.scheduledLetterBubbles>C.MAXSCHEDULEDLETTERS)
            C.MEMORY.scheduledLetterBubbles = C.MAXSCHEDULEDLETTERS;
    }

    C.setScore=(game,scene,player,score)=>{
        let playerMemory=C.MEMORY.players[player];
        for (let i=playerMemory.extraLifeAt;i<C.EXTRALIFEAT.length;i++) {
            if (score>=C.EXTRALIFEAT[i]) {
                C.gainLife(game,scene,player);
                playerMemory.extraLifeAt++;
            } else break;
        }
        playerMemory.score = score;
        C.LABELS.score[player] = game.printImage(game.fonts.normal.normal, 1, score);
        playerMemory.scoreX=C.SCOREXPOSITION[player]-C.LABELS.score[player].width;
        if (!C.MEMORY.cheats.noHighScore && (score>C.HIGHSCORE)) C.setHighScore(game,scene,score);
    }

    C.setLives=(game,scene,player,lives)=>{
        let
            image = C.LABELS.lives[player],
            memory = C.MEMORY.players[player];
        memory.lives = lives;
        game.clearImage(image);
        for (let i=0;i<lives;i++)
            if (player)
                game.drawSimpleCell(game.cells.lives,memory.livesSymbol,C.LIVES2STARTX-(i*C.LIVESCELLWIDTH),0,image);
            else
                game.drawSimpleCell(game.cells.lives,memory.livesSymbol,i*C.LIVESCELLWIDTH,0,image);
    }

    C.gainLife=(game,scene,player)=>{
        game.playAudio(game.audio.extralife);
        C.setLives(game,scene,player,C.MEMORY.players[player].lives+1)
    }

    C.addScore=(game,scene,player,score)=>{
        C.setScore(game,scene,player,C.MEMORY.players[player].score+score);
    }

    C.allPlayersAddScore=(game,scene,score)=>{
        C.MEMORY.players.forEach((player,p)=>{
            if (player.isInGame && !player.isDead)
                C.addScore(game,scene,p,score);
        })
    }

    C.applyVerticalWarp=(sprite)=>{
        if (sprite.y>224)
            sprite.setY(sprite.y-224);
        if (sprite.y<-8)
            sprite.setY(232+sprite.y);
    }

    C.setSanityIntensity=(game,scene,intensity)=>{
        if (intensity<0) intensity=0;
        if (intensity>1) intensity=1;
        C.MEMORY.glitchIntensity=intensity;
        game.setMusicVolume(0.3*intensity);
        if (intensity == 1) {
            if (!game.audioIsEnded(game.audio.whitenoise))
                game.stopAudio(game.audio.whitenoise);
        } else {
            let volume=0.9-0.9*intensity;
            if (game.audioIsEnded(game.audio.whitenoise))
                game.playAudio(game.audio.whitenoise,true,volume);
            else
                game.setAudioVolume(game.audio.whitenoise,volume);
        }
    }

    C.spawnDeath=(game,scene,deathtype)=>{
        game.getSpritesWithTag("player").forEach((player,p)=>{
            let death=game.addNewSprite(deathtype);
            death.follow=player.playerId;
            switch (player.playerId) {
                case 0:{
                    death.setX(16);
                    break;
                }
                case 1:{
                    death.setX(C.SCREENWIDTH-32);
                    death.setFlipX(true);
                    break;
                }
            }
        })
    }

    C.spawnSpecialBubble=(game,scene,sprite,model,side)=>{
        let bubble = game.addNewSprite(scene.sprites.largeBubble,sprite.x,sprite.y);
        bubble.onBubblePopped = model.onBubblePopped;
        if (model.isSpecial) bubble.addTag("specialbubble");
        if (model.set) model.set.forEach(set=>bubble[set]=true);
        bubble.setAnimation(model.animation);
        if (side) {
            bubble.setSpeedY(-bubble.speedY);
            bubble.checkside="bottom";
        }
        return bubble;
    }

    C.fixXSprite=(x)=>{
        if (x<16)
            return 16;
        else if (x>C.SCREENWIDTH-32)
            return C.SCREENWIDTH-32;
        else
            return x;
    }

    C.scatterAround=(game,scene,sprite)=>{
        let scatter = game.addNewSprite(scene.sprites.scatter,C.fixXSprite(sprite.x),sprite.y);
        scatter.isCagedEnemy = sprite.isCagedEnemy;
        scatter.onDie = sprite.onDie||sprite.properties.onDie;
        scatter.setAnimation(sprite.animationOnScatter||sprite.animations[sprite.mode].stunned);
        sprite.remove();
        game.playAudio(game.audio.kill);
        return scatter;
    }

    C.killEnemy=(game,scene,sprite,combo)=>{
        let scattered = C.scatterAround(game,scene,sprite);
        if (scattered.onDie && scattered.onDie.spawnBonusSequence) {
            let
                bonus = combo >= scattered.onDie.spawnBonusSequence.length ? scattered.onDie.spawnBonusSequence[scattered.onDie.spawnBonusSequence.length-1] : scattered.onDie.spawnBonusSequence[combo];
            scattered.onDie = { spawnBonus: bonus };
        }
        return scattered;
    }

    C.killAllEnemies=(game,scene,normalbonus,bubbledbonus)=>{
        game.getSpritesWithTagCopy("enemy").forEach(enemy=>{
            let scatter=C.scatterAround(game,scene,enemy);
            scatter.onDie={ spawnBonus:normalbonus };
        });
        game.getSpritesWithTagCopy("largebubble").forEach(bubble=>{
            if (bubble.tags.toclear) {
                let scatter=C.scatterAround(game,scene,bubble);
                scatter.onDie={ spawnBonus:bubbledbonus };
                bubble.remove();
            }
        });
    }

    C.removeAllEnemyBullets=(game,scene)=>{
        game.getSpritesWithTagCopy("enemybullet").forEach(enemy=>{
            game.addNewSprite(scene.sprites.disappear,enemy.x,enemy.y);
            enemy.remove();
        });
    }

    C.removeAllSpawnPoints=(game,scene)=>{
        game.getSpritesWithTagCopy("spawnpoint").forEach(point=>{
            point.remove();
        });
    }

    C.removeAllBonuses=(game,scene)=>{
        game.getSpritesWithTagCopy("bonus").forEach(bonus=>{
            game.addNewSprite(scene.sprites.disappear,bonus.x,bonus.y);
            bonus.remove();
        });
    }

    C.removeAllEnemies=(game,scene)=>{
        game.getSpritesWithTagCopy("enemy").forEach(enemy=>{
            game.addNewSprite(scene.sprites.disappear,enemy.x,enemy.y);
            enemy.remove();
        });
        game.getSpritesWithTagCopy("largebubble").forEach(bubble=>{
            if (bubble.tags.toclear) {
                game.addNewSprite(scene.sprites.disappear,bubble.x,bubble.y);
                bubble.remove();
            }
        });
    }

    C.endBossBattle=(game,scene)=>{
        C.removeAllEnemyBullets(game,scene);
        C.removeAllSpawnPoints(game,scene);
        C.removeAllBonuses(game,scene);
        C.MEMORY.players.forEach(player=>{
            C.playerResetFireMode(game,scene,player.sprite,player);
        });
        C.allPlayersAddScore(game,scene,C.BONUSBOSS);
    }

    C.removeAll=(game,scene)=>{
        C.removeAllEnemies(game,scene);
        C.removeAllEnemyBullets(game,scene);
    }

    C.spawnBonus=(game,scene,x,y,bonusid,bonusstage,bonuspoints)=>{
        let
            bonusData = C.RND.randomElement(C.BONUSES[bonusid]);
            bonus = game.addNewSprite(scene.sprites.bonus,x,y);
        bonus.timer=bonusData.timer;
        bonus.setFrame(bonusData.frame);
        bonus.bonusData = bonusData;
        bonus.points=bonuspoints||bonusData.points;
        if (bonusstage) {
            bonus.setSpeedY(0);
            bonus.setScale(0);
            bonus.addTag("bonusstage");
        }
        return bonus;
    }

    C.spawnGiantBonus=(game,scene,bonusid,bonuspoints)=>{
        let
            bonusData = C.RND.randomElement(C.GIANTBONUSES[bonusid]);
            bonus = game.addNewSprite(scene.sprites.giantBonus);
        bonus.timer=bonusData.timer;
        bonus.setFrame(bonusData.frame);
        bonus.bonusData = bonusData;
        bonus.points=bonuspoints||bonusData.points;
        return bonus;
    }

    C.spawnMapBonus=(game,scene,x,y,bonusid,toclear)=>{
        let bonus=C.spawnBonus(game,scene,x,y,bonusid);
        bonus.setCollisions();
        bonus.setSpeedY(0);
        bonus.setLogicEnabled(false);
        bonus.addTag("scrolling");
        if (toclear) bonus.addTag("toclear");
    }

    C.keepInRange=(value,min,max)=>{
        if (value<min) return min;
        else if (value>max) return max;
        else return value;
    }

    C.addPopupText=(game,scene,image,sprite)=>{
        let popup = game.addNewSprite(scene.sprites.popupText,~~(sprite.x-((image.width-sprite.width)/2)),sprite.y);
        popup.image = image;
    }

    C.checkEvery=(counter, time)=>{
        return counter % time == 0;
    }

    C.checkBlink=(counter, speed)=>{
        return Math.floor(counter / speed)%2;
    }

    C.removeBackpack=(game,scene,sprite)=>{
        if (sprite && sprite.backpack) {
            sprite.backpack.state.removeBackpack(game,scene,sprite.backpack);
            sprite.backpack=0;
        }
    }

    C.playerResetFireMode=(game,scene,sprite,playerMemory)=>{
        playerMemory.lockSide=playerMemory.defaultLockSide;
        playerMemory.fireHold=playerMemory.defaultFireHold;
        playerMemory.fireMode=playerMemory.defaultFireMode;
        playerMemory.canSquish=playerMemory.defaultCanSquish;
        playerMemory.canDropDown=playerMemory.defaultCanDropDown;
        playerMemory.bulletCount=0;
        C.removeBackpack(game,scene,sprite);
    }

    C.playerBlowedBubble=(game,scene,sprite)=>{

        let playerMemory=C.MEMORY.players[sprite.playerId];
        
        C.increaseCounter(game,scene,sprite.playerId,"bubblesBlown");
        if (playerMemory.bonusPerBlow) C.addScore(game,scene,sprite.playerId,playerMemory.bonusPerBlow);

        if (playerMemory.bulletsCount) {
            playerMemory.bulletsCount--;
            if (!playerMemory.bulletsCount) C.playerResetFireMode(game,scene,sprite,playerMemory);
        }
    }

    C.markPlayerAsAlive=(game,scene,p)=>{
        let player=C.MEMORY.players[p];
        player.isInGame=true;
        player.lastStage=C.MEMORY.stage;
        player.isDead=false;
        player.hasPlayed=true;
    }

    C.resetStageTimer=(game,scene)=>{
        C.MEMORY.stageTimer=0;
        C.setEnemiesAngry(game,scene,false);
        game.playMusic(C.MEMORY.stageMusic);
        game.getSpritesWithTagCopy("death").forEach(death=>{
            death.onReset(game,scene,death);
        });
    }

    C.killedPlayer=(game,scene,p)=>{
        let player=C.MEMORY.players[p];
        player.comboCount=0;
        player.comboTimer=0;
        player.moveFast=0;
        player.firingAnimation=player.defaultFiringAnimation;
        player.bonusPerBlow=0;
        player.bonusPerJump=0;
        player.bonusPerMove=0;
        player.smallBubbleSpeed = C.SMALLBUBBLESPEED;
        player.smallBubbleDistance=C.SMALLBUBBLEDISTANCE;
        player.canCutJump=player.defaultCanCutJump;
        player.bulletCount=0;
        player.bubbleType=0;
        C.playerResetFireMode(game,scene,0,player);
        // Global counters
        C.MEMORY.counters.stagesClearedNoDie=0;
        // Reset stage timer
        C.resetStageTimer(game,scene);
    }

    C.resetPlayer=(game,scene,p)=>{
        let player=C.MEMORY.players[p];
        player.extraLifeAt=0;
        C.setScore(game,scene,p,0);
        C.setLives(game,scene,p,player.startingLives);
        C.killedPlayer(game,scene,p);
        // Per-play counters
        player.skippedRules=[];
        player.lockSide=player.defaultLockSide;
        player.fireHold=player.defaultFireHold;
        player.fireMode=player.defaultFireMode;
        player.distanceWalked=0;
        player.drownedEnemies=0;
        player.boltedEnemies=0;
        player.balledEnemies=0;
        player.burnedEnemies=0;
        player.bonusFromCagedEnemy=0;
        player.bubblesBlown = 0;
        player.regularBubblesPopped = 0;
        player.waterBubblesPopped = 0;
        player.fireBubblesPopped = 0;
        player.boltBubblesPopped = 0;
        player.wandsCollected=0;
        player.specialItemsCollected=0;
        player.swordBoltCollected=0;
        player.swordFloodCollected=0;
        player.necklaceExplosionCollected=0;
        player.tomesCollected=0;
        player.timesWarped=0;
        player.bonusStageCollected=0;
        player.hurryUpAppeared=0;
        player.clocksCollected=0;
        player.normalCollected=0;
        player.scrollsCollected=0;
        player.jumps = 0;
        player.longDistanceWalked = 0;
        player.firefasterCollected = 0;
        player.firerapidCollected = 0;
        player.firefartherCollected = 0;
        player.gainLetter0 = 0;
        player.gainLetter1 = 0;
        player.gainLetter2 = 0;
        player.gainLetter3 = 0;
        player.gainLetter4 = 0;
        player.gainLetter5 = 0;
    }

    C.checkCounter=(game,scene,p,counter,counters)=>{
        if (!counters) counters=C.MEMORY.players[p];
        // console.log("#"+(p+1),counter,":",counters[counter]);
        if (C.BONUSESRULES[counter])
            C.BONUSESRULES[counter].forEach(rule=>{
                if ((counters.skippedRules.indexOf(rule)==-1) && (C.MEMORY.counters.skippedRules.indexOf(rule)==-1)) {
                    let apply=true;
                    if (rule.ifEqual) apply&=counters[counter]==rule.ifEqual;
                    if (rule.ifGreaterEqual) apply&=counters[counter]>=rule.ifGreaterEqual;
                    if (apply) {
                        if (rule.thenScheduleBonus) {
                            C.scheduleBonus(game,scene,rule.thenScheduleBonus);
                            // console.log(" \\_ SCHEDULED:",rule.thenScheduleBonus);
                        }
                        if (rule.thenSkipRule)
                            counters.skippedRules.push(rule);
                        if (rule.thenSkipGlobalRule)
                            C.MEMORY.counters.skippedRules.push(rule);
                        if (rule.thenResetCounter)
                            counters[counter]=0;
                    }
                }
            })
    }

    C.increaseCounter=(game,scene,p,counter,counters,by)=>{
        if (!by) by=1;
        if (!counters) counters=C.MEMORY.players[p];
        counters[counter]+=by;
        // console.log(counter,counters[counter]);
        C.checkCounter(game,scene,p,counter,counters);
    }

    C.increaseAllPlayersCounter=(game,scene,counter)=>{
        C.MEMORY.players.forEach((player,p)=>{
            if (player.isInGame && !player.isDead)
                C.increaseCounter(game,scene,p,counter);
        })
    }

    C.increaseGlobalCounter=(game,scene,counter)=>{
        C.increaseCounter(game,scene,-1,counter,C.MEMORY.counters);
    }

    C.setGlobalCounter=(game,scene,counter,value)=>{
        C.MEMORY.counters[counter]=value;
        C.checkCounter(game,scene,-1,counter,C.MEMORY.counters);
    }

    C.spawnPlayer=(game,scene,p)=>{
        let player=C.MEMORY.players[p];
        if (!C.MEMORY.cheats.unlimitedLives && !(C.DEBUG.enabled && C.DEBUG.unlimitedLives))
            C.setLives(game,scene,p,player.lives-1);
        C.markPlayerAsAlive(game,scene,p);
        C.resetPlayerCombo(game,scene,p);
        player.sprite=game.addNewSprite(scene.sprites.player, player.startX,C.PLAYERSTARTY);
        player.sprite.setFlipX(C.PLAYERFLIPX[p]);
        player.sprite.playerId = p;
        player.sprite.animations=C.PLAYERSKINS[player.skin];
        player.sprite.invulnerability=C.PLAYERSPAWNINVULNERABILITYTIMER;
    }

    C.joinPlayer=(game,scene,p)=>{
        let playerMemory = C.MEMORY.players[p];
        scene.pausedskip=2;
        playerMemory.isInGame = true;
        C.MEMORY.credits--;
        C.resetPlayer(game,scene,p);
        C.resetContinueTimer();
        C.spawnPlayer(game,scene,p);
        C.setLives(game,scene,p,playerMemory.startingLives);
        C.increaseGlobalCounter(game,scene,"timesJoined");
    }

    C.resetContinueTimer=(game,scene)=>{
        C.MEMORY.continueTime=9;
        C.MEMORY.continueTimer=C.ONESEC;
    }

    C.showIdleGui=(game,scene,force)=>{
        game.drawSimpleImage(C.LABELS.highscore, C.HIGHSCOREX, 0);
        game.drawSimpleImage(C.LABELS.highscoreValue, C.HIGHSCOREVALUEX,8);
        C.MEMORY.players.forEach((player,p)=>{
            if (player.isReal&&(player.hasPlayed||force)) {
                game.drawSimpleImage(C.LABELS.up[p], C.GUIUPX[p],0);
                game.drawSimpleImage(C.LABELS.score[p], player.scoreX,8);
            }
        });
    }

    C.gotoScene=(game,scene,destscene)=>{
        game.setScene(game.scenes.blackscreen).destinationScene=destscene;
    }

    C.bulletLogic=(game,scene,sprite,audio,bonus,by,counter)=>{
        if (sprite.collisions.hitable) {
            let bulleted=false;
            sprite.collisions.hitable.all.forEach(collision=>{
                if (collision.object.state.onBulleted) {
                    bulleted=true;
                    collision.object.state.onBulleted(game,scene,collision.object,audio,bonus,by,counter);
                }
            });
            return bulleted;
        }
    }

    C.commonEnemyLogic=(game,scene,sprite)=>{
        if (C.MEMORY.panicMode) sprite.mode=1;
    }

    C.setSkipStages=(game,scene,stages)=>{
        let destStage=C.MEMORY.stage+stages;
        C.MEMORY.skipStages=stages;
        if (C.MEMORY.treasureMode) {
            if (destStage>C.LASTSTAGE)
            C.MEMORY.skipStages=C.LASTSTAGE-C.MEMORY.stage;
        } else {
            if (C.MEMORY.nextStageDirection == 1) {
                if (destStage>=C.HALFSTAGE)
                C.MEMORY.skipStages=C.HALFSTAGE-C.MEMORY.stage-1;
            } else {
                if (destStage>=C.LASTSTAGE)
                C.MEMORY.skipStages=C.LASTSTAGE-C.MEMORY.stage-1;
            }
        }
        if (C.MEMORY.skipStages<=0) C.MEMORY.skipStages=0;
        else C.setSanityIntensity(game,scene,1);
    }

    C.pauseGame=(game,scene,playerid)=>{
        if (!scene.paused) {
            scene.paused=true;
            scene.pausedoption=0;
            scene.pausedsymbol=playerid;
            scene.pausedtimer=0;
            game.stopEffects();
            game.stopMusic(true);
        }
    }

    C.unpauseGame=(game,scene,playerid)=>{
        if (scene.paused) {
            scene.paused=false;
            game.replayMusic();
        }
    }

    C.mainGameCycle=(game,scene)=>{
        let isSomeonePlaying=false;
        C.MEMORY.players.forEach((player,p)=>{
            if (player.isInGame) {
                if (player.isDead)
                    if (player.lives>0) {
                        isSomeonePlaying=true;
                        C.spawnPlayer(game,scene,p);
                    } else player.isInGame = false;
                else
                    isSomeonePlaying = true;
            } else if (C.MEMORY.credits && game.controlIsHit(game.controls[p].start)) {
                C.joinPlayer(game,scene,p);
                isSomeonePlaying=true;
            }
        });
        C.MEMORY.isSomeonePlaying = isSomeonePlaying;
    }

    
    C.initializeGame=(game,scene)=>{
        C.MEMORY={
            cheats:{},
            hauntedMode:0,
            glitchIntensity:0,
            panicMode:0,
            playMinigame:0,
            showMinigame:0,
            enemyMap:0,
            hurryUp:0,
            freezeEnemies:0,
            explodeStage:0,
            explodeColor:0,
            explodeBonusFree:0,
            explodeBonusCaged:0,
            bonusStage:0,
            bonusStageTimer:0,
            bonusStageBonus:0,
            bossStage:0,
            floodStage:0,
            secretsRoom:0,
            yendorRoom:0,
            yendorRoomPlayer:0,
            stage:0,
            skipStages:0,
            nextStageDirection:1,
            credits:C.MEMORY?C.MEMORY.credits:0,
            endBubblesSpawn:0,
            endBubblesSpawnPoints:0,
            endSpawnGiantBonus:0,
            treasureMode:false,
            isSomeonePlaying:true,
            scheduledBonuses:[],
            scheduledLetterBubbles:0,
            scheduledBonusesTimer:C.SPAWNBONUSTIMER,
            statusText:[],
            players:[],
            secretsBag:[],
            stageMusic:0,
            stageFastMusic:0,
            endingSet:"normalending",
            counters:{
                skippedRules:[],
                stagesClearedNoDie:0,
                timesJoined:0,
                currentStage:0,
                yendorAmuletCollected:0
            }
        };

        C.resetSecrets();

        if (C.DEBUG.enabled) {
            if (C.DEBUG.credits !== undefined) C.MEMORY.credits=C.DEBUG.credits;
            if (C.DEBUG.startingStage) C.MEMORY.stage=C.DEBUG.startingStage;
            if (C.DEBUG.treasureMode) C.MEMORY.treasureMode=C.DEBUG.treasureMode;
            if (C.DEBUG.bonus) C.DEBUG.bonus.forEach(bonus=>C.scheduleBonus(game,scene,bonus,true));
        }

        for (let p=0;p<C.PLAYERSCOUNT;p++) {
            // Per-game counters
            C.MEMORY.players.push({
                startX:C.PLAYERSTARTX[p],
                startingLives:C.DEBUG.enabled && (C.DEBUG.startingLives !== undefined) ? C.DEBUG.startingLives : C.STARTINGLIVES,
                livesSymbol:p,
                isReal:true,
                isInGame:false,
                hasPlayed:false,
                lastStage:0,
                livesLost:0,
                skippedRules:[],
                yendorAmuletCollected:0,
                defaultBubbleType:0,
                defaultFireMode:0,
                defaultFireHold:false,
                defaultLockSide:false,
                defaultFiringAnimation:"fire",
                defaultCanSquish:false,
                defaultCanDropDown:false,
                defaultCanCutJump:false,
                skin:p
            });
            C.resetPlayer(game,scene,p);
            C.resetLetters(game,scene,p);
        }

    }

    C.resetSecrets=(game,scene)=>{
        C.MEMORY.secretsBag.length=0;
        for (let i=0;i<C.SECRETS.length;i++)
        C.MEMORY.secretsBag.push(i);
    }

    C.getNextSecret=(game,scene)=>{
        if (!C.MEMORY.secretsBag.length) C.resetSecrets();
        return C.SECRETS[C.RND.randomElementDraw(C.MEMORY.secretsBag)]
    }

    C.removeOldStage=(game,scene)=>{
        game.getSpritesWithTag("oldelements").forEach(sprite=>{
            sprite.remove();
        });
    }

    C.freezeStage=(game,scene,freeze)=>{
        game.getSpritesWithTag("stagesprite").forEach(sprite=>{
            if (freeze) {
                sprite.oldLogicEnabled=sprite.logicEnabled;
                sprite.oldPhysicsEnabled=sprite.physicsEnabled;
                sprite.oldAnimationEnabled=sprite.animationEnabled;
                sprite.setLogicEnabled(false);
                sprite.setPhysicsEnabled(false);
                sprite.setAnimationEnabled(false);
            } else {
                if (sprite.oldLogicEnabled !== undefined) {
                    sprite.setLogicEnabled(sprite.oldLogicEnabled);
                    sprite.setPhysicsEnabled(sprite.oldPhysicsEnabled);
                    sprite.setAnimationEnabled(sprite.oldAnimationEnabled);
                    delete sprite.oldLogicEnabled;
                }
            }
        });
    }

    C.setEnemiesAngry=(game,scene,angry)=>{
        let mode=angry?1:C.MEMORY.panicMode;
        game.getSpritesWithTag("enemy").forEach(enemy=>{
            enemy.mode=mode;
        });
    }

    C.startStage=(game,scene,name,attract)=>{

        C.removeOldStage(game,scene);

        if (scene.stage) {

            C.MEMORY.stageMusic = attract? 0 : game.audio.musicstage;
            C.MEMORY.stageFastMusic = attract? 0 : game.audio.musicstagefast;
            C.MEMORY.panicMode = C.MEMORY.cheats.panicMode ? 1 : 0;
            C.MEMORY.stageTimeFrames = 0;
            C.MEMORY.stageTimeSeconds = 0;

            C.setGlobalCounter(game,scene,"currentStage",scene.stage.id);

            scene.stage.enemies.forEach(enemy=>{
                let
                    enemyid=C.ENEMIESMAPS[enemy.type][C.MEMORY.enemyMap];
                    sprite=game.addNewSprite(scene.sprites[enemyid], enemy.x, 0);
                sprite.setFlipX(enemy.flipX).setState(sprite.states.preparing);
                sprite.destY=16+enemy.y;

                switch (enemyid) {
                    case "medusa":
                    case "bat":{
                        sprite.setSpeedX(enemy.setSpeedX);
                        sprite.setSpeedY(enemy.setSpeedY);
                        break;
                    }
                }

            });

            if (scene.stage.scheduleBonus)
                C.scheduleBonus(game,scene,scene.stage.scheduleBonus);

            if (scene.stage.spawnpoints) {

                scene.stage.spawnpoints.bonus.forEach(spawnpoint=>{
                    game.addNewSprite(scene.sprites.bonusSpawnPoint, spawnpoint.x, spawnpoint.y+16);
                });

                C.MEMORY.stageBubbles = scene.stage.spawnpoints.specialBubbles.length ? 1 : 0;
                
            } else C.MEMORY.stageBubbles=[];

            scene.roundName = scene.stage.name || "STAGE";
            scene.roundShortName = scene.stage.shortName || "";
            scene.roundShortNameX = scene.stage.shortNameX || 0;

        } else {

            scene.roundName = name;
            scene.roundShortName = "";
            scene.roundShortNameX = 0;

        }

        C.MEMORY.freezeEnemies=0;
        C.MEMORY.specialBubbles=scene.stage.specialBubbles;
        C.MEMORY.specialBubblesAmount=scene.stage.specialBubblesAmount;
        C.MEMORY.letterBubbles=scene.stage.letterBubbles;

        C.MEMORY.players.forEach((player,p)=>{
            if (player.isInGame) {
                C.markPlayerAsAlive(game,scene,p);
                C.resetPlayerCombo(game,scene,p);
                player.sprite=game.addNewSprite(scene.sprites.player, player.startX);
                player.sprite.setFlipX(C.PLAYERFLIPX[p]);
                player.sprite.playerId = p;
                player.sprite.animations=C.PLAYERSKINS[player.skin];
                player.sprite.setState(player.sprite.states.preparing);
            }
        })
            
        scene.presenting = !C.MEMORY.skipStages;
        C.MEMORY.stageEnded = false;
        scene.timer = 0;
        scene.roundNameX = Math.floor((C.SCREENWIDTH-(scene.roundName.length*(game.fonts.normal.outline.letterWidth+game.fonts.normal.outline.letterSpacing)))/2);
        C.resetStageTimer(game,scene);
    }

    C.clearStageSprites=(game,scene)=>{
        game.getSpritesWithTagCopy("stagesprite").forEach(sprite=>{
            sprite.remove();
        });

        game.getSpritesWithTag("tilemap").forEach(sprite=>{
            sprite.addTag("oldelements");
        });

        game.getSpritesWithTag("scrolling").forEach(sprite=>{
            sprite.addTag("oldelements");
        });

        C.setSanityIntensity(game,scene,1);
    }

    C.prepareStageChange=(game,scene,direction,tilemap)=>{

        switch (direction) {
            case 1:{
                tilemap.setY(C.SCREENHEIGHT);
                scene.transitionTimer=tilemap.height/4;
                scene.transitionDirection=-4;
                break;
            }
            case 2:{
                tilemap.setY(16-tilemap.height);
                scene.transitionTimer=tilemap.height/4;
                scene.transitionDirection=4;
                break;
            }
            default:{
                tilemap.setY(16);
                scene.transitionTimer=1;
                scene.transitionDirection=0;
                break;
            }
        }
    }

    C.cancelFreeze=(game,scene,sprite)=>{
        sprite.frozen=false;
        sprite.setLogicEnabled(true);
        sprite.setPhysicsEnabled(true);
        sprite.setAnimationEnabled(true);
    }

    C.enemyRestore=(game,scene,sprite)=>{
        sprite.addTag("hitable");
        sprite.addTag("killplayer");
        sprite.setVisible(true);
        sprite.changeAnimation(sprite.animations[sprite.mode].still);
        sprite.setState(sprite.states.default);
    }

    C.enemyChangeDirectionOnWall=(game,scene,sprite)=>{
        if (sprite.flipX) {
            if (sprite.collisions.left && (sprite.collisions.left.wall||sprite.collisions.left.solidwall))
                sprite.setFlipX(false);
        } else {
            if (sprite.collisions.right && (sprite.collisions.right.wall||sprite.collisions.right.solidwall))
                sprite.setFlipX(true);
        }
    }

    C.enemyWalking=(game,scene,sprite,movespeed)=>{
        C.applyVerticalWarp(sprite);
        if (sprite.collisions.bottom && (sprite.collisions.bottom.wall||sprite.collisions.bottom.solidwall)) {
            sprite.changeAnimation(sprite.animations[sprite.mode].walk);
            if (sprite.flipX)
                sprite.setSpeedX(-movespeed[sprite.mode]);
            else
                sprite.setSpeedX(movespeed[sprite.mode]);
            C.enemyChangeDirectionOnWall(game,scene,sprite);
            return true;
        } else {
            sprite.changeAnimation(sprite.animations[sprite.mode].fall);
            sprite.setSpeedX(0);
            sprite.resetJumpsCount=true;
            return false;
        }
    }

    C.enemyJumping=(game,scene,sprite,movespeed)=>{
        if (sprite.resetJumpsCount) {
            sprite.jumpsCount=C.ENEMYJUMPSCOUNT+C.RND.randomInteger(C.ENEMYJUMPSCOUNT);
            sprite.resetJumpsCount=false;
        }
        if (sprite.jumpsCount)
            if (sprite.collisions.bottom && (sprite.collisions.bottom.wall||sprite.collisions.bottom.solidwall)) {
                let under,under2,next,next2,speedx;
                if (sprite.flipX) {
                    under = scene.tilemap.getTileAtPixel(sprite.x-1,sprite.y+16);
                    under2 = scene.tilemap.getTileAtPixel(sprite.x-9,sprite.y+16);
                    next = scene.tilemap.getTileAtPixel(sprite.x-24,sprite.y+16);
                    next2 = scene.tilemap.getTileAtPixel(sprite.x-1,sprite.y+8);
                    speedx = -1;
                } else {
                    under = scene.tilemap.getTileAtPixel(sprite.x+16,sprite.y+16);
                    under2 = scene.tilemap.getTileAtPixel(sprite.x+24,sprite.y+16);
                    next = scene.tilemap.getTileAtPixel(sprite.x+40,sprite.y+16);
                    next2 = scene.tilemap.getTileAtPixel(sprite.x+16,sprite.y+8);
                    speedx = 1;
                }
                if ((!under || !under.tagsIndex.wall)&&(!under2 || !under2.tagsIndex.wall)&&(next && next.tagsIndex.wall)&&(!next2 || !next2.tagsIndex.wall)) {
                    sprite.jumpsCount--;
                    sprite.setSpeedX(speedx);
                    sprite.setState(sprite.states.smalljumping);
                    return false;
                } else return true;
            }
    }

    C.enemyFlying=(game,scene,sprite,speedx,speedy)=>{
        C.applyVerticalWarp(sprite);
        sprite.changeAnimation(sprite.animations[sprite.mode].flying);
        if (sprite.speedX<0) sprite.setSpeedX(-speedx[sprite.mode]);
        else sprite.setSpeedX(speedx[sprite.mode]);
        if (sprite.speedY<0) sprite.setSpeedY(-speedy[sprite.mode]);
        else sprite.setSpeedY(speedy[sprite.mode]);
        sprite.setFlipX(sprite.speedX<0);
    }

    C.enemyStart=(game,scene,sprite)=>{
        sprite.setPhysicsEnabled(true);
        sprite.removeTag("tostart");
        if (!sprite.mode) sprite.mode=C.MEMORY.panicMode;
    }

    C.floatingEnemyStart=(game,scene,sprite)=>{
        sprite.setAccelY(0);
        sprite.setAccelX(0);
    }

    C.walkingEnemyStart=(game,scene,sprite)=>{
        sprite.setAccelY(C.GRAVITY);
        sprite.setAccelX(0);
    }

    C.getFrontPlayer=(game,scene,sprite)=>{
        let found=false;
        game.getSpritesWithTag("player").forEach(player=>{
            if (Math.abs(sprite.y-player.y)<8)
                found=player;
        });
        return found;
    }

    C.goToStage=(game,scene,stage,direction)=>{

        C.clearStageSprites(game,scene);

        scene.stage = stage;
        
        scene.tilemap = game.addNewTilemap({
            tags:["tilemap","scrolling"],
            zIndex:C.TILEMAPZINDEX,
            map:scene.stage.map,
            cells:scene.stage.cells,
            tiles:[
                { char:" " },
                { char:"#", frame:0, tags:["wall"] },
                { char:"^", frame:1 },
                { char:"-", frame:0, tags:["ceilingwall"] },
                { char:"1", frame:2 },
                { char:"2", frame:3 },
                { char:"3", frame:4 },
                { char:"4", frame:5 }
            ]
        });

        C.prepareStageChange(game,scene, direction, scene.tilemap);
        
        return scene.tilemap;

    }

    C.goToTilemap=(game,scene,map,direction)=>{

        C.clearStageSprites(game,scene);

        C.MEMORY.stageEnded = true;
        C.MEMORY.specialBubbles = 0;
        C.MEMORY.letterBubbles = 0;
        scene.stage = 0;
        scene.presenting = 0;
        scene.timer = 0;
        scene.roundShortName = "";
        scene.roundShortNameX = 0;
        scene.roundName = "";
        scene.roundNameX = 0;

        scene.tilemap = game.addNewTilemap(map);

        C.prepareStageChange(game,scene,direction,scene.tilemap);

        return scene.tilemap;

    }

}