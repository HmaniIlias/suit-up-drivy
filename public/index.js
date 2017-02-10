/*global Mustache */
'use strict';

var DRIVY = DRIVY || {};

(function starter () {
  var render = function render (actors) {
    var template = document.querySelector('#template').innerHTML;

    Mustache.parse(template);   // optional, speeds up future uses

    var rendered = Mustache.render(template, {'actors': actors});

    document.querySelector('#actors').innerHTML = rendered;
  }

  var render_cars = function render_cars (cars) {
    var templateCars = document.querySelector('#templateCars').innerHTML;

    Mustache.parse(templateCars);   // optional, speeds up future uses

    var rendered_cars = Mustache.render(templateCars, {'cars': cars});

    document.querySelector('#cars').innerHTML = rendered_cars;
  };

  //Récupère les voitures et les affiche
  window.onload = function(){ 
    var cars = DRIVY.displayCar();

    render_cars(cars);
    return;
}

  //Va calculer Et afficher les prix
  jQuery(document).ready(function($) {  //Chercher jquery on click pour des boutons ayant le même id
      $(document).on('click','#go',function(){
        var index = $("button").attr( "data-selected-card" );
        alert(index);
        var car = DRIVY.getCar(index);
        var begin = document.querySelector('#begin').value;
        var end = document.querySelector('#end').value;
        var distance = document.querySelector('#distance').value;
        var option = document.querySelector('#option').checked;

        var actors = DRIVY.payActors(car, begin, end, distance, option);

        render(actors);

        return false;

      });
  });

}());
