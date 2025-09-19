import "./About.css";

export default function About() {
  return (
    <div className="container">
      <div className="about">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-text">
            <span className="tag">Our mission</span>
            <h1>
              Help more people cook nourishing meals, <br /> more often.
            </h1>
            <p>
              Healthy Recipe Finder was created to prove that healthy eating can
              be convenient, affordable, and genuinely delicious.
            </p>
            <p>
              We showcase quick, whole-food dishes that anyone can master—no
              fancy equipment, no ultra-processed shortcuts—just honest
              ingredients and straightforward steps.
            </p>
          </div>
          <div className="hero-image">
            <img
              src="/images/image-about-our-mission-large.webp"
              alt="Cooking"
            />
          </div>
        </section>

        <section className="section gray">
          <h2>Why we exist</h2>
          <div className="list">
            <div>
              <h3>➜ Cut through the noise.</h3>
              <p>
                The internet is bursting with recipes, yet most busy cooks still
                default to take- <br />
                away or packaged foods. We curate a tight collection of
                fool-proof dishes so you <br />
                can skip the scrolling and start cooking.
              </p>
            </div>
            <div>
              <h3>➜ Empower home kitchens.</h3>
              <p>
                When you control what goes into your meals, you control how you
                feel. Every <br />
                recipe is built around unrefined ingredients and ready in about
                half an hour of <br />
                active prep.
              </p>
            </div>
            <div>
              <h3>➜ Make healthy look good.</h3>
              <p>
                High-resolution imagery shows you exactly what success looks
                like—because <br />
                we eat with our eyes first, and confidence matters.
              </p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Our food philosophy</h2>
          <div className="list">
            <div>
              <h3>➜ Whole ingredients first.</h3>
              <p>
                Fresh produce, grains, legumes, herbs, and quality fats form the
                backbone of <br />
                every recipe.
              </p>
            </div>
            <div>
              <h3>➜ Flavor without compromise.</h3>
              <p>
                Spices, citrus, and natural sweetness replace excess salt,
                sugar, and additives.
              </p>
            </div>
            <div>
              <h3>➜ Respect for time.</h3>
              <p>
                Weeknight meals should slot into real schedules; weekend cooking
                can be <br />
                leisurely but never wasteful.
              </p>
            </div>
            <div>
              <h3>➜ Sustainable choices.</h3>
              <p>
                Short ingredient lists cut down on food waste and carbon
                footprint, while plant- <br />
                forward dishes keep things planet-friendly.
              </p>
            </div>
          </div>
        </section>

        {/* Beyond the plate */}
        <section className="section gray plate">
          <div className="plate-text">
            <h2>Beyond the plate</h2>
            <p>
              We believe food is a catalyst for <br />
              community and well-being. By sharing <br />
              approachable recipes, we hope to:
            </p>
            <ul>
              <li>
                Encourage family dinners and social <br />
                cooking.
              </li>
              <li>
                Reduce reliance on single-use <br />
                packaging and delivery waste.
              </li>
              <li>
                Spark curiosity about seasonal produce <br /> and local
                agriculture.
              </li>
            </ul>
          </div>
          <div className="plate-image">
            <img
              src="/images/image-about-beyond-the-plate-large.webp"
              alt="Family cooking"
            />
          </div>
        </section>

        {/* CTA */}
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
