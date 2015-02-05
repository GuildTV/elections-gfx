this["App"] = this["App"] || {};
this["App"]["templates"] = this["App"]["templates"] || {};
this["App"]["templates"]["lowerThird"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "<div class=\"lowerThird\">\n  <h3>"
    + escapeExpression(((helper = (helper = helpers.eventName || (depth0 != null ? depth0.eventName : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"eventName","hash":{},"data":data}) : helper)))
    + "</h3>\n  <h1>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + " - "
    + escapeExpression(((helper = (helper = helpers.position || (depth0 != null ? depth0.position : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"position","hash":{},"data":data}) : helper)))
    + "</h1>\n</div>";
},"useData":true});
this["App"]["templates"]["multiProfile"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "  <div id=\""
    + escapeExpression(((helper = (helper = helpers.uid || (depth0 != null ? depth0.uid : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"uid","hash":{},"data":data}) : helper)))
    + "\" class=\"profile\">\n    <h2>"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h2>\n    <h3>"
    + escapeExpression(((helper = (helper = helpers.position || (depth0 != null ? depth0.position : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"position","hash":{},"data":data}) : helper)))
    + "</h3>\n    <img src=\""
    + escapeExpression(((helper = (helper = helpers.img || (depth0 != null ? depth0.img : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"img","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n  </div> <!-- / #"
    + escapeExpression(((helper = (helper = helpers.uid || (depth0 != null ? depth0.uid : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"uid","hash":{},"data":data}) : helper)))
    + " profile -->\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "<div class=\"multiProfile col-md-12\">\n";
  stack1 = helpers.each.call(depth0, depth0, {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</div> <!-- / .roleProfile -->";
},"useData":true});
this["App"]["templates"]["singleProfile"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "<div class=\"singleProfileContainer col-md-12\">\n  <div class=\"singleProfile col-md-8 col-md-offset-2\">\n    <h1 class=\"text-center\">"
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "</h1>\n    <h3 class=\"text-center\">"
    + escapeExpression(((helper = (helper = helpers.position || (depth0 != null ? depth0.position : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"position","hash":{},"data":data}) : helper)))
    + "</h3>\n    <div class=\"image "
    + escapeExpression(((helper = (helper = helpers.pid || (depth0 != null ? depth0.pid : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"pid","hash":{},"data":data}) : helper)))
    + " text-center\">\n      <img src=\""
    + escapeExpression(((helper = (helper = helpers.img || (depth0 != null ? depth0.img : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"img","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"name","hash":{},"data":data}) : helper)))
    + "\">\n    </div>\n    <h2 class=\"text-center\">Manifesto</h2>\n    <h4>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.manifestoPoints : depth0)) != null ? stack1.one : stack1), depth0))
    + "</h4>\n    <h4>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.manifestoPoints : depth0)) != null ? stack1.two : stack1), depth0))
    + "</h4>\n    <h4>"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.manifestoPoints : depth0)) != null ? stack1.three : stack1), depth0))
    + "</h4>\n  </div> <!-- / .col-md-8 .col-md-offset-2 -->\n</div> <!-- / .singleProfile -->\n";
},"useData":true});
this["App"]["templates"]["topBar"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <h1>"
    + escapeExpression(((helper = (helper = helpers.twitter || (depth0 != null ? depth0.twitter : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"twitter","hash":{},"data":data}) : helper)))
    + "</h1>\n";
},"3":function(depth0,helpers,partials,data) {
  return "    <h1>#guildelections</h1>\n";
  },"5":function(depth0,helpers,partials,data) {
  var helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;
  return "    <h1>"
    + escapeExpression(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"text","hash":{},"data":data}) : helper)))
    + "</h1>\n";
},"7":function(depth0,helpers,partials,data) {
  return "    <h1>LIVE</h1>\n";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, functionType="function", helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, buffer = "<div class=\"topBar\">\n  <div class=\"logo col-md-3\">\n    <img src=\"public/img/logo.png\">\n  </div> <!-- / .logo  -->\n  <div class=\"twitter col-md-3\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.twitter : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "  </div><!-- / .twitter -->\n  <div class=\"text col-md-3\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.text : depth0), {"name":"if","hash":{},"fn":this.program(5, data),"inverse":this.program(7, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </div><!-- / .text -->\n  <div class=\"col-md-3\">\n  <div class=\"logos col-md-3\">\n    <img src=\"public/img/"
    + escapeExpression(((helper = (helper = helpers.logos || (depth0 != null ? depth0.logos : depth0)) != null ? helper : helperMissing),(typeof helper === functionType ? helper.call(depth0, {"name":"logos","hash":{},"data":data}) : helper)))
    + ".png\">\n  </div> <!-- / .logos  -->\n</div>\n";
},"useData":true});