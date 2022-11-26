function gameLoadTransitions(game,scenes,C) {

    scenes.blackscreen={
        onEnter:(game,scene)=>{
            game.clearSprites();
            this.timer=C.ONESEC;
            C.saveHighScore(game,scene);
        },
        onLogic:(game,scene)=>{
            this.timer--;
            if (!this.timer)
                game.setScene(scene.destinationScene);
        },
        onDraw:(game, scene)=>{
            game.clearScreen();
        }
    }
    
}