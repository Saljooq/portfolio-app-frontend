
import {marked} from 'marked';
import { Accessor, JSX } from 'solid-js';
import { mdpage } from '~/interface/mdpage';

export interface IMdPage {
    page_signal: Accessor<mdpage>
}

function processMd(input: string){

    input = input.replaceAll("\n\n", "\n\n<br />\n\n")


    const el: JSX.Element = <div 
        class="pt-16 [&>ul]:ml-5 [&>ul>li]:text-red-800 [&>h1]:text-4xl [&>h2]:text-3xl [&>h3]:text-2xl [&>h1]:mb-2.5 [&>h2]:mb-2.5  [&>h3]:mb-2.5" 
        innerHTML={ marked.parse(input)} 
    />

    const n = el as Node 
    var i = 1
    n.childNodes.forEach(
        x => {
            console.log(x)
            if (x.localName === "ul"){
                console.log("we have a list")
                var targetThis = false

                // this should have children
                x.childNodes.forEach(
                    ch => {

                        if (ch.localName === "li"){

                            if (ch.firstChild.localName == "input"){
                                console.log("We have a child node")

                            } else {
                                targetThis = true
                            }
                        }
                    }
                )

                if (targetThis) {
                    x.className = "pl-5  list-disc"
                }

            }
        }
    )
    

    return el


}

export default function MdPageComponent(prop: IMdPage){


    return(
        <div>
            {/* <div 
                class="pt-16 [&>ul]:ml-5 [&>ul>li]:text-red-800 [&>h1]:text-4xl [&>h2]:text-3xl [&>h3]:text-2xl" 
                // innerHTML={ marked.parse(prop.page_signal().body)}
                innerHTML={processMd(prop.page_signal().body)} 

            /> */}
            {processMd(prop.page_signal().body)}
        </div>
    )
}