<!-- App.svelte -->
<script>
  import "animate.css";
  import { factors } from "./factors.js";
  import { boom } from "./boom.js";

  let show = "welcome";
  let message = "";
  let showCursor = true;

  let userInput = "";
  let cursor = "|";
  $: int = parseInt(userInput, 10);
  $: formattedInt = isNaN(int) ? "" : int.toLocaleString();
  $: formattedWithCursor = formattedInt + cursor;

  window.setInterval(() => {
    cursor = showCursor && cursor === "" ? "|" : "";
  }, 400);

  let f = [];
  $: isPrime =
    f.length < 3 ? "This IS A Prime Number." : "This IS NOT A Prime Number.";
  $: formattedList =
    "<span>" +
    f.map((n) => n.toLocaleString()).join("</span><span>") +
    "</span>";
  $: formattedPairs = getFactorPairs([...f]);

  // $: console.log("num factors", f.length);

  const onKeyDown = (e) => {
    if (e.keyCode === 13 && show === "input") {
      e.preventDefault();
      getFactors();
    } else if (e.key === "p" && show === "factors") {
      e.preventDefault();
      showPairs();
    } else if (e.key === "f" && show === "pairs") {
      e.preventDefault();
      showFactors();
    } else if (e.key === "t" && show !== "input") {
      e.preventDefault();
      start();
    } else if (e.key === "d") {
      e.preventDefault();
      darkmode();
    } else if (e.key === "l") {
      e.preventDefault();
      lightmode();
    }
  };

  const handleBlur = () => {
    showCursor = false;
  };

  const handleFocus = () => {
    showCursor = true;
  };

  const enforceNumbers = (e) => {
    if (!e.key.match(/[0-9]|backspace/i)) e.preventDefault();
  };

  const start = () => {
    userInput = "";
    message = "";
    showCursor = true;
    show = "input";
  };

  const getFactors = () => {
    if (int > Number.MAX_SAFE_INTEGER) {
      message = "That Number Is Too Large.";
      show = "error";
    } else {
      show = "loader";
      window.setTimeout(() => {
        console.time("Factoring " + int);
        f = factors(int);
        console.timeEnd("Factoring " + int);
        if (f.length) {
          show = "factors";
          boom();
        } else {
          message = "Invalid Number.";
          show = "error";
        }
      }, 10);
    }
  };

  const getFactorPairs = (factors) => {
    let p = [];

    while (factors.length > 1) {
      let a = factors.shift().toLocaleString();
      let b = factors.pop().toLocaleString();
      p.push(a + " x " + b);
    }

    if (factors.length) {
      let a = factors.shift().toLocaleString();
      p.push(a + " x " + a);
    }

    return "<span>" + p.join("</span><span>") + "</span>";
  };

  const showPairs = () => {
    show = "pairs";
  };

  const showFactors = () => {
    show = "factors";
  };

  const darkmode = () => {
    document.body.classList = "darkmode";
  };

  const lightmode = () => {
    document.body.classList = "lightmode";
  };
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="App">
  {#if show === "loader"}
    <p class="loader animate__animated animate__zoomInUp">Please wait…</p>
  {/if}

  {#if show === "welcome"}
    <div class="main animate__animated animate__zoomInUp">
      <h1>Hi And Welcome To Factor Finder.</h1>
      <p>
        Type Or Click On <button on:click={start} class="key">T</button> To Begin
        Finding Factors! (This Is For Learning.)
      </p>
      <p>
        Type Or Click On <button on:click={darkmode} class="key">D</button> For
        Dark Mode. Type Or Click On
        <button on:click={lightmode} class="key">L</button>
        For Light Mode.
      </p>
    </div>
  {/if}

  {#if show === "input"}
    <div class="main animate__animated animate__zoomInUp">
      <h1>Please Type An Integer Greater Than 0:</h1>
      <p>
        <input
          class="hidden"
          type="number"
          bind:value={userInput}
          on:keydown={enforceNumbers}
          on:blur={handleBlur}
          on:focus={handleFocus}
          autofocus
        />
        <input
          type="text"
          bind:value={formattedWithCursor}
          tabindex="-1"
          readonly
        />
        <button on:click={getFactors} class="go">Go</button>
      </p>
    </div>
  {/if}

  {#if show === "factors"}
    <div class="main animate__animated animate__zoomInUp">
      <h1>The Factors Of {formattedInt} Are:</h1>
      <p class="factors">{@html formattedList}</p>
      <p>
        {isPrime}
      </p>
      <p>
        Type Or Click On <button on:click={showPairs} class="key">P</button> To Show
        Factor Pairs.
      </p>
      <p>
        Type Or Click On <button on:click={start} class="key">T</button> To Try Again!
      </p>
    </div>
  {/if}

  {#if show === "pairs"}
    <div class="main animate__animated animate__zoomInUp">
      <h1>The Factor Pairs Of {formattedInt} Are:</h1>
      <p class="factors pairs">{@html formattedPairs}</p>
      <p>
        Type Or Click On <button on:click={showFactors} class="key">F</button> To
        Show Factors.
      </p>
      <p>
        Type Or Click On <button on:click={start} class="key">T</button> To Try Again!
      </p>
    </div>
  {/if}

  {#if show === "error"}
    <div class="main animate__animated animate__zoomInUp">
      <h1 class="error">Error!</h1>
      <p>{message}</p>
      <p>
        Type Or Click On <button on:click={start} class="key">T</button> To Try Again!
      </p>
    </div>
  {/if}
</div>

<style>
  :global(body.darkmode) {
    color: rgba(255, 255, 255, 0.7);
    background-color: black;
  }

  .App {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main {
    width: 80%;
    max-width: 800px;
    display: block;
    text-align: center;
  }

  .key {
    background-color: transparent;
    border: 1px solid black;
    border-radius: 4px;
    color: black;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 3px 5px;
  }

  :global(.main input) {
    font-size: 3rem;
    border: none;
    background: transparent;
    color: darkred;
  }

  .hidden {
    opacity: 0;
    position: absolute;
  }

  .factors,
  .pairs {
    max-height: 60vh;
    overflow: auto;
  }

  :global(.pairs span, .factors span) {
    background-color: transparent;
    border: 1px solid black;
    border-radius: 4px;
    color: black;
    display: inline-block;
    margin: 2px 3px;
    padding: 2px 3px;
  }

  .go {
    background: darkred;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 3rem;
  }

  :global(.darkmode .key, .darkmode .factors span, .darkmode .pairs span) {
    border-color: rgba(255, 255, 255, 0.7);
    color: rgba(255, 255, 255, 0.7);
  }

  @media only screen and (max-width: 700px) {
    .factors,
    .pairs {
      font-size: 0.85rem;
      max-height: 40vh;
    }
  }

  .error {
    color: darkred;
  }

  .loader {
    color: darkred;
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    text-align: center;
    margin-top: -33px;
    font-size: 44px;
  }
</style>
