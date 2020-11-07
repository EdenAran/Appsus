import { eventBus } from '../../../../js/services/event-bus.service.js'

const API_KEY = 'AIzaSyAqUZgbGEP11oNtkqb8bq06aDmUf4w9ksE';

export default {
    props: ['info', 'isEdit'],
    template: `
        <section class="note-map">
            <template v-if="!isEdit">
                <h3>{{info.title}}</h3>
                <i v-if="!isEdit" class="icon fas fa-map-marked-alt"></i></i>
                <div ref="map" style="width:200px; height:200px;"></div>
            </template>
            <template v-else>
                <input ref="title" class="title" type="text" v-model="info.title">
                <input type="text" v-model="locName">
                <button type="button" class="pointer map-btn" @click="goToNewLocation">Go There</button>
                <div class="map-edit" ref="map" style="width:100%; height:250px;"></div>
            </template>

        </section>
    `,
    data() {
        return {
            lat: '',
            lng: '',
            locName: '',
            mapSrc: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
        }
    },
    mounted() {
        if (this.isEdit) setTimeout(() => {
            this.$refs.title.focus()
            this.$refs.title.select()
        }, 0);
        this.connectGoogleApi()
            .then(() =>
                this.initAddress()
                    .then(() => {
                        console.log('s')
                        this.initMap()
                            .then(() => this.panToLocation())
                    })
            )
            .catch(err => eventBus.$emit('show-msg', { type: 'fail', txt: `Couldn\`t load map: ${err}`, path: null }))
    },
    methods: {
        initMap() {
            this.info.map = new google.maps.Map(
                this.$refs.map, {
                center: {
                    lat: this.lat,
                    lng: this.lng
                },
                zoom: 13,
                disableDefaultUI: true
            }
            )
            return Promise.resolve();
        },
        connectGoogleApi() {
            if (window.google) return Promise.resolve()
            let elGoogleApi = document.createElement('script');
            elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
            elGoogleApi.async = true;
            console.dir(elGoogleApi)
            document.body.append(elGoogleApi);
            return new Promise((resolve, reject) => {
                elGoogleApi.onload = resolve;
                elGoogleApi.onerror = (err) => reject('Google script failed to load', err)
            })
        },
        initAddress() {
            return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.info.address}&key=${API_KEY}`)
                .then(res => {
                    this.lat = res.data.results[0].geometry.location.lat;
                    this.lng = res.data.results[0].geometry.location.lng;
                    this.locName = res.data.results[0].formatted_address;
                    return Promise.resolve()
                })
                .catch(err => eventBus.$emit('show-msg', { type: 'fail', txt: `Couldn\`t load address: ${err}`, path: null }))
        },
        panToLocation() {
            const laLatLng = new google.maps.LatLng(this.lat, this.lng)
            this.info.map.panTo(laLatLng);
            this.info.address = this.locName
        },
        goToNewLocation() {
            eventBus.$emit('show-msg', { type: 'fail', txt: `We don\'t support this feature right now...`, path: null })
            this.locName = this.info.address;
        },
    }
}