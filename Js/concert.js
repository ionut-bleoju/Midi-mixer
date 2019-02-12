var songList = [];
var tracks = [];
var used = [];
var initial = 1;
var usedInstruments = ["acoustic_grand_piano"];
var available = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
var instruments = ["acoustic_grand_piano", "bright_acoustic_piano", "electric_grand_piano", "honkytonk_piano", "electric_piano_1", "electric_piano_2", "harpsichord", "clavinet", "celesta", "glockenspiel", "music_box", "vibraphone", "marimba", "xylophone", "tubular_bells", "dulcimer", "drawbar_organ", "percussive_organ", "rock_organ", "church_organ", "reed_organ", "accordion", "harmonica", "tango_accordion", "acoustic_guitar_nylon", "acoustic_guitar_steel", "electric_guitar_jazz", "electric_guitar_clean", "electric_guitar_muted", "overdriven_guitar", "distortion_guitar", "guitar_harmonics", "acoustic_bass", "electric_bass_finger", "electric_bass_pick", "fretless_bass", "slap_bass_1", "slap_bass_2", "synth_bass_1", "synth_bass_2", "violin", "viola", "cello", "contrabass", "tremolo_strings", "pizzicato_strings", "orchestral_harp", "timpani", "string_ensemble_1", "string_ensemble_2", "synth_strings_1", "synth_strings_2", "choir_aahs", "voice_oohs", "synth_choir", "orchestra_hit", "trumpet", "trombone", "tuba", "muted_trumpet", "french_horn", "brass_section", "synth_brass_1", "synth_brass_2", "soprano_sax", "alto_sax", "tenor_sax", "baritone_sax", "oboe", "english_horn", "bassoon", "clarinet", "piccolo", "flute", "recorder", "pan_flute", "blown_bottle", "shakuhachi", "whistle", "ocarina"]
var db = firebase.firestore();
var mainContainer = document.getElementById("mainContainer");
var addContainer = document.getElementById("addContain")
var addButton = document.getElementById("addBtn");
var songsRef = db.collection("Songs");
const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000
});

addButton.addEventListener("click", getSongValue);

