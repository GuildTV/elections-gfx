this["App"] = this["App"] || {};
this["App"]["templates"] = this["App"]["templates"] || {};
this["App"]["templates"]["lowerThird"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<h2>"
    + escapeExpression(((helper = (helper = helpers.top || (depth0 != null ? depth0.top : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"top","hash":{},"data":data}) : helper)))
    + "</h2>\n<h3>"
    + escapeExpression(((helper = (helper = helpers.bottom || (depth0 != null ? depth0.bottom : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"bottom","hash":{},"data":data}) : helper)))
    + "</h3>\n";
},"useData":true});
this["App"]["templates"]["singleProfile"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "<div class=\"singleProfile col-md-12\">\n  <div class=\"col-md-8 col-md-offset-2\">\n    <h2>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h2>\n    <h3>"
    + escapeExpression(((helper = (helper = helpers.position || (depth0 != null ? depth0.position : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"position","hash":{},"data":data}) : helper)))
    + "</h3>\n    <img src=\""
    + escapeExpression(((helper = (helper = helpers.img || (depth0 != null ? depth0.img : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"img","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n    <h3>Manifesto</h3>\n    <h4>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.manifestoPoints : depth0)) != null ? stack1.one : stack1), depth0))
    + "</h4>\n    <h4>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.manifestoPoints : depth0)) != null ? stack1.two : stack1), depth0))
    + "</h4>\n    <h4>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.manifestoPoints : depth0)) != null ? stack1.three : stack1), depth0))
    + "</h4>\n  </div> <!-- / .col-md-8 .col-md-offset-2 -->\n</div> <!-- / .singleProfile -->\n";
},"useData":true});
this["App"]["templates"]["topBar"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  return "// App.parts['topBar'] = {\n//   setup: function() {\n//     $('.main').prepend(\n//       $('<div></div>').addClass('topBar').append(\n//         $('<div></div>').addClass('container')\n//           .append(\n//             $('<div></div>').addClass('col-md-3').append(\n//               $('<img></img>').addClass('logo').attr('src', 'public/img/logo.png')\n//             )\n//           )\n//           .append(\n//             $('<div></div>').addClass('col-md-3').text('#guildelections')\n//           )\n//           .append(\n//             $('<div></div>').addClass('col-md-3').text('LIVE')\n//           )\n//       )\n//     );\n//   },\n\n//   render: function() {\n\n//   }\n// }\n";
  },"useData":true});