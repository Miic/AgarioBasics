#pragma strict

//Food Options
 private var randomFoodRange = 0.5;
 public var foodValue : float = 0.1;
 
 function Start () {
	GetComponent.<Renderer>().material.color = Color(Random.Range(0.0,1.0),Random.Range(0.0,1.0),Random.Range(0.0,1.0), 1f);
 }

function ReqFeed(caller : GameObject) {
	if (caller.GetComponent.<Rigidbody2D>().mass >= gameObject.GetComponent.<Rigidbody2D>().mass) {
		caller.SendMessage("Feed", foodValue);
		Destroy(gameObject);
	}
}