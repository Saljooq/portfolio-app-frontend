import { Accessor, createSignal, Setter } from "solid-js";

export interface CounterInterface {
  count: Accessor<number>,
  setCount: Setter<number>,
}

export default function GlobalState({
    count,
    setCount
}: CounterInterface) {
  return (
    <button
      class="w-[200px] rounded-full bg-gray-100 border-2 border-gray-300 focus:border-gray-400 active:border-gray-400 px-[2rem] py-[1rem]"
      onClick={() => setCount(count() + 1)}
    >
      Clicks: {count()}
    </button>
  );
}
