#pragma strict

function Start () {

}

function Update () {
	gameObject.transform.position = getMidpoint() + Vector3(0,0,-(getTotalRadius()+8)); //Ugly Fix. No getViewDistance algorithm.

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

function getTotalRadius() {
	var gos : GameObject[];
    gos = GameObject.FindGameObjectsWithTag("Player");
    var amount : float;

    for (var i : int = 0; i < gos.length; i++) {
        amount += gos[i].transform.localScale.x;
    }
    amount /= gos.length;
    
    return amount;
}

function getTotalMass() {
	var gos : GameObject[];
    gos = GameObject.FindGameObjectsWithTag("Player");
    var amount : float;

    for (var i : int = 0; i < gos.length; i++) {
        amount += gos[i].GetComponent.<Rigidbody2D>().mass;
    }
    amount /= gos.length;
    
    return amount;
}

function getViewDistance() { //Needs algorithm to find 2 fartherest points in an area pls.
	//cameraDistance = (distanceBetweenPlayers / 2 / aspectRatio) / Tan (fieldOfView / 2);

}