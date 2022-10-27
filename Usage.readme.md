# Common Components Usage

## Dropdown

<span style="font-size: 16px">
The Dropdown can be customised by sending a name other than "select" for the classNamePrefix key of the classes prop. The Dropdown component uses this and prefixes it to a number of other classes that it adds to its own custom elements. You should not use "select" as that is what the current default classNamePrefix value is for this component.

The dropdown.module.scss file shows a global class name of "select", you will also need to define similar CSS classes in your application, so best is to follow the same structure as this file, but instead of "select" to use your chosen classNamePrefix key.

You will also need to pass in a select container class, with a name of your choosing into the labelCss key of the classes prop of the Dropdown. The CSS for this to match that in the dropdown.module.scss file, or else your custom css. As shown in the dropdown.module.scss file, the select container acts as a wrapper class.
</span>

## Accordion

<span style="font-size: 16px">
The Accordion component is used as a list of accordions and you need to pass an array with items. Example: <b>items=[{ title: 'My text' }]</b>. Title (visible as folded accordion title/summary) is only required property for this component and you can pass a string or react component. Items may have other properties as well: <b>content</b> (visible content when accordion is unfolded) as a string or react component, <b>id</b>, <b>dataTestId</b>.

Accordion has a default arrow image, but you may pass your own component using <b>expandIcon</b> property.

Accordion is two types: default (used without passing property) and block by passing <b>type='block'</b> and you will get different styling.

For custom accordion behavior you can pass <b>setExpanded</b> function to expand needed accordion/s and list of accordions with property <b>expanded</b>, for example to expand all accordions.

You can customize different styling by passing additional props: <b>titleCentered</b>, <b>titleColor</b>, <b>bottomBorder</b>, <b>titleTruncate</b>, <b>titleUppercase</b>. And <b>disabled</b> property to disable accordions expanding behavior.
</span>

## Text

<p style="font-size: 16px">
    Text component is reflecting zeplin text variations. Color is set separately by passing a property.
    To use one of defined text types use these properties by setting <b>type</b>:
    <ul>
        <li>'header-h1'</li>
        <li>'header-h2'</li>
        <li>'header-h3'</li>
        <li>'header-h4'</li>
        <li>'header-h5'</li>
        <li>'caption-sm'</li>
        <li>'caption-md'</li>
        <li>'caption-lg'</li>
        <li>'body-xs'</li>
        <li>'body-sm'</li>
        <li>'body-md'</li>
        <li>'body-lg'</li>
        <li>'cta-sm'</li>
        <li>'cta-md'</li>
        <li>'cta-lg'</li>
        <li>'error'</li>
    </ul>
    To set text color (defined in zeplin color palette) use property <b>color</b>:
    <ul>
        <li>'grey-black'</li>
        <li>'grey-dark'</li>
        <li>'grey-darkest'</li>
        <li>'grey-light'</li>
        <li>'grey-lightest'</li>
        <li>'primary-base'</li>
        <li>'primary-dark'</li>
        <li>'primary-light'</li>
        <li>'secondary-base'</li>
        <li>'secondary-dark'</li>
        <li>'secondary-light'</li>
        <li>'supplementary-blue'</li>
        <li>'supplementary-lavender'</li>
        <li>'supplementary-mint'</li>
        <li>'supplementary-pink'</li>
        <li>'tertiary-base'</li>
        <li>'tertiary-dark'</li>
        <li>'tertiary-light'</li>
        <li>'utility-blue'</li>
        <li>'utility-green'</li>
        <li>'utility-red'</li>
        <li>'utility-yellow'</li>
    </ul>
    <span>
    To customize text style, set spacing or to fullfil other needs, pass class name(s) by <b>className</b> property.
    Text by default will be block element with p tag. To customize that pass boolen property <b>inline</b> and/or <b>tag</b> with any valid HTML tag, e.g. <b>tag="span"</b>.
    </span>
</p>
