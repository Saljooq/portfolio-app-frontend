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
import index2 from "./components/index2"

export default function Root() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-sky-600"
      : "border-transparent hover:border-sky-600";

  const [count, setCount] = createSignal(0);

  console.log("created a count: "+ count())
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - With TailwindCSS</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <nav class="bg-sky-800">
              <ul class="container flex items-center p-3 text-gray-200">
                <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
                  {/* <A href="/">Index</A> */}
                    {/* <Route path="/" component={Home({count:count, setCount:setCount})}></Route> */}
                    <A href="/">Index - {count()}</A>
                </li>
                <li class={`border-b-2 ${active("/index2")} mx-1.5 sm:mx-6`}>
                    <A href="/index2">Index2 - {count()}</A>
                </li>
                <li class={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
                  <A href="/about">About</A>
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
        <Scripts />
      </Body>
    </Html>
  );
}