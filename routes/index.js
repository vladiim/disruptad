(function() {
  var index, root;

  index = function(req, res) {
    return res.render("index", {
      title: "Homepage"
    });
  };

  root = typeof exports !== "undefined" && exports !== null ? exports : window;

  root.index = index;

}).call(this);
