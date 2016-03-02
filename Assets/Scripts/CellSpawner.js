#pragma strict

public var FoodPrefab : GameObject;

function Start () {
	
}

function Update () {
	var gos : GameObject[];
    gos = GameObject.FindGameObjectsWithTag("Collectable");
    if(gos.length < 200)
    {
      if (Random.Range(0,10) == 0) {
      	//yield WaitForSeconds(1);
      	var FoodPrefabClone = Instantiate(FoodPrefab, transform.position + (Random.insideUnitCircle*10), transform.rotation) as GameObject;
      }
    }
}