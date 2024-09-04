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
}