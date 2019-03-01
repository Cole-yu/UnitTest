function getDay(){
	var date=new Date();
	var today=date.getDay();
	console.log(today);
	return today;
}

var dog={
	name:"快递",
	age:3,
	eat:function(value){
		var food = value;
		var value ="eat" + food.toString();
		console.log(value);
	},
	getName:function(){
		return this.name;
	},
	setName:function(value){		
		this.name = value;
		console.log(dog);
	},
	getAge:function(){
		return this.age;
	},
	setAge:function(value){
		this.age = value;
		console.log(dog);
	},
	bark:function(){
		var voice="汪汪汪";
		
		return voice;
	},
	sleep:function(){

		return "sleeping";
	}
}

dog.eat("water");