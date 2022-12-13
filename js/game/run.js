function gameRun() {

    let C={};

    loadResourcesEnvironment(C);

    let game = new Game({
        name:"ROGUEROGUE",
        maxScale:C.DEBUG.enabled?C.DEBUG.maxScale:0,
        frameSkip:10,
        fps:60,
        width:C.SCREENWIDTH,
        height:C.SCREENHEIGHT,
        pageBackgroundColor:"#000",
        backgroundColor:"rgb(16,24,32)",
        configure:{

            image:"logo.png",
            fontSize:"12px",
            color:"#fff",
            fontFamily:"sans-serif",
            notes:"You can also plug 1 or 2 game controllers to play.",
            credits:"By <a target='_blank' href='https://www.kesiev.com'>KesieV</a>, 2022 &dash; <a target='_blank' href='https://"+C.GAMEPAGE+"'>Play here</a> &dash; <a target='_blank' href='https://"+C.SOURCESPAGE+"'>Sources here</a>",

        },
        palette:loadResourcesPalette(C),
        fonts:loadResourcesFonts(C),
        audio:loadResourcesAudio(C),
        images:loadResourcesImages(C),
        watchKeys:[

            { id:0, label:"Up", subId:"up", keyCode:38, gamepad:{button:12, axisLesser:1, axisSensitivity:1} },
            { id:0, label:"Down", subId:"down", keyCode:40, gamepad:{button:13, axisGreater:1, axisSensitivity:1} },
            { id:0, label:"Left", subId:"left", keyCode:37, gamepad:{button:14, axisLesser:0, axisSensitivity:1} },
            { id:0, label:"Right", subId:"right", keyCode:39, gamepad:{button:15, axisGreater:0, axisSensitivity:1} },
            { id:0, label:"A (Jump)", subId:"a", keyCode:90, gamepad:{button:0, altButton:3 } },
            { id:0, label:"B (Fire)", subId:"b", keyCode:88, gamepad:{button:2, altButton:1 } },
            { id:0, label:"Start", subId:"start", keyCode:49, gamepad:{button:9, altButton:8 } },

            { id:1, label:"Up",subId:"up", keyCode:73, gamepad:{button:12, axisLesser:1, axisSensitivity:1} },
            { id:1, label:"Down",subId:"down", keyCode:75, gamepad:{button:13, axisGreater:1, axisSensitivity:1} },
            { id:1, label:"Left",subId:"left", keyCode:74, gamepad:{button:14, axisLesser:0, axisSensitivity:1} },
            { id:1, label:"Right",subId:"right", keyCode:76, gamepad:{button:15, axisGreater:0, axisSensitivity:1} },
            { id:1, label:"A (Jump)",subId:"a", keyCode:65, gamepad:{button:0, altButton:3 } },
            { id:1, label:"B (Fire)",subId:"b", keyCode:83, gamepad:{button:2, altButton:1 } },
            { id:1, label:"Start",subId:"start", keyCode:50, gamepad:{button:9, altButton:8 } },

        ]
    },game=>{

        let scenes={};

        gameLoadConst(game,C);
        gameLoadFunctions(game,C);
        gameLoadStagesGenerator(game,C);

        // Reset game & generate stages

        C.setStartingCredits(game,C);
        C.setHighScore(game,0,game.loadData("hiscore")||12500);
        if (game.loadData("highstageday")!=C.DAY)
            C.setHighStage(game,0,1,false);
        else
            C.setHighStage(game,0,game.loadData("highstage")||1,!!game.loadData("highstagemode"));
        
        C.STAGES=stagesGenerator(game,C.SEED,C);

        // Scenes

        gameLoadPlay(game,scenes,C);
        gameLoadStartings(game,scenes,C);
        gameLoadEndings(game,scenes,C);
        gameLoadEndgames(game,scenes,C);
        gameLoadTutorial(game,scenes,C);
        gameLoadAttract(game,scenes,C);
        gameLoadTransitions(game,scenes,C);
        
        // Player

        gameLoadPlayer(game,scenes.play,C);

        // Enemies

        gameLoadSkeleton(game,scenes.play,C);
        gameLoadGolem(game,scenes.play,C);
        gameLoadYeti(game,scenes.play,C);
        gameLoadGoblin(game,scenes.play,C);
        gameLoadBlob(game,scenes.play,C);
        gameLoadSnake(game,scenes.play,C);
        gameLoadBat(game,scenes.play,C);
        gameLoadMedusa(game,scenes.play,C);
        gameLoadDeath(game,scenes.play,C);

        // Bosses

        gameLoadDragon(game,scenes.play,C);
        
        // Bullets

        gameLoadEnemyBullets(game,scenes.play,C);
        gameLoadPlayerBullets(game,scenes.play,C);

        // Attacks

        gameLoadBubbles(game,scenes.play,C);
        gameLoadSnowballs(game,scenes.play,C);
        gameLoadDiamonds(game,scenes.play,C);
        gameLoadWaterTank(game,scenes.play,C);
        gameLoadBombs(game,scenes.play,C);
        gameLoadVacuum(game,scenes.play,C);
        gameLoadShotgun(game,scenes.play,C);

        // Effects

        gameLoadEffects(game,scenes.play,C);

        // Yendor's Chest!

        gameLoadYendorChest(game,scenes.play,C);

        // Bonus

        gameLoadBonus(game,scenes.play,C);

        // Minigames

        gameLoadMinigameCleyes(game,scenes.play,C);
        gameLoadMinigameSpacesleep(game,scenes.play,C);
        gameLoadMinigameNicobar(game,scenes.play,C);
        gameLoadMinigameArena(game,scenes.play,C);
        gameLoadMinigameCeiling(game,scenes.play,C);

        // Link tutorial and attract mode elements
        scenes.tutorial.sprites=scenes.play.sprites;
        scenes.attract.sprites=scenes.play.sprites;

        // Data integrity check

        C.integrityCheck(game,scenes,C);

        return scenes;
    });

    game.configure(document.body);
    
}
