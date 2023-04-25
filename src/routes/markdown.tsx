import { Component, createResource, createSignal, For } from 'solid-js';

import {marked} from 'marked';
import {mdpage} from '../interface/mdpage'
import MdPageComponent from '~/components/MdPage/MdPage';
import URI from '~/components/GetURI'

const fetchPage = () => fetch(`${URI()}/pages`, {
    credentials: 'include',
    headers: {
      Accept: 'application.json',
      'Content-Type': 'application/json'
      
    },
    method: 'GET',
  } as RequestInit);

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
        <label class="block">
			<span class="text-gray-700">Choose a markdown page</span>
			<select 
				class="block w-full mt-1"
				onChange={(e)=> setPage(getSelectedPage(e.target.value))}
			>
				<For each={pages()}>{page => 
					<option value={page.title}>{page.title}</option>
					}
				</For>
			</select>
			</label>

        <MdPageComponent page_signal={page}/>
    </div>
  );
};


export default MarkdownPage;
