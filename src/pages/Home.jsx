import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="container">
    
        <section className="her">
          <h1>
            <span className="highlight">Healthy</span> meals, zero fuss
          </h1>
          <p>
            Discover eight quick, whole-food recipes that you can cook tonight{" "}
            <br />
            —no processed junk, no guesswork.
          </p>
          <button className="btn">Start exploring</button>
        </section>

      
        <div className="main-img">
          <img src="/images/image-home-hero-large.webp" alt="Cooking" />
        </div>

        
        <section className="features">
          <h2>What you’ll get</h2>
          <div className="feature-list">
            <div className="feature-item">
              <img src="/images/icon-whole-food-recipes.svg" alt="Whole food" />
              <h3>Whole-food recipes</h3>
              <p>
                Each dish uses everyday, unprocessed <br />
                ingredients.
              </p>
            </div>
            <div className="feature-item">
              <img src="/images/icon-minimum-fuss.svg" alt="Minimum fuss" />
              <h3>Minimum fuss</h3>
              <p>
                All recipes are designed to make eating <br />
                healthy quick and easy.
              </p>
            </div>
            <div className="feature-item">
              <img src="/images/icon-search-in-seconds.svg" alt="Search" />
              <h3>Search in seconds</h3>
              <p>
                Filter by name or ingredient and jump <br />
                straight to the recipe you need.
              </p>
            </div>
          </div>
        </section>

     
        <section className="real-life">
          <div className="real-text">
            <h2>Built for real life</h2>
            <p>
              Cooking shouldn’t be complicated. These recipes come in <br />
              under <strong>30 minutes</strong> of active time, fit busy
              schedules, and <br />
              taste good enough to repeat.
            </p>
            <p>
              Whether you’re new to the kitchen or just need fresh <br />
              ideas, we’ve got you covered.
            </p>
          </div>
          <div className="real-img">
            <img
              src="/images/image-home-real-life-large.webp"
              alt="Cooking veggies"
            />
          </div>
        </section>

      
        <section className="cta">
          <img src="/images/pattern-fork.svg" alt="fork img" className="fork" />
          <div className="cta-content">
            <h2>Ready to cook smarter?</h2>
            <p>
              Hit the button, pick a recipe, and get dinner on the table—fast.
            </p>
            <button className="btn">Browse recipes</button>
          </div>
          <img
            src="/images/pattern-knife.svg"
            alt="knife img"
            className="knife"
          />
        </section>

        <footer className="footer">
          <p>Made with ❤️ and 🥑</p>
          <div className="socials">
            <a href="#">
              <img src="/images/icon-instagram.svg" alt="Instagram" />
            </a>
            <a href="#">
              <img src="/images/icon-bluesky.svg" alt="Twitter" />
            </a>
            <a href="#">
              <img src="/images/icon-tiktok.svg" alt="TikTok" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
