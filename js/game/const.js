function gameLoadConst(game,C) {

    let
        cheatUnlimitedLives="UDUDLRLRAB",
        cheatSuper="BABABABR",
        cheatWeakBoss="BABAU",
        cheatCleyes="UDLRUDLRBA",
        cheatEnableEndings="LRLRUDUD",
        cheatPoo="AURULB",
        cheatClassic="ABAAB",
        cheatShark="UDUDUDB",
        cheatSpaceSleep="LRUDALRUDB",
        cheatFairy="URULAB",
        cheatNicobar="LRLRUDLRB",
        cheatArena="AABBBAAABBBA",
        cheatPanic="AUADALARA",
        cheatCeiling="UUUDDDBA",
        cheatSnowman="URDLURDLAAA",
        cheatJin="ULURDLDRBBB",
        cheatHippo="ULDRULDRBBB",
        cheatNinja="UUDDLRLRBBAA",
        cheatCleaner="URULDRDLBABA",
        cheatMarine="ABABBBABBAD",
        cheatPoison="ABAUDU",
        cheatDemon="UBDAUBDA",
        cheatDarkDemon="UADBUADB";

    C.STAFFROLL=[
        [ 5, "ROGUE ROGUE" ],
        0,
        [ 1, "(c) 2022" ],
        0,
        [ 1, "by KesieV Norimaki" ],
        0,
        0,[ 4, C.GAMEPAGE ],
        0,[ 4, C.SOURCESPAGE ],
        0,0,0,0,
        [ 5, "Code & Gfx" ],0,[ 1, "KesieV Norimaki" ],
        0,0,0,0,
        [ 5, "CRT Effect" ],0,[ 1, "github:malec-palec/death-game" ],
        0,0,0,0,
        [ 5, "Anvil font" ], 0,[ 1, "by Damieng" ],
        0,0,0,0,
        [ 5, "Tom Thumb Tiny ASCII Font" ], 0,[ 1, "by Robey Pointer" ],
        0,0,0,0,
        [ 5, "Music" ],
        0,[ 4, "Chiptune Adventures set" ],[ 4, "Witch's Lair" ],0,[ 1, "by Juhani Junkala" ],0,
        0,[ 4, "8Bit Bossa" ],0,[ 1, "by Joth" ],0,
        0,[ 4, "Free Run [8 bit(ish)]" ],0,[ 1, "by TAD" ],0,
        0,[ 4, "Overdrive" ],0,[ 1, "by Centurion of war" ],0,
        0,0,0,
        [ 5, "Thanks to" ],
        0,[ 1, "Bianca Brenna" ],
        0,[ 1, "Giuseppe \"Morpheus\" La Scala" ],
        0,[ 1, "Clara \"Ikigai\" Mazzoleni" ],
        0,[ 1, "All my friends and families" ],
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        [ 5, "THANK YOU" ],0,[ 5, "FOR PLAYING!" ]
    ];

    C.CHEATCONTROLS=[
        { button:"up", cheatLetter:"U" },
        { button:"down", cheatLetter:"D" },
        { button:"left", cheatLetter:"L" },
        { button:"right", cheatLetter:"R" },
        { button:"a", cheatLetter:"A" },
        { button:"b", cheatLetter:"B" },
    ];

    C.CHEATS=[
        { letters:cheatUnlimitedLives, setTitle:"TRAINING FOR", set:{ unlimitedLives:true, noHighScore:true, disableEndings:true }, playAudio:game.audio.extralife },
        { letters:cheatSuper, setTitle:"SUPER", set:{ superMode:true }, playAudio:game.audio.jump },
        { letters:cheatWeakBoss, setTitle:"SCARED", set:{ weakBoss:true }, playAudio:game.audio.pain },
        { letters:cheatCleyes, setTitle:"CLEYES'", set:{ scheduleBonus:["minigamecleyes"] }, playAudio:game.audio.bounce },
        { letters:cheatEnableEndings, setTitle:"CHEATER'S", set:{ enableEndings:true }, playAudio:game.audio.alarm },
        { letters:cheatPoo, setTitle:"POO'S", set:{ scheduleBonus:["skinpoo"], noHighScore:true }, playAudio:game.audio.bolt },
        { letters:cheatClassic, setTitle:"CLASSIC", set:{ classicMode:true }, playAudio:game.audio.continue },
        { letters:cheatShark, setTitle:"SHARKY'S", set:{ scheduleBonus:["skinshark"], noHighScore:true }, playAudio:game.audio.flood },
        { letters:cheatSpaceSleep, setTitle:"SPACESLEEPS IN", set:{ scheduleBonus:["minigamespacesleep"], noHighScore:true }, playAudio:game.audio.explosion },
        { letters:cheatFairy, setTitle:"FIREFLIES'S", set:{ scheduleBonus:["fairy"] }, playAudio:game.audio.clear },
        { letters:cheatNicobar, setTitle:"NICOBAR AT", set:{ scheduleBonus:["minigamenicobar"] }, playAudio:game.audio.tick1 },
        { letters:cheatArena, setTitle:"PEOPLE & THOUGHTS IN", set:{ scheduleBonus:["minigamearena"] }, playAudio:game.audio.burn },
        { letters:cheatPanic, setTitle:"PANIC AT", set:{ panicMode:true }, playAudio:game.audio.fireflame },
        { letters:cheatCeiling, setTitle:"CEILING & SHUTTERS", set:{ scheduleBonus:["minigameceiling"] }, playAudio:game.audio.crack },
        { letters:cheatSnowman, setTitle:"ANOTHER", set:{ scheduleBonus:["skinsnowman"] }, playAudio:game.audio.firespecial },
        { letters:cheatJin, setTitle:"AKIHABARA'S", set:{ scheduleBonus:["skinjin"] }, playAudio:game.audio.squish },
        { letters:cheatHippo, setTitle:"WATERBOMBS OF", set:{ scheduleBonus:["skinhippo"] }, playAudio:game.audio.splash },
        { letters:cheatNinja, setTitle:"MINES OF", set:{ scheduleBonus:["skinninja"] }, playAudio:game.audio.place },
        { letters:cheatCleaner, setTitle:"LEARNING AT", set:{ scheduleBonus:["skincleaner"] }, playAudio:game.audio.vacuumalarm },
        { letters:cheatMarine, setTitle:"WARRIORS OF", set:{ scheduleBonus:["skinmarine"] }, playAudio:game.audio.shotgunreload },
        { letters:cheatPoison, setTitle:"UNTOLD WORDS OF", set:{ scheduleBonus:["poison"] }, playAudio:game.audio.poison },
        { letters:cheatDemon, setTitle:"CURSED", set:{ scheduleBonus:["demon"] }, playAudio:game.audio.whitenoise },
        { letters:cheatDarkDemon, setTitle:"LJHGBIUBICKDFHOINMUPOIUBRYDKNHIOIOUTVTI", set:{ scheduleBonus:["darkdemon"] }, playAudio:game.audio.whitenoise },
    ];

    C.SECRETS=[
        {
            statue:0,
            text:[
                "DO YOU NEED SOME",
                "TRAINING?",
                cheatUnlimitedLives
            ]
        },{
            statue:0,
            text:[
                "IS THERE ANOTHER",
                "WORLD WAITING?",
                cheatSuper
            ]
        },{
            statue:0,
            text:[
                "ARE YOU AFRAID OF",
                "YOUR BIG BOSS?",
                cheatWeakBoss
            ]
        },{
            statue:0,
            text:[
                "WAS CLARA JOKING ABOUT",
                "THAT SILLY GAME?",
                cheatCleyes
            ]
        },{
            statue:0,
            text:[
                "THEY ASKED ME TO MAKE",
                "A POO GAME - SIGH",
                cheatPoo
            ]
        },{
            statue:0,
            text:[
                "HARDER IS FUNNIER?",
                "GIVE IT A TRY!",
                cheatClassic
            ]
        },{
            statue:0,
            text:[
                "EVEN BAD IS GOOD",
                "WITH THE RIGHT FRIENDS",
                cheatShark
            ]
        },{
            statue:0,
            text:[
                "WHEN I WANT TO SLEEP I",
                "AM IN A SPACESHIP",
                cheatSpaceSleep
            ]
        },{
            statue:0,
            text:[
                "FAIRIES AT WEDDING",
                "FIREFILES AT NIGHT",
                cheatFairy
            ]
        },{
            statue:0,
            text:[
                "IN SUMMER NICO MAKES",
                "GREAT DRINKS",
                cheatNicobar
            ]
        },{
            statue:0,
            text:[
                "WHAT AM I DEFENDING",
                "KEEPING THEM ALL AWAY?",
                cheatArena
            ]
        },{
            statue:0,
            text:[
                "LOST, UNABLE TO FIX",
                "OFFENSIVE, UNDERRATED",
                cheatPanic
            ]
        },{
            statue:0,
            text:[
                "THE HOUSE RENOVATION",
                "HAS BEEN FRUSTRATING",
                cheatCeiling
            ]
        },{
            statue:1,
            text:[
                "IN ANOTHER WORLD",
                "I'M ANOTHER ME",
                cheatSnowman
            ]
        },{
            statue:2,
            text:[
                "I DID MY BEST TO SAY",
                "KESIEV WAS HERE",
                cheatJin
            ]
        },{
            statue:3,
            text:[
                "EVERYTHING MOVES SO",
                "I AM A STILL TRAVELER",
                cheatHippo
            ]
        },{
            statue:4,
            text:[
                "I HAVE FEW FRIENDS",
                "LUCKILY THE BEST",
                cheatNinja
            ]
        },{
            statue:5,
            text:[
                "I'M GETTING MORE",
                "LESSONS THAN QUESTIONS",
                cheatCleaner
            ]
        },{
            statue:6,
            text:[
                "ENVY MADE ME LOSE",
                "SIGHT OF WONDER",
                cheatMarine
            ]
        },{
            statue:0,
            text:[
                "THE TRICK IS TO",
                "HOLD THEM BACK",
                cheatPoison
            ]
        },{
            statue:0,
            text:[
                "A BRIGHT GIFT FOR ME",
                "A DEADLY GIFT FOR YOU",
                cheatDemon
            ]
        },{
            statue:0,
            text:[
                "I HAD GLITCHPHOBIA",
                "THEN IT DISAPPEARED",
                cheatDarkDemon
            ]
        }
    ];
    
    C.RND=game.newRandomizer();
    C.ONESEC=60;
    C.HALFSEC=Math.floor(C.ONESEC/2);
    C.QUARTERSEC=Math.ceil(C.HALFSEC/2);

    C.CREDITTIME=C.ONESEC*1.2;
    C.CREDITWAIT=C.HALFSEC;
    C.CREDITTIMER=C.CREDITTIME+C.CREDITWAIT;

    C.PLAYERSCOUNT=2;
    C.PLAYERCOLORS=[3,4];
    C.STARTINGLIVES=3;
    C.MAXSTARTINGCREDITS=9;
    C.FIRSTSTARTINGCREDITS=2;

    C.PLAYERCOMBOTIMER=C.ONESEC*2;
    C.BLINKSPEED=C.HALFSEC;

    C.TUTORIALTIMER=C.ONESEC*10;
    C.ATTRACTTIMER=C.ONESEC*30;

    C.GRAVITY=0.05;
    C.WATERTANKGRAVITY=0.1;

    C.JUMPSPEED=-2.2;
    C.VERYSLOWMOVESPEED=0.2;
    C.SLOWMOVESPEED=0.5;
    C.NORMALMOVESPEED=1.3;
    C.SKELETONMOVESPEED=[C.SLOWMOVESPEED,C.NORMALMOVESPEED];
    C.YETIMOVESPEED=[C.SLOWMOVESPEED,C.NORMALMOVESPEED];
    C.GOLEMMOVESPEED=[C.SLOWMOVESPEED,C.NORMALMOVESPEED];
    C.BATMOVESPEED=[C.SLOWMOVESPEED,C.NORMALMOVESPEED];
    C.MEDUSAMOVESPEEDX=[C.SLOWMOVESPEED,C.NORMALMOVESPEED];
    C.MEDUSAMOVESPEEDY=[C.VERYSLOWMOVESPEED,C.VERYSLOWMOVESPEED];
    C.SNAKEMOVESPEED=[C.SLOWMOVESPEED,C.NORMALMOVESPEED];
    C.BLOBMOVESPEED=[C.SLOWMOVESPEED,C.NORMALMOVESPEED];
    C.GOBLINMOVESPEED=[C.SLOWMOVESPEED,C.NORMALMOVESPEED];
    C.SNOWBALLSPEED=2;
    C.FIREBOLTSPEED=2;
    C.ENEMYAIMINGTIMER=C.ONESEC;
    C.ENEMYAPPEARSPEED=2;
    C.SNAKEJUMPTIMER=C.HALFSEC;
    C.SNAKEJUMPSPEED=-1.2;
    C.BLOBFIRETIMER=C.ONESEC*2;
    C.BLOBFIRETIMERRANGE=C.ONESEC;

    C.COYOTETIME=Math.ceil(C.ONESEC/8);
    C.BLINKTIME=C.ONESEC*3;
    C.BONUSTIMER=C.ONESEC*10;

    C.FIREBALLSPEED=5;
    C.SMALLBUBBLEDOWNRATIO=1.2;
    C.SMALLBUBBLESPEED=2;
    C.SMALLSNOWSPEEDY=-0.5;
    C.SNOWBALLROLLTIMER=C.ONESEC*3;
    C.SNOWDEFROSTTIMER=C.HALFSEC;
    C.SNOWDEFROSTLEVELPERHIT=0.15;
    C.SNOWMAXDEFROSTLEVEL=1.2;
    C.SNOWDEFROSTAMOUNT=0.1;
    C.SUCKINGAMOUNT=0.01;
    C.SUCKINGRECOVERTIME=C.ONESEC;
    C.SUCKINGPAUSETIMER=C.HALFSEC*3;
    C.VACUUMTIMER=C.ONESEC*5;
    C.VACUUMTIMERALARM=C.HALFSEC*3;
    C.VACUUMTIMERALARMLIMIT=C.VACUUMTIMERALARM+1;
    C.VACUUMTIMERANGRYENEMY=C.VACUUMTIMER;
    C.VACUUMTIMERNORMALENEMY=C.HALFSEC;
    C.SHOTGUNBULLETSPEED=7;
    C.SHOTGUNBULLETTIMER=C.ONESEC*3;
    C.WATERTANKFILLRATIO=0.01;
    C.WATERTANKSPEEDY=-1;
    C.WATERFLOWSPEED=1;
    C.WATERTANKEMPTYRATIO=0.012;
    C.BOMBTIMER=C.ONESEC*2;
    C.BOMBSMAXCOUNT=3;
    C.STUNNEDTIMER=C.ONESEC*3;
    C.FASTERSMALLBUBBLESPEED=4;
    C.SMALLBUBBLEDISTANCE=50;
    C.FARTHERSMALLBUBBLEDISTANCE=70;

    C.GIANTBONUSSPEED=3;
    C.GIANTBONUSFLOOR=C.SCREENHEIGHT-40;

    C.SNOWBALLPLAYERHIT=-2;
    C.SQUISHBUMP=-1.3;

    C.PLAYERWARPINCREASE=1;
    C.PLAYERJUMPDOWNWARPINCREASE=0.5;
    
    C.PLAYERSPAWNINVULNERABILITYTIMER=C.ONESEC*3;
    C.LARGEBUBBLEINVULNERABILITY=C.HALFSEC;
    C.SNOWBALLINVULNERABILITY=C.HALFSEC;
    C.LARGEBUBBLETIMER=C.ONESEC*15;
    C.WEAKLARGEBUBBLETIMER=C.ONESEC*4;
    C.LARGEBUBBLESPEED=0.5;
    C.SCATTERTIMER=C.ONESEC*3;
    C.SCATTERFALLTIMER=C.ONESEC*5;
    C.SCATTERSPEEDX=5;
    C.SCATTERSPEEDY=-3;
    C.SCATTERFALLSPEED=1;
    
    C.TILESSTOPCOLLISION={
        withTilemapTags:["tilemap"],
        withTileTags:["wall"],
        isWallX:[true,true], isWallY:[false,true],
        isBounceX:[0,0], isBounceY:[0,0]
    };
    C.TILESOLIDCOLLISION={
        withTilemapTags:["tilemap"],
        withTileTags:["wall"],
        isWallX:[true,true], isWallY:[true,true]
    };
    C.TILEINSIDECOLLISION={
        withTilemapTags:["tilemap"],
        withTileTags:["wall","ceilingwall"],
    };

    C.BORDERSTOPCOLLISION={
        withSpriteTags:["solidwall"],
        isWallX:[true,true], isWallY:[true,true],
        isBounceX:[0,0], isBounceY:[0,0]
    };
    C.BORDERSOLIDCOLLISION={
        withSpriteTags:["solidwall"],
        isWallX:[true,true], isWallY:[true,true],
    };
    C.BORDERBOUNCECOLLISION={
        withSpriteTags:["solidwall"],
        isWallX:[true,true], isWallY:[true,true],
        isBounceX:[-1,-1], isBounceY:[0,0]
    };
    C.ALLBOUNCECOLLISION={
        withTilemapTags:["tilemap"],
        withTileTags:["wall","ceilingwall"],
        withSpriteTags:["solidwall"],
        isWallX:[true,true], isWallY:[true,true],
        isBounceX:[-1,-1], isBounceY:[-1,-1]
    };
    C.ALLSOLIDCOLLISION={
        withTilemapTags:["tilemap"],
        withTileTags:["wall","ceilingwall"],
        withSpriteTags:["solidwall"],
        isWallX:[true,true], isWallY:[true,true],
        isBounceX:[0,0], isBounceY:[0,0]
    };
    C.ROLLBOUNCECOLLISION={
        withTilemapTags:["tilemap"],
        withTileTags:["wall","ceilingwall"],
        withSpriteTags:["solidwall"],
        isWallX:[true,true], isWallY:[true,true],
        isBounceX:[-1,-1], isBounceY:[0,0]
    };
    
    C.CEILINGSOLIDCOLLISION={
        withTilemapTags:["tilemap"],
        withTileTags:["ceilingwall"],
        isWallX:[true,true], isWallY:[true,true]
    };

    C.HITABLECOLLISION={
        withSpriteTags:["hitable"]
    };
    C.PLAYERINTERACTCOLLISION={
        withSpriteTags:["killplayer","bonus","largebubble","hitable"]
    };

    C.PLAYERFLIPX=[false,true];

    C.ENTITYCOLLISION={
        withSpriteTags:["bonus","player","hitable"]
    };

    C.PLAYERCOLLISION={
        withSpriteTags:["player"]
    };

    C.GRENADECOLLISION={
        withSpriteTags:["player","hitable"]
    };

    C.BONUSSPAWNPOINTCOLLISIONS=[ C.ENTITYCOLLISION ];
    C.BONUSCOLLISIONS=[ C.TILESOLIDCOLLISION ];
    C.SCATTERBOUNCECOLLISIONS = [ C.BORDERBOUNCECOLLISION ];
    C.SCATTERCOLLISIONS = [ C.TILEINSIDECOLLISION ];
    C.SCATTERFALLINGCOLLISIONS = [ C.TILESOLIDCOLLISION ];
    C.STUNNEDENEMYCOLLISIONS=[ C.BORDERSTOPCOLLISION, C.TILESSTOPCOLLISION, C.PLAYERCOLLISION ];
    C.ENEMYCOLLISIONS=[ C.BORDERSTOPCOLLISION, C.TILESSTOPCOLLISION ];
    C.SNOWBALLCOLLISIONS=[ C.BORDERSTOPCOLLISION, C.TILESSTOPCOLLISION, C.PLAYERCOLLISION ];
    C.ENEMYSMALLJUMPCOLLISIONS=[ C.BORDERSTOPCOLLISION ];
    C.BOUNCINGENEMYCOLLISIONS=[ C.ALLBOUNCECOLLISION ];
    C.PLAYERCOLLISIONS=[ C.BORDERSTOPCOLLISION, C.TILESSTOPCOLLISION, C.PLAYERINTERACTCOLLISION ];
    C.SMALLBUBBLECOLLISIONS= [ C.BORDERSOLIDCOLLISION, C.TILESOLIDCOLLISION, C.HITABLECOLLISION ];
    C.FIREBALLCOLLISIONS = [ C.BORDERSOLIDCOLLISION, C.HITABLECOLLISION ];
    C.LARGEBUBBLECOLLISIONS= [ C.BORDERSOLIDCOLLISION, C.TILESOLIDCOLLISION, C.CEILINGSOLIDCOLLISION ];
    C.BULLETCOLLISIONS = [ C.HITABLECOLLISION ];
    C.EVILBULLETCOLLISION = [ C.PLAYERCOLLISION ];
    C.ENEMYBULLETCOLLISIONS=[ C.ALLSOLIDCOLLISION ];
    C.ENEMYBULLETBOUNCECOLLISIONS=[ C.ALLBOUNCECOLLISION ];
    C.BALLCOLLISIONS=[ C.HITABLECOLLISION, C.ALLBOUNCECOLLISION ];
    C.FIRECOLLISIONS = [ C.HITABLECOLLISION, C.TILESOLIDCOLLISION ];
    C.SHOTGUNBULLETCOLLISIONS = [ C.HITABLECOLLISION, C.ALLSOLIDCOLLISION ];

    C.WATERTANKCOLLISIONS=[ C.BORDERSTOPCOLLISION, C.TILESSTOPCOLLISION, C.GRENADECOLLISION ];
    C.WATERFLOWCOLLISION=[ C.BORDERSTOPCOLLISION, C.TILESSTOPCOLLISION, C.GRENADECOLLISION ];
    C.ROLLINGSNOWBALLCOLLISIONS=[ C.ROLLBOUNCECOLLISION, C.GRENADECOLLISION ];
    C.ROLLINGENEMYCOLLISIONS=[ C.ALLSOLIDCOLLISION, C.GRENADECOLLISION ];
    C.EXPLOSIONCOLLISIONS=[ C.GRENADECOLLISION ];

    C.ENEMYJUMPTIMER=C.ONESEC;
    C.ENEMYFIRETIMER=C.HALFSEC;
    C.ENEMYJUMPSCOUNT=3;

    C.MAXSPEEDX=3;
    C.MINSPEEDX=C.MAXSPEEDX*-1;
    C.MAXSPEEDY=1.5;
    C.MINSPEEDY=-3;

    C.BACKGROUNDZINDEX=90;
    C.TILEMAPZINDEX=100;
    C.DECORATIONSINDEX=105;
    C.EFFECTSZINDEX=110;
    C.BONUSZINDEX=125;
    C.BUBBLESZINDEX=130;
    C.SCATTERZINDEX=140;
    C.SPECIALZINDEX=145;
    C.ENEMYZINDEX=150;
    C.ENEMYEFFECTZINDEX=160;
    C.PLAYERZINDEX=200;
    C.PLAYERTOOLZINDEX=201;
    C.POPUPTEXTZINDEX=210;
    C.GUIZINDEX=500;

    C.STARTTIMER=Math.floor(C.ONESEC*1.1);
    C.ENDPRESENTTIMER=C.ONESEC*3;
    C.ENDSTAGETIMER=C.ONESEC*8;
    C.SHORTNAMEY=20;

    C.FLOORY=C.SCREENHEIGHT-24;
    C.ROUNDNAMEY=Math.floor((C.SCREENHEIGHT-48)/2)+16;
    C.READYTEXT="READY !";
    C.READYTEXTY=C.ROUNDNAMEY+16;
    C.READYTEXTX=Math.floor((C.SCREENWIDTH-C.READYTEXT.length*(game.fonts.normal.outline.letterWidth+game.fonts.normal.outline.letterSpacing))/2);

    C.SCOREXPOSITION=[64,232];
    C.BUBBLEPOPSCORE=10;

    C.POPUPTEXTSPEEDY=-0.3;
    C.POPUPTEXTTIMER=C.ONESEC;

    if (C.DEBUG.enabled && C.DEBUG.shortGame) {
        C.STAGESCOUNT=4;
        C.HALFSTAGE=1;
        C.LASTSTAGE=3;    
    } else if (C.DEBUG.enabled && C.DEBUG.midGame) {
        C.STAGESCOUNT=50;
        C.HALFSTAGE=24;
        C.LASTSTAGE=49;
    } else {
        C.STAGESCOUNT=100;
        C.HALFSTAGE=49;
        C.LASTSTAGE=99;
    }

    C.MAPSTAGESTART=24;
    C.TREASUREMAPSTAGESIZE=153/C.LASTSTAGE;
    C.YENDORMAPSTAGESIZE=153/C.HALFSTAGE;
    C.MAPSPEED=Math.ceil(C.ONESEC/20);

    C.CLOCKFREEZETIMER=C.ONESEC*10;
    C.DEADLYTIMER=C.ONESEC*10;

    C.LIVESMAX=5;
    C.LIVESCELLWIDTH=game.cells.lives.frames[0].width;
    C.LIVESWIDTH=C.LIVESMAX*C.LIVESCELLWIDTH;
    C.LIVESHEIGHT=game.cells.lives.frames[0].height;
    C.LIVES2STARTX=C.LIVESWIDTH-C.LIVESCELLWIDTH;

    C.CONTINUELABEL="CONTINUE?";
    C.CREDITSLABEL="CREDITS: ";
    C.CONTINUEX=Math.floor((C.SCREENWIDTH-C.CONTINUELABEL.length*(game.fonts.normal.outline.letterWidth+game.fonts.normal.outline.letterSpacing))/2);
    C.CONTINUECOUNTERX=Math.floor((C.SCREENWIDTH-(game.fonts.normal.outline.letterWidth+game.fonts.normal.outline.letterSpacing))/2);
    C.CREDITSX=Math.floor((C.SCREENWIDTH-(C.CREDITSLABEL.length+1)*(game.fonts.normal.outline.letterWidth+game.fonts.normal.outline.letterSpacing))/2);
    C.CREDITSCOUNTERX=C.CREDITSX+(C.CREDITSLABEL.length*(game.fonts.normal.outline.letterWidth+game.fonts.normal.outline.letterSpacing));
    C.CREDITSY=C.SCREENHEIGHT-game.fonts.normal.outline.letterHeight;

    C.DEATHSPEED=2;
    C.DEATHSPEEDINCREASE=0.2;
    C.DEATHWAIT=C.ONESEC*2;
    C.HAUNTINGDEATHSPEED=0.1;
    C.HAUNTINGDEATHSPEEDTIMER=C.ONESEC*3;
    C.HAUNTINGDEATHSPEEDINCREASE=0.05;
    C.HURRYUPTIMER=C.ONESEC*2;
    C.DEATHAPPEARTIMER=C.ONESEC*1;
    C.HURRYUPBLINKSPEED=2;
    C.HURRYUPLABEL="HURRY UP!";
    C.HURRYUPX=Math.floor((C.SCREENWIDTH-C.HURRYUPLABEL.length*(game.fonts.normal.outline.letterWidth+game.fonts.normal.outline.letterSpacing))/2);
    C.HURRYUPY=16+Math.floor((C.SCREENHEIGHT-16-game.fonts.normal.outline.letterHeight)/2);

    C.VSPANELX=Math.floor((C.SCREENWIDTH-game.cells.vsPanel.frames[0].width)/2);
    C.VSPANELY=16;
    C.BONUSTIMERY=40;
    C.BONUSSTAGETIMER=C.ONESEC*30;
    C.BONUSSTAGEZOOMSPEED=0.1;
    C.BONUSSTAGECOUNTER1X=C.VSPANELX+4;
    C.BONUSSTAGECOUNTER2X=C.BONUSSTAGECOUNTER1X+35;
    C.BONUSSTAGECOUNTERY=C.VSPANELY+4;
    C.BONUSSTAGE1STPRIZE=100000;
    C.BONUSSTAGE2NDPRIZE=50000;
    C.BONUSSTAGEDEBRIEFTIMER=C.ONESEC*5;
    
    C.BONUSYENDORAMULET=80000;
    C.BONUSBOSS=50000;
    C.BONUSYENDORENDING=50000;
    C.BONUSTREASUREENDING=C.BONUSYENDORAMULET+C.BONUSYENDORENDING;

    C.STATUSTEXT1X=24;
    C.STATUSTEXT2X=Math.floor(C.SCREENWIDTH/2)+C.STATUSTEXT1X;
    C.STATUSTEXTY=C.BONUSTIMERY;

    C.PLAYERSTARTX=[17,C.SCREENWIDTH-32];
    C.PLAYERSTARTY=C.SCREENHEIGHT-24;
    C.PLAYERFIRESPEED=0.15;
    C.PLAYERFASTFIRESPEED=0.4;
    C.PLAYERFASTMOVINGSPEED=1.5;
    
    C.WELLDONEX=Math.floor((C.SCREENWIDTH-128)/2);
    C.WELLDONEY=159;
    C.YENDORROOMDURATION=C.ONESEC*3;

    C.EXPLODEDURATION=C.ONESEC;
    C.EXPLODEBLINK=2;

    C.SPAWNBONUSTIMER=C.ONESEC*3;

    C.LIVESX=[0,C.SCREENWIDTH-C.LIVESWIDTH];
    C.LIVESY=C.SCREENHEIGHT-C.LIVESHEIGHT;

    C.LETTERSX=[0,C.SCREENWIDTH-16];
    C.LETTERSY=72;

    C.MAXSCHEDULEDLETTERS=10;

    C.LONGDISTANCE=C.SCREENWIDTH*15;

    C.INTROTIMER=C.ONESEC*11.8;

    C.WATERWAVESPEED=3;
    C.WATERWAVEDELAY=5;
    C.WATERWAVESPEEDX=0.2;
    C.TORNADOACCEL=-0.05;
    C.TORNADODELAY=5;
    C.SPINSTARDELAY=5;
    C.SPINSTARANGLEDELTA=Math.PI/1.5;
    C.BOLTDELAY=5;
    C.BOLTSPEED=3;
    C.FLOODSPEED=3;
    C.FIRETIMER=C.ONESEC*5;
    C.FIRESPEED=1;
    C.BALLTIMER=C.ONESEC*5;
    C.BALLSPEED=1;
    C.BALLDELAY=5;

    C.GAMEOVERLABEL="GAME OVER";
    C.GAMEOVERX=Math.floor((C.SCREENWIDTH-C.GAMEOVERLABEL.length*game.fonts.normal.normal.letterWidth)/2);
    C.GAMEOVERY=Math.floor((C.SCREENHEIGHT-game.fonts.normal.normal.letterHeight)/2);

    C.HIGHSCORELABEL="HIGH SCORE";
    C.HIGHSCOREX=Math.floor((C.SCREENWIDTH-C.HIGHSCORELABEL.length*game.fonts.normal.normal.letterWidth)/2);

    C.GUIUPX=[32,200];
    C.GUIMESSAGETIMER=C.ONESEC*2;
    C.GUIMESSAGEY1=0;
    C.GUIMESSAGEY2=8;
    C.GUIINSERTX=[16,184];
    C.GUICOINX=[24,192];
    C.GUIPRESSX=[24,192];
    C.GUISTARTX=[24,192];
    C.GUITOX=[32,200];
    C.GUITPLAYX=[24,192];

    C.EXTRALIFEAT=[
        30000,
        100000,
        400000,
        1000000,
        2000000
    ];

    C.ENEMIESMAPS=[
        [ "skeleton", "golem" ],
        [ "bat", "medusa" ],
        [ "yeti", "goblin" ],
        [ "medusa", "bat" ],
        [ "snake", "snake" ],
        [ "golem", "skeleton" ],
        [ "blob", "golem" ],
        [ "goblin", "yeti" ],
    ];

    C.BONUSESRULES={
        bubblesBlown:[
            { ifEqual:35, thenScheduleBonus:"firefarther", thenSkipRule:true }
        ],
        regularBubblesPopped:[
            { ifEqual:35, thenScheduleBonus:"firefaster", thenSkipRule:true }
        ],
        jumps:[
            { ifEqual:35, thenScheduleBonus:"firerapid", thenSkipRule:true }
        ],
        longDistanceWalked:[
            { ifEqual:1, thenScheduleBonus:"shoe", thenSkipRule:true }
        ],
        waterBubblesPopped:[
            { ifEqual:15, thenScheduleBonus:"scrollskip3", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:20, thenScheduleBonus:"scrollskip5", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:25, thenScheduleBonus:"scrollskip7", thenResetCounter:true, thenSkipRule:true }
        ],
        firefartherCollected:[
            { ifEqual:3, thenScheduleBonus:"ringjump", thenSkipRule:true },
        ],
        firerapidCollected:[
            { ifEqual:3, thenScheduleBonus:"ringblow", thenSkipRule:true },
        ],
        firefasterCollected:[
            { ifEqual:3, thenScheduleBonus:"ringmove", thenSkipRule:true },
        ],
        specialItemsCollected:[
            { ifEqual:10, thenScheduleBonus:"swordflood", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:11, thenScheduleBonus:"swordflood", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:12, thenScheduleBonus:"swordflood", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:13, thenScheduleBonus:"swordflood", thenResetCounter:true, thenSkipRule:true }
        ],
        normalCollected:[
            { ifEqual:30, thenScheduleBonus:"swordbolt", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:35, thenScheduleBonus:"swordbolt", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:40, thenScheduleBonus:"swordbolt", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:45, thenScheduleBonus:"swordbolt", thenResetCounter:true, thenSkipRule:true }
        ],
        drownedEnemies:[
            { ifEqual:6, thenScheduleBonus:"swordfireball", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:7, thenScheduleBonus:"swordfireball", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:8, thenScheduleBonus:"swordfireball", thenResetCounter:true, thenSkipRule:true }
        ],
        scrollsCollected:[
            { ifEqual:1, thenScheduleBonus:"necklaceexplosion", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:1, thenScheduleBonus:"necklaceexplosion", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:2, thenScheduleBonus:"necklaceexplosion", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:2, thenScheduleBonus:"necklaceexplosion", thenResetCounter:true, thenSkipRule:true }
        ],
        boltBubblesPopped:[
            { ifEqual:12, thenScheduleBonus:"clock", thenResetCounter:true }
        ],
        clocksCollected:[
            { ifEqual:1, thenScheduleBonus:"necklacewands", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:2, thenScheduleBonus:"necklacewands", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:3, thenScheduleBonus:"necklacewands", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:4, thenScheduleBonus:"necklacewands", thenResetCounter:true, thenSkipRule:true }
        ],
        fireBubblesPopped:[
            { ifEqual:10, thenScheduleBonus:"magicmissile", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:13, thenScheduleBonus:"magicmissile", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:16, thenScheduleBonus:"magicmissile", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:19, thenScheduleBonus:"magicmissile", thenResetCounter:true, thenSkipRule:true }
        ],
        burnedEnemies:[
            { ifEqual:10, thenScheduleBonus:"tome", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:12, thenScheduleBonus:"tome", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:14, thenScheduleBonus:"tome", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:16, thenScheduleBonus:"tome", thenResetCounter:true, thenSkipRule:true }
        ],
        boltedEnemies:[
            { ifEqual:10, thenScheduleBonus:"tiara", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:12, thenScheduleBonus:"tiara", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:14, thenScheduleBonus:"tiara", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:16, thenScheduleBonus:"tiara", thenResetCounter:true, thenSkipRule:true }
        ],
        bonusFromCagedEnemy:[
            { ifEqual:50, thenScheduleBonus:"deadly", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:55, thenScheduleBonus:"deadly", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:60, thenScheduleBonus:"deadly", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:65, thenScheduleBonus:"deadly", thenResetCounter:true, thenSkipRule:true },
        ],
        hurryUpAppeared:[
            { ifEqual:8, thenScheduleBonus:"ballcrown", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:10, thenScheduleBonus:"ballcrown", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:12, thenScheduleBonus:"ballcrown", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:14, thenScheduleBonus:"ballcrown", thenResetCounter:true, thenSkipRule:true },
        ],
        livesLost:[
            { ifEqual:5, thenScheduleBonus:"letterscrown", thenResetCounter:true }
        ],
        gainLetter0:[
            { ifEqual:6, thenScheduleBonus:"staff0", thenResetCounter:true }
        ],
        gainLetter1:[
            { ifEqual:6, thenScheduleBonus:"staff1", thenResetCounter:true }
        ],
        gainLetter2:[
            { ifEqual:6, thenScheduleBonus:"staff2", thenResetCounter:true }
        ],
        gainLetter3:[
            { ifEqual:6, thenScheduleBonus:"staff3", thenResetCounter:true }
        ],
        gainLetter4:[
            { ifEqual:6, thenScheduleBonus:"staff4", thenResetCounter:true }
        ],
        gainLetter5:[
            { ifEqual:6, thenScheduleBonus:"staff5", thenResetCounter:true }
        ],
        timesWarped:[
            { ifEqual:15, thenScheduleBonus:"bottle0", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:16, thenScheduleBonus:"bottle1", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:17, thenScheduleBonus:"bottle2", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:18, thenScheduleBonus:"bottle3", thenResetCounter:true, thenSkipRule:true },
            { ifEqual:19, thenScheduleBonus:"bottle4", thenResetCounter:true, thenSkipRule:true }
        ],
        swordBoltCollected:[
            { ifEqual:3, thenScheduleBonus:"chest0", thenResetCounter:true }
        ],
        swordFloodCollected:[
            { ifEqual:3, thenScheduleBonus:"chest1", thenResetCounter:true }
        ],
        necklaceExplosionCollected:[
            { ifEqual:3, thenScheduleBonus:"chest2", thenResetCounter:true }
        ],
        tomesCollected:[
            { ifEqual:3, thenScheduleBonus:"chest3", thenResetCounter:true }
        ],
        currentStage:[],
        timesJoined:[
            { ifEqual:4, thenScheduleBonus:"necklacerings", thenResetCounter:true, thenSkipGlobalRule:true },
            { ifEqual:8, thenScheduleBonus:"necklacewandsrings", thenResetCounter:true, thenSkipGlobalRule:true }
        ],
        stagesClearedNoDie:[
            { ifEqual:12, thenScheduleBonus:"secretsroom", thenResetCounter:true }
        ]
    };

    C.SPAWNBONUSSEQUENCE=[
        "tier1points","tier2points","tier3points","tier4points","tier5points"
    ],
    C.BONUSDIGITS=[
        "digits0","digits1","digits2","digits3","digits4","digits5","digits6","digits7","digits8","digits9"
    ],
    C.BONUSLORESTAGE={
        0:"lore1",
        4:"lore2",
        9:"lore3",
        14:"lore4",
        19:"lore5",
        24:"lore6",
        29:"lore7",
        34:"lore8",
        39:"lore9",
        44:"lore10",
        50:"lore11",
        84:"lore12",
        85:"lore13",
        92:"lore14",
        93:"lore15"
    },
    C.BONUSTIME=[
        0,
        // Single player
        [
            "bonustime10",
            "bonustime11",
            "bonustime12",
            "bonustime13",
            "bonustime14",
            "bonustime15",
            "bonustime16",
            "bonustime17",
            "bonustime18",
            "bonustime19",
            "bonustime20",
            "bonustime21",
            "bonustime22",
            "bonustime23",
            "bonustime24",
            "bonustime25",
            "bonustime26",
            "bonustime27",
            "bonustime28",
            "bonustime29",
        ],
        // Two players
        [
            "bonustime0",
            "bonustime1",
            "bonustime2",
            "bonustime3",
            "bonustime4",
            "bonustime5",
            "bonustime6",
            "bonustime7",
            "bonustime8",
            "bonustime9",
            "bonustime10",
            "bonustime11",
            "bonustime12",
            "bonustime13",
            "bonustime14",
            "bonustime15",
            "bonustime16",
            "bonustime17",
            "bonustime18",
            "bonustime19",
            "bonustime20",
            "bonustime21",
            "bonustime22",
            "bonustime23",
            "bonustime24",
            "bonustime25",
            "bonustime26",
            "bonustime27",
            "bonustime28",
            "bonustime29"
        ]
    ],
    C.BONUSES={
        all:[
            { tags:["normalending","nicobaritem","bonus0", "tier1points","digits0", "cleanerending"], increaseCounters:["normalCollected"], points:100, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["normalending","nicobaritem","bonus1", "tier1points","digits1", "cleanerending"], increaseCounters:["normalCollected"], points:100, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["normalending","nicobaritem","bonus2", "tier1points","digits2", "cleanerending"], increaseCounters:["normalCollected"], points:100, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["normalending","nicobaritem","bonus3", "tier1points","digits3", "cleanerending"], increaseCounters:["normalCollected"], points:100, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["normalending","nicobaritem","bonus4", "tier1points","digits4", "cleanerending"], increaseCounters:["normalCollected"], points:100, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["normalending","hippoending","nicobaritem","bonus5", "tier1points","digits5"], increaseCounters:["normalCollected"], points:100, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["normalending","wand","firefarther"], increaseCounters:["firefartherCollected","specialItemsCollected"], points:100, timer:C.BONUSTIMER, setSmallBubbleDistance:C.FARTHERSMALLBUBBLEDISTANCE, playAudio:game.audio.powerup },
            { tags:["normalending","wand","firefaster"], increaseCounters:["firefasterCollected","specialItemsCollected"], points:100, timer:C.BONUSTIMER, setSmallBubbleSpeed:C.FASTERSMALLBUBBLESPEED, playAudio:game.audio.powerup },
            { tags:["normalending","wand","firerapid"], increaseCounters:["firerapidCollected","specialItemsCollected"], points:100, timer:C.BONUSTIMER, setFiringAnimation:"fireFaster", playAudio:game.audio.powerup },
            { tags:["normalending","shoe"], points:100, increaseCounters:["specialItemsCollected"], timer:C.BONUSTIMER, setMoveFast:true, playAudio:game.audio.powerup },
            { tags:["normalending","scroll","scrollskip3"], increaseCounters:["scrollsCollected","specialItemsCollected"], points:200, timer:C.BONUSTIMER, skipStages:3, playAudio:game.audio.powerup },
            { tags:["normalending","scroll","scrollskip5"], increaseCounters:["scrollsCollected","specialItemsCollected"], points:200, timer:C.BONUSTIMER, skipStages:5, playAudio:game.audio.powerup },
            { tags:["normalending","scroll","scrollskip7"], increaseCounters:["scrollsCollected","specialItemsCollected"], points:200, timer:C.BONUSTIMER, skipStages:7, playAudio:game.audio.powerup },
            { tags:["normalending","ring","ringblow"], increaseCounters:["specialItemsCollected"], points:1000, timer:C.BONUSTIMER, setBonusPerBlow:100, playAudio:game.audio.powerup },
            { tags:["normalending","ring","ringjump"], increaseCounters:["specialItemsCollected"], points:1000, timer:C.BONUSTIMER, setBonusPerJump:500, playAudio:game.audio.powerup },
            { tags:["normalending","ring","ringmove"], increaseCounters:["specialItemsCollected"], points:1000, timer:C.BONUSTIMER, setBonusPerMove:10, playAudio:game.audio.powerup },
            { tags:["normalending","sword","swordflood","marineending"], increaseCounters:["swordFloodCollected","specialItemsCollected"], points:3000, timer:C.BONUSTIMER, floodStage:true, playAudio:game.audio.powerup },
            { tags:["normalending","sword","swordbolt","marineending"], increaseCounters:["swordBoltCollected","specialItemsCollected"], points:3000, timer:C.BONUSTIMER, boltStage:true, playAudio:game.audio.powerup },
            { tags:["normalending","sword","swordfireball","marineending"], increaseCounters:["specialItemsCollected"], points:3000, timer:C.BONUSTIMER, setFireMode:1, setBulletsCount:16, playAudio:game.audio.powerup },
            { tags:["normalending","diamond","diamond6k"], points:6000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["normalending","diamond","diamond7k"], points:7000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["normalending","diamond","diamond8k"], points:8000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["normalending","diamond","diamond9k"], points:9000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["normalending","diamond","diamond10k"], points:10000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["normalending","necklace","necklacerings"], increaseCounters:["specialItemsCollected"], points:2000, timer:C.BONUSTIMER, setBonusPerBlow:100, setBonusPerJump:500, setBonusPerMove:10, playAudio:game.audio.powerup },
            { tags:["normalending","necklace","necklacewandsrings"], increaseCounters:["specialItemsCollected"], points:2000, timer:C.BONUSTIMER, setBonusPerBlow:100, setBonusPerJump:500, setBonusPerMove:10, setSmallBubbleDistance:C.FARTHERSMALLBUBBLEDISTANCE, setSmallBubbleSpeed:C.FASTERSMALLBUBBLESPEED, setFiringAnimation:"fireFaster", playAudio:game.audio.powerup },
            { tags:["normalending","necklace","necklaceexplosion"], increaseCounters:["necklaceExplosionCollected","specialItemsCollected"], points:2000, timer:C.BONUSTIMER, explodeStage:true, explodeBonusFree:"diamond6k", explodeBonusCaged:"diamond6k", explodeColor:3, playAudio:game.audio.powerup },
            { tags:["normalending","necklace","necklacewands"], increaseCounters:["specialItemsCollected"], points:2000, timer:C.BONUSTIMER, setSmallBubbleDistance:C.FARTHERSMALLBUBBLEDISTANCE, setSmallBubbleSpeed:C.FASTERSMALLBUBBLESPEED, setFiringAnimation:"fireFaster", playAudio:game.audio.powerup },
            { tags:["normalending","clock"], increaseCounters:["clocksCollected","specialItemsCollected"], points:200, timer:C.BONUSTIMER, freezeEnemiesFor:C.CLOCKFREEZETIMER, playAudio:game.audio.powerup },
            { tags:["normalending","magicmissile"], increaseCounters:["specialItemsCollected"], points:200, timer:C.BONUSTIMER, explodeStage:true, explodeBonusFree:"diamond10k", explodeBonusCaged:"diamond6k", explodeColor:4, playAudio:game.audio.powerup },
            { tags:["normalending","tome"], increaseCounters:["tomesCollected","specialItemsCollected"], points:3000, timer:C.BONUSTIMER, explodeStage:true, explodeBonusFree:"diamond8k", explodeBonusCaged:"diamond6k", explodeColor:7, playAudio:game.audio.powerup },
            { tags:["normalending","tiara"], increaseCounters:["specialItemsCollected"], points:3000, timer:C.BONUSTIMER, spawnStars:3, playAudio:game.audio.powerup },
            { tags:["normalending","letterscrown"], increaseCounters:["specialItemsCollected"], points:4000, timer:C.BONUSTIMER, addScheduledLetterBubbles:10, playAudio:game.audio.powerup },
            { tags:["normalending","deadly"], increaseCounters:["specialItemsCollected"], points:3000, timer:C.BONUSTIMER, freezeEnemiesFor:C.DEADLYTIMER, deadlyFor:C.DEADLYTIMER, playAudio:game.audio.powerup },
            { tags:["secretsroom"], increaseCounters:["specialItemsCollected"], timer:C.BONUSTIMER, points:1000, gotoSecretsRoom:true, playAudio:game.audio.powerup },
            { tags:["normalending","ballcrown"], increaseCounters:["specialItemsCollected"], points:4000, timer:C.BONUSTIMER, spawnBalls:1, playAudio:game.audio.powerup },
            { tags:["normalending","nicobaritem","staff0"], increaseCounters:["specialItemsCollected"], points:500, timer:C.BONUSTIMER, setEndBubblesSpawn:"bonus0", setEndBubblesSpawnPoints:700, setEndSpawnGiantBonus:"bonus0", playAudio:game.audio.powerup },
            { tags:["normalending","nicobaritem","staff1"], increaseCounters:["specialItemsCollected"], points:500, timer:C.BONUSTIMER, setEndBubblesSpawn:"bonus1", setEndBubblesSpawnPoints:700, setEndSpawnGiantBonus:"bonus1", playAudio:game.audio.powerup },
            { tags:["normalending","nicobaritem","staff2"], increaseCounters:["specialItemsCollected"], points:500, timer:C.BONUSTIMER, setEndBubblesSpawn:"bonus2", setEndBubblesSpawnPoints:700, setEndSpawnGiantBonus:"bonus2", playAudio:game.audio.powerup },
            { tags:["normalending","nicobaritem","staff3"], increaseCounters:["specialItemsCollected"], points:500, timer:C.BONUSTIMER, setEndBubblesSpawn:"bonus3", setEndBubblesSpawnPoints:700, setEndSpawnGiantBonus:"bonus3", playAudio:game.audio.powerup },
            { tags:["normalending","nicobaritem","staff4"], increaseCounters:["specialItemsCollected"], points:500, timer:C.BONUSTIMER, setEndBubblesSpawn:"bonus4", setEndBubblesSpawnPoints:700, setEndSpawnGiantBonus:"bonus4", playAudio:game.audio.powerup },
            { tags:["normalending","nicobaritem","staff5"], increaseCounters:["specialItemsCollected"], points:500, timer:C.BONUSTIMER, setEndBubblesSpawn:"bonus5", setEndBubblesSpawnPoints:700, setEndSpawnGiantBonus:"bonus5", playAudio:game.audio.powerup },
            { tags:["normalending","nicobaritem","bottle0"], increaseCounters:["specialItemsCollected"], points:500, timer:C.BONUSTIMER, bonusStage:"bonusstage0", playAudio:game.audio.powerup },
            { tags:["normalending","nicobaritem","bottle1"], increaseCounters:["specialItemsCollected"], points:500, timer:C.BONUSTIMER, bonusStage:"bonusstage1", playAudio:game.audio.powerup },
            { tags:["normalending","nicobaritem","bottle2"], increaseCounters:["specialItemsCollected"], points:500, timer:C.BONUSTIMER, bonusStage:"bonusstage2", playAudio:game.audio.powerup },
            { tags:["normalending","nicobaritem","bottle3"], increaseCounters:["specialItemsCollected"], points:500, timer:C.BONUSTIMER, bonusStage:"bonusstage3", playAudio:game.audio.powerup },
            { tags:["normalending","nicobaritem","bottle4"], increaseCounters:["specialItemsCollected"], points:500, timer:C.BONUSTIMER, bonusStage:"bonusstage4", playAudio:game.audio.powerup },
            { tags:["normalending","nicobaritem","bonusstage0"], increaseCounters:["bonusStageCollected"], points:500, playAudio:game.audio.pick },
            { tags:["normalending","nicobaritem","bonusstage1"], increaseCounters:["bonusStageCollected"], points:500, playAudio:game.audio.pick },
            { tags:["normalending","nicobaritem","bonusstage2"], increaseCounters:["bonusStageCollected"], points:500, playAudio:game.audio.pick },
            { tags:["normalending","bonusstage3"], increaseCounters:["bonusStageCollected"], points:500, playAudio:game.audio.pick },
            { tags:["normalending","nicobaritem","bonusstage4"], increaseCounters:["bonusStageCollected"], points:500, playAudio:game.audio.pick },
            { tags:["chest0"], increaseCounters:["specialItemsCollected"], points:1000, timer:C.BONUSTIMER, setEndBubblesSpawn:"diamond6k", setEndBubblesSpawnPoints:700, setEndSpawnGiantBonus:"diamond0", playAudio:game.audio.powerup },
            { tags:["chest1"], increaseCounters:["specialItemsCollected"], points:1000, timer:C.BONUSTIMER, setEndBubblesSpawn:"diamond7k", setEndBubblesSpawnPoints:700, setEndSpawnGiantBonus:"diamond1", playAudio:game.audio.powerup },
            { tags:["chest2"], increaseCounters:["specialItemsCollected"], points:1000, timer:C.BONUSTIMER, setEndBubblesSpawn:"diamond8k", setEndBubblesSpawnPoints:700, setEndSpawnGiantBonus:"diamond2", playAudio:game.audio.powerup },
            { tags:["chest3"], increaseCounters:["specialItemsCollected"], points:1000, timer:C.BONUSTIMER, setEndBubblesSpawn:"diamond9k", setEndBubblesSpawnPoints:700, setEndSpawnGiantBonus:"diamond3", playAudio:game.audio.powerup },
            { tags:["chest4"], increaseCounters:["specialItemsCollected"], points:1000, timer:C.BONUSTIMER, setEndBubblesSpawn:"diamond10k", setEndBubblesSpawnPoints:700, setEndSpawnGiantBonus:"diamond4", playAudio:game.audio.powerup },
            { tags:["bossfirebottle"], setFireMode:1, setBulletsCount:0, playAudio:game.audio.powerup },
            { tags:["yendoramulet"], timer:C.BONUSTIMER, increaseGlobalCounters:["yendorAmuletCollected"], increaseCounters:["yendorAmuletCollected"], allPlayersPoints:C.BONUSYENDORAMULET, playAudio:game.audio.powerup },
            { tags:["minigame","minigamecleyes"], timer:C.BONUSTIMER, playMinigame:["cleyes"] },
            { tags:["pooending","skin","skinpoo"], timer:C.BONUSTIMER, setBubbleType:"spinStar", setPlayerSkin:2, setEndingSet:"pooending", setDefaultCanSquish:false, setDefaultFireMode:0, setDefaultFireHold:false, setDefaultCanCutJump:false, setDefaultCanDropDown:false, setDefaultLockSide:false },
            { tags:["sharkending","skin","skinshark"], timer:C.BONUSTIMER, setBubbleType:"tornado", setPlayerSkin:3, setEndingSet:"sharkending", setDefaultCanSquish:false, setDefaultFireMode:0, setDefaultFireHold:false, setDefaultCanCutJump:false, setDefaultCanDropDown:false, setDefaultLockSide:false },
            { tags:["minigame","minigamespacesleep"], timer:C.BONUSTIMER, playMinigame:["spacesleep"] },
            { tags:["minigamecart"], timer:C.BONUSTIMER, playMinigame:["spacesleep","cleyes","nicobar","arena","ceiling"] },
            { tags:["fairy"], timer:C.BONUSTIMER, points:40000, setDarkness:true, setEndingSet:"fairy" },
            { tags:["minigame","minigamenicobar"], timer:C.BONUSTIMER, playMinigame:["nicobar"] },
            { tags:["minigame","minigamearena"], timer:C.BONUSTIMER, playMinigame:["arena"] },
            { tags:["normalending","tier2points","digits6"], increaseCounters:["normalCollected"], points:200, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["normalending","tier2points","digits7"], increaseCounters:["normalCollected"], points:200, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["normalending","tier2points","digits8"], increaseCounters:["normalCollected"], points:200, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["normalending","tier2points","digits9"], increaseCounters:["normalCollected"], points:200, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["normalending","tier2points"], increaseCounters:["normalCollected"], points:200, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["normalending","tier2points"], increaseCounters:["normalCollected"], points:200, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["nicobaritem","tier3points","jinending"], increaseCounters:["normalCollected"], points:400, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["nicobaritem","tier3points"], increaseCounters:["normalCollected"], points:400, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["nicobaritem","tier3points","jinending"], increaseCounters:["normalCollected"], points:400, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["nicobaritem","tier3points","jinending"], increaseCounters:["normalCollected"], points:400, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["nicobaritem","tier3points","jinending"], increaseCounters:["normalCollected"], points:400, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["nicobaritem","tier3points","jinending"], increaseCounters:["normalCollected"], points:400, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["tier4points"], increaseCounters:["normalCollected"], points:800, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["tier4points","snowmanending","jinending"], increaseCounters:["normalCollected"], points:800, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["tier4points","snowmanending","jinending"], increaseCounters:["normalCollected"], points:800, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["tier4points"], increaseCounters:["normalCollected"], points:800, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["tier4points"], increaseCounters:["normalCollected"], points:800, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["tier4points"], increaseCounters:["normalCollected"], points:800, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["tier5points"], increaseCounters:["normalCollected"], points:1600, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["tier5points"], increaseCounters:["normalCollected"], points:1600, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["tier5points"], increaseCounters:["normalCollected"], points:1600, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["tier5points"], increaseCounters:["normalCollected"], points:1600, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["tier5points"], increaseCounters:["normalCollected"], points:1600, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["tier5points"], increaseCounters:["normalCollected"], points:1600, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["minigame","minigameceiling"], timer:C.BONUSTIMER, playMinigame:["ceiling"] },
            { tags:["lore1","ninjaending"], increaseCounters:["normalCollected"], points:700, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["lore2"], increaseCounters:["normalCollected"], points:700, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["lore3"], increaseCounters:["normalCollected"], points:700, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["lore4"], increaseCounters:["normalCollected"], points:700, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["lore5"], increaseCounters:["normalCollected"], points:700, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["lore6"], increaseCounters:["normalCollected"], points:700, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["lore7","ninjaending"], increaseCounters:["normalCollected"], points:700, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["lore8"], increaseCounters:["normalCollected"], points:700, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["lore9"], increaseCounters:["normalCollected"], points:700, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["lore10"], increaseCounters:["normalCollected"], points:700, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["lore11"], increaseCounters:["normalCollected"], points:700, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["lore12"], increaseCounters:["normalCollected"], points:700, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["lore13"], increaseCounters:["normalCollected"], points:700, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["lore14"], increaseCounters:["normalCollected"], points:700, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["lore15"], increaseCounters:["normalCollected"], points:700, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime0"], increaseCounters:["normalCollected"], points:10000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime1"], increaseCounters:["normalCollected"], points:10000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime2"], increaseCounters:["normalCollected"], points:9000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime3"], increaseCounters:["normalCollected"], points:9000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime4"], increaseCounters:["normalCollected"], points:8000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime5"], increaseCounters:["normalCollected"], points:8000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime6"], increaseCounters:["normalCollected"], points:8000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime7"], increaseCounters:["normalCollected"], points:8000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime8"], increaseCounters:["normalCollected"], points:7000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime9"], increaseCounters:["normalCollected"], points:7000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime10"], increaseCounters:["normalCollected"], points:7000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime11"], increaseCounters:["normalCollected"], points:6000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime12"], increaseCounters:["normalCollected"], points:6000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime13"], increaseCounters:["normalCollected"], points:6000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime14"], increaseCounters:["normalCollected"], points:5000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime15"], increaseCounters:["normalCollected"], points:5000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime16"], increaseCounters:["normalCollected"], points:5000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime17"], increaseCounters:["normalCollected"], points:5000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime18"], increaseCounters:["normalCollected"], points:4000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime19"], increaseCounters:["normalCollected"], points:4000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime20"], increaseCounters:["normalCollected"], points:4000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime21"], increaseCounters:["normalCollected"], points:4000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime22"], increaseCounters:["normalCollected"], points:3000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime23"], increaseCounters:["normalCollected"], points:3000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime24"], increaseCounters:["normalCollected"], points:3000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime25"], increaseCounters:["normalCollected"], points:3000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime26"], increaseCounters:["normalCollected"], points:2000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime27"], increaseCounters:["normalCollected"], points:2000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime28"], increaseCounters:["normalCollected"], points:2000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonustime29"], increaseCounters:["normalCollected"], points:2000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["snowmanending","skin","skinsnowman"], timer:C.BONUSTIMER, setPlayerSkin:4, setEndingSet:"snowmanending", setDefaultCanSquish:false, setDefaultFireMode:2, setDefaultFireHold:false, setDefaultCanCutJump:false, setDefaultCanDropDown:false, setDefaultLockSide:false },
            { tags:["jinending","skin","skinjin"], timer:C.BONUSTIMER, setPlayerSkin:5, setEndingSet:"jinending", setDefaultCanSquish:true, setDefaultFireMode:3, setDefaultFireHold:false, setDefaultCanCutJump:true, setDefaultCanDropDown:true, setDefaultLockSide:false },
            { tags:["hippoending","skin","skinhippo"], timer:C.BONUSTIMER, setPlayerSkin:6, setEndingSet:"hippoending", setDefaultCanSquish:false, setDefaultFireMode:4, setDefaultFireHold:true, setDefaultCanCutJump:false, setDefaultCanDropDown:false, setDefaultLockSide:false },
            { tags:["ninjaending","skin","skinninja"], timer:C.BONUSTIMER, setPlayerSkin:7, setEndingSet:"ninjaending", setDefaultCanSquish:false, setDefaultFireMode:5, setDefaultFireHold:false, setDefaultCanCutJump:true, setDefaultCanDropDown:false, setDefaultLockSide:false },
            { tags:["skin","skincleaner"], timer:C.BONUSTIMER, setPlayerSkin:8, setEndingSet:"cleanerending", setDefaultCanSquish:false, setDefaultFireMode:6, setDefaultFireHold:true, setDefaultCanCutJump:false, setDefaultCanDropDown:true, setDefaultLockSide:true },
            { tags:["marineending","skin","skinmarine"], timer:C.BONUSTIMER, setPlayerSkin:9, setEndingSet:"marineending", setDefaultCanSquish:false, setDefaultFireMode:7, setDefaultFireHold:false, setDefaultCanCutJump:false, setDefaultCanDropDown:true, setDefaultLockSide:false },
            { tags:["poison"], timer:C.BONUSTIMER, playAudio:game.audio.powerup, setDefaultBubbleType:"poison" },
            { tags:["demon"], timer:C.BONUSTIMER, points:40000, setHauntedMode:true, setEndingSet:"demon" },
            { tags:["darkdemon"], timer:C.BONUSTIMER, points:40000, setHauntedMode:true, setDarkness:true, setEndingSet:"darkdemon" },

        ]
    };

    C.GIANTBONUSES={
        all:[
            { tags:["bonus0"], points:10000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonus1"], points:10000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonus2"], points:20000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonus3"], points:20000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonus4"], points:30000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["bonus5"], points:30000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["diamond0"], points:40000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["diamond1"], points:50000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["diamond2"], points:60000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["diamond3"], points:70000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
            { tags:["diamond4"], points:80000, timer:C.BONUSTIMER, playAudio:game.audio.pick },
        ]
    };

    C.PLAYERSKINS=[
        // 0: Player 1
        {
            still:{ cells:game.cells.player1Still },
            walk:{ loop:true, cells:game.cells.player1Walking, speed:0.1 },
            jump:{ loop:true, cells:game.cells.player1Jumping, speed:0.1 },
            fire:{ isFire:true, cells:game.cells.player1Firing, speed:C.PLAYERFIRESPEED },
            fireFaster:{ isFire:true, cells:game.cells.player1Firing, speed:C.PLAYERFASTFIRESPEED },
            fall:{ loop:true, cells:game.cells.player1Falling, speed:0.1 },
            dead:{ cells:game.cells.player1Dead, },
            smallBubble:{ cells:game.cells.player1SmallBubble },
            largeBubble:{ cells:game.cells.player1LargeBubble },
            frontWalk:{ loop:true, cells:game.cells.player1Front, speed:0.05 },
            handup:{ cells:game.cells.player1HandUp },
            transformed:{ cells:game.cells.player1Transformed },
            happy:{ loop:true, cells:game.cells.player1Happy, speed:0.1 },
            stunned:{ cells:game.cells.player1Stunned },
            
        },
        // 1: Player 2
        {
            still:{ cells:game.cells.player2Still },
            walk:{ loop:true, cells:game.cells.player2Walking, speed:0.1 },
            jump:{ loop:true, cells:game.cells.player2Jumping, speed:0.1 },
            fire:{ isFire:true, cells:game.cells.player2Firing, speed:C.PLAYERFIRESPEED },
            fireFaster:{ isFire:true, cells:game.cells.player2Firing, speed:C.PLAYERFASTFIRESPEED },
            fall:{ loop:true, cells:game.cells.player2Falling, speed:0.1 },
            dead:{ cells:game.cells.player2Dead, },
            smallBubble:{ cells:game.cells.player2SmallBubble },
            largeBubble:{ cells:game.cells.player2LargeBubble },
            frontWalk:{ loop:true, cells:game.cells.player2Front, speed:0.05 },
            handup:{ cells:game.cells.player2HandUp },
            transformed:{ cells:game.cells.player2Transformed },
            happy:{ loop:true, cells:game.cells.player2Happy, speed:0.1 },
            stunned:{ cells:game.cells.player2Stunned },
        },
        // 3: Poo
        {
            still:{ cells:game.cells.pooStill },
            walk:{ loop:true, cells:game.cells.pooWalking, speed:0.1 },
            jump:{ loop:true, cells:game.cells.pooJumping, speed:0.1 },
            fire:{ isFire:true, cells:game.cells.pooFiring, speed:C.PLAYERFIRESPEED },
            fireFaster:{ isFire:true, cells:game.cells.pooFiring, speed:C.PLAYERFASTFIRESPEED },
            fall:{ loop:true, cells:game.cells.pooFalling, speed:0.1 },
            dead:{ cells:game.cells.pooDead, },
            smallBubble:{ cells:game.cells.pooSmallBubble },
            largeBubble:{ cells:game.cells.pooLargeBubble },
            frontWalk:{ loop:true, cells:game.cells.pooFront, speed:0.05 },
            handup:{ cells:game.cells.pooHandUp },
            transformed:{ cells:game.cells.pooTransformed },
            happy:{ loop:true, cells:game.cells.pooHappy, speed:0.1 },
            stunned:{ cells:game.cells.pooStunned },
        },
        // 4: Shark
        {
            still:{ cells:game.cells.sharkStill },
            walk:{ loop:true, cells:game.cells.sharkWalking, speed:0.1 },
            jump:{ loop:true, cells:game.cells.sharkJumping, speed:0.1 },
            fire:{ isFire:true, cells:game.cells.sharkFiring, speed:C.PLAYERFIRESPEED },
            fireFaster:{ isFire:true, cells:game.cells.sharkFiring, speed:C.PLAYERFASTFIRESPEED },
            fall:{ loop:true, cells:game.cells.sharkFalling, speed:0.1 },
            dead:{ cells:game.cells.sharkDead, },
            smallBubble:{ cells:game.cells.sharkSmallBubble },
            largeBubble:{ cells:game.cells.sharkLargeBubble },
            frontWalk:{ loop:true, cells:game.cells.sharkFront, speed:0.05 },
            handup:{ cells:game.cells.sharkHandUp },
            transformed:{ cells:game.cells.sharkTransformed },
            happy:{ loop:true, cells:game.cells.sharkHappy, speed:0.1 },
            stunned:{ cells:game.cells.sharkStunned },
        },
        // 5: Snowman
        {
            still:{ cells:game.cells.snowmanStill },
            walk:{ loop:true, cells:game.cells.snowmanWalking, speed:0.1 },
            jump:{ loop:true, cells:game.cells.snowmanJumping, speed:0.1 },
            fire:{ isFire:true, cells:game.cells.snowmanFiring, speed:C.PLAYERFASTFIRESPEED },
            fireFaster:{ isFire:true, cells:game.cells.snowmanFiring, speed:C.PLAYERFASTFIRESPEED },
            fall:{ loop:true, cells:game.cells.snowmanFalling, speed:0.1 },
            dead:{ cells:game.cells.snowmanDead, },
            smallBubble:{ cells:game.cells.snowmanSmallBubble },
            largeBubble:{ cells:game.cells.snowmanLargeBubble },
            frontWalk:{ loop:true, cells:game.cells.snowmanFront, speed:0.05 },
            handup:{ cells:game.cells.snowmanHandUp },
            transformed:{ cells:game.cells.snowmanTransformed },
            happy:{ loop:true, cells:game.cells.snowmanHappy, speed:0.1 },
            stunned:{ cells:game.cells.snowmanStunned },
        },
        // 6: Jin
        {
            still:{ cells:game.cells.jinStill },
            walk:{ loop:true, cells:game.cells.jinWalking, speed:0.1 },
            jump:{ loop:true, cells:game.cells.jinJumping, speed:0.1 },
            fire:{ isFire:true, cells:game.cells.jinFiring, speed:C.PLAYERFIRESPEED },
            fireFaster:{ isFire:true, cells:game.cells.jinFiring, speed:C.PLAYERFASTFIRESPEED },
            fall:{ loop:true, cells:game.cells.jinFalling, speed:0.1 },
            dead:{ cells:game.cells.jinDead, },
            smallBubble:{ cells:game.cells.jinSmallBubble },
            largeBubble:{ cells:game.cells.jinLargeBubble },
            frontWalk:{ loop:true, cells:game.cells.jinFront, speed:0.05 },
            handup:{ cells:game.cells.jinHandUp },
            transformed:{ cells:game.cells.jinTransformed },
            happy:{ loop:true, cells:game.cells.jinHappy, speed:0.1 },
            stunned:{ cells:game.cells.jinStunned },
        },
        // 7: Hippo
        {
            still:{ cells:game.cells.hippoStill },
            walk:{ loop:true, cells:game.cells.hippoWalking, speed:0.1 },
            jump:{ loop:true, cells:game.cells.hippoJumping, speed:0.1 },
            fire:{ isFire:true, cells:game.cells.hippoFiring, speed:C.PLAYERFIRESPEED },
            fireFaster:{ isFire:true, cells:game.cells.hippoFiring, speed:C.PLAYERFASTFIRESPEED },
            fall:{ loop:true, cells:game.cells.hippoFalling, speed:0.1 },
            dead:{ cells:game.cells.hippoDead, },
            smallBubble:{ cells:game.cells.hippoSmallBubble },
            largeBubble:{ cells:game.cells.hippoLargeBubble },
            frontWalk:{ loop:true, cells:game.cells.hippoFront, speed:0.05 },
            handup:{ cells:game.cells.hippoHandUp },
            transformed:{ cells:game.cells.hippoTransformed },
            happy:{ loop:true, cells:game.cells.hippoHappy, speed:0.1 },
            stunned:{ cells:game.cells.hippoStunned },
        },
        // 8: Ninja
        {
            still:{ cells:game.cells.ninjaStill },
            walk:{ loop:true, cells:game.cells.ninjaWalking, speed:0.1 },
            jump:{ loop:true, cells:game.cells.ninjaJumping, speed:0.1 },
            fire:{ isFire:true, cells:game.cells.ninjaFiring, speed:C.PLAYERFIRESPEED },
            fireFaster:{ isFire:true, cells:game.cells.ninjaFiring, speed:C.PLAYERFASTFIRESPEED },
            fall:{ loop:true, cells:game.cells.ninjaFalling, speed:0.1 },
            dead:{ cells:game.cells.ninjaDead, },
            smallBubble:{ cells:game.cells.ninjaSmallBubble },
            largeBubble:{ cells:game.cells.ninjaLargeBubble },
            frontWalk:{ loop:true, cells:game.cells.ninjaFront, speed:0.05 },
            handup:{ cells:game.cells.ninjaHandUp },
            transformed:{ cells:game.cells.ninjaTransformed },
            happy:{ loop:true, cells:game.cells.ninjaHappy, speed:0.1 },
            stunned:{ cells:game.cells.ninjaStunned },
        },
        // 9: Cleaner
        {
            still:{ cells:game.cells.cleanerStill },
            walk:{ loop:true, cells:game.cells.cleanerWalking, speed:0.1 },
            jump:{ loop:true, cells:game.cells.cleanerJumping, speed:0.1 },
            fire:{ isFire:true, cells:game.cells.cleanerFiring, speed:C.PLAYERFIRESPEED },
            fireFaster:{ isFire:true, cells:game.cells.cleanerFiring, speed:C.PLAYERFASTFIRESPEED },
            fall:{ loop:true, cells:game.cells.cleanerFalling, speed:0.1 },
            dead:{ cells:game.cells.cleanerDead, },
            smallBubble:{ cells:game.cells.cleanerSmallBubble },
            largeBubble:{ cells:game.cells.cleanerLargeBubble },
            frontWalk:{ loop:true, cells:game.cells.cleanerFront, speed:0.05 },
            handup:{ cells:game.cells.cleanerHandUp },
            transformed:{ cells:game.cells.cleanerTransformed },
            happy:{ loop:true, cells:game.cells.cleanerHappy, speed:0.1 },
            stunned:{ cells:game.cells.cleanerStunned },
        },
        // 10: Marine
        {
            still:{ cells:game.cells.marineStill },
            walk:{ loop:true, cells:game.cells.marineWalking, speed:0.1 },
            jump:{ loop:true, cells:game.cells.marineJumping, speed:0.1 },
            fire:{ isFire:true, cells:game.cells.marineFiring, speed:C.PLAYERFIRESPEED },
            fireFaster:{ isFire:true, cells:game.cells.marineFiring, speed:C.PLAYERFASTFIRESPEED },
            fall:{ loop:true, cells:game.cells.marineFalling, speed:0.1 },
            dead:{ cells:game.cells.marineDead, },
            smallBubble:{ cells:game.cells.marineSmallBubble },
            largeBubble:{ cells:game.cells.marineLargeBubble },
            frontWalk:{ loop:true, cells:game.cells.marineFront, speed:0.05 },
            handup:{ cells:game.cells.marineHandUp },
            transformed:{ cells:game.cells.marineTransformed },
            happy:{ loop:true, cells:game.cells.marineHappy, speed:0.1 },
            stunned:{ cells:game.cells.marineStunned },
        }
    ];

    C.LETTERBUBBLESCOUNT=6;
    C.LETTERBUBBLES=[];

    C.SPECIALBUBBLES={
        water:{
            isSpecial:true,
            animation:{
                loop:true,
                cells:game.cells.waterBubble,
                speed:0.1
            },
            set:["isWaterBubble"],
            onBubblePopped:{
                spawnWaterWave:3
            }
        },
        tornado:{
            isSpecial:true,
            animation:{
                loop:true,
                cells:game.cells.tornadoBubble,
                speed:0.2
            },
            set:["isTornadoBubble"],
            onBubblePopped:{
                spawnTornado:1
            }
        },
        spinStar:{
            isSpecial:true,
            animation:{
                loop:true,
                cells:game.cells.spinStarBubble,
                speed:0.1
            },
            set:["isSpinStarBubble"],
            onBubblePopped:{
                spawnSpinStar:3
            }
        },
        poison:{
            isSpecial:true,
            animation:{
                loop:true,
                cells:game.cells.poisonBubble,
                speed:0.1
            },
            set:["isPoisonBubble"],
            onBubblePopped:{
                spawnPoison:3
            }
        },
        bolt:{
            isSpecial:true,
            animation:{
                loop:true,
                cells:game.cells.boltBubble,
                speed:0.1
            },
            set:["isBoltBubble"],
            onBubblePopped:{
                spawnBolts:1
            }
        },
        fire:{
            isSpecial:true,
            animation:{
                loop:true,
                cells:game.cells.fireBubble,
                speed:0.1
            },
            set:["isFireBubble"],
            onBubblePopped:{
                spawnFire:1
            }
        },
        normal:{
            animation:{
                cells:game.cells.player1LargeBubble
            }
        }
    };

    C.LABELS={
        highscore:game.printImage(game.fonts.normal.normal, 5, C.HIGHSCORELABEL),
        continue:game.printImage(game.fonts.normal.outline, 1, C.CONTINUELABEL),
        credits:game.printImage(game.fonts.normal.outline, 1, C.CREDITSLABEL),
        titlerow1:game.printImage(game.fonts.normal.normal, 1, "(c) KESIEV CORPORATION 2022"),
        titlerow2:game.printImage(game.fonts.normal.normal, 1, "ALL CODE OPENSOURCED"),
        introrow1:game.printImage(game.fonts.normal.outline, 5, "NOW,IT IS A BEGINNING OF A"),
        introrow2:game.printImage(game.fonts.normal.outline, 5, "FANTASTIC HEIST!! LET'S MAKE"),
        introrow3:game.printImage(game.fonts.normal.outline, 5, "A JOURNEY TO STEAL THE GREAT"),
        introrow4:game.printImage(game.fonts.normal.outline, 5, "YENDOR'S AMULET! GOOD LUCK!"),
        hurryup:[
            game.printImage(game.fonts.normal.outline, 1, C.HURRYUPLABEL),
            game.printImage(game.fonts.normal.outline, 5, C.HURRYUPLABEL)
        ],
        up:[
            game.printImage(game.fonts.normal.normal, 3, "1UP"),
            game.printImage(game.fonts.normal.normal, 4, "2UP")
        ],
        score:[],
        letters:[
            game.newImage(game.cells.letterBubbles.frames[0].width,game.cells.letterBubbles.frames[0].height*C.LETTERBUBBLESCOUNT),
            game.newImage(game.cells.letterBubbles.frames[0].width,game.cells.letterBubbles.frames[0].height*C.LETTERBUBBLESCOUNT)
        ],
        lives:[game.newImage(C.LIVESWIDTH,C.LIVESHEIGHT),game.newImage(C.LIVESWIDTH,C.LIVESHEIGHT)],
        insert:[
            game.printImage(game.fonts.normal.normal, 3, "INSERT"),
            game.printImage(game.fonts.normal.normal, 4, "INSERT")
        ],
        coin:[
            game.printImage(game.fonts.normal.normal, 3, "COIN"),
            game.printImage(game.fonts.normal.normal, 4, "COIN")
        ],
        press:[
            game.printImage(game.fonts.normal.normal, 3, "PRESS"),
            game.printImage(game.fonts.normal.normal, 4, "PRESS")
        ],
        start:[
            game.printImage(game.fonts.normal.normal, 3, "START"),
            game.printImage(game.fonts.normal.normal, 4, "START")
        ],
        to:[
            game.printImage(game.fonts.normal.normal, 3, "TO"),
            game.printImage(game.fonts.normal.normal, 4, "TO")
        ],
        play:[
            game.printImage(game.fonts.normal.normal, 3, "PLAY"),
            game.printImage(game.fonts.normal.normal, 4, "PLAY")
        ],
        yendorEnding:[
            game.printImage(game.fonts.normal.normal, 1, "YOU MANAGED TO STEAL THE"),
            game.printImage(game.fonts.normal.normal, 1, "GREAT YENDOR'S AMULET"),
            game.printImage(game.fonts.normal.normal, 1, "AND ESCAPED THE DUNGEONS!"),
            game.printImage(game.fonts.normal.normal, 1, "NOW ALL YOUR DREAMS"),
            game.printImage(game.fonts.normal.normal, 1, "CAN COME TRUE!"),
        ],
        treasureEnding:[
            game.printImage(game.fonts.normal.normal, 1, "YOU MISSED THE YENDOR'S"),
            game.printImage(game.fonts.normal.normal, 1, "AMULET... BUT YOU STILL"),
            game.printImage(game.fonts.normal.normal, 1, "MANAGED TO STEAL A LOT"),
            game.printImage(game.fonts.normal.normal, 1, "OF GOODS! YOU CAN LIVE THE"),
            game.printImage(game.fonts.normal.normal, 1, "REST OF YOUR LIFE AS A KING!"),
        ],
        gameover:game.printImage(game.fonts.normal.normal, 5, C.GAMEOVERLABEL),
        points:{}
    };

    C.cageInBubble=(game,scene,sprite)=>{
        let bubble = game.addNewSprite(scene.sprites.largeBubble,sprite.x,sprite.y);
        bubble.isCagedEnemy = true;
        bubble.onDie = sprite.properties.onDie;
        bubble.onBubbleRelease = sprite.properties.onBubbleRelease;
        bubble.onBubblePopped = sprite.properties.onBubblePopped;
        bubble.animationOnScatter = sprite.animations[sprite.mode].stunned;
        if (sprite.tags.toclear) bubble.addTag("toclear");
        bubble.setAnimation(sprite.animations[sprite.mode].bubble);
        sprite.remove();
    }

    C.cageInSnow=(game,scene,sprite)=>{
        sprite.removeTag("killplayer");
        sprite.setState(sprite.states.snowing);
    }

    C.squished=(game,scene,sprite,by)=>{
        game.playAudio(game.audio.squish);
        if (!sprite.mode) {
            if (sprite.speedY<0) sprite.setSpeedY(-sprite.speedY);
            sprite.mode=1;
        } else {
            game.playAudio(game.audio.pushsnow);
            sprite.setState(sprite.states.rolling);
            sprite.setAnimation(sprite.animations[sprite.mode].panic);
            if (by.flipX) {
                sprite.setFlipX(false);
                sprite.setSpeedX(C.SNOWBALLSPEED);
            } else {
                sprite.setFlipX(true);
                sprite.setSpeedX(-C.SNOWBALLSPEED);
            }
            sprite.rollcombo=0;
        }
    }

    C.rushed=(game,scene,sprite,by)=>{
        C.killEnemy(game,scene,sprite,by.rushCombo);
        return true;
    }

    C.bulleted=(game,scene,sprite,audio,bonus,by,counter)=>{
        let scatter=C.scatterAround(game,scene,sprite);
        if (bonus) scatter.onDie={ spawnBonus:bonus };
        if (by) C.increaseCounter(game,scene,by.playerId,counter);
        if (audio) game.playAudio(audio);
        return true;
    }

    C.washed=(game,scene,sprite)=>{
        sprite.removeTag("killplayer");
        sprite.setAnimation(sprite.animations[sprite.mode].washed);
        sprite.setState(sprite.states.stunned);
    }

    C.sucked=(game,scene,sprite)=>{
        sprite.removeTag("killplayer");
        sprite.setAnimation(sprite.animations[sprite.mode].panic);
        sprite.setState(sprite.states.sucking);
    }

    C.frozen=(game,scene,sprite)=>{
        if (!sprite.frozen) {
            sprite.frozen=true;
            sprite.setLogicEnabled(false);
            sprite.setPhysicsEnabled(false);
            sprite.setAnimationEnabled(false);
        }
    }

    C.unfrozen=(game,scene,sprite)=>{
        if (sprite.frozen)
            C.cancelFreeze(game,scene,sprite);
    }

    C.gunned=(game,scene,sprite,by)=>{
        if (sprite.mode || by.iscritical) {
            sprite.setState(sprite.states.rolling);
            sprite.setAnimation(sprite.animations[sprite.mode].panic);
            if (by.flipX) {
                sprite.setFlipX(true);
                sprite.setSpeedX(-C.SNOWBALLSPEED);
            } else {
                sprite.setFlipX(false);
                sprite.setSpeedX(C.SNOWBALLSPEED);
            }
            sprite.rollcombo=0;
        } else {
            sprite.mode=1;
            sprite.setSpeedX(-sprite.speedX);
            sprite.setFlipX(!sprite.flipX);
        }
    }

    C.ENEMYSUCKING={
        collisions:C.STUNNEDENEMYCOLLISIONS,
        onBulleted:(game,scene,sprite,audio,bonus,by,counter)=>{
            C.bulleted(game,scene,sprite,audio,bonus,by,counter);
        },
        onSucked:(game,scene,sprite,by)=>{
            if (!sprite.issucked)
                game.playAudio(game.audio.sucking);
            sprite.sucker=by;
            sprite.suckedbyplayer=by.player;
            sprite.suckingamount+=C.SUCKINGAMOUNT;
            sprite.suckingpause=C.SUCKINGPAUSETIMER;
            sprite.issucked=true;
        },
        onEnter:(game,scene,sprite)=>{
            C.enemyStart(game,scene,sprite);
            C.cancelFreeze(game,scene,sprite);
            sprite.sucker=0;
            sprite.suckingamount=0;
            sprite.suckingshaketimer=0;
            sprite.suckingpause=C.SUCKINGPAUSETIMER;
            sprite.setVisible(true);
            sprite.setAnimation(sprite.animations[sprite.mode].panic);
            sprite.setVisible(true);
            sprite.setSpeedX(0);
            sprite.setSpeedY(0);
            sprite.setAccelX(0);
            sprite.setAccelY(C.GRAVITY);
            sprite.issucked=false;
        },
        onLogic:(game,scene,sprite)=>{
            C.applyVerticalWarp(sprite);
            if (sprite.sucker) {
                if (Math.abs(sprite.sucker.x-sprite.x)>2)
                    if (sprite.sucker.x<sprite.x)
                        sprite.setSpeedX(-0.2);
                    else
                        sprite.setSpeedX(0.2);
                else {
                    sprite.suckingshaketimer++;
                    if (C.checkEvery(sprite.suckingshaketimer,2))
                        if (C.checkBlink(sprite.suckingshaketimer,2)) {
                            sprite.setFlipX(true);
                            sprite.setSpeedX(-1);
                        } else {
                            sprite.setFlipX(false);
                            sprite.setSpeedX(1);
                        }
                }
                sprite.sucker=0;
            } else {
                sprite.issucked=false;
                sprite.setSpeedX(0);
            }
                
            if (sprite.suckingpause)
                sprite.suckingpause--;
            else {
                sprite.mode=1;
                C.enemyRestore(game,scene,sprite);
            }
            if (sprite.suckingamount>1)
                if (sprite.suckedbyplayer && !sprite.suckedbyplayer.removed && sprite.suckedbyplayer.backpack) {
                    game.addNewSprite(scene.sprites.disappear,sprite.x,sprite.y);
                    sprite.setState(sprite.states.sucked);
                    sprite.suckedbyplayer.backpack.state.addSuckedEnemy(game,scene,sprite.suckedbyplayer.backpack,sprite);
                    game.playAudio(game.audio.sucked);
                } else sprite.suckingamount=0;
        }
    }

    C.ENEMYSUCKED={
        onEnter:(game,scene,sprite)=>{
            C.enemyStart(game,scene,sprite);
            C.cancelFreeze(game,scene,sprite);
            sprite.setPhysicsEnabled(false);
            sprite.setVisible(false);
        },
        onLogic:(game,scene,sprite)=>{
            sprite.setX(sprite.suckedbyplayer.x);
            sprite.setY(sprite.suckedbyplayer.y);
        }
    }

    C.ENEMYSNOWING={
        onSnowed:(game,scene,sprite)=>{
            if (sprite.snowsprite.state.onEnemySnowed)
                sprite.snowsprite.state.onEnemySnowed(game,scene,sprite.snowsprite);
        },
        onBulleted:(game,scene,sprite,audio,bonus,by,counter)=>{
            C.bulleted(game,scene,sprite,audio,bonus,by,counter);
            if (sprite.snowsprite)
                sprite.snowsprite.remove();
        },
        onRushed:(game,scene,sprite,by)=>{
            C.rushed(game,scene,sprite,by);
            if (sprite.snowsprite)
                sprite.snowsprite.remove();
            return true;
        },
        onEnter:(game,scene,sprite)=>{
            C.enemyStart(game,scene,sprite);
            C.cancelFreeze(game,scene,sprite);
            sprite.setPhysicsEnabled(false);
            sprite.setAnimation(sprite.animations[sprite.mode].panic);
            if (!sprite.snowsprite || sprite.snowsprite.removed) {
                sprite.snowsprite=game.addNewSprite(scene.sprites.snowing,sprite.x,sprite.y);
                sprite.snowsprite.snowedsprite=sprite;
            }
        }
    }

    C.ENEMYSTUNNED={
        collisions:C.STUNNEDENEMYCOLLISIONS,
        onStunned:(game,scene,sprite)=>{
            sprite.stunnedtimer=C.STUNNEDTIMER;
            sprite.setVisible(true);
        },
        onWashed:(game,scene,sprite)=>{
            sprite.state.onStunned(game,scene,sprite);
        },
        onBulleted:(game,scene,sprite,audio,bonus,by,counter)=>{
            C.bulleted(game,scene,sprite,audio,bonus,by,counter);
        },
        onEnter:(game,scene,sprite)=>{
            C.enemyStart(game,scene,sprite);
            C.cancelFreeze(game,scene,sprite);
            sprite.setVisible(true);
            sprite.setSpeedX(0);
            sprite.setSpeedY(0);
            sprite.setAccelX(0);
            sprite.setAccelY(C.GRAVITY);
            sprite.stunnedtimer=C.STUNNEDTIMER;  
        },
        onLogic:(game,scene,sprite)=>{
            C.applyVerticalWarp(sprite);
            sprite.stunnedtimer--;
            if (!sprite.stunnedtimer) {
                sprite.mode=1;
                C.enemyRestore(game,scene,sprite);
            } else if (sprite.stunnedtimer<C.ONESEC)
                sprite.setVisible(C.checkBlink(sprite.stunnedtimer,2));
            C.managePlayerPush(game,scene,sprite,sprite.states.rolling);
        }
    }

    C.ENEMYROLLING={
        collisions:C.ROLLINGENEMYCOLLISIONS,
        onEnter:(game,scene,sprite)=>{
            C.enemyStart(game,scene,sprite);
            C.cancelFreeze(game,scene,sprite);    
            sprite.removeTag("killplayer");
            sprite.removeTag("hitable");
            sprite.setAccelX(0);
            sprite.setAccelY(0);
            sprite.setSpeedY(0);
            sprite.setVisible(true);
            sprite.rolltimer=0;
            sprite.rollcombo=0;
        },
        onLogic:(game,scene,sprite)=>{
            C.applyVerticalWarp(sprite);
            sprite.rolltimer++;
            if (sprite.rolltimer>=5) {
                if (sprite.speedX>0)
                    sprite.setAngle(sprite.angle+90);
                else
                    sprite.setAngle(sprite.angle-90);
                sprite.rolltimer=0;
            }
            if (sprite.collisions.hitable)
                sprite.collisions.hitable.all.forEach(collision=>{
                    game.addNewSprite(scene.sprites.disappear,sprite.x,sprite.y-8);
                    C.killEnemy(game,scene,collision.object,sprite.rollcombo);
                    sprite.rollcombo++;
                });
            if (!sprite.speedX||sprite.collisions.wall||sprite.collisions.solidwall) {
                game.addNewSprite(scene.sprites.disappear,sprite.x,sprite.y);
                C.evaluatePlayerCombo(game,scene,sprite.rollcombo,1);
                C.killEnemy(game,scene,sprite,sprite.rollcombo);
            }
        }
    }

    C.ENEMYPREPARING={
        onSquished:C.squished,
        onBubbled:C.cageInBubble,
        onSnowed:C.cageInSnow,
        onWashed:C.washed,
        onRushed:C.rushed,
        onBulleted:C.bulleted,
        onFrozen:C.frozen,
        onUnfrozen:C.unfrozen,
        onSucked:C.sucked,
        onGunned:C.gunned,
        onEnter:(game,scene,sprite)=>{
            sprite.setPhysicsEnabled(false);
        },
        onLogic:(game,scene,sprite)=>{
            C.commonEnemyLogic(game,scene,sprite);
            sprite.setAnimation(sprite.animations[sprite.mode].still);
            if (sprite.y<sprite.destY)
                sprite.setY(sprite.y+C.ENEMYAPPEARSPEED);
            if (sprite.y>sprite.destY)
                sprite.setY(sprite.destY);
        }
    };

    C.ENEMYKILL={
        isKilling:true,
        onSquished:C.squished,
        onBubbled:C.cageInBubble,
        onSnowed:C.cageInSnow,
        onWashed:C.washed,
        onRushed:C.rushed,
        onBulleted:C.bulleted,
        onFrozen:C.frozen,
        onUnfrozen:C.unfrozen,
        onSucked:C.sucked,
        onGunned:C.gunned,
        onEnter:(game,scene,sprite)=>{
            sprite.killtimer=C.HALFSEC;
            sprite.setPhysicsEnabled(false);
            sprite.setAnimationEnabled(false);
        },
        onLogic:(game,scene,sprite)=>{
            if (sprite.killtimer)
                sprite.killtimer--;
            else {
                sprite.setPhysicsEnabled(true);
                sprite.setAnimationEnabled(true);
                sprite.setVisible(true);
                sprite.setState(sprite.states.default);
            }
        }
    };

    C.ENEMYJUMPING={
        collisions:C.ENEMYCOLLISIONS,
        onSquished:C.squished,
        onBubbled:C.cageInBubble,
        onSnowed:C.cageInSnow,
        onWashed:C.washed,
        onRushed:C.rushed,
        onBulleted:C.bulleted,
        onFrozen:C.frozen,
        onUnfrozen:C.unfrozen,
        onSucked:C.sucked,
        onGunned:C.gunned,
        onEnter:(game,scene,sprite)=>{
            sprite.timer=59;
            sprite.setSpeedX(0);
        },
        onLogic:(game,scene,sprite)=>{
            C.applyVerticalWarp(sprite);
            C.commonEnemyLogic(game,scene,sprite);
            sprite.changeAnimation(sprite.animations[sprite.mode].still);
            if (sprite.collisions.bottom && (sprite.collisions.bottom.wall||sprite.collisions.bottom.solidwall)) {
                sprite.timer--;
                if (C.checkEvery(sprite.timer,15)) sprite.flip();
                if (!sprite.timer) {
                    sprite.setSpeedY(C.JUMPSPEED);
                    sprite.setFlipX(C.RND.randomBool(0.5));
                    sprite.changeState(sprite.states.default);
                }
            } else sprite.changeState(sprite.states.default);
        }
    };

    C.SMALLJUMPING={
        collisions:C.ENEMYSMALLJUMPCOLLISIONS,
        onSquished:C.squished,
        onBubbled:C.cageInBubble,
        onSnowed:C.cageInSnow,
        onWashed:C.washed,
        onRushed:C.rushed,
        onBulleted:C.bulleted,
        onFrozen:C.frozen,
        onUnfrozen:C.unfrozen,
        onSucked:C.sucked,
        onGunned:C.gunned,
        onEnter:(game,scene,sprite)=>{
            sprite.smalljumptimer=26;
            sprite.changeAnimation(sprite.animations[sprite.mode].jump);
            sprite.setSpeedY(-0.7);
        },
        onLogic:(game,scene,sprite)=>{
            C.applyVerticalWarp(sprite);
            if (sprite.smalljumptimer)
                sprite.smalljumptimer--;
            else {
                sprite.setSpeedY(0);
                sprite.changeState(sprite.states.default);
            }
        }
    };

    C.SPRITEDISAPPEAR={
        tags:["stagesprite"],
        zIndex:C.EFFECTSZINDEX,
        animations:{
            default:{
                cells:game.cells.disappear,
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

    C.STAFFROLLIMAGE=game.newImage(C.SCREENWIDTH,C.STAFFROLL.length*game.fonts.normal.normal.letterHeight);

    C.MEMORY=0;
    C.HIGHSCORE=0;
    C.HIGHSTAGE=1;
    C.HIGHSTAGETREASUREMODE=false;
    C.HIGHSCOREVALUEX=0;
    C.STAGES=0;

    C.STAFFROLL.forEach((line,id)=>{
        if (line)
            game.print(game.fonts.normal.normal,line[0],line[1],(C.SCREENWIDTH-line[1].length*game.fonts.normal.normal.letterWidth)/2,id*game.fonts.normal.normal.letterHeight,C.STAFFROLLIMAGE);
    });

    for (let i=0;i<C.LETTERBUBBLESCOUNT;i++)
        C.LETTERBUBBLES.push({
            isSpecial:true,
            animation:{
                cells:game.cells.letterBubbles,
                frame:i,
                isStill:true
            },
            onBubblePopped:{
                gainLetter:i
            }
        });

    C.createPlayersLabel=(id,text)=>{
        if (!C.LABELS.points[id]) {
            C.LABELS.points[id]=[];
            for (let i=0;i<C.PLAYERSCOUNT;i++)
                C.LABELS.points[id].push(game.printImage(game.fonts.normal.outline, C.PLAYERCOLORS[i],text));
        }
    }

    C.BONUSES.all.forEach((bonus,frame)=>{
        if (bonus.points) C.createPlayersLabel(bonus.points,bonus.points);
        if (bonus.setEndBubblesSpawnPoints) C.createPlayersLabel(bonus.setEndBubblesSpawnPoints,bonus.setEndBubblesSpawnPoints);
        if (bonus.allPlayersPoints) C.createPlayersLabel(bonus.allPlayersPoints,bonus.allPlayersPoints);
        bonus.frame = frame;
        bonus.tags.forEach(tag=>{
            if (!C.BONUSES[tag]) C.BONUSES[tag]=[];
            C.BONUSES[tag].push(bonus);
        })
    });

    C.GIANTBONUSES.all.forEach((bonus,frame)=>{
        if (bonus.points) C.createPlayersLabel(bonus.points,bonus.points);
        bonus.frame = frame;
        bonus.tags.forEach(tag=>{
            if (!C.GIANTBONUSES[tag]) C.GIANTBONUSES[tag]=[];
            C.GIANTBONUSES[tag].push(bonus);
        })
    });

    C.DIMMER=game.newImage(C.SCREENWIDTH,C.SCREENHEIGHT);
    for (let y=0;y<C.SCREENHEIGHT;y++)
        for (let x=y%2;x<C.SCREENWIDTH;x+=2)
            game.fillRect(game.palette[0],x,y,1,1,C.DIMMER);

}