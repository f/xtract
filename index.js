function Xtract(element, dataAttr) {
  dataAttr = dataAttr || 'data-x';
  var self = this;
  var data = {};
  this.dataAttr = dataAttr;
  this.$model = {};
  this.elements = this.getElements(element);
  this.elements.each(function () {
    var $el = $(this);
    var pair = $el.attr(self.dataAttr).split(/\:/);
    var keyPath = pair.shift();
    var value = self.evaluate(pair.join(':'), $.extend($el, Xtract.plugins));
    self.generatePath(data, keyPath, value);
    $.extend(true, self.$model, data);
  });
}

Xtract.prototype.generatePath = function(obj, path, value) {
  var keys = path.split('.');
  var last = keys[keys.length - 1];

  keys.forEach(function(key) {
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
  if ($element.is('['+this.dataAttr+']')) {
    $elements.push($element);
  }
  $allElements = $($elements).add($(element).find('['+this.dataAttr+']'));
  return $allElements;
};

Xtract.plugins = {
  collect: function (selector, method) {
    return $(this).find(selector).map(function (i, work) {
      return $(work).text();
    }).get();
  }
};

function xtract(data, dataAttr) {
  return new Xtract(data, dataAttr);
}

xtract.plug = function (name, fn) {
  Xtract.plugins[name] = fn;
};

var module = module || {}
if (module.exports) {
  module.exports = xtract;
} else if (window) {
  window.xtract = xtract;
}
