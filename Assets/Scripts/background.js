#pragma strict
public var obj : GameObject;
//NO ODD NUMBERS, ONLY EVEN
public var xAmount : int ;
public var yAmount : int ;

function Start () {
	var offset : Vector3 = Vector3 (-(obj.transform.position.x) / 2, -(obj.transform.position.y) / 2, 0);
	for (var i : int = 0; i < xAmount+2; i++){
		for (var j : int = 0; j < yAmount+2; j++){
			var backgroundClone : GameObject = Instantiate(obj, offset + Vector3(obj.transform.position.x + (i*obj.transform.localScale.x), obj.transform.position.y + (j*obj.transform.localScale.y) , 0), transform.rotation);
			if ((i == 0 || i == xAmount+1) || (j == 0 || j == yAmount+1)) {
				backgroundClone.GetComponent.<BoxCollider2D>().isTrigger = false;
				Destroy(backgroundClone.GetComponent("Spawn Pickups"));
			}
		}
	}

}
