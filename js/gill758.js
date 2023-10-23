var myName;
var mySNo;
var myLogName;
var myCampus;
var categoriesArr = new Array();
var flowerList = new Array();
var newRec;
var start;

class Flower {
	constructor (category, price, instructions, photo, name, productId){
        this.category = category;
        this.price = price;
        this.instructions = instructions;
        this.photo = photo;
        this.name = name;
        this.productId = productId;
	}
} // end of class Flower

class Category{
    constructor(category, pic)
    {
        this.category = category;
        this.pic = pic;
    }
}

$(document).ready(function(){
    $.ajax({
		type: "GET", dataType: "json", 
		url: "data/A2-Flowers.json",
		//url: "http://gill758.dev.fast.sheridanc.on.ca/Assignments/Assignment2/data/A2-Flowers.json",
		success: loadJSON,
		error: function(e) {  alert(`${e.status} - ${e.statusText}`);  }
	});
});

function loadJSON(data) {
	console.log(data);

    myName = data.personal.myFullName;
    mySNo = data.personal.myStudentNumber;
    myLogName = data.personal.myLoginName;
    myCampus = data.personal.myCampus;
    localStorage.setItem("myName",JSON.stringify(myName));
    localStorage.setItem("mySNo",JSON.stringify(mySNo));
    localStorage.setItem("myLogName",JSON.stringify(myLogName));
    localStorage.setItem("myCampus",JSON.stringify(myCampus));
    start = data.categories;
    for(let x=0; x<start.length; x++)
    {
        var newRec = new Category(
            start[x].category,
            start[x].pic
        );
        categoriesArr.push(newRec);
    }
    localStorage.setItem("categoriesArr",JSON.stringify(categoriesArr));
    start = data.flowerlist;
    for(let x=0; x<start.length;x++)
    {
        newRec = new Flower(
            start[x].category,
            start[x].price,
            start[x].instructions,
            start[x].photo,
            start[x].name,
            start[x].productId
        );
        flowerList.push(newRec);
    }
    localStorage.setItem("flowerArr",JSON.stringify(flowerList));
    mainScreen(data);
}

function mainScreen(data){
    $("#exHead").html(`Assignment #2 / ${myName} / ${mySNo}`);
    $("#exFoot").html(`${myLogName} / ${myCampus}`);
    $("#tableBody").html();
    var ctgrs = JSON.parse(localStorage.getItem("categoriesArr"));
    for(let x of ctgrs)
    {
        $("#tableBody").append(
            `
            <tr>
                <td><span class="btn">${x.category}</span></td>
                <td class="categoryImg"><img class="categoryImg" src="images/${x.pic}"></td>
            </tr>
            `
        );
    }
}

$(document).on("click",".btn",function(){
    localStorage.setItem("category",$(this).html());
    $(location).attr("href","pages/page2.html");
});