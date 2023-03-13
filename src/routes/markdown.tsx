import type { Component } from 'solid-js';

import {marked} from 'marked';

const MarkdownPage: Component = () => {
  const parsed: string = marked.parse(str)
//   console.log(parsed)
  return ( 
    <div class="grid place-items-center">
        <div class="pt-16" innerHTML={parsed}/>
    </div>
  );
};

const str = `

# This page is a test for the rendering of md - and its affect on page size

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

### Solar System Exploration, 1950s – 1960s

- [ ] Mercury
- [x] Venus
- [x] Earth (Orbit/Moon)
- [x] Mars
- [ ] Jupiter
- [ ] Saturn
- [ ] Uranus
- [ ] Neptune
- [ ] Comet Haley


## This is another list that I'm working on
- hello
- to 
- you

### check-list again

- [ ] Mercury
- [x] Venus
- [x] Earth (Orbit/Moon)
`


export default MarkdownPage;
