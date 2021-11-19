<script>
    import {onMount} from "svelte";

    import AsteroidList from "../components/AsteroidList.svelte";

    let asteroidAmount = 0;
    let asteroids = [];
    let date = new Date().toISOString().split('T')[0];

    $: plural = asteroidAmount > 1;

    $: today = new Date(date).getFullYear === new Date().getFullYear && new Date(date).getMonth() === new Date().getMonth() && new Date(date).getDate() === new Date().getDate();

    const fetchData = async () => {
        if (!date) {
            date = new Date().toISOString().split('T')[0];
        };
        const res = await fetch('/api/getAsteroids', {
            method: 'POST',
            headers: {"Content-type": "application/json;charset=UTF-8"},
            credentials: 'include',
            body: JSON.stringify({
               startDate: date
            }),
        });
        const data = await res.json();
        console.log(data)
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

<img class="backgroundImage" src="/images/main-bg-desktop.jpg" alt="bg" />

<header>
    <h1 class="mainTitle">Zen Cosmos</h1>
    <h2 class="mainSubTitle">Is today your last day?</h2>
</header>

<main>   

    <p>There {plural ? "are" : "is"} <span class="counter">{asteroidAmount}</span> asteroid{plural ? "s" : ""} that could hit us {today ? "today," : "on"} <span class="date">{new Date(date).toDateString()}</span>.</p>
    <p>But who are they, exactly?</p>
    <p>I mean, knowing your enemy won't save you in that case, but still.</p>
    <p>Wouldn't it be... nice to know?</p>
    <p>So let me introduce you to:</p>
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
        margin: 2rem;
    }

    .mainTitle {
        font-size: 5rem;
        margin: 1rem 0;
    }

    .mainSubTitle {
        font-size: 3rem;
        margin: 0.5rem 0;
    }

    main {
        width: 75%;
        margin: 5rem 0 1rem 1rem;
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
</style>
