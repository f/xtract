# Xtract

Extract data from DOM, easily. Useful for back-end generated contents and **SEO-friendly** rich apps.

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
  user: "Fatih",
  location: "Istanbul"
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
  user: "Fatih",
  location: "Istanbul",
  image: "my-profile-picture.jpg"
}
```

## License
MIT.
