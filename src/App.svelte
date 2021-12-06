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
  $: formattedList = f.map((n) => n.toLocaleString()).join(" • ");

  // $: console.log("formatted input", formattedInt);

  const onKeyDown = (e) => {
    console.log("keycode", e.keyCode);
    if (e.keyCode === 13 && show === "input") {
      e.preventDefault();
      getFactors();
    } else if (e.keyCode === 37 && show === "input") {
      // ignore left arrow key
      e.preventDefault();
    } else if (e.key === "t") {
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
          style="opacity: 0; position: absolute;"
          type="number"
          bind:value={userInput}
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
        <button on:click={getFactors}>Go</button>
      </p>
    </div>
  {/if}

  {#if show === "factors"}
    <div class="main animate__animated animate__zoomInUp">
      <h1>The Factors Of {formattedInt} Are:</h1>
      <p class="factors">{formattedList}</p>
      <p>
        {isPrime}
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

  @media only screen and (max-width: 700px) {
    .factors {
      font-size: 0.85rem;
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
