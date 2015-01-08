function Xtract(element) {
  var self = this;
  var data = {};
  this.$model = {};
  this.elements = this.getElements(element);
  this.elements.each(function () {
    var $el = $(this);
    var pair = $el.data('x').split(/\:/);
    var keyPath = pair.shift();
    var value = self.evaluate(pair.join(':'), $el);
    self.generatePath(data, keyPath, value);
    $.extend(true, self.$model, data);
  });
}

Xtract.prototype.generatePath = function(obj, path, value) {
  var keys = path.split('.');
  var last = keys[keys.length - 1];

  keys.forEach(function(key, index) {
    var val = key === last ? value : {};
    obj[key] = val;
    obj = obj[key];
  });
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
