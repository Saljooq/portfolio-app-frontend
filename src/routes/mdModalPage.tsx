import { Component, createSignal } from 'solid-js';

import {marked} from 'marked';
import MdPageComponent from '~/components/MdPage/MdPage';
import { mdpage } from '~/interface/mdpage';

const default_page: mdpage = {
  mdpage_id : 0,
  title: "",
  body: "",
  blurb: ""
};


const MarkdownModalPage: Component = () => {
  const mdpage: mdpage = default_page
  const [page, setPage] = createSignal(mdpage)

  setPage({...page(), body:str})

  const [showModal, setShowModal] = createSignal(false);
  return ( 
    <div class="grid place-items-center">
      <button
        class="bg-sky-800 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mt-16"
        onClick={() => setShowModal(true)}
      >
        Open regular modal
      </button>
      {(showModal()) &&
      <>
      <div
            class="justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
            <div class="w-auto md:my-6 mx-auto md:max-w-3xl">

                <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

                    <div class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 class="text-3xl font-semibold">
                            Markdown Test
                        </h3>
                        <button
                            class="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}
                        >
                            <span class="bg-transparent text-black  h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                            </span>
                        </button>
                    </div>

                    <div class="relative p-6 flex-auto">
                        <MdPageComponent page_signal={page}/>
                    </div>

                    <div class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                        class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </button>
                    <button
                        class="bg-sky-800 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                    >
                        Save Changes
                    </button>
                </div>

                </div>

            </div>

        </div>
      </>
      }
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


export default MarkdownModalPage;
