# Xtract

Extract data from DOM, easily. Useful for back-end generated contents and **SEO-friendly** rich apps.

![Image](https://raw.githubusercontent.com/f/xtract/master/test/xtract.png)

## Installation
```
npm install xtract
```

## Requirements

  - This works on browser, not node.js. But if you use *jsdom*, you can.
  - Requires jQuery.

SEO is the main problem of modern web. And we have problems with passing the data from
**HTML to JavaScript**. Your **back-end** generated data is need to be mapped to JavaScript
and **Xtract** helps you to do that.

```html
<p id="profile">
  My name is <span data-x="user.name">Fatih</span>,
  and I'm from <span data-x="user.location">Istanbul</span>.
</p>
```

You can simply extract data now just calling:

```js
xtract($("#profile")).$model
```

This will generate following object:
```js
{
  user: {
    name: "Fatih",
    location: "Istanbul"
  }
}
```

## Extracting Nested Models

```html
<p id="profile">
  My name is <span data-x="user.name.firstname">Fatih</span>
  <span data-x="user.name.lastname">Akın</span>,
  and I'm from <span data-x="user.location.city">Istanbul</span>,
  <span data-x="user.location.country.name">Turkey
  (<span data-x="user.location.country.code">TR</span>)</span>.
</p>
```

```js
xtract($("#profile")).$model
```

This will generate following object:
```js
{
  user: {
    name: {
      firstname: "Fatih",
      lastname: "Akın"
    },
    location: {
      city: "Istanbul",
      country: {
        name: "Turkey",
        code: "TR"
      }
    }
  }
}
```

## Extracting with jQuery

You can use `$this` in `data-x` attribute to reach more values.

```html
<p id="profile">
  <img src="my-profile-picture.jpg" data-x="user.image: $this.attr('src')">
  My name is <span data-x="user.name">Fatih</span>,
  and I'm from <span data-x="user.location">Istanbul</span>.
</p>
```

```js
xtract($("#profile")).$model
```

This will map the `src` tag to the `user.image`:
```js
{
  user: {
    name: "Fatih",
    location: "Istanbul",
    image: "my-profile-picture.jpg"
  }
}
```

## Plug-ins

You can simply write plugins to use extract easier.

```js
xtract.plug('date', function () {
  return $(this).text().replace(/(\d+)\s+(\w+)\s+(\d+)/, '$3, $1 $2');
});
```

The static HTML:
```html
<div>
  Einstein: <span data-x="date.birth: $this.date()">14 March 1879</span> –
  <span data-x="date.death: $this.date()">18 April 1955</span>
</div>
```

Output:
```js
date: {
  birth: "1879, 14 March",
  death: "1955, 18 April"
},
```

## License
MIT.
