export default {
  template: /* html*/`
    <section id="detail" >
      <div class="content-wrap">

      <div class="con">
        <div class="img-wrap">
          <figure>
            <img :src="shop.photo.pc.l" alt="">
          </figure>
        </div>
        <div class="box">
        <h2 class="ttl">{{ shop.name }}</h2>
        <p>{{ shop.catch }}</p>
        <dl>
          <div class="flex">
            <dt><img src="./assets/img/clock.png"></dt><dd>{{ shop.open }}</dd>
          </div>
          <div class="flex">
            <dt><img src="./assets/img/home.png"></dt><dd>{{ shop.address }}</dd>
          </div>
          <div class="flex">
            <dt><img src="./assets/img/yen.png"></dt><dd>{{ shop.budget.name }}</dd>
          </div>
          <div class="flex">
            <dt><img src="./assets/img/trein.png"></dt><dd>{{ shop.access }}</dd>
          </div>
        </dl>
        </div>
      </div>
      <!-- 地図を表示する要素 -->
      <div id="map"></div>
      <dl class="info">
        <div class="flex">
          <dt>ジャンル</dt><dd>{{ shop.genre.name }}</dd>
        </div>
        <div class="flex">
          <dt>営業時間</dt><dd>{{ shop.open }}</dd>
        </div>
        <div class="flex">
          <dt>休業日</dt><dd>{{ shop.close }}</dd>
        </div>
        <div class="flex">
          <dt>飲み放題</dt><dd>{{ shop.free_drink }}</dd>
        </div>
        <div class="flex">
          <dt>食べ放題</dt><dd>{{ shop.free_food }}</dd>
        </div>
        <div class="flex">
          <dt>個室</dt><dd>{{ shop.private_room }}</dd>
        </div>
        <div class="flex">
          <dt>掘りごたつ</dt><dd>{{ shop.horigotatsu }}</dd>
        </div>
        <div class="flex">
          <dt>座敷</dt><dd>{{ shop.tatami }}</dd>
        </div>
        <div class="flex">
          <dt>キャッシュレス</dt><dd>{{ shop.card }}</dd>
        </div>
        <div class="flex">
          <dt>ペット</dt><dd>{{ shop.pet }}</dd>
        </div>
        <div class="flex">
          <dt>Wi-Fi</dt><dd>{{ shop.wifi }}</dd>
        </div>
      </dl>
      <button @click="onClickBtn" class="btn">戻る</button>
    </div>
    </section>
  `,
  props: {
    id: String
  },
  data() {
    return {
      shop: {}
    };
  },
  methods: {
    onClickBtn() {
      this.$emit('click-btn');
    },
  },
  beforeMount() {
    console.log('beforeMount');
    const obj = {
      type: 'GET',
      headers: {
        'Access-Control-Allow-Origin' : '*',
      },

    };
    fetch(`./api/detail.php?id=${this.id}`, obj)
    .then(res => res.text())
    .then(data => {
      const temp = JSON.parse(data);
      this.shop = temp.results.shop[0];
      console.log(this.shop);
      window.sessionStorage.setItem('lat', this.shop.lat);
      window.sessionStorage.setItem('lng', this.shop.lng);

      // Google Maps JavaScript API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDzSVrsFZgDWzhrrAXlb0sd5engQsMQtHU&callback=initMap`;
      script.defer = true;
      document.body.appendChild(script);
    });
  }
}

function initMap() {
  const lat = Number(window.sessionStorage.getItem('lat'));
  const lng = Number(window.sessionStorage.getItem('lng'));
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 17,
      center: { lat: lat, lng: lng }
    });

    // マーカーを追加
    const marker = new window.google.maps.Marker({
      position: { lat: lat, lng: lng },
      map: map,
      // title: this.shop.name
    });
    marker.setMap(map);
}
window.initMap = initMap;
