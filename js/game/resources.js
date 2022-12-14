let loadResourcesEnvironment=(C)=>{

    C.DEBUG={
        enabled:false,
		// maxScale:2,
        // credits:9,
        // treasureMode:true,
        // startingStage:9,
        // skipIntro:true,
        // weakBoss:true,
        // shortGame:true,
        // midGame:true,
        cheats:{
            // classicMode:true
			// hauntedMode:true
        },
        // startingLives:0,
        // skin:9,
        // darkness:true,
        // unlimitedLives:true,
        // defaultFireMode:4,
        // defaultFireHold:true,
        // defaultLockSide:true,
        // defaultFiringAnimation:"fireFaster",
        // defaultCanSquish:true,
        // defaultCanCutJump:true,
        // bonus:["darkdemon"],
        // attractMode:true,
        // debrief:true,
        // tutorial:true,
        // treasureEnding:true,
        // yendorEnding:true,
        // specialBubbles:["poison"],
        // allLetters:true,
        // scheduledLetterBubbles:10000,
        // joinPlayer2:true,
        // minigame:"cleyes",
		/*
        _map:{
            enemies: [
                {
                    "type": "0",
                    "x": 106,
                    "y": 156,
                    "flipX": true,
                    "setSpeedX": -1,
                    "setSpeedY": -1
                },{
                "type": "1",
                "x": 112,
                "y": 32,
                "flipX": true,
                "setSpeedX": -1,
                "setSpeedY": -1
                },{
                "type": "2",
                "x": 176,
                "y": 56,
                "flipX": true,
                "setSpeedX": -1,
                "setSpeedY": -1
                },{
                    "type": "3",
                    "x": 106,
                    "y": 156,
                    "flipX": true,
                    "setSpeedX": -1,
                    "setSpeedY": -1
                },{
                    "type": "4",
                    "x": 196,
                    "y": 180,
                    "flipX": true,
                    "setSpeedX": -1,
                    "setSpeedY": -1
                },{
                    "type": "5",
                    "x": 196,
                    "y": 183,
                    "flipX": true,
                    "setSpeedX": -1,
                    "setSpeedY": -1
                },{
                    "type": "3",
                    "x": 106,
                    "y": 156,
                    "flipX": true,
                    "setSpeedX": -1,
                    "setSpeedY": -1
                },
                
            ],
            map:[
                "---------       --------------",
                "                              ",
                "              ##              ",
                "                              ",
                "  ##                          ",
                "                 #            ",
                "  ##  ##  ## #####  ##########",
                "                              ",
                "                              ",
                "                              ",
                "                              ",
                "                              ",
                "                 #            ",
                "   ##  ##  ##  ###            ",
                "                              ",
                "                              ",
                "                              ",
                "                              ",
                "                         #    ",
                "                         #####",
                "                              ",
                "                       #######",
                "                       #      ",
                "                       #      ",
                "                       #      ",
                "#########       ##############",
            ]
        },
		*/
    },
    C.GAMEPAGE="www.kesiev.com/roguerogue";
    C.SOURCESPAGE="github.com/kesiev/roguerogue";
    C.SCREENWIDTH = 256;
    C.SCREENHEIGHT = 224;
    C.HSCREENHEIGHT = C.SCREENHEIGHT/2;
    C.HSCREENWIDTH = C.SCREENWIDTH/2;
    
}

let loadResourcesPalette=(C)=>{
	return [

        [16,24,32,255],
        [240,240,220,255],
        [250,200,0,255],
        [16,200,64,255],
        [0,160,200,255],
        [210,64,64,255],
        [160,105,75,255],
        [115,100,100,255]

    ];
}

