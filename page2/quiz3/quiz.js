
text4 = document.getElementById('title');

xhr4 = new XMLHttpRequest();
xhr4.open("GET", "http://localhost:1337/data/page2/topic3/title.txt");
xhr4.send();

xhr4.onreadystatechange = function() {
	if (xhr4.readyState == 4)
		text4.innerHTML = xhr4.responseText;
}

var request = new XMLHttpRequest();  
request.open("GET", "http://localhost:1337/data/page2/topic3/quiz.csv", false);   
request.send(null);  

var array = new Array();
var jsonObject = request.responseText.split(/\r?\n|\r/);
for (var i = 0; i < jsonObject.length; i++) {
    array.push(jsonObject[i].split(','));
}
array = array.slice(0,-1)

for (var i=0; i < array.length; i++){
	array[i][5] = Number(array[i][5])
}

//suppose 10 questions are to be selected
var output_qns= 10;
var Qns_be_used= [];
var correct =0;
var incorrect =0;
var unanswered = output_qns;
var str = "None";
var temp="";
var result;
var time= 0;
var bool= true;
var q_index= 0;
var slideIndex = 0;
var answerAttempted= new Object();
var btn; //selected button
var correctButton;//correct button
//store the buttons for 4 options
var buttons= document.getElementsByClassName("button");

//to keep track of the user
for (var i= 0;i<output_qns;i++){
	answerAttempted[i]= [0,-1,-1]; //attempted, selected button, correct button
}


//generating the random questions
while (Qns_be_used.length < output_qns){
	var r= Math.floor(Math.random()*array.length);
	if (Qns_be_used.indexOf(r)==-1){
		Qns_be_used.push(r);
	}
}


//first question
document.getElementById("quest").innerHTML =array[Qns_be_used[q_index]][0];
document.getElementById("button1").innerHTML =array[Qns_be_used[q_index]][1];
document.getElementById('button2').innerHTML =array[Qns_be_used[q_index]][2];
document.getElementById('button3').innerHTML =array[Qns_be_used[q_index]][3];
document.getElementById('button4').innerHTML =array[Qns_be_used[q_index]][4];
document.getElementsByClassName("Qn")[0].innerHTML='Qno. ' + (q_index+1);
	
			    



// capture the button for checking
function msg(x)

	{
		
	    btn = document.getElementById(x);
	    str= btn.innerHTML;

	}
	

// functionality of the next button
function nxt()
	{       
			
		result= array[Qns_be_used[q_index]][array[Qns_be_used[q_index]][5]];
		//get the correct buttton	    
		for (var j = 0; j < buttons.length; j++) {
		    if (buttons[j].innerHTML==result){
		    	correctButton= buttons[j];
		    	break;  
		  		}
		  	else{

		  		correctButton= btn;
		  		}
		  	}

		//check the answer
		if(str == result)
			{
				time= 2000;
				correct++;
				unanswered--;
				progressBar()
				answerHighlighter(btn,correctButton,time);
				message("Correct","green",time);
				// audio("correct");
				answerUpdate(q_index, btn, correctButton);
					    


			}
		else if (str == "None")
			{	
				time= 0;

			}
		else
			{	
				time= 4000;
				incorrect++;
				unanswered--;
				answerHighlighter(btn,correctButton,time);
				message("Incorrect","red",time);
				// audio("incorrect");
				answerUpdate(q_index, btn, correctButton);
				progressBar();
					    
					    
			}

		//update to the next question		
		q_index++;

		//if the question is attempted disable the buttons for no further attempt
		if (answerAttempted[q_index][0]){
			if (answerAttempted[q_index-1][0]){
					//remove the previous qns color that is still colored upon clicking next
					answerAttempted[q_index-1][1].style.backgroundColor="";
					answerAttempted[q_index-1][2].style.backgroundColor="";
					answerAttempted[q_index-1][1].style.color= "";
					answerAttempted[q_index-1][2].style.color= '';
				}
			//disabling
			for (var i=0;i<4;i++){
				buttons[i].disabled= true;
			}
		 	answerHighlighter(answerAttempted[q_index][1], answerAttempted[q_index][2], time+5000);
		}
		//else keep it enabled
		else {
			for (var i=0;i<4;i++){
				buttons[i].disabled= false;
			}

		}



		// when we reach last question
		if (q_index == output_qns - 1){
				   setTimeout(function(){
				   document.getElementById("Next").style.display= "none";},time)
				    	
				    }
		buttonsUpdate(q_index, time);
				    
				    
    

    }



