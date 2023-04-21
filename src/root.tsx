// @refresh reload
import { createSignal, Suspense } from "solid-js";
import {
  useLocation,
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
  Route,
} from "solid-start";
import "./root.css";
import Home from "./routes/index";
import index2 from "./routes/index2"

export default function Root() {
  const location = useLocation();


  const [count, setCount] = createSignal(0);

  const active = (path: string) =>
    path == location.pathname
      ? "border-b-4 border-sky-500"
      : "border-b-4 border-transparent";

  const aClass = "inline-flex p-3 border-b-2 border-transparent rounded-t-lg hover:text-sky-500 hover:border-sky-500  group";

  console.log("created a count: "+ count())
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - With TailwindCSS</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <div class="h-screen overflow-y-auto">
        <Suspense>
          <ErrorBoundary>
            <nav class="border-b border-sky-800 bg-inherit dark:border-gray-700">
              <ul class="container flex flex-wrap -mb-px text-sm font-medium text-center  dark:text-black">
                <li class={`mr-2 ${active('/')} mx-1.5 sm:mx-6`}>
                    <A href="/" class={aClass}>Index - {count()}</A>
                </li>
                <li class={`mr-2 ${active('/about')} mx-1.5 sm:mx-6`}>
                  <A href="/about" class={aClass}>About</A>
                </li>
                <li class={`mr-2 ${active('/markdown')} mx-1.5 sm:mx-6`}>
                  <A href="/markdown" class={aClass}>Markdown</A>
                </li>
                <li class={`mr-2 ${active('/mdmodalpage')} mx-1.5 sm:mx-6`}>
                  <A href="/mdmodalpage" class={aClass}>MD Modal</A>
                </li>
                <li class={`mr-2 ${active('/editor')} mx-1.5 sm:mx-6`}>
                  <A href="/editor" class={aClass}>Editor</A>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route path="/" component={Home({count:count, setCount:setCount})}></Route>
              <Route path="/index2" component={index2({count:count, setCount:setCount})}></Route>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        </div>
        <Scripts />
      </Body>
    </Html>
  );
}
