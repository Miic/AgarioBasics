#pragma strict
public var randomRate : float = 0.3;
public var maxSpawn : int;
public var FoodPrefab : GameObject;
public var Spike : GameObject;

function Start () {
	StartCoroutine("attemptSpawn");
}

function attemptSpawn () {
	while (true) {
		var gos : GameObject[];
		gos = GameObject.FindGameObjectsWithTag("Collectable");
		if (gos.length < maxSpawn) {
			if (Random.Range(0,99) <= randomRate*100) {
				
				var randomPosition : Vector3;
				var bottomLeftCorner : Vector3 = transform.position + Vector3(-(transform.localScale.x/2), -(transform.localScale.y/2), 0);

				randomPosition = bottomLeftCorner + Vector3(Random.Range(0,transform.localScale.x), Random.Range(0,transform.localScale.y), 0);
				var FoodPrefabClone = Instantiate(FoodPrefab, randomPosition, transform.rotation) as GameObject;
				if (Random.Range(0,99) == 0) {
					randomPosition = bottomLeftCorner + Vector3(Random.Range(0,transform.localScale.x), Random.Range(0,transform.localScale.y), 0);
					var SpikeClone = Instantiate(Spike, randomPosition, transform.rotation) as GameObject;
				}
				yield WaitForSeconds(0.5);
			}
		} else {
			yield WaitForSeconds(Random.Range(60, 60*5)); 
		}
	}
}