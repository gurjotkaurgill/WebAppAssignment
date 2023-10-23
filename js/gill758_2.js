$(document).ready(function(){
    $.ajax({
		type: "GET", dataType: "json", 
		url: "../data/A2-Flowers.json",
		// url: "http://username.dev.fast.sheridanc.on.ca/DataFiles/canada.json"
		success: loadJSON,
		error: function(e) {  alert(`${e.status} - ${e.statusText}`);  }
	});
});

function loadJSON() {
    var myName = localStorage.getItem("myName");
    var mySNo = localStorage.getItem("mySNo");
    var myLogName = localStorage.getItem("myLogName");
    var myCampus = localStorage.getItem("myCampus");
    var cat = localStorage.getItem("category");
	$("#hed").html(`Category : ${cat}`);
	$("#exHead").html(`Assignment #2 / ${myName} / ${mySNo}`);
	var category =localStorage.getItem("categoriesArr");
	var flowerList = JSON.parse(localStorage.getItem("flowerArr"));
    $("#tableBody").html();
	for(let x=0;x<flowerList.length;x++){
        if(flowerList[x].category === cat)
        {
            $("#tableBody").append(
            `
                <tr>
                    <td><span class="headin">Product Name :</span> <span class="intro">${flowerList[x].name}</span><br>
                    <span class="headin">Product Price : </span> <span class="intro">$ ${flowerList[x].price}</span><br>
                    <span class="headin">Instructions :</span> <span class="intro">${flowerList[x].instructions}</span>
                    </td>
                    <td class="headinAhead"><img class="specialImg" src="../images/${flowerList[x].photo}"></td>
                </tr>
            `
            );
        }
    }
    $(".exFoot").append(`${myLogName} / ${myCampus}`);
}