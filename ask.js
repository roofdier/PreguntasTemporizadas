/*
	* jQuery rules! :)
*/

/*
	* Para usar las cookies, el script se debe 
	* correr en un servidor local o en la nube
*/


var hits,h,qon,vere;
var veces = parseInt(getCookie());
var questions = ["¿cuánto es 2+2?","¿cuánto es 3x3?","¿Cuánto es 2^8?"];
var anwers = ["4","9","256"];
var act = 0;
var tempo = null;
var tempoD = null;
var ans = 0;
var fin = true;
var ansuser;
var tiempoR = 3000;

if(getCookie('hits_sitio')==false){
	setCookie('hits_sitio',1,10);
}else{
	hits = parseInt(getCookie('hits_sitio'));
	hits++;
	setCookie('hits_sitio',hits,10);
}

$(function () {

	var anss;
	ansuser = $("#anduser"); 
	h = $("#hits");
	qon = $('#qon');
	vere = $('#vere');

	$('#vere').on('click',function(){
		clearInterval(tempo);

		if(fin){
			vere.text('Verificar')
			ask();
		}else{
			anss = ansuser.val().toLowerCase();

			if(anwers[act].toString().toLowerCase()===anss){
				ans++;
				ansuser.val('');
				ansuser.attr('placeholder','Correcto!');
			}else{
				ansuser.val('');
				ansuser.attr('placeholder','Incorrecto!');
			}

			tempoD = setInterval('continuar()',1000);
		}

	})

	h.text('Haz visitado este sitio: '+hits+' veces');


	ask();
});

function continuar(){
	clearInterval(tempoD);
	cambio();
	tempo = setInterval('cambio()',tiempoR);
}

function ask(){
	act = 0;
	ans = 0;
	fin = false;

	ansuser.attr('placeholder','Respuesta');
	qon.text(questions[act]);
	tempo = setInterval("cambio()",tiempoR);
}

function cambio(){

	act++;
	ansuser.attr('placeholder','Respuesta');
	qon.text(questions[act]);
	ansuser.val('');

	if(act>=questions.length)
	{
		clearInterval(tempo);
		qon.text('Verificando respuestas...');
		check();
		return false;
	}
}

function check(){
	ansuser.val('');
	if(ans==anwers.length)
		ansuser.attr('placeholder','Ganaste!');
	else
		ansuser.attr('placeholder','Perdiste!');
	fin = true;

	vere.text('Volver a jugar!');
}


function getCookie(cook){

	if(document.cookie === "")
		return false;

	var nom,val,cks=document.cookie.split(';');

	for (var i = 0; i < cks.length; i++) {


		nom = cks[i].split('=')[0];
		val = cks[i].split('=')[1];

		if(nom.replace(' ','') == cook)
			return val;
	}

	return false;

}

function setCookie(cook,val,exp) {
	var fecha_exp = new Date();
	fecha_exp.setDate(fecha_exp.getDate() + exp);

	if(exp!=null){
		exp = ";expires="+fecha_exp.toUTCString();
	}else
		exp = "";

	
	document.cookie =cook + "=" + escape(val) + exp;

}

