Prediccion1=""
Prediccion2=""
Webcam.set({
    width: 350,
    height: 300,
    image_format:'png',
    png_quality: 90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function tomarFoto(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="imagenCapturada" src="'+data_uri+'"/>'; 
    });
}
console.log('version ml5: ', ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/CFohD_Hct/model.json', modelLoaded);
function modelLoaded(){
    console.log('El Modelo Se Cargo Correctamente');
}
function speak(){
    var synth = window.speechSynthesis;
    PrimPrediccion="La Primera Prediccion Es "+Prediccion1;
    SegPrediccion="La Segunda Prediccion Es "+Prediccion2;
    var utterThis=new SpeechSynthesisUtterance(PrimPrediccion+SegPrediccion);
    synth.speak(utterThis);
}
function check(){
    img=document.getElementById('imagenCapturada');
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    } 
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        Prediccion1=results[0].label;
        Prediccion2=results[1].label;
        speak();
        if(results[0].label =="Felis"){
            document.getElementById("update_emoji").innerHTML="&#128512";
        }
        if(results[0].label =="Triste"){
            document.getElementById("update_emoji").innerHTML="&#128532";
        }
        if(results[0].label =="Enojado"){
            document.getElementById("update_emoji").innerHTML="&#128544";
        }
        if(results[1].label =="Felis"){
            document.getElementById("update_emoji2").innerHTML="&#128512";
        }
        if(results[1].label =="Triste"){
            document.getElementById("update_emoji2").innerHTML="&#128532";
        }
        if(results[1].label =="Enojado"){
            document.getElementById("update_emoji2").innerHTML="&#128544";
        }
    }
}