function gameLoadDiamonds(game,scene,C) {

    scene.sprites.smallDiamond={
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
                    C.manageBullet(game,scene,sprite,"onDiamonded",true);
                }
            }
        }
    };

}