
import {marked} from 'marked';
import { Accessor, JSX } from 'solid-js';
import { mdpage } from '~/interface/mdpage';

export interface IMdPage {
    page_signal: Accessor<mdpage>
}

function processMd(input: string){


    console.log("processing the md string again")
    input = input.replaceAll("\n\n\n", "\n\n<br />\n\n")
    const md_styling = "" +
    // Adding padding to all sides
    " p-6 " + 
    // Adding left margin for unordered list
    " [&>ul]:ml-5 " + 
    // Red text to elements in the list
    " [&>ul>li]:text-red-800 " + 
    // Adding h1, h2, h3, and h4 text sizing
    " [&>h1]:text-4xl [&>h2]:text-3xl [&>h3]:text-2xl " + 
    // Adding bottom margins for headings
    " [&>h1]:mb-2.5 [&>h2]:mb-2.5  [&>h3]:mb-2.5" +
    // Adding top margins for headings
    " [&>h2]:mt-5  [&>h3]:mt-3.5"

    const el: JSX.Element = <div 
        class={md_styling}
        innerHTML={ marked.parse(input)} 
    />

    const node = el as Node

    const list_dict = {
        'UL': 'list-disc',
        'OL': 'list-decimal'
    }
   
    node.childNodes.forEach(
        x => {
            if (x.nodeName === "UL" || x.nodeName === "OL"){
                // this should have children
                for (let ch of x.childNodes){
                    if (ch.nodeName === "LI"){
                        if (ch.hasChildNodes() && !(ch.firstChild!.nodeName == "INPUT")){
                            ch.parentElement?.classList.add(
                                list_dict[x.nodeName],
                                "pl-5",
                            )
                            break
                        }
                    }
                }
            }
        }
    )
    
    return el
}

export default function MdPageComponent(prop: IMdPage){
    return(
        <div>
            {processMd(prop.page_signal().body)}
        </div>
    )
}