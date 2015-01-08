function Xtract(element) {
  var self = this;
  this.$model = {};
  this.elements = this.getElements(element);
  this.elements.each(function () {
    var $el = $(this);
    var pair = $el.data('x').split(/\:/);
    var keyPath = pair.shift();
    var value = self.evaluate(pair.join(':'), $el);
    $.extend(true, self.$model, self.generatePath(keyPath, value));
  });
}

Xtract.prototype.generatePath = function (path, value) {
  var data = {};
  var route = [];
  var keys = path.split('.');
  for (var i in keys) {
    route.push(keys[i]);
    eval('data.' + route.join('.') + ' = {}');
  }
  eval('data.' + route.join('.') + ' = value');
  return data;
};

Xtract.prototype.evaluate = function (expr, $this) {
  if (!expr) {
    if ($this.is(':input')) {
      return $this.val().trim();
    } else {
      return $this.html().trim();
    }
  } else {
    return eval('(' + expr + ')');
  }
};

Xtract.prototype.getElements = function (element) {
  var $elements = [];
  var $element = $(element);
  if ($element.data('x') !== '') {
    $elements.push($element);
  }
  $elements = $($elements).add($(element).find('[data-x]'));
  return $elements;
};

function xtract(data) {
  return new Xtract(data);
}

if (module && module.exports) {
  module.exports = xtract;
} else if (window) {
  window.xtract = xtract;
}