async function getFormValues(event) {
    const {
        value: formValues
    } = await Swal.fire({
        title: 'Change instrument',
        html: '<h2>' + event.previousElementSibling.innerText + '</h2>' +
            `<select id="swal-input1" size="1">
        <optgroup label="Piano">
            <option value="0" itemprop itemtype="http://schema.org/instrument">Acoustic Grand Piano</option>
            <option value="1" temprop itemtype="http://schema.org/instrument">Bright Acoustic Piano</option>
            <option value="2" temprop itemtype="http://schema.org/instrument">Electric Grand Piano</option>
            <option value="3" temprop itemtype="http://schema.org/instrument">Honky-tonk Piano</option>
            <option value="4" temprop itemtype="http://schema.org/instrument">Electric Piano 1</option>
            <option value="5" temprop itemtype="http://schema.org/instrument">Electric Piano 2</option>
            <option value="6" temprop itemtype="http://schema.org/instrument">Harpischord</option>
            <option value="7" temprop itemtype="http://schema.org/instrument">Clavinet</option>
        </optgroup>
        <optgroup label="Chromatic Percussion">
            <option value="8">Celesta </option>
            <option value="9">Glockenspiel </option>
            <option value="10">Music Box </option>
            <option value="11">Vibraphone </option>
            <option value="12">Marimba </option>
            <option value="13">Xylophone </option>
            <option value="14">Tubular Bells </option>
            <option value="15">Dulcimer </option>
        </optgroup>
        <optgroup label="Organ">
            <option value="16">Drawbar Organ </option>
            <option value="17">Percussive Organ </option>
            <option value="18">Rock Organ </option>
            <option value="19">Church Organ </option>
            <option value="20">Reed Organ </option>
            <option value="21">Accordion </option>
            <option value="22">Harmonica </option>
            <option value="23">Tango Accordion </option>
        </optgroup>
        <optgroup label="Guitar">
            <option value="24">Acoustic Guitar (nylon) </option>
            <option value="25">Acoustic Guitar (steel) </option>
            <option value="26">Electric Guitar (jazz) </option>
            <option value="27">Electric Guitar (clean) </option>
            <option value="28">Electric Guitar (muted) </option>
            <option value="29">Overdriven Guitar </option>
            <option value="30">Distortion Guitar </option>
            <option value="31">Guitar Harmonics </option>
        </optgroup>
        <optgroup label="Bass">
            <option value="32">Acoustic Bass </option>
            <option value="33">Electric Bass (finger) </option>
            <option value="34">Electric Bass (pick) </option>
            <option value="35">Fretless Bass </option>
            <option value="36">Slap Bass 1 </option>
            <option value="37">Slap Bass 2 </option>
            <option value="38">Synth Bass 1 </option>
            <option value="39">Synth Bass 2 </option>
        </optgroup>
        <optgroup label="Viola">
            <option value="40">Violin </option>
            <option value="41">Viola </option>
            <option value="42">Cello </option>
            <option value="43">Contrabass </option>
            <option value="44">Tremolo Strings </option>
            <option value="45">Pizzicato Strings </option>
            <option value="46">Orchestral Harp </option>
            <option value="47">Timpani </option>
        </optgroup>
        <optgroup label="Ensemble">
            <option value="48">String Ensemble 1 </option>
            <option value="49">String Ensemble 2 </option>
            <option value="50">Synth Strings 1 </option>
            <option value="51">Synth Strings 2 </option>
            <option value="52">Choir Aahs </option>
            <option value="53">Voice Oohs </option>
            <option value="54">Synth Choir </option>
            <option value="55">Orchestra Hit </option>
        </optgroup>
        <optgroup label="Brass">
            <option value="56">Trumpet </option>
            <option value="57">Trombone </option>
            <option value="58">Tuba </option>
            <option value="59">Muted Trumpet </option>
            <option value="60">French Horn </option>
            <option value="61">Brass Section </option>
            <option value="62">Synth Brass 1 </option>
            <option value="63">Synth Brass 2 </option>
        </optgroup>
        <optgroup label="Reed">
            <option value="64">Soprano Sax </option>
            <option value="65">Alto Sax </option>
            <option value="66">Tenor Sax </option>
            <option value="67">Baritone Sax </option>
            <option value="68">Oboe </option>
            <option value="69">English Horn </option>
            <option value="70">Bassoon </option>
            <option value="71">Clarinet </option>
        </optgroup>
        <optgroup label="Pipe">
            <option value="72">Piccolo </option>
            <option value="73">Flute </option>
            <option value="74">Recorder </option>
            <option value="75">Pan Flute </option>
            <option value="76">Blown bottle </option>
            <option value="77">Shakuhachi </option>
            <option value="78">Whistle </option>
            <option value="79">Ocarina </option>
        </optgroup>
        </select>`,
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById('swal-input1').value,
            ]
        }
    })

    function formatString(str){
        var text = str.replace("_", " ");
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    if (formValues) {
        index = parseInt(event.parentElement.getAttribute("data-index"));
        event.parentElement.childNodes[2].innerHTML = formatString(instruments[formValues[0]]);
        usedInstruments.push(instruments[formValues[0]]);
        MIDI.loadResource({
            instruments: usedInstruments,
            onsuccess: function () {
                MIDI.programChange(index, formValues[0]);
                console.log(usedInstruments);
            }
        })
    }
}


async function getSongValue() {
    var select;

    function makeSelect() {
        select = document.createElement("select");
        select.id = "input1";
        if (songList.length > 0) {
            select.disabled = false;
            for (let i = 0; i < songList.length; i++) {
                var option = document.createElement("option");
                option.value = i;
                option.innerText = songList[i];
                select.appendChild(option);
            }
        } else {
            select.disabled = true;
        }

    }
    makeSelect();
    const {
        value: formValues
    } = await Swal.fire({
        title: 'Add song',
        html: select,
        focusConfirm: false,
        preConfirm: () => {
            return document.getElementById('input1').value;
        }
    })

    if (formValues) {
        Swal.fire(songList[parseInt(formValues)] + " was added");
        add(songList[parseInt(formValues)], parseInt(formValues))
    }
}

function closeSong(event) {
    songList.push(event.parentElement.parentElement.getAttribute("data-title"));
    available.unshift(parseInt(event.parentElement.parentElement.getAttribute("data-index")));
    deleteElement(parseInt(event.parentElement.parentElement.getAttribute("data-index")), used);
    tracks[parseInt(event.parentElement.parentElement.getAttribute("data-index"))] = 0;
    mainContainer.removeChild(event.parentElement.parentElement);
}

