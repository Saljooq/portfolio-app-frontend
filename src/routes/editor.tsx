import { Component, createResource, createSignal, For } from 'solid-js';

import { marked } from 'marked';
import { mdpage } from '../interface/mdpage'
import MdPageComponent from '~/components/MdPage/MdPage';

const fetchPage = () => fetch(`http://localhost:8080/pages`);

const default_arr: mdpage[] = [];
const default_page: mdpage = {
    mdpage_id: 0,
    title: "",
    body: "",
    blurb: ""
};



const EditorPage: Component = () => {

    const [page, setPage] = createSignal(default_page)
    const [data, setData] = createSignal(str)

    setPage({ ...page(), body: data() })

    return (
        <div class="mt-6 flex flex-row h-5/6 items-center">
            {/* <div class="basis-1/2  h-full max-h-screen overflow-y-auto"> */}
            <div class="ml-3 w-1/2 h-full overflow-y-auto bg-purple-50">
                <MdPageComponent page_signal={page} />
            </div>
            <textarea onInput={e => setPage({...page(), body:e.target.value})} 
                // class="basis-1/2 outline-dashed" 
                class="ml-3 pl-2 mr-3 w-1/2 h-full flex overflow-y-auto  flex-grow bg-blue-50"
            >
                {str}
            </textarea>
        </div>
    );
};

export default EditorPage;

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

## Another numbered list
1. some
2. thing
- this is something
3. Or not

\`\`\`python
def main():
  print("hello world!");
\`\`\`

## hello there

### check-list again
- [ ] Mercury
- [x] Venus
- [x] Earth (Orbit/Moon)

## Another numbered list
1. some
2. thing
- this is something
3. Or not

\`\`\`python
def main():
  print("hello world!");
\`\`\`

## hello there
`