<script>
    export let asteroids;

    import AsteroidCard from "./AsteroidCard.svelte";

    let pickedAsteroid = 0;

    const changePicked = index => {
        pickedAsteroid = index;
    };
</script>

<main>
    <nav>
        {#each asteroids as asteroid, index (asteroid.id)}
            {#if index === pickedAsteroid}
            <img src="/images/asteroid_picked.png" alt="asteroid" width="50" height="50" class="asteroidPic"/>
            {:else}
            <img src="/images/asteroid.png" alt="asteroid" width="50" height="50" class="asteroidPic unpicked" on:click={() => changePicked(index)}/>
            {/if}
        {/each}
    </nav>
    <AsteroidCard asteroid={asteroids[pickedAsteroid]} />
</main>



<style>
    main {
        margin: 4rem auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    nav {
        margin-bottom: 3rem;
    }

    .asteroidPic {
        margin: 0.5rem;
        cursor: pointer;
        flex: 1;
    }

    .unpicked {
        opacity: 50%;
    }

    .unpicked:hover {
        opacity: 100%;
    }
</style>