<!-- App.svelte -->
<script>
  import "animate.css";
  import { factors } from "./factors.js";
  import { boom } from "./boom.js";

  let show = "welcome";

  let userInput = "";
  $: int = parseInt(userInput, 10);
  $: formattedInt = int.toLocaleString();
  let f = [];
  $: isPrime =
    f.length < 3 ? "This IS A Primed Number." : "This IS NOT A Primed Number.";
  $: formattedList = f.map((n) => n.toLocaleString()).join(" • ");

  // $: console.log("factorlist", formattedList);
  // $: console.log("user input", userInput);

  const onKeyPress = (e) => {
    if (e.keyCode === 13 && show === "input") {
      getFactors();
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

  const start = () => {
    userInput = "";
    show = "input";
  };

  const getFactors = () => {
    f = factors(int);
    show = f.length ? "factors" : "error";
    boom();
  };

  const darkmode = () => {
    document.body.classList = "darkmode";
  };

  const lightmode = () => {
    document.body.classList = "lightmode";
  };
</script>

<svelte:window on:keypress={onKeyPress} />

<div class="App">
  <p class="loader">Please wait…</p>
  {#if show === "welcome"}
    <div class="main  animate__animated animate__zoomInUp">
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
    <div class="main  animate__animated animate__zoomInUp">
      <h1>Please Type An Integer Greater Than 0:</h1>
      <p>
        <input type="text" bind:value={userInput} autofocus />
        <button on:click={getFactors}>Go</button>
      </p>
    </div>
  {/if}

  {#if show === "factors"}
    <div class="main  animate__animated animate__zoomInUp">
      <h1>The Factors Of {formattedInt} Are:</h1>
      <p class="factors">{formattedList}</p>
      <p>
        {isPrime}
      </p>
      <p>
        Type Or Press <button on:click={start} class="key">T</button> To Try Again!
      </p>
    </div>
  {/if}

  {#if show === "error"}
    <div class="main  animate__animated animate__zoomInUp">
      <h1 class="error">Error!</h1>
      <p>
        Type Or Press <button on:click={start} class="key">T</button> To Try Again!
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
</style>
