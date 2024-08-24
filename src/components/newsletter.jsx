const Newsletter =()=>{
    return(
        <section className="newsletter-section max-width">
            <article className="newsletter--content">
                <h2>Never <span>miss</span> an update</h2>
                <p>Get our blog articles sent to your mail directly when a new one is created</p>
                <div>  
                    <input type="email" name="emailHASED" id="emailHASED" className="email-field input-field" placeholder="Your email address..."/>
                    <button type="submit" className="submit-btn btn">Start getting update</button>
                </div>
            </article>
        </section>
    )
}

export default Newsletter;