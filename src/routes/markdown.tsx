import { Component, createResource, createSignal, For } from 'solid-js';

import {marked} from 'marked';
import {mdpage} from '../interface/mdpage'
import MdPageComponent from '~/components/MdPage/MdPage';

const fetchPage = () => fetch(`http://localhost:8080/pages`);

const  default_arr: mdpage[] = [];
const default_page: mdpage = {
  mdpage_id : 0,
  title: "",
  body: "",
  blurb: ""
};



const MarkdownPage: Component = () => {
  
  const [page, setPage] = createSignal(default_page)

  const [pages, setPages] = createSignal(default_arr)

  fetchPage()
  .then(x => x.json())
  .then( x => {
    setPages(x)
    setPage(x[0])
  })

  return ( 
    <div class="grid place-items-center">
        <div class="p-5"></div>

          <label >Choose a markdown page:   
          <select>
            <For each={pages()}>{page => <option
              onClick={()=> setPage(page)}
              >{page.title}</option>}
            </For>
          </select>
          </label>

        <MdPageComponent page_signal={page}/>
    </div>
  );
};


export default MarkdownPage;
