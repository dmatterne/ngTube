# Ngtube

[**Try me here !**](http://ngtube.2016.angularattack.io/)
![Ngtube](https://framapic.org/33XUWo0EMha0/8ilIVfajRm4a.png)

## User guide

### Research and results

> First thing is making your search in the upper navigation bar: results appears in a grid of at most 3 videos a line.

You can now select:

* play a video by clicking on the thumbnail
* read the description by clicking on the video's title
* add this video to your playlist

### Footer commands

> Once a video is selected, commands will be available. 

+ Stop/Play: usual usage
+ Repeat mode: [ None | Single song | Playlist ]
+ Previous/Next song: if current video is not in playlist, next and previous will be the first one of it
+ Mute/Unmute and sound equalizer
+ Video quality: the ones only available for this video (from 144p to 4K)
+ Cinema mode: set a dark background **when player is maximise**
+ Maximise/minimise: turn the player to a small tile at the bottom left, player is still usable
+ Add to playlist: add the current video at the end of the playlist

> Youtube player's buttons and footer ones are synchronized.

### Playlist

> A single, anonymous, playlist can be created by a user. Its state is stored on the client (localStorage) browser
> and is restored at application launch.

+ Empty the playlist: it is a one step action and undo is not available
+ Remove a video: by clicking the cross on the tile
+ Move in playlist: by clicking the up/down arrows on the video
+ Select a video: by clicking the tile anywhere else

## Libraries

* [materializecss](http://materializecss.com)
* [ionicon](http://ionicons.com)
* [material-icons](https://design.google.com/icons/)
* [momentjs](http://momentjs.com)
* [@ngrx/store](https://github.com/ngrx/store)
* [Youtube public API](https://developers.google.com/youtube)

## Development only libraries

* [angular-cli](https://github.com/angular/angular-cli)
* [gulp](http://gulpjs.com/)
     + gulp-clean
     + gulp-rename
* [systemjs-builder] (https://github.com/systemjs/builder)
    
## Why this project ?

Ngtube is a simplified youtube browser application made for [Angular attack](https://www.angularattack.com)

![Angularattack](https://rumblex-angularattack.s3.amazonaws.com/images/knight.png)
 
## Team contact

* Gatien Bovyn - [Astalaseven@github](https://github.com/astalaseven) - [gatien.bovyn@gmail.com](mailto:gatien.bovyn@gmail.com)
* Florian Knop - [fknop@github](https://github.com/fknop) - [florian_knop@hotmail.com](mailto:florian_knop@hotmail.com)
* Simon Placentino - [splacentino@github](https://github.com/splacentino) - [placentino.simon@gmail.com](mailto:placentino.simon@gmail.com)
