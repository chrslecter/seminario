$(document).on("pagecontainerbeforeshow", function(e,ui){
    var pageid = ui.toPage.attr("id");
    switch(pageid){
      case "page1":
      $(function() {
        $('#slides').slidesjs({
          width: 940,
          height: 528,
          play: {
            active: true,
            auto: true,
            interval: 4000,
            swap: true
          }
        });
      });
      break;
      case "page3":
      if(!bandLoginout){
                bandLoginout = true;
      $("#btnLogOut").on("click", btnLogOut_onclicked);
        }
      break;
      case "page2":
      if(!bandLogin){
          bandLogin = true;
          $("#btnLogin").on("click", btnLogin_onclicked);
      }
      break;
      case "page6":
      notas(ui.toPage);
      break;

      case "page9":
      eventos(ui.toPage);

      case "page5":
      horarios(ui.toPage);
      break;
      case "page11":
      if(!bandPass){
                bandPass = true;
                $("#btnPass").on("click", btnLoginresetpass_onclicked);
            }
      break;

}});

      ///////////////////////////////////////// LOGIN

///////////////////////////////////////////// LOGIN
var bandLoginout = false;
var bandLogin= false;
var bandPass= false;
function btnLogin_onclicked(e){
    e.preventDefault();
    e.stopPropagation();
    //Primer obtener los datos del formulario
    var formValuesArray = $("#page2Login_form").serializeArray();

    var formObject = {};
    for(var i = 0; i< formValuesArray.length;i++){
        formObject[formValuesArray[i].name] = formValuesArray[i].value;
    }
    $.post(
        "api/login",
        formObject,
        function(docs, success, xhr){
          console.log(success);
          console.log(docs);
            if(docs){
              console.log(docs);
                change_page("page3");
            }else{
              alert("EL usuario o la contrasenia no son validos");
            }
        },
        "json"
    );
}


//Inicio Reset Passs
function btnLoginresetpass_onclicked(e){
    e.preventDefault();
    e.stopPropagation();
    //Primer obtener los datos del formulario
    var formValuesArray = $("#page11Password_form").serializeArray();
    var formObject = {};
    for(var i = 0; i< formValuesArray.length;i++){
        formObject[formValuesArray[i].name] = formValuesArray[i].value;
    }
    console.log(formValuesArray[0].value +" back "+formValuesArray[1].value);
    if(formValuesArray[0].value == formValuesArray[1].value){
      console.log(formValuesArray[0].value +" back "+formValuesArray[1].value);
      $.post(
          "api/pass",
          formObject,
          function(docs, success, xhr){
              if(docs){
                  change_page("page2");
              }else{

              }
            }
          );

      }else {
       alert("No coincide");
      }

    console.log(formObject);
          }

//////////////////////////////////////////////////////////////LOGIN

///////////////////////////////////////////////////////////////info del alumno

function notas(page){
    $.get(
        "/api/getNotas/",
        {},
        function(doc, status, xhr){
            // var html = $(page).find(".ui-content").html();
            // var htmlObj  = $(html);
             var htmlstr = '<table data-role="table" class="ui-responsive" class=ui-grid-c><thead><tr><td>Codigo</td><td>Asignatura</td><td>1ro</td><td>2do</td><td>3ro</td><td>4to</td></tr></thead><tbody>';
            for (var h in doc){
              if(doc[h] instanceof Array){
              for (var i = 0; i < doc[h].length; i++) {
                  if(doc[h][i].claseCodigo== undefined || doc[h][i].claseDescrip==undefined || !doc[h][i].claseNota==undefined){break;}else{
              htmlstr += '<tr>';
              htmlstr += '<td data-priority="1">'+doc[h][i].claseCodigo+'</td>';
              htmlstr += '<td data-priority="2">'+doc[h][i].claseDescrip+'</td>';
              htmlstr += '<td data-priority="3">'+doc[h][i].claseNota[0]+'</td>';
              htmlstr += '<td data-priority="4">'+doc[h][i].claseNota[1]+'</td>';
              htmlstr += '<td data-priority="5">'+doc[h][i].claseNota[2]+'</td>';
              htmlstr += '<td data-priority="6">'+doc[h][i].claseNota[3]+'</td>';
              htmlstr += '</tr>';
            // htmlstr += '<li><a href="#backlogdetail" data-id="'+backlogitem._id+'">'+backlogitem.description+'</a></li>';
                }
                }
              }
            }
            htmlstr += '</tbody></table>';

            $(page).find(".ui").html(htmlstr);


        },
        "json"
    );
}
// Funcion para cambiar de pagina
function change_page(to){
    $(":mobile-pagecontainer").pagecontainer("change", "#" + to);

}
//////////////////////////////////////////////////////////////// info del alumno

