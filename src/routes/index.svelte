<script>
    import {onMount} from "svelte";

    import AsteroidList from "../components/AsteroidList.svelte";

    let asteroidAmount = 0;
    let asteroids = [];
    let pickedDate = new Date().toISOString().split('T')[0];
    let date = pickedDate;
    let loading = false;

    $: plural = asteroidAmount > 1;
    $: past = new Date(date).setDate(new Date(date).getDate()+1) < new Date();

    $: today = new Date(date).getFullYear() === new Date().getFullYear() && new Date(date).getMonth() === new Date().getMonth() && new Date(date).getDate() === new Date().getDate();

    const fetchData = async () => {
        if (!pickedDate) {
            pickedDate = new Date().toISOString().split('T')[0];
        };
        date = pickedDate;
        console.log(date)
        loading = true;
        const res = await fetch('/api/getAsteroids', {
            method: 'POST',
            headers: {"Content-type": "application/json;charset=UTF-8"},
            credentials: 'include',
            body: JSON.stringify({
               startDate: date
            }),
        });
        const data = await res.json();
        loading = false;
        if (data?.element_count) { 
            asteroidAmount = data.element_count;
            asteroids = [...data.near_earth_objects[date]];
        };
    };

    onMount(async() => {
        if (asteroids.length > 0) return;
        await fetchData();
    });
</script>

<picture>
    <source media="(max-width:1024px)" srcset="/images/main-bg-mobile.jpg" />
    <img class="backgroundImage" src="/images/main-bg-desktop.jpg" alt="bg" />
</picture>

<header>
    <h1 class="mainTitle">Zen Cosmos</h1>
    <h2 class="mainSubTitle">Is today your last day?</h2>
</header>

<main>   
    <div class="datePicker">
        <label class="formLabel" for="datePicked">Pick a date</label>
        <input id="datePicked" name="datePicked" type="date" bind:value={pickedDate} class="formInput" />
        <button class="formButton" on:click={fetchData} disabled={loading}>Let's see!</button>
    </div>

    <p>There {plural ? "are" : "is"} <span class="counter">{asteroidAmount}</span> asteroid{plural ? "s" : ""} that {past ? "did" : "will"} come near us {today ? "today," : "on"} <span class="date">{new Date(date).toDateString()}</span>.</p>
    <p>But who are they, exactly?</p>

    {#if asteroids.length > 0}
    <AsteroidList asteroids={asteroids} />
    {/if}
    
</main>

<style>
    .backgroundImage {
        width: 100%;
        height: 100vh;
        position: fixed;
        margin: 0;
        padding: 0;
        top: 0;
        left: 0;
        z-index: -1;
    }

    header {
        margin: 2rem auto;
        text-align: center;
        padding: 1rem;
    }

    .mainTitle, .mainSubTitle {
        color: #de97fd;
    }

    .mainTitle {
        font-size: 5rem;
        margin: 1rem 0;
    }

    .mainSubTitle {
        font-size: 3rem;
        margin: 0.5rem 0;
    }

    @media screen and (max-width: 450px) {
        .mainTitle {
            font-size: 3rem;
        }
        .mainSubTitle {
            font-size: 1.5rem;
        }
    }

    main {
        width: 75%;
        margin: 4rem auto 150px auto;
        text-align: center;
    }

    .date {
        font-weight: 600;
        color: gold;
    }

    .counter {
        font-size: 1.7rem;
        font-weight: 600;
        color: #ffd700;
    }

    .datePicker {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .formLabel {
        color: white;
        text-transform: uppercase;
        font-weight: 600;
        letter-spacing: 0.2rem;
        margin-bottom: 0.8rem;
    }

    .formInput {
        background-color: gold;
        color: black;
        font-weight: 600;
        text-align: center;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        cursor: pointer;
    }

    .formButton {
        margin-top: 1rem;
        padding: 0.5rem 1rem;
        font-size: 1rem;
        cursor: pointer;
        font-weight: 600;
        text-align: center;
        background-color: #de97fd;
        color: black;
        text-transform: uppercase;
    }

    .formButton:disabled {
        background-color: black;
        color: darkgrey;
        cursor:not-allowed;
    }
</style>
