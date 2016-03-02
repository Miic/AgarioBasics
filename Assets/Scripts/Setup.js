#pragma strict
public var player: GameObject;


function Start () {

}

function Update () {
}

function setup(playerName : String) {

}

 function getMidpoint() {
    var gos : GameObject[];
    gos = GameObject.FindGameObjectsWithTag("Player");
    var midpoint : Vector3;

    for (var i : int = 0; i < gos.length; i++) {
        midpoint += gos[i].transform.position;
    }
    midpoint.x /= gos.length;
    midpoint.y /= gos.length;
    midpoint.z /= gos.length;

    return midpoint;
    }
