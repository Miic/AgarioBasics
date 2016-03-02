#pragma strict

function Start () {
GetComponent.<Renderer>().material.color = Color.green;
 }

function Update () {

}

function OnTriggerEnter2D(coll: Collider2D) {
	if (coll.gameObject.tag == "Player") {
		if (coll.gameObject.transform.localScale.x > transform.localScale.x) {
			coll.gameObject.SendMessage("split");
		}
	} else if (coll.gameObject.tag == "Collectable") {
		coll.gameObject.transform.localScale += Vector3(0.5, 0.5, 0);
		Destroy(coll.gameObject);
	}
}