let loadResourcesImages=(C)=>{
	return [

	    {
	        id:"minigames",
	        src:"sprites/minigames.png",
	        cells:{
	            minigameLargeBush:{
	                cut:true,
	                frames:[
	                    {x1:0,y1:0,width:40, height:40}
	                ]
	            },
	            minigameLargeDot:{
	                cut:true,
	                frames:[
	                    {x1:40,y1:0,width:40, height:40}
	                ]
	            },
	            minigameLargePin:{
	                cut:true,
	                frames:[
	                    {x1:80,y1:0,width:40, height:40}
	                ]
	            },
	            minigameLargeBushPhotographer:{
	                cut:true,
	                frames:[
	                    {x1:120,y1:0,width:40, height:40}
	                ]
	            },
	            minigameLargeFlash:{
	                cut:true,
	                frames:[
	                    {x1:160,y1:0,width:40, height:40}
	                ]
	            },
	            minigameShadow:{
	                frames:[
	                    {x1:0,y1:40,width:16, height:16}
	                ]
	            },
	            minigameSpaceship:{
	                frames:[
	                    { macro:"rectangles", x1:16, y1:40, width:24, height:16, framesCount:2 }
	                ]
	            },
	            minigameBaseTiles:{
	                frames:[
	                    { macro:"rectangles", x1:64, y1:40, width:8, height:8, framesCount: 8 }
	                ]
	            },
	            minigameLargeCursors:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:56, width:32, height:32, framesCount:2 }
	                ]
	            },
	            minigameBarTiles:{
	                frames:[
	                    { macro:"rectangles", x1:64, y1:56, width:8, height:8, framesCount: 14 }
	                ]
	            },
	            minigameArenaTiles:{
	                frames:[
	                    { macro:"rectangles", x1:64, y1:64, width:8, height:8, framesCount: 11 }
	                ]
	            },
	            minigamePuzzleTiles:{
	                frames:[
	                    { macro:"rectangles", x1:128, y1:72, width:8, height:8, framesCount: 4 }
	                ]
	            },
	            minigameTiles:{
	                frames:[
	                    { macro:"rectangles", x1:64, y1:72, width:16, height:16, framesCount: 4 }
	                ]
	            },
	        }
	    },
	    {
	        id:"title",
	        src:"sprites/title.png",
	        cells:{
	            panel:{
	                frames:[
	                    {x1:0,y1:0,width:202, height:111}
	                ]
	            },
	            rogue:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:111, width:137, height:44, frames: [ 0, 1 ] }
	                ]   
	            },
	            kesiev:{
	                frames:[
	                    {x1:0,y1:155,width:75, height:18}
	                ]
	            }
	        }
	    },
	    {
	        id:"statues",
	        src:"sprites/statues.png",
	        cells:{
	           statues:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:0, width:64, height:64, framesCount:7 }
	                ]   
	            }
	        }
	    },
	    {
	        id:"title",
	        src:"sprites/players.png",
	        cells:{

	            // Player 1

	            player1Walking:{
	            frames:[
	                { macro:"rectangles", x1:0, y1:0, width:16, height:16, frames: [ 0, 1, 2, 3 ] }
	                ]
	            },
	            player1Still:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:0, width:16, height:16, frames: [ 4 ] }
	                ]
	            },
	            player1Dead:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:0, width:16, height:16, frames: [ 21 ] }
	                ]
	            },
	            player1Jumping:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:0, width:16, height:16, frames: [ 5, 6 ] }
	                ]
	            },
	            player1Falling:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:0, width:16, height:16, frames: [ 7, 8 ] }
	                ]
	            },
	            player1Firing:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:0, width:16, height:16, frames: [ 9, 10, 11, 12 ] }
	                ]
	            },
	            player1SmallBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:0, width:16, height:16, frames: [ 13 ] }
	                ]
	            },
	            player1LargeBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:0, width:16, height:16, frames: [ 14 ] }
	                ]
	            },
	            player1Front:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:0, width:16, height:16, frames: [ 15,16 ] }
	                ]
	            },
	            player1HandUp:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:0, width:16, height:16, frames: [ 17 ] }
	                ]
	            },
	            player1Transformed:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:0, width:16, height:16, frames: [ 18 ] }
	                ]
	            },
	            player1Happy:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:0, width:16, height:16, frames: [ 19, 20 ] }
	                ]
	            },
	            player1Stunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:0, width:16, height:16, frames: [ 22 ] }
	                ]
	            },
	            
	            // Player 2

	            player2Walking:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:16, width:16, height:16, frames: [ 0, 1, 2, 3 ] }
	                ]
	            },
	            player2Still:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:16, width:16, height:16, frames: [ 4 ] }
	                ]
	            },
	            player2Dead:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:16, width:16, height:16, frames: [ 21 ] }
	                ]
	            },
	            player2Jumping:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:16, width:16, height:16, frames: [ 5, 6 ] }
	                ]
	            },
	            player2Falling:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:16, width:16, height:16, frames: [ 7, 8 ] }
	                ]
	            },
	            player2Firing:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:16, width:16, height:16, frames: [ 9, 10, 11, 12 ] }
	                ]
	            },
	            player2SmallBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:16, width:16, height:16, frames: [ 13 ] }
	                ]
	            },
	            player2LargeBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:16, width:16, height:16, frames: [ 14 ] }
	                ]
	            },
	            player2Front:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:16, width:16, height:16, frames: [ 15,16 ] }
	                ]
	            },
	            player2HandUp:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:16, width:16, height:16, frames: [ 17 ] }
	                ]
	            },
	            player2Transformed:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:16, width:16, height:16, frames: [ 18 ] }
	                ]
	            },
	            player2Happy:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:16, width:16, height:16, frames: [ 19, 20 ] }
	                ]
	            },
	            player2Stunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:16, width:16, height:16, frames: [ 22 ] }
	                ]
	            },

	            // Poo

	            pooWalking:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:32, width:16, height:16, frames: [ 0, 1, 2, 3 ] }
	                ]
	            },
	            pooStill:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:32, width:16, height:16, frames: [ 4 ] }
	                ]
	            },
	            pooDead:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:32, width:16, height:16, frames: [ 21 ] }
	                ]
	            },
	            pooJumping:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:32, width:16, height:16, frames: [ 5, 6 ] }
	                ]
	            },
	            pooFalling:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:32, width:16, height:16, frames: [ 7, 8 ] }
	                ]
	            },
	            pooFiring:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:32, width:16, height:16, frames: [ 9, 10, 11, 12 ] }
	                ]
	            },
	            pooSmallBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:32, width:16, height:16, frames: [ 13 ] }
	                ]
	            },
	            pooLargeBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:32, width:16, height:16, frames: [ 14 ] }
	                ]
	            },
	            pooFront:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:32, width:16, height:16, frames: [ 15,16 ] }
	                ]
	            },
	            pooHandUp:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:32, width:16, height:16, frames: [ 17 ] }
	                ]
	            },
	            pooTransformed:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:32, width:16, height:16, frames: [ 18 ] }
	                ]
	            },
	            pooHappy:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:32, width:16, height:16, frames: [ 19, 20 ] }
	                ]
	            },
	            pooStunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:32, width:16, height:16, frames: [ 22 ] }
	                ]
	            },

	            // Shark

	            sharkWalking:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:48, width:16, height:16, frames: [ 0, 1, 2, 3 ] }
	                ]
	            },
	            sharkStill:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:48, width:16, height:16, frames: [ 4 ] }
	                ]
	            },
	            sharkDead:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:48, width:16, height:16, frames: [ 21 ] }
	                ]
	            },
	            sharkJumping:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:48, width:16, height:16, frames: [ 5, 6 ] }
	                ]
	            },
	            sharkFalling:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:48, width:16, height:16, frames: [ 7, 8 ] }
	                ]
	            },
	            sharkFiring:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:48, width:16, height:16, frames: [ 9, 10, 11, 12 ] }
	                ]
	            },
	            sharkSmallBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:48, width:16, height:16, frames: [ 13 ] }
	                ]
	            },
	            sharkLargeBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:48, width:16, height:16, frames: [ 14 ] }
	                ]
	            },
	            sharkFront:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:48, width:16, height:16, frames: [ 15,16 ] }
	                ]
	            },
	            sharkHandUp:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:48, width:16, height:16, frames: [ 17 ] }
	                ]
	            },
	            sharkTransformed:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:48, width:16, height:16, frames: [ 18 ] }
	                ]
	            },
	            sharkHappy:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:48, width:16, height:16, frames: [ 19, 20 ] }
	                ]
	            },
	            sharkStunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:48, width:16, height:16, frames: [ 22 ] }
	                ]
	            },
	            

	            // Snowman

	            snowmanWalking:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:64, width:16, height:16, frames: [ 0, 1, 2, 3 ] }
	                ]
	            },
	            snowmanStill:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:64, width:16, height:16, frames: [ 4 ] }
	                ]
	            },
	            snowmanDead:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:64, width:16, height:16, frames: [ 21 ] }
	                ]
	            },
	            snowmanJumping:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:64, width:16, height:16, frames: [ 5, 6 ] }
	                ]
	            },
	            snowmanFalling:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:64, width:16, height:16, frames: [ 7, 8 ] }
	                ]
	            },
	            snowmanFiring:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:64, width:16, height:16, frames: [ 9, 10, 11, 12 ] }
	                ]
	            },
	            snowmanSmallBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:64, width:16, height:16, frames: [ 13 ] }
	                ]
	            },
	            snowmanLargeBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:64, width:16, height:16, frames: [ 14 ] }
	                ]
	            },
	            snowmanFront:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:64, width:16, height:16, frames: [ 15,16 ] }
	                ]
	            },
	            snowmanHandUp:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:64, width:16, height:16, frames: [ 17 ] }
	                ]
	            },
	            snowmanTransformed:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:64, width:16, height:16, frames: [ 18 ] }
	                ]
	            },
	            snowmanHappy:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:64, width:16, height:16, frames: [ 19, 20 ] }
	                ]
	            },
	            snowmanStunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:64, width:16, height:16, frames: [ 22 ] }
	                ]
	            },

	            // Jin (https://github.com/kesiev/akihabara - from Leave Me Alone)

	            jinWalking:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:80, width:16, height:16, frames: [ 0, 1, 2, 3 ] }
	                ]
	            },
	            jinStill:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:80, width:16, height:16, frames: [ 4 ] }
	                ]
	            },
	            jinDead:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:80, width:16, height:16, frames: [ 21 ] }
	                ]
	            },
	            jinJumping:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:80, width:16, height:16, frames: [ 5, 6 ] }
	                ]
	            },
	            jinFalling:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:80, width:16, height:16, frames: [ 7, 8 ] }
	                ]
	            },
	            jinFiring:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:80, width:16, height:16, frames: [ 9, 10, 11, 12 ] }
	                ]
	            },
	            jinSmallBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:80, width:16, height:16, frames: [ 13 ] }
	                ]
	            },
	            jinLargeBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:80, width:16, height:16, frames: [ 14 ] }
	                ]
	            },
	            jinFront:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:80, width:16, height:16, frames: [ 15,16 ] }
	                ]
	            },
	            jinHandUp:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:80, width:16, height:16, frames: [ 17 ] }
	                ]
	            },
	            jinTransformed:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:80, width:16, height:16, frames: [ 18 ] }
	                ]
	            },
	            jinHappy:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:80, width:16, height:16, frames: [ 19, 20 ] }
	                ]
	            },
	            jinStunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:80, width:16, height:16, frames: [ 22 ] }
	                ]
	            },

	            // Hippo

	            hippoWalking:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:96, width:16, height:16, frames: [ 0, 1, 2, 3 ] }
	                ]
	            },
	            hippoStill:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:96, width:16, height:16, frames: [ 4 ] }
	                ]
	            },
	            hippoDead:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:96, width:16, height:16, frames: [ 21 ] }
	                ]
	            },
	            hippoJumping:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:96, width:16, height:16, frames: [ 5, 6 ] }
	                ]
	            },
	            hippoFalling:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:96, width:16, height:16, frames: [ 7, 8 ] }
	                ]
	            },
	            hippoFiring:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:96, width:16, height:16, frames: [ 9, 10, 11, 12 ] }
	                ]
	            },
	            hippoSmallBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:96, width:16, height:16, frames: [ 13 ] }
	                ]
	            },
	            hippoLargeBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:96, width:16, height:16, frames: [ 14 ] }
	                ]
	            },
	            hippoFront:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:96, width:16, height:16, frames: [ 15,16 ] }
	                ]
	            },
	            hippoHandUp:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:96, width:16, height:16, frames: [ 17 ] }
	                ]
	            },
	            hippoTransformed:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:96, width:16, height:16, frames: [ 18 ] }
	                ]
	            },
	            hippoHappy:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:96, width:16, height:16, frames: [ 19, 20 ] }
	                ]
	            },
	            hippoStunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:96, width:16, height:16, frames: [ 22 ] }
	                ]
	            },

	            // Ninja

	            ninjaWalking:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:112, width:16, height:16, frames: [ 0, 1, 2, 3 ] }
	                ]
	            },
	            ninjaStill:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:112, width:16, height:16, frames: [ 4 ] }
	                ]
	            },
	            ninjaDead:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:112, width:16, height:16, frames: [ 21 ] }
	                ]
	            },
	            ninjaJumping:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:112, width:16, height:16, frames: [ 5, 6 ] }
	                ]
	            },
	            ninjaFalling:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:112, width:16, height:16, frames: [ 7, 8 ] }
	                ]
	            },
	            ninjaFiring:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:112, width:16, height:16, frames: [ 9, 10, 11, 12 ] }
	                ]
	            },
	            ninjaSmallBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:112, width:16, height:16, frames: [ 13 ] }
	                ]
	            },
	            ninjaLargeBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:112, width:16, height:16, frames: [ 14 ] }
	                ]
	            },
	            ninjaFront:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:112, width:16, height:16, frames: [ 15,16 ] }
	                ]
	            },
	            ninjaHandUp:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:112, width:16, height:16, frames: [ 17 ] }
	                ]
	            },
	            ninjaTransformed:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:112, width:16, height:16, frames: [ 18 ] }
	                ]
	            },
	            ninjaHappy:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:112, width:16, height:16, frames: [ 19, 20 ] }
	                ]
	            },
	            ninjaStunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:112, width:16, height:16, frames: [ 22 ] }
	                ]
	            },

	            // Cleaner

	            cleanerWalking:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:128, width:16, height:16, frames: [ 0, 1, 2, 3 ] }
	                ]
	            },
	            cleanerStill:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:128, width:16, height:16, frames: [ 4 ] }
	                ]
	            },
	            cleanerDead:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:128, width:16, height:16, frames: [ 21 ] }
	                ]
	            },
	            cleanerJumping:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:128, width:16, height:16, frames: [ 5, 6 ] }
	                ]
	            },
	            cleanerFalling:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:128, width:16, height:16, frames: [ 7, 8 ] }
	                ]
	            },
	            cleanerFiring:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:128, width:16, height:16, frames: [ 9, 10, 11, 12 ] }
	                ]
	            },
	            cleanerSmallBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:128, width:16, height:16, frames: [ 13 ] }
	                ]
	            },
	            cleanerLargeBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:128, width:16, height:16, frames: [ 14 ] }
	                ]
	            },
	            cleanerFront:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:128, width:16, height:16, frames: [ 15,16 ] }
	                ]
	            },
	            cleanerHandUp:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:128, width:16, height:16, frames: [ 17 ] }
	                ]
	            },
	            cleanerTransformed:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:128, width:16, height:16, frames: [ 18 ] }
	                ]
	            },
	            cleanerHappy:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:128, width:16, height:16, frames: [ 19, 20 ] }
	                ]
	            },
	            cleanerStunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:128, width:16, height:16, frames: [ 22 ] }
	                ]
	            },

	            // Marine

	            marineWalking:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:144, width:16, height:16, frames: [ 0, 1, 2, 3 ] }
	                ]
	            },
	            marineStill:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:144, width:16, height:16, frames: [ 4 ] }
	                ]
	            },
	            marineDead:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:144, width:16, height:16, frames: [ 21 ] }
	                ]
	            },
	            marineJumping:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:144, width:16, height:16, frames: [ 5, 6 ] }
	                ]
	            },
	            marineFalling:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:144, width:16, height:16, frames: [ 7, 8 ] }
	                ]
	            },
	            marineFiring:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:144, width:16, height:16, frames: [ 9, 10, 11, 12 ] }
	                ]
	            },
	            marineSmallBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:144, width:16, height:16, frames: [ 13 ] }
	                ]
	            },
	            marineLargeBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:144, width:16, height:16, frames: [ 14 ] }
	                ]
	            },
	            marineFront:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:144, width:16, height:16, frames: [ 15,16 ] }
	                ]
	            },
	            marineHandUp:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:144, width:16, height:16, frames: [ 17 ] }
	                ]
	            },
	            marineTransformed:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:144, width:16, height:16, frames: [ 18 ] }
	                ]
	            },
	            marineHappy:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:144, width:16, height:16, frames: [ 19, 20 ] }
	                ]
	            },
	            marineStunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:144, width:16, height:16, frames: [ 22 ] }
	                ]
	            }
	        }
	    },
	    {
	        id:"enemies",
	        src:"sprites/enemies.png",
	        cells:{
	            skeletonWalking:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:0, width:16, height:16, frames: [ 1, 2, 3, 4 ] }
	                ]
	            },
	            skeletonStill:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:0, width:16, height:16, frames: [ 0 ] }
	                ]
	            },
	            skeletonJumping:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:0, width:16, height:16, frames: [ 3 ] }
	                ]
	            },
	            skeletonFalling:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:0, width:16, height:16, frames: [ 3 ] }
	                ]
	            },
	            skeletonBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:0, width:16, height:16, frames: [ 5, 5, 6, 7, 7, 6 ] }
	                ]
	            },
	            skeletonStunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:0, width:16, height:16, frames: [ 8 ] }
	                ]
	            },
	            skeletonPanic:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:0, width:16, height:16, frames: [ 9, 10 ] }
	                ]
	            },
	            skeletonWashed:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:0, width:16, height:16, frames: [ 11 ] }
	                ]
	            },
	            
	            angrySkeletonWalking:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:16, width:16, height:16, frames: [ 1, 2, 3, 4 ] }
	                ]
	            },
	            angrySkeletonStill:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:16, width:16, height:16, frames: [ 0 ] }
	                ]
	            },
	            angrySkeletonJumping:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:16, width:16, height:16, frames: [ 3 ] }
	                ]
	            },
	            angrySkeletonFalling:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:16, width:16, height:16, frames: [ 3 ] }
	                ]
	            },
	            angrySkeletonBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:16, width:16, height:16, frames: [ 5, 5, 6, 7, 7, 6 ] }
	                ]
	            },
	            angrySkeletonStunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:16, width:16, height:16, frames: [ 8 ] }
	                ]
	            },
	            angrySkeletonPanic:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:16, width:16, height:16, frames: [ 9, 10 ] }
	                ]
	            },
	            angrySkeletonWashed:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:16, width:16, height:16, frames: [ 11 ] }
	                ]
	            },


	            batFlying:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:32, width:16, height:16, frames: [ 0, 1, 2, 1 ] }
	                ]
	            },
	            batStill:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:32, width:16, height:16, frames: [ 0  ] }
	                ]
	            },
	            batBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:32, width:16, height:16, frames: [ 5, 5, 6, 7, 7, 6 ] }
	                ]
	            },
	            batStunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:32, width:16, height:16, frames: [ 8 ] }
	                ]
	            },
	            batPanic:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:32, width:16, height:16, frames: [ 9, 10 ] }
	                ]
	            },
	            batWashed:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:32, width:16, height:16, frames: [ 11 ] }
	                ]
	            },

	            angryBatFlying:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:48, width:16, height:16, frames: [ 0, 1, 2, 1 ] }
	                ]
	            },
	            angryBatStill:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:48, width:16, height:16, frames: [ 0 ] }
	                ]
	            },
	            angryBatBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:48, width:16, height:16, frames: [ 5, 5, 6, 7, 7, 6 ] }
	                ]
	            },
	            angryBatStunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:48, width:16, height:16, frames: [ 8 ] }
	                ]
	            },
	            angryBatPanic:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:48, width:16, height:16, frames: [ 9, 10 ] }
	                ]
	            },
	            angryBatWashed:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:48, width:16, height:16, frames: [ 11 ] }
	                ]
	            },

	            yetiWalking:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:64, width:16, height:16, frames: [ 1, 2, 3, 4 ] }
	                ]
	            },
	            yetiStill:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:64, width:16, height:16, frames: [ 0 ] }
	                ]
	            },
	            yetiJumping:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:64, width:16, height:16, frames: [ 3 ] }
	                ]
	            },
	            yetiFalling:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:64, width:16, height:16, frames: [ 3 ] }
	                ]
	            },
	            yetiBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:64, width:16, height:16, frames: [ 5, 5, 6, 7, 7, 6 ] }
	                ]
	            },
	            yetiStunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:64, width:16, height:16, frames: [ 8 ] }
	                ]
	            },
	            yetiPanic:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:64, width:16, height:16, frames: [ 9, 10 ] }
	                ]
	            },
	            yetiWashed:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:64, width:16, height:16, frames: [ 11 ] }
	                ]
	            },
	            
	            angryYetiWalking:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:80, width:16, height:16, frames: [ 1, 2, 3, 4 ] }
	                ]
	            },
	            angryYetiStill:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:80, width:16, height:16, frames: [ 0 ] }
	                ]
	            },
	            angryYetiJumping:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:80, width:16, height:16, frames: [ 3 ] }
	                ]
	            },
	            angryYetiFalling:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:80, width:16, height:16, frames: [ 3 ] }
	                ]
	            },
	            angryYetiBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:80, width:16, height:16, frames: [ 5, 5, 6, 7, 7, 6 ] }
	                ]
	            },
	            angryYetiStunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:80, width:16, height:16, frames: [ 8 ] }
	                ]
	            },
	            angryYetiPanic:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:80, width:16, height:16, frames: [ 9, 10 ] }
	                ]
	            },
	            angryYetiWashed:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:80, width:16, height:16, frames: [ 11 ] }
	                ]
	            },

	            medusaFlying:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:96, width:16, height:16, frames: [ 0, 1, 2, 3 ] }
	                ]
	            },
	            medusaStill:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:96, width:16, height:16, frames: [ 0  ] }
	                ]
	            },
	            medusaBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:96, width:16, height:16, frames: [ 5, 5, 6, 7, 7, 6 ] }
	                ]
	            },
	            medusaStunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:96, width:16, height:16, frames: [ 8 ] }
	                ]
	            },
	            medusaPanic:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:96, width:16, height:16, frames: [ 9, 10 ] }
	                ]
	            },
	            medusaWashed:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:96, width:16, height:16, frames: [ 11 ] }
	                ]
	            },

	            angryMedusaFlying:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:112, width:16, height:16, frames: [ 0, 1, 2, 3 ] }
	                ]
	            },
	            angryMedusaStill:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:112, width:16, height:16, frames: [ 0 ] }
	                ]
	            },
	            angryMedusaBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:112, width:16, height:16, frames: [ 5, 5, 6, 7, 7, 6 ] }
	                ]
	            },
	            angryMedusaStunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:112, width:16, height:16, frames: [ 8 ] }
	                ]
	            },
	            angryMedusaPanic:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:112, width:16, height:16, frames: [ 9, 10 ] }
	                ]
	            },
	            angryMedusaWashed:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:112, width:16, height:16, frames: [ 11 ] }
	                ]
	            },

	            snakeWaiting:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:128, width:16, height:16, frames: [ 0, 1 ] }
	                ]
	            },
	            snakeStill:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:128, width:16, height:16, frames: [ 2 ] }
	                ]
	            },
	            snakeJumping:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:128, width:16, height:16, frames: [ 2 ] }
	                ]
	            },
	            snakeBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:128, width:16, height:16, frames:[ 5, 5, 6, 7, 7, 6 ] }
	                ]
	            },
	            snakeStunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:128, width:16, height:16, frames: [ 8 ] }
	                ]
	            },
	            snakePanic:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:128, width:16, height:16, frames:[ 9, 10 ] }
	                ]
	            },
	            snakeWashed:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:128, width:16, height:16, frames: [ 11 ] }
	                ]
	            },

	            angrySnakeWaiting:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:144, width:16, height:16, frames: [ 0, 1 ] }
	                ]
	            },
	            angrySnakeJumping:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:144, width:16, height:16, frames: [ 2 ] }
	                ]
	            },
	            angrySnakeStill:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:144, width:16, height:16, frames: [ 2 ] }
	                ]
	            },
	            angrySnakeBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:144, width:16, height:16, frames: [ 5, 5, 6, 7, 7, 6 ] }
	                ]
	            },
	            angrySnakeStunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:144, width:16, height:16, frames: [ 8 ] }
	                ]
	            },
	            angrySnakePanic:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:144, width:16, height:16, frames: [ 9, 10 ] }
	                ]
	            },
	            angrySnakeWashed:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:144, width:16, height:16, frames: [ 11 ] }
	                ]
	            },

	            golemWalking:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:160, width:16, height:16, frames: [ 1, 2, 3, 4 ] }
	                ]
	            },
	            golemStill:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:160, width:16, height:16, frames: [ 0 ] }
	                ]
	            },
	            golemJumping:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:160, width:16, height:16, frames: [ 3 ] }
	                ]
	            },
	            golemFalling:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:160, width:16, height:16, frames: [ 3 ] }
	                ]
	            },
	            golemBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:160, width:16, height:16, frames:[ 5, 5, 6, 7, 7, 6 ] }
	                ]
	            },
	            golemStunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:160, width:16, height:16, frames: [ 8 ] }
	                ]
	            },
	            golemPanic:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:160, width:16, height:16, frames:[ 9, 10 ] }
	                ]
	            },
	            golemWashed:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:160, width:16, height:16, frames: [ 11 ] }
	                ]
	            },
	            
	            angryGolemWalking:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:176, width:16, height:16, frames: [ 1, 2, 3, 4 ] }
	                ]
	            },
	            angryGolemStill:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:176, width:16, height:16, frames: [ 0 ] }
	                ]
	            },
	            angryGolemJumping:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:176, width:16, height:16, frames: [ 3 ] }
	                ]
	            },
	            angryGolemFalling:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:176, width:16, height:16, frames: [ 3 ] }
	                ]
	            },
	            angryGolemBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:176, width:16, height:16, frames: [ 5, 5, 6, 7, 7, 6 ] }
	                ]
	            },
	            angryGolemStunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:176, width:16, height:16, frames: [ 8 ] }
	                ]
	            },
	            angryGolemPanic:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:176, width:16, height:16, frames: [ 9, 10 ] }
	                ]
	            },
	            angryGolemWashed:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:176, width:16, height:16, frames: [ 11 ] }
	                ]
	            },

	            blobWalking:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:192, width:16, height:16, frames: [ 0, 1, 2, 1 ] }
	                ]
	            },
	            blobStill:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:192, width:16, height:16, frames: [ 0  ] }
	                ]
	            },
	            blobBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:192, width:16, height:16, frames: [ 5, 5, 6, 7, 7, 6 ] }
	                ]
	            },
	            blobStunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:192, width:16, height:16, frames: [ 8 ] }
	                ]
	            },
	            blobPanic:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:192, width:16, height:16, frames: [ 9, 10 ] }
	                ]
	            },
	            blobWashed:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:192, width:16, height:16, frames: [ 11 ] }
	                ]
	            },

	            angryBlobWalking:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:208, width:16, height:16, frames: [ 0, 1, 2, 1 ] }
	                ]
	            },
	            angryBlobStill:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:208, width:16, height:16, frames: [ 0 ] }
	                ]
	            },
	            angryBlobBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:208, width:16, height:16, frames: [ 5, 5, 6, 7, 7, 6 ] }
	                ]
	            },
	            angryBlobStunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:208, width:16, height:16, frames: [ 8 ] }
	                ]
	            },
	            angryBlobPanic:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:208, width:16, height:16, frames: [ 9, 10 ] }
	                ]
	            },
	            angryBlobWashed:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:208, width:16, height:16, frames: [ 11 ] }
	                ]
	            },

	            goblinWalking:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:224, width:16, height:16, frames: [ 1, 2, 3, 4 ] }
	                ]
	            },
	            goblinStill:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:224, width:16, height:16, frames: [ 0 ] }
	                ]
	            },
	            goblinJumping:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:224, width:16, height:16, frames: [ 3 ] }
	                ]
	            },
	            goblinFalling:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:224, width:16, height:16, frames: [ 3 ] }
	                ]
	            },
	            goblinBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:224, width:16, height:16, frames:[ 5, 5, 6, 7, 7, 6 ] }
	                ]
	            },
	            goblinStunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:224, width:16, height:16, frames: [ 8 ] }
	                ]
	            },
	            goblinPanic:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:224, width:16, height:16, frames:[ 9,10 ] }
	                ]
	            },
	            goblinWashed:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:224, width:16, height:16, frames: [ 11 ] }
	                ]
	            },
	            
	            angryGoblinWalking:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:240, width:16, height:16, frames: [ 1, 2, 3, 4 ] }
	                ]
	            },
	            angryGoblinStill:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:240, width:16, height:16, frames: [ 0 ] }
	                ]
	            },
	            angryGoblinJumping:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:240, width:16, height:16, frames: [ 3 ] }
	                ]
	            },
	            angryGoblinFalling:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:240, width:16, height:16, frames: [ 3 ] }
	                ]
	            },
	            angryGoblinBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:240, width:16, height:16, frames: [ 5, 5, 6, 7, 7, 6 ] }
	                ]
	            },
	            angryGoblinStunned:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:240, width:16, height:16, frames: [ 8 ] }
	                ]
	            },
	            angryGoblinPanic:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:240, width:16, height:16, frames: [ 9, 10 ] }
	                ]
	            },
	            angryGoblinWashed:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:0, y1:240, width:16, height:16, frames: [ 11 ] }
	                ]
	            },

	            dragonFlying:{
	                 frames:[
	                     { macro:"rectangles", x1:0, y1:256, width:48, height:48, frames: [ 0, 1 ] }
	                 ]
	            },
	            dragonDead:{
	                 frames:[
	                     { macro:"rectangles", x1:0, y1:256, width:48, height:48, frames: [ 2 ] }
	                 ]
	            },

	            yendorChestClosed:{
	                 frames:[
	                     { macro:"rectangles", x1:0, y1:304, width:48, height:48, frames: [ 0 ] }
	                 ]
	            },
	            yendorChestOpened:{
	                 frames:[
	                     { macro:"rectangles", x1:0, y1:304, width:48, height:48, frames: [ 1 ] }
	                 ]
	            }
	        }
	    },
	    {
	        id:"effects",
	        src:"sprites/effects.png",
	        cells:{     
	            pop:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:0, width:16, height:16, frames: [ 0, 1, 2, 3 ] }
	                ]
	            },
	            disappear:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:0, width:16, height:16, frames: [ 3, 4, 5, 6 ] }
	                ]
	            },
	            lives:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:16, width:8, height:8, frames: [ 0, 1 ] }
	                ]
	            },
	            recap:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:24, width:8, height:8, frames: [ 0, 1, 2, 3, 4, 5, 6, 7 ] }
	                ]
	            }, 
	            yendorAmulet:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:32, width:16, height:16, frames: [ 0, 1 ] }
	                ]
	            },
	            treasureRoom:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:32, width:16, height:16, frames: [ 2, 3 ] }
	                ]
	            },
	            waterBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:48, width:16, height:16, frames: [ 0, 1, 2, 1 ] }
	                ]
	            },
	            waterWave:{
	                frames:[
	                    { macro:"rectangles", x1:48, y1:48, width:16, height:16, frames: [ 0, 1 ] }
	                ]
	            },
	            boltBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:64, width:16, height:16, frames: [ 0, 1, 2, 1 ] }
	                ]
	            },
	            bolt:{
	                frames:[
	                    { macro:"rectangles", x1:48, y1:64, width:16, height:16, frames: [ 0, 1 ] }
	                ]
	            },
	            fireBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:80, width:16, height:16, frames: [ 0, 1, 2, 1 ] }
	                ]
	            },
	            fire:{
	                frames:[
	                    { macro:"rectangles", x1:48, y1:80, width:8, height:8, frames: [ 0, 1, 2, 1 ] }
	                ]
	            },
	            flood:{
	                frames:[
	                    { macro:"rectangles", x1:16, y1:16, width:8, height:8, frames: [ 0, 1 ] }
	                ]
	            },
	            giantBolt:{
	                frames:[
	                    { x1:80, y1:48, width:24, height:24 }
	                ]
	            },
	            fireball:{
	                frames:[
	                    { macro:"rectangles", x1:64, y1:32, width:16, height:16, frames: [ 0, 1 ] }
	                ]
	            },
	            letterBubbles:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:96, width:16, height:16, frames: [ 0, 1, 2, 3, 4, 5 ] }
	                ]
	            },
	            yendorRoom:{
	                frames:[
	                    { x1:0, y1:112, width:8, height:8 },
	                    { x1:0, y1:120, width:8, height:8 },
	                    { x1:8, y1:112, width:8, height:8 },
	                    { x1:16, y1:112, width:8, height:8 },
	                    { x1:8, y1:120, width:8, height:8 },
	                    { x1:16, y1:120, width:8, height:8 },
	                    { macro:"rectangles", x1:24, y1:112, width:8, height:8, frames: [ 0, 1, 2, 3, 4, 5 ] }
	                ]
	            },
	            secretsRoom:{
	                frames:[
	                    { x1:0, y1:144, width:8, height:8 },
	                    { x1:0, y1:152, width:8, height:8 },
	                    { x1:8, y1:144, width:8, height:8 },
	                    { x1:16, y1:144, width:8, height:8 },
	                    { x1:8, y1:152, width:8, height:8 },
	                    { x1:16, y1:152, width:8, height:8 },
	                    { macro:"rectangles", x1:24, y1:144, width:8, height:8, frames: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ] },
	                    { macro:"rectangles", x1:24, y1:152, width:8, height:8, frames: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ] }
	                ]
	            },
	            bossRoom:{
	                frames:[
	                    { x1:72, y1:112, width:8, height:8 },
	                    { x1:72, y1:120, width:8, height:8 },
	                    { x1:80, y1:112, width:8, height:8 },
	                    { x1:88, y1:112, width:8, height:8 },
	                    { x1:80, y1:120, width:8, height:8 },
	                    { x1:88, y1:120, width:8, height:8 },
	                ]
	            },
	            star:{
	                frames:[
	                    { x1:0, y1:128, width:16, height:16 }
	                ]
	            },
	            sparkle:{
	                frames:[
	                    { macro:"rectangles", x1:32, y1:16, width:8, height:8, frames: [ 1, 0, 1, 2, 2 ] }
	                ]
	            },
	            torch:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:160, width:16, height:32, frames: [ 0, 1, 0, 2 ] }
	                ]
	            },
	            death:{
	                frames:[
	                    { macro:"rectangles", x1:16, y1:128, width:16, height:16, frames: [ 0, 1 ] }
	                ]
	            },
	            ball:{
	                frames:[
	                    { macro:"rectangles", x1:48, y1:128, width:16, height:16, frames: [ 0, 1 ] }
	                ]
	            },
	            vsPanel:{
	                frames:[
	                    { x1:48, y1:160, width:57, height:16 }
	                ]
	            },
	            snowballRight:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:192, width:16, height:16, frames: [ 0, 1, 2, 3 ] }
	                ]
	            },
	            snowballLeft:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:192, width:16, height:16, frames: [ 3, 2, 1, 0 ] }
	                ]
	            },
	            fireBolt:{
	                frames:[
	                    { macro:"rectangles", x1:64, y1:192, width:16, height:16, frames: [ 0, 1, 2, 1 ] }
	                ]
	            },
	            boomerangRight:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:208, width:16, height:16, frames: [ 0, 1, 2, 3 ] }
	                ]
	            },
	            boomerangLeft:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:208, width:16, height:16, frames: [ 3, 2, 1, 0 ] }
	                ]
	            },
	            whiteFireball:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:224, width:16, height:16, frames: [ 0, 1, 2, 3 ] }
	                ]
	            },
	            whiteExplosion:{
	                frames:[
	                    { macro:"rectangles", x1:64, y1:208, width:16, height:16, frames: [ 0, 1, 2, 2 ] }
	                ]
	            },
	            fillingSnowBall:{
	                frames:[
	                    { macro:"rectangles", x1:48, y1:176, width:16, height:16, frames: [ 0, 1, 2, 3 ] }
	                ]  
	            },
	            fillingSnowBallRolling:{
	                cut:true,
	                frames:[
	                    { macro:"rectangles", x1:48, y1:176, width:16, height:16, frames: [ 3 ] }
	                ]  
	            },
	            colorStars:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:240, width:16, height:16, framesCount:6 }
	                ]  
	            },
	            waterTank:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:256, width:16, height:16, framesCount:7 }
	                ]
	            },
	            waterFlow:{
	                frames:[
	                    { macro:"rectangles", x1:48, y1:88, width:8, height:8, framesCount:5 }
	                ]
	            },
	            bomb:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:272, width:16, height:16, frames:[ 0, 0, 1, 2, 2, 1 ] }
	                ]
	            },
	            bombExploding:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:272, width:16, height:16, frames:[ 3, 4 ] }
	                ]
	            },
	            explosion:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:272, width:16, height:16, frames:[ 5, 6 ] }
	                ]
	            },
	            tornadoBubble:{
	                frames:[
	                    { macro:"rectangles", x1:64, y1:224, width:16, height:16, frames: [ 0, 1, 2, 1 ] }
	                ]
	            },
	            tornado:{
	                frames:[
	                    { macro:"rectangles", x1:64, y1:288, width:16, height:16, framesCount:2 }
	                ]
	            },
	            spinStarBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:288, width:16, height:16, frames: [ 0, 1, 2, 1 ] }
	                ]
	            },
	            spinStar:{
	                frames:[
	                    { x1:48, y1:288, width:16, height:16 }
	                ]
	            },
	            poisonBubble:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:304, width:16, height:16, frames: [ 0, 1, 2, 1 ] }
	                ]
	            },
	            poison:{
	                frames:[
	                    { macro:"rectangles", x1:48, y1:304, width:16, height:16, frames: [ 0, 1, 2 ] }
	                ]
	            },
	            vacuum:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:320, width:32, height:16, framesCount:3 }
	                ]
	            },
	            inhale:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:336, width:16, height:16, framesCount:4 }
	                ]
	            },
	            shotgun:{
	                frames:[
	                    { x1:64, y1:336, width:32, height:16 }
	                ]
	            },
	            shotgunBullet:{
	                frames:[
	                    { macro:"rectangles", x1:96, y1:344, width:8, height:8, framesCount:2 }
	                ]
	            },
	            shotgunBulletTrail:{
	                frames:[
	                    { x1:96, y1:336, width:8, height:8 }
	                ]
	            },
	            shotgunAmmo:{
	                cut:true,
	                frames:[
	                    {x1:105, y1:337, width:6, height:6 }
	                ]
	            },
	        }
	    },
	    {
	        id:"bonuses",
	        src:"sprites/bonuses.png",
	        cells:{     
	            bonus:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:0, width:16, height:16, framesCount: 64 },
	                    { macro:"rectangles", x1:0, y1:16, width:16, height:16, framesCount: 64 },
	                    { macro:"rectangles", x1:0, y1:32, width:16, height:16, framesCount: 64 }
	                ]
	            },
	            minigameCleyes:{
	                cut:true,
	                frames:[
	                    {x1:944,y1:0,width:16,height:16}
	                ]
	            },
	            minigameDrink:{
	                cut:true,
	                frames:[
	                    {x1:800,y1:0,width:16,height:16}
	                ]
	            }
	        }
	    },
	    {
	        id:"giantbonuses",
	        src:"sprites/giantbonuses.png",
	        cells:{     
	            giantBonus:{
	                frames:[
	                    { macro:"rectangles", x1:0, y1:0, width:32, height:32, framesCount:11 }
	                ]
	            }
	        }
	    },
	    {
	        id:"walls",
	        src:"sprites/walls.png",
	        cells:{
	        }
	    }

	];
}

