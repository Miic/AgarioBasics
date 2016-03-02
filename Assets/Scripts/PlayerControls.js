#pragma strict
public var speed : float = 2;

public var projectile : GameObject;
public var playerClone : GameObject;
public var combineTimer : int = -1;

private var defaultMass : float;
private var timeLastAte : int;
private var debouncer : boolean = true;

function Start() {
    defaultMass = GetComponent.<Rigidbody2D>().mass;
    GetComponent.<Renderer>().material.color = Color(Random.Range(0.0,1.0),Random.Range(0.0,1.0),Random.Range(0.0,1.0), 1f);

    StartCoroutine("HungerAlgorithm");
    debouncer = false;
    setTimer(3*parseInt(Mathf.Ceil(GetComponent.<Rigidbody2D>().mass)));
}
        
 function Update() { 
   // Force applyied on 
   var mouseX : float = Input.mousePosition.x - Screen.width/2; // relative to center becuase screen was measuring positive from bottom left
    var mouseY : float = Input.mousePosition.y - Screen.height/2;
    GetComponent.<Rigidbody2D>().AddForceAtPosition(Vector3(mouseX,mouseY, 0 ) * speed, transform.position);

    transform.Find("Canvas").transform.Find("Text").transform.position = transform.position + Vector3(0,0,-1);

    // Make players move towards each other
    GetComponent.<Rigidbody2D>().AddForceAtPosition(5*Vector3(getMidpoint().x - transform.position.x, getMidpoint().y - transform.position.y, 0 ), transform.position);;
       
    // Scale drag up as mass increases
   //GetComponent.<Rigidbody2D>().drag = Mathf.Pow(1.00001,-1*GetComponent.<Rigidbody2D>().mass/speed)+40;
  
        if (Input.GetKeyUp ("c"))
            GetComponent.<Renderer>().material.color = Color(Random.Range(0.0,1.0),Random.Range(0.0,1.0),Random.Range(0.0,1.0), 1f);
        else if(Input.GetButtonUp("Jump") && GetComponent.<Rigidbody2D>().mass > defaultMass*2){
        	split();
        }
               else if (Input.GetKeyUp ("w") && debouncer == false && GetComponent.<Rigidbody2D>().mass > defaultMass) {
            shoot(Instantiate(projectile, getPointOnRimOfCircle(transform.localScale.x/3), transform.rotation), 2);
            Feed(-.1);
         }
 }

 ////////////////////////////////EATING FUNCTIONS///////////////////////////////

 function HungerAlgorithm() {
     while (true) {
         if  (GetComponent.<Rigidbody2D>().mass >= defaultMass) {
             if (timeLastAte > 5) { //Starts getting hungry after 5 seconds. Nom Nom
                 Feed(-(transform.localScale.x)/100);
             }
         }
         timeLastAte++;
         yield WaitForSeconds(1);
     }
 }


function Feed(amount : float) {
    transform.localScale += Vector3(amount,amount,0);
    if (amount > 0)
        timeLastAte = 0;
    if (speed > 2)
        speed -= amount/20;
}

/////////////////////////////////////PROJECTILE FUNCTIONS///////////////////////////////////////

/*
*Splits the mass of the object into two when "w' is entered
*/
function split() {
	var clone: GameObject = playerClone;
	playerClone.gameObject.SendMessage("Feed", playerClone.transform.localScale.x /2);
	playerClone.gameObject.SendMessage("setFlag" , false);
	playerClone.SendMessage("setName", transform.Find("Canvas").transform.Find("Text").GetComponent(UI.Text).text );
	playerClone.SendMessage("setColor", GetComponent.<Renderer>().material.color );
	Feed(-transform.localScale.x / 2);
	setTimer(5);
	setFlag(false);
	shoot(Instantiate(gameObject, getPointOnRimOfCircle(transform.localScale.x*1.125), transform.rotation), 2);
}

function shoot(obj: GameObject, amount : float) {
    var mouseX : float = Input.mousePosition.x - Screen.width/2; // relative to center becuase screen was measuring positive from bottom left
    var mouseY : float = Input.mousePosition.y - Screen.height/2;
    obj.GetComponent.<Rigidbody2D>().AddForceAtPosition(amount*Vector3(mouseX,mouseY, 0 ) * speed,  transform.position);

}

function cooldown(){
	yield WaitForSeconds(1);
	debouncer = false;
}

////////////////////////////////////////INTERACTIONS ALGS//////////////////////////////////////////////////////

var onlyCombine : GameObject;
var flag : boolean = false;

function setFlag(b : boolean) {
	flag = b;
}

function OnCollisionEnter2D(coll: Collision2D) {
    var other : GameObject = coll.gameObject;
    //print("YEAH BOTH 0");

    if (coll.gameObject.tag == "Enemy")
        coll.gameObject.SendMessage("ApplyDamage", 10);
    else if (coll.gameObject.tag == "Collectable") {
        coll.gameObject.SendMessage("ReqFeed", gameObject);
    }
    else if(other.tag == "Player" && flag == false){
        flag = true;
        onlyCombine = other;
        decreaseTimer();
        print("YEAH BOTH 0sfsdfsdfsdf");
    }

    if(other.GetInstanceID() == onlyCombine.GetInstanceID()){
        if (combineTimer <= 0){
            if (coll.gameObject.GetComponent.<Rigidbody2D>().mass >= GetComponent.<Rigidbody2D>().mass) {
                coll.gameObject.SendMessage("Feed", GetComponent.<Rigidbody2D>().mass);
                Destroy(gameObject);
            }
            //print("YEAH BOTH 0");
        }
   }
  }

function decreaseTimer(){
   while(true) {
        if (combineTimer > 0){ 
            yield WaitForSeconds(1);
            combineTimer--;
        }
        else{
            break;
        }
    }
}

function setTimer(i : int){
    combineTimer = i;
}


//////////////////////////////MISC///////////////

function getPointOnRimOfCircle(offset : float) { //Buggy and wont work
   	var mouseX : float = Input.mousePosition.x - Screen.width/2; // relative to center becuase screen was measuring positive from bottom left
    	var mouseY : float = Input.mousePosition.y - Screen.height/2;

    	var objX : float = Camera.main.WorldToScreenPoint(transform.position).x - Screen.width/2;
    	var objY : float = Camera.main.WorldToScreenPoint(transform.position).y - Screen.height/2;

        var angle : float = Mathf.Atan((mouseY - objX)/ (mouseX - objY));
     
        var result : Vector3;

        var rad : float = transform.localScale.x/2 + offset;
        if (mouseX < 0)
        	rad *=-1;

        result.x = (rad) * Mathf.Cos(angle); 
        result.y = (rad) * Mathf.Sin(angle) ;

        return result + transform.position;
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

    function setName(input : String) {
    	transform.Find("Canvas").transform.Find("Text").GetComponent(UI.Text).text = input;
    }

    function setColor(input : Color) {
    	GetComponent.<Renderer>().material.color = input;
    }