# Component Maker

A VS Code extension for generating new component files depending on your custom template
no **framework** or **language** dependencies, this documentation is done by **react/typescript**, but it also works with **any other technology**.

Right click in the file editor or on a file in the explorer and click `📐Make Component` to generate a component as needed

![image](https://user-images.githubusercontent.com/46249965/204175708-1b02f881-87ef-4f4b-aeaf-2fb37fde1891.png)


## How it works ?

basically it's an extension that depends on your files
it clones your model just like plop does.

the first thing to do is to create your template folder,

![image](https://user-images.githubusercontent.com/46249965/204176951-266d00fb-b54f-4e9c-8bca-fdf9a5bd6d5d.png)

your model might look similar to this :

```ts
import { Container } from "./_ComponentName_.style";

import type { FC } from "react";

interface I_ComponentName_Props {}

const _ComponentName_: FC<I_ComponentName_Props> = ({}) => {
  return <Container></Container>;
};

export default _ComponentName_;
```

the extension will generate a `.mcrc.json` file on startup, you just need to provide 2 information :


| property                | type   | value                                                                                                                               |
| ------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `templateComponentName` | string | path to template folder, default`.templates`                                                                                        |
| `templateFolder`        | string | the interpolation variable in your custom model, the variable that will be replaced by the component name, default`_ComponentName_` |

<br /> 
<br />

`.mcrc.json`:

```json
{
  "templateComponentName": "_ComponentName_",
  "templateFolder": ".templates"
}
```

---

<br /> <br /> <br /> <br />
<br /> <br /> <br /> <br />
<br /> <br /> <br /> <br />
![](https://www.crossed-flag-pins.com/animated-flag-gif/gifs/Morocco_120-animated-flag-gifs.gif) done with 💙, Armane
