import { Component, createResource, createSignal, For } from 'solid-js';

import {marked} from 'marked';
import {mdpage} from '../interface/mdpage'
import MdPageComponent from '~/components/MdPage/MdPage';
import URI from '~/components/GetURI'

const fetchPage = () => fetch(`${URI()}/pages`);

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
  })


  const setPageWrapper = (input: mdpage) =>{
    console.log('update the state of the page')
    setPage(input)
  }
  
  console.log(`the backend uri is : ${URI()}`)

  const getSelectedPage = (title: string) => {
      return pages().filter(x => x.title==title)[0]
  }

  return ( 
    <div class="grid place-items-center">
        <div class="p-5"></div>
   
          <select 
            class="block py-2.5 px-0 w-25 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer display:block"
            onChange={(e)=> setPage(getSelectedPage(e.target.value))}
          >
            <option selected disabled>Choose a markdown page</option>
            <For each={pages()}>{page => <option
              >{page.title}</option>}
            </For>
          </select>

        <MdPageComponent page_signal={page}/>
    </div>
  );
};


export default MarkdownPage;