//function for updating the buttons with new options and question
function buttonsUpdate(q_index,time){
	if (bool){

		    setTimeout(function(){
				document.getElementById("quest").innerHTML =array[Qns_be_used[q_index]][0];
			    document.getElementById("button1").innerHTML =array[Qns_be_used[q_index]][1];
			    document.getElementById('button2').innerHTML =array[Qns_be_used[q_index]][2];
			    document.getElementById('button3').innerHTML =array[Qns_be_used[q_index]][3];
			    document.getElementById('button4').innerHTML =array[Qns_be_used[q_index]][4];
			    document.getElementsByClassName("Qn")[0].innerHTML="Qno. "+ (q_index+1);
			    str = "None";},time);	
		    }


}


// submit button of the quiz
function sub(){
	bool= false;
    try {
			nxt();	
    	}
    catch(error){
    	
    	}

    document.getElementById("feedbackAnswer").innerHTML= Score(correct);
    document.getElementById("correctAnswers").innerHTML= correct;
	document.getElementById("incorrectAnswers").innerHTML= incorrect;
	document.getElementById("Unansweredqns").innerHTML= unanswered;
	progressBar(100);

    setTimeout(function(){
	        var disp= document.getElementsByClassName("Sub")[0];
	        disp.style.display= "block";
	        
    },1000);
    	

		    
    }





showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}



// correct or incorrect message to be shown
function message(answer, color,time){
	var modal = document.getElementById("modalContent");
	modal.style.backgroundColor= color;
	 
	var modalContent = document.getElementById("Msg");
	modalContent.innerHTML= answer;
	
	modal.style.display = "block";
	setTimeout(function() { 
	    modal.style.display = "";
		modal.style.backgroundColor="";
	}, time)
	

	// When the user clicks anywhere outside of the modal, close it
	window.addEventListener("click", function(event) {
 	if (event.target == modal) {
 		modal.style.backgroundColor= "";
	    modal.style.display = "none";
	  }

	});
	
}


// higlight the correct or incorrect answer
function answerHighlighter(selectedButton, correctButton,time){
	if (selectedButton==correctButton){
		selectedButton.style.backgroundColor= "green";
		selectedButton.style.color= "white";
		setTimeout(function(){
			selectedButton.style.backgroundColor= "";
			selectedButton.style.color= "";
		},time);
		
	}

	else {
		selectedButton.style.backgroundColor= "red";
		selectedButton.style.color= "white";
		correctButton.style.backgroundColor= "green";
		correctButton.style.color= "white";
		setTimeout(function(){
			selectedButton.style.backgroundColor= "";
			correctButton.style.backgroundColor= "";
			correctButton.style.color= "";
			selectedButton.style.color= "";
		},time);
	}
}


// dynamic progress bar
function progressBar(arg=0){
	let tmp= correct+incorrect;
	let percent;
	if (arg==100){
		percent=arg.toString();
		}

	else { 
		let fraction= (tmp/Qns_be_used.length)*100;
		percent= fraction.toString();
	}
	var elem= document.getElementsByClassName("progressMade")[0];
	elem.style.width= percent+"%";
	

}




//keep track of whether the question was attempted along with
// the selected and correct button 
function answerUpdate(q_index, btn, correctButton){
	answerAttempted[q_index]= [1,btn,correctButton];

}


//to view the questions upon clicking in the navbar
function Qviewer(x){

	buttonsUpdate(x-1,0);
	//if attempted higlight the attempted options
	if (answerAttempted[x-1][0]==1){
		answerHighlighter(answerAttempted[x-1][1],answerAttempted[x-1][2],2000);
		//and disable the buttons
		for (var i= 0;i<4;i++){
			buttons[i].disabled= true;
		}
		
	}
	else {
		//else keep the buttons enabled
		for (var i= 0;i<4;i++){
			buttons[i].disabled= false;
		}
	}

	//update to the next question
	q_index= x-1;
	

	//for the last question, hide the next button
	if (x == output_qns ){
		document.getElementsByClassName("Next")[0].style.display= "none";
				    	
	}
	//else keep it enabled
	else {

		document.getElementsByClassName("Next")[0].style.display= "";
	}



}


//logic for score 
function Score(){
	if (correct > 8)
		return "Excellent";
	else if (correct>5)
		return "Good";
	else if (correct > 3)
		return "Nice Try";
	else
		return "You need to improve and work hard";



}


