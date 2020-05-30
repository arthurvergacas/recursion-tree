var branches = [];

var angle_slider;

var size_slider;

var branch_height = 100;

var click_counter = 0;

var vectorA;
var vectorB;

var can_continue = true;

function setup() {
	var canvas = createCanvas(400, 400);
	canvas.parent("sketch_holder");
	canvas.mousePressed(mousePressedFunction);

	angle_slider = createSlider(2, 18, 6, 0);
	angle_slider.parent("slider_angle_holder");

	size_slider = createSlider(0.1, 1, 0.5, 0);
	size_slider.parent("slider_size_holder");

	vectorA = createVector(width/2, height);
	vectorB = createVector(width/2, height - branch_height);
	
	branches[0] = new Branch(vectorA, vectorB);
	



}

function mousePressedFunction() {

	if (click_counter < 12){
		branches = []
		branches[0] = new Branch(vectorA, vectorB);

		click_counter++;
	}



	
}

function generateBranches() {
	can_continue = false;
	branches = []
	branches[0] = new Branch(vectorA, vectorB);
	for (var c = 0; c < click_counter; c++){
		//noLoop();

		console.log("oi" + click_counter);
		for (var i = branches.length - 1;i >= 0 ; i--){
			if (!branches[i].grown){
				branches = branches.concat(branches[i].generateChild());
			}
			branches[i].grown = true;
			
		}
	}
	can_continue = true;	
}

function draw() {
	if (can_continue){
		background(0);

		generateBranches();






		for (var i = 0; i < branches.length; i++){
			branches[i].show();
		}
	}
}


function restart() {
	
	click_counter = 0;
	branches = []
	branches[0] = new Branch(vectorA, vectorB); 

}





function Branch(begin, end){

	this.begin = begin;
	this.end = end;

	this.grown = false;

	this.show = function() {

		stroke(255);
		line(this.begin.x, this.begin.y, this.end.x, this.end.y);
		
	}


	

	this.generateChild = function(){
		var dir1 = p5.Vector.sub(this.end, this.begin);
		var dir2 = p5.Vector.sub(this.end, this.begin);
		dir1.rotate(PI/angle_slider.value()); 
		dir1.mult(size_slider.value());
		dir2.rotate(PI/angle_slider.value()* -1); 
		dir2.mult(size_slider.value());

		var new_end1 = p5.Vector.add(this.end, dir1);
		var new_end2 = p5.Vector.add(this.end, dir2);


		child1 = new Branch(this.end, new_end1);

		child2 = new Branch(this.end, new_end2);



		children = [child1, child2];

		return children;

	}
}