import { Component, createResource, createSignal, For } from 'solid-js';

import { marked } from 'marked';
import { mdpage } from '../interface/mdpage'
import MdPageComponent from '~/components/MdPage/MdPage';
import URI from '~/components/GetURI'

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


    const save_page = () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const request_options = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(page()),
        }

        fetch(`${URI()}/mdpageinsert`, request_options)
        .then(response => response.text())
        .then(result => console.log(result))

    }
    

    return (
        <div class="h-full">
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

            <button class="bg-sky-800 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-3 mt-3 ml-6 mb-1 ease-linear transition-all duration-150"
            onClick={save_page}

            >
                Save
            </button>
            <input 
                type="text" 
                class="bg-blue-100 mr-3 ml-8"  
                placeholder="Enter title.."
                onChange={e => setPage({...page(), title:e.target.value})}
            ></input>
            <input 
                type="text" 
                class="bg-blue-100"  
                placeholder="Enter blurb.."
                onChange={e => setPage({...page(), blurb:e.target.value})}
            ></input>
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


`