<script>
    export let asteroid;
</script>

<article class="globalContainer">
    <h3  class="asteroidName">{asteroid.name}</h3>
   <div class="questionContainer">
        <div class="questionElement">
            <p class="question">Is it potentially dangerous?</p>
            <p class="answer"><span class="value">{asteroid.is_potentially_hazardous_asteroid ? "Yep" : "Nope"}</span></p>
        </div>
        <div class="questionElement">
            <p class="question">How big is it?</p>
            <p class="answer">About <span class="value">{Math.round((asteroid.estimated_diameter.meters.estimated_diameter_max + asteroid.estimated_diameter.meters.estimated_diameter_min) / 2)} meters</span> wide.</p>
        </div>
        <div class="questionElement">
            <p class="question">How fast is it?</p>
            <p class="answer">More or less, <span class="value">{Math.round(asteroid.close_approach_data[0].relative_velocity.kilometers_per_second)} km/s</span>.</p>
        </div>
        <div class="questionElement">
            <p class="question">How close is it gonna come?</p>
            <p class="answer">If everything goes according to plan, it should not come closer than <span class="value">{Math.round(asteroid.close_approach_data[0].miss_distance.kilometers)} km</span>.</p>
        </div>
        <div class="questionElement">
            <p class="question">Where can I learn more about it?</p>
            <p class="answer"><a href={asteroid.nasa_jpl_url} target="_blank" rel="noopener" class="clickMe">Here!</a></p>
        </div>
    </div>
</article>

<style>
    h3 {
        text-align: center;
        margin-bottom: 2rem;
        font-size: 1.5rem;
        /* color: #9E50BF; */
        color: #de97fd;
    }

    .globalContainer {
        border: 1px solid white;
        padding: 0.5rem;
        border-radius: 15px;
        max-width: 600px;
        min-width: 300px;
        min-height: 146px;
        backdrop-filter: blur(5px);
        margin: 1rem;
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .questionContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .question {
        font-size: 1.2rem;
        font-weight: 600;
        color: gold;
    }

    .answer {
        font-size: 1rem;
        color: #5973C1;
        font-weight: 600;
    }

    .value, .clickMe {
        color: #9E50BF;
        font-size: 1.2rem;
    }

    .clickMe {
        text-decoration: underline;
    }

</style>