<script>
    export let asteroids;

    import AsteroidCard from "./AsteroidCard.svelte";

    let pickedAsteroid = 0;

    const changePicked = index => {
        pickedAsteroid = index;
    };

    const movePrevious = () => {
        if (pickedAsteroid <= 0) return;
        pickedAsteroid -= 1;
    };

    const moveNext = () => {
        if (pickedAsteroid >= asteroids.length - 1) return;
        pickedAsteroid += 1;
    };
</script>

<article>
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

    <div class="navNext">
        <p class="navArrow" on:click={movePrevious}>Previous</p>
        <p class="navArrow" on:click={moveNext}>Next</p>
    </div>
</article>



<style>
    article {
        margin: 4rem auto;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    nav {
        margin-bottom: 3rem;
    }

    .navNext {
        display: none;
    }

    @media screen and (max-width: 1024px) {
        nav {
            margin-bottom: 0.5rem;
        }
        .navNext {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .navArrow {
            margin: 0 1rem;
            text-align: center;
            width: 85px;
            cursor: pointer;
            text-decoration: underline;
            font-size: 1rem;
            text-transform: uppercase;
        }
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