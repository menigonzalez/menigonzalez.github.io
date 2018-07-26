window.addEventListener("load", registerUS);

var globalRegister = {nav:"", filename:"", timenav:{tstart:"",tfinish:""}, ux:[]};

function registerUS(){//Register User session
	var date = new Date();
	var nav = navigator.userAgent;

	var pathname = window.location.pathname;
	var filepage = pathname.split("/").pop();//solución chapuzera; pop solo funciona bien en pocos casos.

	globalRegister.filename = '"Web page":"'+filepage+'"'; 
	globalRegister.nav = '"Navigator data":"'+nav+'"';
	globalRegister.timenav.tstart = '"Start date":"'+date+'"';
}

function registerUX(event){//Register User experience
	
	var date = new Date();
	var cell = globalRegister.ux.length;

	globalRegister.ux[cell] = '{"Event":"'+event.type+'", "Element triggered":"'+event.currentTarget.id+'", "Current date":"'+date+'"}';
	//console.log(globalRegister.ux[cell]);
}

window.addEventListener("beforeunload", savedata);

function savedata(){
	var date = new Date();
	var cell = globalRegister.ux.length;
	var i=0, ux="";

	globalRegister.timenav.tfinish = '"Finish date":"'+date+'"';

	while(i<cell){
		ux = ux+', "Action'+i+'":'+globalRegister.ux[i];
		i++;
	}

	var string01 = '{"Session data":{'+globalRegister.filename+', '+globalRegister.nav;
	var string02 = ', '+globalRegister.timenav.tstart+', '+globalRegister.timenav.tfinish+'}'+ux+'}';

	$.ajax ({
        url: 'userexperience_beta.php',
        type: 'POST',
        data: {
        	'string01' : string01,
        	'string02' : string02
        },
        async:false
    });
}