////funcion para las notas
function eventos(page){
    $.get(
        "/api/getEventos/",
        {},
        function(docs, status, xhr){
          var htmlstr = "<tr><td>Codigo</td><td>evento</td><td>lugar</td><td>fecha</td></tr> ";
        for (var i = 0; i < docs.length; i++){
          console.log(docs[i].evento);
          htmlstr += '<tr>';
            htmlstr += '<td data-priority="1">' + docs[i].codigo +  '</td>';
            htmlstr += '<td data-priority="2">' + docs[i].evento +  '</td>';
            htmlstr += '<td data-priority="3">' + docs[i].lugar  +   '</td>';
            htmlstr += '<td data-priority="4">' + docs[i].fecha  +   '</td>';

            htmlstr += '</tr>';
                  }
                  console.log(htmlstr);
                  $(page).find(".ui3").html(htmlstr);
          },

        "json"
    ).fail(
        function(xhr, status, doc){
            change_page("page3");
        }
    );
}
// Funcion para cambiar de pagina
function change_page(to){
    $(":mobile-pagecontainer").pagecontainer("change", "#" + to);
}

function btnLogOut_onclicked(e){
  e.preventDefault();
  e.stopPropagation();
    $.get(
        "api/logout",
        {},
        function(data, success, xhr){
          console.log(success);
          console.log(data.ok);
          if(data.ok){
              change_page("page1");
              }

        },
        "json"
    );
}

/////////////////////////////////////////////////////////////////////////////////
// horario

function horarios(page){
    $.get(
        "/api/getHorarios/",
        {},
        function(doc, status, xhr){

             var htmlstr = '<tr><td>Hora</td><td>Lunes</td><td>Martes</td><td>Miercoles</td><td>Jueves</td><td>Viernes</td></tr>';
            for (var h in doc){
              if(doc[h] instanceof Array){
              htmlstr += '<tr>';
              htmlstr += '<td>7:00</td>';
              htmlstr += '<td data-priority="1">'+doc[h][0].Lunes[0]+'</td>';
              htmlstr += '<td data-priority="1">'+doc[h][1].Martes[0]+'</td>';
              htmlstr += '<td data-priority="1">'+doc[h][2].Miercoles[0]+'</td>';
              htmlstr += '<td data-priority="1">'+doc[h][3].Jueves[0]+'</td>';
              htmlstr += '<td data-priority="1">'+doc[h][4].Viernes[0]+'</td>';
              htmlstr += '</tr>';
              htmlstr += '<tr>';
              htmlstr += '<td>8:00</td>';
              htmlstr += '<td data-priority="1">'+doc[h][0].Lunes[1]+'</td>';
              htmlstr += '<td data-priority="1">'+doc[h][1].Martes[1]+'</td>';
              htmlstr += '<td data-priority="1">'+doc[h][2].Miercoles[1]+'</td>';
              htmlstr += '<td data-priority="1">'+doc[h][3].Jueves[1]+'</td>';
              htmlstr += '<td data-priority="1">'+doc[h][4].Viernes[1]+'</td>';
              htmlstr += '</tr>';
              htmlstr += '<tr>';
              htmlstr += '<td>10:00</td>';
              htmlstr += '<td data-priority="1">'+doc[h][0].Lunes[2]+'</td>';
              htmlstr += '<td data-priority="1">'+doc[h][1].Martes[2]+'</td>';
              htmlstr += '<td data-priority="1">'+doc[h][2].Miercoles[2]+'</td>';
              htmlstr += '<td data-priority="1">'+doc[h][3].Jueves[2]+'</td>';
              htmlstr += '<td data-priority="1">'+doc[h][4].Viernes[2]+'</td>';
              htmlstr += '</tr>';
              htmlstr += '<tr>';
              htmlstr += '<td>11:00</td>';
              htmlstr += '<td data-priority="1">'+doc[h][0].Lunes[3]+'</td>';
              htmlstr += '<td data-priority="1">'+doc[h][1].Martes[3]+'</td>';
              htmlstr += '<td data-priority="1">'+doc[h][2].Miercoles[3]+'</td>';
              htmlstr += '<td data-priority="1">'+doc[h][3].Jueves[3]+'</td>';
              htmlstr += '<td data-priority="1">'+doc[h][4].Viernes[3]+'</td>';
              htmlstr += '</tr>';



              }
            }
            $(page).find(".ui2").html(htmlstr);

        },
        "json"
    ).fail(
        function(xhr, status, doc){
            change_page("page3");
        }
    );

}