let loadResourcesAudio=(C)=>{
	return [

        {id:"musicboss",file:"audio/music/boss"},
        {id:"musicintro",file:"audio/music/select"},
        {id:"musicstage",file:"audio/music/stage1"},
        {id:"musicstagefast",file:"audio/music/stage2"},
        {id:"debrief",file:"audio/music/bossa"},
        {id:"secretsroom",file:"audio/music/witchlair"},
        {id:"staffroll",file:"audio/music/marioish"},
        {id:"minigame",file:"audio/music/overdrive"},
        {id:"insertcoin",file:"audio/effects/insertcoin"},

        {id:"jump",noise:{"wave":"triangle","attack":0.036,"sustain":0.12,"limit":0.256,"decay":0.069,"release":0.152,"frequency":865,"pitch":0.0006,"bitCrush":0,"bitCrushSweep":0,"tremoloFrequency":0,"tremoloDepth":0,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"firebubble",noise:{"wave":"sine","attack":0.009,"sustain":0.108,"limit":0.232,"decay":0.063,"release":0.052,"frequency":730,"pitch":0.001,"bitCrush":0,"bitCrushSweep":0,"tremoloFrequency":0,"tremoloDepth":0,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"fireflame",noise:{"wave":"whitenoise","attack":0.036,"sustain":0.116,"decay":0.051,"release":0.144,"frequency":775,"bitCrush":0,"bitCrushSweep":0,"limit":0.6,"tremoloFrequency":0,"tremoloDepth":0,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0,"pitch":0}},
        {id:"pop",noise:{"wave":"whitenoise","attack":0.009,"sustain":0.032,"limit":0.22,"decay":0.021,"release":0.076,"frequency":910,"pitch":-0.0012,"bitCrush":0,"bitCrushSweep":0,"tremoloFrequency":0,"tremoloDepth":0,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"burn",noise:{"wave":"whitenoise","attack":0.012,"sustain":0.084,"decay":0.042,"release":0.064,"frequency":400,"pitch":0.002,"bitCrush":0,"bitCrushSweep":0,"limit":0.6,"tremoloFrequency":0,"tremoloDepth":0,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"wash",noise:{"wave":"whitenoise","attack":0.048,"sustain":0.096,"decay":0.042,"release":0.064,"pitch":0.0015,"bitCrush":0,"bitCrushSweep":0,"limit":0.6,"frequency":850,"tremoloFrequency":0,"tremoloDepth":0,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"bolt",noise:{"wave":"saw","attack":0.03,"sustain":0.064,"limit":0.328,"decay":0.057,"release":0.064,"frequency":370,"tremoloFrequency":44,"tremoloDepth":0.75,"bitCrush":0,"bitCrushSweep":0,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0,"pitch":0}},
        {id:"kill",noise:{"wave":"breaker","attack":0.012,"sustain":0.332,"decay":0.132,"release":0.204,"frequency":970,"tremoloFrequency":43.5,"tremoloDepth":1,"pitch":0.0004,"bitCrush":3,"bitCrushSweep":16,"limit":0.6,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"pick",noise:{"wave":"breaker","attack":0.009,"sustain":0.056,"decay":0.03,"release":0.176,"frequency":670,"pitch":0.001,"bitCrush":0,"bitCrushSweep":0,"limit":0.6,"tremoloFrequency":0,"tremoloDepth":0,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"powerup",noise:{"wave":"square","attack":0.012,"sustain":0.088,"decay":0.042,"release":0.128,"frequency":610,"tremoloFrequency":50,"tremoloDepth":0.79,"pitch":0.0019,"bitCrush":0,"bitCrushSweep":0,"limit":0.6,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"hit",noise:{"wave":"tangent","attack":0.021,"sustain":0.064,"decay":0.048,"release":0.152,"frequency":700,"pitch":-0.002,"bitCrush":0,"bitCrushSweep":0,"limit":0.6,"tremoloFrequency":0,"tremoloDepth":0,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"loselife",noise:{"wave":"saw","attack":0.033,"sustain":0.4,"decay":0.3,"release":0.4,"frequency":415,"tremoloFrequency":42.5,"tremoloDepth":0.6,"pitch":-0.0015,"bitCrush":0,"bitCrushSweep":0,"limit":0.6,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"bounce",noise:{"wave":"square","attack":0.003,"sustain":0.068,"limit":0.224,"decay":0.036,"release":0.056,"frequency":340,"pitch":-0.002,"frequencyJump1amount":-1,"bitCrush":0,"bitCrushSweep":0,"tremoloFrequency":0,"tremoloDepth":0,"frequencyJump1onset":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"crack",noise:{"wave":"whitenoise","attack":0.003,"sustain":0.016,"limit":0.228,"decay":0.006,"release":0.016,"frequency":250,"bitCrush":0,"bitCrushSweep":0,"tremoloFrequency":0,"tremoloDepth":0,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0,"pitch":0}},
        {id:"gainletter",noise:{"wave":"tangent","attack":0.027,"sustain":0.2,"limit":0.308,"decay":0.15,"release":0.2,"frequency":595,"frequencyJump1onset":0.15,"frequencyJump1amount":0.16,"frequencyJump2onset":0.24,"frequencyJump2amount":0.34,"bitCrush":0,"bitCrushSweep":0,"tremoloFrequency":0,"tremoloDepth":0,"pitch":0}},
        {id:"gainallletters",noise:{"wave":"tangent","attack":0.027,"sustain":0.2,"limit":0.308,"decay":0.15,"release":0.2,"frequency":730,"tremoloFrequency":7.5,"tremoloDepth":0.46,"frequencyJump1onset":0.15,"frequencyJump1amount":0.16,"frequencyJump2onset":0.24,"frequencyJump2amount":0.34,"bitCrush":0,"bitCrushSweep":0,"pitch":0}},
        {id:"pain",noise:{"wave":"tangent","attack":0.03,"sustain":0.2,"decay":0.15,"release":0.2,"frequency":955,"tremoloFrequency":44.5,"tremoloDepth":1,"pitch":-0.0004,"bitCrush":0,"bitCrushSweep":0,"limit":0.6,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"explosion",noise:{"wave":"whitenoise","attack":0.018,"sustain":0.2,"decay":0.15,"release":0.2,"frequency":1345,"tremoloFrequency":15,"tremoloDepth":1,"pitch":-0.0016,"bitCrush":0,"bitCrushSweep":0,"limit":0.6,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"flood",noise:{"wave":"whitenoise","attack":0.15,"sustain":0.356,"decay":0.255,"release":0.368,"frequency":865,"pitch":0.0004,"bitCrush":0,"bitCrushSweep":0,"limit":0.6,"tremoloFrequency":0,"tremoloDepth":0,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"tick1",noise:{"wave":"whitenoise","sustain":0.016,"limit":0.216,"decay":0.012,"release":0.016,"frequency":1600,"bitCrush":0,"bitCrushSweep":0,"attack":0,"tremoloFrequency":0,"tremoloDepth":0,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0,"pitch":0}},
        {id:"tick2",noise:{"wave":"whitenoise","sustain":0.016,"limit":0.216,"decay":0.012,"release":0.016,"frequency":955,"bitCrush":0,"bitCrushSweep":0,"attack":0,"tremoloFrequency":0,"tremoloDepth":0,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0,"pitch":0}},
        {id:"alarm",noise:{"wave":"tangent","attack":0.027,"sustain":0.2,"decay":0.15,"release":0.2,"tremoloFrequency":39,"tremoloDepth":1,"pitch":0.0004,"bitCrush":0,"bitCrushSweep":0,"limit":0.6,"frequency":850,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"continue",noise:{"wave":"square","attack":0.015,"sustain":0.2,"limit":0.2,"decay":0.15,"release":0.2,"frequency":1390,"frequencyJump1onset":0.23,"frequencyJump1amount":-0.76,"bitCrush":0,"bitCrushSweep":0,"tremoloFrequency":0,"tremoloDepth":0,"frequencyJump2onset":0,"frequencyJump2amount":0,"pitch":0}},
        {id:"clear",noise:{"wave":"triangle","attack":0.036,"sustain":0.12,"limit":0.256,"decay":0.069,"release":0.152,"frequency":1060,"tremoloFrequency":50,"tremoloDepth":0.65,"pitch":0.0006,"bitCrush":0,"bitCrushSweep":0,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"deathappear",noise:{"wave":"square","attack":0.036,"sustain":0.208,"decay":0.144,"release":0.348,"frequency":175,"tremoloFrequency":34,"tremoloDepth":0.29,"frequencyJump1onset":0.39,"frequencyJump1amount":-0.7,"frequencyJump2onset":0.17,"frequencyJump2amount":-0.62,"bitCrush":0,"bitCrushSweep":0,"limit":0.6,"pitch":0}},
        {id:"extralife",noise:{"wave":"square","attack":0.012,"sustain":0.4,"limit":0.344,"decay":0.15,"release":0.2,"frequency":595,"frequencyJump1onset":0.09,"frequencyJump1amount":0.56,"frequencyJump2onset":0.24,"frequencyJump2amount":-0.18,"bitCrush":0,"bitCrushSweep":0,"tremoloFrequency":0,"tremoloDepth":0,"pitch":0}},
        {id:"firespecial",noise:{"wave":"square","attack":0.009,"sustain":0.02,"limit":0.2,"decay":0.018,"release":0.024,"frequency":790,"pitch":-0.002,"bitCrush":4,"bitCrushSweep":9,"tremoloFrequency":0,"tremoloDepth":0,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"pushsnow",noise:{"wave":"square","attack":0.009,"sustain":0.112,"limit":0.2,"decay":0.072,"release":0.108,"frequency":790,"tremoloFrequency":24,"tremoloDepth":0.87,"pitch":0.0014,"bitCrush":4,"bitCrushSweep":9,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"squish",noise:{"wave":"sine","sustain":0.04,"decay":0.024,"release":0.032,"frequency":280,"pitch":-0.0003,"frequencyJump1onset":0.22,"frequencyJump1amount":0.5,"bitCrush":0,"bitCrushSweep":0,"attack":0,"limit":0.6,"tremoloFrequency":0,"tremoloDepth":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"splash",noise:{"wave":"whitenoise","attack":0.012,"sustain":0.08,"decay":0.036,"release":0.164,"frequency":1600,"pitch":0.0012,"bitCrush":0,"bitCrushSweep":0,"limit":0.6,"tremoloFrequency":0,"tremoloDepth":0,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"place",noise:{"wave":"triangle","attack":0.024,"sustain":0.032,"decay":0.012,"release":0.04,"frequency":655,"pitch":-0.002,"bitCrush":0,"bitCrushSweep":0,"limit":0.6,"tremoloFrequency":0,"tremoloDepth":0,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"tornado",noise:{"wave":"whitenoise","attack":0.006,"sustain":0.3,"decay":0.036,"release":0.4,"frequency":385,"pitch":0.0018,"bitCrush":0,"bitCrushSweep":0,"limit":0.6,"tremoloFrequency":0,"tremoloDepth":0,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"spinstar",noise:{"wave":"breaker","attack":0.03,"sustain":0.136,"decay":0.069,"release":0.2,"frequency":325,"pitch":0.0014,"bitCrush":0,"bitCrushSweep":0,"limit":0.6,"tremoloFrequency":0,"tremoloDepth":0,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"poison",noise:{"wave":"whitenoise","attack":0.018,"sustain":0.076,"decay":0.072,"release":0.256,"frequency":1600,"frequencyJump1amount":0.88,"bitCrush":0,"bitCrushSweep":0,"limit":0.6,"tremoloFrequency":0,"tremoloDepth":0,"frequencyJump1onset":0,"frequencyJump2onset":0,"frequencyJump2amount":0,"pitch":0}},
        {id:"stun",noise:{"wave":"breaker","attack":0.036,"sustain":0.064,"decay":0.072,"release":0.08,"frequency":955,"tremoloFrequency":1.5,"tremoloDepth":0.23,"pitch":-0.0004,"bitCrush":0,"bitCrushSweep":0,"limit":0.6,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"sucking",noise:{"wave":"whitenoise","attack":0.216,"sustain":0.044,"limit":0.352,"decay":0.054,"release":0.108,"frequency":1135,"tremoloFrequency":12,"tremoloDepth":1,"pitch":0.0005,"bitCrush":0,"bitCrushSweep":0,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"sucked",noise:{"wave":"whitenoise","attack":0.18,"sustain":0.016,"decay":0.009,"release":0.012,"frequency":1600,"pitch":-0.002,"bitCrush":0,"bitCrushSweep":0,"limit":0.6,"tremoloFrequency":0,"tremoloDepth":0,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"vacuumalarm",noise:{"wave":"saw","attack":0.003,"sustain":0.096,"decay":0.072,"release":0.096,"frequencyJump1onset":0.5,"frequencyJump1amount":-0.24,"bitCrush":0,"bitCrushSweep":0,"limit":0.6,"frequency":850,"tremoloFrequency":0,"tremoloDepth":0,"frequencyJump2onset":0,"frequencyJump2amount":0,"pitch":0}},
        {id:"shotgunfire",noise:{"wave":"whitenoise","attack":0.006,"sustain":0.132,"decay":0.048,"release":0.324,"frequency":1465,"tremoloFrequency":12.5,"tremoloDepth":0.92,"pitch":-0.0013,"bitCrush":0,"bitCrushSweep":0,"limit":0.6,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"shotgunempty",noise:{"wave":"whitenoise","attack":0.003,"sustain":0.024,"decay":0.018,"release":0.024,"frequency":1600,"pitch":-0.0004,"bitCrush":0,"bitCrushSweep":0,"limit":0.6,"tremoloFrequency":0,"tremoloDepth":0,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
        {id:"shotgunreload",noise:{"wave":"whitenoise","attack":0.009,"sustain":0.148,"decay":0.006,"release":0.028,"frequency":1420,"pitch":-0.0015,"frequencyJump1onset":0.48,"frequencyJump1amount":0.92,"bitCrush":0,"bitCrushSweep":0,"limit":0.6,"tremoloFrequency":0,"tremoloDepth":0,"frequencyJump2onset":0,"frequencyJump2amount":0}},
		{id:"whitenoise",noise:{"wave":"whitenoise","attack":0.3,"sustain":0.4,"decay":0.3,"release":0.4,"frequency":1600,"tremoloFrequency":10.5,"tremoloDepth":0.2,"bitCrush":0,"bitCrushSweep":0,"limit":0.6,"frequencyJump1onset":0,"frequencyJump1amount":0,"frequencyJump2onset":0,"frequencyJump2amount":0,"pitch":0}}
    ];
}

let loadResourcesFonts=(C)=>{
	return [

        { id:"small", src:"fonts/small.png", letterWidth:3, letterSpacing:1, outlineColor:0 },
        { id:"normal", src:"fonts/anvil.png", letterWidth:8, letterSpacing:0, outlineColor:0 },

    ];
}