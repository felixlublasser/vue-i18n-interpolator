# vue-i18n-interpolator
Bringing the power of slots to your translations


This is a component that lets you pass in a string with slots. Have a look at this example:

```
"Hey, you! #link{linkText: 'Click me, I\\'m a \"link\"!', url: 'https://something'} Thanks."
```

This will produce three slots, a default one with slot-name 'text', one with slot name 'link',
and another default slot with slot-name 'text'.

The default slots will we passed an argument `text` through the slot scope which contains
the text.

For custom slots, the slot name is whatever is between the # pound sign and the { opening bracket.
They are passed whatever is specified in the {curly brackets} in standard JS object format.

You can choose to use simple single quotes ' instead of \" escaped double quotes in your
JSON translation file. Also, single or double quotes around object keys are optional.
Whitespace after the opening bracket { and before the closing curly bracket } as well as
after commas , is allowed.

If you want to include ' or " characters in your object value strings, it depends on if you're using
single or double quotes around your values. If you're using single quotes, single quotes should be
escaped \' and double quotes should be escaped as well \". If you're using double (escaped) quotes,
single quotes will be just ' and double quotes will be \\" double escaped.

This also works together with i18n's string interpolation feature!

Example use with the same string from above:

```xml
<i18nInterpolator string="Hey, you! #link{text: 'Click me, I\\'m a \"link\"!', url: 'https://something'}">
  <a slot="link" slot-scope="{ linkText, url }" :href='url'>{{ linkText }}</a>
</i18nInterpolator>
```

which will eventually render:

```xml
<span>
  Hey, you!
  <a href="https://something">Click me, I'm a "link"!</a>
  Thanks
</span>
```