function add(title, value) {
    song = document.createElement("div");
    song.classList.add("songContainer");
    song.setAttribute("data-title", title);
    song.setAttribute("data-index", available[0]);


    var test = '<div class="songTitle">' + title + ` <button id="closeBtn" class="press press-sm" onclick="closeSong(this)"><i class="fas fa-times close"></i></button>  </div>
    <button class="instrumentSelect press press-taint press-round press-ghost" id="changeInstrument" onclick="getFormValues(this)">Grand Piano</button>
    <div class="text_input songBpm" id="text_input2">
        <input type="text" id="bpm" placeholder="BPM" value="7" type="number"  min="5"  max="9"  autocomplete="false" itemscope itemtype="http://schema.org/speed">
        <span class="focus-border">
            <i></i>
        </span>
    </div>
    <div class="text_input SongVolume" id="text_input1">
        <input type="text" id="volume" placeholder="Volume" value="127" required itemscope itemtype="http://schema.org/name">
        <span class="focus-border">
            <i></i>
        </span>
    </div>
    <div class="controlsContainer">
        <button class="songStart press press-sm press-green press-circle press-ghost" onclick="playSong(this)"><i class="fas fa-play"></i></button>
    </div>
    <div class="controlsContainer">
        <button class="songStop press press-sm press-red press-circle press-ghost" onclick="stopSong(this)"><i class="fas fa-stop"></i></button>
    </div>`;
    song.innerHTML = test;
    mainContainer.prepend(song);
    loadSong(title, available[0]);
    deleteElement(available[0], available);
    used.push(available[0]);
    deleteElement(title, songList);
    if (mainContainer.childElementCount > 16) {
        addContain.style.display = "none";
        Toast.fire({
            type: 'info',
            title: 'You can have a maximum of 16 tracks simultaneously!!'
        })
    }
    if (songList.length === 0) {
        addContain.style.display = "none";
        Toast.fire({
            type: 'info',
            title: 'Those were all the songs available!'
        })
    }

}

function playSong(event) {
    index = parseInt(event.parentElement.parentElement.getAttribute("data-index"));
    volume = event.parentElement.previousElementSibling.childNodes[1].value;
    bpm = event.parentElement.previousElementSibling.previousElementSibling.childNodes[1].value;
    if (bpm < 5) {
        bpm = 5;
    } else if (bpm > 9) {
        bpm = 9;
    }
    MIDI.setVolume(index, volume);
    var delay = 0.4;
    event.parentElement.parentElement.childNodes[0].style.color="green";
    for (var i = 0; i < tracks[index].length; i++) {
        MIDI.chordOn(index, tracks[index][i], 127, delay);
        MIDI.chordOff(index, tracks[index][i], delay + 0.2);
        delay += 1 - bpm / 10;
    }
}

function stopSong() {
    MIDI.stopAllNotes();
    nodes = mainContainer.childNodes;
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeName.toLowerCase() == 'div') {
            if (nodes[i].classList.contains("songContainer")) {
                nodes[i].childNodes[0].style.color = "white";
            }
        }
    }
}

function playAll() {
    stopSong()
    nodes = mainContainer.childNodes;
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].nodeName.toLowerCase() == 'div') {
            if (nodes[i].classList.contains("songContainer")) {
                nodes[i].childNodes[8].childNodes[1].click();
            }
        }

    }
}

function flipArray(array) {
    test = [];
    for (var j = 0; j < array[0].length; j++) {
        test[j] = [];
        for (var i = 0; i < 16; i++) {
            test[j][i] = array[i][j];
        }
    }

    return test;
}

function loadSong(title, index) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var docRef = db.collection("Songs").doc(title);
            docRef.get().then(function (doc) {
                if (doc.exists) {
                    tracks[index] = flipArray(JSON.parse(doc.data().notes));
                    MIDI.programChange(index, 0);
                } else {
                    Toast.fire({
                        type: 'error',
                        title: 'The composition was deleted!'
                    });
                }
            }).catch(function (error) {
                Toast.fire({
                    type: 'error',
                    title: error + " occurred"
                });
            });
        }
    });

}

function deleteElement(title, array) {
    if (array.length === 1) {
        array.splice(0, 1);
        if (mainContainer.childElementCount < 16) {
            addContain.style.display = "block";
        }
    } else if (array.length > 1) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === title) {
                array.splice(i, 1);
                if (mainContainer.childElementCount < 16) {
                    addContain.style.display = "block";
                }
            }
        }
    }
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        const query = songsRef;
        query.get()
            .then(songs => {
                songs.forEach(doc => {
                    var data = doc.data();
                    songList.push(data.user + "-" + data.title)
                })

            })
        MIDI.loadPlugin({
            soundfontUrl: "../assets/Soundfont/",
            instruments: usedInstruments,
            onsuccess: function () {
                MIDI.programChange(0, 0);
            }
        });
    }
});