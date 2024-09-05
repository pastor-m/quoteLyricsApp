import {JSX, Builder, loadImage } from 'canvacord';

export class MusicCard extends Builder {
    constructor(){
        super(290,930);
        this.bootstrap({
            artist:"",
            title:"",
            date:"",
            image:"",
        })
    }

    setImage(image){
        this.options.set("image", image);
        return this
    }

    setTitle(title) {
        this.options.set("title", title);
        return this;
    }

    setArtist(artist){
        this.options.set("artist", artist);
        return this;
    }

    setDate(date){
        this.options.set("date", date)
    }

    async render() {
        const {artist, title, date, image} = this.options.getOptions();
        const art = await loadImage(image);
        return JSX.createElement(
            "div",
            {
                style: {
                    background: 'white',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    borderRadius: '0.5rem',
                    height: '100%',
                    width: '100%'
                },
            },
            JSX
        )
    }

}