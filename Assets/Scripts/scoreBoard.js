#pragma strict
public var canvas : GameObject;
public var playerScoreText : GameObject;
public var player : GameObject;

function Start () {

}

function Update () {
	canvas.transform.position = getMidpoint();
	var gos : GameObject[] = GameObject.FindGameObjectsWithTag("Player");
	var totalScore : float;
	for (var i : int = 0; i < gos.length; i++)
		totalScore += gos[i].GetComponent.<Rigidbody2D>().mass;
	var convertedScore : int = Mathf.Ceil(totalScore);

	playerScoreText.GetComponent(UI.Text).text = "Score: " + convertedScore;
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